const CACHE_NAME="areeta-prioriza-v1";
self.addEventListener("install",event=>{self.skipWaiting();});
self.addEventListener("activate",event=>{event.waitUntil(self.clients.claim());});
self.addEventListener("fetch",event=>{
 event.respondWith(
  caches.open(CACHE_NAME).then(async cache=>{
   try{
    const response=await fetch(event.request);
    if(event.request.method==="GET") cache.put(event.request,response.clone());
    return response;
   }catch(e){
    const cached=await cache.match(event.request);
    return cached || Response.error();
   }
  })
 );
});