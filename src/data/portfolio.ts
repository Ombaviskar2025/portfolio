export const profile = {
  name: "Om Baviskar",
  firstName: "OM",
  lastName: "BAVISKAR",
  title: "Full-Stack Developer",
  tagline: "MERN stack · MCA student · Builds things that ship.",
  summary: "Full-stack developer and MCA student who builds and deploys production-ready MERN apps, with JWT auth, REST APIs, responsive UI and cloud deployment on Vercel and Render.",
  aboutP1: "I'm Om, a full-stack developer and MCA student based in Pune. I build and deploy production-ready MERN applications, and I care about the parts people skip: authentication, input validation, error handling and getting the thing live without CORS surprises.",
  aboutP2: "My foundation is Data Structures, OOP and Database Management Systems. On top of that I work with JavaScript, React.js, Node.js, Express.js, MongoDB, Java, SQL and Git, and I ship with Vercel and Render.",
  email: "omrb2002@gmail.com",
  phone: "+91 8208942445",
  location: "Pune, India",
  github: "https://github.com/Ombaviskar2025",
  githubHandle: "Ombaviskar2025",
  linkedin: "https://www.linkedin.com/in/Ombaviskar2025",
  resume: "/assets/Om_Baviskar_Resume.pdf",
};

export type Project = {
  id: string; cls: string; glyph: string; title: string; when: string;
  line: string; tech: string[]; link: string; linkLabel: string; role: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    id: "ruh", cls: "p-ruh", glyph: "RUH", title: "Ruh Dance Production",
    when: "JUN 2025", line: "Event showcase and media gallery for a dance production.",
    tech: ["React.js", "Node.js", "Express.js", "JWT", "REST API", "Git"],
    link: "https://ruhdance.vercel.app/", linkLabel: "Visit live site",
    role: "Full-stack developer",
    bullets: [
      "Architected and deployed a full-stack web app with React.js on the frontend and Node.js/Express.js on the backend, featuring an event showcase and media gallery.",
      "Implemented JWT authentication with refresh token rotation, enforcing API security and session integrity across protected routes.",
      "Designed RESTful endpoints with structured error handling and input validation; used Git with agile sprint cycles and issue tracking on GitHub Projects."
    ]
  },
  {
    id: "hr", cls: "p-hr", glyph: "HR", title: "HRConnect",
    when: "JAN 2025", line: "Employee management system with role-based access.",
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB Atlas", "Tailwind CSS", "MUI", "JWT", "RBAC"],
    link: "https://employee-management-system-eosin-six.vercel.app/dashboard",
    linkLabel: "Open live dashboard", role: "Full-stack developer",
    bullets: [
      "Built a production-grade CRUD application with React/Vite on Vercel and Node.js/Express on Render, using MongoDB Atlas as the datastore.",
      "Implemented JWT authentication, role-based access control (RBAC) and protected REST routes; resolved production CORS, SPA routing and environment variable issues.",
      "Styled with Tailwind CSS and MUI for a responsive, accessible UI; wrote integration tests for critical API routes."
    ]
  }
];

export type Cert = { eb: string; t: string; sub: string; p: string };
export const certs: Cert[] = [
  { eb: "National test", t: "TCS iON NQT", sub: "National Qualifier Test", p: "Cleared the TCS iON National Qualifier Test." },
  { eb: "Gold badge", t: "SQL Gold", sub: "HackerRank", p: "Earned the HackerRank SQL Gold badge." },
  { eb: "Certificate", t: "Front-End Developer", sub: "Meta", p: "Completed the Meta Front-End Developer Certificate." },
  { eb: "Fundamentals", t: "AI Fundamentals", sub: "Getting Started with AI", p: "Finished Getting Started with AI." }
];

export const CORE: Record<string, number> = {
  JavaScript: 1, "React.js": 1, "Node.js": 1, "Express.js": 1, MongoDB: 1, Java: 1, SQL: 1, Git: 1
};

