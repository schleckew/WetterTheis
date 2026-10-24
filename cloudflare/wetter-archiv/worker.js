// wetter-archiv – Cloudflare Worker
// Holt alle 5 Minuten die aktuellen AWEKAS-Werte (Cron-Trigger) und speichert sie in D1.
// Liefert die gespeicherten Daten als JSON für statistik.html.
//
// Benötigt:
//   D1-Binding   DB            (Datenbank "wetter")
//   Secret       AWEKAS_KEY    (derselbe API-Key wie im Worker "wetter")
//   Cron-Trigger */5 * * * *
//   optional Secret ADMIN_TOKEN (erlaubt /api/collect?token=... zum manuellen Test)

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS messwerte (
     ts INTEGER PRIMARY KEY, day TEXT NOT NULL,
     temp REAL, dew REAL, hum REAL, press REAL, wind REAL, gust REAL,
     dir INTEGER, rain REAL, rainrate REAL, solar REAL, uv REAL)`,
  `CREATE INDEX IF NOT EXISTS idx_messwerte_day ON messwerte(day)`,
  `CREATE TABLE IF NOT EXISTS tageswerte (
     day TEXT PRIMARY KEY,
     temp_min REAL, temp_max REAL, temp_avg REAL, hum_avg REAL, press_avg REAL,
     wind_avg REAL, wind_max REAL, gust_max REAL, rain_mm REAL, solar_kwh REAL,
     uv_max REAL, n INTEGER, rainrate_max REAL)`,
];

let schemaReady = false;
async function ensureSchema(env) {
  if (schemaReady) return;
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  // Bestehende Datenbanken um die Spalte rainrate_max ergänzen (Fehler = Spalte gibt es schon)
  try { await env.DB.prepare(`ALTER TABLE tageswerte ADD COLUMN rainrate_max REAL`).run(); } catch (_) {}
  schemaReady = true;
}

const v = (x) => (typeof x === "number" && Number.isFinite(x) ? x : null);

function normKey(k) {
  k = String(k || "").trim();
  return /%[0-9A-Fa-f]{2}/.test(k) ? k : encodeURIComponent(k);
}

async function collect(env) {
  await ensureSchema(env);
  if (!env.AWEKAS_KEY) throw new Error("Secret AWEKAS_KEY fehlt");

  const res = await fetch("https://api.awekas.at/current.php?key=" + normKey(env.AWEKAS_KEY), {
    cf: { cacheTtl: 0 },
  });
  if (!res.ok) throw new Error("AWEKAS HTTP " + res.status);
  const j = await res.json();
  if (j.error) throw new Error("AWEKAS: " + j.error);

  const c = j.current || {};
  const d = j.day || {};
  const ts = v(c.datatimestamp);
  if (ts === null) throw new Error("AWEKAS lieferte keinen Messzeitpunkt");

  // Tag nach Stationszeit (Sommer-/Winterzeit steckt in timeoffset)
  const off = v(c.timeoffset) ?? 3600;
  const day = new Date((ts + off) * 1000).toISOString().slice(0, 10);

  const insert = env.DB.prepare(
    `INSERT OR REPLACE INTO messwerte
       (ts, day, temp, dew, hum, press, wind, gust, dir, rain, rainrate, solar, uv)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    ts, day, v(c.temperature), v(c.dewpoint), v(c.humidity), v(c.airpress_rel),
    v(c.windspeed), v(c.gustspeed), v(c.winddirection), v(c.precipitation),
    v(c.rainrate), v(c.solar), v(c.uv)
  );

  // Tageswerte aus den Rohdaten des Tages neu berechnen.
  // Sonnenenergie (kWh/m²) = mittlere Einstrahlung x Zeitspanne (Stunden) / 1000
  const aggregate = env.DB.prepare(
    `INSERT INTO tageswerte
       (day, temp_min, temp_max, temp_avg, hum_avg, press_avg, wind_avg, wind_max,
        gust_max, rain_mm, solar_kwh, uv_max, n, rainrate_max)
     SELECT day, MIN(temp), MAX(temp), AVG(temp), AVG(hum), AVG(press), AVG(wind), MAX(wind),
            MAX(gust), MAX(rain),
            AVG(solar) * ((MAX(ts) - MIN(ts) + 300) / 3600.0) / 1000.0,
            MAX(uv), COUNT(*), MAX(rainrate)
     FROM messwerte WHERE day = ? GROUP BY day
     ON CONFLICT(day) DO UPDATE SET
       temp_min = excluded.temp_min, temp_max = excluded.temp_max, temp_avg = excluded.temp_avg,
       hum_avg = excluded.hum_avg, press_avg = excluded.press_avg, wind_avg = excluded.wind_avg,
       wind_max = excluded.wind_max, gust_max = excluded.gust_max, rain_mm = excluded.rain_mm,
       solar_kwh = excluded.solar_kwh, uv_max = excluded.uv_max, n = excluded.n,
       rainrate_max = excluded.rainrate_max`
  ).bind(day);

  // Die Station misst Extremwerte lückenlos – diese Werte haben Vorrang vor den 5-Minuten-Stichproben.
  const extremes = env.DB.prepare(
    `UPDATE tageswerte SET
       temp_min = COALESCE(?, temp_min), temp_max = COALESCE(?, temp_max),
       gust_max = COALESCE(?, gust_max), uv_max = COALESCE(?, uv_max),
       rainrate_max = COALESCE(?, rainrate_max)
     WHERE day = ?`
  ).bind(v(d.temp_min), v(d.temp_max), v(d.gustspeed_max), v(d.uv_max), v(d.rainrate_max), day);

  await env.DB.batch([insert, aggregate, extremes]);
  return { ts, day, temp: v(c.temperature) };
}

