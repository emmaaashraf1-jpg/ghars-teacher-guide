  <div class="foot">{{FOOT}}</div>
  <div class="gq-dev-credit" style="margin:22px auto 0;max-width:540px;padding:18px 16px 4px;border-top:1px solid var(--line);display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center"><span style="font-size:11.5px;color:var(--muted);letter-spacing:.3px">إعداد وتطوير وإخراج دليل المعلمة</span><a href="https://www.hadarah-consulting.com/" target="_blank" rel="noopener" style="display:inline-block;line-height:0"><img src="brand/hadarah-logo.png" alt="شركة حضارة للاستشارات التربوية والتعليمية" style="width:104px;height:auto;display:block"/></a><a href="https://www.hadarah-consulting.com/" target="_blank" rel="noopener" style="font-family:var(--fd);font-size:14.5px;color:#1e5631;text-decoration:none;font-weight:700">شركة حضارة للاستشارات التربوية والتعليمية</a><a href="https://www.hadarah-consulting.com/" target="_blank" rel="noopener" style="font-size:11.5px;color:var(--elm,#0E6E6B);text-decoration:none">www.hadarah-consulting.com</a></div>
</div>

<script>
(function(){
  var doc=document, root=doc.documentElement, body=doc.body;
  var pb=doc.createElement('div'); pb.className='gq-progress'; body.appendChild(pb);
  var top=doc.createElement('button'); top.className='gq-top'; top.setAttribute('aria-label','العودة للأعلى'); top.textContent='↑'; body.appendChild(top);
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  function onScroll(){ var sc=window.pageYOffset||root.scrollTop, max=(root.scrollHeight-root.clientHeight)||1; pb.style.width=Math.min(100,sc/max*100)+'%'; if(sc>320){top.classList.add('show');}else{top.classList.remove('show');} }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  var lb=doc.createElement('div'); lb.className='gq-lb'; lb.innerHTML='<button class="close" aria-label="اغلاق">✕</button><figure><img alt=""/><figcaption class="cap"></figcaption></figure>'; body.appendChild(lb);
  var lbImg=lb.querySelector('img'), lbCap=lb.querySelector('.cap');
  function closeLb(){lb.classList.remove('open'); lbImg.removeAttribute('src');}
  lb.addEventListener('click',function(e){ if(e.target===lb||e.target.classList.contains('close')) closeLb(); });
  doc.addEventListener('keydown',function(e){ if(e.key==='Escape') closeLb(); });
  doc.querySelectorAll('.gitem img, .step-media img').forEach(function(im){
    im.addEventListener('click',function(){ var cap='', box=im.closest('.gitem')||im.closest('.step-media'); if(box){var c=box.querySelector('.cap'); if(c) cap=c.textContent;} lbImg.src=im.currentSrc||im.src; lbCap.textContent=cap; lb.classList.add('open'); });
  });
  var tabs=[].slice.call(doc.querySelectorAll('.tab'));
  var KEY='gq-fam-tab-'+(doc.title||'l');
  function activate(btn,save,scroll){ tabs.forEach(function(t){t.classList.remove('active');}); doc.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active');}); btn.classList.add('active'); var p=doc.getElementById(btn.dataset.p); if(p) p.classList.add('active'); if(save){ try{localStorage.setItem(KEY,btn.dataset.p);}catch(e){} } if(scroll){ window.scrollTo({top:0,behavior:'smooth'}); } }
  tabs.forEach(function(btn,i){ btn.setAttribute('tabindex','0'); btn.addEventListener('click',function(){ activate(btn,true,true); }); btn.addEventListener('keydown',function(e){ if(e.key==='ArrowLeft'||e.key==='ArrowRight'){ e.preventDefault(); var dir=(e.key==='ArrowLeft')?1:-1, ni=(i+dir+tabs.length)%tabs.length; tabs[ni].focus(); activate(tabs[ni],true,false); } }); });
  try{ var saved=localStorage.getItem(KEY); if(saved){ var b=doc.querySelector('.tab[data-p="'+saved+'"]'); if(b) activate(b,false,false); } }catch(e){}
  function fallback(txt,cb){ var ta=doc.createElement('textarea'); ta.value=txt; ta.style.position='fixed'; ta.style.opacity='0'; body.appendChild(ta); ta.select(); try{doc.execCommand('copy');}catch(e){} body.removeChild(ta); cb(); }
  doc.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click',function(){ var target=doc.querySelector(btn.getAttribute('data-copy')); if(!target) return; var clone=target.cloneNode(true); clone.querySelectorAll('.l,.copy-btn').forEach(function(n){n.remove();}); clone.querySelectorAll('strong').forEach(function(n){n.textContent='*'+n.textContent+'*';}); clone.querySelectorAll('em').forEach(function(n){n.textContent='_'+n.textContent+'_';}); var txt=(clone.innerText||clone.textContent||'').replace(/\n{3,}/g,'\n\n').trim(); function done(){ var o=btn.getAttribute('data-lbl'); if(!o){o=btn.textContent; btn.setAttribute('data-lbl',o);} btn.textContent='✓ نُسخ'; btn.classList.add('copied'); setTimeout(function(){ btn.textContent=o; btn.classList.remove('copied'); },1500); } if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(function(){fallback(txt,done);}); } else { fallback(txt,done); } });
  });
})();
</script>
<!--gq-credit-embed-hide--><script>try{if(window.self!==window.top){var _c=document.querySelector(".gq-dev-credit");if(_c)_c.style.display="none";}}catch(e){}</script>
<script src="brand/guide-icons.js?v=2"></script>
<script id="gq-lb-iframe-fix">
(function(){if(window.self===window.top)return;var lb=document.querySelector('.gq-lb');if(!lb)return;function pos(){if(!lb.classList.contains('open'))return;try{var fr=window.frameElement;if(!fr)return;var t=window.top,r=fr.getBoundingClientRect(),vh=t.innerHeight,off=Math.max(0,-r.top);lb.style.position='absolute';lb.style.top=off+'px';lb.style.bottom='auto';lb.style.left='0';lb.style.right='0';lb.style.width='100%';lb.style.height=vh+'px';}catch(e){}}var mo=new MutationObserver(function(){if(lb.classList.contains('open'))pos();});mo.observe(lb,{attributes:true,attributeFilter:['class']});})();
</script>
<script id="gp-lbcard-aug">(function(){var lb=document.querySelector('.gq-lb');if(!lb)return;var lbCard=lb.querySelector('.lb-card');if(!lbCard){lbCard=document.createElement('div');lbCard.className='lb-card';lb.appendChild(lbCard);}function cl(){lb.classList.remove('open','card-open');lbCard.innerHTML='';}lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('close'))cl();});document.addEventListener('keydown',function(e){if(e.key==='Escape')cl();});document.querySelectorAll('[data-enlarge]').forEach(function(el){el.addEventListener('click',function(){var t=document.getElementById(el.getAttribute('data-enlarge'));if(!t)return;lbCard.innerHTML='';var c=t.cloneNode(true);c.removeAttribute('id');lbCard.appendChild(c);lb.classList.add('open','card-open');});});})();</script>
</body>
</html>
