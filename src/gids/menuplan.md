---
titel: Wat eten we wanneer
sectie: Zelf plannen
order: 66
samenvatting: Acht dagen menu voor drie personen, met de boodschappenlijst die eruit volgt en wat je thuis al invriest.
---

Koken op de playa is warm, stoffig en het levert afwas op waar je geen water voor hebt. Het doel
van dit menu is dus niet lekker koken maar **zo min mogelijk koken**: alles wat je thuis of in
Reno kunt voorbereiden, bereid je daar voor.

Bevroren maaltijden doen bovendien dubbel dienst — ze zijn je koelelementen voor de eerste dagen.

## Uitgangspunten

<ul class="checklist">
{% for punt in menu.uitgangspunten %}  <li>{{ punt }}</li>
{% endfor %}</ul>

## Het menu

<div class="tabelwrap">
<table>
  <thead><tr><th>Dag</th><th>Ontbijt</th><th>Lunch</th><th>Avond</th><th>Snacks</th></tr></thead>
  <tbody>
{%- for dag in menu.dagen %}
    <tr><td><strong>{{ dag.dag }}</strong>{% if dag.kop %}<br><small>{{ dag.kop }}</small>{% endif %}</td><td>{{ dag.ontbijt }}</td><td>{{ dag.lunch }}</td><td>{{ dag.avond }}</td><td>{{ dag.snacks }}</td></tr>
{%- endfor %}
  </tbody>
</table>
</div>

<div class="kader kader--let-op">
  <p class="kader__kop">Pas dit aan naar wat jullie zoon écht eet</p>
  <p>In de hitte verdwijnt de eetlust, ook bij kinderen die thuis alles opeten. Op zo'n moment
  is "wat hij thuis ook lust" meer waard dan "wat gezond is". Dwing niet, maar zorg dat wat er
  wél naar binnen gaat ergens goed voor is — en let vooral op het drinken. Zie
  <a href="/gids/stof-hitte-gezondheid/">Stof, hitte en gezondheid</a>.</p>
</div>

## De boodschappenlijst die hieruit volgt

{% for groep in menu.boodschappen %}
### {{ groep.categorie }}

{% if groep.waar == "thuis" %}*Thuis klaarmaken en invriezen.*{% else %}*Kopen in Reno.*{% endif %}

<ul class="checklist">
{% for item in groep.items %}  <li>{{ item }}</li>
{% endfor %}</ul>
{% endfor %}

## Wat er niet in staat

**Water** staat bewust niet in de lijst hierboven, omdat het geen boodschap is maar een
berekening: minimaal zes liter per persoon per dag, plus wassen en afwassen. Voor drie personen
en acht dagen kom je op ongeveer **150 liter**. Zie [Eten en drinken](/gids/eten-en-drinken/).

**IJs** koop je ter plekke, elke dag opnieuw, en contant. Een dagelijkse ijsronde is bovendien
een prima klusje voor een vierjarige: duidelijk doel, nuttig voor het kamp, en een rij waarin je
mensen ontmoet.

## Afwassen zonder water op de grond

Grijswater mag niet op de playa. Alles wat je gebruikt vang je op en neem je mee terug. Veeg
borden eerst uit met keukenpapier, was af in twee bakjes — één met zeep, één om na te spoelen —
en giet het vuile water in een afsluitbare jerrycan met een trechter erbij.

<div class="invullen">
  <p>Loop het menu door en streep weg wat jullie zoon niet eet. Vul in wat er dan voor in de
  plaats komt, en tel daarna de boodschappenlijst opnieuw na — die volgt uit het menu, niet
  andersom.</p>
</div>

<div class="invullen">
  <p>Nog te bepalen: hoeveel maaltijden vriezen jullie thuis in, en passen die in de bagage? Een
  bevroren maaltijd is zwaar en je hebt maar beperkt koffergewicht. Misschien is het slimmer om
  ze in Reno te maken en daar een nacht in de vriezer te leggen.</p>
</div>
