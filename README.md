# Professional Minimalist Developer Portfolio

A state-of-the-art, senior-level developer portfolio built with a "Paper Terminal" aesthetic. This project features high-performance 2D canvas animations, production-ready optimizations, and premium scroll interactions to create a professional digital space.

## 🚀 Premium Features

### 1. **High-Performance Particle Hero**
- **Interactive Canvas**: Optimized HTML5 Canvas particle network with emerald nodes and dynamic web-lines.
- **Magnetic Interaction**: Particles are gently attracted to the cursor within a 200px radius using spatial physics.
- **Technical Polish**: Implements `requestAnimationFrame` for 60fps smoothness and High-DPI (Retina) support for razor-sharp rendering on 4K displays.

### 2. **Professional Scroll Reveal System**
- **Intersection Observer**: Modern, high-performance scroll triggers that slide content into view only once.
- **Cubic-Bezier Motion**: Uses a custom `cubic-bezier(0.4, 0, 0.2, 1)` timing for a non-linear, professional feel.
- **Dynamic Staggering**: Sequential reveal delays for project cards and experience items to create visual rhythm.

### 3. **Sophisticated UI & UX**
- **Dual Aesthetic**: Toggle between a deep "Professional Dark" theme and a "Paper Terminal" light mode.
- **Micro-Animations**: Animated sliding underlines for navigation and continuous rotating gradient borders for project cards.
- **"RETURN 0;" Navigation**: A technical back-to-top button with a "COMPILING..." state upon activation.

### 4. **404 Error Landing Page**
- **Glitch Aesthetic**: Custom CSS glitch animation on the "404" header for a digitally-distorted feel.
- **Humorous Persona**: Integrated "digital void" messaging and terminal-style root cause logs.
- **Consistent UI**: Reuses the global navigation, footer, and particle background for a seamless user experience.

### 5. **Asynchronous Contact Form**
- **Formspree Integration**: Powering the backend with reliable, serverless form processing.
- **Fetch API Workflow**: Submissions happen in the background without refreshing the page.
- **Smart Feedback**: Real-time "SENDING..." states and custom successful/error messaging with a humorous developer twist.
- **Enhanced UI**: Custom emerald input focus glows and disabled loading buttons.

### 6. **Compliance & Architecture**
- **Privacy Policy**: Standardized compliance page (`privacy.html`) styled to match the terminal aesthetic.
- **Clean Directory Structure**: Modular organization with dedicated `/assets/`, `/css/`, and `/js/` directories for maintainability.
- **A11y & SEO**: Full ARIA support, optimized heading hierarchy, and performance-tuned asset loading (WebP/SVG).

## 🛠️ Tech Stack & Tools

- **Frontend**: Vanilla HTML5, JavaScript (ES6+)
- **Animation**: HTML5 Canvas API, Intersection Observer API
- **Styling**: Tailwind CSS (CDN/Config), Custom CSS Variables
- **Backend**: Formspree (Serverless Form Handling)
- **Icons**: Lucide Icons (Dynamic Vector Integration)
- **Typography**: Inter & UI-Monospace

## 🏛️ Project Architecture

This project follows a professional, modular structure designed for GitHub Pages deployment:

- **`/assets/images/`**: Optimized visual assets (WebP) and vector branding (SVG).
- **`/css/`**: Core styling logic, theming variables, and animation keyframes.
- **`/js/`**: Interactive logic (Particles, Scroll Reveal, Theme Engine, Typing Effects).
- **`index.html`**: Semantic entry point with optimized SEO and accessibility landmarks.
- **`privacy.html`**: Legal compliance page.
- **`404.html`**: Custom error landing page with glitch animations.

## 📂 Project Structure

```bash
portfolio/
├── index.html           # Core Structure & SEO
├── privacy.html         # Legal Compliance
├── 404.html             # Error Landing Page
├── assets/
│   └── images/
│       ├── bg.webp      # Optimized Hero Background
│       ├── logo-light.svg
│       └── logo-dark.svg
├── css/
│   └── style.css        # Theming, Animations & Variables
├── js/
│   └── script.js        # Particles, Reveals & Interaction
└── README.md            # Architecture Documentation
```

## 🏁 Deployment

This project is optimized for **GitHub Pages**. All internal links use relative pathing and strictly follow case-sensitive naming conventions to ensure zero breaks upon hosting.

---
*Architected & Built by Dipesh Parajuli &copy; 2026*
