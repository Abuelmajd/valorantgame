const CACHE_NAME = 'valorant-quiz-v1';
const urlsToCache = [
    '/',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/jett.png',
    '/images/phoenix.png',
    '/images/sage.png',
    '/images/sova.png',
    '/images/brimstone.png',
    '/images/cypher.png',
    '/images/haven.png',
    '/images/bind.png',
    '/images/split.png',
    '/images/ascent.png',
    '/images/icebox.png',
    '/images/breeze.png',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// تنشيط Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// التعامل مع الطلبات
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
