/* Shore Book — offline cache.
   Bump CACHE when you edit index.html, or the phone keeps the old copy. */
const CACHE = "shore-book-hksg-v1";
const TILES = "shore-tiles-hksg-v1";
/* Other Shore Books can live on the same origin (one GitHub Pages site per
   account), and caches are per origin, not per app. Only ever clear our own. */
const OWN = k => k.indexOf("shore-book-hksg-") === 0 || k.indexOf("shore-tiles-hksg-") === 0;
const TILE_HOSTS = ["tile.openstreetmap.org"];
const TILE_MAX = 400;          /* keep the map you have actually looked at, no more */
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./ata-logo.png",
  "./favicon.svg",
  "./favicon.ico",
  "./apple-touch-icon.png",
  "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => OWN(k) && k !== CACHE && k !== TILES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Map tiles: whatever you looked at while you had signal is still there when
   you do not. Nothing is fetched in bulk — only the tiles actually displayed. */
async function tile(req){
  const c = await caches.open(TILES);
  const hit = await c.match(req);
  if(hit) return hit;
  try{
    const res = await fetch(req);
    if(res && (res.ok || res.type === "opaque")){
      c.put(req, res.clone()).then(() => trim(c)).catch(() => {});
    }
    return res;
  }catch(err){
    return new Response("", {status:504, statusText:"No signal, no tile"});
  }
}
async function trim(c){
  const keys = await c.keys();
  for(let i = 0; i < keys.length - TILE_MAX; i++) await c.delete(keys[i]);
}

/* Cache first: at anchor off Koh Kood or in a Chinatown lane there is no network to fall back to. */
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;

  let url;
  try{ url = new URL(e.request.url); }catch(err){ return; }

  if(TILE_HOSTS.indexOf(url.hostname) > -1){ e.respondWith(tile(e.request)); return; }
  if(url.origin !== self.location.origin) return;   /* leave anything else alone */

  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request)
        .then(res => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => e.request.mode === "navigate"
          ? caches.match("./index.html")
          : new Response("", {status:504, statusText:"Offline"}));
    })
  );
});
