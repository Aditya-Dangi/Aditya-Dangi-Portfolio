/**
 * Rich technology registry for the Skills section's orbit + detail panel.
 *
 * Every claim below is traceable to `data/portfolio.js` (experience impact
 * bullets, project stacks, achievements) — nothing here is a generic
 * "expert in everything" placeholder. Ratings are capped at 4/5 ("Advanced")
 * to stay honest about a 1+ year, early-career profile; nothing is marked
 * "Expert".
 *
 * Two independent groupings per technology:
 * - `ring`   — which orbit ring it renders in (visual density only)
 * - `category` — Backend / Frontend / Database / DevOps / Engineering, used
 *   by the recruiter-friendly bottom overview and the ring accent colour
 */

export const CATEGORIES = ["Backend", "Frontend", "Database", "DevOps", "Engineering"];

export const CATEGORY_INFO = {
  Backend: "Services, security and data access, built with Java and Spring.",
  Frontend: "Interfaces and state, built with Angular, RxJS and TypeScript.",
  Database: "Relational schema design and querying with SQL.",
  DevOps: "Version control, containers and the daily delivery toolchain.",
  Engineering: "The fundamentals everything above is built on.",
};

export const RINGS = [
  { id: "core", label: "Core Stack", items: ["Java", "Spring Boot", "Angular", "SQL"] },
  {
    id: "backend",
    label: "Backend",
    items: ["Spring Security", "Hibernate", "JPA", "REST APIs", "JWT", "Swagger/OpenAPI"],
  },
  { id: "frontend", label: "Frontend", items: ["TypeScript", "RxJS", "HTML", "CSS"] },
  {
    id: "devops",
    label: "DevOps & Tools",
    items: ["Git", "GitHub", "Docker", "Maven", "Postman", "PostgreSQL", "MySQL"],
  },
  {
    id: "engineering",
    label: "Engineering",
    items: ["OOP", "Data Structures", "Algorithms", "Debugging", "Agile", "SDLC"],
  },
];

/** @typedef {{level:number, levelLabel:string, category:string, focus:string, experience:string[], expertise:string[], usedIn:string[], related:string[]}} TechEntry */

