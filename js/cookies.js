/* ──────────────────────────────────────────────
   קליק סנטר מודיעין — באנר עוגיות (Cookie Consent)
   מבוסס על באנר העוגיות של אתרי OMBee, בצבעי האתר: נייבי כהה עם פס כחול/כתום מהלוגו.
   רחב, בתחתית המסך, גופן Assistant. נשמר ב-sessionStorage —
   מופיע פעם בכל ביקור חדש, ולא חוזר תוך אותה גלישה לאחר בחירה.
────────────────────────────────────────────── */
(function () {
  "use strict";
  var KEY = 'klik-cookie';

  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var COOKIE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><circle cx="8.5" cy="8.7" r=".7" fill="currentColor" stroke="none"/><circle cx="16" cy="15.3" r=".7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r=".7" fill="currentColor" stroke="none"/><circle cx="7.2" cy="14" r=".7" fill="currentColor" stroke="none"/><circle cx="16.8" cy="9" r=".7" fill="currentColor" stroke="none"/></svg>';

  var style = document.createElement('style');
  style.textContent = `
.klik-cookie{position:fixed;left:50%;bottom:18px;z-index:9998;direction:rtl;
  width:calc(100% - 44px);max-width:880px;
  font-family:'Assistant',sans-serif;color:#fff;
  background:linear-gradient(120deg,#0f2c3f 0%,#16303f 100%);
  border:1px solid rgba(237,88,41,.4);overflow:hidden;border-radius:14px;
  box-shadow:0 16px 46px rgba(15,44,63,.5);
  transform:translate(-50%,170%);transition:transform .45s cubic-bezier(.4,0,.2,1)}
.klik-cookie::before{content:"";position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,#205678 0 55%,#ed5829 0)}
.klik-cookie.show{transform:translate(-50%,0)}
.klik-cookie-in{max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:16px;padding:12px 22px;flex-wrap:wrap}
.klik-cookie-ico{flex:none;display:flex;align-items:center;justify-content:center;color:#ed5829}
.klik-cookie-ico svg{width:27px;height:27px}
.klik-cookie-txt{flex:0 1 auto;min-width:0;font-size:13.5px;line-height:1.55;color:#cdd9e0}
.klik-cookie-txt b{color:#fff;font-weight:700}
.klik-cookie-txt a{color:#ed5829;font-weight:700;text-decoration:underline;text-underline-offset:2px}
.klik-cookie-txt a:hover{color:#ff7a4d}
.klik-cookie-actions{flex:none;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.klik-cookie-btn{font-family:'Assistant',sans-serif;font-weight:700;font-size:13.5px;cursor:pointer;border-radius:8px;padding:9px 20px;border:1.6px solid transparent;transition:transform .2s,box-shadow .2s,background .2s,color .2s}
.klik-cookie-btn:focus-visible{outline:3px solid #ed5829;outline-offset:2px}
.klik-cookie-accept{background:#ed5829;color:#fff;box-shadow:0 6px 18px rgba(237,88,41,.3)}
.klik-cookie-accept:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(237,88,41,.45);background:#d8410f}
.klik-cookie-reject{background:transparent;color:#cdd9e0;border-color:rgba(255,255,255,.28)}
.klik-cookie-reject:hover{background:rgba(255,255,255,.1);border-color:#205678;color:#fff}
@media(max-width:620px){
  .klik-cookie-in{gap:14px;padding:16px}
  .klik-cookie-ico{display:none}
  .klik-cookie-actions{width:100%}
  .klik-cookie-btn{flex:1 1 auto;text-align:center}
}
/* מעל הכפתורים הצפים (נגישות משמאל, וואטסאפ מימין) כשהבאנר רחב */
@media(max-width:1000px){.klik-cookie{bottom:86px}}
@media(prefers-reduced-motion:reduce){.klik-cookie{transition:none}}
`;
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.className = 'klik-cookie';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-live', 'polite');
  bar.setAttribute('aria-label', 'הודעת שימוש בעוגיות');
  bar.innerHTML = `
<div class="klik-cookie-in">
  <div class="klik-cookie-ico">${COOKIE_ICON}</div>
  <div class="klik-cookie-txt">
    אתר זה משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה שלך. לפרטים נוספים ניתן לעיין ב<a href="privacy.html">מדיניות הפרטיות</a>.
  </div>
  <div class="klik-cookie-actions">
    <button type="button" class="klik-cookie-btn klik-cookie-accept">מאשר/ת</button>
    <button type="button" class="klik-cookie-btn klik-cookie-reject">ביטול</button>
  </div>
</div>`;

  function mount() {
    document.body.appendChild(bar);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add('show'); });
    });

    function choose(val) {
      try { sessionStorage.setItem(KEY, val); } catch (e) {}
      bar.classList.remove('show');
      setTimeout(function () { bar.remove(); }, 450);
    }
    bar.querySelector('.klik-cookie-accept').addEventListener('click', function () { choose('all'); });
    bar.querySelector('.klik-cookie-reject').addEventListener('click', function () { choose('essential'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
