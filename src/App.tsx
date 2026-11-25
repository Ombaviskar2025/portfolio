import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import {
  viewerProfiles,
  type Project,
  type SectionId,
  type ViewerId,
} from "./data/portfolio";
import OpeningSequence from "./components/OpeningSequence";
import ProfileSelector from "./components/ProfileSelector";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PlayIntro from "./components/PlayIntro";
import ContinueWatching from "./components/ContinueWatching";
import ResumeModal from "./components/ResumeModal";
import { CustomCursor } from "./components/fx";
import {
  About,
  Certs,
  FinalCTA,
  Journey,
  Originals,
  ProjectModal,
  Skills,
  TopPicks,
} from "./components/Sections";

type Stage = "opening" | "profile" | "home";

export default function App() {
  const [stage, setStage] = useState<Stage>("opening");
  const [viewer, setViewer] = useState<ViewerId>("recruiter");
  const [project, setProject] = useState<Project | null>(null);
  const [intro, setIntro] = useState(false);
  const [resume, setResume] = useState(false);

  // lock scroll while an overlay or pre-home stage is showing
  useEffect(() => {
    const locked = stage !== "home" || project !== null || intro || resume;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage, project, intro, resume]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project]);

  const order = viewerProfiles.find((v) => v.id === viewer)!.order;
  const sections: Record<SectionId, ReactNode> = {
    about: <About key="about" />,
    originals: <Originals key="originals" onOpen={setProject} />,
    journey: <Journey key="journey" />,
    toppicks: <TopPicks key="toppicks" />,
    skills: <Skills key="skills" />,
    certs: <Certs key="certs" />,
  };

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {stage === "opening" && <OpeningSequence key="opening" onDone={() => setStage("profile")} />}
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
          <Navbar onSwitchProfile={() => setStage("profile")} onResume={() => setResume(true)} />
          <main>
            <Hero onPlay={() => setIntro(true)} onResume={() => setResume(true)} />
            <ContinueWatching />
            {order.map((id) => sections[id])}
            <FinalCTA onResume={() => setResume(true)} />
          </main>
        </>
      )}

      <AnimatePresence>
        {intro && <PlayIntro key="intro" onClose={() => setIntro(false)} />}
        {resume && <ResumeModal key="resume" onClose={() => setResume(false)} />}
        {project && <ProjectModal key="project" project={project} onClose={() => setProject(null)} />}
      </AnimatePresence>
    </>
  );
}
