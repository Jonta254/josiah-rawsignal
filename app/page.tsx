"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./components/MagneticButton";
import TypeWriter from "./components/TypeWriter";
import Signature from "./components/Signature";
import SignalCockpit from "./components/SignalCockpit";
import ScrambleText from "./components/ScrambleText";
import ErrorBoundary from "./components/ErrorBoundary";

const HeroOrb              = dynamic(() => import("./components/SignalOrb"),          { ssr: false });
const HeroScene            = dynamic(() => import("./components/HeroScene"),          { ssr: false });
const ConstellationCanvas  = dynamic(() => import("./components/ConstellationCanvas"),{ ssr: false });

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

/* ─── In-view boolean ─────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/* ─── Parallax ────────────────────────────────────────────────── */
function useParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.parentElement!.getBoundingClientRect();
      el.style.transform = `translateY(${-rect.top * speed}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ─── Reveal ──────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const delayRef = useRef(delay);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const d = delayRef.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "none"; }, d);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Counter ─────────────────────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const start = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          setN(Math.round((1 - Math.pow(1 - t, 3)) * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Brian diamond letter data ──────────────────────────────── */
const BRIAN_LETTERS = [
  { ch: "B", enterAnim: "letterFromLeft 1.3s cubic-bezier(0.16,1,0.3,1) 0.20s both", floatDur: 3.2, floatDelay: 0.0, shimmerDelay: "0s",   glintDelay: "5.0s" },
  { ch: "R", enterAnim: "letterRise 1.1s cubic-bezier(0.16,1,0.3,1) 0.40s both",     floatDur: 2.8, floatDelay: 0.4, shimmerDelay: "0.6s",  glintDelay: "6.5s" },
  { ch: "I", enterAnim: "letterFlash 1.0s cubic-bezier(0.16,1,0.3,1) 0.60s both",    floatDur: 3.6, floatDelay: 0.2, shimmerDelay: "1.2s",  glintDelay: "4.8s" },
  { ch: "A", enterAnim: "letterFall 1.1s cubic-bezier(0.16,1,0.3,1) 0.80s both",     floatDur: 2.6, floatDelay: 0.6, shimmerDelay: "0.3s",  glintDelay: "7.0s" },
  { ch: "N", enterAnim: "letterFromRight 1.3s cubic-bezier(0.16,1,0.3,1) 1.00s both",floatDur: 3.0, floatDelay: 0.8, shimmerDelay: "0.9s",  glintDelay: "5.5s" },
];

const DIAMOND_GRAD = "linear-gradient(105deg,#7A8BAA 0%,#B0BEDD 10%,#DDE5F8 20%,#FFFFFF 30%,#C8D4EE 40%,#96A6C4 50%,#C0CCE8 60%,#FFFFFF 70%,#D8E2F8 80%,#92A2C0 90%,#B4C0DC 100%)";

function BrianName() {
  return (
    <div style={{ perspective: "1800px", display: "inline-block", lineHeight: 0.82 }}>
      {BRIAN_LETTERS.map(({ ch, enterAnim, floatDur, floatDelay, shimmerDelay, glintDelay }, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem,21vw,21rem)",
            letterSpacing: "-0.025em",
            lineHeight: 0.82,
            display: "inline-block",
            position: "relative",
            animation: `${enterAnim}, heroFloat ${floatDur}s ease-in-out ${floatDelay}s infinite`,
            transformOrigin: "center bottom",
            willChange: "transform, opacity",
          }}
        >
          {/* Diamond gradient letter */}
          <span style={{
            background: DIAMOND_GRAD,
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 32px rgba(180,210,255,0.45)) drop-shadow(0 0 80px rgba(140,180,255,0.20))",
            animation: `heroDiamondShimmer 4s ease-in-out ${shimmerDelay} infinite`,
          }}>{ch}</span>
          {/* Glint flash overlay */}
          <span aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: `heroGlint 7s ease-in-out ${glintDelay} infinite`,
            pointerEvents: "none",
          }}>{ch}</span>
        </span>
      ))}
    </div>
  );
}

/* ─── Section floating orbs ──────────────────────────────────── */
function SectionOrbs({ orbs }: { orbs: { x: string; y: string; w: string; color: string; blur: number; op: number; dur?: number; delay?: number }[] }) {
  return (
    <>
      {orbs.map((o, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute", left: o.x, top: o.y,
          width: o.w, height: o.w, borderRadius: "50%",
          background: o.color, filter: `blur(${o.blur}px)`,
          opacity: o.op, pointerEvents: "none", zIndex: 0,
          animation: `${i % 2 === 0 ? "floatOrb" : "floatOrbB"} ${o.dur ?? 9}s ease-in-out ${o.delay ?? 0}s infinite`,
        }} />
      ))}
    </>
  );
}

/* ─── Manifesto stagger word ────────────────────────────────────── */
function ManifestoStagger({ lines }: { lines: { text: string; color?: string; dim?: boolean }[] }) {
  const [ref, visible] = useInView(0.1);
  const allWords = lines.map((l) => ({ ...l, words: l.text.split(" ") }));
  let globalIdx = 0;
  return (
    <div ref={ref}>
      {allWords.map((line, li) => (
        <div key={li} style={{ lineHeight: 0.88, marginBottom: 6 }}>
          <span className="manifesto-xl">
            {line.words.map((word) => {
              const idx = globalIdx++;
              return (
                <span
                  key={idx}
                  className={`manifesto-word${visible ? " in" : ""}`}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                    color: line.dim ? "rgba(255,255,255,0.1)" : (line.color ?? "var(--chalk)"),
                    marginRight: "0.18em",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Accent word ─────────────────────────────────────────────── */
function Accent({ word, idx, color = "var(--copper)", size = "clamp(4rem,14vw,11rem)" }: {
  word: string; idx: number; color?: string; size?: string;
}) {
  return (
    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size, lineHeight: 0.88, letterSpacing: "0.01em", display: "inline-block" }}>
      {word.split("").map((ch, i) => (
        <span key={i} style={{ color: i === idx ? color : "var(--chalk)" }}>{ch}</span>
      ))}
    </span>
  );
}

/* ─── Work data ───────────────────────────────────────────────── */
const WORK = [
  { slug: "electrimap",      word: "FIELD",   idx: 1, title: "ElectriMap",     sub: "Mobile circuit diagramming for electricians. Offline-first.",     year: "2025", cat: "Mobile App",    color: "#D4A843" },
  { slug: "terrain-journal", word: "TERRAIN", idx: 0, title: "Terrain Journal", sub: "GPS outdoor journaling with trail overlays and photo pins.",       year: "2025", cat: "Web App",       color: "#34D399" },
  { slug: "rawpanel",        word: "SYSTEM",  idx: 3, title: "RawPanel UI",     sub: "An open design system for craftspeople who code.",                 year: "2026", cat: "Design System", color: "#A855F7" },
];

const BELIEFS = [
  { n: "01", t: "Every system is connected",             body: "Whether it is a circuit, a codebase, or a conversation — nothing works in isolation. Understanding one teaches you something true about all the rest.", accent: "var(--copper)" },
  { n: "02", t: "Craft is the respect you pay to work",  body: "Speed without care is noise. The detail no one notices is still worth getting exactly right. That discipline is what separates good work from great work.", accent: "#00C8FF" },
  { n: "03", t: "The outdoors is the only real reset",   body: "Some problems cannot be solved at a desk. The clearest thinking happens when you have stepped fully away — and that clarity carries back into everything.", accent: "#34D399" },
];

const POSTS = [
  { slug: "wiring-panel-architecture", cat: "Electrical", date: "Jun 2026", title: "What wiring a panel taught me about architecture", color: "#D4A843" },
  { slug: "design-second-language",    cat: "Design",     date: "May 2026", title: "Design as a second language",                      color: "#A855F7" },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const parallax1 = useParallax(0.18);
  const parallax2 = useParallax(0.12);
  const [s1ref, s1visible] = useInView();
  const [s2ref, s2visible] = useInView();
  const [s3ref, s3visible] = useInView();
  const [s4ref, s4visible] = useInView();
  const [s5ref, s5visible] = useInView();
  const r1 = useReveal(0), r2 = useReveal(80);
  const r3 = useReveal(0), r4 = useReveal(0), r5 = useReveal(0), r6 = useReveal(0);
  const [mounted, setMounted] = useState(false);
  const [ghRepos, setGhRepos] = useState<number | null>(null);
  const mouse       = useRef({ x: 0, y: 0 });
  const scrollY     = useRef(0);
  const cursorRef   = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ringPosRef  = useRef({ x: 0, y: 0 });
  const targetRef   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    // Cursor ring: lerp toward target
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animateRing = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, targetRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, targetRef.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top  = `${ringPosRef.current.y}px`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    animateRing();

    // Expand ring on interactive elements
    const onEnter = () => { if (ringRef.current) { ringRef.current.style.width = "56px"; ringRef.current.style.height = "56px"; ringRef.current.style.borderColor = "rgba(200,123,47,0.9)"; } };
    const onLeave = () => { if (ringRef.current) { ringRef.current.style.width = "32px"; ringRef.current.style.height = "32px"; ringRef.current.style.borderColor = "rgba(200,123,47,0.5)"; } };
    const links = document.querySelectorAll("a, button");
    links.forEach((l) => { l.addEventListener("mouseenter", onEnter); l.addEventListener("mouseleave", onLeave); });

    const onScroll = () => {
      scrollY.current = window.scrollY;
      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${Math.min(window.scrollY / total, 1)})`;
      }
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    // GitHub live repo count
    fetch("https://api.github.com/users/Jonta254")
      .then((r) => r.json())
      .then((d) => { if (d.public_repos) setGhRepos(d.public_repos); })
      .catch(() => {});
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      links.forEach((l) => { l.removeEventListener("mouseenter", onEnter); l.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      {/* Scroll progress + cursor elements */}
      <div ref={progressRef} className="scroll-progress-bar" />
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      {/* ══════════════════ HERO ══════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(160deg, #08001A 0%, #050012 35%, #020008 70%, #010006 100%)" }}>

        {/* ── 3D deep-space background scene ── */}
        {mounted && !isMobile() && (
          <ErrorBoundary>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
              <HeroScene scrollY={scrollY} mouse={mouse} />
            </div>
          </ErrorBoundary>
        )}

        {/* ── Moving aurora mesh — always visible ── */}
        <div className="hero-aurora" style={{ zIndex: 1 }} />

        {/* ── Secondary breathing glow layer ── */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 40% at 20% 90%, rgba(255,80,0,0.10) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 90% 20%, rgba(0,200,255,0.08) 0%, transparent 50%)",
          animation: "heroBreathe 8s ease-in-out infinite",
        }} />

        {/* ── CSS atmosphere layers ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 75% 90% at 15% 65%, rgba(255,100,10,0.18) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 70% at 85% 50%, rgba(0,180,255,0.12) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 45% 55% at 50% 0%, rgba(140,40,255,0.10) 0%, transparent 55%)" }} />
        {/* ── Dot grid ── */}
        <div className="dot-grid" style={{ zIndex: 2, opacity: 0.5 }} />

        {/* ── Subtle radial vignette over 3D scene ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 25%, rgba(2,0,8,0.50) 100%)" }} />

        {/* ── Photo texture — very dim, grounds the scene ── */}
        <div ref={parallax1} style={{ position: "absolute", inset: "-15%", zIndex: 2, pointerEvents: "none", opacity: 0.07, mixBlendMode: "luminosity" }}>
          <Image src="/images/rawsignal-hero.png" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        </div>

        {/* ── Bottom fade to page ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(5,0,16,0.88) 80%, #060010 100%)" }} />

        {/* ── Left text fade ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(5,0,14,0.65) 0%, rgba(5,0,14,0.20) 40%, transparent 65%)" }} />

        {/* ── 3D orb — desktop right side ── */}
        {mounted && !isMobile() && (
          <ErrorBoundary>
            <div className="hero-orb-wrap" style={{ position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)", width: "52vw", height: "80vh", zIndex: 4, pointerEvents: "none" }}>
              <HeroOrb mouse={mouse} scrollY={scrollY} fov={44} distance={5} glowIntensity={2.2} />
            </div>
          </ErrorBoundary>
        )}

        {/* Available badge */}
        <div style={{ position: "absolute", top: "clamp(5rem,10vw,7rem)", left: "clamp(1.25rem,4vw,2.5rem)", zIndex: 6, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", animation: "sig-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
            Available for work
          </span>
        </div>

        {/* Hero content — responsive via .hero-content class */}
        <div className="hero-content" style={{ position: "relative", zIndex: 6, padding: "0 clamp(1.25rem,4vw,2.5rem) clamp(2.5rem,5vw,4.5rem)" }}>

          {/* Monospace coordinate label */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(0.5rem,1vw,0.75rem)" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px,1vw,10px)", letterSpacing: "0.22em", color: "rgba(255,184,0,0.45)", textTransform: "uppercase" }}>SIGNAL.ID</span>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: "rgba(255,184,0,0.2)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px,1vw,10px)", letterSpacing: "0.18em", color: "rgba(255,255,255,0.18)" }}>01°24′S 36°49′E</span>
          </div>

          <h1 style={{ margin: 0 }}>
            <BrianName />
          </h1>

          {/* Animated gradient rule under the name */}
          <div style={{ position: "relative", width: "clamp(80px,14vw,220px)", height: 1, marginBottom: "clamp(1rem,2vw,1.5rem)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #FFD060, #FF8820, #00DFFF, #B040FF, #FF8820, #FFD060)", backgroundSize: "400% 100%", animation: "nameSweep 3.5s ease-in-out 2.2s infinite" }} />
          </div>

          <div className="hero-bottom">
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,2.2vw,1.45rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.58, width: "min(480px, calc(100vw - 2.5rem))", maxWidth: "100%", marginBottom: 14, overflowWrap: "break-word" }}>
                Precision-crafted at the intersection of circuits, code, and craft.
              </p>
              {mounted && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.3vw,12px)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>→</span>
                  <TypeWriter
                    words={["Electrician.", "Developer.", "3D web.", "Designer.", "Human."]}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.3vw,12px)", color: "var(--copper)", letterSpacing: "0.1em" }}
                  />
                </div>
              )}
            </div>
            <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <MagneticButton as="a" href="/portfolio" className="btn btn-primary" style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>Enter Work</MagneticButton>
              <MagneticButton as="a" href="/about"     className="btn btn-ghost"   style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>Read Signal</MagneticButton>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes sig-pulse{
            0%,100%{box-shadow:0 0 7px #34D399; transform:scale(1);}
            50%{box-shadow:0 0 20px #34D399,0 0 36px rgba(52,211,153,0.35); transform:scale(1.25);}
          }
          @keyframes heroFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}
          @keyframes heroDiamondShimmer{0%{background-position:200% 0}50%{background-position:0% 0}100%{background-position:-200% 0}}
          @keyframes heroGlint{0%,78%,100%{opacity:0;transform:scaleX(0.2) translateX(-80%)}84%{opacity:1;transform:scaleX(1) translateX(0)}90%{opacity:0;transform:scaleX(0.2) translateX(80%)}}
          @keyframes heroBreathe{0%,100%{opacity:0.7;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}
        `}</style>
      </section>

      {/* ══════════════════ TICKER ════════════════════════════════ */}
      <div style={{ background: "linear-gradient(to right, #06000E, #040009, #06000E)", borderTop: "1px solid rgba(255,184,0,0.08)", overflow: "hidden", padding: "14px 0" }} aria-hidden="true">
        <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
          {[...Array(3)].fill(["Electrician","Developer","3D Web","Designer","Explorer","Human","Builder","Raw Signal"]).flat().map((w, i) => (
            <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.85rem,2vw,1.1rem)", letterSpacing: "0.15em", paddingRight: "clamp(1.25rem,3vw,2.5rem)", color: i % 5 === 2 ? "var(--copper)" : "rgba(255,255,255,0.18)" }}>
              {w}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee{to{transform:translateX(-33.333%)}}`}</style>
      </div>

      <SignalCockpit />

      {/* ══════════════════ STATS ═════════════════════════════════ */}
      <section style={{ background: "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(255,136,32,0.08) 0%, transparent 60%), #080012", padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)", position: "relative", overflow: "hidden" }}>
        <SectionOrbs orbs={[
          { x: "70%", y: "-20%", w: "40vw", color: "rgba(255,136,32,0.12)", blur: 90, op: 1, dur: 11 },
          { x: "-10%", y: "30%", w: "30vw", color: "rgba(255,184,0,0.08)", blur: 70, op: 1, dur: 14, delay: 3 },
        ]} />
        <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,18vw,14rem)", color: "transparent", WebkitTextStroke: "1px rgba(255,136,32,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>STAT</div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="stats-grid">
            {[
              { n: 8,   suf: "+",  label: "Years in the trade",    live: false },
              { n: ghRepos ?? 40, suf: ghRepos ? "" : "+", label: ghRepos ? "GitHub repos" : "Projects shipped", live: !!ghRepos },
              { n: 100, suf: "s",  label: "Trails walked",          live: false },
              { n: 5,   suf: "",   label: "Disciplines mastered",   live: false },
            ].map((s) => (
              <div key={s.label} style={{ borderLeft: "1px solid rgba(255,136,32,0.12)", paddingLeft: "clamp(1rem,3vw,2rem)" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 1, color: "var(--chalk)", marginBottom: 6, display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Counter end={s.n} suffix={s.suf} />
                  {s.live && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#34D399", letterSpacing: "0.12em", paddingBottom: 4 }}>LIVE</span>}
                </div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHO IS ════════════════════════════════ */}
      <section style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(176,64,255,0.10) 0%, transparent 55%), #060010", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", overflow: "hidden", position: "relative" }}>
        {/* Interactive constellation */}
        {mounted && <ConstellationCanvas color="#B040FF" nodeCount={60} connectDist={120} />}
        <SectionOrbs orbs={[
          { x: "-15%", y: "10%", w: "50vw", color: "rgba(176,64,255,0.10)", blur: 100, op: 1, dur: 12 },
          { x: "60%",  y: "50%", w: "35vw", color: "rgba(0,200,255,0.07)", blur: 80, op: 1, dur: 16, delay: 4 },
        ]} />
        <div style={{ position: "absolute", right: "-2%", bottom: "5%", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(8rem,24vw,20rem)", color: "transparent", WebkitTextStroke: "1px rgba(176,64,255,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1, letterSpacing: "-0.05em" }}>WHO</div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="who-grid">
            <div ref={r1} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)" }}>
              <div ref={s1ref}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 24 }}>
                  <ScrambleText text="// 001 — Signal" trigger={s1visible} delay={200} />
                </p>
              </div>
              <div style={{ marginBottom: 28 }}>
                <Accent word="WHO" idx={1} size="clamp(3.5rem,13vw,11rem)" />
                <br />
                <Accent word="IS"  idx={0} size="clamp(3.5rem,13vw,11rem)" color="var(--copper)" />
              </div>
              <p style={{ fontSize: "clamp(0.9rem,1.6vw,1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,0.45)", maxWidth: 460, marginBottom: 32 }}>
                An electrician who writes code. A developer who thinks in systems. An explorer who builds things that last. Not a portfolio of skills — a single discipline of thought applied across every domain.
              </p>
              <Link href="/about" className="btn btn-ghost" style={{ fontSize: 12 }}>Read the full story →</Link>
            </div>

            <div ref={r2} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1) 80ms" }}>
              {[
                { num: "01", title: "The Electrician", color: "#D4A843" },
                { num: "02", title: "The Developer",   color: "#00C8FF" },
                { num: "03", title: "The Designer",    color: "#A855F7" },
                { num: "04", title: "The Explorer",    color: "#34D399" },
                { num: "05", title: "The Human",       color: "rgba(255,255,255,0.55)" },
              ].map((r) => (
                <Link key={r.num} href={`/about#${r.title.toLowerCase().replace("the ","")}`}
                  style={{ display: "flex", alignItems: "center", gap: 20, padding: "clamp(0.875rem,2vw,1.25rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "32px")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "20px")}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: r.color, letterSpacing: "0.1em", minWidth: 28 }}>{r.num}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", letterSpacing: "0.04em", color: "var(--chalk)", flex: 1 }}>{r.title}</span>
                  <div style={{ width: 20, height: 1, background: r.color, opacity: 0.45, flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ WORK ══════════════════════════════════ */}

      <section style={{ background: "#050010", position: "relative", overflow: "hidden" }}>
        <SectionOrbs orbs={[
          { x: "50%",  y: "-10%", w: "45vw", color: "rgba(0,200,255,0.09)", blur: 100, op: 1, dur: 13 },
          { x: "80%",  y: "40%",  w: "30vw", color: "rgba(0,255,136,0.06)", blur: 80, op: 1, dur: 17, delay: 5 },
          { x: "-5%",  y: "60%",  w: "25vw", color: "rgba(255,136,32,0.07)", blur: 70, op: 1, dur: 11, delay: 2 },
        ]} />
        <div style={{ padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem) clamp(1.5rem,4vw,3rem)", borderTop: "1px solid rgba(0,200,255,0.08)", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div ref={r3} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)" }}>
              <div ref={s2ref}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>
                  <ScrambleText text="// 002 — Work" trigger={s2visible} delay={100} />
                </p>
              </div>
              <Accent word="BUILT." idx={3} size="clamp(3rem,12vw,9rem)" />
            </div>
            <MagneticButton as="a" href="/portfolio" className="btn btn-ghost" style={{ fontSize: 12 }}>All projects →</MagneticButton>
          </div>
        </div>

        {/* ── Horizontal film-reel scroll ── */}
        <div
          style={{
            overflowX: "auto", overflowY: "hidden",
            display: "flex", gap: 0,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
          className="hide-scrollbar"
        >
          {WORK.map((p, i) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="card-3d card-shimmer-wrap"
              style={{
                display: "block", textDecoration: "none", flexShrink: 0,
                width: "min(85vw, 760px)", height: "clamp(300px,52vw,580px)",
                scrollSnapAlign: "start", position: "relative", overflow: "hidden",
                borderRight: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top)  / rect.height - 0.5;
                el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) scale(1.015)`;
                const img = el.querySelector(".proj-img") as HTMLElement;
                if (img) img.style.transform = `scale(1.05) translate(${x * -8}px, ${y * -5}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
                const img = e.currentTarget.querySelector(".proj-img") as HTMLElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Background art */}
              <div className="proj-img" style={{ position: "absolute", inset: 0, transition: "transform 700ms cubic-bezier(0.25,1,0.5,1)" }}>
                <svg viewBox="0 0 760 580" style={{ width: "100%", height: "100%", position: "absolute" }} preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id={`pg-${i}`} cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor={p.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={p.color} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="760" height="580" fill="#060010" />
                  <rect width="760" height="580" fill={`url(#pg-${i})`} />
                  {Array.from({ length: 8 }, (_, j) => <line key={`v${j}`} x1={j*110} y1="0" x2={j*110} y2="580" stroke={p.color} strokeWidth="0.3" opacity="0.06" />)}
                  {Array.from({ length: 6 }, (_, j) => <line key={`h${j}`} x1="0" y1={j*100} x2="760" y2={j*100} stroke={p.color} strokeWidth="0.3" opacity="0.06" />)}
                  <circle cx="380" cy="290" r="160" fill="none" stroke={p.color} strokeWidth="0.6" opacity="0.12" />
                  <circle cx="380" cy="290" r="80"  fill="none" stroke={p.color} strokeWidth="0.4" opacity="0.08" />
                  <text x="380" y="340" textAnchor="middle" fontFamily="Bebas Neue" fontSize="160" fill={p.color} opacity="0.03" letterSpacing="8">{p.title.toUpperCase()}</text>
                </svg>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,0,14,0.94) 0%, rgba(4,0,14,0.50) 60%, rgba(4,0,14,0.12) 100%)" }} />
              </div>
              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.25rem,3vw,2rem) clamp(1.5rem,4vw,2.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>0{i+1}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>{p.cat}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>{p.year}</span>
                </div>
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <Accent word={p.word} idx={p.idx} color={p.color} size="clamp(2.5rem,8vw,6.5rem)" />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.7rem,1.5vw,0.9rem)", color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.06em", marginBottom: 6 }}>{p.title}</h2>
                      <p style={{ fontSize: "clamp(0.75rem,1.3vw,0.875rem)", color: "rgba(255,255,255,0.25)", maxWidth: 360 }}>{p.sub}</p>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: "0.1em", flexShrink: 0 }}>View →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* End cap */}
          <Link href="/portfolio" style={{ display: "flex", flexShrink: 0, width: "min(50vw, 320px)", height: "clamp(300px,52vw,580px)", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: "#060010", borderRight: "none", textDecoration: "none", scrollSnapAlign: "start" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em" }}>MORE WORK</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--copper)", letterSpacing: "0.1em" }}>View all →</span>
          </Link>
        </div>
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
      </section>

      {/* ══════════════════ BELIEFS ═══════════════════════════════ */}
      <section style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,223,255,0.07) 0%, transparent 60%), #060012", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(0,223,255,0.07)", position: "relative", overflow: "hidden" }}>
        <SectionOrbs orbs={[
          { x: "60%",  y: "10%",  w: "40vw", color: "rgba(0,223,255,0.08)", blur: 90, op: 1, dur: 14 },
          { x: "-10%", y: "50%",  w: "35vw", color: "rgba(0,136,255,0.07)", blur: 80, op: 1, dur: 18, delay: 6 },
        ]} />
        <div style={{ position: "absolute", left: "-2%", top: "10%", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,18vw,14rem)", color: "transparent", WebkitTextStroke: "1px rgba(0,223,255,0.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>SIGNAL</div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div ref={r4} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(3rem,7vw,6rem)" }}>
            <div ref={s3ref}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>
                <ScrambleText text="// 003 — Beliefs" trigger={s3visible} delay={150} />
              </p>
            </div>
            <Accent word="SIGNAL." idx={5} size="clamp(3rem,12vw,9rem)" color="var(--copper)" />
          </div>
          <div className="beliefs-grid">
            {BELIEFS.map((b) => (
              <div key={b.n} style={{ borderTop: `1px solid ${b.accent}30`, paddingTop: "clamp(1.25rem,3vw,2rem)" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", color: b.accent, opacity: 0.10, lineHeight: 1, marginBottom: 12, fontWeight: 700 }}>{b.n}</div>
                <div style={{ width: 24, height: 1, background: b.accent, marginBottom: 18, opacity: 0.6 }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,2vw,1.2rem)", color: "var(--chalk)", lineHeight: 1.45, marginBottom: 12 }}>{b.t}</h3>
                <p style={{ fontSize: "clamp(0.8rem,1.3vw,0.9rem)", color: "rgba(255,255,255,0.40)", lineHeight: 1.75 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WRITING ═══════════════════════════════ */}
      <section style={{ background: "radial-gradient(ellipse 55% 75% at 100% 50%, rgba(168,85,247,0.10) 0%, transparent 55%), #060010", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(168,85,247,0.08)", position: "relative", overflow: "hidden" }}>
        <SectionOrbs orbs={[
          { x: "80%", y: "5%",   w: "40vw", color: "rgba(168,85,247,0.10)", blur: 90, op: 1, dur: 13 },
          { x: "20%", y: "55%",  w: "28vw", color: "rgba(80,20,180,0.08)", blur: 70, op: 1, dur: 17, delay: 4 },
        ]} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={r5} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(2.5rem,7vw,6rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div ref={s4ref}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>
                  <ScrambleText text="// 004 — Writing" trigger={s4visible} delay={100} />
                </p>
              </div>
              <Accent word="WORDS." idx={0} size="clamp(3rem,12vw,9rem)" color="#A855F7" />
            </div>
            <Link href="/blog" className="btn btn-ghost" style={{ fontSize: 12 }}>All writing →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {POSTS.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,3vw,2.5rem)", padding: "clamp(1.25rem,3vw,2rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "clamp(1.5rem,4vw,3.5rem)")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "clamp(1rem,3vw,2.5rem)")}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", minWidth: 24, flexShrink: 0 }}>0{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: post.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.cat}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.95rem,2.5vw,1.45rem)", color: "var(--chalk)", lineHeight: 1.35 }}>{post.title}</h3>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.18)", flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MANIFESTO ═════════════════════════════ */}
      <section style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,100,0,0.10) 0%, transparent 65%), #050010", position: "relative", overflow: "hidden", padding: "clamp(4rem,12vw,10rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,136,32,0.12)" }}>
        <SectionOrbs orbs={[
          { x: "50%",  y: "-20%", w: "50vw", color: "rgba(255,80,0,0.10)", blur: 110, op: 1, dur: 10 },
          { x: "-10%", y: "30%",  w: "40vw", color: "rgba(255,184,0,0.08)", blur: 90, op: 1, dur: 15, delay: 3 },
          { x: "70%",  y: "60%",  w: "30vw", color: "rgba(255,40,0,0.07)", blur: 80, op: 1, dur: 13, delay: 6 },
        ]} />
        <div ref={parallax2} style={{ position: "absolute", inset: "-15%", zIndex: 0, opacity: 0.07 }}>
          <Image src="/images/rawsignal-hero.png" alt="" fill style={{ objectFit: "cover" }} sizes="100vw" />
        </div>
        <div ref={r6} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.9s cubic-bezier(0.25,1,0.5,1)", position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>
          <div ref={s5ref}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 28 }}>
              <ScrambleText text="// 005 — Manifesto" trigger={s5visible} delay={200} />
            </p>
          </div>
          <div style={{ marginBottom: 40 }}>
            <ManifestoStagger lines={[
              { text: "BUILD." },
              { text: "CONNECT.", color: "#00C8FF" },
              { text: "GROW.",    dim: true },
              { text: "REPEAT." },
            ]} />
          </div>
          <div style={{ display: "flex", gap: "clamp(1.5rem,4vw,2.5rem)", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "clamp(0.875rem,1.6vw,1.1rem)", color: "rgba(255,255,255,0.38)", maxWidth: 500, lineHeight: 1.82, marginBottom: "1.5rem" }}>
                The finest work emerges where physical systems, digital precision, and human intention converge. I build at that exact intersection — where the signal is honest enough to be trusted and refined enough to ship with confidence.
              </p>
              <Signature color="#C87B2F" width={240} />
            </div>
            <MagneticButton as="a" href="/contact" className="btn btn-primary">Start a conversation</MagneticButton>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ════════════════════════════ */}
      <section className="safe-bottom" style={{ background: "#06000F", padding: "clamp(3.5rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(0,255,136,0.07)", position: "relative", overflow: "hidden" }}>
        <SectionOrbs orbs={[
          { x: "70%", y: "0%",  w: "35vw", color: "rgba(0,255,136,0.08)", blur: 90, op: 1, dur: 12 },
          { x: "10%", y: "50%", w: "25vw", color: "rgba(0,180,255,0.06)", blur: 70, op: 1, dur: 16, delay: 4 },
        ]} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "var(--copper)", marginBottom: 10 }}>Think alongside me.</p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.32)", marginBottom: 28, lineHeight: 1.78 }}>Occasional writing on building, designing, and living with intention. Infrequent. Honest. Never noise.</p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" required
              style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#EAEDF2", fontFamily: "'Inter',sans-serif", fontSize: "0.9375rem", padding: "0.875rem 1.125rem", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(200,123,47,0.4)")}
              onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
