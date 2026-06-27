"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const SignalOrb = dynamic(() => import("./SignalOrb"), { ssr: false });

const MODULES = [
  { label: "ELECTRICAL", sub: "Power Systems · 8yr", color: "#D4A843" },
  { label: "DEVELOPMENT", sub: "Digital Systems · 4yr", color: "#00C8FF" },
  { label: "DESIGN", sub: "Visual Systems · 3yr", color: "#A855F7" },
  { label: "NATURE", sub: "Field Systems · Ongoing", color: "#34D399" },
  { label: "HUMAN", sub: "Core Signal · Always", color: "#F5F0E8" },
];

type Phase = "boot" | "circuit" | "orb" | "modules" | "ready" | "exit";

export default function SignalIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [phase, setPhase] = useState<Phase>("boot");
  const [activeModules, setActiveModules] = useState<number[]>([]);
  const [orbOpacity, setOrbOpacity] = useState(0);
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("rawsignal-intro", "1");
    }
    setPhase("exit");
    setTimeout(() => setVisible(false), 600);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("rawsignal-intro") === "1") {
      onComplete();
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timers.push(id); };

    t(() => setPhase("circuit"), 350);
    t(() => setPhase("orb"), 1100);
    t(() => setOrbOpacity(1), 1200);
    t(() => setPhase("modules"), 1900);

    MODULES.forEach((_, i) => {
      t(() => setActiveModules((p) => [...p, i]), 1900 + i * 280);
    });

    t(() => setPhase("ready"), 3400);
    t(() => setPhase("exit"), 4000);
    t(() => { setVisible(false); sessionStorage.setItem("rawsignal-intro", "1"); }, 4650);
    t(onComplete, 4800);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  /* ── Canvas: circuit traces radiating from center ── */
  useEffect(() => {
    if (phase === "boot") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const COLORS = ["#D4A843", "#00C8FF", "#A855F7", "#34D399", "#F5F0E8"];

    interface Seg { x1: number; y1: number; x2: number; y2: number; color: string; delay: number; }
    const segs: Seg[] = [];

    const addBranch = (x1: number, y1: number, angle: number, len: number, color: string, delay: number, depth: number) => {
      if (depth > 2 || len < 30) return;
      const x2 = x1 + Math.cos(angle) * len;
      const y2 = y1 + Math.sin(angle) * len;
      segs.push({ x1, y1, x2, y2, color, delay });
      if (Math.random() > 0.4) {
        addBranch(x2, y2, angle + (Math.random() - 0.5) * 0.9, len * 0.65, color, delay + 200, depth + 1);
      }
      if (Math.random() > 0.6) {
        addBranch(x2, y2, angle + (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2 + (Math.random() - 0.5) * 0.4), len * 0.5, color, delay + 300, depth + 1);
      }
    };

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.3;
      const len = 80 + Math.random() * Math.max(W, H) * 0.35;
      addBranch(cx, cy, angle, len, COLORS[i % COLORS.length], i * 40, 0);
    }

    const startTime = performance.now();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const elapsed = now - startTime;

      segs.forEach((seg) => {
        const age = elapsed - seg.delay;
        if (age <= 0) return;
        const prog = Math.min(1, age / 600);

        const x2 = seg.x1 + (seg.x2 - seg.x1) * prog;
        const y2 = seg.y1 + (seg.y2 - seg.y1) * prog;

        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = seg.color;
        ctx.globalAlpha = 0.09;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        if (prog > 0.9) {
          ctx.beginPath();
          ctx.arc(seg.x2, seg.y2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = seg.color;
          ctx.globalAlpha = 0.5;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  if (!visible) return null;

  const isExit = phase === "exit";
  const showOrb = phase === "orb" || phase === "modules" || phase === "ready";
  const showModules = phase === "modules" || phase === "ready";
  const showReady = phase === "ready";

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: isExit ? 0 : 1,
        transition: isExit ? "opacity 700ms cubic-bezier(0.4,0,1,1)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Circuit canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* 3D Orb */}
      <div
        style={{
          position: "absolute",
          width: "min(55vw, 480px)", height: "min(55vw, 480px)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: orbOpacity,
          transition: "opacity 900ms cubic-bezier(0.25,1,0.5,1)",
          pointerEvents: "none",
        }}
      >
        {showOrb && <SignalOrb fov={42} distance={5} glowIntensity={2} />}
      </div>

      {/* UI overlay */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 560, padding: "0 clamp(1.5rem,5vw,3rem)", textAlign: "center" }}>

        {/* System label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(9px,1.1vw,11px)",
          letterSpacing: "0.22em",
          color: "rgba(200,123,47,0.6)",
          textTransform: "uppercase",
          marginBottom: 28,
          opacity: phase === "boot" ? 0 : 1,
          transition: "opacity 600ms ease",
        }}>
          RAWSIGNAL.OS · INITIALIZING
        </div>

        {/* Modules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {MODULES.map((m, i) => {
            const active = activeModules.includes(i);
            return (
              <div
                key={m.label}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  opacity: showModules ? (active ? 1 : 0.12) : 0,
                  transform: showModules ? (active ? "none" : "translateY(4px)") : "translateY(8px)",
                  transition: `opacity 400ms ease, transform 400ms ease`,
                }}
              >
                {/* Bar track */}
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: "100%",
                    width: active ? "100%" : "0%",
                    background: m.color,
                    transition: "width 600ms cubic-bezier(0.25,1,0.5,1)",
                    boxShadow: `0 0 8px ${m.color}60`,
                  }} />
                </div>

                {/* Label */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(8px,1vw,10px)", letterSpacing: "0.14em", color: active ? m.color : "rgba(255,255,255,0.2)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {m.label}
                  </span>
                  {active && (
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                      {m.sub}
                    </span>
                  )}
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: active ? m.color : "rgba(255,255,255,0.1)", flexShrink: 0, boxShadow: active ? `0 0 6px ${m.color}` : "none", transition: "all 300ms" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ready state */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(9px,1.1vw,11px)",
          letterSpacing: "0.22em",
          color: "#34D399",
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
          position: "absolute", top: 24, right: 24,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.25)",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 6, padding: "6px 14px",
          cursor: "pointer",
          transition: "color 200ms, border-color 200ms",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
        }}
      >
        SKIP
      </button>

      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />
    </div>
  );
}