export type SkillCategory = { k: string; d: string; items: string[] };
export const skillCategories: SkillCategory[] = [
  { k: "Languages", d: "Five languages, JavaScript first", items: ["JavaScript", "Java", "Python", "PHP", "SQL"] },
  { k: "Frontend", d: "Interfaces that work on every screen", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"] },
  { k: "Backend", d: "Servers, APIs and security", items: ["Node.js", "Express.js", "REST APIs", "JWT", "API Security"] },
  { k: "Databases", d: "Storing and querying data", items: ["MongoDB", "MySQL", "SQL Query Optimisation"] },
  { k: "DevOps & Tools", d: "Shipping and collaboration", items: ["Git", "GitHub", "GitHub Actions", "Vercel", "Render"] }
];

export type TopPick = { title: string; desc: string };
export const topPicks: TopPick[] = [
  { title: "End-to-end MERN deployments", desc: "React, Node, Express and MongoDB Atlas, live on Vercel and Render." },
  { title: "JWT auth and RBAC", desc: "Refresh token rotation, role-based access and protected routes." },
  { title: "Clean REST APIs", desc: "Structured error handling and input validation on every endpoint." },
  { title: "Production debugging", desc: "Fixed real CORS, SPA routing and environment-variable problems." },
  { title: "SQL Gold Badge", desc: "HackerRank SQL Gold, plus MySQL query optimisation." }
];

export type Episode = { n: string; t: string; d: string; g: string; s: string };
export const episodes: Episode[] = [
  { n: "01", t: "My Projects", d: "Two live originals", g: "g1", s: "originals" },
  { n: "02", t: "About Me", d: "Who is behind the code", g: "g2", s: "about" },
  { n: "03", t: "My Journey", d: "BCA to MCA, season by season", g: "g3", s: "journey" },
  { n: "04", t: "Top Picks", d: "Five things to know first", g: "g4", s: "picks" },
  { n: "05", t: "Top Moments", d: "Badges and certificates", g: "g5", s: "moments" },
  { n: "06", t: "Skill Universe", d: "Languages to DevOps", g: "g6", s: "skills" },
  { n: "07", t: "The Full Story", d: "Resume on one page", g: "g7", s: "resume" }
];

export type SectionId = "journey" | "picks" | "originals" | "moments" | "about" | "skills" | "resume";

export type ViewerProfile = {
  id: ViewerId; name: string; desc: string; cls: string;
  glyph: string; badge?: string;
  order: SectionId[];
  msg: string; primary: string; secondary: string;
  secTo: string; priTo?: string;
};
export type ViewerId = "om" | "recruiter" | "developer" | "creative";

export const viewerProfiles: ViewerProfile[] = [
  {
    id: "om", name: "Om", desc: "The full series, in order", cls: "t-om",
    glyph: "O", badge: "MAIN",
    order: ["journey", "picks", "originals", "moments", "about", "skills", "resume"],
    msg: "the full series, in order", primary: "Play intro", secondary: "My Work", secTo: "originals"
  },
  {
    id: "recruiter", name: "Recruiter", desc: "Resume, achievements & skills first", cls: "t-rec",
    glyph: "R",
    order: ["resume", "moments", "skills", "about", "originals", "picks", "journey"],
    msg: "resume, achievements and skills first", primary: "See the resume", secondary: "Let's talk",
    secTo: "contact", priTo: "resume"
  },
  {
    id: "developer", name: "Developer", desc: "Projects, stack & GitHub first", cls: "t-dev",
    glyph: "</>",
    order: ["originals", "skills", "picks", "resume", "about", "journey", "moments"],
    msg: "projects and stack first", primary: "See projects", secondary: "Play intro",
    secTo: "trailer", priTo: "originals"
  },
  {
    id: "creative", name: "Creative", desc: "The story arc & highlights first", cls: "t-cre",
    glyph: "✦",
    order: ["journey", "moments", "originals", "about", "picks", "skills", "resume"],
    msg: "the story arc and highlights first", primary: "Play intro", secondary: "My Work", secTo: "originals"
  }
];

export const trailerScenes = [
  ["Now streaming", "Om Baviskar"],
  ["The Series", "Full-stack · MERN"],
  ["Season 1", "Two apps shipped to production"],
  ["Season 2", "MCA · IMCC Pune"],
  ["Skills", "React · Node · Express · MongoDB"],
  ["Coming soon", "Your project, next"]
];

export const stats = [
  { label: "Live full-stack originals", value: "2" },
  { label: "Certifications and badges", value: "4" },
  { label: "BCA score out of 10", value: "7.67" },
  { label: "MCA graduation year", value: "2027" }
];

// Resume text for copy
export function getResumeText(): string {
  return `OM BAVISKAR
Full-stack developer and MCA student · Pune, India
omrb2002@gmail.com · +91 8208942445

PROJECTS
Ruh Dance Production (Jun 2025): React.js, Node.js/Express.js, JWT with refresh token rotation, REST API, event showcase and media gallery. https://ruhdance.vercel.app/
HRConnect, Employee Management System (Jan 2025): React/Vite on Vercel, Node/Express on Render, MongoDB Atlas, JWT, RBAC, Tailwind CSS, MUI. https://employee-management-system-eosin-six.vercel.app/dashboard

EDUCATION
MCA, M.E. Society's IMCC, Kothrud, Pune (2025-2027)
BCA, G.H. Raisoni College of Engineering, Jalgaon (2022-2025), 7.67/10

SKILLS
${skillCategories.map(c => c.k + ": " + c.items.join(", ")).join("\n")}

CERTIFICATES
TCS iON National Qualifier Test (NQT)
HackerRank SQL Gold Badge
Meta Front-End Developer Certificate
Getting Started with AI, AI Fundamentals`;
}
