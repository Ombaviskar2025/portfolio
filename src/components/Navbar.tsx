import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", s: "home", label: "Home" },
  { href: "#journey", s: "journey", label: "Journey" },
  { href: "#picks", s: "picks", label: "Top Picks" },
  { href: "#originals", s: "originals", label: "Originals" },
  { href: "#moments", s: "moments", label: "Moments" },
  { href: "#about", s: "about", label: "About" },
  { href: "#skills", s: "skills", label: "Skills" },
  { href: "#resume", s: "resume", label: "Resume" },
];

export default function Navbar({
  onSwitchProfile,
  onSearch,
  onContact,
}: {
  onSwitchProfile: () => void;
  onSearch: () => void;
  onContact: () => void;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 30);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("[data-sec]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setActive((en.target as HTMLElement).dataset.sec ?? "");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[200] h-[3px] bg-red" style={{ width: `${progress}%` }} />
      <motion.nav
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          solid || open
            ? "bg-[rgba(7,9,13,0.94)] shadow-[0_1px_0_var(--color-line)] backdrop-blur-[10px]"
            : "bg-gradient-to-b from-[rgba(7,9,13,0.92)] to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-4 md:px-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            className="flex items-baseline gap-1.5 whitespace-nowrap font-display text-[30px] tracking-[0.06em] text-red no-underline"
          >
            OM<small className="font-sans text-xs font-bold tracking-[0.2em] text-fg">SERIES</small>
          </a>
          <div className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-16 flex-col border-b border-line bg-[rgba(7,9,13,0.98)] px-4 pb-4 lg:static lg:flex lg:flex-1 lg:flex-row lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0`}>
            {links.map((l) => (
              <a
                key={l.s}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[13px] font-medium no-underline transition-colors lg:py-2 ${
                  active === l.s
                    ? "border-red font-bold text-fg"
                    : "border-transparent text-muted hover:text-fg"
                }`}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onContact();
              }}
              className="mt-3 w-full rounded-[5px] bg-fg px-4 py-2.5 text-center text-[13px] font-bold text-black transition hover:bg-[#d8d8d8] lg:hidden"
            >
              Let's Build
            </button>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <button onClick={onSearch} className="grid h-[38px] w-[38px] place-items-center rounded-full text-fg transition hover:bg-white/10" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <button onClick={onContact} className="hidden whitespace-nowrap rounded-[5px] bg-fg px-4 py-2 text-[12.5px] font-bold text-black transition hover:bg-[#d8d8d8] lg:block">
              Let's Build
            </button>
            <button onClick={onSwitchProfile} className="t-om block h-[34px] w-[34px] rounded-[6px] font-display text-[18px]" aria-label="Switch profile">
              O
            </button>
            <button onClick={() => setOpen((o) => !o)} className="grid h-[38px] w-[38px] place-items-center rounded-full text-fg lg:hidden" aria-label="Menu" aria-expanded={open}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
