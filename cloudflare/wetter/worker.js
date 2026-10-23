// Cloudflare Worker: holt die aktuellen AWEKAS-Daten mit geheimem API-Key
// und gibt sie mit CORS-Header an dein Dashboard weiter.
//
// Benötigt in Cloudflare unter Settings > Variables and Secrets:
//   AWEKAS_KEY  (Typ: Secret)  dein API-Key aus dem AWEKAS-Profil

const ERLAUBTE_HERKUNFT = [
  "https://schleckew.github.io",
];

const CACHE_SEKUNDEN = 60; // AWEKAS wird höchstens einmal pro Minute gefragt

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const h = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };
  if (origin && ERLAUBTE_HERKUNFT.includes(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
  }
  return h;
}

function normKey(k) {
  k = (k || "").trim();
  const m = k.match(/key=([^&\s]+)/);
  if (m) k = m[1];
  return /%[0-9A-Fa-f]{2}/.test(k) ? k : encodeURIComponent(k);
}

export default {
  async fetch(request, env, ctx) {
    const headers = corsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: { ...headers, "Access-Control-Allow-Methods": "GET", "Access-Control-Max-Age": "86400" },
      });
    }
    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "method not allowed" }), { status: 405, headers });
    }
    if (!env.AWEKAS_KEY) {
      return new Response(JSON.stringify({ error: "invalid key" }), { status: 500, headers });
    }

    // Kurzer Zwischenspeicher, damit viele Besucher nur eine AWEKAS-Abfrage pro Minute auslösen
    const cache = caches.default;
    const cacheKey = new Request("https://cache.local/awekas-current");
    let cached = await cache.match(cacheKey);
    if (cached) {
      return new Response(cached.body, { status: 200, headers });
    }

    try {
      const upstream = await fetch(
        "https://api.awekas.at/current.php?key=" + normKey(env.AWEKAS_KEY),
        { headers: { "User-Agent": "wetter-dashboard-worker" } }
      );
      const text = await upstream.text();
      JSON.parse(text); // prüft, dass wirklich JSON zurückkam

      const toCache = new Response(text, {
        headers: { "Cache-Control": "public, max-age=" + CACHE_SEKUNDEN },
      });
      ctx.waitUntil(cache.put(cacheKey, toCache));

      return new Response(text, { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: "upstream error" }), { status: 502, headers });
    }
  },
};
