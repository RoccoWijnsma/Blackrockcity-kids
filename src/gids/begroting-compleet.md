---
titel: De begroting, post voor post
sectie: Zelf plannen
order: 60
samenvatting: Elke uitgave apart, met bron en bandbreedte — voor twee volwassenen en een kind van vier, vanuit Nederland.
---

{% from "tabellen.njk" import begrotingstabel, totaaltabel, borgtabel %}
{% set koers = begroting.koers.usd_naar_eur %}
{% set groepen = begroting.posten | perCategorie %}
{% set totaalVan = begroting.posten | som("van", koers) %}
{% set totaalTot = begroting.posten | som("tot", koers) %}

Dit is één gezin doorgerekend: **twee volwassenen en een kind van vier**, vanuit Nederland, met
een gehuurde camper. Geen samenvatting achteraf maar een werkbegroting vooraf, waarin je elk
getal kunt vervangen zodra je een echte offerte hebt.

<ul class="kerncijfers">
  <li class="kerncijfer">
    <span class="kerncijfer__label">Totaal, ondergrens</span>
    <span class="kerncijfer__waarde">{{ totaalVan | bedrag }}</span>
  </li>
  <li class="kerncijfer">
    <span class="kerncijfer__label">Totaal, bovengrens</span>
    <span class="kerncijfer__waarde">{{ totaalTot | bedrag }}</span>
  </li>
  <li class="kerncijfer">
    <span class="kerncijfer__label">Losse posten</span>
    <span class="kerncijfer__waarde">{{ begroting.posten | length }}</span>
  </li>
</ul>

<div class="kader kader--let-op">
  <p class="kader__kop">Dit zijn schattingen, geen offertes</p>
  <p>Alle bedragen komen uit openbare bronnen — verhuurders, forums, kampblogs — en zijn
  omgerekend tegen {{ koers }} euro per dollar. Elk bedrag met een
  <span class="onbevestigd" title="Nog niet nagezocht of nagebeld">?</span> is nog niet
  geverifieerd. Bel na, vraag offertes op, en vervang de getallen in
  <code>src/_data/begroting.yml</code>; de totalen hierboven rekenen zichzelf opnieuw uit.</p>
</div>

{% for groep in groepen %}
## {{ groep.naam }}

{{ begrotingstabel(groep.posten, koers, groep.naam | lower) }}
{% endfor %}

## Alles bij elkaar

{{ totaaltabel(groepen, koers, totaalVan, totaalTot) }}

Ter vergelijking: de [beknopte kostenpagina](/gids/kosten/) geeft dezelfde orde van grootte
voor een gezin van vier. Dat het hier voor drie personen niet veel lager uitvalt, komt doordat
de twee grootste posten — de camper en de vlucht — nauwelijks meebewegen met één kind erbij.

## Geld dat vaststaat maar geen kosten is

Naast de uitgaven hierboven blokkeren verhuurders een borg op je creditcard. Dat geld krijg je
terug, maar je limiet moet het wel aankunnen.

{{ borgtabel(begroting.borgsommen, koers) }}

## Waar de ruimte zit

De bandbreedte tussen onder- en bovengrens is groot, en dat is geen slordigheid: die ruimte zit
vooral in twee posten waar je zelf aan kunt draaien.

<ul class="checklist">
  <li><strong>De camper.</strong> Het verschil tussen de goedkoopste en de duurste optie is
  groter dan alle uitrusting bij elkaar. Delen met een ander gezin halveert die post, en levert
  bovendien volwassenen op die kunnen aflossen.</li>
  <li><strong>De vlucht.</strong> San Francisco, Sacramento of Las Vegas in plaats van Reno
  scheelt vaak honderden euro's per persoon. Je betaalt het deels terug in een extra dag rijden
  en een extra huurdag — met een kleuter na een transatlantische vlucht is dat een echte
  afweging.</li>
</ul>

Zie [Camper of tent](/gids/camper-of-tent/) voor de rekensom achter het onderkomen, en
[Brandstof en kilometers](/gids/brandstof-en-kilometers/) voor de post die het vaakst
onderschat wordt.

## Zelf bijwerken

De bedragen staan niet in deze pagina maar in `src/_data/begroting.yml`. Pas daar een getal aan
en alle tabellen en totalen hierboven kloppen weer. Zet `bevestigd: true` zodra je een offerte
of een echte prijs hebt, dan verdwijnt het vraagteken en telt de build hem niet meer mee.

<div class="invullen">
  <p>Vul in zodra je ze hebt: de werkelijke vluchtprijs, de offerte van de camperverhuurder
  inclusief schoonmaakregeling, en de actuele wisselkoers. Dat zijn de drie getallen die het
  totaal het hardst laten bewegen.</p>
</div>
