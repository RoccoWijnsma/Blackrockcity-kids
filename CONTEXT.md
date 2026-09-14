# Briefing voor een andere AI

Plak dit hele bestand in een gesprek met een andere AI (Gemini, ChatGPT, wat dan ook) om
meteen dezelfde context te hebben als hier. Alles wat nodig is om mee te denken staat erin —
geen toegang tot deze repo vereist.

Wil je álle inhoud meegeven en niet alleen deze samenvatting, draai dan `npm run bundel` en
upload `export/blackrockcity-kids-volledig.md`. Dat is één bestand met alle pagina's en alle
ruwe data erin.

---

## De reis

Een Nederlands gezin gaat naar Burning Man, in Black Rock City, Nevada.

- **Wie:** twee volwassenen en een zoon van vier jaar.
- **Vanwaar:** Nederland. Vliegen met overstap naar Reno, daarvandaan ruim twee uur rijden.
- **Onderkomen:** gehuurde camper. Bij deze leeftijd is dat vrijwel onvermijdelijk vanwege de
  airconditioning voor het middagslaapje.
- **Jaar:** nog niet vastgelegd.
- **Duur:** ongeveer zestien dagen van deur tot deur — vier dagen vooraf in Reno voor de jetlag,
  boodschappen en de camper; negen dagen van poort tot vertrek; drie dagen om thuis te komen.

## Het project

Een Nederlandstalige website, `blackrockcity-kids`, met praktische informatie voor ouders die
met kinderen naar Black Rock City gaan. Openbaar op GitHub, gebouwd met Eleventy, gepubliceerd
via GitHub Pages.

De site heeft twee lagen:

1. **Algemene gids** — voor alle ouders. Voorbereiding, veiligheid, stof en hitte, paklijst,
   en de Nederlandse kant (vluchten, camper huren, leerplicht).
2. **Uitgewerkt voorbeeld** — deze ene reis helemaal doorgerekend en gepland, openbaar, omdat
   zo'n concreet praktijkgeval nergens anders te vinden is.

## Vastliggende keuzes

- **Taal:** Nederlands. Doelgroep is Nederlandse en Belgische ouders.
- **Naam:** `blackrockcity-kids`, niet `burningman-kids`. "Burning Man" is een actief beschermd
  merk; "Black Rock City" is de officiële naam van de stad en veel minder gevoelig. Ook niet
  `blackrock-kids`, vanwege verwarring met het beleggingsfonds.
- **Techniek:** Eleventy met Markdown. Cijfers staan in YAML onder `src/_data/`, niet in de
  lopende tekst, zodat de totalen altijd kloppen en de data herbruikbaar is.
- **Toon:** eerlijk over de keerzijde, inclusief de redenen om het dit jaar níet te doen. Geen
  reclametekst.
- **Domein:** nog niet geregistreerd.

## Het belangrijkste obstakel: de leerplicht

Dit is voor Nederlandse gezinnen bepalender dan geld of tickets, en wordt buiten Nederland
nergens genoemd.

Het evenement eindigt op Labor Day, de eerste maandag van september. De Nederlandse
zomervakantie duurt zes weken en is verdeeld over drie regio's die elkaar afwisselen.
Afhankelijk van regio en schooljaar valt de reis dus grotendeels binnen de zomervakantie, of er
net buiten.

Valt hij erbuiten, dan geldt: vakantieverlof buiten de schoolvakanties mag alleen als het beroep
van een ouder het onmogelijk maakt om in enige schoolvakantie weg te gaan, het is maximaal tien
schooldagen, en het mag **nooit in de eerste twee lesweken van het schooljaar** — precies waar
de reis dan valt. De school is verplicht ongeoorloofd verzuim te melden.

Een kind wordt leerplichtig vanaf de eerste schooldag van de maand ná zijn vijfde verjaardag.
**Met een zoon van vier speelt dit nu dus nog niet** — maar dat verandert binnen een jaar, en
dat maakt het jaar waarin ze gaan een reële afweging.

## Wat al vaststaat over de kosten

Ruwe schattingen uit openbare bronnen, niet uit offertes. Voor twee volwassenen en een kind van
vier, met camper, komt het totaal grofweg uit tussen **€ 9.000 en € 21.000**. De grootste posten:

| Post | Bandbreedte |
| --- | --- |
| Camperhuur, ruim een week | $ 3.000 – 9.000 |
| Schoonmaaktoeslag playa | $ 500 – 1.500 |
| Vluchten Amsterdam–Reno, 3 personen | € 2.400 – 4.200 |
| Tickets, 2 volwassenen (kind gratis t/m 12) | $ 1.100 – 1.500 |
| Generatorbrandstof | $ 200 – 500 |

Daarnaast staat er een borg van $ 2.000 – 5.000 tijdelijk vast op de creditcard.

De volledige uitsplitsing staat in `src/_data/begroting.yml`, met bij elke post een bron en een
veld `bevestigd`. Zolang dat op `false` staat, is het getal niet geverifieerd.

## Wat nog open staat

- Welk jaar ze gaan, en of de datums dat jaar binnen de zomervakantie van hun regio vallen.
- Offertes van camperverhuurders, inclusief de vraag of Black Rock City schriftelijk is
  toegestaan. Veel verhuurders verbieden het.
- Een kamp of familiekamp om bij aan te sluiten — dat regel je vóór de tickets.
- De domeinnaam registreren.
- Bijna alle bedragen in de begroting zijn nog onbevestigd.

## Waar goede hulp het meest oplevert

Dit zijn de vragen waar een second opinion echt iets toevoegt:

1. **Klopt de begroting?** Zijn er posten vergeten, of zijn bandbreedtes onrealistisch?
2. **Camper of tent bij een vierjarige** — is de conclusie "camper" terecht, of is er een
   middenweg die over het hoofd gezien wordt?
3. **Het menuplan** — acht dagen eten voor een kleuter in veertig graden, zonder koelkast na
   dag drie.
4. **Wat mist er helemaal?** De gids is opgebouwd uit tekstbronnen; er is geen videomateriaal in
   verwerkt.

## Bronnen die tot nu toe gebruikt zijn

Forums en gemeenschap: ePlaya (het officiële forum), het Burning Man Journal, de officiële
Survival Guide en de pagina voor gezinnen op burningman.org.

Praktijkblogs: Trippingly (camperkant), Matador Network en Excellent Family Adventures
(kinderkant), Outdoor Herbivore (eten).

Commercieel: camperverhuurders in Reno, Playa Bike Repair, Reno Bike Project, Kiwanis.

**Niet gebruikt:** videomateriaal. Er staat veel goede informatie in YouTube-video's die hier
dus niet in verwerkt zit.

## Hoe de repo in elkaar zit

```
src/gids/*.md        de pagina's; frontmatter bepaalt sectie en volgorde
src/_data/*.yml      alle cijfers en lijsten
src/_includes/       layouts en tabelmacro's
src/assets/style.css de opmaak
```

Secties en volgnummers: 10–19 Beginnen, 20–29 Voorbereiden, 30–39 Op de playa, 40–49 Naar huis,
50–59 Naslag, 60–69 Zelf plannen.

De gebouwde site zet alle data ook neer als één JSON-bestand op `/data.json`, voor een AI die
zelf het web op kan.
