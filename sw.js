

const cacheName = "shell-contentv6"
const filesToCache = [
    '/',
    '/style.css',
    '/logo192.png',
    '/script.js',
    '/index.html',
    '/offline.html'
]

self.addEventListener('install', evt => {
    console.log("installed")
    evt.waitUntil(
        caches.open(cacheName)
        .then(cache =>  {
            console.log("Caching app shell")
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('activate', evt => {
    console.log("activated")
    evt.waitUntil(
        caches.keys()
        .then(cacheNames => {
            console.log(cacheNames)
            return Promise.all(
                cacheNames.filter(oldCache => cacheName !== oldCache)
                .map(cacheName => caches.delete(cacheName))
            )
        })
    )
})

// Cache first
self.addEventListener('fetch', evt => {
    evt.respondWith(caches.match(evt.request)
    .then(response => {
        return response || fetch(evt.request)
    })
    .catch(err => caches.match('/offline.html'))
    )
})
