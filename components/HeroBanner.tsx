"use client";
import { useEffect, useRef } from "react";

export default function HeroBanner() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Desktop video — fades out near end, loops after 6s pause
  useEffect(() => {
    const video = desktopVideoRef.current;
    if (!video) return;
    let rafId: number;
    let restartTimeout: ReturnType<typeof setTimeout>;
    const check = () => {
      if (!video.paused && !video.ended && video.duration > 0) {
        const remaining = video.duration - video.currentTime;
        video.style.opacity = remaining < 0.3 ? "0" : "1";
      }
      rafId = requestAnimationFrame(check);
    };
    const handleEnded = () => {
      video.style.opacity = "0";
      restartTimeout = setTimeout(() => {
        video.currentTime = 0;
        video.play();
        video.style.opacity = "1";
      }, 6000);
    };
    rafId = requestAnimationFrame(check);
    video.addEventListener("ended", handleEnded);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(restartTimeout);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Mobile video — plays once, pauses 4s, then loops forever
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;
    let firstPlay = true;
    let restartTimeout: ReturnType<typeof setTimeout>;
    const handleEnded = () => {
      if (firstPlay) {
        firstPlay = false;
        video.style.opacity = "0";
        restartTimeout = setTimeout(() => {
          video.currentTime = 0;
          video.play();
          video.style.opacity = "1";
        }, 4000);
      } else {
        video.currentTime = 0;
        video.play();
      }
    };
    video.addEventListener("ended", handleEnded);
    return () => {
      clearTimeout(restartTimeout);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <>
      {/* ── MOBILE layout ── */}
      <section
        className="relative md:hidden overflow-hidden"
        style={{ background: "#e8d0ae", minHeight: "460px" }}
        aria-label="Pagrindinis banner"
      >
        {/* Video fills the section naturally */}
        <video
          ref={mobileVideoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 block"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/kitten-hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Text overlaid at the top */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-24 pb-4 z-10">
          <p className="text-[#7a4f1e] text-xs font-bold tracking-[0.22em] uppercase mb-3">
            Gyvūnų prieglauda · Vilnius
          </p>
          <h1
            className="font-display text-[clamp(2rem,8vw,3rem)] font-black leading-[1.04] mb-5"
            style={{ color: "#2d1e0e" }}
          >
            Kiekviena
            <br />
            <em style={{ fontStyle: "italic", color: "#c4622d" }}>uodegėlė</em>
            <br />
            nusipelno namų
          </h1>
          <div className="flex flex-wrap gap-3">
            <a href="/gyvunai" className="btn-primary text-sm">
              🐾 Žiūrėti globotinius
            </a>
            <a
              href="/parama"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold border-2 transition-all text-sm"
              style={{ borderColor: "#2d1e0e", color: "#2d1e0e" }}
            >
              ♥ Prisidėti
            </a>
          </div>
        </div>
      </section>

      {/* ── DESKTOP layout (original with absolute video) ── */}
      <section
        className="relative min-h-screen hidden md:flex items-center overflow-hidden"
        style={{ background: "#e8d0ae" }}
        aria-label="Pagrindinis banner"
      >
        <video
          ref={desktopVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-200"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/cat-hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/kitten-hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Gradient veil */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(100deg, rgba(229,205,171,0.75) 0%, rgba(229,205,171,0.35) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Faint paw prints */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            { top: "12%", left: "5%", size: 54, rot: -18 },
            { top: "70%", left: "2%", size: 36, rot: 12 },
            { top: "55%", right: "6%", size: 44, rot: -6 },
            { top: "15%", right: "8%", size: 30, rot: 20 },
          ].map((p, i) => (
            <PawPrint
              key={i}
              size={p.size}
              style={{
                position: "absolute",
                top: p.top,
                left: (p as any).left,
                right: (p as any).right,
                transform: `rotate(${p.rot}deg)`,
                opacity: 0.12,
              }}
            />
          ))}
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-28 w-full">
          <div className="max-w-lg opacity-0 animate-slide-up">
            <p className="text-[#7a4f1e] text-xs font-bold tracking-[0.22em] uppercase mb-5">
              Gyvūnų prieglauda · Vilnius
            </p>
            <h1
              className="font-display text-[clamp(2.8rem,6vw,5.2rem)] font-black leading-[1.04] mb-7"
              style={{ color: "#2d1e0e" }}
            >
              Kiekviena
              <br />
              <em style={{ fontStyle: "italic", color: "#c4622d" }}>uodegėlė</em>
              <br />
              verta namų
            </h1>
            <p className="text-[#4a2e10] text-lg leading-relaxed mb-10 font-light">
              Mes gelbstim sužeistus ir beglobiams likusius gyvūnus. Suteikiame
              veterinarinę pagalbą, laikiną globą ir ieškome jiems tikrų namų.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/gyvunai" className="btn-primary">
                🐾 Žiūrėti globotinius
              </a>
              <a
                href="/parama"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold border-2 transition-all hover:-translate-y-0.5"
                style={{ borderColor: "#2d1e0e", color: "#2d1e0e" }}
              >
                ♥ Prisidėti
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, transparent, #e8d0ae)" }}
          aria-hidden="true"
        />
      </section>
    </>
  );
}

function PawPrint({
  size = 40,
  style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="#7a4f1e" style={style}>
      <ellipse cx="20" cy="28" rx="10" ry="8" />
      <ellipse cx="10" cy="18" rx="5" ry="6" />
      <ellipse cx="30" cy="18" rx="5" ry="6" />
      <ellipse cx="15" cy="10" rx="4" ry="5" />
      <ellipse cx="25" cy="10" rx="4" ry="5" />
    </svg>
  );
}
