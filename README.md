# Oscar Wylee — Eyewear Product Page

A responsive product page for browsing eyewear, built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open and serve.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Features

- **Image Carousel** — Browse product photos with prev/next arrows, pagination dots, and touch swipe support on mobile
- **Zoom Modal** — Full-screen image viewer with pinch-style zoom in/out controls
- **Color Swatches** — Switch between product color variants, each with its own image set
- **Responsive Layout** — 12-column grid on desktop, single column on mobile with a slide-out navigation drawer
- **Mobile Menu Drawer** — Animated side menu with overlay backdrop

## Project Structure

```
eyewear-product-page/
├── index.html              # Single-page entry point
├── css/
│   └── styles.css          # All styles — design tokens, components, responsive overrides
├── js/
│   ├── product-data.js     # Product variant data (colors, image paths)
│   └── script.js           # UI logic — carousel, zoom, swatches, mobile menu
└── assets/
    ├── icons/              # SVG icons (nav, cart, zoom controls, logo)
    └── images/             # Product photography (JPG)
```

## Getting Started

This is a static site — no install or build step required. Just serve the files with any local HTTP server.

**Option 1 — VS Code Live Server:**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, then right-click `index.html` → "Open with Live Server".

**Option 2 — Python:**
```bash
python -m http.server 8000
```

**Option 3 — Node.js:**
```bash
npx -y serve .
```

Then open [http://localhost:8000](http://localhost:8000) (or the port your server uses).

> **Note:** Opening `index.html` directly as a file (`file://`) won't work because the JavaScript uses ES modules (`import`/`export`), which require HTTP serving.

## Design Tokens

All colors, fonts, and radii are defined as CSS custom properties in `:root` for easy theming:

| Token | Value | Usage |
|---|---|---|
| `--color-blue` | `#003cac` | Brand accent, active nav, CTA borders |
| `--color-black` | `#000000` | Primary text, buttons, badges |
| `--color-gray-dark` | `#333333` | Body text, secondary elements |
| `--color-bg-light` | `#f4f4f4` | Subtle backgrounds (zoom button, hover states) |
| `--font-primary` | Open Sans | All typography |
| `--radius-pill` | `30px` | Rounded buttons |

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Full desktop layout — 8/4 column split, full nav |
| `768px – 1024px` | Tablet — 6/6 column split, condensed nav |
| `< 768px` | Mobile — single column, hamburger menu, touch swipe, announcement bar |

## Adding a Color Variant

1. Add product images to `assets/images/`
2. Add an entry in [product-data.js](js/product-data.js):
   ```js
   "New Color": {
     images: [
       "/assets/images/new-color-front.jpg",
       "/assets/images/new-color-side.jpg",
     ],
   },
   ```
3. Add a swatch button in [index.html](index.html) and a matching CSS class in [styles.css](css/styles.css):
   ```html
   <button class="swatch-circle swatch-new-color" data-color="New Color"></button>
   ```
   ```css
   .swatch-new-color {
     background-color: #your-color;
   }
   ```

## License

This project is for educational and portfolio purposes.
