/* دليل غرس القيم — نسخة تجريبية · عامل الخدمة (تخزين مؤقّت للعمل دون اتصال) */
var CACHE = 'ghars-trial-v2-icons';
var CORE = ['index.html','unit-family.html','unit-layl-nahar.html','app.css','app.js','manifest.json'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE).catch(function(){}); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});

/* stale-while-revalidate: يخدم من الذاكرة فورًا ويحدّثها في الخلفية */
self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      var net = fetch(e.request).then(function(res){
        if(res && res.status===200 && (res.type==='basic' || res.type==='cors')){
          var clone = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        }
        return res;
      }).catch(function(){ return hit; });
      return hit || net;
    })
  );
});
