"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const sections = [
  { id: "home", label: "Home", heading: "Welcome Home" },
  { id: "blog", label: "Blog", heading: "Latest Clicks" },
  { id: "tools", label: "Tools", heading: "Toolbox" },
  { id: "reviews", label: "Reviews", heading: "Trusted Reviews" },
];

const treePositions = [2, 9, 15, 23, 30, 38, 45, 52, 60, 67, 74, 82, 89, 97, 104, 112];

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isNight, setIsNight] = useState(false);

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

  useEffect(() => {
    const updateThemeByTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 19 || hour < 6);
    };

    updateThemeByTime();
    const intervalId = setInterval(updateThemeByTime, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  const current = sections.find((section) => section.id === activeSection) ?? sections[0];

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 ${
        isNight ? "scene-night" : "scene-day"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="sky-gradient" />
        <div className="sun-glow" />

        <div className="cloud cloud-one"><span /></div>
        <div className="cloud cloud-two"><span /></div>
        <div className="cloud cloud-three"><span /></div>

        <div className="bird bird-one"><span /></div>
        <div className="bird bird-two"><span /></div>
        <div className="bird bird-three"><span /></div>

        <div className="water water-back" />
        <div className="water water-mid" />
        <div className="water water-front" />
        <div className="water-glint glint-one" />
        <div className="water-glint glint-two" />
      </div>

      <section
        ref={contentRef}
        className={`relative z-20 flex min-h-screen items-center justify-center px-6 pb-52 pt-16 transition-all duration-500 ${
          isStarted ? "blur-0 scale-100" : "blur-sm scale-[0.98]"
        }`}
      >
        <h1 className="text-center text-4xl font-semibold tracking-wide text-zinc-100 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-6xl">
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
          <div className="track-line mb-1 h-px w-full" />
          <div className="track-line mb-3 h-px w-full opacity-65" />

          <div
            ref={trainRef}
            className={`flex items-end gap-1.5 sm:gap-2 ${isStarted ? "train-running" : "train-idle"}`}
          >
            <button
              type="button"
              onClick={startJourney}
              className={`relative h-20 w-24 rounded-t-xl border-t-2 text-xs font-bold uppercase tracking-wider transition sm:w-28 ${
                activeSection === "home"
                  ? "engine-active border-amber-400 text-amber-200"
                  : "engine-body border-zinc-500 text-zinc-200"
              }`}
              aria-label="Go to home"
            >
              <span className="chimney absolute -top-5 left-[68%] h-5 w-3 -translate-x-1/2 rounded-sm" />
              <span
                ref={steamRef}
                className="smoke-origin pointer-events-none absolute -top-10 h-6 w-6 -translate-x-1/2 rounded-full bg-zinc-200/70 opacity-0 blur-[1px]"
              />
              <span className={`smoke-origin steam-puff steam-one ${isStarted ? "opacity-100" : "opacity-0"}`} />
              <span className={`smoke-origin steam-puff steam-two ${isStarted ? "opacity-100" : "opacity-0"}`} />
              <span className="window-strip absolute left-3 right-3 top-4 h-2 rounded-sm" />
              <span className="plate-strip absolute bottom-7 left-3 right-3 h-1 rounded-sm" />
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
                          ? "car-active border-amber-400 text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.18)]"
                          : isStarted
                            ? "car-body border-zinc-500 text-zinc-200 hover:brightness-110"
                            : "cursor-not-allowed border-zinc-700 bg-zinc-900 text-zinc-500"
                      }`}
                      aria-label={`Go to ${section.label}`}
                    >
                      <span className="window-strip absolute left-2 right-2 top-3 h-1.5 rounded-sm" />
                      <span className="bogey-window window-left" />
                      <span className="bogey-window window-mid" />
                      <span className="bogey-window window-right" />
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

      <div className="pointer-events-none fixed inset-x-0 bottom-7 z-[45] h-24 overflow-hidden">
        <div className="forest-row forest-row-one">
          {treePositions.map((position, index) => (
            <div
              key={`tree-one-${position}`}
              className={`tree ${index % 3 === 0 ? "tree-lg" : index % 3 === 1 ? "tree-md" : "tree-sm"}`}
              style={{ left: `${position}%` }}
            >
              <span className="tree-crown" />
              <span className="tree-trunk" />
            </div>
          ))}
        </div>

        <div className="forest-row forest-row-two">
          {treePositions.map((position, index) => (
            <div
              key={`tree-two-${position}`}
              className={`tree ${index % 2 === 0 ? "tree-md" : "tree-sm"}`}
              style={{ left: `${position + 4}%` }}
            >
              <span className="tree-crown" />
              <span className="tree-trunk" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scene-day {
          --sky-top: #1f2130;
          --sky-mid: #3f2a3a;
          --sky-horizon: #b4532a;
          --sky-bottom: #5b2a24;
          --glow-main: rgba(251, 146, 60, 0.62);
          --glow-mid: rgba(251, 146, 60, 0.16);
          --cloud-top: rgba(255, 237, 213, 0.84);
          --cloud-bottom: rgba(252, 211, 167, 0.56);
          --cloud-shadow: rgba(24, 24, 27, 0.22);
          --bird-color: rgba(15, 23, 42, 0.62);
          --water-back-top: rgba(251, 146, 60, 0.28);
          --water-back-bottom: rgba(37, 39, 78, 0.62);
          --water-mid-top: rgba(249, 115, 22, 0.35);
          --water-mid-bottom: rgba(31, 41, 91, 0.76);
          --water-front-top: rgba(251, 146, 60, 0.36);
          --water-front-bottom: rgba(30, 27, 75, 0.9);
          --water-glint: rgba(254, 215, 170, 0.78);
          --tree-crown: rgba(20, 83, 45, 0.92);
          --tree-trunk: rgba(68, 32, 10, 0.9);
          --bogey-window: rgba(148, 163, 184, 0.45);
          --bogey-window-glow: 0 0 0 rgba(0, 0, 0, 0);
        }

        .scene-night {
          --sky-top: #070b1a;
          --sky-mid: #111932;
          --sky-horizon: #2b1f46;
          --sky-bottom: #140f2c;
          --glow-main: rgba(186, 230, 253, 0.26);
          --glow-mid: rgba(186, 230, 253, 0.08);
          --cloud-top: rgba(191, 219, 254, 0.32);
          --cloud-bottom: rgba(148, 163, 184, 0.2);
          --cloud-shadow: rgba(2, 6, 23, 0.34);
          --bird-color: rgba(226, 232, 240, 0.46);
          --water-back-top: rgba(59, 130, 246, 0.22);
          --water-back-bottom: rgba(30, 41, 59, 0.7);
          --water-mid-top: rgba(37, 99, 235, 0.28);
          --water-mid-bottom: rgba(23, 37, 84, 0.84);
          --water-front-top: rgba(56, 189, 248, 0.2);
          --water-front-bottom: rgba(15, 23, 42, 0.95);
          --water-glint: rgba(191, 219, 254, 0.58);
          --tree-crown: rgba(15, 23, 42, 0.92);
          --tree-trunk: rgba(30, 41, 59, 0.88);
          --bogey-window: rgba(251, 191, 36, 0.9);
          --bogey-window-glow: 0 0 10px rgba(251, 191, 36, 0.6);
        }

        .sky-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            var(--sky-top) 0%,
            var(--sky-mid) 30%,
            var(--sky-horizon) 62%,
            var(--sky-bottom) 100%
          );
        }

        .sun-glow {
          position: absolute;
          top: 8%;
          right: 10%;
          width: 260px;
          height: 260px;
          border-radius: 9999px;
          background: radial-gradient(circle, var(--glow-main) 0%, var(--glow-mid) 58%, transparent 75%);
          animation: sunPulse 6s ease-in-out infinite;
        }

        .cloud {
          position: absolute;
          height: 28px;
          border-radius: 9999px;
          background: linear-gradient(180deg, var(--cloud-top) 0%, var(--cloud-bottom) 100%);
          filter: drop-shadow(0 8px 10px var(--cloud-shadow));
        }

        .cloud::before,
        .cloud::after,
        .cloud span {
          position: absolute;
          border-radius: 9999px;
          background: linear-gradient(180deg, var(--cloud-top) 0%, var(--cloud-bottom) 100%);
        }

        .cloud::before {
          content: "";
          width: 34px;
          height: 34px;
          top: -12px;
          left: 12px;
        }

        .cloud::after {
          content: "";
          width: 40px;
          height: 40px;
          top: -18px;
          right: 10px;
        }

        .cloud span {
          content: "";
          width: 26px;
          height: 26px;
          top: -8px;
          right: 42%;
        }

        .cloud-one {
          top: 14%;
          width: 110px;
          left: -120px;
          animation: cloudDrift 28s linear infinite;
        }

        .cloud-two {
          top: 20%;
          width: 140px;
          left: -180px;
          opacity: 0.82;
          animation: cloudDrift 36s linear infinite 5s;
        }

        .cloud-three {
          top: 11%;
          width: 90px;
          left: -140px;
          opacity: 0.74;
          animation: cloudDrift 24s linear infinite 10s;
        }

        .bird {
          position: absolute;
          width: 20px;
          height: 9px;
          border-top: 2px solid var(--bird-color);
          border-right: 2px solid var(--bird-color);
          border-radius: 90% 90% 0 0;
          transform: rotate(-18deg);
        }

        .bird::after,
        .bird span {
          position: absolute;
          width: 20px;
          height: 9px;
          border-top: 2px solid var(--bird-color);
          border-left: 2px solid var(--bird-color);
          border-radius: 90% 90% 0 0;
        }

        .bird::after {
          content: "";
          left: 16px;
          top: -1px;
          transform: rotate(24deg);
        }

        .bird span {
          left: 8px;
          top: 4px;
          width: 8px;
          height: 4px;
          border: 0;
          background: var(--bird-color);
          border-radius: 9999px;
        }

        .bird-one {
          top: 17%;
          left: -24px;
          animation: birdFly 18s linear infinite;
        }

        .bird-two {
          top: 22%;
          left: -44px;
          transform: scale(0.8) rotate(-35deg);
          animation: birdFly 22s linear infinite 4s;
        }

        .bird-three {
          top: 13%;
          left: -54px;
          transform: scale(0.65) rotate(-35deg);
          animation: birdFly 16s linear infinite 7s;
        }

        .water {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 42% 42% 0 0;
        }

        .water-back {
          bottom: 86px;
          width: 150%;
          height: 280px;
          background: linear-gradient(180deg, var(--water-back-top) 0%, var(--water-back-bottom) 100%);
          animation: waveShift 8s ease-in-out infinite;
        }

        .water-mid {
          bottom: 50px;
          width: 170%;
          height: 260px;
          background: linear-gradient(180deg, var(--water-mid-top) 0%, var(--water-mid-bottom) 100%);
          animation: waveShift 6.5s ease-in-out infinite reverse;
        }

        .water-front {
          bottom: 0;
          width: 200%;
          height: 210px;
          background: linear-gradient(180deg, var(--water-front-top) 0%, var(--water-front-bottom) 100%);
          animation: waveShift 5.6s ease-in-out infinite;
        }

        .water-glint {
          position: absolute;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, transparent, var(--water-glint), transparent);
          opacity: 0.7;
          animation: glintMove 5s linear infinite;
        }

        .glint-one {
          bottom: 128px;
          width: 200px;
          left: 14%;
          animation-delay: 0.2s;
        }

        .glint-two {
          bottom: 98px;
          width: 160px;
          left: 62%;
          animation-delay: 2.4s;
        }

        .train-running {
          animation: trainBob 1.4s ease-in-out infinite;
        }

        .train-idle {
          animation: trainBob 2.8s ease-in-out infinite;
        }

        .wheel {
          position: absolute;
          bottom: -15px;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          border: 2px solid rgb(212 212 216);
          background: radial-gradient(circle at 35% 35%, rgb(82 82 91), rgb(24 24 27));
          box-shadow: inset 0 0 0 2px rgb(63 63 70), 0 2px 2px rgba(0, 0, 0, 0.35);
          animation: wheelSpin 0.7s linear infinite;
        }

        .wheel::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 12px;
          background: rgba(228, 228, 231, 0.8);
          transform: translate(-50%, -50%) rotate(45deg);
          box-shadow: 0 0 0 0 transparent, 0 0 0 0 transparent;
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
          filter: blur(0.8px);
          pointer-events: none;
          transform: translateX(-50%);
        }

        .engine-body {
          background: linear-gradient(180deg, #3f3f46 0%, #27272a 65%, #18181b 100%);
        }

        .engine-active {
          background: linear-gradient(180deg, #52525b 0%, #2f2f35 62%, #1a1a1f 100%);
        }

        .car-body {
          background: linear-gradient(180deg, #3f3f46 0%, #27272a 68%, #18181b 100%);
        }

        .car-active {
          background: linear-gradient(180deg, #4b5563 0%, #2f2f35 62%, #1a1a1f 100%);
        }

        .chimney {
          background: linear-gradient(180deg, #52525b 0%, #27272a 100%);
        }

        .window-strip {
          background: linear-gradient(90deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.45), rgba(251, 191, 36, 0.15));
        }

        .plate-strip {
          background: linear-gradient(90deg, rgba(161, 161, 170, 0.1), rgba(212, 212, 216, 0.45), rgba(161, 161, 170, 0.1));
        }

        .track-line {
          background: linear-gradient(90deg, rgba(82, 82, 91, 0.2), rgba(161, 161, 170, 0.8), rgba(82, 82, 91, 0.2));
        }

        .bogey-window {
          position: absolute;
          top: 6px;
          width: 9px;
          height: 6px;
          border-radius: 2px;
          background: var(--bogey-window);
          box-shadow: var(--bogey-window-glow);
          transition: background 350ms ease, box-shadow 350ms ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .window-left {
          left: 15%;
        }

        .window-mid {
          left: 50%;
          transform: translateX(-50%);
        }

        .window-right {
          right: 15%;
        }

        .smoke-origin {
          left: 68%;
        }

        .forest-row {
          position: absolute;
          inset: 0;
          width: 140%;
          left: -15%;
        }

        .forest-row-one {
          animation: forestSlide 18s linear infinite;
          opacity: 0.95;
        }

        .forest-row-two {
          animation: forestSlide 26s linear infinite;
          opacity: 0.65;
          transform: translateY(8px) scale(0.92);
        }

        .tree {
          position: absolute;
          bottom: 0;
          width: 26px;
          height: 100%;
        }

        .tree-crown {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 13px solid transparent;
          border-right: 13px solid transparent;
          border-bottom: 38px solid var(--tree-crown);
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
        }

        .tree-crown::after {
          content: "";
          position: absolute;
          left: -10px;
          top: 16px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 24px solid var(--tree-crown);
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 5px;
          height: 18px;
          transform: translateX(-50%);
          background: var(--tree-trunk);
          border-radius: 2px;
        }

        .tree-lg {
          transform: scale(1.08);
        }

        .tree-md {
          transform: scale(0.92);
        }

        .tree-sm {
          transform: scale(0.78);
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

        @keyframes sunPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes cloudDrift {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(100vw + 320px));
          }
        }

        @keyframes birdFly {
          0% {
            transform: translateX(0) translateY(0) scale(1) rotate(-18deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          50% {
            transform: translateX(55vw) translateY(-14px) scale(1.05) rotate(-18deg);
          }
          100% {
            transform: translateX(calc(100vw + 140px)) translateY(6px) scale(0.98) rotate(-18deg);
            opacity: 0.95;
          }
        }

        @keyframes waveShift {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-49.2%) translateY(-4px);
          }
        }

        @keyframes glintMove {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.45;
          }
          100% {
            opacity: 0;
            transform: translateX(34px);
          }
        }

        @keyframes forestSlide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(16%);
          }
        }
      `}</style>
    </main>
  );
}
