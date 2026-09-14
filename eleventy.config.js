import fs from "node:fs";

import { HtmlBasePlugin } from "@11ty/eleventy";
import { load as parseYaml } from "js-yaml";

export default function (eleventyConfig) {
  // Rewrites every URL in the output HTML to include the pathPrefix, so the
  // site works both on a bare domain and under github.io/<repo>/.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Nette typografie: krulletjes in plaats van rechte aanhalingstekens.
  eleventyConfig.amendLibrary("md", (md) => md.set({ typographer: true }));

  // Cijfers staan in YAML onder src/_data/, niet in de lopende tekst. Zo is er
  // één plek om te bewerken, kloppen de totalen altijd, en kun je de bestanden
  // ongewijzigd aan een andere AI geven.
  eleventyConfig.addDataExtension("yml,yaml", (inhoud) => parseYaml(inhoud));

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Alleen aanwezig zodra er een eigen domein aan Pages gekoppeld is.
  if (fs.existsSync("src/CNAME")) eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addWatchTarget("src/assets/");

  // Guide pages grouped per section, in the order set by the `order` front matter.
  eleventyConfig.addCollection("gids", (collection) =>
    collection
      .getFilteredByGlob("src/gids/*.md")
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.addFilter("perSectie", (paginas) =>
    groepeer(paginas, (pagina) => pagina.data.sectie)
  );

  // Groepeert op een veld — standaard `categorie`, maar tips gebruiken `thema`.
  eleventyConfig.addFilter("perCategorie", (posten, veld = "categorie") =>
    groepeer(posten, (post) => post[veld])
  );

  // Telt een bedragveld ("van" of "tot") op over een lijst posten, en rekent
  // dollars onderweg om naar euro's.
  eleventyConfig.addFilter("som", (posten, veld, koers) =>
    (posten ?? []).reduce((totaal, post) => totaal + naarEuro(post, veld, koers), 0)
  );

  eleventyConfig.addFilter("euro", (post, veld, koers) => naarEuro(post, veld, koers));

  eleventyConfig.addFilter("bedrag", (waarde) =>
    typeof waarde !== "number" || Number.isNaN(waarde)
      ? "—"
      : "€ " + Math.round(waarde).toLocaleString("nl-NL")
  );

  eleventyConfig.addFilter("datum", (waarde) =>
    new Date(waarde).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  // Brede tabellen mogen op smalle schermen horizontaal scrollen zonder dat
  // de hele pagina meeschuift.
  eleventyConfig.addTransform("tabelwrap", function (inhoud) {
    if (!(this.page.outputPath || "").endsWith(".html")) return inhoud;
    return inhoud.replace(
      /<table>[\s\S]*?<\/table>/g,
      (tabel) => `<div class="tabelwrap">${tabel}</div>`
    );
  });

  // Houdt bij hoeveel er nog open staat en meldt dat aan het eind van de build,
  // zodat je niet door de bestanden hoeft om te zien waar je staat.
  const openstaand = { invulvelden: 0, onbevestigd: 0 };

  eleventyConfig.addTransform("tellen", function (inhoud) {
    if (!(this.page.outputPath || "").endsWith(".html")) return inhoud;
    openstaand.invulvelden += (inhoud.match(/class="invullen"/g) ?? []).length;
    openstaand.onbevestigd += (inhoud.match(/class="onbevestigd"/g) ?? []).length;
    return inhoud;
  });

  eleventyConfig.on("eleventy.after", () => {
    const { invulvelden, onbevestigd } = openstaand;
    if (invulvelden || onbevestigd) {
      console.log(
        `[invullen] ${invulvelden} ${invulvelden === 1 ? "veld" : "velden"} nog in te vullen, ` +
          `${onbevestigd} ${onbevestigd === 1 ? "bedrag" : "bedragen"} nog onbevestigd`
      );
    }
    openstaand.invulvelden = 0;
    openstaand.onbevestigd = 0;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
  };
}

/** Groepeert een lijst op een sleutel, met behoud van de oorspronkelijke volgorde. */
function groepeer(items, sleutel) {
  const groepen = new Map();
  for (const item of items ?? []) {
    const naam = sleutel(item) ?? "Overig";
    if (!groepen.has(naam)) groepen.set(naam, []);
    groepen.get(naam).push(item);
  }
  return [...groepen].map(([naam, items]) => ({ naam, paginas: items, posten: items }));
}

/** Bedrag van één post in euro's; dollars worden omgerekend met de opgegeven koers. */
function naarEuro(post, veld, koers) {
  const waarde = post?.[veld];
  if (typeof waarde !== "number") return 0;
  return post.valuta === "usd" ? waarde * koers : waarde;
}
