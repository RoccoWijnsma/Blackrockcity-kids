---
titel: Tips uit de community
sectie: Zelf plannen
order: 68
samenvatting: Losse tips van ouders en ervaren burners, per thema, met bij elke tip de vindplaats.
---

{% from "tabellen.njk" import tipkaart %}

Dit is een groeidocument: losse dingen die ouders en ervaren burners opschrijven, bij elkaar
gezet en voorzien van een bron. Kom je iets tegen, zet het erbij — in `src/_data/tips.yml`,
met altijd de vindplaats erachter.

<div class="kader kader--let-op">
  <p class="kader__kop">Uit tekstbronnen, niet uit video's</p>
  <p>Deze verzameling komt uit forums, kampblogs, verhuurderswebsites en het Burning Man
  Journal. Er zit veel goede informatie in video's die hier dus niet in verwerkt is — kijk die
  vooral zelf, en vul aan wat je mist.</p>
</div>

{% for groep in tips.tips | perCategorie("thema") %}
## {{ groep.naam }}

{% for tip in groep.posten %}{{ tipkaart(tip) }}{% endfor %}
{% endfor %}

## Zelf aanvullen

Voeg toe in `src/_data/tips.yml`:

```yaml
  - thema: De camper
    tip: >-
      Wat je geleerd hebt, in een paar zinnen.
    bron: https://ergens.nl/pagina
    bron_naam: Naam van de bron
```

Heb je het zelf ondervonden in plaats van ergens gelezen? Laat `bron` dan weg en zet
`bron_naam: Eigen ervaring`. Dat is net zo waardevol — vaak waardevoller — zolang duidelijk is
waar het vandaan komt.
