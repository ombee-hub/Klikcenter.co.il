/* ──────────────────────────────────────────────
   קליק סנטר מודיעין — יישומון נגישות (תו נגישות)
   מבוסס על תו הנגישות של אתרי OMBee, בצבעי האתר: נייבי כהה, כחול #205678 וכתום #ed5829 מהלוגו, גופן Assistant.
   כל אפשרות היא <button> עם aria-pressed — נגיש גם במקלדת (focus-trap + Esc). שמירה ב-localStorage.
────────────────────────────────────────────── */
(function () {
  "use strict";
  var KEY = 'klik-a11y';
  var SV = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  var features = [
    { id:'contrast',   label:'ניגודיות גבוהה', icon:`<svg ${SV}><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>` },
    { id:'grayscale',  label:'גווני אפור',      icon:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5s-6.5 7-6.5 12a6.5 6.5 0 0 0 13 0c0-5-6.5-12-6.5-12z" fill="currentColor"/></svg>` },
    { id:'bigText',    label:'הגדלת טקסט',      icon:`<svg ${SV}><path d="M3 18 7.5 7 12 18"/><path d="M4.5 14.3h6"/><path d="M14 18 17 10 20 18"/><path d="M15 15.3h4"/></svg>` },
    { id:'links',      label:'הדגשת קישורים',   icon:`<svg ${SV}><path d="M9 8H7a4 4 0 0 0 0 8h2"/><path d="M15 8h2a4 4 0 0 1 0 8h-2"/><path d="M8 12h8"/></svg>` },
    { id:'spacing',    label:'ריווח אותיות',    icon:`<svg ${SV}><path d="M6 9l-3 3 3 3"/><path d="M18 9l3 3-3 3"/><path d="M3 12h2M8 12h2M14 12h2M19 12h2"/></svg>` },
    { id:'lineHeight', label:'גובה שורה',       icon:`<svg ${SV}><path d="M10 6h11M10 10h11M10 14h11M10 18h11"/><path d="M5 4v16"/><path d="M3 6l2-2 2 2"/><path d="M3 18l2 2 2-2"/></svg>` },
    { id:'dyslexia',   label:'גופן קריא',       icon:`<svg ${SV} stroke-width="2"><path d="M3 5h3.5a7 7 0 0 1 0 14H3z"/><path d="M17 19V9.5A3.5 3.5 0 0 1 20.5 6"/><path d="M14.5 11.5h6"/></svg>` },
    { id:'bigCursor',  label:'סמן גדול',        icon:`<svg ${SV}><path d="M5 3l6.5 17 2.4-7.1L21 10.5z"/></svg>` },
    { id:'stopAnim',   label:'עצירת הנפשות',    icon:`<svg ${SV}><circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/></svg>` },
    { id:'hideImages', label:'הסתרת תמונות',    icon:`<svg ${SV}><path d="M14 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/><path d="M17 3l4 4M21 3l-4 4"/></svg>` },
    { id:'textAlign',  label:'יישור לימין',     icon:`<svg ${SV}><path d="M3 6h18M3 10h18M3 14h18M9 18h12"/></svg>` },
    { id:'altText',    label:'תיאורי תמונות',   icon:`<svg ${SV}><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-8l-4 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M12 9.5V13"/><path d="M12 7h.01" stroke-width="2.4"/></svg>` }
  ];

  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}

  /* ── Inject CSS ── */
  var style = document.createElement('style');
  style.textContent = `
.klik-a11y-btn::before{content:"";position:absolute;inset:5px;border:2px solid #ed5829;border-radius:50%;pointer-events:none}
.klik-a11y-btn{position:fixed;bottom:24px;left:24px;z-index:10000;width:52px;height:52px;border-radius:50%;border:none;background:linear-gradient(145deg,#1f4c66,#0f2a39);color:#fff;cursor:pointer;box-shadow:0 8px 24px rgba(15,44,63,.42);display:flex;align-items:center;justify-content:center;transition:transform .3s ease,box-shadow .3s ease}
.klik-a11y-btn:hover{transform:scale(1.08);box-shadow:0 10px 30px rgba(15,44,63,.52)}
.klik-a11y-btn:focus-visible{outline:3px solid #205678;outline-offset:3px}
.klik-a11y-btn svg{width:27px;height:27px}
.klik-a11y-count{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#ed5829;color:#fff;font:700 11px/20px 'Assistant',sans-serif;text-align:center;display:none;box-shadow:0 0 0 2px #fff}
.klik-a11y-btn.active .klik-a11y-count{display:block}

.klik-a11y-overlay{position:fixed;inset:0;z-index:10000;background:rgba(15,44,63,.42);opacity:0;pointer-events:none;transition:opacity .3s ease}
.klik-a11y-overlay.open{opacity:1;pointer-events:all}

.klik-a11y-panel{position:fixed;top:0;bottom:0;left:0;z-index:10001;width:304px;max-width:100vw;overflow-y:auto;overscroll-behavior:contain;background:#f3f7f9;border-radius:0 18px 18px 0;box-shadow:8px 0 40px rgba(15,44,63,.26);transform:translateX(-105%);visibility:hidden;transition:transform .35s cubic-bezier(.4,0,.2,1),visibility 0s linear .35s;direction:rtl;font-family:'Assistant',sans-serif;color:#16242e}
.klik-a11y-panel.open{transform:none;visibility:visible;transition:transform .35s cubic-bezier(.4,0,.2,1)}
.klik-a11y-panel::-webkit-scrollbar{width:6px}
.klik-a11y-panel::-webkit-scrollbar-thumb{background:rgba(32,86,120,.4);border-radius:6px}

.klik-a11y-header{position:sticky;top:0;z-index:2;background:#0f2c3f;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:16px}
.klik-a11y-title{font-size:18px;font-weight:700;color:#fff;margin:0;display:flex;align-items:center;gap:9px;font-family:'Assistant',sans-serif}
.klik-a11y-title-ico{color:#ed5829;display:flex;align-items:center;flex-shrink:0}
.klik-a11y-title-ico svg{width:26px;height:26px}
.klik-a11y-close{width:30px;height:30px;border-radius:50%;border:none;background:rgba(255,255,255,.14);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s}
.klik-a11y-close:hover{background:#ed5829}
.klik-a11y-close svg{width:15px;height:15px}
.klik-a11y-close:focus-visible{outline:3px solid #ed5829;outline-offset:2px}

.klik-a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 14px 10px}
.klik-a11y-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:11px;min-height:104px;padding:14px 6px;position:relative;border:2px solid #dbe6ec;border-radius:12px;background:#fff;color:#16242e;font-family:'Assistant',sans-serif;cursor:pointer;text-align:center;box-shadow:0 2px 10px rgba(15,44,63,.07);transition:border-color .2s,box-shadow .2s,background .2s,color .2s}
.klik-a11y-item:hover{border-color:#205678;box-shadow:0 6px 16px rgba(15,44,63,.13)}
.klik-a11y-item:focus-visible{outline:3px solid #0f2c3f;outline-offset:2px}
.klik-a11y-item[aria-pressed="true"]{background:#205678;border-color:#205678;color:#fff}
.klik-a11y-ico{display:flex;align-items:center;justify-content:center;width:30px;height:30px;color:#205678}
.klik-a11y-item[aria-pressed="true"] .klik-a11y-ico{color:#fff}
.klik-a11y-ico svg{width:100%;height:100%}
.klik-a11y-item-label{font-size:13.5px;font-weight:700;line-height:1.25}
.klik-a11y-check{position:absolute;top:7px;right:7px;width:18px;height:18px;border-radius:50%;background:#fff;color:#205678;display:none;align-items:center;justify-content:center}
.klik-a11y-check svg{width:11px;height:11px}
.klik-a11y-item[aria-pressed="true"] .klik-a11y-check{display:flex}

.klik-a11y-reset{display:flex;align-items:center;justify-content:center;gap:10px;width:calc(100% - 28px);margin:6px 14px 12px;padding:13px 14px;border:none;border-radius:10px;background:#163d56;color:#fff;box-shadow:0 6px 18px rgba(15,44,63,.25);font:700 14px 'Assistant',sans-serif;cursor:pointer;transition:background .2s}
.klik-a11y-reset:hover{background:#0f2c3f}
.klik-a11y-reset:focus-visible{outline:3px solid #ed5829;outline-offset:2px}
.klik-a11y-reset svg{width:20px;height:20px;flex-shrink:0}

.klik-a11y-bottom{padding:0 14px 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.klik-a11y-bottom a{display:flex;align-items:center;justify-content:center;gap:6px;padding:12px 4px;border-radius:10px;background:#fff;border:1.5px solid #205678;font:700 12.5px 'Assistant',sans-serif;color:#205678;text-decoration:none;transition:background .2s,color .2s}
.klik-a11y-bottom a:hover{background:#205678;color:#fff}
.klik-a11y-bottom a:focus-visible{outline:3px solid #0f2c3f;outline-offset:2px}
.klik-a11y-bottom svg{width:16px;height:16px;flex-shrink:0}

/* ── Applied styles (על <html>) ── */
html.a11y-contrast{filter:contrast(1.4)!important}
html.a11y-grayscale{filter:grayscale(1)!important}
html.a11y-contrast.a11y-grayscale{filter:contrast(1.4) grayscale(1)!important}
html.a11y-bigText body>:not(.klik-a11y-root) :is(p,li,a,span,label,h1,h2,h3,h4,h5,h6,td,blockquote,button,input,textarea):not(:is(p,li,a,span,label,h1,h2,h3,h4,h5,h6,td,blockquote,button,input,textarea) *){zoom:1.15}
html.a11y-spacing body>:not(.klik-a11y-root) *{letter-spacing:.06em!important;word-spacing:.14em!important}
html.a11y-lineHeight body>:not(.klik-a11y-root) :is(p,li,a,span,label,h1,h2,h3,h4,td,div){line-height:2!important}
html.a11y-links body>:not(.klik-a11y-root) a{text-decoration:underline!important;outline:2px solid #205678!important;outline-offset:2px!important}
html.a11y-hideImages body>:not(.klik-a11y-root) img{opacity:0!important}
html.a11y-stopAnim *,html.a11y-stopAnim *::before,html.a11y-stopAnim *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
html.a11y-bigCursor,html.a11y-bigCursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M8 8l12 30 5-15 15-5z' fill='%23205678' stroke='%23fff' stroke-width='2.5'/%3E%3C/svg%3E") 8 8,auto!important}
html.a11y-dyslexia body>:not(.klik-a11y-root) *{font-family:Arial,'Segoe UI',Tahoma,sans-serif!important}
html.a11y-textAlign body>:not(.klik-a11y-root) :is(p,li,h1,h2,h3,h4,td,blockquote){text-align:right!important}
.klik-alt-cap{display:block;font:600 12px/1.4 'Assistant',sans-serif;color:#16242e;background:#fdeee7;border:1px solid #f6c9b8;padding:4px 8px;border-radius:6px;margin:4px auto;max-width:92%;direction:rtl;text-align:center}

@media(max-width:480px){.klik-a11y-btn{bottom:16px;left:16px}}
@media(prefers-reduced-motion:reduce){.klik-a11y-panel,.klik-a11y-overlay,.klik-a11y-btn{transition:none}}
`;
  document.head.appendChild(style);

  /* אייקון דמות הנגישות (התו) */
  var A11Y_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="3.9" r="2.1"/><path d="M20.8 8.9c-2.6.7-5.6 1.1-8.8 1.1s-6.2-.4-8.8-1.1a1 1 0 0 0-.5 1.95c2.2.6 4.5 1 6.9 1.1l-1.8 8.2a1 1 0 0 0 1.95.5L11.7 16h.6l1.95 5.65a1 1 0 0 0 1.95-.5l-1.8-8.2c2.4-.1 4.7-.5 6.9-1.1a1 1 0 0 0-.5-1.95z"/></svg>';

  /* ── Build ── */
  var wrapper = document.createElement('div');
  wrapper.className = 'klik-a11y-root';
  wrapper.innerHTML = `
<button class="klik-a11y-btn" type="button" aria-label="פתיחת תפריט נגישות" aria-haspopup="dialog" aria-expanded="false" aria-controls="klikA11yPanel" title="נגישות">
  ${A11Y_ICON}<span class="klik-a11y-count" aria-hidden="true"></span>
</button>
<div class="klik-a11y-overlay"></div>
<div class="klik-a11y-panel" id="klikA11yPanel" role="dialog" aria-modal="true" aria-label="תפריט נגישות">
  <div class="klik-a11y-header">
    <h2 class="klik-a11y-title"><span class="klik-a11y-title-ico">${A11Y_ICON}</span>תפריט נגישות</h2>
    <button class="klik-a11y-close" type="button" aria-label="סגירת תפריט הנגישות">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
    </button>
  </div>
  <div class="klik-a11y-grid">
    ${features.map(function (f) { return `
      <button type="button" class="klik-a11y-item" data-feature="${f.id}" aria-pressed="false">
        <span class="klik-a11y-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span>
        <span class="klik-a11y-ico">${f.icon}</span>
        <span class="klik-a11y-item-label">${f.label}</span>
      </button>`; }).join('')}
  </div>
  <button class="klik-a11y-reset" type="button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 21v-5h-5"/></svg>
    איפוס כל הגדרות הנגישות
  </button>
  <div class="klik-a11y-bottom">
    <a href="accessibility.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>הצהרת נגישות</a>
    <a href="privacy.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>מדיניות פרטיות</a>
  </div>
</div>`;

  document.body.appendChild(wrapper);

  var btn      = wrapper.querySelector('.klik-a11y-btn');
  var count    = wrapper.querySelector('.klik-a11y-count');
  var panel    = wrapper.querySelector('.klik-a11y-panel');
  var overlay  = wrapper.querySelector('.klik-a11y-overlay');
  var closeBtn = wrapper.querySelector('.klik-a11y-close');
  var items    = wrapper.querySelectorAll('.klik-a11y-item');
  var resetBtn = wrapper.querySelector('.klik-a11y-reset');

  function openPanel() {
    panel.classList.add('open'); overlay.classList.add('open');
    btn.style.visibility = 'hidden'; btn.setAttribute('aria-expanded', 'true');
    setTimeout(function () { closeBtn.focus(); }, 50);
  }
  function closePanel() {
    if (!panel.classList.contains('open')) return;
    panel.classList.remove('open'); overlay.classList.remove('open');
    btn.style.visibility = ''; btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }

  /* תיאורי תמונות — מוסיף כיתוב מתחת לכל תמונה עם alt */
  function setAltCaptions(on) {
    document.querySelectorAll('.klik-alt-cap').forEach(function (c) { c.remove(); });
    if (!on) return;
    document.querySelectorAll('body img[alt]').forEach(function (img) {
      if (!img.alt.trim() || wrapper.contains(img)) return;
      var cap = document.createElement('span');
      cap.className = 'klik-alt-cap';
      cap.textContent = img.alt;
      img.insertAdjacentElement('afterend', cap);
    });
  }

  function applyState() {
    var n = 0;
    features.forEach(function (f) {
      var isOn = !!state[f.id];
      if (isOn) n++;
      document.documentElement.classList.toggle('a11y-' + f.id, isOn);
      var el = wrapper.querySelector('[data-feature="' + f.id + '"]');
      if (el) el.setAttribute('aria-pressed', String(isOn));
    });
    setAltCaptions(!!state.altText);
    btn.classList.toggle('active', n > 0);
    count.textContent = n || '';
    btn.setAttribute('aria-label', n ? 'פתיחת תפריט נגישות (' + n + ' הגדרות פעילות)' : 'פתיחת תפריט נגישות');
  }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyState);
  else applyState();

  btn.addEventListener('click', function (e) { e.stopPropagation(); openPanel(); });
  closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closePanel(); });
  overlay.addEventListener('click', closePanel);

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var id = item.dataset.feature;
      state[id] = !state[id];
      save();
      applyState();
    });
  });

  resetBtn.addEventListener('click', function () { state = {}; save(); applyState(); });

  document.addEventListener('keydown', function (e) {
    if (!panel.classList.contains('open')) return;
    if (e.key === 'Escape') { closePanel(); return; }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.slice.call(panel.querySelectorAll('button,a[href]')).filter(function (el) { return el.offsetParent !== null; });
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
