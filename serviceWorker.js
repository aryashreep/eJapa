const CACHE_NAME = "dev-japa-v1";
const OFFLINE_URL = "offline.html";
const urlsToCache = [
  "./",
  "./index.html",
  "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
  "https://code.jquery.com/jquery-3.6.0.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.js",
  "./main.css",
  "./bundle.js",
  "./favicon.ico",
  "./img/chaitanya_desktop.png",
  "./img/chaitanya_mobile.png",
  "./img/icon-72x72.png",
  "./img/icon-96x96.png",
  "./img/icon-128x128.png",
  "./img/icon-144x144.png",
  "./img/icon-152x152.png",
  "./img/icon-192x192.png",
  "./img/icon-512x512.png",
  "./img/japa_mala.jpg",
  "./img/panchatatva_mantra.png",
  "./img/radhakrishna_desktop.png",
  "./img/radhakrishna_mobile.png",
  "./img/rotate.png",
  "./offline.html",
  "./manifest.json",
  "./LICENSE",
  "./README.md",
  "./serviceWorker.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  // Setting {cache: 'reload'} in the new request will ensure that the response
  // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
  // await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log(
            "[Service Worker] Fetch failed; returning offline page instead.",
            error
          );

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});
