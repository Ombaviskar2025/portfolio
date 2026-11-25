import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certifications, profile, projects, seasons, skillGroups } from "../data/portfolio";

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"sheet" | "pdf">("sheet");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Resume"
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-panel"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="flex gap-2">
            {(["sheet", "pdf"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-accent text-black" : "text-slate-400 hover:text-white"}`}
              >
                {t === "sheet" ? "Designed sheet" : "PDF"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={profile.resume} download className="rounded-md bg-white px-4 py-1.5 text-sm font-bold text-black hover:bg-accent">
              ↓ Download
            </a>
            <button onClick={onClose} aria-label="Close" className="text-xl text-slate-400 hover:text-white">✕</button>
          </div>
        </div>

        {tab === "pdf" ? (
          <iframe title="Resume PDF" src={profile.resume} className="h-[75vh] w-full bg-white" />
        ) : (
          <div className="overflow-y-auto p-6 md:p-10">
            <h2 className="font-display text-5xl tracking-wide">{profile.name}</h2>
            <p className="text-accent">{profile.title}</p>
            <p className="mt-1 text-xs text-slate-400">
              {profile.email} · {profile.phone} · {profile.location}
            </p>
            <p className="mt-5 text-sm text-slate-300">{profile.summary}</p>

            <h3 className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-4">
                <p className="flex justify-between font-semibold">
                  <span>{p.title} — {p.genre}</span>
                  <span className="text-sm font-normal text-slate-400">{p.date}</span>
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {p.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            ))}

            <h3 className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Education</h3>
            {seasons
              .flatMap((s) => s.episodes)
              .filter((e) => /Bachelor|Master/.test(e.title))
              .map((e) => (
                <p key={e.title} className="text-sm">
                  <span className="font-semibold">{e.title}</span>
                  <span className="text-slate-400"> · {e.meta}</span>
                </p>
              ))}

            <h3 className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Skills</h3>
            {skillGroups.map((g) => (
              <p key={g.genre} className="text-sm">
                <span className="font-semibold">{g.genre}:</span>{" "}
                <span className="text-slate-300">{g.skills.join(", ")}</span>
              </p>
            ))}

            <h3 className="mb-2 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Certifications</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
              {certifications.map((c) => <li key={c.title}>{c.title} — {c.issuer}</li>)}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
