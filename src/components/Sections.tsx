import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  certifications,
  profile,
  projects,
  seasons,
  skillEvidence,
  skillGroups,
  stats,
  topPicks,
  type Project,
} from "../data/portfolio";
import { Chip, Reveal, SectionTitle } from "./ui";
import { Tilt } from "./fx";
import { useDesktop, useFinePointer, useReducedMotionPref } from "../hooks";

const wrap = "mx-auto max-w-7xl px-5 md:px-10";

/* ---------- About ---------- */
export function About() {
  return (
    <section id="about" className={`${wrap} py-20`}>
      <SectionTitle kicker="Episode 1" title="The Pilot" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-slate-300">{profile.summary}</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-panel p-4">
                <p className="font-display text-4xl text-accent">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="space-y-4 rounded-xl border border-line bg-panel p-6 text-sm">
            {[
              ["Starring", profile.name],
              ["Genre", "Full-Stack · MERN · Cloud Deployment"],
              ["Filmed in", profile.location],
              ["Currently", "MCA, IMCC Pune (2025 – 2027)"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-widest text-slate-500">{k}</dt>
                <dd className="mt-0.5 text-slate-200">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Originals (projects) ---------- */
function ProjectCard({ project, onOpen, wide = false }: { project: Project; onOpen: (p: Project) => void; wide?: boolean }) {
  return (
    <motion.button
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      whileHover={{ y: -6 }}
      className={`group relative flex shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl border border-line text-left ${wide ? "h-[62vh] w-[min(70vw,860px)]" : "aspect-[16/11] w-[min(86vw,480px)]"}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80 transition group-hover:opacity-100`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <span className="absolute left-4 top-4 font-display text-2xl tracking-widest text-white/90">
        <span className="text-accent">O</span> ORIGINAL
      </span>
      <span className="absolute right-4 top-4 rounded bg-black/50 px-2 py-0.5 text-xs">{project.date}</span>
      <div className="relative p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{project.genre}</p>
        <h3 className="font-display text-4xl tracking-wide md:text-5xl">{project.title}</h3>
        <p className="mt-1 text-sm text-slate-200">{project.tagline}</p>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={project.title}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line bg-panel"
      >
        <div className={`relative h-52 bg-gradient-to-br ${project.accent} md:h-64`}>
          <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg hover:bg-black"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-200">{project.genre}</p>
            <h3 className="font-display text-5xl tracking-wide md:text-6xl">{project.title}</h3>
          </div>
        </div>
        <div className="space-y-6 p-6">
          <p className="flex items-center gap-3 text-sm text-slate-400">
            <span className="font-bold text-green-400">New</span> {project.date} · Full-stack · Deployed
          </p>
          <p className="text-slate-200">{project.description}</p>
          <ul className="space-y-3 text-sm text-slate-300">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-1 text-accent">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          {(project.live || project.repo) && (
            <div className="flex gap-3 pt-2">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="rounded-md bg-white px-5 py-2 text-sm font-bold text-black hover:bg-accent">
                  ▶ Watch live
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-md border border-line px-5 py-2 text-sm font-semibold hover:border-accent">
                  Source code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PinnedRail({ onOpen }: { onOpen: (p: Project) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="originals" ref={sectionRef} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className={wrap + " w-full"}>
          <SectionTitle kicker="Only on this portfolio" title="Originals" />
        </div>
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-10 pr-[12vw] lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={onOpen} wide />
          ))}
        </motion.div>
        <p className="mt-4 pl-10 text-xs uppercase tracking-[0.3em] text-slate-500 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          Keep scrolling →
        </p>
      </div>
    </section>
  );
}

export function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const desktop = useDesktop();
  const fine = useFinePointer();
  const reduce = useReducedMotionPref();
  if (desktop && fine && !reduce) return <PinnedRail onOpen={onOpen} />;
  return (
    <section id="originals" className="py-20">
      <div className={wrap}>
        <SectionTitle kicker="Only on this portfolio" title="Originals" />
      </div>
      <div className={`rail ${wrap} flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4`}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export { ProjectModal };

/* ---------- Journey (seasons & episodes) ---------- */
export function Journey() {
  const [active, setActive] = useState(0);
  const season = seasons[active];
  return (
    <section id="journey" className={`${wrap} py-20`}>
      <SectionTitle kicker="Binge-worthy" title="My Journey" />
      <div className="mb-8 flex flex-wrap gap-2">
        {seasons.map((s, i) => (
          <button
            key={s.number}
            onClick={() => setActive(i)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              i === active ? "border-accent bg-accent text-black" : "border-line text-slate-300 hover:border-slate-500"
            }`}
          >
            Season {s.number}
          </button>
        ))}
      </div>
      <p className="mb-6 text-slate-400">
        <span className="font-display text-3xl tracking-wide text-white">{season.title}</span> · {season.years}
      </p>
      <ol className="space-y-3">
        {season.episodes.map((ep, i) => (
          <motion.li
            key={`${season.number}-${ep.title}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-5 rounded-xl border border-line bg-panel p-4 transition hover:border-accent/60 md:p-5"
          >
            <span className="w-10 text-center font-display text-4xl text-slate-600">{i + 1}</span>
            <div className="min-w-0">
              <h4 className="font-semibold text-white">{ep.title}</h4>
              <p className="text-xs text-accent">{ep.meta}</p>
              <p className="mt-1 text-sm text-slate-400">{ep.blurb}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Top picks ---------- */
export function TopPicks() {
  return (
    <section className="py-20">
      <div className={wrap}>
        <SectionTitle kicker="Trending in my stack" title="Top 10 Skills" />
      </div>
      <div className={`rail ${wrap} flex gap-2 overflow-x-auto pb-4`}>
        {topPicks.map((skill, i) => (
          <motion.div
            key={skill}
            whileHover={{ y: -6 }}
            className="relative flex shrink-0 items-end"
          >
            <span className="outline-num font-display text-[9rem] leading-none md:text-[11rem]">{i + 1}</span>
            <div className="-ml-5 mb-2 flex h-36 w-28 items-end rounded-lg border border-line bg-gradient-to-br from-panel to-ink p-3 md:h-44 md:w-36">
              <span className="text-sm font-bold leading-tight">{skill}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
export function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section id="skills" className={`${wrap} py-20`}>
      <SectionTitle kicker="Browse by genre" title="Skills" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.genre} delay={i * 0.05}>
            <Tilt className="h-full">
              <div className="h-full rounded-xl border border-line bg-panel p-5 transition hover:border-accent/60">
                <p className="mb-3 flex items-center gap-3 font-display text-3xl tracking-wide">
                  <span className="text-accent">{g.icon}</span> {g.genre}
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelected(selected === s ? null : s)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        selected === s ? "border-accent bg-accent text-black" : "border-line bg-white/5 text-slate-200 hover:border-accent/60"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 min-h-14 rounded-xl border border-dashed border-line p-4 text-sm text-slate-400">
        {selected ? (
          <>
            <span className="font-semibold text-white">{selected}</span> — where it's used:{" "}
            <span className="text-slate-300">{skillEvidence[selected] ?? "Add a note in skillEvidence."}</span>
          </>
        ) : (
          "Tap a skill to see where it shows up in my work."
        )}
      </div>
    </section>
  );
}

/* ---------- Certifications ---------- */
export function Certs() {
  return (
    <section className={`${wrap} py-20`}>
      <SectionTitle kicker="Award-winning" title="Certifications" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <Tilt className="h-full"><div className="flex h-full flex-col justify-between rounded-xl border border-line bg-gradient-to-br from-panel to-ink p-5">
              <span className="mb-6 text-3xl text-gold">★</span>
              <div>
                <h4 className="font-semibold leading-snug">{c.title}</h4>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{c.issuer}</p>
              </div>
            </div></Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
export function FinalCTA({ onResume }: { onResume: () => void }) {
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    { label: "LinkedIn", href: profile.linkedin, value: "Connect" },
    { label: "GitHub", href: profile.github, value: `@${profile.githubHandle}` },
    { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, value: profile.phone },
  ];
  return (
    <section id="contact" className="relative overflow-hidden py-28 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.14),transparent_65%)]" />
      <div className={`${wrap} relative`}>
        <Reveal>
          <h2 className="font-display text-6xl tracking-wide md:text-9xl">
            TO BE <span className="text-accent">CONTINUED…</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Hiring, collaborating, or just want to say hi? Season 4 starts with a message.
          </p>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="rounded-xl border border-line bg-panel px-5 py-4 text-left transition hover:border-accent"
            >
              <p className="text-xs uppercase tracking-widest text-slate-500">{l.label}</p>
              <p className="mt-0.5 font-semibold">{l.value}</p>
            </a>
          ))}
        </div>
        <button
          onClick={onResume}
          className="mt-8 inline-block rounded-md bg-white px-8 py-3 font-bold text-black transition hover:bg-accent"
        >
          ▶ View Resume
        </button>
        <p className="mt-16 text-xs text-slate-600">
          © {new Date().getFullYear()} {profile.name}. A fictional streaming-style portfolio, not affiliated with any streaming service.
        </p>
      </div>
    </section>
  );
}
