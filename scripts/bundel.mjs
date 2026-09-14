// Zet alle pagina's en alle ruwe data in één Markdown-bestand, zodat je het in
// één keer kunt uploaden naar een andere AI.
//
//   npm run bundel        ->  export/blackrockcity-kids-volledig.md
//   node scripts/bundel.mjs _site  ->  zelfde bestand in de gebouwde site,
//                                      zodat het via een URL te openen is

import fs from "node:fs/promises";
import path from "node:path";

const wortel = process.cwd();
const doelmap = process.argv[2] ?? "export";
const uitvoer = path.join(wortel, doelmap, "blackrockcity-kids-volledig.md");

/** Leest de frontmatter-titel, of valt terug op de bestandsnaam. */
function titelVan(inhoud, bestandsnaam) {
  const match = inhoud.match(/^---\n([\s\S]*?)\n---/);
  const titel = match?.[1].match(/^titel:\s*"?(.+?)"?\s*$/m)?.[1];
  return titel ?? bestandsnaam.replace(/\.md$/, "");
}

/** Sorteert op het `order`-veld uit de frontmatter. */
function volgordeVan(inhoud) {
  return Number(inhoud.match(/^order:\s*(\d+)\s*$/m)?.[1] ?? 999);
}

const gidsMap = path.join(wortel, "src", "gids");
const bestanden = (await fs.readdir(gidsMap)).filter((n) => n.endsWith(".md"));

const paginas = await Promise.all(
  bestanden.map(async (naam) => {
    const inhoud = await fs.readFile(path.join(gidsMap, naam), "utf8");
    return { naam, inhoud, titel: titelVan(inhoud, naam), order: volgordeVan(inhoud) };
  })
);
paginas.sort((a, b) => a.order - b.order);

const dataMap = path.join(wortel, "src", "_data");
const dataBestanden = (await fs.readdir(dataMap)).filter((n) => n.endsWith(".yml"));

const delen = [];

delen.push(await fs.readFile(path.join(wortel, "CONTEXT.md"), "utf8"));

delen.push(
  "\n---\n\n# Alle pagina's van de site\n\n" +
    "Hieronder staat elke pagina integraal, inclusief de frontmatter. De pagina's staan op\n" +
    "dezelfde volgorde als in het menu.\n"
);

for (const pagina of paginas) {
  delen.push(`\n---\n\n## Pagina: ${pagina.titel}\n\nBestand: \`src/gids/${pagina.naam}\`\n\n${pagina.inhoud}`);
}

delen.push(
  "\n---\n\n# Alle ruwe data\n\n" +
    "De cijfers en lijsten waar de pagina's hierboven uit opgebouwd worden.\n"
);

for (const naam of dataBestanden.sort()) {
  const inhoud = await fs.readFile(path.join(dataMap, naam), "utf8");
  delen.push(`\n---\n\n## Data: ${naam}\n\n\`\`\`yaml\n${inhoud}\`\`\`\n`);
}

const tekst = delen.join("\n");
await fs.mkdir(path.dirname(uitvoer), { recursive: true });
await fs.writeFile(uitvoer, tekst, "utf8");

const kb = Math.round(Buffer.byteLength(tekst, "utf8") / 1024);
console.log(
  `Geschreven: ${doelmap}/blackrockcity-kids-volledig.md — ` +
    `${paginas.length} pagina's, ${dataBestanden.length} datafiles, ${kb} kB`
);
