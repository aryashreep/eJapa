const staticOnlineJapa = "eJapa-v1";
const assets = [
  "/",
  "/index.html",
  "/assets/css/style.css",
  "/assets/js/japa_mala.js",
  "/assets/images/chaitanya_desktop.png",
  "/assets/images/chaitanya_desktop.png",
  "/assets/images/japa_mala.jpg",
  "/assets/images/panchatatva_mantra.png",
  "/assets/images/radhakrishna_desktop.png",
  "/assets/images/radhakrishna_mobile.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticOnlineJapa).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});