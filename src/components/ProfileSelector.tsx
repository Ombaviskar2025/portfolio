import { motion } from "framer-motion";
import { viewerProfiles, type ViewerId } from "../data/portfolio";

export default function ProfileSelector({ onSelect }: { onSelect: (id: ViewerId) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto px-5 py-8"
      style={{
        background:
          "radial-gradient(900px 500px at 50% 0%, rgba(229,9,20,0.18), transparent 70%), #07090d",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <h1 className="mb-6 text-center text-[clamp(30px,6vw,64px)] font-semibold sm:mb-8">
        Who's watching?
      </h1>
      <div className="grid max-w-[960px] grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-[clamp(14px,2.4vw,28px)]">
        {viewerProfiles.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => onSelect(p.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="group w-[clamp(124px,36vw,150px)] text-center text-muted transition-colors duration-200 hover:text-fg sm:w-[clamp(130px,19vw,170px)]"
          >
            <div
              className={`${p.cls} relative flex aspect-square items-center justify-center overflow-hidden rounded-[14px] border-[3px] border-transparent font-display text-[64px] text-white shadow-[0_14px_40px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:-translate-y-1.5 group-hover:scale-[1.04] group-hover:border-fg`}
            >
              <span>{p.glyph}</span>
              {p.badge && (
                <span className="absolute right-2 top-2 rounded-[3px] bg-red px-1.5 py-0.5 font-sans text-[9px] font-extrabold tracking-[0.1em]">
                  {p.badge}
                </span>
              )}
            </div>
            <b className="mt-3 block text-[15px] font-semibold text-fg">{p.name}</b>
            <span className="mt-1 block text-[11.5px] leading-snug">{p.desc}</span>
          </motion.button>
        ))}
      </div>
      <p className="mt-8 max-w-[420px] text-center text-[12.5px] text-muted">
        Every profile watches the same true story of Om Baviskar. It only changes what plays first.
      </p>
    </motion.div>
  );
}
