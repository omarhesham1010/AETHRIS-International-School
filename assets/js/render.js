/* =============================================================
   AETHRIS — Reusable Renderers
   Turns data into premium markup for any page
   ============================================================= */
(function () {
  "use strict";
  const A = window.AETHRIS;
  const ic = window.aeIcon || (() => "");
  const el = (s) => document.querySelector(s);
  const img = (p) => `Images/${p}`;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(d) { const dt = new Date(d); return { day: dt.getDate(), mon: MONTHS[dt.getMonth()], full: `${MONTHS[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`, weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dt.getDay()] }; }

  const R = {
    stats(sel, list = A.stats, delayable = true) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((s, i) => `
        <div class="stat-card glass" data-reveal data-reveal-delay="${(i % 6) + 1}">
          <div class="st-ico">${ic(s.icon)}</div>
          <div class="stat-num"><span data-count="${s.value}">0</span><span class="suf">${s.suffix}</span></div>
          <p>${s.label}</p>
        </div>`).join("");
    },

    programs(sel, list = A.programs, opts = {}) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((p, i) => `
        <article class="card program-card" data-cat="${p.cat}" id="${opts.anchor ? p.id : ""}" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <div class="pc-media"><img src="${img(p.img)}" alt="${p.name}" loading="lazy"><span class="chip">${p.tag}</span></div>
          <div class="pc-body">
            <h3>${p.name}</h3>
            <p>${p.short}</p>
            ${opts.full ? `<div class="pc-focus">${p.focus.map(f => `<span>${f}</span>`).join("")}</div>` : ""}
            <div class="pc-foot">
              <span class="careers">${opts.full ? "Ages " + p.age : p.focus.slice(0, 2).join(" · ")}</span>
              <a class="link-arrow" href="academics.html#${p.id}">Explore ${ic("arrow")}</a>
            </div>
          </div>
        </article>`).join("");
    },

    events(sel, list = A.events, opts = {}) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((e, i) => {
        const d = fmtDate(e.date);
        return `<article class="card event-card event-item" data-cat="${e.cat}" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <div class="ec-media"><img src="${img(e.img)}" alt="${e.title}" loading="lazy">
            <div class="ec-date"><b>${d.day}</b><span>${d.mon}</span></div>
          </div>
          <div class="ec-body">
            <span class="chip neutral" style="align-self:flex-start">${e.cat}</span>
            <h3 style="font-size:1.25rem;margin:12px 0 0">${e.title}</h3>
            <div class="ec-meta">
              <span>${ic("clock")} ${e.time || "All day"}</span>
              <span>${ic("pin")} ${e.loc || "Campus"}</span>
            </div>
            <p style="font-size:.88rem">${e.desc}</p>
            <div class="pc-foot">
              <span class="careers">${d.weekday}, ${d.full}</span>
              <button class="link-arrow" data-register="${e.title}">Register ${ic("arrow")}</button>
            </div>
          </div>
        </article>`;
      }).join("");
    },

    testimonials(sel, list = A.testimonials) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((t, i) => `
        <article class="card quote-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <div class="qc-stars">${Array(t.rating).fill(`<svg viewBox="0 0 24 24"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z"/></svg>`).join("")}</div>
          <blockquote>“${t.quote}”</blockquote>
          <div class="qc-person">
            <img src="${img(t.img)}" alt="${t.name}" loading="lazy">
            <div><b>${t.name}</b><span>${t.role}</span></div>
            <span class="chip neutral" style="margin-left:auto">${t.type}</span>
          </div>
        </article>`).join("");
    },

    faculty(sel, list = A.faculty) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((f, i) => `
        <article class="card" data-dept="${f.dept}" style="padding:0;overflow:hidden" data-reveal data-reveal-delay="${(i % 4) + 1}">
          <div class="img-frame" style="border-radius:0;aspect-ratio:1/1"><img src="${img(f.img)}" alt="${f.name}" loading="lazy"></div>
          <div style="padding:20px 22px 24px">
            <span class="chip neutral" style="margin-bottom:10px">${f.dept}</span>
            <h4 style="margin-bottom:2px">${f.name}</h4>
            <p style="color:var(--accent);font-size:.85rem;font-weight:600;margin-bottom:10px">${f.role}</p>
            <p style="font-size:.85rem">${f.bio}</p>
            <p class="serif italic" style="margin-top:14px;color:var(--text);font-size:.95rem">“${f.quote}”</p>
          </div>
        </article>`).join("");
    },

    gallery(sel, list = A.gallery) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((g) => `
        <div class="m-item" data-cat="${g.cat}" data-lightbox="gallery" data-full="${img(g.img)}" data-cap="${g.title}">
          <img src="${img(g.img)}" alt="${g.title}" loading="lazy">
          <div class="m-zoom">${ic("search")}</div>
          <div class="m-overlay"><div><span>${g.cat}</span><br><b>${g.title}</b></div></div>
        </div>`).join("");
    },

    videos(sel, list = A.videos) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((v, i) => `
        <div class="video-card" data-video="${img(v.src)}" data-vtitle="${v.title}" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <img src="${img(v.poster)}" alt="${v.title}" loading="lazy">
          <div class="vc-play">${ic("play")}</div>
          <div class="vc-cap"><span>${v.cat}</span><b>${v.title}</b></div>
        </div>`).join("");
    },

    pathway(sel, list = A.pathway) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((p, i) => `
        <div class="pathway-node">
          <div class="pn-media"><img src="${img(p.img)}" alt="${p.stage}" loading="lazy">
            <div class="pn-num">${i + 1}</div>
            <div class="pn-body"><span>${p.age}</span><h4>${p.stage}</h4><p>${p.desc}</p></div>
          </div>
        </div>`).join("");
    },

    studentLife(sel, list = A.studentLife) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((s, i) => `
        <article class="card facility-card" data-cat="${s.cat}" data-reveal data-reveal-delay="${(i % 4) + 1}">
          <div class="fc-media"><img src="${img(s.img)}" alt="${s.name}" loading="lazy"><span class="chip">${s.cat}</span></div>
          <div class="fc-body"><h4>${s.name}</h4><p>${s.desc}</p></div>
        </article>`).join("");
    },

    facilities(sel, list = A.facilities) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map((f, i) => `
        <article class="card facility-card" data-cat="${f.cat}" data-reveal data-reveal-delay="${(i % 4) + 1}">
          <div class="fc-media"><img src="${img(f.img)}" alt="${f.name}" loading="lazy"><span class="chip">${f.cat}</span></div>
          <div class="fc-body"><h4>${f.name}</h4><p>${f.desc}</p></div>
        </article>`).join("");
    },

    hotspots(sel, list = A.facilities) {
      const host = el(sel); if (!host) return;
      const pts = list.filter(f => f.id !== "aerial");
      host.innerHTML = pts.map(f => `
        <div class="hotspot" style="left:${f.x}%;top:${f.y}%">
          <div class="hs-dot" title="${f.name}"></div>
          <div class="hs-pop"><img src="${img(f.img)}" alt="${f.name}"><div class="hp-body"><b>${f.name}</b><p>${f.desc}</p></div></div>
        </div>`).join("");
    },

    marquee(sel, list = A.universities) {
      const host = el(sel); if (!host) return;
      const items = [...list, ...list].map(u => `<span class="marquee-item">${u}</span>`).join("");
      host.innerHTML = `<div class="marquee-track">${items}</div>`;
    },

    faqs(sel, list = A.faqs) {
      const host = el(sel); if (!host) return;
      host.innerHTML = list.map(f => `
        <div class="faq-item">
          <button class="faq-q">${f.q}<span class="fq-ico"></span></button>
          <div class="faq-a"><p>${f.a}</p></div>
        </div>`).join("");
    },
  };

  window.AErender = R;
  window.aeFmtDate = fmtDate;
})();
