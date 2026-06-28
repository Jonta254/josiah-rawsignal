"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Layer 1: keyboard sequence J-O-S-I-A-H
    const secretCode = ["j", "o", "s", "i", "a", "h"];
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActive(false); return; }
      seq.push(e.key.toLowerCase());
      seq = seq.slice(-secretCode.length);
      if (seq.join("") === secretCode.join("")) setActive(true);
    };
    document.addEventListener("keydown", onKey);

    // Expose trigger for signal dot / other triggers
    (window as Window & { triggerEasterEgg?: () => void }).triggerEasterEgg = () => setActive(true);

    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return (
    <div
      id="easter-egg"
      className="active"
      onClick={(e) => { if (e.target === e.currentTarget) setActive(false); }}
    >
      <div className="relative max-w-lg w-full mx-6 p-10 border" style={{ borderColor: "rgba(184,115,51,0.3)" }}>
        {/* Wire decoration */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path d="M0,150 Q100,50 200,150 Q300,250 400,150" className="copper-path" />
          <path d="M0,150 Q100,50 200,150 Q300,250 400,150" className="wire-glow" />
        </svg>

        <div className="relative z-10 font-mono text-sm" style={{ color: "var(--color-stone)" }}>
          <p style={{ color: "var(--color-wire)" }}>{"// SIGNAL DETECTED"}</p>
          <br />
          <p style={{ color: "var(--color-chalk)" }}>You found something most people miss.</p>
          <p>The kind of attention that found this</p>
          <p>is the kind I want on a team.</p>
          <br />
          <p style={{ color: "var(--color-stone)" }}>My friends call me:</p>
          <br />
          <p
            className="font-bebas text-center"
            style={{ fontSize: "clamp(3rem,8vw,5rem)", color: "var(--color-wire)", letterSpacing: "0.3em" }}
          >
            S · I · A · H
          </p>
          <br />
          <p style={{ color: "var(--color-chalk)" }}>[ Josiah ]</p>
          <p>[ josiah@rawsignal.dev &nbsp;·&nbsp; Available for the right opportunity ]</p>
          <br />
          <div className="border-t pt-4" style={{ borderColor: "rgba(184,115,51,0.2)" }}>
            <button
              onClick={() => setActive(false)}
              className="flex items-center gap-2 text-xs hover:text-copper transition-colors"
              style={{ color: "var(--color-stone)" }}
            >
              <X size={12} /> close signal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
