import fs from "node:fs";

import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites every URL in the output HTML to include the pathPrefix, so the
  // site works both on a bare domain and under github.io/<repo>/.
  eleventyConfig.addPlugin(HtmlBasePlugin);

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

  eleventyConfig.addFilter("perSectie", (pages) => {
    const secties = new Map();
    for (const page of pages) {
      const naam = page.data.sectie ?? "Overig";
      if (!secties.has(naam)) secties.set(naam, []);
      secties.get(naam).push(page);
    }
    return [...secties].map(([naam, paginas]) => ({ naam, paginas }));
  });

  // Brede tabellen mogen op smalle schermen horizontaal scrollen zonder dat
  // de hele pagina meeschuift.
  eleventyConfig.addTransform("tabelwrap", function (inhoud) {
    if (!(this.page.outputPath || "").endsWith(".html")) return inhoud;
    return inhoud.replace(
      /<table>[\s\S]*?<\/table>/g,
      (tabel) => `<div class="tabelwrap">${tabel}</div>`
    );
  });

  eleventyConfig.addFilter("datum", (value) =>
    new Date(value).toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

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
