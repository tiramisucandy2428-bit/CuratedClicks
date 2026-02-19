"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

const sections = [
  { id: "home", label: "Home", heading: "Welcome Home" },
  { id: "blog", label: "Blog", heading: "Latest Clicks" },
  { id: "tools", label: "Tools", heading: "Toolbox" },
  { id: "reviews", label: "Reviews", heading: "Trusted Reviews" },
];

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const trainRef = useRef(null);
  const steamRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const startJourney = () => {
    if (isStarted) {
      setActiveSection("home");
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsStarted(true);
        setActiveSection("home");
      },
    });

    timeline
      .to(trainRef.current, {
        x: 8,
        duration: 0.08,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
      })
      .fromTo(
        steamRef.current,
        { y: 0, opacity: 0, scale: 0.7 },
        { y: -20, opacity: 1, scale: 1.15, duration: 0.3, ease: "power2.out" },
        0
      )
      .to(steamRef.current, { opacity: 0, duration: 0.25 }, "+=0.05")
      .to(overlayRef.current, { opacity: 0, duration: 0.45, pointerEvents: "none" }, "-=0.15")
      .to(contentRef.current, { filter: "blur(0px)", scale: 1, duration: 0.45 }, "<");
  };

  const handleSectionClick = (sectionId) => {
    if (!isStarted) return;
    setActiveSection(sectionId);
  };

  const current = sections.find((section) => section.id === activeSection) ?? sections[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <section
        ref={contentRef}
        className={`flex min-h-screen items-center justify-center px-6 pb-44 pt-16 transition-all duration-500 ${
          isStarted ? "blur-0 scale-100" : "blur-sm scale-[0.98]"
        }`}
      >
        <h1 className="text-center text-4xl font-semibold tracking-wide text-zinc-100 sm:text-6xl">
          {current.heading}
        </h1>
      </section>

      <div
        ref={overlayRef}
        className={`absolute inset-0 z-30 flex items-center justify-center bg-black/55 px-6 text-center transition-opacity duration-500 ${
          isStarted ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <p className="animate-pulse text-sm font-medium uppercase tracking-[0.2em] text-amber-300 sm:text-base">
          Click the train engine to start
        </p>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-2 h-px w-full bg-zinc-700/70" />

          <div ref={trainRef} className="flex items-end gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={startJourney}
              className={`relative h-20 w-24 rounded-t-xl border-t-2 text-xs font-bold uppercase tracking-wider transition sm:w-28 ${
                activeSection === "home"
                  ? "border-amber-400 bg-zinc-700 text-amber-300"
                  : "border-zinc-500 bg-zinc-800 text-zinc-200"
              }`}
              aria-label="Go to home"
            >
              <span className="absolute -top-5 left-1/2 h-5 w-3 -translate-x-1/2 rounded-sm bg-zinc-700" />
              <span
                ref={steamRef}
                className="pointer-events-none absolute -top-10 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-zinc-200/70 opacity-0 blur-[1px]"
              />
              Home
            </button>

            {sections
              .filter((section) => section.id !== "home")
              .map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <div key={section.id} className="flex items-end gap-1.5 sm:gap-2">
                    <span className="mb-6 h-0.5 w-2 bg-zinc-500/70 sm:w-3" />
                    <button
                      type="button"
                      onClick={() => handleSectionClick(section.id)}
                      disabled={!isStarted}
                      className={`h-16 w-20 rounded-t-lg border-t-2 text-[10px] font-semibold uppercase tracking-widest transition sm:w-24 sm:text-xs ${
                        isActive
                          ? "border-amber-400 bg-zinc-700 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.18)]"
                          : isStarted
                            ? "border-zinc-500 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                            : "cursor-not-allowed border-zinc-700 bg-zinc-900 text-zinc-500"
                      }`}
                      aria-label={`Go to ${section.label}`}
                    >
                      {section.label}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </nav>
    </main>
  );
}
