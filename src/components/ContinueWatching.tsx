import { motion } from "framer-motion";
import { continueWatching } from "../data/portfolio";
import { SectionTitle } from "./ui";

export default function ContinueWatching() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-6 pt-4 md:px-10">
      <SectionTitle kicker="Pick up where I left off" title="Continue Watching" />
      <div className="rail flex gap-4 overflow-x-auto pb-4">
        {continueWatching.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="w-64 shrink-0 overflow-hidden rounded-lg border border-line bg-panel md:w-72"
          >
            <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${c.accent}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-black/30 text-lg backdrop-blur">
                ▶
              </span>
              <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold">
                {c.progress === 100 ? "WATCHED" : `${c.progress}%`}
              </span>
            </div>
            <div className="h-1 bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${c.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.08 }}
              />
            </div>
            <div className="p-3">
              <p className="font-semibold">{c.title}</p>
              <p className="text-xs text-slate-400">{c.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
