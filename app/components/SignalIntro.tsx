"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const MODULES = [
  { label: "ELECTRICAL", sub: "Power Grid",      color: "#F0C030", icon: "⚡" },
  { label: "DEVELOPMENT", sub: "Stack Layer",    color: "#00DFFF", icon: "◈" },
  { label: "DESIGN",      sub: "Visual System",  color: "#B040FF", icon: "◉" },
  { label: "NATURE",      sub: "Field Protocol", color: "#34D399", icon: "◎" },
  { label: "HUMAN",       sub: "Core Signal",    color: "#F5F0E8", icon: "○" },
];

const NAME = ["J", "O", "S", "I", "A", "H"];

type Phase = "boot" | "name" | "modules" | "ready" | "exit";

const ENTRY_DIRS = [
  { tx: "-60px", ty: "0px",   rz: "-8deg" },
  { tx: "0px",   ty: "-60px", rz: "0deg"  },
  { tx: "60px",  ty: "0px",   rz: "8deg"  },
  { tx: "0px",   ty: "60px",  rz: "-4deg" },
  { tx: "-40px", ty: "-40px", rz: "6deg"  },
  { tx: "40px",  ty: "-40px", rz: "-6deg" },
];

export default function SignalIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef           = useRef<HTMLCanvasElement>(null);
  const animRef             = useRef<number>(0);
  const [phase, setPhase]   = useState<Phase>("boot");
  const [shown, setShown]   = useState<number[]>([]);
  const [active, setActive] = useState<number[]>([]);
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("rawsignal-intro", "1");
    setPhase("exit");
    setTimeout(() => setVisible(false), 720);
    setTimeout(onComplete, 900);
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

    t(() => setPhase("name"), 380);
    NAME.forEach((_, i) => t(() => setShown(p => [...p, i]), 480 + i * 110));
    t(() => setPhase("modules"), 1550);
    MODULES.forEach((_, i) => t(() => setActive(p => [...p, i]), 1640 + i * 230));
    t(() => setPhase("ready"),  3060);
    t(() => setPhase("exit"),   3780);
    t(() => { setVisible(false); sessionStorage.setItem("rawsignal-intro", "1"); }, 4480);
    t(onComplete, 4640);

    return () => ts.forEach(clearTimeout);
  }, [onComplete]);

  /* ── Animated particle-mesh background ──────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    setSize();
    window.addEventListener("resize", setSize);

    const COLORS = ["#F0C030", "#00DFFF", "#B040FF", "#34D399", "#FF8820"];
    const COUNT = typeof window !== "undefined" && window.innerWidth < 600 ? 45 : 80;

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      op: Math.random() * 0.45 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }));

    const DIST = 110;

    const draw = (now: number) => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = pts[i].color;
            ctx.globalAlpha = (1 - d / DIST) * 0.055;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.op * (0.55 + 0.45 * Math.sin(now * 0.0008 + p.phase));
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", setSize); };
  }, []);

  if (!visible) return null;

  const isExit    = phase === "exit";
  const showName  = phase !== "boot";
  const showMods  = phase === "modules" || phase === "ready";
  const showReady = phase === "ready";

  return (
    <div
      role="dialog"
      aria-label="Site intro loading"
      aria-live="polite"
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#000008",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: isExit ? 0 : 1,
        transition: isExit ? "opacity 780ms cubic-bezier(0.4,0,1,1)" : "none",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true" />

      {/* Radial vignette */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 25%, rgba(0,0,8,0.88) 100%)",
      }} />

      {/* Central panel */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(1.5rem,5vw,3rem)", width: "100%", maxWidth: "min(540px, 92vw)" }}>

        {/* System label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(8px,1.4vw,10px)",
          letterSpacing: "0.30em",
          color: "rgba(200,123,47,0.52)",
          textTransform: "uppercase",
          marginBottom: "clamp(24px,5vw,42px)",
          opacity: showName ? 1 : 0,
          transition: "opacity 700ms ease",
        }}>
          RAWSIGNAL·OS &nbsp;/&nbsp; BOOT SEQUENCE
        </div>

        {/* Name letters */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(1px,0.5vw,6px)",
          marginBottom: "clamp(6px,1.5vw,12px)",
          perspective: "1000px",
        }}>
          {NAME.map((ch, i) => {
            const hit = shown.includes(i);
            const dir = ENTRY_DIRS[i];
            return (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(4.2rem,14.5vw,12.5rem)",
                  lineHeight: 0.84,
                  letterSpacing: "-0.02em",
                  display: "inline-block",
                  opacity: hit ? 1 : 0,
                  transform: hit
                    ? "translateX(0) translateY(0) rotateZ(0deg) scale(1)"
                    : `translateX(${dir.tx}) translateY(${dir.ty}) rotateZ(${dir.rz}) scale(0.55)`,
                  filter: hit
                    ? "drop-shadow(0 0 26px rgba(180,210,255,0.55))"
                    : "blur(14px)",
                  transition: [
                    `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${i * 0.045}s`,
                    `transform 0.72s cubic-bezier(0.16,1,0.3,1) ${i * 0.045}s`,
                    `filter 0.72s ease ${i * 0.045}s`,
                  ].join(", "),
                  background: "linear-gradient(165deg,#7A8BAA 0%,#B0BEDD 11%,#DDE5F8 21%,#FFFFFF 31%,#C8D4EE 43%,#96A6C4 55%,#C0CCE8 63%,#FFFFFF 73%,#D8E2F8 83%,#92A2C0 91%,#B4C0DC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        {/* RAW SIGNAL subtitle */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(8px,1.6vw,12px)",
          letterSpacing: "0.40em",
          color: "rgba(200,123,47,0.68)",
          textTransform: "uppercase",
          marginBottom: "clamp(22px,4.5vw,36px)",
          opacity: shown.length === NAME.length ? 1 : 0,
          transition: "opacity 900ms ease 0.28s",
        }}>
          — &nbsp;RAW&nbsp; SIGNAL &nbsp;—
        </div>

        {/* Gradient rule */}
        <div style={{
          width: "clamp(100px,28vw,260px)",
          height: 1,
          margin: "0 auto clamp(18px,3.5vw,28px)",
          background: "linear-gradient(90deg,transparent,rgba(200,123,47,0.45) 28%,rgba(0,223,255,0.45) 72%,transparent)",
          opacity: showMods ? 1 : 0,
          transition: "opacity 600ms ease 0.15s",
        }} />

        {/* Module list */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(6px,1.4vw,10px)",
          margin: "0 auto clamp(18px,4vw,28px)",
          width: "clamp(240px,48vw,380px)",
        }}>
          {MODULES.map((m, i) => {
            const on = active.includes(i);
            return (
              <div
                key={m.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "22px 1fr 60px",
                  gap: 10,
                  alignItems: "center",
                  opacity: showMods ? (on ? 1 : 0.13) : 0,
                  transform: showMods ? "none" : "translateY(8px)",
                  transition: [
                    `opacity 380ms ease ${i * 55}ms`,
                    `transform 380ms ease ${i * 55}ms`,
                  ].join(", "),
                }}
              >
                <span style={{
                  fontSize: 11,
                  color: on ? m.color : "rgba(255,255,255,0.13)",
                  textAlign: "center",
                  transition: "color 300ms ease",
                  lineHeight: 1,
                }}>
                  {m.icon}
                </span>

                <div style={{ position: "relative", height: "1.5px", background: "rgba(255,255,255,0.055)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: "100%",
                    width: on ? "100%" : "0%",
                    background: `linear-gradient(90deg,${m.color}70,${m.color})`,
                    boxShadow: `0 0 9px ${m.color}90`,
                    transition: "width 680ms cubic-bezier(0.25,1,0.5,1)",
                    borderRadius: 999,
                  }} />
                </div>

                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(6px,1.1vw,8.5px)",
                  letterSpacing: "0.10em",
                  color: on ? m.color : "rgba(255,255,255,0.16)",
                  fontWeight: 600,
                  textAlign: "right",
                  transition: "color 300ms ease",
                  whiteSpace: "nowrap",
                }}>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Ready signal */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(7px,1.3vw,9.5px)",
          letterSpacing: "0.22em",
          color: "#34D399",
          textTransform: "uppercase",
          opacity: showReady ? 1 : 0,
          transform: showReady ? "none" : "translateY(5px)",
          transition: "opacity 580ms ease, transform 580ms ease",
        }}>
          <span style={{
            display: "inline-block",
            width: 5, height: 5, borderRadius: "50%",
            background: "#34D399",
            boxShadow: "0 0 8px #34D399",
            animation: showReady ? "introPulse 1.35s ease-in-out infinite" : "none",
            flexShrink: 0,
          }} />
          ALL SIGNALS ACTIVE · ENTERING
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={dismiss}
        aria-label="Skip intro"
        style={{
          position: "absolute",
          top: "max(18px, env(safe-area-inset-top, 0px) + 14px)",
          right: 18,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(8px,1.6vw,10px)",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.20)",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 6,
          padding: "7px 15px",
          cursor: "pointer",
          minHeight: 36, minWidth: 56,
          touchAction: "manipulation",
          transition: "color 220ms ease, border-color 220ms ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.62)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.20)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
      >
        SKIP
      </button>

      {/* CRT scanlines */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.016) 2px,rgba(0,0,0,0.016) 4px)",
      }} />

      <style>{`
        @keyframes introPulse {
          0%,100% { opacity:1; transform:scale(1);   box-shadow:0 0 8px #34D399; }
          50%      { opacity:0.5; transform:scale(1.7); box-shadow:0 0 18px #34D399; }
        }
      `}</style>
    </div>
  );
}