const json = (data, status = 200, cache = "no-store") =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8", "Cache-Control": cache },
  });


// Stundenwerte aus den 5-Minuten-Rohdaten: Mittelwerte, Böenmaximum, Windrichtung (gewichtetes Vektormittel)
// und Niederschlagsmenge als Summe der Zuwächse des Tages-Regenzählers (Rücksetzung um Mitternacht beachtet).
function hourlyFrom(rows, nowSec, hours) {
  const first = Math.floor(nowSec / 3600) * 3600 - hours * 3600;
  const by = new Map();
  let prevRain = null;
  for (const r of rows) {
    const t = Math.floor(r.ts / 3600) * 3600;
    let b = by.get(t);
    if (!b) { b = { t, temp: [], wind: [], gust: [], dx: 0, dy: 0, mm: 0, n: 0 }; by.set(t, b); }
    b.n++;
    if (r.temp != null) b.temp.push(r.temp);
    if (r.wind != null) b.wind.push(r.wind);
    if (r.gust != null) b.gust.push(r.gust);
    if (r.dir != null) {
      const w = (r.wind || 0) + 0.1, a = (r.dir * Math.PI) / 180;
      b.dx += w * Math.sin(a); b.dy += w * Math.cos(a);
    }
    if (r.rain != null) {
      if (prevRain != null) { const d = r.rain - prevRain; b.mm += d >= 0 ? d : r.rain; }
      prevRain = r.rain;
    }
  }
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const out = [];
  for (const b of [...by.values()].sort((x, y) => x.t - y.t)) {
    if (b.t < first) continue;
    const dir = b.dx || b.dy ? Math.round(((Math.atan2(b.dx, b.dy) * 180) / Math.PI + 360) % 360) : null;
    const rd = (x, k) => (x == null ? null : Math.round(x * k) / k);
    out.push({ t: b.t, temp: rd(avg(b.temp), 10), wind: rd(avg(b.wind), 10), gust: b.gust.length ? Math.max(...b.gust) : null, dir, mm: Math.round(b.mm * 10) / 10, n: b.n });
  }
  return out;
}

