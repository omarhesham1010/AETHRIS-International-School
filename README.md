# Aethris International School — Premium Demo Website

A world-class, luxury international school website. **Frontend-only** — no backend required. All demo forms (applications, tours, event registrations, inquiries) persist to `localStorage` and surface live in the **Family Portal → Admissions CRM**.

Built with hand-crafted **HTML · CSS · JavaScript** (no framework, no build step) for maximum reliability and instant loading.

## 🚀 Quick Start

```bash
npm install      # install the local dev server
npm run dev      # serve at http://localhost:5500  (auto-reload)
```

Then open **http://localhost:5500** — from this single root URL you can reach **every** page through the navigation menu and footer.

Alternative one-off static server:
```bash
npm run serve    # http-server on port 5500 (opens the browser)
```

## 📄 Pages (all reachable from the navbar & footer)

| Route | Page |
|---|---|
| `/` | Home |
| `/about.html` | About |
| `/academics.html` | Academics & Programs |
| `/campus.html` | Campus (interactive map) |
| `/student-life.html` | Student Life |
| `/faculty.html` | Faculty |
| `/admissions.html` | Admissions (wizard, fee calculator) |
| `/events.html` | Events |
| `/gallery.html` | Gallery (lightbox) |
| `/testimonials.html` | Success Stories |
| `/contact.html` | Contact |
| `/portal.html` | Family Portal (dashboards demo) |

## ✨ Features
Video heroes · animated stats · program-finder quiz · admissions wizard · live fee calculator · AI concierge · interactive campus map · gallery lightbox · command palette (⌘K) · **dark/light themes** · **4-language switcher (EN / AR / FR / ES)** · portal dashboards with a live CRM · sticky Apply CTA · scroll reveals & micro-interactions.

## 🗂 Structure
```
├── index.html + 11 more pages
├── assets/
│   ├── css/   theme.css · layout.css · pages.css
│   └── js/    data.js · i18n.js · ui.js · render.js · pages.js
└── Images/    academics · campus · faculty · … · videos
```

## 📝 Notes
- All navigation is via real relative links, so a single root link demoes the whole site.
- Language switching translates the interface across the entire site.
- No external image/video dependencies — every asset is local.
