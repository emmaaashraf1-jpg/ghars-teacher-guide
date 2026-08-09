/* دليل غرس القيم — عامل الخدمة (شبكة أولًا للصفحات · كاش أولًا للأصول الثابتة) */
var CACHE = 'ghars-v2';

self.addEventListener('install', function(e){ self.skipWaiting(); });

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET') return;
  var url;
  try { url = new URL(e.request.url); } catch(err){ return; }
  if(url.origin!==location.origin) return; // أصول خارجية تُترك للمتصفّح
  // ملفات قابلة للتنزيل/كبيرة (PDF، مستندات، وسائط): يتولّاها المتصفّح مباشرةً بلا تدخّل
  if(/\.(pdf|docx?|xlsx?|pptx?|mp4|webm|mp3|zip)$/i.test(url.pathname)) return;

  var accept = e.request.headers.get('accept') || '';
  var isHTML = e.request.mode==='navigate' || accept.indexOf('text/html')>=0;

  if(isHTML){
    /* شبكة أولًا: الصفحة دائمًا محدّثة عند الاتصال، والكاش احتياطٌ عند انقطاعه */
    e.respondWith(
      fetch(e.request).then(function(res){
        var clone = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        return res;
      }).catch(function(){
        return caches.match(e.request).then(function(hit){ return hit || caches.match('index.html'); });
      })
    );
  } else {
    /* كاش أولًا للأصول الثابتة (خطوط/صور/أنماط/سكربت) */
    e.respondWith(
      caches.match(e.request).then(function(hit){
        return hit || fetch(e.request).then(function(res){
          if(res && res.status===200 && (res.type==='basic' || res.type==='cors')){
            var clone = res.clone();
            caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
          }
          return res;
        });
      })
    );
  }
});