const RANGES = {
  "24h": { seconds: 86400, bucket: 300 },
  "7d": { seconds: 7 * 86400, bucket: 1800 },
  "30d": { seconds: 30 * 86400, bucket: 3600 },
};
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default {
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(collect(env).catch((e) => console.error("collect:", e.message)));
  },

  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    const url = new URL(request.url);

    try {
      await ensureSchema(env);

      if (url.pathname === "/api/series") {
        const r = RANGES[url.searchParams.get("range")] || RANGES["24h"];
        const since = Math.floor(Date.now() / 1000) - r.seconds;
        const { results } = await env.DB.prepare(
          `SELECT (ts / ?) * ? AS t,
                  ROUND(AVG(temp),1) AS temp, ROUND(AVG(dew),1) AS dew, ROUND(AVG(hum),0) AS hum,
                  ROUND(AVG(press),1) AS press, ROUND(AVG(wind),1) AS wind, ROUND(MAX(gust),1) AS gust,
                  ROUND(AVG(rainrate),2) AS rainrate, ROUND(AVG(solar),0) AS solar, ROUND(MAX(uv),1) AS uv
           FROM messwerte WHERE ts >= ? GROUP BY t ORDER BY t`
        ).bind(r.bucket, r.bucket, since).all();
        return json({ bucket: r.bucket, rows: results }, 200, "public, max-age=60");
      }

      // rainrate_max: Tage aus der Zeit vor dieser Spalte bekommen den Höchstwert der 5-Minuten-Stichproben
      if (url.pathname === "/api/daily") {
        const from = DATE_RE.test(url.searchParams.get("from") || "") ? url.searchParams.get("from") : "1970-01-01";
        const to = DATE_RE.test(url.searchParams.get("to") || "") ? url.searchParams.get("to") : "9999-12-31";
        const { results } = await env.DB.prepare(
          `SELECT day, ROUND(temp_min,1) AS temp_min, ROUND(temp_max,1) AS temp_max, ROUND(temp_avg,1) AS temp_avg,
                  ROUND(hum_avg,0) AS hum_avg, ROUND(press_avg,1) AS press_avg, ROUND(wind_avg,1) AS wind_avg,
                  ROUND(wind_max,1) AS wind_max, ROUND(gust_max,1) AS gust_max, ROUND(rain_mm,1) AS rain_mm,
                  ROUND(solar_kwh,2) AS solar_kwh, ROUND(uv_max,1) AS uv_max, n,
                  ROUND(COALESCE(rainrate_max,
                    (SELECT MAX(m.rainrate) FROM messwerte m WHERE m.day = tageswerte.day)),1) AS rainrate_max
           FROM tageswerte WHERE day >= ? AND day <= ? ORDER BY day`
        ).bind(from, to).all();
        return json({ rows: results }, 200, "public, max-age=300");
      }

      if (url.pathname === "/api/hourly") {
        const hours = Math.min(48, Math.max(1, Number(url.searchParams.get("hours")) || 24));
        const now = Math.floor(Date.now() / 1000);
        const since = now - hours * 3600 - 3600; // eine Stunde Vorlauf für die Regen-Differenz
        const { results } = await env.DB.prepare(
          `SELECT ts, temp, wind, gust, dir, rain FROM messwerte WHERE ts >= ? ORDER BY ts`
        ).bind(since).all();
        const latest = await env.DB.prepare(
          `SELECT ts, temp, dew, hum, press, wind, gust, dir, rain, rainrate, solar, uv FROM messwerte ORDER BY ts DESC LIMIT 1`
        ).first();
        return json({ rows: hourlyFrom(results, now, hours), latest: latest || null }, 200, "public, max-age=60");
      }

      if (url.pathname === "/api/health") {
        const m = await env.DB.prepare(`SELECT COUNT(*) AS n, MIN(ts) AS first, MAX(ts) AS last FROM messwerte`).first();
        const t = await env.DB.prepare(`SELECT COUNT(*) AS days, MIN(day) AS first_day FROM tageswerte`).first();
        return json({ ok: true, messwerte: m, tageswerte: t });
      }

      if (url.pathname === "/api/collect") {
        if (!env.ADMIN_TOKEN || url.searchParams.get("token") !== env.ADMIN_TOKEN) {
          return json({ error: "nicht erlaubt" }, 403);
        }
        return json({ ok: true, saved: await collect(env) });
      }

      return json({ name: "wetter-archiv", endpoints: ["/api/series?range=24h|7d|30d", "/api/hourly?hours=24", "/api/daily?from=YYYY-MM-DD&to=YYYY-MM-DD", "/api/health"] });
    } catch (e) {
      return json({ error: String(e.message || e) }, 500);
    }
  },
};
