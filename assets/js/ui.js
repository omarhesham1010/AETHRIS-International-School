/* =============================================================
   AETHRIS — Shared UI Engine
   Injects navbar, footer, concierge, palette & wires interactions
   ============================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const A = window.AETHRIS;

  /* ---------- Icon library ---------- */
  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M20 18v3H6.5A2.5 2.5 0 0 1 4 18.5"/>',
    map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="2.5"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.3M21 20c0-2.4-1.4-4.3-3.5-5.1"/>',
    cap: '<path d="m12 4 10 5-10 5L2 9l10-5Z"/><path d="M6 11v5c0 1.3 2.7 3 6 3s6-1.7 6-3v-5"/><path d="M22 9v6"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    quote: '<path d="M9 7c-3 0-5 2-5 5s2 4 4 4 3-1.5 3-3.5S13 8 9 7Zm11 0c-3 0-5 2-5 5s2 4 4 4 3-1.5 3-3.5S24 8 20 7Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.8 21h10.4a2 2 0 0 0 1.8-3.5L14 9V3"/><path d="M7.5 15h9"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3Z"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    globe2: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><ellipse cx="12" cy="12" rx="4" ry="9"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z"/><path d="M8.5 8.5h7M8.5 11.5h4"/>',
    send: '<path d="M4 12 20 4l-6 16-3-7-7-1Z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    phone: '<path d="M4 5.5C4 4 5 3 6.5 3H8l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v1.5c0 1.5-1 2.5-2.5 2.5A15.5 15.5 0 0 1 4 5.5Z"/>',
    pin: '<path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    star: '<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    heart: '<path d="M12 20s-7-4.7-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.3-7 10-7 10Z"/>',
    shield: '<path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
    leaf: '<path d="M4 20c0-8 6-14 16-14 0 10-6 14-13 14-1.5 0-3-.5-3-.5Z"/><path d="M9 15c2-2.5 5-4 8-5"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2.5"/><path d="M4 11h16M8 4v7M16 4v7"/><circle cx="8" cy="19" r="1.6"/><circle cx="16" cy="19" r="1.6"/>',
    trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 15h6l1 5H8z"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none"/>',
    download: '<path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>',
    plane: '<path d="M10 3.5 5 12l-3 .5L4 16l4 1 1 4 3.5-3L21 13a1.5 1.5 0 0 0-.3-2.8L14 8.5l-4-5Z"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    lang: '<path d="M4 5h9M9 3v2c0 4-2 7-6 9M6 8c0 3 3 5 7 6"/><path d="m13 20 4-9 4 9M14.5 16.5h5"/>',
  };
  function ic(name, cls = "") {
    const p = ICONS[name] || ICONS.spark;
    return `<svg class="${cls}" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }
  window.aeIcon = ic;

  /* ---------- Brand lockup ---------- */
  function brandLockup(cls = "") {
    return `<span class="brand-badge"><img src="${IMG}/brand/aethris_international_school-monogram-primary.png" alt="Aethris crest"></span>
      <span class="brand-txt"><b>AETHRIS</b><small>International School</small></span>`;
  }

  /* ---------- Navigation model ---------- */
  const NAV = [
    { label: "About", href: "about.html", page: "about" },
    { label: "Academics", href: "academics.html", page: "academics", mega: "academics" },
    { label: "Campus", href: "campus.html", page: "campus", mega: "campus" },
    { label: "Student Life", href: "student-life.html", page: "student-life" },
    { label: "Faculty", href: "faculty.html", page: "faculty" },
    { label: "Admissions", href: "admissions.html", page: "admissions" },
    { label: "More", href: "#", page: "more", mega: "more" },
  ];

  const MEGA = {
    academics: {
      cols: [
        { title: "Curricula", links: [
          { icon: "book", label: "American Diploma", desc: "AP · SAT · GPA", href: "academics.html#american" },
          { icon: "book", label: "British Curriculum", desc: "IGCSE · A-Level", href: "academics.html#british" },
          { icon: "globe", label: "International Baccalaureate", desc: "PYP · MYP · DP", href: "academics.html#ib" },
        ]},
        { title: "Signature Tracks", links: [
          { icon: "chip", label: "AI & Robotics", desc: "Future lab", href: "academics.html#ai" },
          { icon: "flask", label: "STEM Excellence", desc: "Research & discovery", href: "academics.html#stem" },
          { icon: "plane", label: "Aviation & Aerospace", desc: "Elite program", href: "academics.html#aviation" },
        ]},
      ],
      feature: { img: "academics/stem-program.png", chip: "Interactive", title: "Find Your Best-Fit Program", desc: "A 60-second quiz that matches your child to the perfect Aethris pathway.", cta: "Take the quiz", href: "academics.html#finder" },
    },
    campus: {
      cols: [
        { title: "Explore", links: [
          { icon: "map", label: "Interactive Campus Map", desc: "Tap every facility", href: "campus.html#map" },
          { icon: "play", label: "Drone Tour", desc: "See it from above", href: "campus.html#tour" },
          { icon: "flask", label: "Innovation Center", desc: "AI · maker · incubator", href: "campus.html#innovation" },
        ]},
        { title: "Care & Safety", links: [
          { icon: "shield", label: "Safety & Security", desc: "24/7 protected", href: "campus.html#safety" },
          { icon: "bus", label: "Transportation", desc: "GPS-tracked fleet", href: "campus.html#transport" },
          { icon: "leaf", label: "Sustainability", desc: "A greener campus", href: "campus.html#sustainability" },
        ]},
      ],
      feature: { img: "campus/evening-campus.png", chip: "42 Acres", title: "A Campus Built for Wonder", desc: "Cinematic architecture, world-class labs and gardens that inspire.", cta: "Take the tour", href: "campus.html" },
    },
    more: {
      cols: [
        { title: "Discover", links: [
          { icon: "calendar", label: "Events", desc: "What's on at Aethris", href: "events.html" },
          { icon: "image", label: "Gallery", desc: "Photos & video", href: "gallery.html" },
          { icon: "quote", label: "Success Stories", desc: "Voices of our community", href: "testimonials.html" },
        ]},
        { title: "Connect", links: [
          { icon: "grid", label: "Family Portal", desc: "Dashboards demo", href: "portal.html" },
          { icon: "mail", label: "Contact", desc: "Reach our team", href: "contact.html" },
          { icon: "download", label: "Prospectus", desc: "Download the brochure", href: "admissions.html#prospectus" },
        ]},
      ],
      feature: { img: "students/happy-students.png", chip: "Join Us", title: "Begin Your Aethris Journey", desc: "Apply, book a tour or speak with our admissions concierge today.", cta: "Apply now", href: "admissions.html#apply" },
    },
  };

  function megaHTML(key) {
    const m = MEGA[key];
    const cols = m.cols.map(c => `
      <div class="mega-col">
        <h5>${c.title}</h5>
        <ul>${c.links.map(l => `
          <li><a class="mega-link" href="${l.href}">
            <span class="mi">${ic(l.icon)}</span>
            <span><b>${l.label}</b><span>${l.desc}</span></span>
          </a></li>`).join("")}
        </ul>
      </div>`).join("");
    const f = m.feature;
    return `<div class="mega"><div class="mega-inner">
      ${cols}
      <a class="mega-feature" href="${f.href}">
        <img src="${IMG}/${f.img}" alt="${f.title}" loading="lazy">
        <div class="mf-body"><span class="chip solid">${f.chip}</span><h4>${f.title}</h4><p>${f.desc}</p><span class="link-arrow">${f.cta} ${ic("arrow")}</span></div>
      </a>
    </div>`;
  }

  /* ---------- Render Navbar ---------- */
  function renderNav() {
    const active = document.body.dataset.page || "";
    const links = NAV.map(n => {
      const isActive = n.page === active ? " active" : "";
      const cls = n.mega ? "has-mega" : "";
      const caret = n.mega ? `<span class="caret"></span>` : "";
      return `<li class="${cls}${isActive}">
        <a href="${n.href}">${n.label}${caret}</a>
        ${n.mega ? megaHTML(n.mega) : ""}
      </li>`;
    }).join("");

    const html = `
    <div class="scroll-progress" id="scrollProgress"></div>
    <div class="topbar">
      <div class="container">
        <div class="tb-links">
          <span>${ic("phone")} ${A.meta.phone}</span>
          <span>${ic("mail")} ${A.meta.email}</span>
        </div>
        <div class="tb-links">
          <span>${ic("bell")} Autumn Open House · Sept 27 — <a href="events.html">Register free</a></span>
          <a href="portal.html">Family Portal ${ic("arrow")}</a>
        </div>
      </div>
    </div>
    <nav class="nav" id="nav" aria-label="Primary">
      <div class="container wide">
        <div class="nav-inner">
          <a class="brand" href="index.html" aria-label="Aethris International School home">${brandLockup()}</a>
          <ul class="nav-links">${links}</ul>
          <div class="nav-actions">
            <button class="icon-btn desk-only" id="searchBtn" aria-label="Search" title="Search (Ctrl K)">${ic("search")}</button>
            <div class="lang-wrap desk-only">
              <button class="icon-btn" id="langBtn" aria-label="Language">${ic("lang")}</button>
              <div class="lang-menu" id="langMenu" role="menu"></div>
            </div>
            <button class="icon-btn" id="themeBtn" aria-label="Toggle theme">${ic("moon")}</button>
            <a class="btn sm desk-only" href="admissions.html#apply">Apply Now ${ic("arrow","arrow")}</a>
            <button class="icon-btn nav-toggle" id="navToggle" aria-label="Open menu">${ic("menu")}</button>
          </div>
        </div>
      </div>
    </nav>
    ${mobileDrawerHTML(active)}`;

    const mount = $("#site-nav");
    if (mount) mount.innerHTML = html;
  }

  function mobileDrawerHTML(active) {
    const links = [{ label: "Home", href: "index.html", page: "home" }, ...NAV.filter(n => n.page !== "more"),
      { label: "Events", href: "events.html" }, { label: "Gallery", href: "gallery.html" },
      { label: "Success Stories", href: "testimonials.html" }, { label: "Portal", href: "portal.html" },
      { label: "Contact", href: "contact.html" }];
    return `
    <div class="mobile-drawer" id="mobileDrawer">
      <div class="md-scrim" data-close-drawer></div>
      <div class="md-panel">
        <div class="md-head">
          <span class="brand">${brandLockup()}</span>
          <button class="icon-btn" data-close-drawer aria-label="Close menu">${ic("x")}</button>
        </div>
        ${links.map(l => `<a class="md-link" href="${l.href}">${l.label} ${ic("arrow","arrow")}</a>`).join("")}
        <div class="md-cta">
          <a class="btn block" href="admissions.html#apply">Apply Now</a>
          <a class="btn ghost block" href="admissions.html#tour">Book a Tour</a>
        </div>
      </div>
    </div>`;
  }

  /* ---------- Render Footer ---------- */
  function renderFooter() {
    const cols = [
      { h: "Explore", links: [["About", "about.html"], ["Academics", "academics.html"], ["Campus", "campus.html"], ["Student Life", "student-life.html"], ["Faculty", "faculty.html"]] },
      { h: "Admissions", links: [["Apply Now", "admissions.html#apply"], ["Book a Tour", "admissions.html#tour"], ["Fee Estimator", "admissions.html#calculator"], ["Scholarships", "admissions.html"], ["Prospectus", "admissions.html#prospectus"]] },
      { h: "Community", links: [["Events", "events.html"], ["Gallery", "gallery.html"], ["Success Stories", "testimonials.html"], ["Family Portal", "portal.html"], ["Contact", "contact.html"]] },
    ];
    const socials = ["instagram", "linkedin", "youtube", "facebook", "x"];
    const socialSvg = {
      instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
      linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4"/>',
      youtube: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none"/>',
      facebook: '<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8Z"/>',
      x: '<path d="M4 4l16 16M20 4 4 20"/>',
    };
    const html = `
    <div class="container">
      <div class="foot-cta" data-reveal>
        <span class="chip solid" style="margin-bottom:18px">Begin Your Journey</span>
        <h2 style="max-width:16ch;margin-inline:auto">Your child's <span class="gold-text">extraordinary future</span> starts here.</h2>
        <p class="lede" style="max-width:52ch;margin:18px auto 30px">Join a global community of curious minds, inspiring educators and future leaders. Admissions for 2026–27 are now open.</p>
        <div class="flex gap items-center" style="justify-content:center;flex-wrap:wrap">
          <a class="btn lg" href="admissions.html#apply">Apply Now ${ic("arrow","arrow")}</a>
          <a class="btn ghost lg" href="admissions.html#tour">Book a Private Tour</a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="foot-main">
        <div class="foot-brand">
          <a class="brand" href="index.html" style="margin-bottom:20px">${brandLockup()}</a>
          <p>Where global ambition meets academic excellence. A world-class international education designed for the leaders, innovators and changemakers of tomorrow.</p>
          <div class="foot-social">
            ${socials.map(s => `<a href="#" data-demo="Follow Aethris on ${s.charAt(0).toUpperCase()+s.slice(1)} (demo)" aria-label="${s}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${socialSvg[s]}</svg></a>`).join("")}
          </div>
        </div>
        ${cols.map(c => `<div class="foot-col"><h5>${c.h}</h5><ul>${c.links.map(l => `<li><a href="${l[1]}">${l[0]}</a></li>`).join("")}</ul></div>`).join("")}
      </div>
      <div class="foot-bottom">
        <div class="foot-badges">
          <img src="${IMG}/brand/seal.png" alt="Aethris accreditation seal" title="Accredited Institution">
          <span>© ${new Date().getFullYear()} Aethris International School · New Cairo, Egypt</span>
        </div>
        <div class="flex gap items-center">
          <a href="#" data-demo="Privacy Policy (demo)">Privacy</a><a href="#" data-demo="Terms of Use (demo)">Terms</a><a href="#" data-demo="Safeguarding Policy (demo)">Safeguarding</a>
        </div>
      </div>
    </div>`;
    const mount = $("#site-footer");
    if (mount) mount.innerHTML = html;
  }

  /* ---------- Sticky CTA + Concierge ---------- */
  function renderFloating() {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="sticky-cta" id="stickyCta">
        <button class="fab concierge-fab" id="conciergeOpen" aria-label="Open admissions assistant">${ic("chat")}</button>
        <a class="fab" href="admissions.html#apply"><span class="lbl">Apply Now</span> ${ic("arrow","arrow")}</a>
      </div>
      <aside class="concierge" id="concierge" aria-label="Admissions concierge" role="dialog">
        <div class="concierge-head">
          <span class="ava">${ic("spark")}</span>
          <div><b>Aria</b><small>Admissions Concierge · Online</small></div>
          <button class="icon-btn close" id="conciergeClose" aria-label="Close">${ic("x")}</button>
        </div>
        <div class="concierge-body" id="conciergeBody"></div>
        <div class="quick-chips" id="quickChips"></div>
        <form class="concierge-input" id="conciergeForm">
          <input type="text" id="conciergeInput" placeholder="Ask about admissions, fees, tours…" autocomplete="off" aria-label="Message">
          <button type="submit" aria-label="Send">${ic("send")}</button>
        </form>
      </aside>`;
    document.body.appendChild(wrap);
    initConcierge();
  }

  /* ---------- Concierge logic ---------- */
  function initConcierge() {
    const panel = $("#concierge"), body = $("#conciergeBody"), form = $("#conciergeForm"),
      input = $("#conciergeInput"), chips = $("#quickChips");
    let greeted = false;
    const chipList = ["Admissions", "Curriculum", "Fees", "Book a tour", "Transport"];
    chips.innerHTML = chipList.map(c => `<button type="button">${c}</button>`).join("");

    function addMsg(text, who) {
      const el = document.createElement("div");
      el.className = "msg " + who;
      el.innerHTML = text;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      return el;
    }
    function botReply(q) {
      const typing = addMsg('<span class="typing"><span></span><span></span><span></span></span>', "bot");
      const ql = q.toLowerCase();
      let ans = null;
      for (const item of A.kb) { if (item.keys.some(k => ql.includes(k))) { ans = item.a; break; } }
      if (!ans) ans = "That's a wonderful question. Our admissions team can give you a personal answer — reach us at <b>admissions@aethris.edu</b> or start on the <a href='admissions.html'>Admissions page</a>. Meanwhile, ask me about admissions, curricula, fees, tours or transport.";
      setTimeout(() => { typing.remove(); addMsg(ans, "bot"); }, 620);
    }
    function open() {
      panel.classList.add("open");
      $("#stickyCta").style.opacity = "0";
      $("#stickyCta").style.pointerEvents = "none";
      if (!greeted) { greeted = true; setTimeout(() => botReply("hello"), 300); }
      setTimeout(() => input.focus(), 350);
    }
    function close() { panel.classList.remove("open"); $("#stickyCta").style.opacity = "1"; $("#stickyCta").style.pointerEvents = "auto"; }
    $("#conciergeOpen").addEventListener("click", open);
    $("#conciergeClose").addEventListener("click", close);
    form.addEventListener("submit", e => { e.preventDefault(); const v = input.value.trim(); if (!v) return; addMsg(v, "user"); input.value = ""; botReply(v); });
    chips.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; addMsg(b.textContent, "user"); botReply(b.textContent); });
  }

  /* ---------- Command Palette ---------- */
  function renderPalette() {
    const idx = window.SEARCH_INDEX || [];
    const el = document.createElement("div");
    el.className = "palette-scrim";
    el.id = "paletteScrim";
    el.innerHTML = `
      <div class="palette" role="dialog" aria-label="Search">
        <div class="palette-search">
          ${ic("search")}
          <input type="text" id="paletteInput" placeholder="Search pages, programs, actions…" aria-label="Search">
          <kbd>ESC</kbd>
        </div>
        <div class="palette-results" id="paletteResults"></div>
      </div>`;
    document.body.appendChild(el);
    const input = $("#paletteInput"), results = $("#paletteResults");
    let items = [], sel = 0;

    function render(q = "") {
      const ql = q.toLowerCase();
      const filtered = idx.filter(i => !ql || (i.title + i.desc + i.group).toLowerCase().includes(ql));
      items = filtered; sel = 0;
      if (!filtered.length) { results.innerHTML = `<div class="palette-group-label">No results for "${q}"</div>`; return; }
      const groups = {};
      filtered.forEach(i => { (groups[i.group] = groups[i.group] || []).push(i); });
      let html = "", n = 0;
      for (const g in groups) {
        html += `<div class="palette-group-label">${g}</div>`;
        groups[g].forEach(i => {
          html += `<a class="palette-item${n === 0 ? " active" : ""}" href="${i.href}" data-i="${n}">
            <span class="pi-ico">${ic(i.icon)}</span>
            <span><b>${i.title}</b><span>${i.desc}</span></span>
            <span class="pi-go">${ic("arrow")}</span></a>`;
          n++;
        });
      }
      results.innerHTML = html;
    }
    function open() { el.classList.add("open"); render(""); setTimeout(() => input.focus(), 50); }
    function close() { el.classList.remove("open"); input.value = ""; }
    function move(d) { const nodes = $$(".palette-item", results); if (!nodes.length) return; nodes[sel]?.classList.remove("active"); sel = (sel + d + nodes.length) % nodes.length; nodes[sel].classList.add("active"); nodes[sel].scrollIntoView({ block: "nearest" }); }

    input.addEventListener("input", () => render(input.value));
    el.addEventListener("click", e => { if (e.target === el) close(); });
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); el.classList.contains("open") ? close() : open(); }
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      if (e.key === "Enter") { e.preventDefault(); const node = $$(".palette-item", results)[sel]; if (node) window.location.href = node.getAttribute("href"); }
    });
    window.aeOpenPalette = open;
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    const KEY = "aethris-theme";
    const saved = localStorage.getItem(KEY) || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    const btn = $("#themeBtn");
    if (btn) {
      btn.innerHTML = ic(saved === "dark" ? "moon" : "sun");
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme");
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(KEY, next);
        btn.innerHTML = ic(next === "dark" ? "moon" : "sun");
      });
    }
  }

  /* ---------- Language switcher (UX concept) ---------- */
  function initLang() {
    const btn = $("#langBtn"), menu = $("#langMenu");
    if (!btn || !menu) return;
    const langs = [["en", "🇬🇧", "English"], ["ar", "🇪🇬", "العربية"], ["fr", "🇫🇷", "Français"], ["es", "🇪🇸", "Español"]];
    const cur = localStorage.getItem("aethris-lang") || "en";
    menu.innerHTML = langs.map(l => `<button data-lang="${l[0]}" class="${l[0] === cur ? "active" : ""}"><span class="flag">${l[1]}</span> ${l[2]}</button>`).join("");
    btn.addEventListener("click", e => { e.stopPropagation(); menu.classList.toggle("open"); });
    document.addEventListener("click", () => menu.classList.remove("open"));
    menu.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      const lang = b.dataset.lang;
      $$("button", menu).forEach(x => x.classList.remove("active")); b.classList.add("active");
      if (window.aeI18n) window.aeI18n.apply(lang);
      window.aeToast(`Language set to ${b.textContent.trim()}`, "check");
      menu.classList.remove("open");
    });
  }

  /* ---------- Scroll effects ---------- */
  function initScroll() {
    const nav = $("#nav"), prog = $("#scrollProgress");
    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 30);
      if (prog) { const h = document.documentElement.scrollHeight - window.innerHeight; prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%"; }
      const sticky = $("#stickyCta");
      if (sticky) sticky.classList.toggle("show", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Reveal on scroll ---------- */
  let revealIO;
  function initReveal() {
    const els = $$("[data-reveal]:not(.reveal-bound)");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    if (!revealIO) revealIO = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    els.forEach(e => { e.classList.add("reveal-bound"); revealIO.observe(e); });
  }

  /* ---------- Counters ---------- */
  function initCounters() {
    const els = $$("[data-count]:not(.count-bound)");
    els.forEach(e => e.classList.add("count-bound"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target, target = parseFloat(el.dataset.count), dec = (el.dataset.count.includes(".") ? 1 : 0);
        const dur = 1600, start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * e).toFixed(dec).replace(/\.0$/, "");
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(dec).replace(/\.0$/, "");
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Parallax ---------- */
  function initParallax() {
    const els = $$("[data-parallax]");
    if (!els.length) return;
    let raf;
    window.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        els.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          const r = el.getBoundingClientRect();
          const offset = (r.top + r.height / 2 - vh / 2) * -speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
        raf = null;
      });
    }, { passive: true });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    $$("[data-magnetic]:not(.mag-bound)").forEach(el => {
      el.classList.add("mag-bound");
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Mobile drawer ---------- */
  function initDrawer() {
    const drawer = $("#mobileDrawer"), toggle = $("#navToggle");
    if (!drawer || !toggle) return;
    const open = () => { drawer.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { drawer.classList.remove("open"); document.body.style.overflow = ""; };
    toggle.addEventListener("click", open);
    $$("[data-close-drawer], .md-link", drawer).forEach(el => el.addEventListener("click", close));
  }

  /* ---------- Global Lightbox ---------- */
  function initLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox"; lb.id = "lightbox";
    lb.innerHTML = `<button class="lb-close" aria-label="Close">${ic("x")}</button>
      <button class="lb-nav prev" aria-label="Previous">${ic("arrow")}</button>
      <img alt=""><button class="lb-nav next" aria-label="Next">${ic("arrow")}</button>
      <div class="lb-cap"></div>`;
    document.body.appendChild(lb);
    const img = $("img", lb), cap = $(".lb-cap", lb);
    let group = [], idx = 0;
    function show(i) { idx = (i + group.length) % group.length; const it = group[idx]; img.src = it.src; img.alt = it.cap || ""; cap.textContent = it.cap || ""; }
    function open(items, i) { group = items; lb.classList.add("open"); document.body.style.overflow = "hidden"; show(i); }
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-nav.prev", lb).style.transform = "translateY(-50%) rotate(180deg)";
    $(".lb-nav.prev", lb).addEventListener("click", () => show(idx - 1));
    $(".lb-nav.next", lb).addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "ArrowRight") show(idx + 1); });

    document.addEventListener("click", e => {
      const trigger = e.target.closest("[data-lightbox]");
      if (!trigger) return;
      e.preventDefault();
      const gname = trigger.dataset.lightbox;
      const nodes = $$(`[data-lightbox="${gname}"]`);
      const items = nodes.map(n => ({ src: n.dataset.full || n.querySelector("img")?.src || n.src, cap: n.dataset.cap || "" }));
      open(items, nodes.indexOf(trigger));
    });
    window.aeLightbox = open;
  }

  /* ---------- Toast ---------- */
  function initToast() {
    let wrap = $(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
    window.aeToast = (msg, icon = "check") => {
      const t = document.createElement("div");
      t.className = "toast";
      t.innerHTML = `<span class="tc">${ic(icon)}</span> ${msg}`;
      wrap.appendChild(t);
      setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(10px)"; setTimeout(() => t.remove(), 400); }, 3200);
    };
  }

  /* ---------- FAQ accordion (delegated) ---------- */
  function initAccordion() {
    document.addEventListener("click", e => {
      const q = e.target.closest(".faq-q");
      if (!q) return;
      const item = q.closest(".faq-item");
      const open = item.classList.contains("open");
      $$(".faq-item.open", item.parentElement).forEach(i => { if (i !== item) i.classList.remove("open"); });
      item.classList.toggle("open", !open);
    });
  }

  /* ---------- Tabs (delegated, [data-tab-group]) ---------- */
  function initTabs() {
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-tab]");
      if (!btn) return;
      const group = btn.closest("[data-tab-group]");
      if (!group) return;
      const key = btn.dataset.tab;
      $$("[data-tab]", group).forEach(b => b.classList.toggle("active", b === btn));
      $$("[data-panel]", group).forEach(p => p.classList.toggle("active", p.dataset.panel === key));
    });
  }

  /* ---------- Form helper (validation + localStorage) ---------- */
  window.aeForm = function (formSel, storeKey, onDone) {
    const form = typeof formSel === "string" ? $(formSel) : formSel;
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      $$("[required]", form).forEach(input => {
        const field = input.closest(".field");
        const valid = input.type === "email" ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value) : input.value.trim() !== "";
        if (field) field.classList.toggle("error", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { window.aeToast("Please complete the required fields", "info"); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      data._ts = new Date().toISOString();
      if (storeKey) {
        const arr = JSON.parse(localStorage.getItem(storeKey) || "[]");
        arr.push(data); localStorage.setItem(storeKey, JSON.stringify(arr));
      }
      if (onDone) onDone(data, form);
    });
    $$("[required]", form).forEach(input => input.addEventListener("input", () => input.closest(".field")?.classList.remove("error")));
  };

  /* ---------- Video autoplay + slow-motion (feels longer & more cinematic) ---------- */
  function initVideos() {
    $$("video[autoplay]:not(.vid-bound)").forEach(v => {
      v.classList.add("vid-bound");
      v.muted = true; v.setAttribute("playsinline", "");
      const rate = parseFloat(v.dataset.rate) || 0.6;
      const setRate = () => { try { v.playbackRate = rate; } catch (e) {} };
      setRate();
      v.addEventListener("loadedmetadata", setRate);
      v.addEventListener("play", setRate);
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    });
  }

  /* ---------- Drag-to-scroll for horizontal tracks (desktop) ---------- */
  function initDragScroll() {
    $$(".pathway-track, [data-drag-scroll]").forEach(el => {
      if (el.classList.contains("drag-bound")) return;
      el.classList.add("drag-bound", "drag-scroll");
      let down = false, startX, startLeft, moved = false;
      el.addEventListener("pointerdown", e => {
        if (e.pointerType === "touch") return; // native touch scroll
        down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft;
        el.classList.add("dragging");
      });
      window.addEventListener("pointermove", e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        el.scrollLeft = startLeft - dx;
      });
      window.addEventListener("pointerup", () => { down = false; el.classList.remove("dragging"); });
      // prevent click navigation right after a drag
      el.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
      // vertical wheel → horizontal scroll
      el.addEventListener("wheel", e => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { el.scrollLeft += e.deltaY; e.preventDefault(); }
      }, { passive: false });
    });
  }

  /* ---------- Year fill ---------- */
  function fillYear() { $$("[data-year]").forEach(e => e.textContent = new Date().getFullYear()); }

  /* ---------- Inline icon placeholders <i data-ic="arrow"> ---------- */
  function fillIcons() { $$("i[data-ic]:not(.ic-bound)").forEach(e => { e.classList.add("ic-bound"); e.innerHTML = ic(e.dataset.ic); }); }

  /* ---------- Init ---------- */
  function init() {
    renderNav();
    renderFooter();
    renderFloating();
    renderPalette();
    initToast();
    initTheme();
    initLang();
    initScroll();
    initReveal();
    initCounters();
    initParallax();
    initMagnetic();
    initDrawer();
    initLightbox();
    initAccordion();
    initTabs();
    initVideos();
    initDragScroll();
    initDemoLinks();
    fillYear();
    fillIcons();
    const sb = $("#searchBtn"); if (sb) sb.addEventListener("click", () => window.aeOpenPalette());
    document.dispatchEvent(new CustomEvent("aethris:ready"));
  }

  /* ---------- Demo / placeholder links give feedback instead of doing nothing ---------- */
  function initDemoLinks() {
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href="#"], a[href=""], a[data-demo]');
      if (!a) return;
      e.preventDefault();
      if (a.dataset.demo) window.aeToast(a.dataset.demo, "info");
    });
  }

  /* Re-scan after dynamic content is injected */
  window.aeRefresh = function () { initReveal(); initCounters(); initParallax(); initMagnetic(); initVideos(); initDragScroll(); fillIcons(); if (window.aeI18n) window.aeI18n.refresh(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
