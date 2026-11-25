import { useEffect, useRef, useState } from "react";
import { episodes } from "../data/portfolio";

function getVisited(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem("om-visited") || "{}"); } catch { return {}; }
}

export default function ContinueWatching() {
  const railRef = useRef<HTMLDivElement>(null);
  const [visited, setVisited] = useState(getVisited);

  useEffect(() => {
    const els = document.querySelectorAll("[data-sec]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const s = (en.target as HTMLElement).dataset.sec;
          if (s && !visited[s]) {
            const next = { ...visited, [s]: true };
            setVisited(next);
            localStorage.setItem("om-visited", JSON.stringify(next));
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [visited]);

  const scroll = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 330, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-2 pt-2.5 md:px-6" data-sec="rail">
      <h2 className="mb-3.5 text-xl font-bold tracking-tight">Continue Exploring</h2>
      <div className="group relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute bottom-[26px] left-0 top-0 z-[5] grid w-11 place-items-center bg-gradient-to-r from-[rgba(7,9,13,0.9)] to-transparent text-[34px] opacity-0 transition group-hover:opacity-100 max-md:hidden"
          aria-label="Scroll left"
        >‹</button>
        <div
          ref={railRef}
          className="rail flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-[26px] pt-3"
        >
          {episodes.map((ep) => (
            <button
              key={ep.s}
              onClick={() => {
                const el = document.getElementById(ep.s);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`${ep.g} group/card relative flex aspect-[16/10] w-[72vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[10px] border border-white/[0.08] p-4 text-left transition-all duration-200 sm:w-[260px] md:w-[280px] lg:w-[300px] hover:z-[3] hover:scale-[1.06] hover:shadow-[0_18px_50px_rgba(0,0,0,0.7),0_0_0_2px_rgba(255,255,255,0.7)]`}
            >
              <span className="absolute right-3 top-3 grid h-[30px] w-[30px] place-items-center rounded-full border-[1.5px] border-white/70 bg-black/55 text-[11px] opacity-0 transition group-hover/card:opacity-100">▶</span>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] opacity-85">EPISODE {ep.n}</span>
              <span className="disp mt-1 text-[30px] leading-none">{ep.t}</span>
              <span className="mt-1 text-xs opacity-80">{ep.d}</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                <i
                  className="block h-full bg-red transition-[width] duration-500"
                  style={{ width: visited[ep.s] ? "100%" : "0" }}
                />
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="absolute bottom-[26px] right-0 top-0 z-[5] grid w-11 place-items-center bg-gradient-to-l from-[rgba(7,9,13,0.9)] to-transparent text-[34px] opacity-0 transition group-hover:opacity-100 max-md:hidden"
          aria-label="Scroll right"
        >›</button>
      </div>
    </section>
  );
}
