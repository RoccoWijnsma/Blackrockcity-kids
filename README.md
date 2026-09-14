# Black Rock City Kids

Bronbestanden van **blackrockcity-kids**: een Nederlandstalige site met praktische informatie
voor ouders die met kinderen naar Black Rock City gaan.

De teksten staan in Markdown in `src/gids/`. [Eleventy](https://www.11ty.dev/) bouwt daar een
statische site van, en GitHub Actions zet die automatisch live op GitHub Pages.

## Lokaal werken (ook op de Synology)

Je hebt Node.js 20 of nieuwer nodig. Op een Synology installeer je die via Package Center
(pakket *Node.js*); verder is er niets nodig.

```bash
npm install      # één keer, installeert Eleventy
npm start        # start een lokale server op http://localhost:8080
```

`npm start` bouwt opnieuw en ververst je browser zodra je een bestand opslaat. Dat is de
manier om te schrijven: laat het venster openstaan en typ in `src/gids/`.

Een losse build zonder server:

```bash
npm run build    # zet de complete site in _site/
npm test         # controleert links, tabellen en of de totalen kloppen
npm run bundel   # zet alles in één bestand in export/, voor een andere AI
```

`_site/` en `node_modules/` staan in `.gitignore` — die horen niet in de repo.

## Een pagina toevoegen of aanpassen

Maak een `.md`-bestand in `src/gids/`. De bestandsnaam wordt de URL, dus
`src/gids/paklijst.md` komt op `/gids/paklijst/` te staan. Bovenaan het bestand staat de
frontmatter:

```yaml
---
titel: Paklijst
sectie: Voorbereiden
order: 25
samenvatting: Eén zin die onder de titel komt te staan en in Google verschijnt.
---
```

- **sectie** bepaalt onder welk kopje de pagina in het menu komt.
- **order** bepaalt de volgorde. De secties zijn gegroepeerd per tiental: 10–19 Beginnen,
  20–29 Voorbereiden, 30–39 Op de playa, 40–49 Naar huis, 50+ Naslag. Laat gaten tussen de
  nummers, dan kun je er later makkelijk iets tussen schuiven.

> **Let op bij dubbele punten.** Staat er in `titel` of `samenvatting` een dubbele punt gevolgd
> door een spatie, zet de hele waarde dan tussen aanhalingstekens:
> `samenvatting: "Wat je afspreekt: naamlabels en afspraken."` Zonder die aanhalingstekens leest
> YAML het als een nieuwe sleutel en mislukt de build.

Menu, voettekst en de vorige/volgende-knoppen vullen zichzelf — je hoeft alleen het bestand
neer te zetten.

### Opmaak die je kunt gebruiken

Naast gewone Markdown zijn er drie kaders en een afvinklijst. Let op: hierbinnen werkt geen
Markdown, dus gebruik daar `<p>` en `<strong>`.

```html
<div class="kader">
  <p class="kader__kop">Kop van het kader</p>
  <p>Een terzijde.</p>
</div>

<div class="kader kader--let-op">…</div>   <!-- oranje: waarschuwing -->
<div class="kader kader--tip">…</div>      <!-- groen: tip -->

<ul class="checklist">
  <li>Regel met een vakje ervoor</li>
</ul>
```

## Cijfers staan in datafiles, niet in de tekst

Alles wat een getal of een lijst is, staat in YAML onder `src/_data/`:

| Bestand | Inhoud |
| --- | --- |
| `begroting.yml` | Elke uitgave apart, met bron en bandbreedte |
| `reisdagen.yml` | Het reisschema, dag voor dag |
| `menu.yml` | Wat je wanneer eet, plus de boodschappenlijst |
| `tips.yml` | Losse tips met vindplaats |

Pas daar een getal aan en alle tabellen en totalen op de site rekenen zichzelf opnieuw uit. Zo
staat er nooit een opgeteld bedrag in de tekst dat niet meer klopt met de onderliggende posten —
en `npm test` controleert dat ook echt.

Elke begrotingspost heeft een veld `bevestigd`. Zolang dat `false` is, krijgt het bedrag op de
site een vraagteken en telt de build hem mee als "nog onbevestigd":

```
[invullen] 9 velden nog in te vullen, 30 bedragen nog onbevestigd
```

Zet `bevestigd: true` zodra je een offerte of een echte prijs hebt.

### Gaten markeren

Wat nog ingevuld moet worden, zet je in een invulkader. Dat valt op de site duidelijk op en
wordt door de build geteld:

```html
<div class="invullen">
  <p>Wat hier nog moet gebeuren.</p>
</div>
```

### Tabellen uit data

Genereer tabellen nooit rechtstreeks met een Nunjucks-lus in een Markdown-bestand: markdown-it
breekt een HTML-blok af zodra er een lege regel in staat, en dan komt er `<p><tr>` uit in plaats
van een tabel. Gebruik de macro's in `src/_includes/tabellen.njk`, die compacte HTML zonder lege
regels opleveren. `npm test` vangt het als het toch misgaat.

## Doorgeven aan een andere AI

Drie manieren, oplopend in gemak:

1. **`CONTEXT.md`** — een briefing van één scherm over de reis, de keuzes en wat nog open staat.
   Plakken en klaar.
2. **`/data.json`** op de gebouwde site — alle data machineleesbaar, voor een AI die zelf het
   web op kan.
3. **`npm run bundel`** — alle pagina's plus alle ruwe data in één Markdown-bestand om te
   uploaden. De build zet datzelfde bestand ook in de gepubliceerde site, dus je kunt het ook
   gewoon downloaden via `/blackrockcity-kids-volledig.md`.

## Live zetten

Elke push naar `main` bouwt de site en zet hem live. Dat gebeurt via
`.github/workflows/deploy.yml`.

**Eenmalig aanzetten, met de hand.** Ga naar *Settings → Pages* en zet onder
*Build and deployment* de **Source** op **GitHub Actions**. Daarna draait alles vanzelf.

Die stap is niet te automatiseren. De workflow probeert het wel — `actions/configure-pages`
staat op `enablement: true` — maar de token waarmee Actions draait mag een Pages-site niet
aanmaken, ook niet met `pages: write`:

```
Create Pages site failed. Error: Resource not accessible by integration
```

Die instelling blijft dus met de hand. `enablement: true` laten staan is verder onschadelijk:
zodra Pages aanstaat vindt de actie de bestaande site en gebeurt er niets meer.

Is Pages pas aangezet nadat een run al mislukt was, start die run dan opnieuw via
*Actions → de mislukte run → Re-run all jobs*.

Daarna staat de site op `https://roccowijnsma.github.io/Blackrockcity-kids/`.

Op een pull request draait alleen de bouwstap, zodat je een fout ziet voordat hij live staat.

## Later: een eigen domein

Zodra het domein er is, hoef je maar twee dingen te doen:

1. Zet bij je domeinregistrar de DNS-records naar GitHub Pages
   ([instructies](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
2. Maak een bestand `src/CNAME` met alleen de domeinnaam erin, bijvoorbeeld
   `blackrockcity-kids.com`.

De workflow ziet dat bestand en schakelt de site automatisch om van
`github.io/blackrockcity-kids/` naar de wortel van je eigen domein. Verder verandert er niets
aan de teksten of de links.

## Licentie

De teksten staan onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.nl):
overnemen en aanpassen mag, met bronvermelding.

Burning Man en Black Rock City zijn merken van Burning Man Project. Deze site is een
onafhankelijk initiatief van ouders en heeft geen band met die organisatie.
