import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { introSlides } from "../data/portfolio";

const SLIDE_MS = 3500;

export default function PlayIntro({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = introSlides.length - 1;

  const next = () => setIndex((i) => Math.min(i + 1, last));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => (index < last ? setIndex(index + 1) : onClose()), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, last, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, last));
      else if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, last]);

  const slide = introSlides[index];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-label="Highlight reel"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_65%)]" />

      <div className="absolute inset-x-5 top-5 z-10 flex gap-2">
        {introSlides.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded bg-white/20">
            <div
              className="h-full bg-white"
              style={
                i < index
                  ? { width: "100%" }
                  : i === index
                    ? { animation: `fill ${SLIDE_MS}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }
                    : { width: 0 }
              }
              key={i === index ? `a-${index}` : `b-${i}`}
            />
          </div>
        ))}
      </div>
      <style>{`@keyframes fill { from { width: 0 } to { width: 100% } }`}</style>

      <button onClick={prev} aria-label="Previous" className="absolute inset-y-0 left-0 z-10 w-1/3" />
      <button onClick={next} aria-label="Next" className="absolute inset-y-0 right-0 z-10 w-1/3" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-full flex-col items-center justify-center px-8 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-accent">{slide.kicker}</p>
          <p className="max-w-3xl font-display text-5xl leading-tight tracking-wide md:text-7xl">{slide.text}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-6 text-sm text-slate-400">
        <button onClick={() => setPaused((p) => !p)} className="hover:text-white">
          {paused ? "▶ Resume" : "❚❚ Pause"}
        </button>
        <button onClick={onClose} className="hover:text-white">✕ Close</button>
      </div>
    </motion.div>
  );
}
