import { useState } from "react";
import { motion } from "framer-motion";
import { profile, type ViewerProfile } from "../data/portfolio";

export default function Hero({
  viewerProfile,
  onPlay,
  onSecondary,
}: {
  viewerProfile: ViewerProfile;
  onPlay: () => void;
  onSecondary: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <header
      id="home"
      data-sec="home"
      className="relative flex min-h-[min(86vh,760px)] flex-col justify-center overflow-hidden pb-12 pt-[calc(84px+env(safe-area-inset-top,0px))] md:pb-[60px] md:pt-[calc(90px+env(safe-area-inset-top,0px))]"
      style={{
        background:
          "radial-gradient(700px 520px at 78% 40%, rgba(229,9,20,0.42), transparent 70%), radial-gradient(500px 400px at 10% 90%, rgba(60,20,120,0.28), transparent 70%), #07090d",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div className="relative z-[2] mx-auto grid w-full max-w-[1280px] items-center gap-7 px-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-[30px] md:px-6">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded bg-red px-2.5 py-1 text-[11.5px] font-semibold text-white">MERN</span>
            <span className="rounded border border-line bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-semibold text-[#d5d9e0]">MCA · 2025–2027</span>
            <span className="rounded border border-line bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-semibold text-[#d5d9e0]">2 Originals</span>
            <span className="rounded border border-line bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-semibold text-[#d5d9e0]">4 Certifications</span>
            <span className="rounded border border-line bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-semibold text-[#d5d9e0]">Pune, India</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="disp text-[clamp(48px,9vw,150px)] leading-[0.92] text-white [overflow-wrap:anywhere] [text-shadow:0_8px_40px_rgba(0,0,0,0.6)]"
          >
            {profile.firstName} <span className="text-red">B</span>AVISKAR
          </motion.h1>
          <div className="mb-4 mt-1.5 text-xs font-bold tracking-[0.5em] text-red2 md:mb-5">THE SERIES</div>
          <div className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.2em] md:text-[12.5px]">
            Full-Stack Developer · MERN · Java
          </div>
          <p className="mb-6 max-w-[560px] text-[15px] text-[#c9cfd9] md:text-[16.5px]">{profile.summary}</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onPlay}
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-fg px-5 py-3 text-sm font-bold text-black transition hover:bg-[#cfcfcf] md:px-6 md:text-[15px]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M7 4v16l13-8z" /></svg>
              {viewerProfile.primary}
            </button>
            <button
              onClick={onSecondary}
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-[rgba(109,109,110,0.55)] px-5 py-3 text-sm font-bold text-white backdrop-blur-[6px] transition hover:bg-[rgba(109,109,110,0.35)] md:px-6 md:text-[15px]"
            >
              {viewerProfile.secondary}
            </button>
          </div>
        </div>

        <div className="order-first justify-self-center md:order-last md:justify-self-end">
          <div
            className="relative aspect-[4/5] w-[min(68vw,270px)] overflow-hidden rounded-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06),0_0_90px_rgba(229,9,20,0.28)] sm:w-[300px] md:w-[min(100%,380px)]"
            style={{ background: "linear-gradient(160deg, #1a0f14, #2a0c12)" }}
          >
            {!imgError ? (
              <img
                src="/assets/portrait.jpg"
                alt={profile.name}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-[center_top]"
              />
            ) : (
              <div className="t-om flex h-full w-full items-center justify-center font-display text-[clamp(80px,12vw,150px)] tracking-[0.04em] text-white/90">
                OM
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative z-[3] mx-4 mt-6 rounded-lg border border-line bg-[rgba(20,24,32,0.85)] px-3.5 py-2.5 text-xs text-[#cdd3dd] backdrop-blur-lg lg:absolute lg:bottom-7 lg:right-6 lg:mx-0 lg:mt-0 lg:max-w-[300px]">
        Now watching as <b className="text-white">{viewerProfile.name}</b>: {viewerProfile.msg}.
      </div>
    </header>
  );
}
