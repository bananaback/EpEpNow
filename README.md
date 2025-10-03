# Ép Ép Now — Fresh Juice Landing Page

A vibrant, gradient-forward landing page for the Ép Ép Now cold-pressed juice bar. The design leans on Tailwind CSS utility classes, custom CSS accents, and a pinch of jQuery to deliver a playful, modern, and image-light experience.

## ✨ Highlights

- **Juicy gradients & playful typography** using Poppins for headings and Lato for body copy.
- **Responsive layout** crafted with locally built Tailwind CSS utilities.
- **Interactive touches** powered by jQuery: smooth scrolling, testimonial carousel, and product detail modal.
- **Minimal imagery** replaced with abstract blobs, rings, and gradient accents.
- **Accessible-first**: semantic sections, focus styles, aria labels, and contrast-conscious color choices.

## 📁 Project Structure

```
.
├── index.html
├── README.md
├── assets
│   ├── css
│   │   ├── custom.css
│   │   └── tailwind.css
│   └── js
│       └── main.js
├── package.json
├── postcss.config.js
├── src
│   └── tailwind.css
└── tailwind.config.js
```

- `index.html`: Main single-page experience with hero, brand story, menu, freshness highlights, testimonials, and order CTA.
- `assets/css/custom.css`: Supplemental styles for gradients, blobs, cards, modal, and micro-interactions.
- `assets/css/tailwind.css`: Compiled Tailwind output (generated; do not edit by hand).
- `assets/js/main.js`: jQuery-powered interactions (smooth scroll, nav toggle, modal, carousel, form feedback).
- `src/tailwind.css`: Tailwind entry file (`@tailwind base/components/utilities`) plus base body styles.
- `tailwind.config.js`: Tailwind customization (color palette, typography, shadows, easing).
- `postcss.config.js`: PostCSS pipeline (Tailwind + Autoprefixer).

## 🚀 Try It Locally

Install dependencies and build the CSS bundle once:

```powershell
cd d:\javascript_related\epepnow
npm install
npm run build
```

Open `index.html` in your browser after the build finishes.

### Optional: Watch mode & dev server

```powershell
cd d:\javascript_related\epepnow
npm run dev
```

In a second terminal, you can serve the folder (for example, with Python) if you prefer hot reload via the browser:

```powershell
cd d:\javascript_related\epepnow
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## 🛠️ Tooling

- [Tailwind CSS CLI](https://tailwindcss.com/docs/installation) for utility generation.
- [jQuery 3.7.1](https://code.jquery.com/jquery-3.7.1.min.js) for light DOM scripting.

## 🔮 Next Ideas

- Hook the order & newsletter forms to a backend service (Zapier, Airtable, custom API).
- Add more menu data via JSON and render cards dynamically.
- Integrate a11y-friendly carousel controls for auto-play pause/resume buttons.

Stay juicy! 🧃
