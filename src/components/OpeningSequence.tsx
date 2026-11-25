import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (reduce) { onDone(); return; }
    timer.current = setTimeout(onDone, 2300);
    return () => clearTimeout(timer.current);
  }, [reduce, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex cursor-pointer flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onDone}
      onKeyDown={onDone}
      role="button"
      aria-label="Skip intro"
      tabIndex={0}
    >
      <div
        className="font-display text-[clamp(90px,22vw,220px)] tracking-[0.04em] text-red"
        style={{
          animation: "pop 1.5s cubic-bezier(.2,.7,.2,1) both",
          textShadow: "0 0 60px rgba(229,9,20,0.55)",
        }}
      >
        OM
      </div>
      <small
        className="text-[11px] uppercase tracking-[0.3em] text-muted"
        style={{ animation: "fade 1.2s 0.5s both" }}
      >
        The Series
      </small>
    </motion.div>
  );
}
