# Wetter Wincheringen-Mont
Dashboard fuer die AWEKAS-Station 24938. Die Daten werden jede Minuten abgeholt und mit GitHub Pages veroeffentlicht.

Wetter-Dashboard Wincheringen-Mont: Zusammenfassung

Ausgangslage: Das Dashboard zeigt die Daten unserer AWEKAS-Wetterstation und läuft als statische Seite auf GitHub Pages.

Problem: Die Aktualisierung über einen geplanten GitHub-Workflow war unzuverlässig. Statt alle 5 Minuten kamen die Läufe oft nur alle paar Stunden.

Lösung:

Ein kostenloser Cloudflare Worker holt die Daten live von AWEKAS. Der API-Key liegt dort als Secret und steht nicht mehr im Repo oder im Browser.
Die Seiten rufen den Worker jede Minute ab, der Worker puffert die Daten 60 Sekunden. Dadurch gibt es keine Verzögerung mehr.
Der GitHub-Workflow dient nur noch zum Veröffentlichen der Seite.

Drei Ansichten, oben umschaltbar:

Messinstrumente: analoge Zeigerinstrumente mit Tageshoch und -tief und dynamischer Skala, auch für Innentemperatur und Wind.
Detaildaten: alle Werte und Extremwerte des Tages.
Vorhersage: Stundenwerte für 24 Stunden und 7-Tage-Vorhersage (Open-Meteo), DWD-Wetterwarnungen, Sonnenzeiten und Mondphase sowie ein Regenradar des DWD.

Hinweise:

Die Seite meldet, wenn die Station keine Daten mehr sendet.
Beim Aktualisieren muss der Veröffentlichungs-Workflow im Repo aktiv bleiben, sonst erscheinen neue Dateien nicht online.
