import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Magnetic } from "./fx";
import { profile } from "../data/portfolio";

const chips = [
  { label: "React", pos: "left-[2%] top-[18%]", delay: "0s" },
  { label: "Node.js", pos: "right-[0%] top-[28%]", delay: "0.8s" },
  { label: "MongoDB", pos: "left-[6%] bottom-[16%]", delay: "1.6s" },
  { label: "JWT", pos: "right-[8%] bottom-[10%]", delay: "2.2s" },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  top: `${30 + ((i * 37) % 65)}%`,
  delay: `${(i % 7) * 0.9}s`,
  size: 2 + (i % 3),
}));

export default function Hero({ onPlay, onResume }: { onPlay: () => void; onResume: () => void }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const portraitX = useTransform(sx, (v) => v * -18);
  const portraitY = useTransform(sy, (v) => v * -12);
  const chipX = useTransform(sx, (v) => v * 26);
  const chipY = useTransform(sy, (v) => v * 18);
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <section id="top" onMouseMove={onMove} className="grain relative flex min-h-screen items-center overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(251,191,36,0.10),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      {!reduce && (
        <>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/3 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
              style={{ animation: "streak 6s linear infinite" }}
            />
            <div
              className="absolute top-2/3 h-px w-1/4 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
              style={{ animation: "streak 8s linear 2s infinite" }}
            />
          </div>
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-accent/70"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animation: `drift 6s ease-out ${p.delay} infinite`,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-accent"
          >
            <span className="font-display text-2xl tracking-normal text-accent">O</span> Original series
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-7xl leading-[0.9] tracking-wide md:text-9xl"
          >
            {profile.firstName}
            <br />
            <span className="text-accent">{profile.lastName}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300"
          >
            <span className="font-bold text-green-400">98% Match</span>
            <span>2025</span>
            <span className="rounded border border-slate-500 px-1.5 text-xs">MERN</span>
            <span>2 Originals</span>
            <span>{profile.location}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-5 max-w-xl text-lg text-slate-200"
          >
            {profile.title}. {profile.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic>
              <button
                onClick={onPlay}
                className="flex items-center gap-2 rounded-md bg-white px-7 py-3 font-bold text-black transition hover:bg-accent"
              >
                ▶ Play Intro
              </button>
            </Magnetic>
            <a
              href="#originals"
              className="flex items-center gap-2 rounded-md bg-white/15 px-7 py-3 font-semibold backdrop-blur transition hover:bg-white/25"
            >
              ⓘ More Info
            </a>
            <button
              onClick={onResume}
              className="flex items-center gap-2 rounded-md border border-line px-7 py-3 font-semibold text-slate-300 transition hover:border-accent hover:text-white"
            >
              Resume
            </button>
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent/40 via-sky-600/20 to-transparent blur-2xl" />
          <motion.div className="relative h-full w-full" style={reduce ? undefined : { x: portraitX, y: portraitY }}>
          {hasPhoto ? (
            <img
              src="/assets/portrait.png"
              alt={profile.name}
              onError={() => setHasPhoto(false)}
              className="relative h-full w-full object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-accent/30 bg-panel/60">
              <span className="font-display text-[10rem] leading-none tracking-wider text-accent/90 md:text-[12rem]">
                OB
              </span>
            </div>
          )}
          </motion.div>
          <motion.div className="pointer-events-none absolute inset-0" style={reduce ? undefined : { x: chipX, y: chipY }}>
            {chips.map((c) => (
              <span
                key={c.label}
                className={`absolute ${c.pos} rounded-full border border-accent/30 bg-ink/70 px-3 py-1 text-xs font-semibold text-accent backdrop-blur`}
                style={reduce ? undefined : { animation: `floaty 5s ease-in-out ${c.delay} infinite` }}
              >
                {c.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
