// Offline cache: network first, cached copy when offline. Version 0.5
const CACHE = "vokab-v0.5";
const FILES = ["./", "index.html", "cs.html", "en.html", "words-cs.json", "manifest-uk.json", "manifest-cs-uk.json", "manifest-en-uk.json", "manifest-en.json", "manifest-cs-en.json", "manifest-en-en.json", "manifest-cs.json", "manifest-cs-cs.json", "manifest-en-cs.json", "manifest-ru.json", "manifest-cs-ru.json", "manifest-en-ru.json", "icon-180.png", "icon-192.png", "icon-512.png", "icon-cs-180.png", "icon-cs-192.png", "icon-cs-512.png", "icon-en-180.png", "icon-en-192.png", "icon-en-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match("index.html"))));
});
