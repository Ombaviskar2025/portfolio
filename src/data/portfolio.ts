// Single source of truth. Every component reads from this file.
// Items marked TODO are things your resume didn't include — fill them in.

export const profile = {
  name: "Om Baviskar",
  firstName: "OM",
  lastName: "BAVISKAR",
  title: "Full-Stack Developer",
  tagline: "MERN stack · MCA student · Builds things that ship.",
  summary:
    "Full Stack Developer and MCA student with practical experience building and deploying production-ready MERN stack applications. Experienced in authentication, REST APIs, responsive UI and cloud deployment on Vercel and Render, with a strong foundation in Data Structures, OOP and Database Management Systems.",
  originalLabel: "A OM BAVISKAR ORIGINAL",
  email: "omrb2002@gmail.com",
  phone: "+91 8208942445",
  location: "Pune, India",
  github: "https://github.com/Ombaviskar2025",
  githubHandle: "Ombaviskar2025",
  // TODO: replace with your exact LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/ombaviskar2025",
  resume: "/assets/Om_Baviskar_Resume.pdf",
};

export type Project = {
  id: string;
  title: string;
  genre: string;
  date: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string; // gradient colours for the poster
  live?: string; // TODO: add live URLs
  repo?: string; // TODO: add repo URLs
};

export const projects: Project[] = [
  {
    id: "hrconnect",
    title: "HRConnect",
    genre: "Employee Management System",
    date: "Jan 2025",
    year: "2025",
    tagline: "A complete end-to-end MERN deployment.",
    description:
      "A production-grade full-stack CRUD application for managing employees, deployed across Vercel (frontend), Render (API) and MongoDB Atlas (database).",
    highlights: [
      "React/Vite frontend on Vercel, Node.js/Express API on Render, MongoDB Atlas as the NoSQL datastore.",
      "JWT authentication, role-based access control (RBAC) and protected REST routes.",
      "Resolved production CORS, SPA routing and environment-variable issues for a stable live deployment.",
      "Styled with Tailwind CSS and MUI for a responsive, accessible UI; wrote integration tests for critical API endpoints.",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB Atlas", "JWT", "RBAC", "Tailwind", "MUI", "Vercel", "Render"],
    accent: "from-cyan-400 via-sky-600 to-indigo-900",
  },
  {
    id: "ruh-dance",
    title: "Ruh Dance Production",
    genre: "Events & Media Platform",
    date: "Jun 2025",
    year: "2025",
    tagline: "Event showcase meets secure full-stack engineering.",
    description:
      "A full-stack web application for a dance production company, featuring an event showcase and media gallery, built with React.js and Node.js/Express.js.",
    highlights: [
      "Architected and deployed the full-stack app: React.js frontend, Node.js/Express.js backend.",
      "JWT-based authentication with refresh token rotation, enforcing API security and session integrity across protected routes.",
      "Designed RESTful endpoints with structured error handling and input validation.",
      "Git version control with agile sprint cycles and issue tracking on GitHub Projects.",
    ],
    stack: ["React", "Node.js", "Express", "JWT", "REST APIs", "Git", "GitHub Projects"],
    accent: "from-amber-300 via-orange-500 to-rose-900",
  },
];

export type Episode = { title: string; meta: string; blurb: string };
export type Season = { number: number; title: string; years: string; episodes: Episode[] };

export const seasons: Season[] = [
  {
    number: 1,
    title: "The Foundations",
    years: "2022 – 2025",
    episodes: [
      {
        title: "Bachelor of Computer Applications",
        meta: "G.H. Raisoni College of Engineering, Jalgaon · 7.67 / 10",
        blurb: "Built the base: Data Structures, OOP, DBMS and the first full-stack projects.",
      },
      {
        title: "Meta Front-End Developer Certificate",
        meta: "Certification",
        blurb: "Went deep on React and modern front-end practice.",
      },
      {
        title: "HackerRank SQL — Gold Badge",
        meta: "Certification",
        blurb: "Query writing and optimisation practice, earning the Gold badge.",
      },
    ],
  },
  {
    number: 2,
    title: "Going Full-Stack",
    years: "2025",
    episodes: [
      {
        title: "HRConnect ships to production",
        meta: "Jan 2025",
        blurb: "First complete MERN deployment: Vercel + Render + MongoDB Atlas, with auth and RBAC.",
      },
      {
        title: "Ruh Dance Production goes live",
        meta: "Jun 2025",
        blurb: "Refresh-token rotation, REST API design and agile sprints on GitHub Projects.",
      },
      {
        title: "TCS iON National Qualifier Test (NQT)",
        meta: "Certification",
        blurb: "Benchmarked core aptitude and programming skills at national level.",
      },
    ],
  },
  {
    number: 3,
    title: "The Master's Chapter",
    years: "2025 – 2027",
    episodes: [
      {
        title: "Master of Computer Applications",
        meta: "M.E. Society's IMCC, Kothrud, Pune",
        blurb: "Currently deepening systems, software engineering and applied AI.",
      },
      {
        title: "Getting Started with AI — AI Fundamentals",
        meta: "Certification",
        blurb: "Foundations of AI, the starting point for what's next.",
      },
    ],
  },
];

export type SkillGroup = { genre: string; icon: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { genre: "Languages", icon: "{ }", skills: ["JavaScript", "Java", "Python", "PHP", "SQL"] },
  { genre: "Frontend", icon: "◧", skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"] },
  { genre: "Backend", icon: "⚙", skills: ["Node.js", "Express.js", "REST APIs", "JWT", "API Security"] },
  { genre: "Databases", icon: "▤", skills: ["MongoDB", "MySQL", "SQL Query Optimisation"] },
  { genre: "DevOps & Tools", icon: "⇄", skills: ["Git", "GitHub", "GitHub Actions (CI/CD)", "Vercel", "Render"] },
];

// "Top 10" row — your strongest skills, ranked.
export const topPicks = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JavaScript",
  "REST APIs",
  "JWT Auth",
  "SQL",
  "Tailwind CSS",
  "Git & CI/CD",
];

export const certifications = [
  { title: "TCS iON National Qualifier Test (NQT)", issuer: "TCS iON" },
  { title: "SQL — Gold Badge", issuer: "HackerRank" },
  { title: "Front-End Developer Certificate", issuer: "Meta" },
  { title: "Getting Started with AI — AI Fundamentals", issuer: "AI Fundamentals" },
];

export const stats = [
  { label: "Production apps shipped", value: "2" },
  { label: "Certifications", value: "4" },
  { label: "Core stack", value: "MERN" },
];

// "Who's watching?" — only changes section order.
export type ViewerId = "recruiter" | "developer" | "creative";
export type SectionId = "about" | "originals" | "journey" | "toppicks" | "skills" | "certs";

export const viewerProfiles: {
  id: ViewerId;
  name: string;
  blurb: string;
  color: string;
  emoji: string;
  order: SectionId[];
}[] = [
  {
    id: "recruiter",
    name: "Recruiter",
    blurb: "Journey & credentials first",
    color: "bg-cyan-500",
    emoji: "💼",
    order: ["about", "journey", "originals", "certs", "toppicks", "skills"],
  },
  {
    id: "developer",
    name: "Developer",
    blurb: "Projects & stack first",
    color: "bg-amber-400",
    emoji: "⌨️",
    order: ["originals", "skills", "toppicks", "about", "journey", "certs"],
  },
  {
    id: "creative",
    name: "Explorer",
    blurb: "Just let me browse",
    color: "bg-fuchsia-500",
    emoji: "🎬",
    order: ["about", "originals", "toppicks", "journey", "skills", "certs"],
  },
];

export const introSlides = [
  { kicker: "Full-Stack Developer", text: "MERN apps, from database to deployment." },
  { kicker: "Production-minded", text: "JWT auth, RBAC and refresh-token rotation done properly." },
  { kicker: "Shipped", text: "Live on Vercel, Render and MongoDB Atlas." },
  { kicker: "Now streaming", text: "MCA student at IMCC Pune, 2025 – 2027." },
];

// "Continue Watching" — real timeline progress. `progress` is 0-100.
// MCA progress is computed from its dates (Aug 2025 → Jun 2027).
const mcaStart = new Date("2025-08-01").getTime();
const mcaEnd = new Date("2027-06-30").getTime();
const mcaProgress = Math.max(
  0,
  Math.min(100, Math.round(((Date.now() - mcaStart) / (mcaEnd - mcaStart)) * 100)),
);

export const continueWatching = [
  { title: "MCA — IMCC Pune", sub: "2025 – 2027 · In progress", progress: mcaProgress, accent: "from-cyan-500 to-indigo-900" },
  { title: "HRConnect", sub: "Original · Jan 2025", progress: 100, accent: "from-sky-500 to-blue-900" },
  { title: "Ruh Dance Production", sub: "Original · Jun 2025", progress: 100, accent: "from-amber-400 to-rose-900" },
  { title: "BCA — G.H. Raisoni", sub: "2022 – 2025 · 7.67 / 10", progress: 100, accent: "from-emerald-400 to-teal-900" },
];

// "Where it's used" notes, shown when a skill is selected. Based on your resume projects.
export const skillEvidence: Record<string, string> = {
  "React.js": "HRConnect (React/Vite on Vercel) and Ruh Dance Production frontend.",
  "Next.js": "Listed on your resume. Add the project where you used it.",
  "Tailwind CSS": "Styling HRConnect, alongside MUI.",
  "Responsive Design": "Responsive, accessible UI across HRConnect.",
  "Node.js": "Backend runtime for HRConnect (Render) and Ruh Dance Production.",
  "Express.js": "REST APIs with structured error handling and input validation.",
  "REST APIs": "Protected REST routes in HRConnect; RESTful endpoints in Ruh Dance Production.",
  JWT: "JWT auth in both projects, with refresh token rotation in Ruh Dance Production.",
  "API Security": "RBAC, protected routes and session integrity checks.",
  MongoDB: "MongoDB Atlas as the NoSQL datastore for HRConnect.",
  MySQL: "Relational database coursework and practice.",
  "SQL Query Optimisation": "Backed by your HackerRank SQL Gold badge.",
  SQL: "HackerRank SQL Gold badge.",
  Git: "Version control with agile sprints on both projects.",
  GitHub: "Issue tracking on GitHub Projects (Ruh Dance Production).",
  "GitHub Actions (CI/CD)": "Automated build and deploy workflows.",
  Vercel: "Production hosting for the HRConnect frontend.",
  Render: "Production hosting for the HRConnect Node/Express API.",
  JavaScript: "Primary language across both MERN projects.",
  Java: "Core OOP and Data Structures coursework.",
  Python: "Scripting and AI Fundamentals coursework.",
  PHP: "Web development coursework.",
  HTML5: "Semantic markup for all frontends.",
  CSS3: "Layouts and styling across all projects.",
};
