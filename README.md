# Dipesh Parajuli — Developer Portfolio

A premium, minimalist developer portfolio built with a **"Paper Terminal"** aesthetic. Features high-performance canvas animations, production-ready security, and polished mobile-first interactions.

🌐 **Live Site**: [dipeshparajuli.com.np](https://dipeshparajuli.com.np)

---

## ✨ Features

### 1. Interactive Particle Hero

- **HTML5 Canvas**: 180-particle emerald network with real-time mouse attraction physics.
- **Retina Support**: High-DPI rendering with `devicePixelRatio` scaling for 4K displays.
- **60fps Smoothed**: Powered by `requestAnimationFrame` and debounced resize handling.

### 2. Terminal-Style CTA Buttons

- **Command-Line UX**: Two hero buttons — `Init.contact()_` and `git checkout projects` — rendered in a monospaced font.
- **Blinking Cursor**: CSS `@keyframes` animation on the underscore cursor, hidden on hover.
- **Neon Glow on Hover**: Layered `box-shadow` creates a soft emerald neon effect on the primary button.
- **Mobile Responsive**: Buttons stack vertically and span full-width on small screens with scaled font size.
- **Smooth Scroll**: A reusable `initSmoothScroll()` handler glides users to the target section.

### 3. Footer: Security & Privacy

- **Email Obfuscation**: Email address is split across `data-user` and `data-domain` attributes — never written in plain text. JavaScript reconstructs it on load.
- **Click-to-Copy**: Clicking the email copies it to the clipboard via the `navigator.clipboard` API. The link text changes to a glowing **"COPIED!"** for 2 seconds, then reverts. No layout shift thanks to `min-width`.
- **Social Link Obfuscation**: LinkedIn and Facebook URLs are stored in `data-url` attributes and opened via a JS click handler — never as raw `href` links.
- **GitHub Obfuscation (Advanced)**: GitHub username is split into string fragments (`cat` + `kidd`) and only assembled at click-time. No trace of the full URL in the HTML source.
- **Tabnabbing Protection**: All external links opened via `window.open` use `noopener,noreferrer`.

### 4. Scroll Reveal System

- **Intersection Observer**: Content slides into view once, using a `cubic-bezier(0.4, 0, 0.2, 1)` curve.
- **Staggered Cards**: Project and experience cards reveal sequentially for visual rhythm.

### 5. Dual-Theme Engine

- **Dark / Light Mode**: Toggle between deep "Professional Dark" and "Paper Terminal" light mode.
- **Persistent State**: Theme preference stored in `localStorage`.

### 6. Asynchronous Contact Form

- **Formspree Backend**: Serverless, reliable form handling with zero server setup.
- **Fetch API**: Submissions happen without page reload.
- **High-Glow Toaster**: `backdrop-blur` notification with neon-emerald glow and a shrinking progress bar for the 5-second auto-hide.
- **UX Polish**: Loading spinner in submit button, form reset on success, manual dismiss.

### 7. 404 Error Page

- **Glitch Animation**: Custom CSS glitch keyframes on the "404" header.
- **Consistent Branding**: Shares the same navbar, footer, and particle canvas as the main site.

### 8. Privacy Policy Page

- Standardized compliance page (`privacy.html`) in the terminal aesthetic.
- Full footer with obfuscated social links and email, consistent with all pages.

---

## 🛠️ Tech Stack

| Layer        | Technology                                               |
| ------------ | -------------------------------------------------------- |
| Structure    | HTML5 (Semantic)                                         |
| Styling      | Tailwind CSS (CDN), Custom CSS Variables                 |
| Logic        | Vanilla JavaScript (ES6+)                                |
| Animation    | HTML5 Canvas, Intersection Observer, CSS Keyframes       |
| Form Backend | Formspree                                                |
| Icons        | Lucide Icons                                             |
| Fonts        | Inter (Sans), Monospace stack (Consolas / Cascadia Code) |
| Deployment   | GitHub Pages                                             |

---

## 📂 Project Structure

```
catkidd.github.io/
├── index.html           # Main portfolio page
├── privacy.html         # Privacy Policy
├── 404.html             # Custom error page
├── assets/
│   └── images/
│       ├── bg.webp          # Hero background
│       ├── profile_1.webp   # Professional photo
│       ├── logo-light.svg
│       └── logo-dark.svg
├── css/
│   └── style.css        # Theming, animations & variables
├── js/
│   └── script.js        # Particles, reveals, security & interaction
└── README.md
```

---

## 🔒 Security Notes

- No raw email address or social media URLs exist in the HTML source.
- All external links use `rel="noopener noreferrer"` to prevent tabnabbing.
- Email is reconstructed client-side from split `data-*` attributes.
- GitHub username is stored as two separate string constants in JS only.

---

## 🏁 Deployment

Hosted on **GitHub Pages** via the `main` branch. All links use relative pathing and case-sensitive filenames compatible with Linux-based GitHub servers.

---

_Built by Dipesh Parajuli &copy; 2026_
