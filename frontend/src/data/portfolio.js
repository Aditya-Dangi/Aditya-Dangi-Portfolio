export const profile = {
  name: "Aditya Singh Dangi",
  role: "Software Engineer",
  location: "Delhi, India",
  email: "adityasinghdangi9899@gmail.com",
  phone: "+91 8178900995",
  github: "https://github.com/Aditya-Dangi",
  linkedin: "https://www.linkedin.com/in/aditya-singh-dangi-1b38a2235",
  resume:
    "https://drive.google.com/file/d/1FEBv4VRGO84RNBQdaIGChYYsVh7ZUEXc/view?usp=sharing",
  resumeDownload:
    "https://drive.google.com/uc?export=download&id=1FEBv4VRGO84RNBQdaIGChYYsVh7ZUEXc",
  resumeDownloadName: "Aditya-Singh-Dangi-Resume.pdf",
  headline:
    "Software engineer building secure enterprise applications.",
  summary:
    "I work across Java, Spring Boot, Angular, REST APIs, and SQL to ship banking workflows, modernize legacy systems, and build full-stack products with clean architecture.",
};

export const highlights = [
  { value: "1+ yrs", label: "enterprise engineering experience" },
  { value: "10", label: "production CoPad releases delivered" },
  { value: "Angular 8 -> 15", label: "legacy platform modernization" },
  { value: "500+", label: "DSA problems solved" },
];

export const strengths = [
  "Ships production-ready frontend and backend features across regulated enterprise workflows.",
  "Understands secure API design, authentication, authorization, and data-heavy dashboards.",
  "Comfortable collaborating with client stakeholders, QA, and Agile delivery teams through UAT and deployments.",
];

export const experience = [
  {
    company: "Newgen Software",
    role: "Software Engineer",
    location: "Delhi, India",
    period: "Feb 2025 - Present",
    context:
      "Engineering CoPad, CitiBank's enterprise banking platform used by global settlement operations.",
    impact: [
      "Led Angular frontend development for CoPad, shipping features across 10 production releases for EMEA, APAC, and NAM operations teams.",
      "Migrated legacy modules from Angular 8 to Angular 15, resolving compatibility issues across Angular DataTables, jsPDF, TypeScript, and other legacy dependencies.",
      "Built 20+ Java/Spring Boot REST endpoints for CoPad, including a configurable Excel-export API with 20+ selectable columns, a scheduler fix, and validation logic.",
      "Delivered settlement dashboard features — business-day ageing, advanced filtering, and trade search — used by 50+ CitiBank users to track failed, partially settled, and pending trades.",
      "Replaced manual row selection across up to 2,500 trade records with an automated Excel-upload workflow that matches trade IDs to database records and auto-generates reports.",
      "Partnered with CitiBank stakeholders on requirements and production issue triage, validating releases through UAT across three environments (IST, UAT, Production) in Scrum-based Agile sprints.",
    ],
  },
];

