// Epoxy Pro Elite — Service Worker
// Handles PWA caching, push notifications, and notification clicks.

const CACHE_NAME = 'epoxy-elite-v1';
const STATIC_ASSETS = ['/', '/elite', '/manifest.json'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/elite')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// Push notification handler
self.addEventListener('push', (event) => {
  let data = { title: 'Epoxy Pro Elite', body: 'You have a new update.' };
  try {
    if (event.data) data = event.data.json();
  } catch {
    if (event.data) data.body = event.data.text();
  }

  const options = {
    body: data.body,
    icon: 'https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/20999222a_Logo_XPS_Color_12-20-24.webp',
    badge: 'https://media.base44.com/images/public/6a77f4491f0bf92de9a3ed8b/20999222a_Logo_XPS_Color_12-20-24.webp',
    data: { url: data.url || '/elite' },
    vibrate: [100, 50, 100],
    tag: data.tag || 'epoxy-elite',
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click — open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/elite';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});

// Push subscription change — re-subscribe if the endpoint changes
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    self.registration.pushManager.getSubscription().then(async (subscription) => {
      if (!subscription) return;
      const clientList = await self.clients.matchAll({ includeUncontrolled: true });
      clientList.forEach((client) => {
        client.postMessage({ type: 'pushsubscriptionchange', subscription });
      });
    })
  );
});
