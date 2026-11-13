// Erzeugt tagesmittel.json: Tagesmittel der Außentemperatur für jeden abgeschlossenen Tag (Ortszeit).
//
//   node tools/tagesmittel.mjs <ausgabe.json>
//
// Quelle "station": Tageswert aus dem Archiv (Worker wetter-archiv), wenn genug Messungen vorliegen.
// Quelle "modell":  sonst Tagesmittel von Open-Meteo (ERA5) für Wincheringen.
// Anzahl = Messwerte der Station, die ins Tagesmittel eingegangen sind (5-Minuten-Werte im Live-Archiv,
// Stundenwerte bei den importierten AWEKAS-Exporten), 0 bei Modellwerten.
// Wird täglich vom Workflow erzeugt und mit der Seite auf GitHub Pages veröffentlicht.

import { writeFileSync } from "node:fs";

const ARCHIV = "https://wetter-archiv.eweiter.workers.dev";
const LAT = 49.61, LON = 6.40, TZ = "Europe/Berlin";
const MIN_N = 144;   // mindestens 12 Stunden Messungen (in 5-Minuten-Einheiten, wie im Archiv gezählt)

const ausgabe = process.argv[2] || "tagesmittel.json";
const ymd = (ms) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(ms));
const addDays = (day, n) => { const [y, m, d] = day.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
const r1 = (x) => Math.round(x * 10) / 10;

async function json(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const j = await res.json();
  if (j.error) throw new Error(`${url}: ${j.reason || j.error}`);
  return j;
}

const gestern = addDays(ymd(Date.now()), -1);
const [daily, health] = await Promise.all([json(`${ARCHIV}/api/daily`), json(`${ARCHIV}/api/health`)]);
const erster = daily.rows.length ? daily.rows[0].day : gestern;
// Tage vor dem ersten 5-Minuten-Wert stammen aus den stündlichen AWEKAS-Exporten (n = Stunden x 12)
const liveAb = health.messwerte && health.messwerte.first ? ymd(health.messwerte.first * 1000) : gestern;

const modell = await json("https://archive-api.open-meteo.com/v1/archive?latitude=" + LAT + "&longitude=" + LON +
  `&start_date=${erster}&end_date=${gestern}&daily=temperature_2m_mean&timezone=${encodeURIComponent(TZ)}`);
const mod = new Map(modell.daily.time.map((t, i) => [t, modell.daily.temperature_2m_mean[i]]));
const sta = new Map(daily.rows.map((r) => [r.day, r]));

const tage = [];
for (let day = erster; day <= gestern; day = addDays(day, 1)) {
  const s = sta.get(day), m = mod.get(day);
  if (s && s.n >= MIN_N && typeof s.temp_avg === "number") {
    tage.push({ datum: day, tagesmittel: r1(s.temp_avg), anzahl: day < liveAb ? Math.round(s.n / 12) : s.n, quelle: "station" });
  } else if (typeof m === "number") {
    tage.push({ datum: day, tagesmittel: r1(m), anzahl: 0, quelle: "modell" });
  }
}

writeFileSync(ausgabe, "[\n" + tage.map((t) => JSON.stringify(t)).join(",\n") + "\n]\n");   // ein Tag je Zeile
const st = tage.filter((t) => t.quelle === "station").length;
console.log(`${tage.length} Tage (${tage[0]?.datum} bis ${tage.at(-1)?.datum}): ${st} Station, ${tage.length - st} Modell -> ${ausgabe}`);