export const projects = [
  {
    title: "AI-Powered Credit Card Fraud Detection System",
    year: "2026",
    type: "Full-stack platform",
    stack: ["Spring Boot", "Angular", "PostgreSQL", "Docker", "Gemini AI"],
    image: "ai-fraud-detection.jpg",
    description:
      "A full-stack fraud operations platform that combines rule-based detection with AI-assisted risk recommendations for administrative review teams.",
    outcomes: [
      "Separated fraud scoring, alert management, card blocking, and admin workflows using layered architecture and clean code principles.",
      "Secured the platform with Spring Security, JWT authentication, and a 3-tier RBAC hierarchy (Customer, Admin, Super Admin), plus a 4-stage admin-access approval workflow.",
      "Integrated Google Gemini AI to classify transactions flagged by a rule-based engine — amount, geography, and velocity thresholds — into four risk tiers (Low/Medium/High/Critical) with explanations and recommendations.",
      "Built a fraud alert pipeline with four review states that auto-blocks the linked card on rejection, backed by an admin dashboard with email notifications, Swagger/OpenAPI docs, and Docker containerization.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Aditya-Dangi/AI-Credit_Card-Fraud_Detection",
      },
    ],
  },
  {
    title: "FitApp",
    year: "2025",
    type: "Angular application",
    stack: ["Angular 15", "RxJS", "RapidAPI", "TypeScript", "Netlify CI"],
    image: "fitness-exercises-app.jpg",
    description:
      "A full-featured exercise-discovery web app built in Angular 15, migrated from a legacy React codebase to a modern standalone-component architecture with lazy-loaded routes.",
    outcomes: [
      "Integrated ExerciseDB and YouTube Search via RapidAPI through a reactive, RxJS-driven service layer for real-time search and filtering by body part, target muscle, and equipment.",
      "Built a reusable CSS custom-property design system with dark mode, full mobile responsiveness, and a custom navigation drawer.",
      "Focused on accessibility (keyboard focus states, ARIA attributes, skip links) and performance (route-level code splitting, lazy image loading), deployed via Netlify with CI-driven builds.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Aditya-Dangi/Fitness-Web-App",
      },
    ],
  },
  {
    title: "Games 4 Fun",
    year: "2024",
    type: "Angular application",
    stack: ["Angular", "Signals", "RxJS", "GitHub Actions"],
    image: "game.jpg",
    description:
      "A gaming platform migrated from a legacy static HTML/CSS/JS site into modern Angular, expanded from 3 basic games to 7 fully playable titles: Hangman, Bubble Game, Stone Paper Scissors, Sudoku, Memory Matcher, Snake & Ladder, and Tic-Tac-Toe.",
    outcomes: [
      "Built with standalone components, signal-based state management, and RxJS for reactive timers and async flows.",
      "Designed a cohesive visual system with custom SVG game icons, category filtering, and difficulty/play-time metadata, with lazy-loaded routing for performance.",
      "Implemented an AI opponent for Tic-Tac-Toe and a Sudoku puzzle generator with validation, deployed via a CI/CD pipeline to both Netlify and GitHub Pages through GitHub Actions.",
    ],
    links: [
      { label: "Live Demo", href: "https://aditya-dangi.github.io/Games/" },
      { label: "GitHub", href: "https://github.com/aditya-dangi/Games" },
    ],
  },
  {
    title: "Wordle",
    year: "2024",
    type: "Angular application",
    stack: ["Angular", "Signals", "CSS 3D", "localStorage"],
    image: "wordle-clone.jpg",
    description:
      "A full-stack-feeling Wordle platform built solo, migrated from vanilla JavaScript to a signals-based, standalone-component Angular architecture with zero backend — everything runs client-side via localStorage.",
    outcomes: [
      "Features 13 game modes (Classic, Blitz, Survival, Marathon, Reverse Mode, and multi-board variants) with full progression: XP, levels, streaks, achievements, and daily missions.",
      "Supports 5 themes and accessibility options including color-blind mode and reduced motion.",
      "Redesigned the UI into a dark, HUD-style aesthetic using CSS-only 3D (no WebGL) — pointer-reactive tilt cards, a rotating hero word-core, and procedural mode icons. Deployed on Netlify with SPA routing.",
    ],
    links: [
      { label: "Live Demo", href: "https://aditya-dangi.github.io/Wordle-Clone/" },
      { label: "GitHub", href: "https://github.com/aditya-dangi/Wordle-Clone" },
    ],
  },
  {
    title: "Fyle Digital Agency",
    year: "2024",
    type: "Deployed frontend",
    stack: ["HTML5", "CSS3", "JavaScript", "jQuery", "Swiper.js"],
    image: "fyle-project.jpg",
    description:
      "A responsive marketing landing page for a digital agency, rebuilt from a basic static template into a modern, premium web experience.",
    outcomes: [
      "Built a sticky glassmorphic navigation bar, an animated hero section with gradient accents, an interactive service carousel, and hover-responsive project/testimonial cards.",
      "Implemented scroll-triggered reveal animations, staggered grid transitions, and full mobile-first responsiveness, alongside a smooth animated contact-form modal.",
      "Respected accessibility standards including prefers-reduced-motion and touch-device interaction handling, with lightweight, dependency-free CSS animations for performance.",
    ],
    links: [
      { label: "Live Demo", href: "https://fyle-assignment-project.netlify.app" },
      { label: "GitHub", href: "https://github.com/Aditya-Dangi/Fyle-Assignment-Project" },
    ],
  },
];

export const achievements = [
  "Solved 500+ DSA problems across LeetCode and Code 360, including 150+ medium-level problems and a 100-day streak.",
  "Completed Full Stack Web Development and Java Data Structures & Algorithms certifications on Udemy.",
  "Bachelor of Technology in Information Technology from Bhagwan Parshuram Institute of Technology, CGPA 8.75/10.",
];
