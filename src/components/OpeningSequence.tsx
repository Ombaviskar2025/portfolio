import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    timer.current = setTimeout(onDone, 3000);
    return () => clearTimeout(timer.current);
  }, [reduce, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] cursor-pointer overflow-hidden bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onDone}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") onDone();
      }}
      role="button"
      aria-label="Enter portfolio"
      tabIndex={0}
    >
      {/* Background podium photo */}
      <img
        src="/assets/intro-bg.png"
        alt="Om Baviskar"
        className="absolute inset-0 h-full w-full object-cover object-[35%_center] md:object-center"
      />

      {/* Cinematic dark vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-transparent to-transparent" />

      {/* Top-right OM / THE SERIES */}
      <div
        className="absolute right-[6%] top-[8%] flex flex-col items-center text-center md:right-[10%] md:top-[10%]"
        style={{ animation: "pop 1.3s cubic-bezier(.2,.7,.2,1) both" }}
      >
        <div
          className="font-display text-[clamp(76px,15vw,160px)] leading-[0.88] tracking-[0.04em] text-red"
          style={{ textShadow: "0 0 60px rgba(229,9,20,0.65)" }}
        >
          OM
        </div>
        <small
          className="mt-1 text-[clamp(11px,1.5vw,16px)] font-semibold uppercase tracking-[0.38em] text-white/90"
          style={{ animation: "fade 1s 0.4s both" }}
        >
          THE SERIES
        </small>
      </div>

      {/* Bottom-center Play button + tagline */}
      <div
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-4 text-center md:bottom-10"
        style={{ animation: "fade 1s 0.5s both" }}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-transform hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
            <path d="M7 4v16l13-8z" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] md:text-xs">
          FULL STACK DEVELOPER · BUILT BY OM
        </p>
      </div>
    </motion.div>
  );
}
