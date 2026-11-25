import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Mouse/trackpad device (not touch). */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
export const useDesktop = () => useMediaQuery("(min-width: 768px)");
export const useReducedMotionPref = () => useMediaQuery("(prefers-reduced-motion: reduce)");
