import { useState } from "react";
import { motion } from "framer-motion";
import type { ViewerProfile } from "../data/portfolio";

// Edit this caption line anytime
const HERO_CAPTION = "FULL STACK DEVELOPER · BUILT BY OM";

export default function Hero({
  viewerProfile,
  onPlay,
}: {
  viewerProfile: ViewerProfile;
  onPlay: () => void;
  onSecondary: () => void;
}) {
  const [muted, setMuted] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <header
      id="home"
      data-sec="home"
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#050505]"
    >
      {/* Blended poster photo: centered-to-right on desktop, recentered on mobile */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end">
        <div className="relative h-full w-full md:w-[80%]">
          <img
            src="/assets/hero-poster.jpg"
            alt="Om Baviskar speaking at a podium"
            className="h-full w-full object-cover object-[45%_18%] md:object-[60%_18%]"
            style={{ filter: "brightness(0.82) contrast(1.05) saturate(0.92)" }}
          />
          {/* Top-to-bottom fade into #050505 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.35) 18%, rgba(5,5,5,0) 45%, rgba(5,5,5,0.45) 75%, #050505 100%)",
            }}
          />
          {/* Left-to-right fade into #050505 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.55) 14%, rgba(5,5,5,0) 38%, rgba(5,5,5,0) 72%, #050505 100%)",
            }}
          />
          {/* Soft radial vignette centered on the photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 68% 68% at 52% 45%, rgba(5,5,5,0) 30%, rgba(5,5,5,0.65) 75%, #050505 100%)",
            }}
          />
        </div>
      </div>

      {/* Title block layered over the photo */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="m-0 select-none leading-[0.9] tracking-[0.02em] text-[#F40808]"
          style={{
            fontFamily: "'Anton', 'Inter', sans-serif",
            fontSize: "clamp(64px, 18vw, 190px)",
            textShadow:
              "0 0 60px rgba(244, 8, 8, 0.55), 0 0 120px rgba(244, 8, 8, 0.3)",
          }}
        >
          OM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 font-medium uppercase text-[#c9c9c9] tracking-[4px] md:tracking-[10px]"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 2vw, 20px)",
          }}
        >
          THE SERIES
        </motion.p>
      </div>

      {/* Netflix-style bottom icon bar */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-8 pt-4 md:px-12 md:pb-12">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-between">
          {/* Bottom-left: Mute/Volume toggle (desktop left, mobile grouped below play) */}
          <div className="order-2 flex items-center gap-6 md:order-1">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={!muted}
              className="grid h-[46px] w-[46px] place-items-center rounded-full border-[1.5px] border-white/45 text-white transition hover:border-white hover:bg-white/10 md:h-[52px] md:w-[52px]"
            >
              {muted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>

            {/* Mobile-only Save button beside Mute */}
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              aria-label={saved ? "Unsave" : "Save"}
              aria-pressed={saved}
              className="grid h-[46px] w-[46px] place-items-center rounded-full border-[1.5px] border-white/45 text-white transition hover:border-white hover:bg-white/10 md:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={saved ? "text-[#F40808]" : ""}
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>

          {/* Bottom-center: Play button + caption */}
          <div className="order-1 flex flex-col items-center gap-3.5 text-center md:order-2">
            <button
              type="button"
              onClick={onPlay}
              aria-label={viewerProfile.primary || "Play intro"}
              className="grid h-[56px] w-[56px] place-items-center rounded-full bg-white text-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition hover:scale-105 hover:bg-white/90 md:h-[60px] md:w-[60px]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                <path d="M7 4v16l13-8z" />
              </svg>
            </button>
            <p
              className="m-0 font-medium uppercase text-[#c9c9c9] tracking-[2px] md:tracking-[3px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(11px, 1.5vw, 15px)",
              }}
            >
              {HERO_CAPTION}
            </p>
          </div>

          {/* Bottom-right: Save/Heart button (desktop) */}
          <div className="hidden md:order-3 md:flex">
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              aria-label={saved ? "Unsave" : "Save"}
              aria-pressed={saved}
              className="grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] border-white/45 text-white transition hover:border-white hover:bg-white/10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={saved ? "text-[#F40808]" : ""}
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
