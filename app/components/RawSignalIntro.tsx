"use client";
import { useEffect, useRef, useState } from "react";

const MODULES = [
  { id: "electrical", label: "Electrical", color: "#D4A843", delay: 0 },
  { id: "development", label: "Development", color: "#00C8FF", delay: 320 },
  { id: "design", label: "Design", color: "#A855F7", delay: 640 },
  { id: "nature", label: "Nature", color: "#34D399", delay: 960 },
  { id: "human", label: "Human", color: "#F5F0E8", delay: 1280 },
];

const LINES = [
  "Initializing core modules…",
  "Calibrating field logic…",
  "Mapping circuits…",
  "Compiling design language…",
  "Opening signal…",
];

export default function RawSignalIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"boot" | "modules" | "exit">("boot");
  const [lineIdx, setLineIdx] = useState(0);
  const [modulesDone, setModulesDone] = useState<boolean[]>(new Array(5).fill(false));
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Circuit particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const colors = ["#D4A843", "#00C8FF", "#A855F7", "#34D399", "#C87B2F"];
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.6;
      particles.push({
        x: cx + (Math.random() - 0.5) * 200,
        y: cy + (Math.random() - 0.5) * 200,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Draw circuit lines radiating from center
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + t * 0.1;
        const len = 80 + Math.sin(t + i) * 20;
        const x1 = cx + Math.cos(angle) * 60;
        const y1 = cy + Math.sin(angle) * 60;
        const x2 = cx + Math.cos(angle) * (60 + len);
        const y2 = cy + Math.sin(angle) * (60 + len);
        const alpha = 0.1 + Math.sin(t * 2 + i) * 0.05;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(200,123,47,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        // Corner dot
        ctx.beginPath();
        ctx.arc(x2, y2, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,123,47,${alpha * 2})`;
        ctx.fill();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.003;
        if (p.life <= 0) {
          p.x = cx + (Math.random() - 0.5) * 300;
          p.y = cy + (Math.random() - 0.5) * 300;
          p.life = 0.8 + Math.random() * 0.2;
        }
        const alpha = Math.max(0, Math.sin(p.life * Math.PI) * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Sequencing
  useEffect(() => {
    const skip = sessionStorage.getItem("rawsignal-intro");
    if (skip) { onComplete(); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("rawsignal-intro", "1");
      onComplete();
      return;
    }

    // Phase: boot text cycling
    const lineTimer = setInterval(() => {
      setLineIdx((i) => Math.min(i + 1, LINES.length - 1));
    }, 380);

    // Progress bar
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 1.8, 100));
    }, 50);

    // Modules appear
    setTimeout(() => {
      setPhase("modules");
      clearInterval(lineTimer);
    }, 800);

    MODULES.forEach((m, i) => {
      setTimeout(() => {
        setModulesDone((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 900 + m.delay);
    });

    // Exit
    setTimeout(() => {
      clearInterval(progTimer);
      setProgress(100);
      setPhase("exit");
      setTimeout(() => {
        sessionStorage.setItem("rawsignal-intro", "1");
        onComplete();
      }, 700);
    }, 3400);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="intro-overlay"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.7s ease" : "none",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }}
      />

      {/* Skip button */}
      <button
        onClick={() => {
          sessionStorage.setItem("rawsignal-intro", "1");
          onComplete();
        }}
        style={{
          position: "absolute", top: 24, right: 24, zIndex: 10,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)",
          background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
          padding: "6px 14px", borderRadius: 4, cursor: "pointer",
          transition: "all 200ms",
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fff"; (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"; (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
      >
        SKIP ↗
      </button>

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 5, textAlign: "center", width: "100%", maxWidth: 480, padding: "0 24px" }}>

        {/* 3D Core object */}
        <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 40px", perspective: "600px" }}>
          <div className="float-slow" style={{
            width: "100%", height: "100%",
            position: "relative", transformStyle: "preserve-3d",
          }}>
            {/* Outer ring */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid rgba(200,123,47,0.3)",
              animation: "spin 8s linear infinite",
              boxShadow: "0 0 30px rgba(200,123,47,0.1)",
            }} />
            {/* Inner ring tilted */}
            <div style={{
              position: "absolute", inset: 16, borderRadius: "50%",
              border: "1px solid rgba(0,200,255,0.3)",
              animation: "spin 5s linear infinite reverse",
              transform: "rotateX(60deg)",
            }} />
            {/* Core */}
            <div style={{
              position: "absolute", inset: 32, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,123,47,0.2) 0%, rgba(0,200,255,0.1) 50%, transparent 100%)",
              border: "1px solid rgba(200,123,47,0.4)",
              boxShadow: "0 0 30px rgba(200,123,47,0.2), inset 0 0 20px rgba(200,123,47,0.05)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            {/* Corner dots */}
            {[0, 90, 180, 270].map((deg) => (
              <div key={deg} style={{
                position: "absolute", width: 4, height: 4, borderRadius: "50%",
                background: "#D4A843",
                top: "50%", left: "50%",
                transform: `rotate(${deg}deg) translateX(52px) translate(-50%,-50%)`,
                boxShadow: "0 0 8px #D4A843",
              }} />
            ))}
          </div>
        </div>

        {/* OS header */}
        <div style={{ marginBottom: 8 }}>
          <span style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: 11,
            letterSpacing: "0.3em", color: "rgba(200,123,47,0.5)", textTransform: "uppercase",
          }}>
            RAWSIGNAL
          </span>
        </div>
        <div style={{ marginBottom: 32 }}>
          <span style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: 20,
            letterSpacing: "0.2em", color: "#EAEDF2", fontWeight: 600,
          }}>
            OS v2.0
          </span>
        </div>

        {/* Status line */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: "rgba(138,143,154,0.8)", letterSpacing: "0.05em",
          marginBottom: 28, minHeight: 18,
          transition: "all 300ms",
        }}>
          {LINES[lineIdx]}
        </div>

        {/* Modules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {MODULES.map((m, i) => (
            <div key={m.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              opacity: modulesDone[i] ? 1 : 0.15,
              transition: `opacity 400ms ease ${m.delay}ms`,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%", background: m.color, flexShrink: 0,
                boxShadow: modulesDone[i] ? `0 0 8px ${m.color}` : "none",
                transition: "box-shadow 400ms",
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: m.color, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0,
                minWidth: 100, textAlign: "left",
              }}>
                {m.label}
              </span>
              <div style={{
                flex: 1, height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", background: m.color, borderRadius: 1,
                  width: modulesDone[i] ? "100%" : "0%",
                  transition: `width 600ms cubic-bezier(0.25,1,0.5,1) ${m.delay + 100}ms`,
                  boxShadow: `0 0 4px ${m.color}`,
                }} />
              </div>
              {modulesDone[i] && (
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: m.color, opacity: 0.7 }}>OK</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1,
          overflow: "hidden", position: "relative",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #C87B2F, #00C8FF)",
            width: `${progress}%`,
            transition: "width 50ms linear",
            boxShadow: "0 0 8px rgba(200,123,47,0.4)",
          }} />
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "rgba(90,96,110,0.8)", marginTop: 8, letterSpacing: "0.1em",
        }}>
          {Math.round(progress)}%
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 30px rgba(200,123,47,0.2), inset 0 0 20px rgba(200,123,47,0.05); }
          50%      { box-shadow: 0 0 50px rgba(200,123,47,0.4), inset 0 0 30px rgba(200,123,47,0.1); }
        }
        .intro-overlay { position: fixed; inset: 0; z-index: 9998; background: #09090B; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
      `}</style>
    </div>
  );
}
