# Wetter Wincheringen-Mont
Dashboard fuer die AWEKAS-Station 24938. Die Daten werden jede Minuten abgeholt und mit GitHub Pages veroeffentlicht.

Wetter-Dashboard Wincheringen-Mont: Was sich geändert hat

GitHub-Aktualisierung war unzuverlässig: Der geplante Lauf kam oft nur alle paar Stunden statt alle 5 Minuten, und GitHub Pages ist für so häufige Updates nicht gedacht.
Neue Lösung: Ein kostenloser Cloudflare Worker holt die Daten live von AWEKAS. Er arbeitet als Zwischenstation, weil AWEKAS direkte Abrufe von fremden Webseiten blockiert.
Der API-Key liegt nur noch als geheimes Secret bei Cloudflare, nicht mehr im Repository oder im Browser.
Das Dashboard auf GitHub Pages besteht nur noch aus statischen HTML-Seiten und holt sich die Werte jede Minute vom Worker. Beim Öffnen und mit dem Knopf "Aktualisieren" geht es auch sofort.
Der Worker puffert die Daten 60 Sekunden, damit AWEKAS auch bei vielen Besuchern höchstens einmal pro Minute gefragt wird.
Der GitHub-Workflow und der GitHub-Token werden nicht mehr gebraucht.
Es gibt zwei Ansichten: Detaildaten und analoge Messinstrumente mit Hoch/Tief-Markierungen.
Die Seite zeigt "veraltet" an, wenn die Station keine Daten mehr sendet.
