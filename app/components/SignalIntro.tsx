"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "./ErrorBoundary";

const SignalOrb = dynamic(() => import("./SignalOrb"), { ssr: false });

const MODULES = [
  { label: "ELECTRICAL", sub: "Power Systems",  color: "#D4A843" },
  { label: "DEVELOPMENT", sub: "Digital",       color: "#00C8FF" },
  { label: "DESIGN",      sub: "Visual",        color: "#A855F7" },
  { label: "NATURE",      sub: "Field",         color: "#34D399" },
  { label: "HUMAN",       sub: "Core Signal",   color: "#F5F0E8" },
];

type Phase = "boot" | "circuit" | "orb" | "modules" | "ready" | "exit";

export default function SignalIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const [phase, setPhase]             = useState<Phase>("boot");
  const [activeModules, setActiveModules] = useState<number[]>([]);
  const [orbOpacity, setOrbOpacity]   = useState(0);
  const [visible, setVisible]         = useState(true);

  const dismiss = useCallback(() => {
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("rawsignal-intro", "1");
    setPhase("exit");
    setTimeout(() => setVisible(false), 650);
    setTimeout(onComplete, 850);
  }, [onComplete]);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("rawsignal-intro") === "1") {
      onComplete(); return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete(); return;
    }

    const ts: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); ts.push(id); };

    t(() => setPhase("circuit"), 300);
    t(() => setPhase("orb"),     1050);
    t(() => setOrbOpacity(1),    1150);
    t(() => setPhase("modules"), 1850);
    MODULES.forEach((_, i) => t(() => setActiveModules((p) => [...p, i]), 1850 + i * 260));
    t(() => setPhase("ready"),   3300);
    t(() => setPhase("exit"),    3900);
    t(() => { setVisible(false); sessionStorage.setItem("rawsignal-intro", "1"); }, 4550);
    t(onComplete, 4700);

    return () => ts.forEach(clearTimeout);
  }, [onComplete]);

  /* ── Canvas circuit traces ────────────────────────────────── */
  useEffect(() => {
    if (phase === "boot") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const COLORS = ["#D4A843","#00C8FF","#A855F7","#34D399","#F5F0E8"];

    interface Seg { x1:number; y1:number; x2:number; y2:number; color:string; delay:number; }
    const segs: Seg[] = [];

    const addBranch = (x1:number, y1:number, angle:number, len:number, color:string, delay:number, depth:number) => {
      if (depth > 2 || len < 25) return;
      const x2 = x1 + Math.cos(angle) * len;
      const y2 = y1 + Math.sin(angle) * len;
      segs.push({ x1, y1, x2, y2, color, delay });
      if (Math.random() > 0.4) addBranch(x2, y2, angle + (Math.random() - 0.5) * 0.9, len * 0.65, color, delay + 180, depth + 1);
      if (Math.random() > 0.6) addBranch(x2, y2, angle + (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2 + (Math.random() - 0.5) * 0.4), len * 0.5, color, delay + 280, depth + 1);
    };

    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.3;
      addBranch(cx, cy, angle, 70 + Math.random() * Math.max(W, H) * 0.38, COLORS[i % COLORS.length], i * 35, 0);
    }

    const startTime = performance.now();
    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const elapsed = now - startTime;
      segs.forEach((seg) => {
        const age = elapsed - seg.delay;
        if (age <= 0) return;
        const prog = Math.min(1, age / 600);
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x1 + (seg.x2 - seg.x1) * prog, seg.y1 + (seg.y2 - seg.y1) * prog);
        ctx.strokeStyle = seg.color; ctx.globalAlpha = 0.09; ctx.lineWidth = 0.6; ctx.stroke();
        if (prog > 0.9) {
          ctx.beginPath(); ctx.arc(seg.x2, seg.y2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = seg.color; ctx.globalAlpha = 0.45; ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  if (!visible) return null;

  const isExit    = phase === "exit";
  const showOrb   = phase === "orb" || phase === "modules" || phase === "ready";
  const showMods  = phase === "modules" || phase === "ready";
  const showReady = phase === "ready";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: isExit ? 0 : 1,
      transition: isExit ? "opacity 700ms cubic-bezier(0.4,0,1,1)" : "none",
      overflow: "hidden",
      /* ensure page isn't scrollable while intro runs */
      touchAction: "none",
    }}>
      {/* Circuit canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* 3D Orb */}
      {showOrb && (
        <ErrorBoundary>
          <div style={{
            position: "absolute",
            width: "min(60vw, 420px)", height: "min(60vw, 420px)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: orbOpacity,
            transition: "opacity 900ms cubic-bezier(0.25,1,0.5,1)",
            pointerEvents: "none",
          }}>
            <SignalOrb fov={42} distance={5} glowIntensity={2} />
          </div>
        </ErrorBoundary>
      )}

      {/* UI panel */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "min(520px, 92vw)", padding: "0 clamp(1.25rem,5vw,2.5rem)", textAlign: "center" }}>

        {/* Label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(8px,1.8vw,11px)",
          letterSpacing: "0.22em", color: "rgba(200,123,47,0.6)",
          textTransform: "uppercase", marginBottom: "clamp(18px,4vw,28px)",
          opacity: phase === "boot" ? 0 : 1, transition: "opacity 600ms ease",
        }}>
          RAWSIGNAL.OS · INITIALIZING
        </div>

        {/* Module bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,2vw,12px)", marginBottom: "clamp(16px,4vw,28px)" }}>
          {MODULES.map((m, i) => {
            const active = activeModules.includes(i);
            return (
              <div key={m.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                opacity: showMods ? (active ? 1 : 0.12) : 0,
                transform: showMods ? (active ? "none" : "translateY(4px)") : "translateY(8px)",
                transition: "opacity 400ms ease, transform 400ms ease",
              }}>
                {/* Progress track */}
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: "100%",
                    width: active ? "100%" : "0%",
                    background: m.color,
                    transition: "width 600ms cubic-bezier(0.25,1,0.5,1)",
                    boxShadow: `0 0 8px ${m.color}60`,
                  }} />
                </div>
                {/* Label row */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "clamp(7px,1.5vw,10px)",
                    letterSpacing: "0.12em", color: active ? m.color : "rgba(255,255,255,0.2)",
                    fontWeight: 600, whiteSpace: "nowrap",
                  }}>
                    {m.label}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap",
                    display: active ? "inline" : "none",
                  }}>
                    {m.sub}
                  </span>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                    background: active ? m.color : "rgba(255,255,255,0.08)",
                    boxShadow: active ? `0 0 6px ${m.color}` : "none",
                    transition: "all 300ms",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ready */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(8px,1.8vw,11px)",
          letterSpacing: "0.22em", color: "#34D399",
          textTransform: "uppercase",
          opacity: showReady ? 1 : 0,
          transition: "opacity 500ms ease",
        }}>
          ALL SIGNALS ACTIVE · ENTERING
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={dismiss}
        style={{
          position: "absolute", top: "max(20px, env(safe-area-inset-top, 0px) + 16px)", right: 20,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(9px,2vw,10px)", letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.25)", background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6,
          padding: "8px 16px", cursor: "pointer", minHeight: 36, minWidth: 60,
          touchAction: "manipulation",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
      >
        SKIP
      </button>

      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)" }} />
    </div>
  );
}
