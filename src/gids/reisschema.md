---
titel: Reisschema, dag voor dag
sectie: Zelf plannen
order: 65
samenvatting: Van vertrek uit Amsterdam tot thuiskomst — wat er elke dag gebeurt, wat je eet en waar je op let.
---

{% from "tabellen.njk" import dagkaart %}

De dagen hieronder staan niet op datum maar op afstand tot de poortopening. "T-4" is vier dagen
ervoor, "Dag 1" is de eerste hele dag in de stad. Zo blijft het schema bruikbaar welk jaar je
ook gaat; vul je eigen datums in zodra je ze hebt.

Het is een voorstel, geen voorschrift. De bedoeling is dat je er doorheen loopt en aanpast wat
voor jullie niet werkt.

<div class="kader kader--tip">
  <p class="kader__kop">Drie dagen ruimte vooraf, één dag ruimte achteraf</p>
  <p>De twee plekken waar dit schema het meest van andere verschilt: er zitten drie dagen tussen
  aankomst en de poort, en er zit een hele dag tussen het verlaten van de stad en de vlucht naar
  huis. Met negen uur tijdsverschil en een kind van vier zijn dat geen luxedagen maar de dagen
  die de rest mogelijk maken.</p>
</div>

## Voor de poort

{% for dag in reisdagen.dagen %}{% if dag.fase == "voor" %}{{ dagkaart(dag) }}{% endif %}{% endfor %}

## In Black Rock City

{% for dag in reisdagen.dagen %}{% if dag.fase == "stad" %}{{ dagkaart(dag) }}{% endif %}{% endfor %}

## Naar huis

{% for dag in reisdagen.dagen %}{% if dag.fase == "terug" %}{{ dagkaart(dag) }}{% endif %}{% endfor %}

## Wat dit schema kost aan dagen

Van vertrek tot thuiskomst ben je **zestien dagen** onderweg: vier dagen vooraf in Reno, negen
dagen van de poort tot het vertrek, en drie dagen om eruit te komen en thuis te raken.

Dat is aanzienlijk meer dan de week die mensen in hun hoofd hebben, en het is precies wat de
[leerplichtvraag](/gids/vanuit-nederland/) zo lastig maakt. Reken bij het aanvragen van verlof
of vakantie met zestien dagen, niet met acht.

<div class="invullen">
  <p>Vul de datums in zodra de vlucht geboekt is, en zet erbij welke dagen binnen de
  zomervakantie van jullie regio vallen en welke niet. Dat is meteen je antwoord op de vraag of
  het verlofprobleem groot of klein is.</p>
</div>
