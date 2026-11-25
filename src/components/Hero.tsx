import { useRef, useState } from "react";
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
  const [hasPhoto, setHasPhoto] = useState(() => !!localStorage.getItem("om-photo"));
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 900;
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s);
        c.height = Math.round(img.height * s);
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        localStorage.setItem("om-photo", c.toDataURL("image/jpeg", 0.86));
        setHasPhoto(true);
      };
      img.src = r.result as string;
    };
    r.readAsDataURL(f);
    e.target.value = "";
  };

  const photoSrc = hasPhoto ? localStorage.getItem("om-photo") : null;

  return (
    <header
      id="home"
      data-sec="home"
      className="relative flex min-h-[min(86vh,760px)] items-center overflow-hidden pb-[60px] pt-[calc(90px+env(safe-area-inset-top,0px))]"
      style={{
        background:
          "radial-gradient(700px 520px at 78% 40%, rgba(229,9,20,0.42), transparent 70%), radial-gradient(500px 400px at 10% 90%, rgba(60,20,120,0.28), transparent 70%), #07090d",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div className="relative z-[2] mx-auto grid w-full max-w-[1280px] items-center gap-[30px] px-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:px-6">
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
            className="disp text-[clamp(54px,11.5vw,170px)] text-white [text-shadow:0_8px_40px_rgba(0,0,0,0.6)]"
          >
            {profile.firstName} <span className="text-red">B</span>AVISKAR
          </motion.h1>
          <div className="mb-5 mt-1.5 text-xs font-bold tracking-[0.5em] text-red2">THE SERIES</div>
          <div className="mb-2.5 text-[12.5px] font-bold uppercase tracking-[0.2em]">
            Full-Stack Developer · MERN · Java
          </div>
          <p className="mb-6 max-w-[560px] text-[16.5px] text-[#c9cfd9]">{profile.summary}</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onPlay}
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-fg px-6 py-3 font-bold text-black transition hover:bg-[#cfcfcf]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]"><path d="M7 4v16l13-8z" /></svg>
              {viewerProfile.primary}
            </button>
            <button
              onClick={onSecondary}
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-[rgba(109,109,110,0.55)] px-6 py-3 font-bold text-white backdrop-blur-[6px] transition hover:bg-[rgba(109,109,110,0.35)]"
            >
              {viewerProfile.secondary}
            </button>
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <div
            className="relative aspect-[4/5] w-[min(100%,400px)] cursor-pointer overflow-hidden rounded-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06),0_0_90px_rgba(229,9,20,0.28)]"
            style={{ background: "linear-gradient(160deg, #1a0f14, #2a0c12)" }}
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Add your photo"
          >
            {photoSrc ? (
              <img src={photoSrc} alt={profile.name} className="h-full w-full object-cover object-[center_top]" />
            ) : (
              <div className="t-om flex h-full w-full items-center justify-center font-display text-[clamp(80px,12vw,150px)] tracking-[0.04em] text-white/90">
                OM
              </div>
            )}
            <span className={`absolute inset-x-3 bottom-3 rounded-lg bg-black/60 px-3 py-2 text-center text-xs font-semibold backdrop-blur-[6px] transition-opacity ${hasPhoto ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
              Click to add your photo
            </span>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
        </div>
      </div>
      <div className="absolute bottom-7 right-4 z-[3] max-w-[300px] rounded-lg border border-line bg-[rgba(20,24,32,0.85)] px-3.5 py-2.5 text-xs text-[#cdd3dd] backdrop-blur-lg max-md:static max-md:mx-4 max-md:mt-5 max-md:max-w-none">
        Now watching as <b className="text-white">{viewerProfile.name}</b>: {viewerProfile.msg}.
      </div>
    </header>
  );
}
