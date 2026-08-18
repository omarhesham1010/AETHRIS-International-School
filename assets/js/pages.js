/* =============================================================
   AETHRIS — Page Interactions
   Finder quiz · Wizard · Calculator · Filters · Events · Portal
   ============================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const A = window.AETHRIS;
  const ic = window.aeIcon;

  /* ---------- Generic modal system ---------- */
  function initModals() {
    function open(id) { const m = document.getElementById(id); if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; } }
    function close(m) { m.classList.remove("open"); document.body.style.overflow = ""; }
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-modal-open]");
      if (t) { e.preventDefault(); open(t.dataset.modalOpen); }
      const c = e.target.closest("[data-modal-close]");
      if (c) { const m = c.closest(".modal-scrim"); if (m) close(m); }
      if (e.target.classList && e.target.classList.contains("modal-scrim")) close(e.target);
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") $$(".modal-scrim.open").forEach(close); });
    window.aeModal = { open, close };
  }

  /* ---------- Program filter (Academics) ---------- */
  function initProgramFilter() {
    const grid = $("#programGrid");
    if (!grid) return;
    const bar = $("#programFilter");
    bar?.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", bar).forEach(x => x.classList.remove("active")); b.classList.add("active");
      const cat = b.dataset.cat;
      $$(".program-card", grid).forEach(card => {
        const show = cat === "all" || card.dataset.cat === cat;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* ---------- Program Finder Quiz ---------- */
  function initFinder() {
    const root = $("#finderRoot");
    if (!root) return;
    const steps = [
      { q: "How old is your child?", key: "age", opts: [
        { icon: "heart", label: "3 – 6 years", desc: "Early Years", val: "3-6" },
        { icon: "book", label: "7 – 10 years", desc: "Elementary", val: "7-10" },
        { icon: "users", label: "11 – 14 years", desc: "Middle School", val: "11-14" },
        { icon: "cap", label: "15 – 18 years", desc: "High School", val: "15-18" },
      ]},
      { q: "Which learning style feels right?", key: "style", opts: [
        { icon: "globe", label: "Global & inquiry-led", desc: "Broad, world-minded", val: "global" },
        { icon: "shield", label: "Structured & rigorous", desc: "Clear standards", val: "rigorous" },
        { icon: "spark", label: "Flexible & creative", desc: "Room to explore", val: "flexible" },
        { icon: "chip", label: "Innovation-driven", desc: "Tech & building", val: "innovation" },
      ]},
      { q: "What lights your child up most?", key: "interest", opts: [
        { icon: "flask", label: "Science & Technology", desc: "STEM, AI, robotics", val: "stem" },
        { icon: "quote", label: "Arts & Expression", desc: "Art, music, design", val: "arts" },
        { icon: "trophy", label: "Sports & Movement", desc: "Athletics", val: "sports" },
        { icon: "spark", label: "Business & Leading", desc: "Ideas & ventures", val: "business" },
      ]},
      { q: "Where do you picture their future?", key: "future", opts: [
        { icon: "cap", label: "US Universities", desc: "American pathway", val: "us" },
        { icon: "book", label: "UK & Europe", desc: "British / IB", val: "uk" },
        { icon: "globe", label: "Anywhere in the world", desc: "Global citizen", val: "global" },
        { icon: "chip", label: "Tech & Innovation", desc: "Future industries", val: "innovation" },
      ]},
    ];
    const answers = {};
    let cur = 0;

    const prog = $("#finderProgress"), stepsWrap = $("#finderSteps"), result = $("#finderResult");
    prog.innerHTML = steps.map((_, i) => `<div class="fp" data-fp="${i}"></div>`).join("");
    stepsWrap.innerHTML = steps.map((s, i) => `
      <div class="finder-step ${i === 0 ? "active" : ""}" data-step="${i}">
        <span class="eyebrow">Step ${i + 1} of ${steps.length}</span>
        <h3>${s.q}</h3>
        <div class="finder-options">
          ${s.opts.map(o => `<button class="finder-opt" data-val="${o.val}">
            <span class="fo-ico">${ic(o.icon)}</span><span><b>${o.label}</b><span>${o.desc}</span></span>
          </button>`).join("")}
        </div>
        <div class="finder-nav">
          <button class="btn ghost sm ${i === 0 ? "hidden" : ""}" data-finder-back>${ic("arrow")} Back</button>
          <span></span>
        </div>
      </div>`).join("");

    function updateProgress() { $$(".fp", prog).forEach((f, i) => f.classList.toggle("done", i <= cur - 1 || (i === cur && answers[steps[i].key]))); }
    function goto(i) {
      cur = i;
      $$(".finder-step", stepsWrap).forEach(s => s.classList.toggle("active", +s.dataset.step === i));
      updateProgress();
    }
    stepsWrap.addEventListener("click", e => {
      const opt = e.target.closest(".finder-opt");
      if (opt) {
        const step = opt.closest(".finder-step");
        $$(".finder-opt", step).forEach(o => o.classList.remove("sel"));
        opt.classList.add("sel");
        answers[steps[cur].key] = opt.dataset.val;
        updateProgress();
        setTimeout(() => { cur < steps.length - 1 ? goto(cur + 1) : showResult(); }, 340);
      }
      if (e.target.closest("[data-finder-back]")) goto(Math.max(0, cur - 1));
    });

    function showResult() {
      const wanted = [answers.style, answers.interest, answers.future].filter(Boolean);
      let best = A.programs[0], bestScore = -1;
      A.programs.forEach(p => {
        let score = p.fit.reduce((s, f) => s + (wanted.includes(f) ? 1 : 0), 0);
        if (answers.interest === "stem" && ["stem", "ai", "aviation"].includes(p.id)) score += 1;
        if (answers.interest === "arts" && ["arts", "languages"].includes(p.id)) score += 1;
        if (answers.interest === "sports" && p.id === "sports") score += 2;
        if (answers.interest === "business" && p.id === "entrepreneurship") score += 2;
        if (answers.future === "us" && p.id === "american") score += 1.5;
        if (answers.future === "uk" && p.id === "british") score += 1.5;
        if (answers.future === "global" && p.id === "ib") score += 1.5;
        if (score > bestScore) { bestScore = score; best = p; }
      });
      $$(".finder-step", stepsWrap).forEach(s => s.classList.remove("active"));
      prog.style.opacity = "0.4";
      result.classList.add("active");
      result.innerHTML = `
        <span class="chip solid" style="margin-bottom:14px">Your Best-Fit Match</span>
        <h3>${best.name}</h3>
        <div class="fr-img"><img src="Images/${best.img}" alt="${best.name}"></div>
        <p class="lede" style="max-width:52ch;margin-inline:auto">${best.short}</p>
        <div class="flex gap-sm wrap" style="justify-content:center;margin:22px 0">
          ${best.focus.map(f => `<span class="chip neutral">${f}</span>`).join("")}
        </div>
        <div class="flex gap items-center" style="justify-content:center;flex-wrap:wrap">
          <a class="btn" href="academics.html#${best.id}">Explore ${best.name} ${ic("arrow","arrow")}</a>
          <button class="btn ghost" id="finderRestart">Retake quiz</button>
        </div>`;
      $("#finderRestart").addEventListener("click", () => {
        Object.keys(answers).forEach(k => delete answers[k]);
        result.classList.remove("active"); result.innerHTML = "";
        prog.style.opacity = "1";
        $$(".finder-opt", stepsWrap).forEach(o => o.classList.remove("sel"));
        $$(".fp", prog).forEach(f => f.classList.remove("done"));
        goto(0);
      });
      window.aeToast(`We found your match: ${best.name}`, "spark");
    }
  }

  /* ---------- Admissions Wizard + Tracker ---------- */
  function initWizard() {
    const wiz = $("#wizard");
    if (!wiz) return;
    const steps = $$(".wizard-step", wiz);
    const trackerSteps = $$(".tracker .tr-step", wiz);
    const fill = $(".tracker .tr-fill", wiz);
    let cur = 0;
    const state = { grade: null, program: null };

    function render() {
      steps.forEach((s, i) => s.classList.toggle("active", i === cur));
      trackerSteps.forEach((t, i) => { t.classList.toggle("active", i === cur); t.classList.toggle("done", i < cur); });
      if (fill) fill.style.width = (cur / (trackerSteps.length - 1)) * 88 + "%";
      wiz.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    wiz.addEventListener("click", e => {
      if (e.target.closest("[data-wiz-next]")) {
        if (cur === 0 && !state.grade) { window.aeToast("Please select a grade level", "info"); return; }
        if (cur === 1 && !state.program) { window.aeToast("Please choose a program", "info"); return; }
        if (cur < steps.length - 1) { cur++; render(); }
      }
      if (e.target.closest("[data-wiz-back]")) { if (cur > 0) { cur--; render(); } }
      const g = e.target.closest(".grade-opt");
      if (g) { $$(".grade-opt", wiz).forEach(x => x.classList.remove("sel")); g.classList.add("sel"); state.grade = g.dataset.grade; }
      const p = e.target.closest("[data-prog]");
      if (p) { $$("[data-prog]", wiz).forEach(x => x.classList.remove("sel")); p.classList.add("sel"); state.program = p.dataset.prog; }
    });

    // final submit
    const form = $("#wizardForm");
    if (form) {
      window.aeForm(form, "aethris_applications", (data, f) => {
        data.grade = state.grade; data.program = state.program;
        const store = JSON.parse(localStorage.getItem("aethris_applications") || "[]");
        store[store.length - 1] = data; localStorage.setItem("aethris_applications", JSON.stringify(store));
        cur = steps.length - 1; render();
        $("#wizardConfirm").innerHTML = successBlock("Application Received",
          `Thank you, <b>${data.parentName || "valued parent"}</b>. Your application for <b>${state.grade || "your child"}</b> — <b>${state.program || "our programs"}</b> has been received. Our admissions concierge will contact you within one business day.`,
          `Reference: <b>AIS-${Date.now().toString().slice(-6)}</b>`);
      });
    }
  }

  function successBlock(title, msg, extra = "") {
    return `<div class="form-success">
      <div class="check">${ic("check")}</div>
      <h3>${title}</h3>
      <p class="lede" style="margin:12px auto 8px;max-width:46ch">${msg}</p>
      ${extra ? `<p class="muted" style="font-size:.85rem">${extra}</p>` : ""}
      <div class="flex gap items-center" style="justify-content:center;margin-top:22px">
        <a class="btn" href="index.html">Back to Home</a>
        <a class="btn ghost" href="portal.html">View Family Portal</a>
      </div>
    </div>`;
  }
  window.aeSuccessBlock = successBlock;

  /* ---------- Fee Calculator ---------- */
  function initCalculator() {
    const calc = $("#calc");
    if (!calc) return;
    const base = { "Early Years": 8500, "Elementary": 11000, "Middle School": 13500, "High School": 16500 };
    const curveMult = { "American Diploma": 1.0, "British (IGCSE/A-Level)": 1.05, "International Baccalaureate": 1.15 };
    const state = { grade: "Elementary", curriculum: "American Diploma", transport: false, activities: 2, siblings: 0 };

    const gradeSel = $("#calcGrade"), curSel = $("#calcCurriculum"), transBtn = $$("#calcTransport .toggle-pill"),
      actRange = $("#calcActivities"), actVal = $("#calcActValue"), sibRange = $("#calcSiblings"), sibVal = $("#calcSibValue");

    function fmt(n) { return n.toLocaleString("en-US"); }
    function compute() {
      const tuition = Math.round(base[state.grade] * (curveMult[state.curriculum] || 1));
      const registration = 950;
      const transport = state.transport ? 1400 : 0;
      const activities = state.activities * 350;
      let subtotal = tuition + registration + transport + activities;
      const siblingDiscount = state.siblings > 0 ? Math.round(tuition * 0.10 * Math.min(state.siblings, 3)) : 0;
      const total = subtotal - siblingDiscount;
      $("#crAmount").innerHTML = `<span class="cur">$</span>${fmt(total)}`;
      $("#crBreak").innerHTML = `
        <div class="row"><span>Annual tuition (${state.grade})</span><span>$${fmt(tuition)}</span></div>
        <div class="row"><span>Registration & materials</span><span>$${fmt(registration)}</span></div>
        <div class="row"><span>Transportation</span><span>${transport ? "$" + fmt(transport) : "—"}</span></div>
        <div class="row"><span>Activities (${state.activities})</span><span>${activities ? "$" + fmt(activities) : "—"}</span></div>
        ${siblingDiscount ? `<div class="row" style="color:#4ade80"><span>Sibling discount</span><span>−$${fmt(siblingDiscount)}</span></div>` : ""}`;
    }
    gradeSel?.addEventListener("change", () => { state.grade = gradeSel.value; compute(); });
    curSel?.addEventListener("change", () => { state.curriculum = curSel.value; compute(); });
    transBtn.forEach(b => b.addEventListener("click", () => { transBtn.forEach(x => x.classList.remove("on")); b.classList.add("on"); state.transport = b.dataset.val === "yes"; compute(); }));
    actRange?.addEventListener("input", () => { state.activities = +actRange.value; actVal.textContent = actRange.value; compute(); });
    sibRange?.addEventListener("input", () => { state.siblings = +sibRange.value; sibVal.textContent = sibRange.value; compute(); });
    compute();
  }

  /* ---------- Campus facility filter ---------- */
  function initCampusFilter() {
    const grid = $("#facilityGrid");
    if (!grid) return;
    const bar = $("#facilityFilter");
    bar?.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", bar).forEach(x => x.classList.remove("active")); b.classList.add("active");
      const cat = b.dataset.cat;
      $$(".facility-card", grid).forEach(c => { c.style.display = cat === "all" || c.dataset.cat === cat ? "" : "none"; });
    });
  }

  /* ---------- Gallery filter ---------- */
  function initGalleryFilter() {
    const grid = $("#galleryGrid");
    if (!grid) return;
    const bar = $("#galleryFilter");
    bar?.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", bar).forEach(x => x.classList.remove("active")); b.classList.add("active");
      const cat = b.dataset.cat;
      $$(".m-item", grid).forEach(m => { m.style.display = cat === "all" || m.dataset.cat === cat ? "" : "none"; });
    });
  }

  /* ---------- Events filter (needs a grid) ---------- */
  function initEventFilter() {
    const grid = $("#eventGrid");
    if (!grid) return;
    const bar = $("#eventFilter");
    bar?.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", bar).forEach(x => x.classList.remove("active")); b.classList.add("active");
      const cat = b.dataset.cat;
      $$(".event-item", grid).forEach(m => { m.style.display = cat === "all" || m.dataset.cat === cat ? "" : "none"; });
    });
  }

  /* ---------- Event registration (global — works on any page with the modal) ---------- */
  function initEventRegistration() {
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-register]");
      if (!btn) return;
      e.preventDefault();
      const modal = $("#eventRegModal");
      if (!modal) { window.aeToast("Registration opening on the Events page…", "calendar"); window.location.href = "events.html"; return; }
      const title = btn.dataset.register;
      $("#regEventTitle").textContent = title;
      $("#regEventInput").value = title;
      const form = $("#eventRegForm");
      form.reset();
      form.classList.remove("hidden");
      $("#regSuccess")?.remove();
      window.aeModal.open("eventRegModal");
    });
    const regForm = $("#eventRegForm");
    if (regForm) {
      window.aeForm(regForm, "aethris_event_regs", (data, f) => {
        f.classList.add("hidden");
        const div = document.createElement("div");
        div.id = "regSuccess";
        div.innerHTML = `<div class="form-success"><div class="check">${ic("check")}</div>
          <h3>You're registered!</h3>
          <p class="lede" style="margin:12px auto;max-width:40ch">We've saved your spot for <b>${data.event}</b>. A confirmation has been sent to <b>${data.email}</b>.</p>
          <button class="btn" data-modal-close>Done</button></div>`;
        f.parentElement.appendChild(div);
        window.aeToast("Event registration confirmed", "check");
        if (window.aeI18n) window.aeI18n.refresh();
      });
    }
  }

  /* ---------- Prospectus modal form ---------- */
  function initProspectus() {
    const form = $("#prospectusForm");
    if (!form) return;
    window.aeForm(form, "aethris_prospectus", (data, f) => {
      f.classList.add("hidden");
      const wrap = f.parentElement;
      const div = document.createElement("div");
      div.innerHTML = `<div class="form-success"><div class="check">${ic("download")}</div>
        <h3>Your prospectus is on its way</h3>
        <p class="lede" style="margin:12px auto;max-width:42ch">Thank you, ${data.name}. We've sent the Aethris 2026 prospectus to <b>${data.email}</b>. Explore it at your leisure.</p>
        <button class="btn" data-modal-close>Close</button></div>`;
      wrap.appendChild(div);
      window.aeToast("Prospectus sent to your email", "check");
    });
  }

  /* ---------- Generic forms (contact / tour / consultation) ---------- */
  function initForms() {
    [
      ["#tourForm", "aethris_tours", "Tour Requested", "Your private campus tour request has been received. Our team will confirm your preferred date shortly."],
      ["#contactForm", "aethris_contacts", "Message Sent", "Thank you for reaching out. A member of our team will respond within one business day."],
      ["#consultForm", "aethris_consults", "Consultation Booked", "Your parent consultation request is confirmed. We look forward to speaking with your family."],
      ["#inquiryForm", "aethris_inquiries", "Inquiry Received", "Thank you for your interest in Aethris. Our admissions concierge will be in touch very soon."],
    ].forEach(([sel, key, title, msg]) => {
      const form = $(sel);
      if (!form) return;
      window.aeForm(form, key, (data, f) => {
        const wrap = f.closest(".form-host") || f.parentElement;
        f.style.display = "none";
        const div = document.createElement("div");
        div.innerHTML = successBlock(title, msg);
        wrap.appendChild(div.firstElementChild);
        window.aeToast(title, "check");
      });
    });
  }

  /* ---------- Portal ---------- */
  function initPortal() {
    const shell = $("#portal");
    if (!shell) return;
    const nav = $("#portalNav");
    nav?.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", nav).forEach(x => x.classList.remove("active")); b.classList.add("active");
      const key = b.dataset.portal;
      $$(".portal-panel", shell).forEach(p => p.classList.toggle("active", p.dataset.portal === key));
      animateCharts($(`.portal-panel[data-portal="${key}"]`));
    });
    // animate charts when portal enters viewport
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { animateCharts($(".portal-panel.active")); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(shell);
  }
  function animateCharts(scope) {
    if (!scope) return;
    $$(".b-fill", scope).forEach(bar => { const h = bar.dataset.h || "60"; bar.style.height = "0"; requestAnimationFrame(() => setTimeout(() => bar.style.height = h + "%", 60)); });
    $$(".pr-bar i", scope).forEach(bar => { const w = bar.dataset.w || "60"; bar.style.width = "0"; requestAnimationFrame(() => setTimeout(() => bar.style.width = w + "%", 60)); });
  }

  /* ---------- Video modal (gallery) ---------- */
  function initVideoModal() {
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-video]");
      if (!t) return;
      e.preventDefault();
      const src = t.dataset.video, title = t.dataset.vtitle || "";
      const modal = $("#videoModal");
      if (!modal) return;
      $("#videoModalPlayer").innerHTML = `<video src="${src}" controls autoplay playsinline style="width:100%;border-radius:14px"></video>`;
      $("#videoModalTitle").textContent = title;
      window.aeModal.open("videoModal");
    });
    const vm = $("#videoModal");
    vm?.addEventListener("click", e => { if (e.target.closest("[data-modal-close]") || e.target === vm) { const p = $("#videoModalPlayer"); if (p) p.innerHTML = ""; } });
  }

  /* ---------- boot ---------- */
  function boot() {
    initModals();
    initProgramFilter();
    initFinder();
    initWizard();
    initCalculator();
    initCampusFilter();
    initGalleryFilter();
    initEventFilter();
    initEventRegistration();
    initProspectus();
    initForms();
    initPortal();
    initVideoModal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
