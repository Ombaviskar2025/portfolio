import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/portfolio";

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 2400),
      setTimeout(() => setStep(3), 3900),
      setTimeout(() => setStep(4), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p
            key="studio"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="px-6 text-xs font-semibold uppercase text-slate-300 md:text-sm"
          >
            {profile.originalLabel}
          </motion.p>
        )}
        {step === 2 && (
          <motion.h1
            key="name"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="font-display text-7xl tracking-[0.12em] text-white md:text-9xl"
          >
            {profile.name.toUpperCase()}
          </motion.h1>
        )}
        {step >= 3 && (
          <motion.div
            key="series"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">{profile.firstName} {profile.lastName} —</p>
            <h1 className="font-display text-7xl tracking-[0.1em] text-accent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)] md:text-9xl">
              THE SERIES
            </h1>
            {step >= 4 && (
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onDone}
                className="mt-10 flex items-center gap-3 rounded-md bg-white px-8 py-3 text-lg font-bold text-black transition hover:bg-accent"
              >
                ▶ PLAY
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 text-xs uppercase tracking-widest text-slate-500 transition hover:text-white"
      >
        Skip intro ⏎
      </button>
    </motion.div>
  );
}
