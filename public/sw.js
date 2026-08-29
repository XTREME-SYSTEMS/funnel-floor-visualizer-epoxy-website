const CACHE_NAME = "epoxy-pro-guide-v1";
const APP_SHELL = ["/epoxy-pro-guide", "/index.html"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return (
        cached ||
        fetch(e.request)
          .then((res) => {
            if (res && res.status === 200 && e.request.url.startsWith(self.location.origin)) {
              const clone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
            }
            return res;
          })
          .catch(() => cached)
      );
    })
  );
});
