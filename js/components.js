/* ==========================================================================
   components.js — מנוע משותף: header, footer, תפריט, אנימציות, רינדור
   ========================================================================== */
(function () {
  "use strict";
  const S = window.SITE;
  const { BIZ, NAV } = S;

  /* ---------- אוסף אייקונים (SVG) ---------- */
  const P = {
    phone: '<path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z"/>',
    whatsapp: '<path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91a9.86 9.86 0 0 0-2.9-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/>',
    pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
    clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4-3.3 1.9a1 1 0 0 1-1-1.73L11 11.4V7a1 1 0 0 1 2 0z"/>',
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4.2V18h16V8.2l-8 5z"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>',
    check: '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    star: '<path d="M12 2l2.95 6.05 6.55.95-4.75 4.6 1.12 6.55L12 17.7 6.13 20.7l1.12-6.55L2.5 9.55l6.55-.95z"/>',
    arrow: '<path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    send: '<path d="M2 2 9 22 13 13 22 9z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/><path d="M2 2 13 13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    chev: '<path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    instagram: '<path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25zm0 11.14A4.39 4.39 0 1 1 16.39 12 4.39 4.39 0 0 1 12 16.39zm6.96-11.41a1.58 1.58 0 1 1-1.58-1.58 1.58 1.58 0 0 1 1.58 1.58z"/>',
    facebook: '<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>',
    camera: '<path d="M9 4l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4zm3 5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>',
    gift: '<path d="M20 7h-2.18A3 3 0 0 0 13 3.5L12 5l-1-1.5A3 3 0 0 0 6.18 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-7 13H7v-7h6zm0-9H5V9h8zm-4.5-2A1 1 0 0 1 9 6l1 1.5h-1.5zm7 11H13v-7h6v7zm.5-9H14l1-1.5A1 1 0 1 1 15.5 8z"/>',
    image: '<path d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM5 19l4.5-6 3 4 2.5-3L20 19z"/>',
    printer: '<path d="M7 3h10v4H7zM5 9h14a2 2 0 0 1 2 2v6h-4v4H7v-4H3v-6a2 2 0 0 1 2-2zm2 8v4h10v-4zm11-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>',
    sparkles: '<path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6zM5 14l.9 2.5L8.4 17l-2.5.9L5 20l-.9-2.1L1.6 17l2.5-.5zm14 1l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1z"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5z"/>',
    heart: '<path d="M12 21s-7.5-4.6-10-9.3C.7 9.3 1.6 6 4.6 5.1c2-.6 3.9.3 4.9 1.8L12 9.3l2.5-2.4c1-1.5 2.9-2.4 4.9-1.8 3 .9 3.9 4.2 2.6 6.6C19.5 16.4 12 21 12 21z"/>',
    palette: '<path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1.1.9-2 2-2h2.3c2 0 3.7-1.6 3.7-3.7C21 6.3 17 2 12 2zM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>',
    school: '<path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.1 3.1 3 7 3s7-1.9 7-3v-3.8l-7 3.8z"/>',
    puzzle: '<path d="M20.5 11H19V8a2 2 0 0 0-2-2h-3V4.5a2.5 2.5 0 0 0-5 0V6H6a2 2 0 0 0-2 2v3.5h1.5a2.5 2.5 0 0 1 0 5H4V20a2 2 0 0 0 2 2h3.5v-1.5a2.5 2.5 0 0 1 5 0V22H17a2 2 0 0 0 2-2v-3h1.5a2.5 2.5 0 0 0 0-5z"/>',
    bear: '<path d="M7.5 4a2.5 2.5 0 0 0-2.45 3A4 4 0 0 0 4 10c0 1.3.6 2.4 1.6 3.2-.1.4-.1.8-.1 1.3 0 3 2.9 5.5 6.5 5.5s6.5-2.5 6.5-5.5c0-.5 0-.9-.1-1.3A4 4 0 0 0 20 10a4 4 0 0 0-1.05-3A2.5 2.5 0 0 0 14.7 5 6.9 6.9 0 0 0 12 4.5 6.9 6.9 0 0 0 9.3 5 2.5 2.5 0 0 0 7.5 4zM10 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>',
    magnet: '<path d="M5 3h4v7a3 3 0 0 0 6 0V3h4v7a7 7 0 0 1-14 0zm0 14h4v3H5zm10 0h4v3h-4z"/>',
    calendar: '<path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zm12 8v9H5v-9zM7 12v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"/>',
    phoneM: '<path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 17a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM7 5v12h10V5z"/>',
    album: '<path d="M5 3h12a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2zm2 4v2h8V7zm0 4v2h8v-2z"/>',
    passport: '<path d="M5 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5.5 3A3.5 3.5 0 1 0 14 9.5 3.5 3.5 0 0 0 10.5 6zm0 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM7 15h7v1.5H7z"/>',
    tape: '<path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm4.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm7 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM9 16h6l1 2H8z"/>',
    edit: '<path d="M4 15.5 14.6 5l4 4L8 19.5 3 21zM16 3.6l1.4-1.4a2 2 0 0 1 2.8 0l1.6 1.6a2 2 0 0 1 0 2.8L20.4 8z"/>',
    truck: '<path d="M3 4h11a1 1 0 0 1 1 1v3h3l3 3.5V17h-2a2.5 2.5 0 0 1-5 0H10a2.5 2.5 0 0 1-5 0H3zm12 6h3.5L17 8.2V10zM7.5 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>',
    medal: '<path d="M8 2l2 6H6zm8 0l-2 6h4zM12 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 3 1.1 2.2 2.4.3-1.7 1.7.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.7-1.7 2.4-.3z"/>',
    users: '<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-6 1.8-6 4v3h12v-3c0-2.2-2.7-4-6-4zm8.5-9a3.5 3.5 0 0 1 0 7 4.5 4.5 0 0 0-1.2-1.2 2.5 2.5 0 0 0 0-4.6A4.5 4.5 0 0 0 17.5 4zm.5 9c2.2.3 4 1.7 4 3.5V20h-3v-3c0-1.5-.4-2.8-1-3.8z"/>',
  };

  function icon(name, cls) {
    const body = P[name] || P.sparkles;
    const stroke = /stroke=/.test(body);
    return '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') +
      (stroke ? '' : ' fill="currentColor"') + '>' + body + '</svg>';
  }
  S.icon = icon;

  /* ---------- מצב עמוד נוכחי ---------- */
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";

  function navActive(href) {
    const f = href.split("?")[0].toLowerCase();
    if (f === page) return true;
    // קישור "מתנות מודפסות" -> פעיל גם בעמודי קטגוריה ובחנות
    if (f === "category.html" && (page === "category.html")) return true;
    return false;
  }

  /* ---------- Header ---------- */
  function buildHeader() {
    const navLinks = NAV.map(n =>
      n.cta
        ? `<a class="btn btn--brand btn--sm nav__cta" href="${n.href}">${icon("send")} ${n.label}</a>`
        : `<a class="nav__link${navActive(n.href) ? " is-active" : ""}" href="${n.href}">${n.label}</a>`
    ).join("");

    return `
    <div class="topbar">
      <div class="container">
        <a class="topbar__set topbar__set--left" href="${BIZ.tel}">${icon("phone")} <span>${BIZ.phoneDisplay}</span></a>
        <div class="topbar__set">
          <span>${icon("pin")} ${BIZ.address}</span>
          <span>${icon("clock")} א׳-ה׳ 09:00–19:00</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="header-bar">
        <button class="nav-toggle" id="navToggle" aria-label="פתיחת תפריט" aria-expanded="false">${icon("menu")}</button>
        <a class="brand" href="index.html" aria-label="${BIZ.name} — דף הבית">
          <img src="images/logo-Klikcenter.webp" alt="${BIZ.name} — חנות צילום במודיעין" width="184" height="46">
        </a>
        <nav class="nav" aria-label="ניווט ראשי">${navLinks}</nav>
      </div>
    </div>`;
  }

  // ה-drawer וה-backdrop מוזרקים ל-body (לא ל-header) כדי שמיקום fixed
  // יתייחס למסך המלא — אחרת ה-backdrop-filter של ה-header יוצר containing block.
  function buildDrawer() {
    const drawerLinks = NAV.filter(n => !n.cta).map(n =>
      `<a class="${navActive(n.href) ? "is-active" : ""}" href="${n.href}">${n.label}<span>${icon("chev")}</span></a>`
    ).join("");
    return `
    <div class="drawer-backdrop" id="drawerBackdrop"></div>
    <aside class="drawer" id="drawer" aria-label="תפריט נייד">
      <div class="drawer__head">
        <img src="images/logo-Klikcenter.webp" alt="${BIZ.name}">
        <button class="drawer__close" id="drawerClose" aria-label="סגירת תפריט">${icon("close")}</button>
      </div>
      <nav class="drawer__nav">${drawerLinks}</nav>
      <div class="drawer__foot">
        <a class="btn btn--brand btn--block" href="contact.html">${icon("send")} יצירת קשר</a>
        <a class="btn btn--ghost btn--block" href="${BIZ.tel}">${icon("phone")} ${BIZ.phoneDisplay}</a>
      </div>
    </aside>`;
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    const shopLinks = S.CATEGORIES.slice(0, 6).map(c =>
      `<li><a href="category.html?cat=${c.id}">${c.title}</a></li>`).join("");
    const serviceLinks = S.SERVICES.map(s =>
      `<li><a href="services.html#${s.id}">${s.title}</a></li>`).join("");
    let year = "2026";
    try { year = String(new Date().getFullYear()); } catch (e) {}
    return `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/logo-Klikcenter.webp" alt="${BIZ.name}">
          <p>חנות הצילום של מודיעין — פיתוח תמונות, מתנות מודפסות בעיצוב אישי ושירותי משרד, הכל תחת קורת גג אחת ובחיוך.</p>
          <div class="footer-social">
            <a href="${BIZ.instagram}" target="_blank" rel="noopener" aria-label="אינסטגרם">${icon("instagram")}</a>
            <a href="${BIZ.facebook}" target="_blank" rel="noopener" aria-label="פייסבוק">${icon("facebook")}</a>
            <a href="${BIZ.wa()}" target="_blank" rel="noopener" aria-label="וואטסאפ">${icon("whatsapp")}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>החנות</h4>
          <ul>${shopLinks}<li><a href="shop.html">לכל הקטגוריות</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>שירותים</h4>
          <ul>${serviceLinks}<li><a href="photo-development.html">פיתוח תמונות</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>מידע נוסף</h4>
          <ul>
            <li><a href="about.html">אודות</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>יצירת קשר</h4>
          <ul class="footer-contact">
            <li>${icon("pin")} <span>${BIZ.address}</span></li>
            <li>${icon("phone")} <a href="${BIZ.tel}">${BIZ.phoneDisplay}</a></li>
            <li>${icon("whatsapp")} <a href="${BIZ.wa()}" target="_blank" rel="noopener">${BIZ.whatsappDisplay}</a></li>
            <li>${icon("clock")} <span>א׳–ה׳ 09:00–19:00 · ו׳ 09:00–13:00</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} כל הזכויות שמורות ל${BIZ.name}</span>
        <nav class="footer-legal" aria-label="קישורים משפטיים">
          <a href="terms.html">תקנון האתר</a>
          <a href="accessibility.html">הצהרת נגישות</a>
          <a href="privacy.html">מדיניות פרטיות</a>
        </nav>
        <span class="footer-credit">עיצוב ובנייה ע״י:
          <a href="https://ombee.co.il" target="_blank" rel="noopener" aria-label="OMBee – עיצוב גרפי ובניית אתרים"><img src="images/ombee-logo.webp" alt="OMBee" width="799" height="229" loading="lazy"></a>
        </span>
      </div>
    </div>`;
  }

  /* ---------- כרטיס קטגוריה ---------- */
  function categoryCard(c, delay) {
    const count = c.products && c.products.length ? c.products.length + " מוצרים" : "לפרטים ומחיר";
    return `
    <a class="cat-card reveal" data-delay="${delay || 0}" href="category.html?cat=${c.id}">
      <img class="cat-card__img" src="${c.img}" alt="${c.title}" loading="lazy" decoding="async">
      <span class="cat-card__overlay"></span>
      <span class="cat-card__body">
        <span class="cat-card__title">${c.title}</span>
        <span class="cat-card__count">${count}</span>
        <span class="cat-card__go">לצפייה</span>
      </span>
    </a>`;
  }

  function renderCategories(sel, list) {
    const el = document.querySelector(sel);
    if (!el) return;
    const items = list || S.CATEGORIES;
    el.innerHTML = items.map((c, i) => categoryCard(c, (i % 5) + 1)).join("");
  }

  function renderMoreCategories(sel) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = S.MORE_CATEGORIES.map((c, i) => `
      <div class="tile reveal" data-delay="${(i % 5) + 1}">
        <div class="tile__ic">${icon(c.icon)}</div>
        <h3>${c.title}</h3>
        <p>${c.note}</p>
      </div>`).join("");
  }

  /* ---------- מוצרים ---------- */
  function productCard(p, catTitle, delay) {
    const msg = `היי קליק סנטר! אשמח לקבל פרטים ומחיר על: ${p.name}${catTitle ? " (" + catTitle + ")" : ""} 🙂`;
    return `
    <article class="product-card reveal" data-delay="${delay || 0}">
      <div class="product-card__media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async">
      </div>
      <div class="product-card__body">
        <h3 class="product-card__title">${p.name}</h3>
        <p class="product-card__desc">${p.desc || ""}</p>
        <div class="product-card__foot">
          <a class="btn btn--wa btn--sm" href="${BIZ.wa(msg)}" target="_blank" rel="noopener">${icon("whatsapp")} להזמנה</a>
        </div>
      </div>
    </article>`;
  }

  function renderServices(sel) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = S.SERVICES.map((s, i) => {
      const msg = `היי קליק סנטר! אשמח לקבל פרטים על השירות: ${s.title} 🙂`;
      return `
      <article id="${s.id}" class="svc-card reveal" data-delay="${(i % 4) + 1}">
        <div class="svc-card__media"><img src="${s.img}" alt="${s.title}" loading="lazy" decoding="async"></div>
        <div class="svc-card__body">
          <h3>${icon(s.icon)} ${s.title}</h3>
          <p>${s.desc}</p>
          <a class="btn btn--brand btn--sm" href="${BIZ.wa(msg)}" target="_blank" rel="noopener">${icon("whatsapp")} לפרטים בוואטסאפ</a>
        </div>
      </article>`;
    }).join("");
  }

  function renderTestimonials(sel) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = S.TESTIMONIALS.map((t, i) => {
      const stars = Array(5).fill(icon("star")).join("");
      const avatar = t.img
        ? `<img src="${t.img}" alt="${t.name}">`
        : `<span class="info-item__ic" style="width:46px;height:46px;border-radius:50%">${icon("users")}</span>`;
      return `
      <div class="testi reveal" data-delay="${(i % 3) + 1}">
        <div class="testi__stars">${stars}</div>
        <p class="testi__text">"${t.text}"</p>
        <div class="testi__who">${avatar}<div><b>${t.name}</b><span>${t.role}</span></div></div>
      </div>`;
    }).join("");
  }

  /* ---------- עמוד קטגוריה דינמי ---------- */
  function renderCategoryPage() {
    const host = document.getElementById("categoryPage");
    if (!host) return;
    const id = new URLSearchParams(location.search).get("cat") || "mugs";
    const c = S.CATEGORIES.find(x => x.id === id) || S.CATEGORIES[0];
    document.title = `${c.title} | ${BIZ.name}`;

    const bullets = (c.bullets || []).map(b => `<li>${icon("check")}<span>${b}</span></li>`).join("");
    const waMsg = `היי קליק סנטר! אשמח לקבל פרטים ומחיר על ${c.title} 🙂`;
    const products = (c.products && c.products.length)
      ? `<section class="section">
           <div class="container">
             <div class="section-head center">
               <span class="eyebrow">${icon("sparkles")} מהקטלוג</span>
               <h2 class="section-title">מוצרים נבחרים — ${c.title}</h2>
               <p class="section-lead">כל המוצרים ניתנים להתאמה אישית מלאה. שלחו לנו את התמונה ונדאג לשאר.</p>
             </div>
             <div class="product-grid">${c.products.map((p, i) => productCard(p, c.title, (i % 4) + 1)).join("")}</div>
           </div>
         </section>` : "";

    // קטגוריות קשורות
    const related = S.CATEGORIES.filter(x => x.id !== c.id).slice(0, 4);

    host.innerHTML = `
      <section class="page-hero">
        <div class="container">
          <h1>${c.title}</h1>
          <p>${c.blurb}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="split">
            <div class="split__media reveal"><img src="${c.img}" alt="${c.title}" loading="lazy"></div>
            <div class="reveal" data-delay="1">
              <span class="eyebrow">${icon("gift")} ${c.group}</span>
              <h2 class="section-title">${c.title} בעיצוב אישי</h2>
              <p style="margin-top:14px;color:var(--body)">${c.blurb}</p>
              <ul class="split__list">${bullets}</ul>
              <div class="hero__cta">
                <a class="btn btn--wa btn--lg" href="${BIZ.wa(waMsg)}" target="_blank" rel="noopener">${icon("whatsapp")} להזמנה ולפרטים</a>
                <a class="btn btn--ghost btn--lg" href="${BIZ.tel}">${icon("phone")} חייגו אלינו</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${products}

      <section class="section section--soft">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">${icon("sparkles")} עוד רעיונות</span>
            <h2 class="section-title">קטגוריות נוספות</h2>
          </div>
          <div class="cat-grid">${related.map((x, i) => categoryCard(x, (i % 4) + 1)).join("")}</div>
        </div>
      </section>`;
    initReveal();
  }

  /* ---------- אינטראקציה: תפריט נייד ---------- */
  function initDrawer() {
    const toggle = document.getElementById("navToggle");
    const drawer = document.getElementById("drawer");
    const backdrop = document.getElementById("drawerBackdrop");
    const close = document.getElementById("drawerClose");
    if (!toggle || !drawer) return;
    const open = () => { drawer.classList.add("is-open"); backdrop.classList.add("is-open"); toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; };
    const shut = () => { drawer.classList.remove("is-open"); backdrop.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
    toggle.addEventListener("click", open);
    close.addEventListener("click", shut);
    backdrop.addEventListener("click", shut);
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", shut));
    document.addEventListener("keydown", e => { if (e.key === "Escape") shut(); });
  }

  /* ---------- אינטראקציה: צל בגלילה ---------- */
  function initScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- אינטראקציה: חשיפה בגלילה ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }
  S.initReveal = initReveal;

  /* ---------- אפקט ספירה עולה למספרים (count-up) ---------- */
  function initCounters() {
    const nums = document.querySelectorAll(".count[data-count]");
    if (!nums.length) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fmt = (v) => v.toLocaleString("en-US");
    const run = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      if (reduce) { el.textContent = fmt(target); return; }
      const dur = 1600; let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
  }
  S.initCounters = initCounters;

  /* ---------- כפתור וואטסאפ צף ---------- */
  function buildWaFloat() {
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = BIZ.wa();
    a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "שליחת הודעת וואטסאפ");
    a.innerHTML = icon("whatsapp");
    document.body.appendChild(a);
  }

  /* ---------- אתחול ---------- */
  function boot() {
    const header = document.querySelector("[data-header]") || document.querySelector(".site-header");
    if (header) {
      header.innerHTML = buildHeader();
      document.body.insertAdjacentHTML("beforeend", buildDrawer());
    }
    const footer = document.querySelector("[data-footer]") || document.querySelector(".site-footer");
    if (footer) footer.innerHTML = buildFooter();

    // קישורי וואטסאפ/טלפון דינמיים לפי data-wa
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = BIZ.wa(el.getAttribute("data-wa")); el.target = "_blank"; el.rel = "noopener"; });
    document.querySelectorAll("[data-tel]").forEach(el => { el.href = BIZ.tel; });

    renderCategoryPage();
    initDrawer();
    initScroll();
    buildWaFloat();
    initReveal();
    initCounters();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // חשיפת פונקציות רינדור לעמודים
  S.render = { categories: renderCategories, more: renderMoreCategories, services: renderServices, testimonials: renderTestimonials, productCard };
})();
