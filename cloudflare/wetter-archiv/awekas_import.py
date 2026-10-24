# Erzeugt aus AWEKAS-Excel-Exporten (Stundenwerte) Tageswerte für die D1-Tabelle "tageswerte".
#
#   python awekas_import.py awekas_export_2022.xlsx awekas_export_2023.xlsx ... -o import.sql
#   npx wrangler d1 execute wetter --remote --file=import.sql
#
# - Tage werden nach Ortszeit gebildet, wie im Export (Datum/Zeit sind Stationszeit).
# - Ausfälle der Station stehen im Export als Füllwerte: Zeilen ohne Luftdruck und Zeilen, die die
#   vorige Stunde unverändert wiederholen. Sie zählen nicht als Messung.
# - Nur Tage mit mindestens MIN_STUNDEN gültigen Stunden werden übernommen; für die übrigen nimmt
#   statistik.html Modelldaten.
# - n = gültige Stunden x 12, also in 5-Minuten-Messungen wie bei den Live-Daten (statistik.html
#   wertet Tage ab n >= 144 als eigene Messung).
# - Bereits vorhandene Tage werden nie überschrieben (ON CONFLICT DO NOTHING).
# - Tiefst- und Höchstwerte stammen aus Stundenwerten und sind daher etwas weniger extrem als
#   die lückenlos gemessenen Werte der Live-Daten. Sonnenenergie = Summe der Stundenmittel (W/m²) / 1000.

import argparse
import datetime as dt
import sys
from collections import OrderedDict

import openpyxl

MIN_STUNDEN = 18
SPALTEN = ["Datum", "Zeit", "Temperatur", "Feuchte", "Luftdruck", "Niederschlag", "Regenrate",
           "Windgeschwindigkeit", "Boeen", "Windrichtung", "Windverteilung", "UV Index", "Solarstrahlung"]


def lese(pfad):
    ws = openpyxl.load_workbook(pfad, read_only=True, data_only=True).active
    zeilen = ws.iter_rows(values_only=True)
    kopf = list(next(zeilen))
    if kopf[:len(SPALTEN)] != SPALTEN:
        sys.exit(f"{pfad}: unerwartete Spalten {kopf}")
    next(zeilen)  # Einheiten
    return [dict(zip(kopf, z)) for z in zeilen if z[0]]


def werte(z):
    return tuple(z[k] for k in SPALTEN[2:])


def tageswerte(zeilen):
    tage = OrderedDict()
    vorher = None
    verworfen = 0
    for z in zeilen:
        gleich = vorher is not None and werte(z) == werte(vorher)
        vorher = z
        if gleich or z["Luftdruck"] is None:
            verworfen += 1
            continue
        tag = dt.datetime.strptime(z["Datum"], "%d.%m.%Y").date().isoformat()
        tage.setdefault(tag, []).append(z)

    def zahlen(liste, k):
        return [z[k] for z in liste if isinstance(z[k], (int, float))]

    def r(x, n=1):
        return None if x is None else round(x, n)

    aus = []
    for tag, h in tage.items():
        if len(h) < MIN_STUNDEN:
            continue
        t, f, p = zahlen(h, "Temperatur"), zahlen(h, "Feuchte"), zahlen(h, "Luftdruck")
        w, b = zahlen(h, "Windgeschwindigkeit"), zahlen(h, "Boeen")
        avg = lambda a: sum(a) / len(a) if a else None
        aus.append(OrderedDict(
            day=tag,
            temp_min=r(min(t, default=None)), temp_max=r(max(t, default=None)), temp_avg=r(avg(t)),
            hum_avg=r(avg(f), 0), press_avg=r(avg(p)),
            wind_avg=r(avg(w)), wind_max=r(max(w, default=None)), gust_max=r(max(b, default=None)),
            rain_mm=r(sum(zahlen(h, "Niederschlag"))),
            solar_kwh=r(sum(zahlen(h, "Solarstrahlung")) / 1000, 2),
            uv_max=r(max(zahlen(h, "UV Index"), default=None)),
            n=len(h) * 12,
            rainrate_max=r(max(zahlen(h, "Regenrate"), default=None)),
        ))
    return aus, verworfen, len(tage)


def sql(tage):
    spalten = list(tage[0].keys())
    fmt = lambda v: "NULL" if v is None else (f"'{v}'" if isinstance(v, str) else repr(v))
    teile = ["-- AWEKAS-Import: Tageswerte aus Stundenwerten, vorhandene Tage bleiben unverändert"]
    for i in range(0, len(tage), 50):
        werte_ = ",\n".join("(" + ",".join(fmt(t[s]) for s in spalten) + ")" for t in tage[i:i + 50])
        teile.append(f"INSERT INTO tageswerte ({','.join(spalten)}) VALUES\n{werte_}\nON CONFLICT(day) DO NOTHING;")
    return "\n".join(teile) + "\n"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("dateien", nargs="+")
    ap.add_argument("-o", "--ausgabe", default="import.sql")
    a = ap.parse_args()
    zeilen = [z for d in a.dateien for z in lese(d)]
    tage, verworfen, alle = tageswerte(zeilen)
    with open(a.ausgabe, "w", encoding="utf-8", newline="\n") as f:
        f.write(sql(tage))
    print(f"{len(zeilen)} Stunden gelesen, {verworfen} als Ausfall verworfen, "
          f"{len(tage)} von {alle} Tagen übernommen ({tage[0]['day']} bis {tage[-1]['day']}) -> {a.ausgabe}")


if __name__ == "__main__":
    main()
