# Aditya Singh Dangi — Portfolio

A personal portfolio site built with React, showcasing projects, experience, and skills through a set of custom interactive components rather than off-the-shelf UI libraries.

**Live:** https://adityadangi-portfolio.netlify.app/

<img width="1919" height="958" alt="image" src="https://github.com/user-attachments/assets/e8810d8b-4b7f-42e8-9d75-3a7e529bb86b" />

## Features

- **Tech Orbit** — a concentric-ring visualization of the tech stack, built from scratch (no charting library). Hovering a node pauses the rotation and draws live SVG connector lines to related technologies, computed from actual rendered DOM positions. Fully keyboard accessible and respects `prefers-reduced-motion`.
- **Live GitHub data** — a profile card and per-project stats pulled from the GitHub REST API (repo count, followers, stars, last push). Fails silently on rate-limits or offline instead of showing a broken loading state.
- **Command palette** — `Cmd/Ctrl+K` opens a searchable palette for navigation, project links, contact links, and theme switching — everything reachable by clicking is reachable from the keyboard.
- **Scroll-driven achievement rail** — a progress rail that fills as you scroll, driven by a custom hook (`useScrollFill`) that writes directly to a CSS custom property via `requestAnimationFrame`, gated by `IntersectionObserver` — no re-renders.
- **Interactive cards** — spotlight and tilt effects on project and experience cards, magnetic buttons, and a light/dark theme toggle.

## Tech Stack

- React 18 (Create React App)
- Framer Motion — animation
- React Router — routing
- GitHub REST API — live profile/repo data
- EmailJS — contact form

## Project Structure
frontend/src/
├── components/
│ ├── sections/ # Hero, Projects, Experience, Skills, TechOrbit, Achievements, Contact...
│ ├── layout/ # AppShell, TopBar, CommandPalette, ThemeToggle...
│ └── ui/ # Card, Dialog, Badge, Reveal, Tooltip... (shared primitives)
├── hooks/ # useScrollFill, useGithubUser, useHotkeys, useParallax...
├── lib/ # github.js, scroll.js, theme.js
├── data/ # portfolio.js, techStack.js
└── theme/ # ThemeProvider

## Getting Start
git clone https://github.com/Aditya-Dangi/Aditya-Dangi-Portfolio.git
cd Aditya-Dangi-Portfolio/frontend
npm install
npm start
Runs at http://localhost:3000.

Available Scripts
Run from the frontend/ directory:

npm start — start the dev server
npm run build — production build
npm test — run tests
Contact
Email: adityasinghdangi9899@gmail.com
LinkedIn: aditya-singh-dangi
GitHub: @Aditya-Dangi
