"use client";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "RAWSIGNAL OS v2.0.26 — INITIALIZING...", delay: 0,    color: "var(--color-stone)" },
  { text: "► LOADING CORE MODULES", delay: 300,  color: "var(--neon-cyan)" },
  { text: "  [████████████████] ELECTRICAL    100%", delay: 500,  color: "var(--color-wire)" },
  { text: "  [████████████████] DEVELOPMENT   100%", delay: 700,  color: "var(--neon-cyan)" },
  { text: "  [████████████████] DESIGN        100%", delay: 900,  color: "var(--geo-pink)" },
  { text: "  [████████████████] NATURE        100%", delay: 1100, color: "var(--color-moss)" },
  { text: "  [████████████████] HUMAN         100%", delay: 1300, color: "var(--color-stone)" },
  { text: "► ESTABLISHING CONNECTION...", delay: 1500, color: "var(--neon-cyan)" },
  { text: "► SIGNAL DETECTED: BRIAN", delay: 1900, color: "var(--color-wire)", bright: true },
  { text: "► ALL SYSTEMS NOMINAL. WELCOME.", delay: 2200, color: "var(--neon-lime)" },
];

export default function TerminalBoot() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sessionStorage.getItem("boot-done")) { setDone(true); return; }

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay + 200);
    });

    setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("boot-done", "1");
    }, 2900);

    const blink = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(blink);
  }, []);

  if (done) return null;

  return (
    <div
      id="intro-screen"
      style={{
        position: "fixed", inset: 0, zIndex: 99998,
        background: "var(--color-void)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
      }} />

      {/* Circuit decoration */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0,450 L200,450 L200,200 L600,200 L600,450 L1440,450" stroke="rgba(0,255,255,0.06)" strokeWidth="1" fill="none" />
        <path d="M0,500 L400,500 L400,700 L800,700 L800,500 L1440,500" stroke="rgba(184,115,51,0.06)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="450" r="4" fill="rgba(0,255,255,0.3)" />
        <circle cx="600" cy="200" r="4" fill="rgba(0,255,255,0.3)" />
        <circle cx="400" cy="700" r="4" fill="rgba(184,115,51,0.3)" />
        <circle cx="800" cy="500" r="4" fill="rgba(184,115,51,0.3)" />
      </svg>

      <div style={{ width: "min(640px, 90vw)" }}>
        {/* Terminal window chrome */}
        <div style={{
          background: "rgba(13,11,7,0.95)",
          border: "1px solid rgba(0,255,255,0.2)",
          borderRadius: "4px",
          boxShadow: "0 0 40px rgba(0,255,255,0.08), 0 0 0 1px rgba(0,255,255,0.05)",
          overflow: "hidden",
        }}>
          {/* Title bar */}
          <div style={{
            background: "rgba(0,255,255,0.05)",
            borderBottom: "1px solid rgba(0,255,255,0.1)",
            padding: "8px 14px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
              <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <span style={{ marginLeft: "auto", fontSize: "10px", color: "rgba(184,115,51,0.6)", letterSpacing: "0.1em" }}>
              rawsignal — boot sequence
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "20px 24px", minHeight: "260px" }}>
            {BOOT_LINES.map((line, i) => (
              visibleLines.includes(i) && (
                <div key={i} style={{
                  fontSize: "12px",
                  lineHeight: "1.8",
                  color: line.color,
                  fontWeight: line.bright ? "700" : "400",
                  textShadow: line.bright ? `0 0 12px ${line.color}` : "none",
                  letterSpacing: "0.04em",
                  animation: "fadeInLine 0.2s ease forwards",
                }}>
                  {line.text}
                </div>
              )
            ))}
            {/* Blinking cursor */}
            <span style={{
              display: "inline-block",
              width: "8px", height: "14px",
              background: "var(--neon-cyan)",
              marginTop: "4px",
              opacity: cursorBlink ? 1 : 0,
              boxShadow: "0 0 6px var(--neon-cyan)",
              verticalAlign: "middle",
            }} />
          </div>
        </div>

        {/* Boot progress */}
        <div style={{ marginTop: "16px", height: "1px", background: "rgba(184,115,51,0.15)", borderRadius: "1px" }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, var(--color-copper), var(--neon-cyan))",
            width: `${(visibleLines.length / BOOT_LINES.length) * 100}%`,
            transition: "width 300ms ease",
            boxShadow: "0 0 8px var(--neon-cyan)",
          }} />
        </div>
      </div>

      <style>{`@keyframes fadeInLine { from { opacity:0; transform:translateX(-4px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}
