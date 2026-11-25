import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

const links = [
  { href: "#about", label: "The Pilot" },
  { href: "#journey", label: "My Journey" },
  { href: "#originals", label: "Originals" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ onSwitchProfile, onResume }: { onSwitchProfile: () => void; onResume: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 200 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 top-0 z-30 transition-colors ${solid || open ? "bg-ink/90 backdrop-blur" : "bg-gradient-to-b from-black/80 to-transparent"}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="font-display text-3xl tracking-[0.15em] text-accent">
          {profile.firstName}
        </a>
        <ul className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-white">{l.label}</a>
            </li>
          ))}
          <li>
            <button onClick={onResume} className="rounded bg-white px-3 py-1 text-xs font-bold text-black transition hover:bg-accent">
              Resume
            </button>
          </li>
          <li>
            <button
              onClick={onSwitchProfile}
              className="rounded border border-line px-3 py-1 text-xs text-slate-400 transition hover:border-accent hover:text-white"
            >
              Switch profile
            </button>
          </li>
        </ul>
        <button
          className="text-2xl md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>
      {open && (
        <ul className="flex flex-col gap-4 border-t border-line px-5 pb-6 pt-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="text-lg text-slate-200">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={() => { setOpen(false); onResume(); }} className="text-lg text-slate-200">Resume</button>
          </li>
          <li>
            <button onClick={onSwitchProfile} className="text-sm text-slate-400">Switch profile</button>
          </li>
        </ul>
      )}
    </motion.header>
  );
}
