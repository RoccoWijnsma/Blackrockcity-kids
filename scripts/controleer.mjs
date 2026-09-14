// Controleert de gebouwde site op de drie dingen die hier stilletjes mis kunnen
// gaan. Draait na `npm run build`:
//
//   npm test
//
// 1. Dode links      — elke interne link moet bestaan
// 2. Kapotte tabellen — markdown-it breekt een HTML-blok af bij een lege regel,
//                       en dan komt er <p><tr> uit in plaats van een tabel
// 3. Rekenfouten     — de totalen op de begrotingspagina moeten overeenkomen
//                       met de som uit de YAML, anders zegt de tabel iets anders
//                       dan de data

import fs from "node:fs/promises";
import path from "node:path";
import { load as parseYaml } from "js-yaml";

const site = "_site";
const fouten = [];

/** Alle bestanden onder een map, recursief. */
async function alleBestanden(map) {
  const items = await fs.readdir(map, { withFileTypes: true });
  const paden = await Promise.all(
    items.map((item) => {
      const vol = path.join(map, item.name);
      return item.isDirectory() ? alleBestanden(vol) : [vol];
    })
  );
  return paden.flat();
}

const bestanden = await alleBestanden(site);
const paginas = bestanden.filter((p) => p.endsWith(".html"));

// ---------------------------------------------------------------- 1. links --

const bestaandeUrls = new Set(["/"]);
for (const bestand of bestanden) {
  const url = "/" + path.relative(site, bestand).split(path.sep).join("/");
  bestaandeUrls.add(url);
  if (url.endsWith("/index.html")) bestaandeUrls.add(url.slice(0, -"index.html".length));
}

// In CI wordt de site gebouwd met een pad-prefix (github.io/<repo>/), dus dan
// begint elke link daarmee terwijl de bestanden op de wortel staan. Haal dat
// prefix eraf voordat je vergelijkt, anders lijkt alles dood.
const prefix = (process.env.ELEVENTY_PATH_PREFIX || "/").replace(/\/+$/, "");

let aantalLinks = 0;
for (const pagina of paginas) {
  const inhoud = await fs.readFile(pagina, "utf8");
  for (const [, href] of inhoud.matchAll(/href="(\/[^"#]*)/g)) {
    aantalLinks++;
    const pad = prefix && href.startsWith(prefix + "/") ? href.slice(prefix.length) : href;
    if (!bestaandeUrls.has(pad)) {
      fouten.push(`dode link: ${path.relative(site, pagina)} → ${href}`);
    }
  }
}

// ------------------------------------------------------------- 2. tabellen --

const kapot = /<p><tr|<p><td|<p><\/tbody|<p><\/table|<p><div class="(dag|tip)"/;
for (const pagina of paginas) {
  const inhoud = await fs.readFile(pagina, "utf8");
  if (kapot.test(inhoud)) {
    fouten.push(
      `kapot HTML-blok in ${path.relative(site, pagina)} — ` +
        `een lege regel breekt de tabel op; gebruik de macro's in _includes/tabellen.njk`
    );
  }
}

// -------------------------------------------------------------- 3. rekenen --

const begroting = parseYaml(await fs.readFile("src/_data/begroting.yml", "utf8"));
const koers = begroting.koers.usd_naar_eur;

const inEuro = (post, veld) => {
  const waarde = post[veld];
  if (typeof waarde !== "number") return 0;
  return post.valuta === "usd" ? waarde * koers : waarde;
};
const som = (veld) => begroting.posten.reduce((t, p) => t + inEuro(p, veld), 0);

const verwacht = {
  van: "€ " + Math.round(som("van")).toLocaleString("nl-NL"),
  tot: "€ " + Math.round(som("tot")).toLocaleString("nl-NL"),
};

const begrotingspagina = await fs.readFile(
  path.join(site, "gids", "begroting-compleet", "index.html"),
  "utf8"
);
const getoond = [...begrotingspagina.matchAll(/<span class="kerncijfer__waarde">([^<]+)</g)].map(
  (m) => m[1].trim()
);

for (const [veld, waarde] of Object.entries(verwacht)) {
  if (!getoond.includes(waarde)) {
    fouten.push(
      `rekenfout: totaal "${veld}" hoort ${waarde} te zijn volgens begroting.yml, ` +
        `maar de pagina toont ${getoond.join(" / ") || "niets"}`
    );
  }
}

// ---------------------------------------------------------------- uitslag --

console.log(
  `${paginas.length} pagina's, ${aantalLinks} interne links, ` +
    `${begroting.posten.length} begrotingsposten (${verwacht.van} – ${verwacht.tot})`
);

if (fouten.length) {
  console.error(`\n${fouten.length} probleem(en):`);
  for (const fout of fouten) console.error("  - " + fout);
  process.exit(1);
}
console.log("Alles in orde.");
