import { motion } from "framer-motion";
import { viewerProfiles, type ViewerId } from "../data/portfolio";

export default function ProfileSelector({ onSelect }: { onSelect: (id: ViewerId) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="mb-12 text-center font-display text-5xl tracking-wide md:text-7xl">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {viewerProfiles.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => onSelect(p.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="group flex w-36 flex-col items-center gap-3 md:w-44"
          >
            <span
              className={`flex h-28 w-28 items-center justify-center rounded-lg text-5xl ring-0 ring-white transition-all group-hover:ring-4 md:h-36 md:w-36 ${p.color}`}
            >
              {p.emoji}
            </span>
            <span className="text-lg font-semibold text-slate-300 group-hover:text-white">{p.name}</span>
            <span className="text-xs text-slate-500">{p.blurb}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
