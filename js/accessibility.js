/* ==========================================================================
   accessibility.js — תפריט נגישות (כפתור + פאנל)
   שומר העדפות ב-localStorage ומחיל אותן בכל עמוד. תואם ת"י 5568 ברוח WCAG.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "klik_a11y";
  var html = document.documentElement;
  var TOGGLES = ["contrast", "invert", "grayscale", "links", "spacing", "lineheight", "readable", "stopmotion", "hideimg", "cursor"];

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var state = load();

  // החלת המצב על תגית ה-html (מוקדם ככל האפשר כדי למנוע הבהוב)
  function apply() {
    TOGGLES.forEach(function (k) { html.classList.toggle("a11y-" + k, !!state[k]); });
    for (var n = 1; n <= 3; n++) html.classList.toggle("a11y-bigtext-" + n, (state.bigtext || 0) === n);
  }
  apply();

  /* ---------- אייקונים ---------- */
  function s(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>"; }
  var IC = {
    access: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a1.6 1.6 0 1 1 0 3.2A1.6 1.6 0 0 1 12 5zM7.5 9.5h9a1 1 0 0 1 0 2H14v2l1.7 4.2a1 1 0 1 1-1.85.76L12.3 15h-.6l-1.55 3.46a1 1 0 1 1-1.85-.76L10 13.5v-2H7.5a1 1 0 0 1 0-2z"/></svg>',
    close: s('<path d="M6 6l12 12M18 6 6 18"/>'),
    reset: s('<path d="M3 12a9 9 0 1 0 2.6-6.3M3 4v4h4"/>'),
    links: s('<path d="M9.5 14.5l5-5"/><path d="M11 6.5l1-1a3.5 3.5 0 0 1 5 5l-1 1"/><path d="M13 17.5l-1 1a3.5 3.5 0 0 1-5-5l1-1"/>'),
    contrast: s('<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>'),
    invert: s('<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 5a7 7 0 0 1 0 14z" fill="currentColor" stroke="none"/>'),
    grayscale: s('<path d="M12 3c3.2 4.2 5 6.8 5 9.2a5 5 0 0 1-10 0C7 9.8 8.8 7.2 12 3z"/><path d="M12 3v18" stroke-dasharray="2 2"/>'),
    spacing: s('<path d="M3 7h18M3 17h18"/><path d="M7.5 4 4 7l3.5 3M16.5 4 20 7l-3.5 3"/>'),
    lineheight: s('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 4v16"/><path d="M2.5 6 4.5 4l2 2M2.5 18l2 2 2-2"/>'),
    stopmotion: s('<rect x="7" y="6" width="3.4" height="12" rx="1" fill="currentColor" stroke="none"/><rect x="13.6" y="6" width="3.4" height="12" rx="1" fill="currentColor" stroke="none"/>'),
    hideimg: s('<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3.5 17l4.5-4.5 3.5 3.5"/><circle cx="8.5" cy="9.5" r="1.2" fill="currentColor" stroke="none"/><path d="M4 4l16 16"/>'),
    cursor: s('<path d="M5 2.5l13 6.5-5.6 1.9L10.5 18z" fill="currentColor" stroke="none"/>')
  };

  var OPTS = [
    { k: "links", label: "הדגשת קישורים", ic: IC.links },
    { k: "contrast", label: "ניגודיות גבוהה", ic: IC.contrast },
    { k: "invert", label: "ניגודיות הפוכה", ic: IC.invert },
    { k: "grayscale", label: "גווני אפור", ic: IC.grayscale },
    { k: "bigtext", label: "הגדלת טקסט", cycle: true, ic: '<span style="font-weight:800;font-size:19px;line-height:1">A<small style="font-size:12px">A</small></span>' },
    { k: "spacing", label: "ריווח טקסט", ic: IC.spacing },
    { k: "lineheight", label: "גובה שורה", ic: IC.lineheight },
    { k: "readable", label: "גופן קריא", ic: '<span style="font-weight:800;font-size:16px;line-height:1">Aa</span>' },
    { k: "stopmotion", label: "עצירת הנפשות", ic: IC.stopmotion },
    { k: "hideimg", label: "הסתרת תמונות", ic: IC.hideimg },
    { k: "cursor", label: "סמן גדול", ic: IC.cursor }
  ];

  var panel, btn;

  function open() { panel.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
  function close() { panel.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }

  function onToggle(o) {
    if (o.cycle) {
      state.bigtext = ((state.bigtext || 0) + 1) % 4;
    } else {
      state[o.k] = !state[o.k];
      // ניגודיות הפוכה וגווני אפור — אחת מבטלת את השנייה
      if (o.k === "invert" && state.invert) state.grayscale = false;
      if (o.k === "grayscale" && state.grayscale) state.invert = false;
    }
    save(state); apply(); refreshUI();
  }

  function reset() {
    state = {};
    TOGGLES.forEach(function (k) { html.classList.remove("a11y-" + k); });
    for (var n = 1; n <= 3; n++) html.classList.remove("a11y-bigtext-" + n);
    save(state); refreshUI();
  }

  function refreshUI() {
    if (!panel) return;
    panel.querySelectorAll(".a11y-opt").forEach(function (b) {
      var k = b.getAttribute("data-k");
      if (k === "bigtext") {
        var lv = state.bigtext || 0;
        b.classList.toggle("is-active", lv > 0);
        var span = b.querySelector(".lvl");
        if (span) span.textContent = lv ? "רמה " + lv : "";
      } else {
        b.classList.toggle("is-active", !!state[k]);
      }
    });
  }

  function build() {
    var root = document.createElement("div");
    root.className = "a11y-root";

    btn = document.createElement("button");
    btn.className = "a11y-toggle";
    btn.setAttribute("aria-label", "פתיחת תפריט נגישות");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = IC.access;

    panel = document.createElement("div");
    panel.className = "a11y-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "הגדרות נגישות");
    panel.innerHTML =
      '<div class="a11y-panel__head"><h2>' + IC.access + ' נגישות</h2>' +
      '<button class="a11y-panel__close" aria-label="סגירת תפריט נגישות">' + IC.close + "</button></div>" +
      '<div class="a11y-grid"></div>' +
      '<button class="a11y-reset">' + IC.reset + " איפוס הגדרות הנגישות</button>";

    var grid = panel.querySelector(".a11y-grid");
    OPTS.forEach(function (o) {
      var b = document.createElement("button");
      b.className = "a11y-opt";
      b.setAttribute("data-k", o.k);
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = '<span class="a11y-opt__ic">' + o.ic + "</span><span>" + o.label + "</span>" + (o.cycle ? '<span class="lvl"></span>' : "");
      b.addEventListener("click", function () { onToggle(o); b.setAttribute("aria-pressed", b.classList.contains("is-active") ? "true" : "false"); });
      grid.appendChild(b);
    });

    panel.querySelector(".a11y-panel__close").addEventListener("click", close);
    panel.querySelector(".a11y-reset").addEventListener("click", reset);

    root.appendChild(panel);
    root.appendChild(btn);
    document.body.appendChild(root);

    btn.addEventListener("click", function () { panel.classList.contains("is-open") ? close() : open(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    document.addEventListener("click", function (e) { if (!root.contains(e.target)) close(); });

    refreshUI();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
