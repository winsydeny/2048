


var cacheStorageKey = 'minimal-pwa-1';

var cacheList = [
  "index.html",
  "/css/style.css",
  "/js/main.js",
  "/img/App.png"
]

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
    )
})



self.addEventListener('activate', function(e) {
    e.waitUntil(
      Promise.all(
        caches.keys().then(cacheNames => {
          return cacheNames.map(name => {
            if (name !== cacheStorageKey) {
              return caches.delete(name)
            }
          })
        })
      ).then(() => {
        return self.clients.claim()
      })
    )
  })


  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });

  // self.addEventListener('fetch', event => {

  //   // abandon non-GET requests
  //   if (event.request.method !== 'GET') return;
  
  //   let url = event.request.url;
  
  //   event.respondWith(
  
  //     caches.open(cacheStorageKey)
  //       .then(cache => {
  
  //         return cache.match(event.request)
  //           .then(response => {
  
  //             if (response) {
  //               // return cached file
  //               console.log('cache fetch: ' + url);
  //               return response;
  //             }
  
  //             // make network request
  //             return fetch(event.request)
  //               .then(newreq => {
  
  //                 console.log('network fetch: ' + url);
  //                 if (newreq.ok) cache.put(event.request, newreq.clone());
  //                 return newreq;
  
  //               })
  //               // app is offline
  //               .catch(() => offlineAsset(url));
  
  //           });
  
  //       })
  
  //   );
  
  // });
  