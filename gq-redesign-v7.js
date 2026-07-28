(function () {
  "use strict";

  var MATERIALS = [
    {
      key: "kitabi",
      selector: ".gq-subject-kitabi",
      title: /كتابي المنير/,
      color: "#2D7A4B",
      soft: "#EAF5EE",
      on: "#FFFFFF",
      icon: "brand/material-kitabi.png",
    },
    {
      key: "allamni",
      selector: ".gq-subject-allamni",
      title: /علّمني ربي/,
      color: "#006B69",
      soft: "#E6F4F3",
      on: "#FFFFFF",
      icon: "brand/material-allamni.png",
    },
    {
      key: "uhibbuka",
      selector: ".gq-subject-uhibbuk",
      title: /أحبك ربي/,
      color: "#8660A8",
      soft: "#F3ECF8",
      on: "#FFFFFF",
      icon: "brand/material-uhibbuka.png",
    },
    {
      key: "rasuli",
      selector: ".gq-subject-rasuli",
      title: /قال رسولي/,
      color: "#6B3F22",
      soft: "#F7EFE5",
      on: "#FFFFFF",
      icon: "brand/material-rasuli.png",
    },
    {
      key: "adab",
      selector: ".gq-subject-adab",
      title: /أدب واقتداء/,
      color: "#7EA348",
      soft: "#F1F7E8",
      on: "#17351E",
      icon: "brand/material-adab.png",
    },
    {
      key: "lisani",
      selector: ".gq-subject-lisani",
      title: /لساني عربي/,
      color: "#003E45",
      soft: "#EAF4F5",
      on: "#FFFFFF",
      icon: "brand/material-lisani.png",
    },
    {
      key: "maharati",
      selector: ".gq-subject-maharati",
      title: /مهاراتي/,
      color: "#D8662A",
      soft: "#FFF1E8",
      on: "#FFFFFF",
      icon: "brand/material-maharati.png",
    },
  ];

  function all(selector, root) {
    return Array.prototype.slice.call(
      (root || document).querySelectorAll(selector),
    );
  }

  var navigationLock = null;
  var nativeWindowScrollTo = window.scrollTo;
  var nativeScrollIntoView = window.Element.prototype.scrollIntoView;

  function railFor(element) {
    return element && element.closest
      ? element.closest(".gq-unit-nav-row,.tabs,.subject-tabs")
      : null;
  }

  function revealTabInRail(tab, smooth) {
    var bar = railFor(tab);
    if (!bar || bar.scrollWidth <= bar.clientWidth + 2) return;
    var barRect = bar.getBoundingClientRect();
    var tabRect = tab.getBoundingClientRect();
    var inset = 14;
    var delta = 0;
    if (tabRect.left < barRect.left + inset) {
      delta = tabRect.left - barRect.left - inset;
    } else if (tabRect.right > barRect.right - inset) {
      delta = tabRect.right - barRect.right + inset;
    }
    if (!delta) return;
    bar.scrollBy({
      left: delta,
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  function maxWindowScroll() {
    return Math.max(
      0,
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
        window.innerHeight,
    );
  }

  function restoreLockedPosition(lock) {
    if (!navigationLock || navigationLock !== lock || lock.cancelled) return;
    nativeWindowScrollTo.call(
      window,
      0,
      Math.min(lock.top, maxWindowScroll()),
    );
  }

  function beginStableTabChange(tab) {
    var lock = {
      top: window.scrollY || window.pageYOffset || 0,
      until: Date.now() + 560,
      cancelled: false,
    };
    navigationLock = lock;
    [0, 70, 180, 360].forEach(function (delay) {
      window.setTimeout(function () {
        restoreLockedPosition(lock);
      }, delay);
    });
    window.setTimeout(function () {
      if (navigationLock === lock) navigationLock = null;
    }, 580);
    window.requestAnimationFrame(function () {
      revealTabInRail(tab, true);
    });
  }

  function navigationIsLocked() {
    return navigationLock && Date.now() < navigationLock.until;
  }

  function installProgrammaticScrollGuard() {
    if (window.__gqStableScrollGuardV8) return;
    window.__gqStableScrollGuardV8 = true;
    window.scrollTo = function () {
      if (navigationIsLocked()) return;
      return nativeWindowScrollTo.apply(window, arguments);
    };
    window.Element.prototype.scrollIntoView = function () {
      if (navigationIsLocked()) {
        var bar = railFor(this);
        if (bar) revealTabInRail(this, false);
        return;
      }
      return nativeScrollIntoView.apply(this, arguments);
    };
    ["wheel", "touchmove"].forEach(function (eventName) {
      document.addEventListener(
        eventName,
        function (event) {
          if (!event.isTrusted || !navigationLock) return;
          navigationLock.cancelled = true;
          navigationLock = null;
        },
        { capture: true, passive: true },
      );
    });
  }

  function enableMouseRail(bar) {
    if (!bar || bar.dataset.gqMouseRailV8 === "1") return;
    bar.dataset.gqMouseRailV8 = "1";
    bar.setAttribute("aria-orientation", "horizontal");

    bar.addEventListener(
      "wheel",
      function (event) {
        if (bar.scrollWidth <= bar.clientWidth + 2) return;
        var rawDelta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;
        if (!rawDelta) return;
        var direction =
          bar.ownerDocument.defaultView.getComputedStyle(bar).direction ===
          "rtl"
            ? -1
            : 1;
        var before = bar.scrollLeft;
        bar.scrollLeft += rawDelta * direction;
        if (bar.scrollLeft !== before) event.preventDefault();
      },
      { passive: false },
    );

    var pointerId = null;
    var startX = 0;
    var startScroll = 0;
    var dragged = false;
    var suppressClick = false;

    bar.addEventListener("pointerdown", function (event) {
      if (event.button !== 0 || bar.scrollWidth <= bar.clientWidth + 2) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = bar.scrollLeft;
      dragged = false;
    });

    bar.addEventListener("pointermove", function (event) {
      if (pointerId !== event.pointerId) return;
      var delta = event.clientX - startX;
      if (!dragged && Math.abs(delta) < 5) return;
      dragged = true;
      suppressClick = true;
      bar.classList.add("gq-rail-dragging");
      if (bar.setPointerCapture && !bar.hasPointerCapture(event.pointerId)) {
        bar.setPointerCapture(event.pointerId);
      }
      bar.scrollLeft = startScroll - delta;
      event.preventDefault();
    });

    function finishDrag(event) {
      if (pointerId === null || (event && pointerId !== event.pointerId)) return;
      if (
        event &&
        bar.releasePointerCapture &&
        bar.hasPointerCapture(event.pointerId)
      ) {
        bar.releasePointerCapture(event.pointerId);
      }
      pointerId = null;
      bar.classList.remove("gq-rail-dragging");
      window.setTimeout(function () {
        suppressClick = false;
      }, 0);
    }

    bar.addEventListener("pointerup", finishDrag);
    bar.addEventListener("pointercancel", finishDrag);
    bar.addEventListener(
      "click",
      function (event) {
        if (!suppressClick) return;
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true,
    );
  }

  function stabilizeDocumentTabs(doc) {
    all(".tabs,.subject-tabs,.gq-unit-nav-row", doc).forEach(enableMouseRail);
    if (doc.documentElement.dataset.gqStableTabsV8 === "1") return;
    doc.documentElement.dataset.gqStableTabsV8 = "1";
    doc.addEventListener(
      "click",
      function (event) {
        var tab = event.target.closest(".tab,.subject-tab");
        if (!tab || !railFor(tab)) return;
        beginStableTabChange(tab);
      },
      true,
    );
  }

  function materialFor(frame) {
    var wrapper = frame.closest && frame.closest(".gq-lesson-shell");
    var title = frame.getAttribute("title") || "";
    for (var index = 0; index < MATERIALS.length; index += 1) {
      var item = MATERIALS[index];
      if ((wrapper && wrapper.matches(item.selector)) || item.title.test(title)) {
        return item;
      }
    }
    return {
      key: "default",
      color: "#006B69",
      soft: "#E6F4F3",
      on: "#FFFFFF",
      icon: "brand/seedling.webp",
    };
  }

  function frameCss(material) {
    return [
      ":root{--subject-color:" +
        material.color +
        "!important;--subject-bg:" +
        material.soft +
        "!important;--subject-on:" +
        material.on +
        "!important;--mat-color:" +
        material.color +
        "!important;--mat-soft:" +
        material.soft +
        "!important}",
      "html,body{min-height:0!important;height:auto!important;margin-bottom:0!important;padding-bottom:0!important;background:#fff!important}",
      "body.gq-premium-lesson{color:#16383B!important;background:#fff!important}",
      "body.gq-premium-lesson .guide{max-width:1180px!important;margin:0 auto!important;padding-bottom:0!important;background:#fff!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important}",
      "body.gq-premium-lesson .hdr{background:linear-gradient(90deg,var(--subject-bg),#fff)!important;color:#16383B!important;border:0!important;border-right:7px solid var(--subject-color)!important;border-bottom:1px solid #E7E0D4!important;border-radius:0!important;box-shadow:none!important}",
      "body.gq-premium-lesson .hdr *{color:#16383B!important;text-shadow:none!important}",
      "body.gq-premium-lesson .hdr-title,body.gq-premium-lesson .hdr-title *{color:var(--subject-color)!important}",
      "body.gq-premium-lesson .tabs{position:sticky!important;top:0!important;z-index:40!important;display:flex!important;flex-wrap:nowrap!important;gap:7px!important;overflow-x:auto!important;margin:0!important;padding:8px 10px!important;background:#fff!important;border:0!important;border-bottom:1px solid #E7E0D4!important;border-radius:0!important;box-shadow:0 5px 14px rgba(16,45,54,.07)!important}",
      "body.gq-premium-lesson .tabs{cursor:grab!important;overscroll-behavior-x:contain!important;scrollbar-width:thin!important;scrollbar-color:color-mix(in srgb,var(--subject-color) 42%,transparent) transparent!important}",
      "body.gq-premium-lesson .tabs.gq-rail-dragging{cursor:grabbing!important;user-select:none!important;scroll-behavior:auto!important}",
      "body.gq-premium-lesson .tabs::-webkit-scrollbar{display:block!important;height:7px!important}",
      "body.gq-premium-lesson .tabs::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--subject-color) 42%,transparent)!important;border-radius:99px!important}",
      "body.gq-premium-lesson .tabs .tab{flex:0 0 auto!important;min-height:38px!important;padding:7px 12px!important;color:#31484A!important;background:#fff!important;border:1px solid #DDD5C7!important;border-radius:9px!important;box-shadow:inset 0 -2px 0 #F0EBE2!important;font-weight:850!important;cursor:pointer!important}",
      "body.gq-premium-lesson .tabs .tab.active,body.gq-premium-lesson .tabs .tab[aria-selected='true']{color:var(--subject-on)!important;background:var(--subject-color)!important;border-color:var(--subject-color)!important;box-shadow:none!important}",
      "body.gq-premium-lesson .tabs .tab.active *{color:var(--subject-on)!important}",
      "body.gq-premium-lesson .panel{min-height:0!important;padding-bottom:0!important;margin-bottom:0!important;background:#fff!important}",
      "body.gq-premium-lesson .two-col{background:#fff!important}",
      "body.gq-premium-lesson *,body.gq-premium-lesson *::before,body.gq-premium-lesson *::after{box-sizing:border-box!important}",
      "body.gq-premium-lesson :where(.two-col,.main-grid,.lesson-grid,.hero-grid,.activity-layout,.manzooma-layout,.grid2,.grid3,.cards-grid,.flow-grid-2,.hkdev-pace,.hkdev-diff,.act-grid,.tools){align-items:start!important;grid-auto-rows:max-content!important}",
      "body.gq-premium-lesson :where(.two-col,.main-grid,.lesson-grid,.hero-grid,.activity-layout,.manzooma-layout,.grid2,.grid3,.cards-grid,.flow-grid-2,.hkdev-pace,.hkdev-diff,.act-grid,.tools)>*{min-width:0!important;max-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;align-self:start!important}",
      "body.gq-premium-lesson :where(.card,.sec,.sb,.sb-block,.qbox,.mini,.script,.note-box,.taq-card,.act-full,.flow-card,.guide-section,.lesson-stage-card,.card-section,.gq-merged-activity-section,.hkdev-card,.hkdev-obj,.hkdev-chk,.hkdev-arc,.hkdev-home,.st,.d){position:relative!important;inset:auto!important;height:auto!important;min-height:0!important;max-height:none!important}",
      "body.gq-premium-lesson :where(.main,.sidebar,.sb,.two-col)>*{min-width:0!important;max-width:100%!important}",
      "html body.gq-premium-lesson .guide .panel.active .two-col>.main>*{width:auto!important;max-width:100%!important;margin-inline-start:0!important;margin-inline-end:0!important;inset-inline:auto!important;grid-column:auto!important}",
      "body.gq-premium-lesson :where(.card-b,.section-body,.flow-body,.act-bd,.card-section-body,.hbox,.expected,.screen-note,.integration-body,.gq-plan-card,p,li,td){overflow-wrap:anywhere!important;word-break:normal!important}",
      "body.gq-premium-lesson .sb{background:var(--subject-bg)!important;border-color:#E7E0D4!important}",
      "body.gq-premium-lesson .sb-lbl,body.gq-premium-lesson .sec-n,body.gq-premium-lesson .sec-lbl,body.gq-premium-lesson .sh,body.gq-premium-lesson .qa-q{color:var(--subject-color)!important;border-color:color-mix(in srgb,var(--subject-color) 34%,#fff)!important}",
      "body.gq-premium-lesson .guide-section,body.gq-premium-lesson .flow-card,body.gq-premium-lesson .lesson-stage-card,body.gq-premium-lesson .visual-evidence-section,body.gq-premium-lesson .gq-merged-activity-section{margin:15px 0!important;background:#fff!important;border:0!important;border-right:5px solid var(--subject-color)!important;border-bottom:1px solid #E7E0D4!important;border-radius:0 14px 14px 0!important;box-shadow:none!important;overflow:visible!important}",
      "body.gq-premium-lesson .section-head,body.gq-premium-lesson .flow-head,body.gq-premium-lesson .gq-merged-activity-title{background:var(--subject-bg)!important;color:#16383B!important;border:0!important;border-bottom:1px solid #E7E0D4!important;border-radius:0!important;box-shadow:none!important}",
      "body.gq-premium-lesson .section-body,body.gq-premium-lesson .flow-body,body.gq-premium-lesson .gq-merged-activity-body{background:#fff!important;border:0!important;box-shadow:none!important}",
      "body.gq-premium-lesson .card,body.gq-premium-lesson .mini,body.gq-premium-lesson .script,body.gq-premium-lesson .qbox,body.gq-premium-lesson .note-box,body.gq-premium-lesson .taq-card,body.gq-premium-lesson .act-full,body.gq-premium-lesson .visual-card,body.gq-premium-lesson .cue-card,body.gq-premium-lesson .ref-item{background:#fff!important;border:1px solid #E7E0D4!important;border-right:4px solid var(--subject-color)!important;border-radius:11px!important;box-shadow:none!important}",
      "body.gq-premium-lesson .card-h,body.gq-premium-lesson .act-bar,body.gq-premium-lesson .act-hdr{background:var(--subject-bg)!important;color:var(--subject-color)!important;border:0!important;border-bottom:1px solid #E7E0D4!important}",
      "body.gq-premium-lesson .pill,body.gq-premium-lesson .rbadge,body.gq-premium-lesson .visual-tag,body.gq-premium-lesson .cn,body.gq-premium-lesson .taq-dot{background:var(--subject-color)!important;color:var(--subject-on)!important;border-color:var(--subject-color)!important}",
      "body.gq-premium-lesson .hkdev-card{margin:16px 0 20px!important;background:#fff!important;border:1px solid color-mix(in srgb,var(--subject-color) 42%,#fff)!important;border-radius:14px!important;box-shadow:none!important;overflow:hidden!important}",
      "body.gq-premium-lesson .hkdev-h{min-height:50px!important;display:flex!important;align-items:center!important;gap:9px!important;padding:10px 14px!important;background:var(--subject-color)!important;color:var(--subject-on)!important;border:0!important;font-weight:900!important}",
      "body.gq-premium-lesson .hkdev-h::before{content:''!important;width:30px!important;height:30px!important;flex:0 0 30px!important;background:url('" +
        material.icon +
        "') center/contain no-repeat!important;filter:none!important}",
      "body.gq-premium-lesson .hkdev-h>.gq-ic:first-child{display:none!important}",
      "body.gq-premium-lesson .hkdev-h,body.gq-premium-lesson .hkdev-h *,body.gq-premium-lesson .hkdev-h .gq-ic{color:var(--subject-on)!important;stroke:currentColor!important}",
      "body.gq-premium-lesson .hkdev-h .tag{color:var(--subject-on)!important;background:rgba(255,255,255,.16)!important;border:1px solid rgba(255,255,255,.32)!important}",
      "body.gq-premium-lesson .hkdev-h .pr{color:var(--subject-color)!important;background:#fff!important;border:1px solid rgba(255,255,255,.58)!important}",
      "body.gq-premium-lesson .hkdev-bd{padding:14px!important;background:#fff!important}",
      "body.gq-premium-lesson .hkdev-pace{gap:8px!important}",
      "body.gq-premium-lesson .hkdev-pace .st{background:#fff!important;border:1px solid #E7E0D4!important;border-top:3px solid var(--subject-color)!important;border-radius:9px!important;box-shadow:none!important}",
      "body.gq-premium-lesson .hkdev-pace .mn,body.gq-premium-lesson .hkdev-obj .goal,body.gq-premium-lesson .hkdev-chk b{color:var(--subject-color)!important}",
      "body.gq-premium-lesson .hkdev-obj,body.gq-premium-lesson .hkdev-chk,body.gq-premium-lesson .hkdev-arc,body.gq-premium-lesson .hkdev-home{background:var(--subject-bg)!important;color:#16383B!important;border:1px solid color-mix(in srgb,var(--subject-color) 24%,#fff)!important;border-right:4px solid var(--subject-color)!important;border-radius:10px!important;box-shadow:none!important}",
      "body.gq-premium-lesson .hkdev-diff .d{color:#16383B!important;background:#fff!important;border:1px solid #E7E0D4!important;border-top:3px solid var(--subject-color)!important;border-radius:9px!important}",
      "body.gq-premium-lesson table th{background:var(--subject-color)!important;color:var(--subject-on)!important;border-color:var(--subject-color)!important}",
      "body.gq-premium-lesson table td{background:#fff!important;color:#16383B!important;border-color:#E7E0D4!important}",
      "body.gq-premium-lesson img,body.gq-premium-lesson video,body.gq-premium-lesson audio{box-shadow:none!important}",
      "body.gq-premium-lesson .panel.active> :last-child,body.gq-premium-lesson .guide> :last-child{margin-bottom:0!important;padding-bottom:0!important}",
      "@media(max-width:940px){body.gq-premium-lesson :where(.two-col,.main-grid,.lesson-grid,.hero-grid,.activity-layout,.manzooma-layout){grid-template-columns:1fr!important}}",
      "@media(max-width:760px){body.gq-premium-lesson .hkdev-diff{grid-template-columns:1fr!important}body.gq-premium-lesson .hkdev-h{flex-wrap:wrap!important}}",
    ].join("");
  }

  function meaningfulBottom(doc) {
    var candidates = [
      doc.querySelector(".guide"),
      doc.querySelector(".panel.active"),
      doc.querySelector(".tab-content.active"),
      doc.body,
    ].filter(Boolean);
    [
      doc.querySelector(".panel.active"),
      doc.querySelector(".tab-content.active"),
    ]
      .filter(Boolean)
      .forEach(function (panel) {
        Array.prototype.forEach.call(panel.children, function (child) {
          candidates.push(child);
        });
      });
    var bottom = 0;
    candidates.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        bottom = Math.max(bottom, rect.bottom + (doc.defaultView.scrollY || 0));
      }
    });
    return Math.ceil(bottom);
  }

  function fitFrame(frame) {
    try {
      var doc =
        frame.contentDocument ||
        (frame.contentWindow && frame.contentWindow.document);
      if (!doc || !doc.body || !doc.documentElement) return;
      var height = meaningfulBottom(doc);
      if (!height || height < 220) return;
      var target = height + 18;
      var current = parseInt(frame.style.height || "0", 10);
      if (Math.abs(current - target) > 3) {
        frame.style.setProperty("height", target + "px", "important");
      }
      if (frame.style.minHeight !== "0px") {
        frame.style.setProperty("min-height", "0", "important");
      }
      if (frame.style.maxHeight !== "none") {
        frame.style.setProperty("max-height", "none", "important");
      }
    } catch {}
  }

  function enhanceFrame(frame) {
    try {
      var doc =
        frame.contentDocument ||
        (frame.contentWindow && frame.contentWindow.document);
      if (!doc || !doc.head || !doc.body) return;
      var material = materialFor(frame);
      var style = doc.getElementById("gq-material-interface-v7");
      if (!style) {
        style = doc.createElement("style");
        style.id = "gq-material-interface-v7";
        doc.head.appendChild(style);
      }
      style.textContent = frameCss(material);
      doc.body.dataset.gqMaterial = material.key;
      if (!frame.dataset.gqV7ResizeObserver && "ResizeObserver" in window) {
        frame.dataset.gqV7ResizeObserver = "1";
        var resize = new ResizeObserver(function () {
          window.requestAnimationFrame(function () {
            fitFrame(frame);
          });
        });
        resize.observe(doc.body);
        resize.observe(doc.documentElement);
      }
      stabilizeDocumentTabs(doc);
      fitFrame(frame);
    } catch {}
  }

  function syncTabs() {
    all(".tabs,.subject-tabs").forEach(function (bar) {
      bar.setAttribute("role", "tablist");
      all(".tab,.subject-tab", bar).forEach(function (tab) {
        var active = tab.classList.contains("active");
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.setAttribute("tabindex", active ? "0" : "-1");
      });
      var current = bar.querySelector(".tab.active,.subject-tab.active");
      if (current) revealTabInRail(current, false);
    });
    all(".subject-tab").forEach(function (tab) {
      var action = tab.getAttribute("onclick") || "";
      var palette = null;
      if (/'kitabi/.test(action)) palette = MATERIALS[0];
      else if (/'elm/.test(action)) palette = MATERIALS[1];
      else if (/'ohb/.test(action)) palette = MATERIALS[2];
      else if (/'rasul/.test(action)) palette = MATERIALS[3];
      else if (/'adab/.test(action)) palette = MATERIALS[4];
      else if (/'lisan/.test(action)) palette = MATERIALS[5];
      else if (/'maharati/.test(action)) palette = MATERIALS[6];
      else if (/'language-center/.test(action)) {
        palette = { color: "#0F6E7C", on: "#FFFFFF" };
      } else if (/'math-center/.test(action)) {
        palette = { color: "#A83F24", on: "#FFFFFF" };
      } else if (/'movement/.test(action)) {
        palette = { color: "#9A741F", on: "#FFFFFF" };
      }
      if (!palette) return;
      tab.style.setProperty("--subject-color", palette.color, "important");
      tab.style.setProperty("--subject-on", palette.on, "important");
      if (palette.icon) {
        tab.style.setProperty(
          "--subject-icon",
          'url("' + palette.icon + '")',
          "important",
        );
      }
    });
  }

  function cleanLegacyLayers() {
    [
      ".gq-brand-hero",
      ".gq-command-center",
      ".gq-identity-cover-ribbon",
    ].forEach(function (selector) {
      all(selector).forEach(function (element) {
        element.remove();
      });
    });
    var side = document.getElementById("gq-side");
    if (side) {
      side.setAttribute("aria-hidden", "true");
      side.setAttribute("inert", "");
    }
    var scrim = document.getElementById("gq-scrim");
    if (scrim) scrim.setAttribute("aria-hidden", "true");
    all(".tabs-main .tab,.subject-tab").forEach(function (tab) {
      var label = tab.textContent || "";
      if (/^\s*ض\s+/.test(label)) {
        var span = tab.querySelector("span");
        if (span) span.textContent = span.textContent.replace(/^\s*ض\s+/, "");
        else tab.textContent = label.replace(/^\s*ض\s+/, "");
      }
    });
  }

  function syncInterfaceHeights() {
    var root = document.documentElement;
    var unitRail = document.querySelector(".tabs-main");
    var tools = document.getElementById("gq-smart-tools");
    if (unitRail) {
      var unitHeight = Math.ceil(unitRail.getBoundingClientRect().height);
      if (unitHeight > 40) {
        root.style.setProperty("--gq-v7-unit-nav", unitHeight + "px");
      }
    }
    var toolHeight = tools
      ? Math.ceil(tools.getBoundingClientRect().height)
      : 58;
    root.style.setProperty(
      "--gq-v7-tool-safe",
      Math.max(82, toolHeight + 34) + "px",
    );
  }

  function apply() {
    installProgrammaticScrollGuard();
    document.body.classList.add(
      "gq-app",
      "gq-teacher",
      "gq-ghars-identity-v5",
      "gq-experience-v4",
      "gq-horizontal-nav-v7",
    );
    cleanLegacyLayers();
    stabilizeDocumentTabs(document);
    syncTabs();
    all("iframe").forEach(enhanceFrame);
    syncInterfaceHeights();
  }

  document.addEventListener(
    "keydown",
    function (event) {
      var current = event.target.closest(".tab,.subject-tab");
      if (!current || !current.closest(".tabs,.subject-tabs")) return;
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
        return;
      }
      var bar = current.closest(".tabs,.subject-tabs");
      var tabs = all(".tab,.subject-tab", bar);
      var index = tabs.indexOf(current);
      if (index < 0) return;
      event.preventDefault();
      var nextIndex = index;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else if (event.key === "ArrowRight") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index + 1) % tabs.length;
      }
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    },
    true,
  );

  document.addEventListener(
    "click",
    function (event) {
      if (event.target.closest(".tab,.subject-tab,[data-tab]")) {
        window.setTimeout(apply, 40);
        window.setTimeout(apply, 240);
        window.setTimeout(apply, 700);
      }
    },
    true,
  );

  all("iframe").forEach(function (frame) {
    frame.addEventListener("load", function () {
      window.setTimeout(function () {
        enhanceFrame(frame);
      }, 20);
      window.setTimeout(function () {
        enhanceFrame(frame);
      }, 260);
      window.setTimeout(function () {
        enhanceFrame(frame);
      }, 900);
    });
  });

  var scheduled = false;
  try {
    new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        apply();
      });
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "src", "srcdoc"],
    });
  } catch {}

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
  window.addEventListener("load", function () {
    apply();
    window.setTimeout(apply, 400);
    window.setTimeout(apply, 1200);
  });
  window.addEventListener("resize", function () {
    window.requestAnimationFrame(syncInterfaceHeights);
  });
})();
