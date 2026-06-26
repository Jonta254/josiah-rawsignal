"use client";
import { useEffect, useRef, useState } from "react";

interface Line {
  prompt?: string;
  text: string;
  color?: string;
  indent?: boolean;
}

const LINES: Line[] = [
  { prompt: "$", text: "josiah --info", color: "var(--neon-cyan)" },
  { text: "" },
  { text: "NAME         Josiah",          color: "var(--color-chalk)" },
  { text: "ALIAS        SIAH",             color: "var(--color-wire)" },
  { text: "ROLE         Electrician · Developer · Designer", color: "var(--color-chalk)" },
  { text: "LOCATION     Remote  ·  Anywhere on Earth", color: "var(--color-chalk)" },
  { text: "STATUS       ● Available for the right opportunity", color: "var(--color-moss)" },
  { text: "" },
  { prompt: "$", text: "josiah --skills --visual", color: "var(--neon-cyan)" },
  { text: "" },
  { text: "Electrical   [████████████████████]  96%", color: "var(--color-wire)" },
  { text: "Frontend     [████████████████░░░░]  82%", color: "var(--neon-cyan)" },
  { text: "UI/UX Design [████████████████░░░░]  80%", color: "var(--geo-pink)" },
  { text: "Backend      [██████████████░░░░░░]  75%", color: "var(--geo-teal)" },
  { text: "Photography  [███████████░░░░░░░░░]  60%", color: "var(--color-moss)" },
  { text: "" },
  { prompt: "$", text: "josiah --contact", color: "var(--neon-cyan)" },
  { text: "" },
  { text: "✉  josiah@rawsignal.dev", color: "var(--color-chalk)" },
  { text: "⌥  github.com/josiah", color: "var(--color-stone)" },
  { text: "" },
  { prompt: "$", text: "_", color: "var(--neon-cyan)" },
];

export default function TerminalBlock() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        LINES.forEach((_, i) => {
          setTimeout(() => setVisible((v) => Math.max(v, i + 1)), i * 60);
        });
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: "rgba(13,11,7,0.96)",
      border: "1px solid rgba(0,255,255,0.18)",
      borderRadius: "6px",
      overflow: "hidden",
      boxShadow: "0 0 60px rgba(0,255,255,0.06), 0 0 0 1px rgba(0,255,255,0.04)",
    }}>
      {/* Window chrome */}
      <div style={{
        background: "rgba(0,255,255,0.04)",
        borderBottom: "1px solid rgba(0,255,255,0.1)",
        padding: "10px 16px",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.75 }} />
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(0,255,255,0.4)", letterSpacing: "0.08em" }}>
          josiah@rawsignal:~
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: "20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: "2" }}>
        {LINES.slice(0, visible).map((line, i) => (
          <div key={i} style={{ display: "flex", gap: "10px" }}>
            {line.prompt && (
              <span style={{ color: "var(--color-moss)", userSelect: "none", flexShrink: 0 }}>{line.prompt}</span>
            )}
            {!line.prompt && line.text !== "" && (
              <span style={{ color: "transparent", userSelect: "none", flexShrink: 0 }}>·</span>
            )}
            <span style={{ color: line.color ?? "var(--color-stone)", letterSpacing: "0.02em" }}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
