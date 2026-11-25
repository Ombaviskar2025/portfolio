import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, useReducedMotionPref } from "../hooks";

/* 3D tilt toward the pointer. Disabled on touch / reduced motion. */
export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer();
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const on = fine && !reduce;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !on) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotY.set(px * max * 2);
    rotX.set(-py * max * 2);
  };
  const reset = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={on ? { rotateX: rotX, rotateY: rotY, transformPerspective: 900 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* Button that gently pulls toward the cursor. */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const fine = useFinePointer();
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const on = fine && !reduce;

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={on ? { x, y } : undefined}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || !on) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
