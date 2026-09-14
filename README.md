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

## Live zetten

Elke push naar `main` bouwt de site en zet hem live. Dat gebeurt via
`.github/workflows/deploy.yml`.

De workflow zet Pages zo nodig zelf aan (`enablement: true` op `actions/configure-pages`), dus
je hoeft daar in principe niets voor in te stellen. Mislukt dat toch — sommige accounts staan het
niet toe — zet het dan alsnog handmatig aan: *Settings → Pages*, **Source** op **GitHub Actions**.

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
