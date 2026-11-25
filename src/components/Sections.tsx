import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  profile,
  projects,
  certs,
  CORE,
  skillCategories,
  topPicks,
  stats,
  trailerScenes,
  getResumeText,
  episodes,
  type Project,
} from "../data/portfolio";

const wrap = "mx-auto max-w-[1280px] px-4 md:px-6";

/* ─── helpers ─── */
function toast(msg: string) {
  let t = document.getElementById("om-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "om-toast";
    t.style.cssText =
      "position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:#fff;color:#000;font-weight:600;font-size:13.5px;padding:11px 18px;border-radius:8px;z-index:130;opacity:0;pointer-events:none;transition:.3s;max-width:calc(100% - 32px)";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  t.style.transform = "translate(-50%,0)";
  clearTimeout((t as any)._t);
  (t as any)._t = setTimeout(() => {
    t!.style.opacity = "0";
    t!.style.transform = "translate(-50%,20px)";
  }, 2400);
}

function copyText(txt: string, msg?: string) {
  navigator.clipboard.writeText(txt).catch(() => {
    const a = document.createElement("textarea");
    a.value = txt;
    a.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(a);
    a.select();
    document.execCommand("copy");
    a.remove();
  });
  toast(msg || "Copied");
}

function initials(s: string) {
  const w = s.replace(/\.js$/i, "").split(/[\s.]+/);
  return (w.length > 1 ? w[0][0] + w[1][0] : s.slice(0, 2)).toUpperCase();
}

/* ─── Journey ─── */
export function Journey() {
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="journey" data-sec="journey">
      <div className="eyebrow">Episode 03</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">My Journey</h2>
      <p className="mb-8 max-w-[620px] text-muted">
        Two seasons so far: a BCA that turned into two shipped apps, and an MCA that is still airing.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {/* Season 1 */}
        <div className="rounded-[14px] border border-line bg-panel p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red2">Season 1</h3>
          <h4 className="mt-1.5 text-[22px] font-bold tracking-tight">BCA · G.H. Raisoni College of Engineering, Jalgaon</h4>
          <div className="text-[13px] text-muted">2022 – 2025 · 7.67 / 10</div>
          <ul className="mt-5 flex list-none flex-col gap-5 border-l-2 border-line pl-5">
            {[
              { year: "2022", title: "Pilot", desc: "Starts the Bachelor of Computer Applications. Builds the base in data structures, OOP and databases." },
              { year: "Jan 2025", title: "HRConnect goes live", desc: "Ships a MERN employee management system: Vercel frontend, Render API, MongoDB Atlas." },
              { year: "Jun 2025", title: "Ruh Dance Production goes live", desc: "Deploys an event showcase and media gallery with JWT refresh-token rotation." },
              { year: "2025", title: "Season finale", desc: "Graduates with a BCA, 7.67 / 10." },
            ].map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-red bg-bg" />
                <time className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{item.year}</time>
                <b className="mt-0.5 block">{item.title}</b>
                <span className="text-[13.5px] text-muted">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Season 2 */}
        <div className="rounded-[14px] border border-line bg-panel p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red2">Season 2 · Now airing</h3>
          <h4 className="mt-1.5 text-[22px] font-bold tracking-tight">MCA · M.E. Society's IMCC, Kothrud, Pune</h4>
          <div className="text-[13px] text-muted">2025 – 2027</div>
          <ul className="mt-5 flex list-none flex-col gap-5 border-l-2 border-line pl-5">
            {[
              { year: "2025 – Now", title: "Master of Computer Applications", desc: "Deepening Data Structures, OOP and DBMS while building full-stack projects.", now: true },
              { year: "Ongoing", title: "Certifications", desc: "TCS iON NQT, HackerRank SQL Gold, Meta Front-End Developer, AI Fundamentals." },
              { year: "2027", title: "Next episode", desc: "Graduating with an MCA and looking for a full-stack developer role." },
            ].map((item) => (
              <li key={item.title} className="relative">
                <span className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-red ${item.now ? "bg-red shadow-[0_0_0_5px_rgba(229,9,20,0.25)]" : "bg-bg"}`} />
                <time className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{item.year}</time>
                <b className="mt-0.5 block">{item.title}</b>
                <span className="text-[13.5px] text-muted">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── Top Picks ─── */
export function TopPicks() {
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="picks" data-sec="picks">
      <div className="eyebrow">Episode 04</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">Top Picks For You</h2>
      <p className="mb-8 max-w-[620px] text-muted">The five things most worth knowing before you hire.</p>
      <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {topPicks.map((p, i) => (
          <div
            key={p.title}
            className="group relative min-h-[210px] overflow-hidden rounded-xl border border-line bg-panel p-4 pt-16 transition hover:-translate-y-1.5 hover:border-[#3b4454]"
          >
            <div className="outline-num absolute -top-2 left-2.5 font-display text-[104px] leading-none transition group-hover:[-webkit-text-stroke-color:#e50914]">
              {i + 1}
            </div>
            <b className="mb-1.5 block text-base leading-snug">{p.title}</b>
            <span className="text-[13px] text-muted">{p.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Originals ─── */
export function Originals({ onOpen, onContact }: { onOpen: (p: Project) => void; onContact: () => void }) {
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="originals" data-sec="originals">
      <div className="eyebrow">Episode 01</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">My Projects</h2>
      <p className="mb-8 max-w-[620px] text-muted">Two originals, both live. Open one for the full details.</p>
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpen(p)}
            className={`${p.cls} group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[14px] border border-white/10 p-[22px] text-left transition-all duration-300 sm:aspect-[3/4] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_26px_60px_rgba(0,0,0,0.7)]`}
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute left-[18px] right-[18px] top-[14px] font-display text-[clamp(90px,11vw,150px)] leading-[0.85] text-white/[0.17] [word-break:break-all]">
              {p.glyph}
            </span>
            <span className="relative text-[11px] font-bold tracking-[0.2em] opacity-85">{p.when} · ORIGINAL</span>
            <h3 className="disp relative mt-1.5 text-[clamp(34px,4vw,48px)] leading-[0.95]">{p.title}</h3>
            <p className="relative mt-2 max-w-[34ch] text-[13.5px] text-[#e3e6ec]">{p.line}</p>
            <span className="relative mt-3 flex flex-wrap gap-1.5">
              {p.tech.slice(0, 4).map((t) => (
                <i key={t} className="rounded-full bg-white/[0.16] px-2 py-0.5 text-[11px] not-italic">{t}</i>
              ))}
            </span>
          </button>
        ))}
        <button
          onClick={onContact}
          className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[14px] border-[1.5px] border-dashed border-[#3a4352] p-[22px] text-left transition sm:aspect-[3/4] hover:-translate-y-2"
          style={{ background: "repeating-linear-gradient(135deg,#10141b,#10141b 14px,#141a23 14px,#141a23 28px)" }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-muted">COMING SOON</span>
          <h3 className="disp mt-1.5 text-[clamp(34px,4vw,48px)] leading-[0.95]">Your project here</h3>
          <p className="mt-2 text-[13.5px] text-muted">The next episode could be yours. Tell me what you are building.</p>
        </button>
      </div>
    </section>
  );
}

/* ─── Moments (Certs) ─── */
export function Moments() {
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="moments" data-sec="moments">
      <div className="eyebrow">Awards Season</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">Top Moments</h2>
      <p className="mb-8 max-w-[620px] text-muted">Tests passed, badges earned and certificates finished.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certs.map((c) => (
          <div
            key={c.t}
            className="flex flex-col items-center rounded-[14px] border border-gold/45 bg-gradient-to-b from-[#1c1a14] to-[#0f0f10] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_0_1px_#d9ad54,0_24px_60px_rgba(217,173,84,0.18)]"
          >
            <span className="text-[34px] leading-none tracking-[-0.15em] text-gold">❨❩</span>
            <small className="mt-2 block text-[10px] font-bold uppercase tracking-[0.24em] text-gold">{c.eb.toUpperCase()}</small>
            <h3 className="disp mt-3 text-[32px] leading-[0.95]">{c.t}</h3>
            <em className="mt-1 text-[11.5px] font-bold uppercase not-italic tracking-[0.1em] text-gold">{c.sub}</em>
            <p className="mt-3 text-[13px] text-muted">{c.p}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 text-lg font-bold">
        Certified · 4 credentials <span className="font-medium text-muted">across testing, SQL, front-end and AI</span>
      </div>
    </section>
  );
}

/* ─── About ─── */
export function About({ onContact }: { onContact: () => void }) {
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="about" data-sec="about">
      <div className="eyebrow">Episode 02</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">About Me</h2>
      <div className="mt-8 grid gap-7 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-4 text-[16.5px] text-[#cdd3dd]">{profile.aboutP1}</p>
          <p className="mb-4 text-[16.5px] text-[#cdd3dd]">{profile.aboutP2}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[10px] border border-line bg-panel px-4 py-3.5">
                <b className="disp block text-[34px] leading-none text-white">{s.value}</b>
                <span className="text-xs text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="self-start rounded-[14px] border border-line bg-panel p-5">
          <h3 className="mb-3.5 text-lg font-bold">Get in touch</h3>
          {[
            { k: "Email", v: profile.email, copy: true },
            { k: "Phone", v: profile.phone, copy: true },
            { k: "Based in", v: profile.location },
            { k: "LinkedIn", v: "Ombaviskar2025", href: profile.linkedin },
          ].map((row, i) => (
            <div key={row.k} className={`flex items-center gap-3 py-2.5 text-sm ${i > 0 ? "border-t border-line" : ""}`}>
              <span className="w-[68px] shrink-0 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">{row.k}</span>
              {row.href ? (
                <a href={row.href} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 break-all text-white no-underline">{row.v}</a>
              ) : (
                <span className="min-w-0 flex-1 break-all text-white">{row.v}</span>
              )}
              {row.copy && (
                <button onClick={() => copyText(row.v, `Copied ${row.v}`)} className="shrink-0 rounded-[5px] bg-white/[0.08] px-2.5 py-1 text-[11.5px] font-bold transition hover:bg-white/[0.18]">
                  Copy
                </button>
              )}
            </div>
          ))}
          <div className="mt-4">
            <button onClick={onContact} className="w-full justify-center rounded-[6px] bg-red px-6 py-3 text-center font-bold text-white transition hover:bg-red2">
              Let's Build Something
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─── */
export function Skills() {
  const [curCat, setCurCat] = useState(0);
  const cat = skillCategories[curCat];
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="skills" data-sec="skills">
      <div className="eyebrow">Episode 06</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">My Skill Universe</h2>
      <p className="mb-8 max-w-[620px] text-muted">Pick a category. Stars mark the stack I use most in shipped projects.</p>
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto pb-1.5 md:flex-col md:gap-1.5 md:overflow-visible md:pb-0" role="tablist">
          {skillCategories.map((c, i) => (
            <button
              key={c.k}
              onClick={() => setCurCat(i)}
              role="tab"
              className={`shrink-0 rounded-lg border-b-[3px] px-4 py-3.5 text-left transition md:border-b-0 md:border-l-[3px] ${
                i === curCat
                  ? "border-red bg-panel2 text-fg"
                  : "border-transparent text-muted hover:bg-panel hover:text-fg"
              }`}
            >
              <b className="disp block text-[26px] leading-tight">{c.k}</b>
              <span className="hidden text-xs md:block">{c.items.length} skills · {c.d}</span>
            </button>
          ))}
        </div>
        <div className="min-w-0">
          <div className="mb-3.5 flex flex-wrap justify-between gap-3.5 text-[13px] text-muted">
            <b className="text-[15px] text-white">{cat.k}</b>
            <span>{cat.items.length} skills</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cat.items.map((s, i) => (
              <div
                key={s}
                className="relative rounded-[10px] border border-line bg-panel p-4 transition hover:-translate-y-0.5 hover:border-red"
                style={{ animation: `fade 0.4s ${i * 40}ms both` }}
              >
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#6e0a12] to-red text-[13px] font-extrabold">
                  {initials(s)}
                </div>
                <b className="text-sm">{s}</b>
                {CORE[s] && <span className="absolute right-3 top-3 text-[9.5px] font-extrabold tracking-[0.1em] text-gold">★ CORE</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Resume ─── */
export function Resume() {
  return (
    <section className={`${wrap} py-[clamp(44px,7vw,84px)]`} id="resume" data-sec="resume">
      <div className="eyebrow">The Screenplay</div>
      <h2 className="disp mt-3 text-[clamp(40px,6.4vw,78px)] text-white">The Full Story</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[14px] border border-line bg-panel p-[clamp(20px,3vw,34px)]">
          <h3 className="disp text-[clamp(30px,4vw,44px)]">{profile.name}</h3>
          <p className="mb-5 text-sm text-muted">Full-stack developer and MCA student · Pune, India</p>
          <h5 className="mb-2.5 mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-red2">Projects</h5>
          {projects.map((p) => (
            <div key={p.id} className="mb-4">
              <div className="flex flex-wrap justify-between gap-3">
                <b className="text-[15.5px]">{p.title}</b>
                <time className="whitespace-nowrap text-xs text-muted">{p.when}</time>
              </div>
              <ul className="mt-1.5 list-disc pl-[18px] text-[13.5px] text-[#c3c9d4]">
                {p.bullets.map((b) => <li key={b} className="mb-0.5">{b}</li>)}
              </ul>
            </div>
          ))}
          <h5 className="mb-2.5 mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-red2">Education</h5>
          <div className="mb-4">
            <div className="flex flex-wrap justify-between gap-3"><b className="text-[15.5px]">Master of Computer Applications (MCA)</b><time className="text-xs text-muted">2025 – 2027</time></div>
            <div className="text-[13.5px] text-muted">M.E. Society's IMCC, Kothrud, Pune</div>
          </div>
          <div className="mb-4">
            <div className="flex flex-wrap justify-between gap-3"><b className="text-[15.5px]">Bachelor of Computer Applications (BCA) · 7.67 / 10</b><time className="text-xs text-muted">2022 – 2025</time></div>
            <div className="text-[13.5px] text-muted">G.H. Raisoni College of Engineering, Jalgaon</div>
          </div>
        </div>
        <div className="flex flex-col gap-5 self-start">
          <div className="rounded-[14px] border-0 bg-gradient-to-br from-[#fff7d6] to-[#f2d780] p-5 text-[#1a1405]">
            <h3 className="disp mb-2 text-[26px] text-[#1a1405]">Every episode, on one page</h3>
            <p className="mb-4 text-sm text-[#3d3410]">Education, projects, skills and certifications in one place.</p>
            <button onClick={() => copyText(getResumeText(), "Resume text copied")} className="rounded-[6px] bg-[#1a1405] px-5 py-2 font-bold text-white">Copy resume text</button>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[{ v: "2", l: "Projects" }, { v: "4", l: "Certificates" }, { v: "5", l: "Skill areas" }].map((s) => (
                <div key={s.l} className="rounded-lg bg-black/[0.08] px-1 py-2 text-center">
                  <b className="disp block text-[30px] leading-none">{s.v}</b>
                  <span className="text-[10.5px] opacity-75">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[14px] border border-line bg-panel p-5">
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-red2">Skills</h4>
            {skillCategories.map((c) => (
              <div key={c.k} className="mb-2 flex gap-2.5 text-[13.5px]">
                <b className="w-24 shrink-0 text-white">{c.k}</b>
                <span className="text-[#c3c9d4]">{c.items.join(", ")}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[14px] border border-line bg-panel p-5">
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-red2">Certificates</h4>
            {certs.map((c) => (
              <div key={c.t} className="mb-2 text-[13.5px]">{c.t} · {c.sub}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Project Modal ─── */
export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const other = projects.find((p) => p.id !== project.id);
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/[0.78] px-4 pb-8 pt-[calc(30px+env(safe-area-inset-top,0px))]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[860px] overflow-hidden rounded-[14px] bg-[#141821] shadow-[0_30px_100px_#000]"
        initial={{ y: 24, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-3 top-3 z-[3] grid h-9 w-9 place-items-center rounded-full bg-black/70 text-lg" aria-label="Close">✕</button>
        <div className={`${project.cls} relative flex aspect-[16/11] items-end p-5 sm:aspect-[16/8] sm:p-6`}>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141821] via-transparent to-transparent" />
          <div className="relative z-[2]">
            <h2 className="disp text-[clamp(40px,7vw,76px)] text-white">{project.title}</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[6px] bg-fg px-5 py-2.5 font-bold text-black transition hover:bg-[#cfcfcf]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M7 4v16l13-8z" /></svg>
                {project.linkLabel}
              </a>
            </div>
          </div>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-[1.6fr_1fr]">
          <ul className="list-disc pl-[18px] text-[#cdd3dd]">
            {project.bullets.map((b) => <li key={b} className="mb-2">{b}</li>)}
          </ul>
          <div className="text-[13px] text-muted">
            <p className="mb-3"><b className="font-semibold text-white">Released:</b> {project.when.charAt(0) + project.when.slice(1).toLowerCase()}</p>
            <p className="mb-3"><b className="font-semibold text-white">Role:</b> {project.role}</p>
            <p className="mb-1.5"><b className="font-semibold text-white">Stack:</b></p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => <i key={t} className="rounded-full bg-white/[0.08] px-2.5 py-0.5 text-xs not-italic text-[#e5e8ee]">{t}</i>)}
            </div>
          </div>
        </div>
        {other && (
          <div className="px-6 pb-6">
            <h4 className="mb-3 text-lg font-bold">More like this</h4>
            <button
              onClick={() => { onClose(); setTimeout(() => document.getElementById("originals")?.scrollIntoView({ behavior: "smooth" }), 300); }}
              className={`${other.id === "ruh" ? "g1" : "g6"} relative flex aspect-[16/10] w-full max-w-[320px] flex-col justify-end overflow-hidden rounded-[10px] border border-white/[0.08] p-4 text-left`}
            >
              <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] opacity-85">ORIGINAL · {other.when}</span>
              <span className="disp mt-1 text-[30px] leading-none">{other.title}</span>
              <span className="mt-1 text-xs opacity-80">{other.line}</span>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Contact Modal ─── */
export function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const body = `Hi Om,\n\n${msg || "I'd like to talk about a project."}\n\n${name || "(your name)"}${email ? "\n" + email : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: msg,
          _subject: `Portfolio message from ${name}`,
          _replyto: email,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      toast("Message sent!");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/[0.78] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[520px] rounded-[14px] bg-[#141821] p-[30px] shadow-[0_30px_100px_#000]"
        initial={{ y: 24, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-lg" aria-label="Close">✕</button>
        <h2 className="disp text-[46px]">Let's Build</h2>
        <p className="mb-5 text-muted">Tell me what you're making. Send a message directly to {profile.email}.</p>
        {status === "idle" || status === "sending" ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3.5 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted">Your name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-line bg-[#0b0e14] px-3 py-3 text-white focus:border-transparent focus:outline-2 focus:outline-red" autoComplete="name" />
            </div>
            <div className="mb-3.5 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted">Your email</label>
              <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="rounded-lg border border-line bg-[#0b0e14] px-3 py-3 text-white focus:border-transparent focus:outline-2 focus:outline-red" autoComplete="email" />
            </div>
            <div className="mb-3.5 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted">Message</label>
              <textarea required value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} placeholder="I'd like to talk about…" className="rounded-lg border border-line bg-[#0b0e14] px-3 py-3 text-white focus:border-transparent focus:outline-2 focus:outline-red" />
            </div>
            <button type="submit" disabled={status === "sending"} className="rounded-[6px] bg-red px-6 py-3 font-bold text-white transition hover:bg-red2 disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        ) : status === "sent" ? (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm">
            <p className="font-semibold text-white">Message sent to {profile.email}!</p>
            <p className="mt-1 text-muted">Thanks for reaching out, {name}. I'll get back to you soon.</p>
            <button onClick={onClose} className="mt-4 rounded-[6px] bg-white px-5 py-2 font-bold text-black">Done</button>
          </div>
        ) : (
          <div className="mt-4 text-sm">
            <p className="mb-2 text-red2">Could not send automatically. You can copy or send it directly to <b className="text-white">{profile.email}</b>:</p>
            <textarea readOnly value={body} rows={6} className="mb-2.5 w-full rounded-lg border border-line bg-[#0b0e14] p-3 text-white" />
            <div className="flex flex-wrap gap-2.5">
              <button onClick={() => copyText(body, "Message copied")} className="rounded-[6px] bg-[rgba(109,109,110,0.55)] px-5 py-2.5 font-bold text-white">Copy message</button>
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's build something")}&body=${encodeURIComponent(body)}`} className="rounded-[6px] bg-red px-5 py-2.5 font-bold text-white no-underline">Open in mail app</a>
              <button onClick={() => setStatus("idle")} className="rounded-[6px] border border-line px-4 py-2.5 font-semibold text-muted hover:text-white">Try again</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Search Modal ─── */
export function SearchModal({ onClose, onOpenProject }: { onClose: () => void; onOpenProject: (p: Project) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  type SearchItem = { k: string; t: string; x: string; action: () => void };
  const index: SearchItem[] = [];
  episodes.forEach((e) => index.push({ k: "Episode", t: e.t, x: e.d, action: () => { onClose(); setTimeout(() => document.getElementById(e.s)?.scrollIntoView({ behavior: "smooth" }), 60); } }));
  projects.forEach((p) => index.push({ k: "Project", t: p.title, x: p.tech.join(" "), action: () => { onClose(); setTimeout(() => onOpenProject(p), 60); } }));
  skillCategories.forEach((c) => c.items.forEach((s) => index.push({ k: "Skill", t: s, x: c.k, action: () => { onClose(); setTimeout(() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), 60); } })));
  certs.forEach((c) => index.push({ k: "Certificate", t: `${c.t} · ${c.sub}`, x: "", action: () => { onClose(); setTimeout(() => document.getElementById("moments")?.scrollIntoView({ behavior: "smooth" }), 60); } }));

  const ql = q.trim().toLowerCase();
  const results = index.filter((i) => !ql || `${i.t} ${i.x} ${i.k}`.toLowerCase().includes(ql)).slice(0, 30);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const pick = (i: number) => { results[i]?.action(); };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/[0.78] pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="w-full max-w-[640px] overflow-hidden rounded-[14px] border border-line bg-[#141821] shadow-[0_30px_100px_#000]" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            else if (e.key === "Enter") pick(sel);
          }}
          placeholder="Search projects, skills, certificates…"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-lg text-white outline-0"
          autoComplete="off"
        />
        <div className="max-h-[55vh] overflow-y-auto">
          {results.length > 0 ? results.map((r, i) => (
            <button
              key={`${r.k}-${r.t}-${i}`}
              onClick={() => pick(i)}
              className={`flex w-full items-center gap-3 px-5 py-3 text-left ${i === sel ? "bg-panel2" : "hover:bg-panel2"}`}
            >
              <em className="w-[72px] shrink-0 text-[10px] font-extrabold uppercase tracking-[0.16em] text-red2 not-italic">{r.k}</em>
              <span>{r.t}</span>
            </button>
          )) : (
            <div className="p-5 text-muted">Nothing found. Try "React" or "JWT".</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Trailer ─── */
export function Trailer({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const run = (idx: number) => {
      if (idx >= trailerScenes.length) { onClose(); return; }
      setI(idx);
      timers.current.push(setTimeout(() => run(idx + 1), 2400));
    };
    run(0);
    return () => timers.current.forEach(clearTimeout);
  }, [onClose]);

  const scene = trailerScenes[i] ?? trailerScenes[0];
  return (
    <motion.div
      className="fixed inset-0 z-[110] flex cursor-pointer items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="px-2.5 text-center"
          initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5 }}
        >
          <small className="mb-3.5 block text-[clamp(11px,1.6vw,15px)] font-bold uppercase tracking-[0.4em] text-red2">{scene[0]}</small>
          <div className="disp text-[clamp(44px,10vw,120px)] leading-[0.95] text-white">{scene[1]}</div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 right-5 text-xs uppercase tracking-[0.14em] text-muted">Click to skip</div>
    </motion.div>
  );
}

/* ─── Footer ─── */
export function Footer() {
  return (
    <footer className="border-t border-line px-4 pb-10 pt-12 text-center text-[13px] text-muted md:px-6">
      <div className="mb-2 flex items-baseline justify-center gap-1.5 font-display text-[30px] tracking-[0.06em] text-red">
        OM<small className="font-sans text-xs font-bold tracking-[0.2em] text-fg">SERIES</small>
      </div>
      <div>Designed and built by Om Baviskar · Pune, India · Press <b className="text-white">/</b> to search</div>
    </footer>
  );
}
