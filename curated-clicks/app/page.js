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
        className={`flex min-h-screen items-center justify-center px-6 pb-52 pt-16 transition-all duration-500 ${
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

      <nav className="fixed inset-x-0 bottom-0 z-40 px-4 pb-8 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-1 h-px w-full bg-zinc-700/70" />
          <div className="mb-3 h-px w-full bg-zinc-800/80" />

          <div
            ref={trainRef}
            className={`flex items-end gap-1.5 sm:gap-2 ${isStarted ? "train-running" : "train-idle"}`}
          >
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
              <span className={`steam-puff steam-one ${isStarted ? "opacity-100" : "opacity-0"}`} />
              <span className={`steam-puff steam-two ${isStarted ? "opacity-100" : "opacity-0"}`} />
              <span className="absolute left-3 right-3 top-4 h-2 rounded-sm bg-zinc-500/40" />
              <span className="absolute bottom-7 left-3 right-3 h-1 rounded-sm bg-zinc-500/40" />
              Home
              <span className="wheel wheel-left" />
              <span className="wheel wheel-right" />
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
                      className={`relative h-16 w-20 rounded-t-lg border-t-2 text-[10px] font-semibold uppercase tracking-widest transition sm:w-24 sm:text-xs ${
                        isActive
                          ? "border-amber-400 bg-zinc-700 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.18)]"
                          : isStarted
                            ? "border-zinc-500 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                            : "cursor-not-allowed border-zinc-700 bg-zinc-900 text-zinc-500"
                      }`}
                      aria-label={`Go to ${section.label}`}
                    >
                      <span className="absolute left-2 right-2 top-3 h-1.5 rounded-sm bg-zinc-500/35" />
                      {section.label}
                      <span className="wheel wheel-left" />
                      <span className="wheel wheel-right" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .train-running {
          animation: trainBob 1.4s ease-in-out infinite;
        }

        .train-idle {
          animation: trainBob 2.8s ease-in-out infinite;
        }

        .wheel {
          position: absolute;
          bottom: -14px;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          border: 2px solid rgb(161 161 170);
          background: rgb(24 24 27);
          box-shadow: inset 0 0 0 2px rgb(63 63 70);
          animation: wheelSpin 0.7s linear infinite;
        }

        .wheel-left {
          left: 22%;
        }

        .wheel-right {
          right: 22%;
        }

        .steam-puff {
          position: absolute;
          left: 50%;
          top: -26px;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: rgba(212, 212, 216, 0.8);
          filter: blur(0.5px);
          pointer-events: none;
          transform: translateX(-50%);
        }

        .steam-one {
          animation: steamRise 1.5s ease-out infinite;
        }

        .steam-two {
          animation: steamRise 1.5s ease-out infinite 0.75s;
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes steamRise {
          0% {
            transform: translate(-50%, 0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -24px) scale(1.35);
            opacity: 0;
          }
        }

        @keyframes trainBob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </main>
  );
}
