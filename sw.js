// Service Worker — PokéDex Colección
// Solo cachea el shell de la app (HTML, fuentes).
// Los datos de la colección siempre vienen de Firebase (nunca se cachean aquí).

const CACHE_NAME = 'pokedex-v17';
const BASE = '/pokecollector';

const SHELL = [
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/icons/icon-192.png`,
  `${BASE}/icons/icon-512.png`,
  'https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;900&display=swap',
];

// ── Instalar: precachear shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

// ── Activar: borrar caches viejos ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: network-first para Firebase/APIs externas, cache-first para shell ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Firebase, PokeAPI y TCGdex: siempre red (datos en tiempo real)
  if (
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('pokeapi.co') ||
    url.hostname.includes('tcgdex.net') ||
    url.hostname.includes('raw.githubusercontent.com')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Shell: cache-first con fallback a red
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cachear respuestas válidas del shell
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
