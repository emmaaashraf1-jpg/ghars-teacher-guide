/* دليل غرس القيم · سلوكيات تطوير تجربة المعلمة (UX/UI) — طبقة مشتركة لكل الوحدات.
   التفعيل في أي وحدة: أضيفي <script src="app.js"></script> قبل </body> — يركّب بقيّته بنفسه. */
(function(){
  'use strict';
  var doc=document, body=doc.body;
  body.classList.add('trial');
  /* معرّف الوحدة من اسم الملف (unit-XXX.html → XXX) ليكون مفتاح التقدّم فريدًا لكل وحدة */
  var UNIT = ((location.pathname.split('/').pop()||'unit').replace(/\.html?$/i,'').replace(/^unit-/,'')) || 'unit';

  /* ---------- تركيب ذاتي: مسارات + أنماط + PWA (يكفي سطر <script src="app.js"> لتفعيل كل شيء) ---------- */
  var BASE=(function(){ try{ var s=doc.currentScript; if(!s){ var ss=doc.getElementsByTagName('script'); s=ss[ss.length-1]; } return (s&&s.src||'').replace(/[^\/]*$/,''); }catch(e){ return ''; } })();
  (function ensureHead(){
    var h=doc.head||doc.getElementsByTagName('head')[0]; if(!h) return;
    if(!doc.querySelector('link[rel="stylesheet"][href*="app.css"]')) h.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="'+BASE+'app.css"/>');
    if(!doc.querySelector('link[rel="manifest"]')) h.insertAdjacentHTML('beforeend','<link rel="manifest" href="'+BASE+'manifest.json"/>');
    if(!doc.querySelector('meta[name="theme-color"]')) h.insertAdjacentHTML('beforeend','<meta name="theme-color" content="#00575C"/>');
    if(!doc.querySelector('link[rel="apple-touch-icon"]')) h.insertAdjacentHTML('beforeend','<link rel="apple-touch-icon" href="'+BASE+'brand/logo-ghars.webp"/>');
  })();

  function svg(p,cls){ return '<svg class="'+(cls||'tico')+'" viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'; }

  /* ---------- أيقونات ---------- */
  var I = {
    book:'<path d="M4 4h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4zM20 4h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z"/>',
    cap:'<path d="M12 4l9 4-9 4-9-4 9-4z"/><path d="M6 10v4c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4"/>',
    dome:'<path d="M6 21V11a6 6 0 0 1 12 0v10M4 21h16M12 2v3"/>',
    door:'<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M9 12h.01M6 21h12"/>',
    star:'<path d="M12 3l2 5 5 .5-3.8 3.4L16.5 17 12 14.3 7.5 17l1.3-5.1L5 8.5 10 8z"/>',
    letter:'<path d="M7 20c-2 0-3-1.2-3-3s1-3 3-3 3 1.4 3 3.4V20M14 4v11a3 3 0 0 0 3 3"/>',
    grid:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    puzzle:'<path d="M10 3h4v3a2 2 0 1 0 4 0V3h0v4h3a2 2 0 1 1 0 4h-3v4h0v3h-4a2 2 0 1 0-4 0v3H6v-3a2 2 0 1 1 0-4H3V7h3V3z"/>',
    day:'<path d="M3 12h3M18 12h3M12 3v3M6.3 6.3l2 2M15.7 6.3l-2 2"/><circle cx="12" cy="14" r="4"/>',
    play:'<path d="M8 5l11 7-11 7z"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    check:'<path d="M4 12l5 5L20 6"/>',
    grid2:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    idea:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    scale:'<path d="M12 4v16M6 8h12M6 8l-3 6a3 3 0 0 0 6 0zM18 8l-3 6a3 3 0 0 0 6 0z"/>',
    map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
    note:'<path d="M6 3h12v18l-6-3-6 3z"/>',
    home:'<path d="M4 11l8-7 8 7M6 10v10h12V10"/>',
    beads:'<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/><circle cx="12" cy="3" r="1.4"/><circle cx="12" cy="21" r="1.4"/><circle cx="3" cy="12" r="1.4"/><circle cx="21" cy="12" r="1.4"/>',
    meal:'<path d="M4 4v5a2 2 0 0 0 4 0V4M6 4v16M16 4c-1.5 0-2.5 2-2.5 5s2.5 3 2.5 3v8"/>',
    ball:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18"/>',
    blocks:'<path d="M12 3l8 4-8 4-8-4 8-4zM4 7v10l8 4 8-4V7M12 11v10"/>',
    scroll:'<path d="M8 3h9a1 1 0 0 1 1 1v13a2 2 0 0 0 2 2H7a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3zM9 8h6M9 12h6M9 16h4"/>'
  };
  var UTAB_ICON={days:'note',usage:'idea',theme:'map',unit:'book',week:'day',values:'star',lang:'letter',manzooma:'play',songs:'play',fitness:'scale',corners:'puzzle'};
  var SUBJ_ICON=[['أذكار','beads'],['وجبة','meal'],['ساحة','ball'],['أركان','blocks'],['أدرك','idea'],['منظومة','scroll'],['كتابي','book'],['علّمني','cap'],['قال رسولي','dome'],['رسولي','dome'],['أدب','door'],['أحبك','star'],['لساني','letter'],['مهاراتي','grid'],['مركز اللغة','puzzle'],['مركز الرياضيات','grid2'],['البرنامج','note'],['برنامج','note']];
  function subjIcon(t){ for(var i=0;i<SUBJ_ICON.length;i++){ if(t.indexOf(SUBJ_ICON[i][0])>=0) return I[SUBJ_ICON[i][1]]; } return I.book; }
  function injectIcons(){
    [].forEach.call(doc.querySelectorAll('.utab'),function(b){ var k=UTAB_ICON[b.dataset.u]; if(k&&!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin',svg(I[k])); });
    [].forEach.call(doc.querySelectorAll('.subtab'),function(b){ if(!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin',svg(subjIcon(b.textContent))); });
    [].forEach.call(doc.querySelectorAll('.daytab'),function(b){ if(!b.querySelector('.done-dot')) b.insertAdjacentHTML('beforeend','<span class="done-dot">'+svg(I.check,'')+'</span>'); });
  }

  /* ---------- شريط علوي + مسار تنقّل + بحث ---------- */
  function buildTopbar(){
    var logo = doc.querySelector('.hero-badge-logo img'); var lsrc = logo?logo.getAttribute('src'):(BASE+'brand/logo-ghars.webp');
    var title = (doc.querySelector('.hero-title')||{}).textContent||'دليل المعلمة';
    var bar = doc.createElement('div'); bar.className='tbar';
    bar.innerHTML =
      '<a class="brand" href="index.html"><img src="'+lsrc+'" alt="غرس القيم"/><span>غرس القيم</span></a>'+
      '<nav class="crumbs" id="crumbs"><b>'+title+'</b></nav>'+
      '<div class="searchbox"><input id="q" type="search" placeholder="ابحثي عن درس أو موضوع…" aria-label="بحث"/>'+svg(I.search,'')+'<div class="search-results" id="sr"></div></div>'+
      '<div class="tbar-sp"></div>'+
      '<button class="tbtn" id="btnDash">'+svg(I.grid2,'')+'<span>متابعتي</span></button>'+
      '<button class="tbtn primary" id="btnTeach">'+svg(I.play,'')+'<span>وضع التدريس</span></button>';
    var wrap=doc.querySelector('.wrap'); wrap.parentNode.insertBefore(bar,wrap);
    var strip=doc.createElement('div'); strip.className='progstrip';
    strip.innerHTML='<div class="progwrap"><span class="ptit">'+svg(I.check,'')+'تقدّمك في الوحدة</span><div class="progbar" id="pbar"><i></i></div><span class="progtxt" id="progtxt">…</span><button class="reset" id="resetProg">تصفير</button></div>';
    wrap.parentNode.insertBefore(strip,wrap);
  }
  function setCrumb(){
    var day=doc.querySelector('.daypanel.active'), sub=day?day.querySelector('.subpanel.active .subj'):null;
    var uactive=doc.querySelector('.utab.active'), unm=doc.querySelector('.hero-title').textContent;
    var c=[ '<b>'+unm+'</b>' ];
    if(uactive && uactive.dataset.u!=='days'){ c.push('<span class="sep">›</span>'+uactive.textContent.trim()); }
    else { var dt=doc.querySelector('.daytab.active .d-t'); if(dt) c.push('<span class="sep">›</span>'+dt.textContent.trim()); if(sub) c.push('<span class="sep">›</span>'+sub.textContent.trim()); }
    doc.getElementById('crumbs').innerHTML=c.join(' ');
  }

  /* ---------- تمييز اليوم ---------- */
  function markToday(){
    var wd=new Date().getDay(); // 0 أحد .. 6 سبت
    var map={0:1,1:2,2:3,3:4,4:5}; var d=map[wd];
    if(!d) return; var t=doc.querySelector('.daytab[data-d="'+d+'"]');
    if(t){ t.classList.add('today'); if(!t.querySelector('.today-badge')) t.querySelector('.d-n').insertAdjacentHTML('beforeend',' <span class="today-badge">اليوم</span>'); }
  }

  /* ---------- التقدّم ---------- */
  var PK='ghars-prog-'+UNIT;
  function prog(){ try{return JSON.parse(localStorage.getItem(PK))||{};}catch(e){return {};} }
  function saveProg(p){ try{localStorage.setItem(PK,JSON.stringify(p));}catch(e){} }
  function lessonKey(){ var sp=doc.querySelector('.daypanel.active .subpanel.active iframe'); return sp?(sp.getAttribute('data-src')||sp.getAttribute('src')||''):''; }
  function refreshProg(){
    var p=prog(), all=[].slice.call(doc.querySelectorAll('.subpanel iframe')).map(function(f){return f.getAttribute('data-src');});
    var done=all.filter(function(k){return p[k];}).length;
    var bar=doc.getElementById('pbar'); if(bar) bar.querySelector('i').style.width=(all.length?Math.round(done/all.length*100):0)+'%';
    var ptxt=doc.getElementById('progtxt'); if(ptxt) ptxt.textContent='أنجزتِ '+done+' من '+all.length+' لقاءً';
    // علامات على تبويبات المواد لليوم النشط
    var day=doc.querySelector('.daypanel.active'); if(day){ [].forEach.call(day.querySelectorAll('.subpanel'),function(sp,i){ var f=sp.querySelector('iframe'); var st=day.querySelectorAll('.subtab')[i]; if(f&&st){ st.classList.toggle('done',!!p[f.getAttribute('data-src')]); if(!st.querySelector('.done-dot')) st.insertAdjacentHTML('beforeend','<span class="done-dot">'+svg(I.check,'')+'</span>'); } }); }
    // اليوم مكتمل إن اكتملت كل موادّه
    [].forEach.call(doc.querySelectorAll('.daypanel'),function(dp){ var fs=[].slice.call(dp.querySelectorAll('.subpanel iframe')); var dt=doc.querySelector('.daytab[data-d="'+dp.id.replace('d','')+'"]'); if(dt&&fs.length) dt.classList.toggle('done',fs.every(function(f){return p[f.getAttribute('data-src')];})); });
    renderJourney();
    var asp=doc.querySelector('.daypanel.active .subpanel.active'); var md=asp?asp.querySelector('.mark-done'):null;
    if(md){ var on=!!p[lessonKey()]; md.classList.toggle('is-done',on); md.querySelector('span').textContent=on?'تمّ هذا اللقاء ✓':'وضع علامة «تمّ»'; }
  }
  function toggleDone(){ var p=prog(), k=lessonKey(); if(!k)return; if(p[k])delete p[k]; else p[k]=1; saveProg(p); refreshProg(); trialToast(p[k]?'أُضيف للإنجاز':'أُزيل من الإنجاز'); }

  /* ---------- نظرة سريعة + علامة تمّ فوق كل درس ---------- */
  function ensureLessonHeader(){
    var sp=doc.querySelector('.daypanel.active .subpanel.active'); if(!sp)return;
    if(!sp.querySelector('.qglance')){
      var subj=(sp.querySelector('.subj')||{}).textContent||''; var ttl=(sp.querySelector('h2')||{}).textContent||'';
      var head=sp.querySelector('.day-head'); if(!head) return;
      var glance='<div class="qglance">'+
        '<div class="qg"><div class="k">'+svg(I.cap,'')+'المادة</div><div class="v">'+subj+'</div></div>'+
        '<div class="qg"><div class="k">'+svg(I.note,'')+'اللقاء</div><div class="v">'+ttl+'</div></div>'+
        '<div class="qg"><div class="k">'+svg(I.clock,'')+'المدة</div><div class="v">نصف ساعة</div></div>'+
        '<div class="qg"><div class="k">'+svg(I.check,'')+'المرحلة</div><div class="v">تحضير · تنفيذ · إثراء</div></div>'+
        '</div>';
      var mdbtn='<button class="mark-done" type="button">'+svg(I.check,'')+'<span>وضع علامة «تمّ»</span></button>';
      head.insertAdjacentHTML('afterend', glance+mdbtn);
      sp.querySelector('.mark-done').addEventListener('click',toggleDone);
    }
    refreshProg();
  }

  /* ---------- بحث ---------- */
  var INDEX=[];
  function buildIndex(){
    [].forEach.call(doc.querySelectorAll('.daypanel'),function(dp){
      var dnum=dp.id.replace('d',''); var dt=doc.querySelector('.daytab[data-d="'+dnum+'"] .d-t'); var theme=dt?dt.textContent.trim():'';
      [].forEach.call(dp.querySelectorAll('.subpanel'),function(sp,i){
        var subjEl=sp.querySelector('.subj')||sp.querySelector('.rc-name'); var subj=subjEl?subjEl.textContent.trim():''; var ttlEl=sp.querySelector('h2')||sp.querySelector('.rc-name'); var ttl=ttlEl?ttlEl.textContent.trim():'';
        var color=(sp.querySelector('.day-head')||{style:{}}).style.getPropertyValue?getComputedStyle(sp.querySelector('.day-head')).getPropertyValue('--sc'):'';
        INDEX.push({day:dnum,theme:theme,subj:subj,ttl:ttl,s:i+1,color:color,text:(subj+' '+ttl+' '+theme).toLowerCase()});
      });
    });
  }
  function runSearch(q){
    var box=doc.getElementById('sr'); q=(q||'').trim().toLowerCase();
    if(!q){ box.classList.remove('open'); box.innerHTML=''; return; }
    var res=INDEX.filter(function(r){return r.text.indexOf(q)>=0;}).slice(0,10);
    if(!res.length){ box.innerHTML='<div class="sr-empty">لا نتائج لـ«'+q+'»</div>'; box.classList.add('open'); return; }
    box.innerHTML=res.map(function(r){ return '<div class="sr" data-d="'+r.day+'" data-s="'+r.s+'" style="--ac:'+(r.color||'var(--t2)')+'"><span class="subj">'+r.subj+'</span><span class="ttl">'+r.ttl+'</span><span class="day">'+r.theme+'</span></div>'; }).join('');
    box.classList.add('open');
    [].forEach.call(box.querySelectorAll('.sr'),function(el){ el.addEventListener('click',function(){ gotoLesson(el.dataset.d,el.dataset.s); box.classList.remove('open'); doc.getElementById('q').value=''; }); });
  }
  function gotoLesson(d,s){
    var utab=doc.querySelector('.utab[data-u="days"]'); if(utab) utab.click();
    var dt=doc.querySelector('.daytab[data-d="'+d+'"]'); if(dt) dt.click();
    setTimeout(function(){ var st=doc.querySelector('#d'+d+' .subtab[data-s="'+s+'"]'); if(st) st.click(); afterNav(); },30);
  }

  /* ---------- خريطة الرحلة ---------- */
  function renderJourney(){
    var host=doc.getElementById('journey'); if(!host)return; var p=prog();
    var days=[].slice.call(doc.querySelectorAll('.daytab'));
    var cur=doc.querySelector('.daytab.active'); var curd=cur?cur.dataset.d:'1';
    host.innerHTML=days.map(function(t){
      var d=t.dataset.d, th=(t.querySelector('.d-t')||{}).textContent||'', nm=(t.querySelector('.d-n')||{}).textContent||'';
      var dp=doc.getElementById('d'+d); var fs=dp?[].slice.call(dp.querySelectorAll('.subpanel iframe')):[];
      var done=fs.length&&fs.every(function(f){return p[f.getAttribute('data-src')];});
      var cls='jstep'+(done?' done':'')+(d===curd?' cur':'');
      return '<div class="'+cls+'" data-d="'+d+'"><div class="jdot">'+(done?svg(I.check,''):d)+'</div><div class="jt">'+th+'</div><div class="js">'+((nm.split('·')[1]||'').trim())+'</div></div>';
    }).join('');
    [].forEach.call(host.querySelectorAll('.jstep'),function(el){ el.addEventListener('click',function(){ var dt=doc.querySelector('.daytab[data-d="'+el.dataset.d+'"]'); if(dt){dt.click();afterNav();} }); });
  }
  function mountJourney(){
    var days=doc.getElementById('u-days'); if(!days||doc.getElementById('journey'))return;
    var dt=days.querySelector('.daytabs');
    dt.insertAdjacentHTML('beforebegin','<div class="journey-label">أيام الوحدة</div><div class="journey" id="journey"></div>');
    dt.style.display='none';   // دمج: المسار المرقّم للأيام يغني عن تبويبات الأيام
    renderJourney();
  }

  /* ---------- Toast ---------- */
  var tw=doc.createElement('div'); tw.className='toast-wrap'; body.appendChild(tw);
  window.trialToast=function(msg){ var t=doc.createElement('div'); t.className='toast'; t.innerHTML=svg(I.check,'')+'<span>'+msg+'</span>'; tw.appendChild(t); requestAnimationFrame(function(){t.classList.add('show');}); setTimeout(function(){t.classList.remove('show'); setTimeout(function(){t.remove();},300);},1800); };

  /* ---------- تحسين الإطارات (نفس الأصل) ---------- */
  function enhanceFrame(fr){
    try{ var d=fr.contentWindow.document; if(!d||d.__enh)return; d.__enh=1;
      // تثبيت شريط تبويبات الدرس
      var tabs=d.querySelector('.tabs, .tabbar, [role=tablist]');
      // أزرار النسخ → Toast
      [].forEach.call(d.querySelectorAll('[data-copy], .copy-btn, .copy'),function(b){ b.addEventListener('click',function(){ window.parent.trialToast&&window.parent.trialToast('تم النسخ ✓'); }); });
      // إخفاء تذييل الدرس داخل الإطار (مضمّن)
      var c=d.querySelector('.gq-dev-credit'); if(c)c.style.display='none';
    }catch(e){}
  }

  /* ---------- هيكل تحميل ---------- */
  function skeleton(sp){ var fl=sp.querySelector('.frame-load'); if(fl&&!fl.dataset.sk){ fl.dataset.sk=1; fl.innerHTML='<div class="skel"><div class="row h"></div><div class="row w70"></div><div class="row w40"></div><div class="row card"></div><div class="row w70"></div><div class="row"></div></div>'; } }

  /* ---------- وضع التدريس + مؤقّت ---------- */
  var teach=doc.createElement('div'); teach.className='teach'; teach.innerHTML=
    '<div class="teach-top"><h2 id="tTitle">وضع التدريس</h2><button class="close" id="tClose">إغلاق ✕</button></div>'+
    '<div class="timer" id="tTimer"></div>'+
    '<div class="teach-body" id="tBody"></div>'+
    '<div class="teach-ctrl"><button class="go" id="tStart">ابدئي المؤقّت</button><button id="tPause">إيقاف مؤقّت</button><button id="tNext">المرحلة التالية ›</button></div>';
  body.appendChild(teach);
  var PHASES=[{n:'① تهيئة وبداية اللقاء',m:9},{n:'② بناء وسير اللقاء',m:13},{n:'③ إغلاق وتقويم',m:8}];
  var tState={ph:0,left:0,timer:null,running:false};
  function fmt(s){ var m=Math.floor(s/60), r=s%60; return (m<10?'0':'')+m+':'+(r<10?'0':'')+r; }
  function drawTimer(){ doc.getElementById('tTimer').innerHTML=PHASES.map(function(p,i){ return '<div class="tphase'+(i===tState.ph?' active':'')+'"><div class="pn">'+p.n+'</div><div class="pt">'+(i===tState.ph?fmt(tState.left):p.m+':00')+'</div></div>'; }).join(''); }
  function setPhase(i){ tState.ph=Math.max(0,Math.min(2,i)); tState.left=PHASES[tState.ph].m*60; drawTimer(); }
  function tick(){ if(tState.left>0){ tState.left--; drawTimer(); } else { if(tState.ph<2){ trialToast('انتهت '+PHASES[tState.ph].n); setPhase(tState.ph+1); } else { stopTimer(); trialToast('انتهى وقت اللقاء'); } } }
  function startTimer(){ if(tState.running)return; tState.running=true; tState.timer=setInterval(tick,1000); }
  function stopTimer(){ tState.running=false; clearInterval(tState.timer); }
  function openTeach(){
    var sp=doc.querySelector('.daypanel.active .subpanel.active');
    var title=sp?((sp.querySelector('.subj')||{}).textContent+' · '+(sp.querySelector('h2')||{}).textContent):'اللقاء';
    doc.getElementById('tTitle').textContent=title;
    // استخراج خطوات ورقة التدريس من الإطار
    var steps=[]; try{ var d=sp.querySelector('iframe').contentWindow.document;
      var qs=d.querySelector('.quick-sheet, .qs, [class*=quick]');
      var lis=(qs||d).querySelectorAll('.quick-sheet li, .qs li, ol li');
      [].forEach.call(lis,function(li){ var t=li.textContent.trim(); if(t.length>4&&steps.length<14) steps.push(t); });
    }catch(e){}
    if(!steps.length) steps=['افتحي «سير اللقاء» في الدرس للاطّلاع على الخطوات التفصيلية.','استعيني بالمؤقّت لضبط مراحل اللقاء الثلاث.'];
    doc.getElementById('tBody').innerHTML=steps.map(function(s,i){ return '<div class="step"><span class="num">'+(i+1)+'</span>'+s+'</div>'; }).join('');
    setPhase(0); stopTimer();
    teach.classList.add('open'); body.style.overflow='hidden';
  }
  function closeTeach(){ teach.classList.remove('open'); body.style.overflow=''; stopTimer(); }
  doc.getElementById('tClose').addEventListener('click',closeTeach);
  doc.getElementById('tStart').addEventListener('click',function(){ if(tState.running){stopTimer();this.textContent='ابدئي المؤقّت';}else{startTimer();this.textContent='يعمل…';} });
  doc.getElementById('tPause').addEventListener('click',function(){ stopTimer(); doc.getElementById('tStart').textContent='ابدئي المؤقّت'; });
  doc.getElementById('tNext').addEventListener('click',function(){ setPhase(tState.ph+1); });
  doc.addEventListener('keydown',function(e){ if(e.key==='Escape'&&teach.classList.contains('open'))closeTeach(); });

  /* ---------- زرّ عائم ---------- */
  var fab=doc.createElement('button'); fab.className='fab-teach'; fab.innerHTML=svg(I.play,'')+'<span>ابدئي التدريس</span>'; body.appendChild(fab);
  fab.addEventListener('click',openTeach);

  /* ---------- لوحة المتابعة (Dashboard) ---------- */
  function openDash(){ var p=prog(); var all=[].slice.call(doc.querySelectorAll('.subpanel iframe')); var done=all.filter(function(f){return p[f.getAttribute('data-src')];}).length;
    trialToast('أنجزتِ '+done+' من '+all.length+' لقاءً في هذه الوحدة'); var u=doc.querySelector('.utab[data-u="days"]'); if(u)u.click(); var j=doc.getElementById('journey'); if(j)j.scrollIntoView({behavior:'smooth',block:'center'}); }

  /* ---------- ربط أحداث التنقّل ---------- */
  function afterNav(){ setCrumb(); ensureLessonHeader(); var sp=doc.querySelector('.daypanel.active .subpanel.active'); if(sp){ skeleton(sp); var fr=sp.querySelector('iframe'); if(fr){ if(fr.getAttribute('src')) enhanceFrame(fr); else fr.addEventListener('load',function(){enhanceFrame(fr);refreshProg();}); } } refreshProg(); }

  /* ---------- init ---------- */
  function init(){
    injectIcons(); buildTopbar(); markToday(); buildIndex(); mountJourney();
    doc.getElementById('btnTeach').addEventListener('click',openTeach);
    doc.getElementById('btnDash').addEventListener('click',openDash);
    var rp=doc.getElementById('resetProg'); if(rp) rp.addEventListener('click',function(){ if(confirm('تصفير كل علامات الإنجاز لهذه الوحدة؟')){ saveProg({}); [].forEach.call(doc.querySelectorAll('.subtab.done,.daytab.done'),function(el){el.classList.remove('done');}); doc.dispatchEvent(new CustomEvent('gq:resetdone')); refreshProg(); trialToast('أُعيد ضبط التقدّم'); } });
    var q=doc.getElementById('q'); q.addEventListener('input',function(){runSearch(this.value);});
    doc.addEventListener('click',function(e){ if(!e.target.closest('.searchbox')) doc.getElementById('sr').classList.remove('open'); });
    // اربط النقر على التبويبات لتحديث كل شيء
    doc.addEventListener('click',function(e){ if(e.target.closest('.utab,.daytab,.subtab')) setTimeout(afterNav,20); });
    // حسّن كل إطار عند تحميله
    [].forEach.call(doc.querySelectorAll('.frame-wrap iframe'),function(fr){ fr.addEventListener('load',function(){enhanceFrame(fr);refreshProg();}); });
    afterNav();
    // PWA
    if('serviceWorker' in navigator){ navigator.serviceWorker.register(BASE+'sw.js').catch(function(){}); }
  }
  if(doc.readyState!=='loading') setTimeout(init,60); else doc.addEventListener('DOMContentLoaded',function(){setTimeout(init,60);});
})();
