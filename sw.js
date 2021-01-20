// const VERSION = "v1"

// self.addEventListener('install',event =>{
//     event.waitUntil(precache());
// })
// self.addEventListener('fetch', event =>{
//     const request = event.request;

//     if(request.method !== "GET"){
//         return;
//     }

//     event.respondWith(cacheResponse())

//     event.waitUntil(updateCache(request))
// })


// async function precache(){
//     const cache = await caches.open(VERSION)
//     return cache.addAll([
//     '/',
//     '/index.html',
//     '/assets/MediaPlayer.js',
//     '/assets/plugins/Autoplay.js',
//     '/assets/plugins/Autopause.js',
//     '/assets/index.css',
//     '/assets/lluvia.mp4',    
//     ])
// }

// async function cacheResponse(request){
//     const cache = await caches.open(VERSION);
//     const response = await cache.match(request);
//     return response || fetch(request);
// }

// async function updateCache(request){
//     const cache = await caches.open(VERSION);
//     const response = await fetch(request);
//     return cache.put(request, response)
// }