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
      "Delivered production-ready features across 10 releases for settlement operations and trade-review workflows.",
      "Modernized legacy Angular modules from Angular 8 to Angular 15, resolving issues across data tables, PDF exports, TypeScript, and dependency upgrades.",
      "Designed dashboard workflows for business-day ageing, advanced filtering, and search to help Citi EMEA teams review settlement records faster.",
      "Built an Excel upload flow that parses trade ID spreadsheets, queries matching records through existing APIs, and automates bulk export generation.",
      "Supported UAT, production troubleshooting, validation testing, and deployments across multiple testing environments.",
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
      "Implemented JWT authentication and RBAC with Spring Security to protect fraud-review and card-blocking actions.",
      "Documented REST APIs with Swagger/OpenAPI and containerized the app for consistent local and environment setup.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Aditya-Dangi/AI-Credit_Card-Fraud_Detection",
      },
    ],
  },
  {
    title: "Fitness Exercises Application",
    year: "2025",
    type: "Angular application",
    stack: ["Angular 15", "RxJS", "RapidAPI", "TypeScript"],
    image: "fitness-exercises-app.jpg",
    description:
      "A responsive exercise discovery app with real-time search, category filtering, reusable components, and resilient API states.",
    outcomes: [
      "Integrated third-party exercise data across 100+ workout categories with routing, shared services, and RxJS-driven async flows.",
      "Added loading and error states to keep the interface responsive and maintainable under unreliable API responses.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Aditya-Dangi/Fitness-Web-App",
      },
    ],
  },
  {
    title: "Interactive Games",
    year: "2024",
    type: "Deployed frontend",
    stack: ["JavaScript", "HTML", "CSS", "Responsive UI"],
    image: "game.jpg",
    description:
      "A polished browser-based collection featuring Hangman, Bubble Game, and Stone Paper Scissors with interactive UI states.",
    outcomes: [
      "Built multiple game flows with responsive layouts, browser event handling, and state-driven interactions.",
    ],
    links: [
      { label: "Live Demo", href: "https://aditya-dangi.github.io/Games/" },
      { label: "GitHub", href: "https://github.com/aditya-dangi/Games" },
    ],
  },
  {
    title: "Wordle Clone",
    year: "2024",
    type: "Deployed frontend",
    stack: ["JavaScript ES6+", "HTML", "CSS"],
    image: "wordle-clone.jpg",
    description:
      "A responsive Wordle-style game with added features and maintainable JavaScript logic.",
    outcomes: [
      "Implemented keyboard input, validation feedback, and replayable game state using modern JavaScript patterns.",
    ],
    links: [
      { label: "Live Demo", href: "https://aditya-dangi.github.io/Wordle-Clone/" },
      { label: "GitHub", href: "https://github.com/aditya-dangi/Wordle-Clone" },
    ],
  },
  {
    title: "Fyle Project",
    year: "2024",
    type: "Deployed UI assignment",
    stack: ["HTML5", "CSS", "JavaScript", "jQuery", "Bootstrap"],
    image: "fyle-project.jpg",
    description:
      "A dynamic marketing-style interface with navigation interactions and carousel functionality.",
    outcomes: [
      "Integrated Swiper.js and Bootstrap patterns to deliver a responsive, production-like frontend assignment.",
    ],
    links: [
      { label: "Live Demo", href: "https://fyle-assignment-project.netlify.app" },
      { label: "GitHub", href: "https://github.com/Aditya-Dangi/Fyle-Assignment-Project" },
    ],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    group: "Backend",
    items: [
      "Spring Boot",
      "Spring Security",
      "Hibernate",
      "JPA",
      "REST APIs",
      "JWT",
      "Swagger/OpenAPI",
    ],
  },
  {
    group: "Frontend",
    items: ["Angular", "RxJS", "Responsive UI", "Component Architecture"],
  },
  {
    group: "Databases & Tools",
    items: ["PostgreSQL", "MySQL", "Docker", "Maven", "Git", "Postman"],
  },
  {
    group: "Engineering",
    items: ["OOP", "Data Structures", "Algorithms", "Debugging", "Agile", "SDLC"],
  },
];

export const achievements = [
  "Solved 500+ DSA problems across LeetCode and Code 360, including 150+ medium-level problems and a 100-day streak.",
  "Completed Full Stack Web Development and Java Data Structures & Algorithms certifications on Udemy.",
  "Bachelor of Technology in Information Technology from Bhagwan Parshuram Institute of Technology, CGPA 8.75/10.",
];
