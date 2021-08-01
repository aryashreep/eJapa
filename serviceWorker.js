const CACHE_NAME = 'dev-japa-v1';
const OFFLINE_URL = 'offline.html';
const urlsToCache = [
  "/",
  "/index.html",
  "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
  "https://code.jquery.com/jquery-3.5.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js",
  "/assets/css/style.css",
  "/assets/js/japa_mala.js",
  "/assets/images/chaitanya_desktop.png",
  "/assets/images/chaitanya_desktop.png",
  "/assets/images/japa_mala.jpg",
  "/assets/images/panchatatva_mantra.png",
  "/assets/images/radhakrishna_desktop.png",
  "/assets/images/radhakrishna_mobile.png"
];

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    });
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  })());
  
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});
