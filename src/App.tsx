import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import {
  viewerProfiles,
  type Project,
  type SectionId,
  type ViewerId,
  type ViewerProfile,
} from "./data/portfolio";
import OpeningSequence from "./components/OpeningSequence";
import ProfileSelector from "./components/ProfileSelector";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ContinueWatching from "./components/ContinueWatching";
import {
  About,
  Journey,
  TopPicks,
  Originals,
  Moments,
  Skills,
  Resume,
  ProjectModal,
  ContactModal,
  SearchModal,
  Trailer,
  Footer,
} from "./components/Sections";

type Stage = "opening" | "profile" | "home";

export default function App() {
  const [stage, setStage] = useState<Stage>("opening");
  const [viewer, setViewer] = useState<ViewerId>("om");
  const [project, setProject] = useState<Project | null>(null);
  const [trailer, setTrailer] = useState(false);
  const [contact, setContact] = useState(false);
  const [search, setSearch] = useState(false);

  const vp: ViewerProfile = viewerProfiles.find((v) => v.id === viewer) ?? viewerProfiles[0];

  useEffect(() => {
    const locked = stage !== "home" || project !== null || trailer || contact || search;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [stage, project, trailer, contact, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProject(null);
        setTrailer(false);
        setContact(false);
        setSearch(false);
      }
      const tg = (e.target as HTMLElement)?.tagName?.toLowerCase() ?? "";
      if (e.key === "/" && tg !== "input" && tg !== "textarea" && stage === "home") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage]);

  const sections: Record<SectionId, ReactNode> = {
    journey: <Journey key="journey" />,
    picks: <TopPicks key="picks" />,
    originals: <Originals key="originals" onOpen={setProject} onContact={() => setContact(true)} />,
    moments: <Moments key="moments" />,
    about: <About key="about" onContact={() => setContact(true)} />,
    skills: <Skills key="skills" />,
    resume: <Resume key="resume" />,
  };

  const handleHeroPrimary = () => {
    if (vp.priTo) {
      const el = document.getElementById(vp.priTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setTrailer(true);
    }
  };

  const handleHeroSecondary = () => {
    if (vp.secTo === "contact") setContact(true);
    else if (vp.secTo === "trailer") setTrailer(true);
    else {
      const el = document.getElementById(vp.secTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {stage === "opening" && (
          <OpeningSequence key="opening" onDone={() => setStage("profile")} />
        )}
        {stage === "profile" && (
          <ProfileSelector
            key="profile"
            onSelect={(id) => {
              setViewer(id);
              setStage("home");
              window.scrollTo(0, 0);
            }}
          />
        )}
      </AnimatePresence>

      {stage === "home" && (
        <>
          <Navbar
            onSwitchProfile={() => setStage("profile")}
            onSearch={() => setSearch(true)}
            onContact={() => setContact(true)}
          />
          <main className="flex flex-col">
            <Hero
              viewerProfile={vp}
              onPlay={handleHeroPrimary}
              onSecondary={handleHeroSecondary}
            />
            <ContinueWatching />
            {vp.order.map((id, i) => (
              <div key={id} style={{ order: i }}>
                {sections[id]}
              </div>
            ))}
          </main>
          <Footer />
        </>
      )}

      <AnimatePresence>
        {project && <ProjectModal key="project" project={project} onClose={() => setProject(null)} />}
        {contact && <ContactModal key="contact" onClose={() => setContact(false)} />}
        {search && <SearchModal key="search" onClose={() => setSearch(false)} onOpenProject={setProject} />}
        {trailer && <Trailer key="trailer" onClose={() => setTrailer(false)} />}
      </AnimatePresence>
    </>
  );
}
