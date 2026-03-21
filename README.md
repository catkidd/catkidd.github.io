# Dipesh Parajuli — Developer Portfolio

> A performance-first, statically deployed portfolio with a "Paper Terminal" aesthetic — built with zero frontend frameworks and no build step.

🌐 **Live:** [dipeshparajuli.com.np](https://dipeshparajuli.com.np)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Deployment](#deployment)
- [Security Architecture](#security-architecture)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository is the source for a personal developer portfolio deployed on GitHub Pages. The project deliberately avoids build tools and compiled frameworks. Every feature — animations, theming, form handling, and scroll reveals — runs in the browser using native Web APIs and a single, organized CSS/JS layer.

> **Design Note:** The "zero-dependency" constraint was a deliberate architectural choice. It eliminates build pipeline complexity, keeps the deploy target a flat file server, and forces a deeper understanding of browser primitives over library abstractions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | Tailwind CSS (CDN) + Custom CSS Variables |
| Logic | Vanilla JavaScript (ES6+) |
| Animation | HTML5 Canvas, Intersection Observer API, CSS `@keyframes` |
| Form Backend | [Formspree](https://formspree.io) |
| Icons | [Lucide Icons](https://lucide.dev) |
| Fonts | Inter (Google Fonts), Monospace stack (Cascadia Code / Consolas) |
| Deployment | GitHub Pages (`main` branch) |

---

## Project Structure

```text
catkidd.github.io/
├── index.html              # Main portfolio page
├── 404.html                # Custom error page with glitch animation
├── privacy.html            # Privacy policy page
├── favicon.ico
├── CNAME                   # Custom domain mapping
├── assets/
│   └── images/
│       ├── profile_1.webp  # Primary profile photo (carousel slide 1)
│       ├── profile_2.webp  # Secondary profile photo (carousel slide 2)
│       ├── bg.webp         # Hero section background
│       ├── logo-light.svg  # Nav logo for dark mode
│       └── logo-dark.svg   # Nav logo for light mode
├── css/
│   └── style.css           # Design tokens, animations, and component styles
├── js/
│   └── script.js           # Particles, scroll reveals, theming, and form logic
└── .gitignore
```

---

## Features

### Hero Section

- **Particle Network:** An 180-node emerald particle canvas rendered via `requestAnimationFrame` with real-time mouse-attraction physics. The canvas uses `devicePixelRatio` scaling for sharp rendering on HiDPI and Retina displays.
- **Mobile Optimization:** On screens narrower than 768px, the particle count drops to 40, the connection distance reduces by 60%, and mouse-tracking is disabled entirely to eliminate input lag and preserve battery.
- **Profile Avatar:** A 60px circular avatar with a rotating dashed-border indicator sits inline with the `h1`, styled with a hover-triggered scale and glow effect.
- **Typing Animation:** A cycling typewriter effect iterates through developer titles using a `setTimeout`-driven state machine.

> **Design Note:** The canvas is set to `pointer-events: none` to ensure the particle layer never intercepts clicks on the CTA buttons beneath it — a common but silent usability failure in canvas-backed hero sections.

### About Section

- **Auto-Play Carousel:** The profile image container cycles between `profile_1.webp` and `profile_2.webp` using a CSS opacity cross-fade triggered every 5 seconds via `setInterval`. No JavaScript animation libraries are used.

### Navigation

- **Glassmorphism Nav:** A fixed `backdrop-filter: blur` navigation bar remains readable over all scroll positions.
- **Mobile Side Drawer:** A full-screen mobile menu transitions in via CSS `translateX`. Focus management (`inert` attribute, `focus()` calls) meets WCAG 2.1 keyboard navigation requirements.
- **Scroll-Linked Progress Bar:** A `scroll` event listener drives a `width` update on a 2px indicator at the top of the viewport.

### Theming

- **Dark / Light Mode:** Two complete theme sets are defined as CSS custom properties (`:root` for dark, `.light-mode` for light). Toggling adds or removes the `light-mode` class on `<body>`.
- **Persistent Preference:** The selected theme is stored in `localStorage` under the `portfolio-theme` key and reapplied synchronously on load to prevent a flash of unstyled content.

### Contact Form

- **Async Submission:** The form posts to Formspree via the Fetch API. The page never reloads on submission.
- **Loading State:** The submit button disables, hides its label, and renders an SVG spinner during the in-flight request.
- **Toaster Notification:** Submission outcome (success or error) surfaces in a `backdrop-filter` toast with `role="alert"` and `aria-live="polite"` for screen reader compatibility. The toast auto-dismisses after 5 seconds with a shrinking progress bar indicator.

### Scroll Reveal

- **Intersection Observer:** Elements with the `.reveal` class animate into view once they cross a `0.15` threshold. The observer unregisters each element after its first intersection to avoid re-triggering.

### Security Architecture

See the [Security Architecture](#security-architecture) section below.

### 404 Page

- **Glitch Animation:** The "404" heading uses layered CSS `clip-path` and `translate` keyframes across three pseudo-elements to produce an analog signal-corruption effect.
- **Consistent Layout:** The 404 page shares the same nav, footer, particle canvas, and Lucide icon set as the main site with no duplicated logic.

### Accessibility

- Decorative elements (blinking cursor, rotating avatar border) carry `aria-hidden="true"`.
- The toaster uses `role="alert"` and `aria-live="polite"` to announce form results to screen readers.
- All interactive icons have descriptive `aria-label` attributes.
- The mobile menu implements the `inert` attribute to block focus from reaching off-screen content.

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main`. There is no build step.

**Requirements:**
- A browser with ES6+ support (the site uses no transpilation)
- A web server that serves files with correct MIME types (GitHub Pages satisfies this)

**Custom Domain:**

The `CNAME` file at the repository root maps the site to `dipeshparajuli.com.np`. GitHub Pages reads this file automatically.

> **Note:** All asset paths are relative. Filenames are lowercase to ensure compatibility with the Linux-based GitHub Pages file server, which is case-sensitive.

---

## Security Architecture

No plaintext contact information or social media URLs exist anywhere in the HTML source.

| Vector | Mitigation |
|---|---|
| Email harvesting | Address split across `data-user` and `data-domain` HTML attributes; reconstructed in JS at runtime |
| Social URL scraping | LinkedIn and Facebook URLs stored in `data-url` attributes; opened via a JS click handler, never as `href` values |
| GitHub username scraping | Username split into two string literals (`cat` + `kidd`) assembled only on click |
| Tabnabbing | All `window.open` calls use `noopener,noreferrer` |

---

## Contributing

This is a personal portfolio project and is not open for feature contributions. Bug reports and accessibility issues are welcome via [GitHub Issues](https://github.com/catkidd/catkidd.github.io/issues).

If you fork this project for your own portfolio, update the following before deploying:

- `CNAME` — replace with your own custom domain, or delete it to use the default `*.github.io` URL
- `css/style.css` — update `--accent-color` to match your brand
- `js/script.js` → `initGithubObfuscation()` — replace the split username constants
- `js/script.js` → `initEmailObfuscation()` — update `data-user` and `data-domain` in `index.html`
- All profile images in `assets/images/`

---

## License

© 2026 Dipesh Parajuli. All rights reserved.

This project is provided for reference and inspiration. You may fork and adapt it for your own non-commercial portfolio, provided you replace all personal content (name, photos, experience, contact details) before deploying.
