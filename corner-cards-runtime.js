(() => {
  if (window.__gqDesignedCornerCardsInstalled) return;
  window.__gqDesignedCornerCardsInstalled = true;

  const ASSET_ROOT = "assets/corner-cards/";
  const SET_MATCHES = [
    ["elm1", "علّمني ربي ١"],
    ["elm2", "علّمني ربي ٢"],
    ["elm3", "علّمني ربي ٣"],
    ["elm4", "علّمني ربي ٤"],
    ["elm5", "علّمني ربي ٥"],
    ["kitabi1", "كتابي المنير ١"],
    ["kitabi2", "كتابي المنير ٢"],
    ["kitabi3", "كتابي المنير ٣"],
    ["kitabi4", "كتابي المنير ٤"],
    ["kitabi5", "كتابي المنير ٥"],
    ["ahbuki", "أحبك ربي - مراجعة أسماء الله: الغفور · العزيز"],
    ["rasul", "قال رسولي"],
    ["adab", "أدب واقتداء"],
    ["lisan1", "لساني عربي — اللقاء الأول"],
    ["lisan2", "لساني عربي — اللقاء الثاني"],
    ["lisan3", "لساني عربي — اللقاء الثالث"],
    ["lisan4", "لساني عربي — اللقاء الرابع"],
    ["maharati", "مهاراتي"],
  ];

  const PANEL_SET_MATCHES = [
    ["-elm1", "elm1"],
    ["-elm2", "elm2"],
    ["-elm3", "elm3"],
    ["-elm4", "elm4"],
    ["-elm5", "elm5"],
    ["-kitabi1", "kitabi1"],
    ["-kitabi2", "kitabi2"],
    ["-kitabi3", "kitabi3"],
    ["-kitabi4", "kitabi4"],
    ["-kitabi5", "kitabi5"],
    ["-ohb2", "ahbuki"],
    ["-rasul1", "rasul"],
    ["-adab1", "adab"],
    ["-lisan1", "lisan1"],
    ["-lisan2", "lisan2"],
    ["-lisan3", "lisan3"],
    ["-lisan4", "lisan4"],
    ["-maharati1", "maharati"],
  ];

  const CORNER_LAW_CARDS = [
    ["أقرأ لأتعلم", "assets/gq_corner_rules_read.webp"],
    ["أكتشف ما حولي", "assets/gq_corner_rules_discover.webp"],
    ["المسكن", "assets/gq_corner_rules_home.webp"],
    ["فنوني الجميلة", "assets/gq_corner_rules_art.webp"],
    ["أدرك وأستمتع", "assets/gq_corner_rules_play.webp"],
    ["أدرك واستمتع", "assets/gq_corner_rules_play.webp"],
    ["الدكان", "assets/gq_corner_rules_shop.webp"],
    ["ساحة البناء", "assets/gq_corner_rules_build.webp"],
    ["البناء", "assets/gq_corner_rules_build.webp"],
    ["ساحة الرمل", "assets/gq_corner_rules_sand.webp"],
    ["صينية رمل", "assets/gq_corner_rules_sand.webp"],
  ];

  const CARDS = [
    ["elm1", "allamni-01-night-day-sequence.webp", "مسار التعاقب الذي قدّره الله", "ساحة البناء", "مسار التعاقب الذي قدره الله"],
    ["elm1", "allamni-01-night-day-clues.webp", "دلائل الليل ودلائل النهار", "أدرك وأستمتع", "دلائل الليل ودلائل النهار"],
    ["elm2", "allamni-02-sun-signs-book.webp", "كتاب دلائل الآية العظيمة", "أقرأ لأتعلم", "كتاب دلائل الآية العظيمة"],
    ["elm2", "allamni-02-sun-reflection-stations.webp", "محطات التفكر في عظمة الشمس", "أكتشف ما حولي", "محطات التفكر في عظمة الشمس"],
    ["elm3", "allamni-03-useful-day-home.webp", "بيتي يبدأ يومه بذكر الله والعمل النافع", "المسكن", "بيتي يبدأ يومه بذكر الله والعمل النافع"],
    ["elm3", "allamni-03-useful-day-shop.webp", "ما يعينني على نهار نافع", "الدكان", "ما يعينني على نهار نافع"],
    ["elm4", "allamni-04-moon-stations.webp", "محطات المنازل المقدّرة", "ساحة البناء", "محطات المنازل المقدرة"],
    ["elm4", "allamni-04-moon-phases-record.webp", "سجل منازل القمر", "أكتشف ما حولي", "سجل منازل القمر"],
    ["elm5", "allamni-05-evening-home.webp", "بيت يستعد للمساء بهدي النبي ﷺ", "المسكن", "بيت يستعد للمساء بهدي النبي ﷺ"],
    ["elm5", "allamni-05-night-obedience-pages.webp", "صفحات ليلة نملؤها بطاعة الله", "أقرأ لأتعلم", "صفحات ليلة نملؤها بطاعة الله"],

    ["kitabi1", "kitabi-01-thank-and-be-patient.webp", "أشكر وأصبر", "أدرك وأستمتع", "عند النعمة أشكر، وعند عدم حصول مرادي أصبر"],
    ["kitabi1", "kitabi-01-family-thanks-patience.webp", "يوم الأسرة بين الشكر والصبر", "المسكن", "يوم الأسرة بين الشكر والصبر"],
    ["kitabi2", "kitabi-02-kindness-basket.webp", "سلة الإحسان", "الدكان", "سلة الإحسان"],
    ["kitabi2", "kitabi-02-shared-good-table.webp", "مائدة يتسع خيرها", "المسكن", "مائدة يتسع خيرها"],
    ["kitabi3", "kitabi-03-do-not-delay-repair.webp", "لا أؤجل الإصلاح", "أقرأ لأتعلم", "لا أؤجل الإصلاح"],
    ["kitabi3", "kitabi-03-work-before-it-ends.webp", "فرصة العمل قبل انتهائها", "أدرك وأستمتع", "فرصة العمل قبل انتهائها"],
    ["kitabi4", "kitabi-04-heart-reassurance.webp", "أعمال يطمئن بها القلب بإذن الله", "أدرك وأستمتع", "أعمال يطمئن بها القلب بإذن الله"],
    ["kitabi4", "kitabi-04-reassured-soul-pages.webp", "صفحات النفس المطمئنة", "أقرأ لأتعلم", "صفحات النفس المطمئنة"],
    ["kitabi5", "kitabi-03-find-passage.webp", "ابحث عن المقطع", "أقرأ لأتعلم", "ابحث عن المقطع"],
    ["kitabi5", "kitabi-05-surah-al-fajr-map.webp", "خريطة معاني سورة الفجر", "ساحة البناء", "خريطة معاني سورة الفجر"],

    ["ahbuki", "uhibbuka-creatures-need-allah.webp", "كل المخلوقات محتاجة إلى الله", "أكتشف ما حولي", "كل الخلق مفتقرون إلى الله العزيز"],
    ["ahbuki", "uhibbuka-meaning-of-al-aziz.webp", "أتعرف معنى اسم الله العزيز", "أدرك وأستمتع", "معاني اسم الله العزيز"],
    ["ahbuki", "uhibbuka-creatures-by-allahs-command.webp", "مخلوقات تجري بأمر الله", "أكتشف ما حولي", "مخلوقات خاضعة لأمر العزيز"],
    ["ahbuki", "uhibbuka-signs-of-power-book.webp", "كتاب دلائل العزة في الكون", "أقرأ لأتعلم", "لم تغن قوة فرعون عنه"],
    ["ahbuki", "uhibbuka-might-through-obedience.webp", "عزة بالطاعة لا بالكبر", "أدرك وأستمتع", "عزة بالطاعة أم كبر؟"],
    ["ahbuki", "uhibbuka-trustworthiness-shop.webp", "أؤدي الأمانة في الدكان", "الدكان", "الأمانة من أخلاق المؤمن العزيز بطاعة الله"],
    ["ahbuki", "uhibbuka-strength-is-a-blessing.webp", "القوة نعمة من الله", "أقرأ لأتعلم", "قوة بلا إيمان لا تنفع صاحبها"],
    ["ahbuki", "uhibbuka-use-ability-for-good.webp", "أستعمل قدرتي في الخير", "ساحة البناء", "القوة أمانة"],

    ["rasul", "rasuli-start-day-with-dhikr.webp", "أبدأ يومي بذكر الله", "المسكن", "نعم الصباح كلها من الله"],
    ["rasul", "rasuli-first-morning-remembrance.webp", "متى أقول ذكر الصباح؟", "أكتشف ما حولي", "نعم الصباح كلها من الله"],
    ["rasul", "rasuli-order-repeat-morning-dhikr.webp", "أرتب ذكر الصباح وأردده", "أقرأ لأتعلم", "نعم كثيرة وذكر جامع"],
    ["rasul", "rasuli-repeat-morning-dhikr.webp", "أردد ذكر الصباح مع المعلمة", "أدرك وأستمتع", "نعم كثيرة وذكر جامع"],
    ["rasul", "rasuli-bedtime-steps.webp", "أبني غرفة نوم مرتبة", "ساحة البناء", ""],
    ["rasul", "rasuli-build-tidy-bedroom.webp", "أرتب خطوات الاستعداد للنوم", "المسكن", ""],
    ["rasul", "rasuli-choose-sleep-manners.webp", "أختار آداب النوم", "أدرك وأستمتع", ""],
    ["rasul", "rasuli-sort-sleep-manners.webp", "أقرأ كتاب آداب النوم", "أقرأ لأتعلم", ""],

    ["adab", "adab-cover-tie-extinguish.webp", "أربط وأغطي وأطفئ", "أدرك وأستمتع", "أصحح المشهد وفق الهدي النبوي"],
    ["adab", "adab-evening-remember-close-door.webp", "دخل المساء؛ أدخل وأغلق الباب", "المسكن", "أهيئ البيت عند دخول المساء"],

    ["lisan1", "lisani-01-touch-shape-vowel.webp", "ألمس الحركة وأشكّلها", "فنوني الجميلة", ""],
    ["lisan1", "lisani-01-house-of-vowels.webp", "بيت الحركات الثلاث", "أدرك وأستمتع", "بيت الحركات"],
    ["lisan1", "lisani-01-vowel-stations.webp", "محطات الحركات الثلاث", "أدرك وأستمتع", "بيت الحركات"],
    ["lisan2", "lisani-02-build-fatha-words.webp", "أركب كلمات بالفتحة", "أدرك وأستمتع", ""],
    ["lisan2", "lisani-02-open-word-cubes.webp", "مكعبات الكلمة المفتوحة", "ساحة البناء", ""],
    ["lisan3", "lisani-03-build-word-amal.webp", "أبني كلمة «عمل»", "ساحة البناء", "جسر كلمة عَمِلَ"],
    ["lisan3", "lisani-03-find-kasra.webp", "أبحث عن الكسرة", "أقرأ لأتعلم", ""],
    ["lisan4", "lisani-04-place-damma.webp", "أضع الضمة في مكانها", "أدرك وأستمتع", "محطات الحركات الثلاث"],

    ["maharati", "maharati-build-add-one.webp", "أبني ثم أضيف واحدًا", "ساحة البناء", "أبراج الأعداد"],
    ["maharati", "maharati-build-write-number.webp", "أبني العدد وأكتبه", "أدرك وأستمتع", ""],
  ].map(([set, file, title, corner, activity]) => ({
    set,
    file,
    title,
    corner,
    activity,
  }));

  const CENTER_CARD_SETS = [
    {
      panelId: "d1-language-center1",
      label: "بطاقات داعمة لمركز اللغة: الحركات الثلاث",
      files: [
        "lisani-01-touch-shape-vowel.webp",
        "lisani-01-house-of-vowels.webp",
        "lisani-01-vowel-stations.webp",
      ],
    },
    {
      panelId: "d3-language-center2",
      label: "بطاقات داعمة لمركز اللغة: التهجئة بالفتحة",
      files: [
        "lisani-02-build-fatha-words.webp",
        "lisani-02-open-word-cubes.webp",
      ],
    },
    {
      panelId: "d2-math-center10",
      label: "بطاقة داعمة لمركز الرياضيات: العدد 10",
      files: ["maharati-build-write-number.webp"],
    },
    {
      panelId: "d4-math-center11",
      label: "بطاقة داعمة لمركز الرياضيات: العددان 11 و12",
      files: ["maharati-build-add-one.webp"],
    },
  ];

  const STYLE = `
.gq-designed-card-block{margin:12px 0 2px;padding:12px;border:1px solid color-mix(in srgb,var(--corner-color,#2f7459) 25%,#e7eee7);border-radius:17px;background:linear-gradient(180deg,#fff,#fffaf2)}
.gq-designed-card-head{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.gq-designed-card-head strong{color:#1e3e31;font-size:13px}
.gq-designed-card-head span{padding:3px 8px;border-radius:999px;background:var(--corner-soft,#f2faf5);color:var(--corner-color,#2f7459);font-size:11px;font-weight:900}
.gq-designed-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,255px),1fr));gap:12px}
.gq-designed-card-item{margin:0;overflow:hidden;border:1px solid #e5e9df;border-radius:15px;background:#fff;box-shadow:0 8px 18px rgba(32,54,42,.08)}
.gq-designed-card-image{display:block;padding:7px;background:#f8f3e8;text-decoration:none}
.gq-designed-card-image img{display:block;width:100%;height:auto;max-height:580px;object-fit:contain;object-position:center;border-radius:9px;background:#fff}
.gq-designed-card-caption{display:grid;gap:8px;padding:10px 11px}
.gq-designed-card-caption strong{color:#173824;font-size:12.5px;line-height:1.7}
.gq-designed-card-actions{display:flex;gap:7px;flex-wrap:wrap}
.gq-designed-card-open,.gq-designed-card-print{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:6px 11px;border-radius:9px;border:1px solid var(--corner-color,#2f7459);font:inherit;font-size:11.5px;font-weight:900;text-decoration:none;cursor:pointer}
.gq-designed-card-open{background:var(--corner-color,#2f7459);color:#fff}
.gq-designed-card-print{background:#fff;color:var(--corner-color,#2f7459)}
.gq-designed-only .gq-rev-body{padding-top:12px}
.gq-rev-law-card{order:1}
.gq-designed-card-block{order:2}
.gq-rev-field{order:3}
.gq-center-designed-cards{display:grid;gap:14px;margin:18px 0 0;padding:16px;border:1px solid #dce8df;border-radius:22px;background:linear-gradient(180deg,#f8fcf9,#fffaf2);box-shadow:0 12px 28px rgba(31,55,42,.07)}
.gq-center-designed-head{display:grid;gap:4px}
.gq-center-designed-head h4{margin:0;color:#174c39;font-size:1.12rem;line-height:1.7}
.gq-center-designed-head p{margin:0;color:#5a665f;font-size:.88rem;line-height:1.8}
.gq-center-designed-group{display:grid;gap:10px;padding:12px;border:1px solid #e1e9e2;border-radius:18px;background:#fff}
.gq-center-designed-group-title{display:inline-flex;width:max-content;max-width:100%;padding:4px 10px;border-radius:999px;background:#edf8f2;color:#246247;font-size:.82rem;font-weight:900}
.gq-center-designed-group .gq-rev-law-card{margin:0}
@media(max-width:640px){.gq-designed-card-block{padding:9px}.gq-designed-card-open,.gq-designed-card-print{flex:1}.gq-designed-card-image img{max-height:none}}
@media print{.gq-designed-card-actions{display:none!important}.gq-designed-card-item{break-inside:avoid;box-shadow:none}.gq-designed-card-image img{max-height:250mm}}
`;

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  }

  function setForFrame(frame) {
    const subjectPanel = frame.closest(".subject-panel");
    const panelId = normalize(subjectPanel && subjectPanel.id);
    const panelMatch = PANEL_SET_MATCHES.find(([suffix]) =>
      panelId.endsWith(suffix),
    );
    if (panelMatch) return panelMatch[1];

    const title = normalize(frame.getAttribute("title"));
    const match = SET_MATCHES.find(([, term]) => title.includes(term));
    return match ? match[0] : "";
  }

  function lawCardFor(corner) {
    const normalizedCorner = normalize(corner);
    const match = CORNER_LAW_CARDS.find(
      ([name]) =>
        normalizedCorner.includes(name) || name.includes(normalizedCorner),
    );
    return match ? { name: match[0], source: match[1] } : null;
  }

  function lawMarkup(corner) {
    const law = lawCardFor(corner);
    if (!law) return "";
    return `
<a class="gq-rev-law-card" href="${esc(law.source)}" target="_blank" rel="noopener">
  <b>بطاقة قوانين الركن <span>اضغطي للتكبير</span></b>
  <img src="${esc(law.source)}" alt="بطاقة قوانين ركن ${esc(law.name)}" loading="eager" decoding="async">
</a>`;
  }

  function galleryMarkup(cards) {
    const items = cards
      .map((card) => {
        const source = ASSET_ROOT + card.file;
        return `
<figure class="gq-designed-card-item" data-gq-card-id="${esc(card.file)}">
  <a class="gq-designed-card-image" href="${source}" target="_blank" rel="noopener" aria-label="فتح ${esc(card.title)} بالحجم الكامل">
    <img src="${source}" alt="${esc(card.title)}" loading="eager" decoding="async">
  </a>
  <figcaption class="gq-designed-card-caption">
    <strong>${esc(card.title)}</strong>
    <span class="gq-designed-card-actions">
      <a class="gq-designed-card-open" href="${source}" target="_blank" rel="noopener">فتح البطاقة</a>
      <button class="gq-designed-card-print" type="button" data-gq-print-src="${source}" data-gq-print-title="${esc(card.title)}">طباعة</button>
    </span>
  </figcaption>
</figure>`;
      })
      .join("");

    return `
<section class="gq-designed-card-block" aria-label="بطاقات تنفيذ النشاط">
  <div class="gq-designed-card-head"><strong>بطاقات تنفيذ النشاط</strong><span>${cards.length} بطاقة</span></div>
  <div class="gq-designed-card-grid">${items}</div>
</section>`;
  }

  function centerCardsMarkup(config, cards) {
    const groups = [];
    cards.forEach((card) => {
      let group = groups.find((item) => item.corner === card.corner);
      if (!group) {
        group = { corner: card.corner, cards: [] };
        groups.push(group);
      }
      group.cards.push(card);
    });

    return `
<section class="gq-center-designed-cards" data-gq-center-cards-id="${esc(config.panelId)}" aria-label="${esc(config.label)}">
  <div class="gq-center-designed-head">
    <h4>${esc(config.label)}</h4>
    <p>تُقرأ بطاقة قوانين الركن أولًا، ثم تُستخدم بطاقة النشاط في المركز بحسب مهارة اللقاء.</p>
  </div>
  ${groups
    .map(
      (group) => `
  <article class="gq-center-designed-group">
    <span class="gq-center-designed-group-title">الركن: ${esc(group.corner)}</span>
    ${lawMarkup(group.corner)}
    ${galleryMarkup(group.cards)}
  </article>`,
    )
    .join("")}
</section>`;
  }

  function standaloneMarkup(card, index) {
    return `
<article class="gq-rev-card gq-designed-only" style="--corner-color:#2f7459;--corner-soft:#edf8f2">
  <header class="gq-rev-card-head"><span class="gq-rev-num">${index}</span><div><h3>${esc(card.title)}</h3><span class="gq-rev-corner">الركن: ${esc(card.corner)}</span></div></header>
  <div class="gq-rev-body">${lawMarkup(card.corner)}${galleryMarkup([card])}</div>
</article>`;
  }

  function ensureStyle(doc) {
    if (doc.getElementById("gq-designed-cards-runtime-style")) return;
    const style = doc.createElement("style");
    style.id = "gq-designed-cards-runtime-style";
    style.textContent = STYLE;
    (doc.head || doc.documentElement).appendChild(style);
  }

  function bindPrintActions(doc, panel) {
    panel.querySelectorAll("[data-gq-print-src]").forEach((button) => {
      if (button.dataset.gqPrintBound) return;
      button.dataset.gqPrintBound = "1";
      button.addEventListener("click", () => {
        const source = button.getAttribute("data-gq-print-src");
        if (!source) return;
        const absolute = new URL(source, document.baseURI).href;
        const printWindow = doc.defaultView.open("", "_blank");
        if (!printWindow) return;
        printWindow.document.open();
        printWindow.document.write(
          `<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${esc(button.getAttribute("data-gq-print-title") || "بطاقة تنفيذ النشاط")}</title><style>@page{size:A4 portrait;margin:8mm}html,body{margin:0;background:#fff}body{display:grid;place-items:center;min-height:100vh}img{display:block;max-width:100%;max-height:281mm;object-fit:contain}</style></head><body><img src="${absolute}" alt="" onload="window.focus();window.print()"></body></html>`,
        );
        printWindow.document.close();
      });
    });
  }

  function ensureLessonTabs(doc) {
    doc.querySelectorAll(".tab[onclick*='showTab']").forEach((button) => {
      const call = button.getAttribute("onclick") || "";
      const match = call.match(/showTab\(['"]([^'"]+)['"]/);
      if (!match) return;
      button.dataset.gqTabName = match[1];
      button.removeAttribute("onclick");
    });
    if (doc.getElementById("gq-tab-runtime-fix")) return;
    const script = doc.createElement("script");
    script.id = "gq-tab-runtime-fix";
    script.textContent = `
(() => {
  function activate(name, button) {
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
    const target = document.getElementById("tab-" + name);
    if (target) target.classList.add("active");
    if (button) {
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
    }
    setTimeout(() => {
      try {
        const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        if (window.frameElement && height > 40) window.frameElement.style.height = (height + 24) + "px";
      } catch (_error) {}
    }, 80);
  }
  window.showTab = activate;
  document.querySelectorAll(".tab[data-gq-tab-name]").forEach((button) => {
    if (button.dataset.gqTabBound) return;
    button.dataset.gqTabBound = "1";
    button.addEventListener("click", () => activate(button.dataset.gqTabName, button));
  });
})();
`;
    (doc.body || doc.documentElement).appendChild(script);
  }

  function renderFrame(frame) {
    const setId = setForFrame(frame);
    if (!setId) return;

    let doc;
    try {
      doc =
        frame.contentDocument ||
        (frame.contentWindow && frame.contentWindow.document);
    } catch {
      return;
    }
    if (!doc || !doc.body) return;
    ensureLessonTabs(doc);

    const panel = doc.getElementById("tab-corners");
    const revised = panel && panel.querySelector(".gq-revised-corners");
    if (!panel || !revised) return;

    ensureStyle(doc);
    const setCards = CARDS.filter((card) => card.set === setId);
    if (!setCards.length) return;

    const renderedFiles = new Set(
      Array.from(panel.querySelectorAll("[data-gq-card-id]"))
        .map((item) => item.getAttribute("data-gq-card-id"))
        .filter(Boolean),
    );
    const isComplete =
      renderedFiles.size === setCards.length &&
      setCards.every((card) => renderedFiles.has(card.file));
    if (
      panel.getAttribute("data-gq-designed-cards-id") === setId &&
      isComplete
    ) {
      return;
    }

    panel
      .querySelectorAll(".gq-designed-card-block")
      .forEach((block) => block.remove());
    panel
      .querySelectorAll(".gq-designed-only")
      .forEach((card) => card.remove());

    const used = new Set();
    const activityCards = Array.from(
      panel.querySelectorAll(".gq-rev-card:not(.gq-designed-only)"),
    );

    activityCards.forEach((activityCard) => {
      const activityTitle = normalize(
        (activityCard.querySelector("h3") || {}).textContent,
      );
      const matches = setCards.filter(
        (card) => card.activity && normalize(card.activity) === activityTitle,
      );
      if (!matches.length) return;
      const body = activityCard.querySelector(".gq-rev-body");
      if (!body) return;
      const lawCard = body.querySelector(".gq-rev-law-card");
      if (lawCard) {
        lawCard.insertAdjacentHTML("afterend", galleryMarkup(matches));
      } else {
        body.insertAdjacentHTML("afterbegin", galleryMarkup(matches));
      }
      matches.forEach((card) => used.add(card.file));
    });

    const grid = panel.querySelector(".gq-rev-grid");
    const extras = setCards.filter((card) => !used.has(card.file));
    if (grid && extras.length) {
      const offset = activityCards.length;
      grid.insertAdjacentHTML(
        "beforeend",
        extras
          .map((card, index) => standaloneMarkup(card, offset + index + 1))
          .join(""),
      );
    }

    const total = panel.querySelectorAll(".gq-rev-grid > .gq-rev-card").length;
    const totalNode = panel.querySelector(".gq-rev-count b");
    if (totalNode) totalNode.textContent = String(total);
    const kicker = panel.querySelector(".gq-rev-kicker");
    if (kicker) kicker.textContent = "الأركان التطبيقية للدرس";

    bindPrintActions(doc, panel);
    const finalFiles = new Set(
      Array.from(panel.querySelectorAll("[data-gq-card-id]"))
        .map((item) => item.getAttribute("data-gq-card-id"))
        .filter(Boolean),
    );
    if (
      finalFiles.size === setCards.length &&
      setCards.every((card) => finalFiles.has(card.file))
    ) {
      panel.setAttribute("data-gq-designed-cards-id", setId);
    } else {
      panel.removeAttribute("data-gq-designed-cards-id");
    }

    try {
      const height = Math.max(
        doc.documentElement ? doc.documentElement.scrollHeight : 0,
        doc.body ? doc.body.scrollHeight : 0,
      );
      if (height > 40) frame.style.height = `${height + 24}px`;
    } catch {}
  }

  function renderCenters() {
    ensureStyle(document);
    CENTER_CARD_SETS.forEach((config) => {
      const panel = document.getElementById(config.panelId);
      if (!panel) return;
      const host = panel.querySelector(".gq-center-body") || panel;
      const cards = config.files
        .map((file) => CARDS.find((card) => card.file === file))
        .filter(Boolean);
      if (!cards.length) return;

      const current = host.querySelector(
        `.gq-center-designed-cards[data-gq-center-cards-id="${config.panelId}"]`,
      );
      const renderedFiles = new Set(
        current
          ? Array.from(current.querySelectorAll("[data-gq-card-id]"))
              .map((item) => item.getAttribute("data-gq-card-id"))
              .filter(Boolean)
          : [],
      );
      const complete =
        renderedFiles.size === cards.length &&
        cards.every((card) => renderedFiles.has(card.file));
      if (complete) {
        bindPrintActions(document, current);
        return;
      }

      host
        .querySelectorAll(".gq-center-designed-cards")
        .forEach((section) => section.remove());
      host.insertAdjacentHTML("beforeend", centerCardsMarkup(config, cards));
      const inserted = host.querySelector(
        `.gq-center-designed-cards[data-gq-center-cards-id="${config.panelId}"]`,
      );
      if (inserted) bindPrintActions(document, inserted);
    });
  }

  function scan() {
    renderCenters();
    document.querySelectorAll("iframe").forEach((frame) => {
      if (!frame.dataset.gqDesignedCardsHooked) {
        frame.dataset.gqDesignedCardsHooked = "1";
        frame.addEventListener("load", () => {
          setTimeout(() => renderFrame(frame), 140);
          setTimeout(() => renderFrame(frame), 520);
          setTimeout(() => renderFrame(frame), 1250);
        });
      }
      renderFrame(frame);
    });
  }

  function boot() {
    scan();
    setTimeout(scan, 450);
    setTimeout(scan, 1300);
    setTimeout(scan, 2700);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", boot);

  const observer = new MutationObserver(() => scan());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcdoc"],
  });

  let tries = 0;
  const timer = setInterval(() => {
    scan();
    if (++tries > 12) clearInterval(timer);
  }, 1500);
})();