/** @type {Record<string, TechEntry>} */
export const TECHNOLOGIES = {
  Java: {
    level: 4,
    levelLabel: "Advanced",
    category: "Backend",
    focus: "Core Backend Language",
    experience: ["1+ years building production services in enterprise environments"],
    expertise: ["OOP Design", "Collections & Streams", "Exception Handling", "Multithreading Basics"],
    usedIn: ["CoPad — Newgen Software", "AI-Powered Credit Card Fraud Detection System"],
    related: ["Spring Boot", "Hibernate", "SQL"],
  },
  "Spring Boot": {
    level: 4,
    levelLabel: "Advanced",
    category: "Backend",
    focus: "Enterprise Backend Development",
    experience: ["Built a layered fraud-operations platform using clean architecture principles"],
    expertise: ["Spring MVC", "Spring Security", "Spring Data JPA", "REST Controllers", "Validation", "Maven"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["Java", "Spring Security", "Hibernate", "Docker"],
  },
  Angular: {
    level: 4,
    levelLabel: "Advanced",
    category: "Frontend",
    focus: "Frontend Development",
    experience: ["Migrated a production platform from Angular 8 to Angular 15"],
    expertise: ["Component Architecture", "Reactive Forms", "Routing & Guards", "Responsive Layouts"],
    usedIn: ["CoPad — Newgen Software", "Fitness Exercises Application"],
    related: ["TypeScript", "RxJS", "HTML", "CSS"],
  },
  SQL: {
    level: 4,
    levelLabel: "Advanced",
    category: "Database",
    focus: "Relational Data & Persistence",
    experience: ["Designs and queries relational schemas across production and personal projects"],
    expertise: ["Query Design", "Joins & Indexing", "Normalization"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["PostgreSQL", "MySQL", "Hibernate"],
  },
  "Spring Security": {
    level: 4,
    levelLabel: "Advanced",
    category: "Backend",
    focus: "Application Security",
    experience: ["Implemented JWT authentication and RBAC to protect fraud-review and card-blocking actions"],
    expertise: ["JWT Authentication", "Role-Based Access Control", "Auth Filters"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["Spring Boot", "JWT", "Java"],
  },
  Hibernate: {
    level: 3,
    levelLabel: "Intermediate",
    category: "Backend",
    focus: "ORM & Persistence",
    experience: ["Maps domain entities to relational storage in Spring Boot services"],
    expertise: ["Entity Mapping", "Lazy Loading", "JPA Repositories"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["JPA", "Spring Boot", "SQL"],
  },
  JPA: {
    level: 3,
    levelLabel: "Intermediate",
    category: "Backend",
    focus: "Data Access Layer",
    experience: ["Layers repository access beneath fraud scoring and admin workflows"],
    expertise: ["Spring Data JPA", "Query Methods", "Transactions"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["Hibernate", "Spring Boot", "SQL"],
  },
  "REST APIs": {
    level: 4,
    levelLabel: "Advanced",
    category: "Backend",
    focus: "Service Integration",
    experience: ["Documents and ships REST endpoints with Swagger/OpenAPI"],
    expertise: ["API Design", "Status Codes & Errors", "JSON Contracts"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System", "Fitness Exercises Application"],
    related: ["Swagger/OpenAPI", "Spring Boot", "Angular"],
  },
  JWT: {
    level: 4,
    levelLabel: "Advanced",
    category: "Backend",
    focus: "Authentication",
    experience: ["Implemented JWT-based authentication for fraud-review and admin actions"],
    expertise: ["Token Issuance", "Auth Guards", "Spring Security Integration"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["Spring Security", "Spring Boot"],
  },
  "Swagger/OpenAPI": {
    level: 3,
    levelLabel: "Intermediate",
    category: "Backend",
    focus: "API Documentation",
    experience: ["Documents REST contracts for team and client consumption"],
    expertise: ["OpenAPI Specs", "Interactive Docs"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["REST APIs", "Spring Boot"],
  },
  TypeScript: {
    level: 4,
    levelLabel: "Advanced",
    category: "Frontend",
    focus: "Typed Application Logic",
    experience: ["Resolved TypeScript issues while modernizing Angular modules across major versions"],
    expertise: ["Interfaces & Types", "Generics Basics", "Angular Integration"],
    usedIn: ["CoPad — Newgen Software", "Fitness Exercises Application"],
    related: ["Angular", "RxJS", "HTML"],
  },
  RxJS: {
    level: 4,
    levelLabel: "Advanced",
    category: "Frontend",
    focus: "Reactive Programming",
    experience: ["Built async data flows and loading/error states for third-party API integration"],
    expertise: ["Observables", "Operators", "Async Pipe"],
    usedIn: ["Fitness Exercises Application"],
    related: ["Angular", "TypeScript"],
  },
  HTML: {
    level: 3,
    levelLabel: "Intermediate",
    category: "Frontend",
    focus: "Markup & Structure",
    experience: ["Structures every deployed frontend project, from games to marketing UIs"],
    expertise: ["Semantic Markup", "Accessibility Basics", "Forms"],
    usedIn: ["Wordle Clone", "Interactive Games", "Fyle Project"],
    related: ["CSS", "Angular"],
  },
  CSS: {
    level: 3,
    levelLabel: "Intermediate",
    category: "Frontend",
    focus: "Styling & Layout",
    experience: ["Builds responsive layouts across deployed browser projects"],
    expertise: ["Flexbox & Grid", "Responsive Design", "Animations"],
    usedIn: ["Wordle Clone", "Interactive Games", "Fyle Project"],
    related: ["HTML", "Angular"],
  },
  Git: {
    level: 4,
    levelLabel: "Advanced",
    category: "DevOps",
    focus: "Version Control",
    experience: ["Uses branching workflows across every production and personal project"],
    expertise: ["Branching Strategies", "Merge Conflicts", "Rebasing"],
    usedIn: ["CoPad — Newgen Software", "Every personal project"],
    related: ["GitHub"],
  },
  GitHub: {
    level: 4,
    levelLabel: "Advanced",
    category: "DevOps",
    focus: "Collaboration & Hosting",
    experience: ["Hosts and ships every personal project publicly"],
    expertise: ["Pull Requests", "GitHub Pages Deployment", "Issue Tracking"],
    usedIn: ["Interactive Games", "Wordle Clone", "Fyle Project"],
    related: ["Git"],
  },
  Docker: {
    level: 3,
    levelLabel: "Intermediate",
    category: "DevOps",
    focus: "Containerization",
    experience: ["Containerized a full-stack platform for consistent local and environment setup"],
    expertise: ["Dockerfiles", "Multi-service Setup"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["Spring Boot", "Maven"],
  },
  Maven: {
    level: 3,
    levelLabel: "Intermediate",
    category: "DevOps",
    focus: "Build & Dependency Management",
    experience: ["Manages builds and dependencies for Java and Spring Boot services"],
    expertise: ["Dependency Management", "Build Lifecycle"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["Java", "Spring Boot"],
  },
  Postman: {
    level: 4,
    levelLabel: "Advanced",
    category: "DevOps",
    focus: "API Testing",
    experience: ["Validates REST endpoints and auth flows before frontend integration"],
    expertise: ["Request Collections", "Environment Variables", "Auth Testing"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System", "CoPad — Newgen Software"],
    related: ["REST APIs"],
  },
  PostgreSQL: {
    level: 3,
    levelLabel: "Intermediate",
    category: "Database",
    focus: "Relational Database",
    experience: ["Primary datastore for the fraud-operations platform"],
    expertise: ["Schema Design", "Queries & Indexing"],
    usedIn: ["AI-Powered Credit Card Fraud Detection System"],
    related: ["SQL", "Docker"],
  },
  MySQL: {
    level: 3,
    levelLabel: "Intermediate",
    category: "Database",
    focus: "Relational Database",
    experience: ["Relational database experience alongside PostgreSQL"],
    expertise: ["Schema Design", "Joins & Indexing"],
    usedIn: ["Personal & academic projects"],
    related: ["SQL", "PostgreSQL"],
  },
  OOP: {
    level: 4,
    levelLabel: "Advanced",
    category: "Engineering",
    focus: "Software Design Fundamentals",
    experience: ["Foundational to every Java and Angular codebase written"],
    expertise: ["Encapsulation", "Inheritance", "Polymorphism", "SOLID Basics"],
    usedIn: ["CoPad — Newgen Software", "AI-Powered Credit Card Fraud Detection System"],
    related: ["Java", "Angular"],
  },
  "Data Structures": {
    level: 4,
    levelLabel: "Advanced",
    category: "Engineering",
    focus: "Algorithmic Fundamentals",
    experience: ["Solved 500+ problems across LeetCode and Code 360, including a 100-day streak"],
    expertise: ["Arrays & Strings", "Trees & Graphs", "Hash Maps", "Stacks & Queues"],
    usedIn: ["LeetCode", "Code 360"],
    related: ["Algorithms"],
  },
  Algorithms: {
    level: 4,
    levelLabel: "Advanced",
    category: "Engineering",
    focus: "Problem Solving",
    experience: ["150+ medium-level problems solved as part of 500+ total across platforms"],
    expertise: ["Sorting & Searching", "Dynamic Programming Basics", "Complexity Analysis"],
    usedIn: ["LeetCode", "Code 360"],
    related: ["Data Structures"],
  },
  Debugging: {
    level: 4,
    levelLabel: "Advanced",
    category: "Engineering",
    focus: "Production Troubleshooting",
    experience: ["Supports UAT, production troubleshooting and validation testing at Newgen"],
    expertise: ["Root-Cause Analysis", "Log Analysis", "Cross-Environment Testing"],
    usedIn: ["CoPad — Newgen Software"],
    related: ["Java", "Angular"],
  },
  Agile: {
    level: 4,
    levelLabel: "Advanced",
    category: "Engineering",
    focus: "Delivery Process",
    experience: ["Collaborates with client stakeholders and QA through Agile delivery cycles"],
    expertise: ["Sprint Planning", "Stakeholder Collaboration", "UAT Cycles"],
    usedIn: ["CoPad — Newgen Software"],
    related: ["SDLC"],
  },
  SDLC: {
    level: 4,
    levelLabel: "Advanced",
    category: "Engineering",
    focus: "Engineering Process",
    experience: ["Owns features across the full lifecycle from design to deployment"],
    expertise: ["Requirements to Deployment", "Testing Environments", "Release Management"],
    usedIn: ["CoPad — Newgen Software"],
    related: ["Agile", "Debugging"],
  },
};

/** Flat, ring-ordered list of tech names — the single iteration source for the orbit. */
export const TECH_NAMES = RINGS.flatMap((ring) => ring.items);

export function getTech(name) {
  return TECHNOLOGIES[name];
}
