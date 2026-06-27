"use client";
import { useEffect, useRef, useState } from "react";

export default function AmbientSound() {
  const [active, setActive] = useState(false);
  const ctxRef  = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRef  = useRef<OscillatorNode | null>(null);

  const startHum = () => {
    if (ctxRef.current) return;
    const ctx  = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);
    gain.connect(ctx.destination);

    // 60Hz electrical hum (fundamental)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 60;
    osc1.connect(gain);
    osc1.start();

    // 120Hz harmonic (typical power line)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 120;
    const g2 = ctx.createGain();
    g2.gain.value = 0.3;
    osc2.connect(g2);
    g2.connect(gain);
    osc2.start();

    // Subtle high-pass noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 4000;
    const ng = ctx.createGain();
    ng.gain.value = 0.008;
    noise.connect(hpf);
    hpf.connect(ng);
    ng.connect(gain);
    noise.start();

    ctxRef.current  = ctx;
    gainRef.current = gain;
    oscRef.current  = osc1;
  };

  const stopHum = () => {
    const ctx  = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    setTimeout(() => {
      try { ctx.close(); } catch {}
      ctxRef.current  = null;
      gainRef.current = null;
      oscRef.current  = null;
    }, 900);
  };

  const toggle = () => {
    const next = !active;
    setActive(next);
    if (next) startHum(); else stopHum();
    if (typeof localStorage !== "undefined") localStorage.setItem("rawsignal-sound", next ? "1" : "0");
  };

  // Click spark sound (shared Web Audio)
  useEffect(() => {
    const spark = () => {
      if (!active) return;
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        setTimeout(() => ctx.close(), 200);
      } catch {}
    };
    window.addEventListener("click", spark);
    return () => window.removeEventListener("click", spark);
  }, [active]);

  return (
    <button
      onClick={toggle}
      title={active ? "Mute ambient sound" : "Enable ambient sound"}
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9000,
        width: 40, height: 40, borderRadius: "50%",
        background: active ? "rgba(200,123,47,0.15)" : "rgba(255,255,255,0.04)",
        border: active ? "1px solid rgba(200,123,47,0.5)" : "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 300ms cubic-bezier(0.25,1,0.5,1)",
        boxShadow: active ? "0 0 20px rgba(200,123,47,0.2)" : "none",
      }}
      aria-label="Toggle ambient sound"
    >
      {active ? (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M2 5.5h3l4-3v11l-4-3H2V5.5z" fill="#C87B2F"/>
          <path d="M11 5.5c1.1.9 1.8 2.1 1.8 3.5S12.1 11.6 11 12.5M12.5 3.5c2 1.6 3 3.9 3 6.5s-1 4.9-3 6.5" stroke="#C87B2F" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M2 5.5h3l4-3v11l-4-3H2V5.5z" fill="rgba(255,255,255,0.4)"/>
          <line x1="10" y1="6" x2="14" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="14" y1="6" x2="10" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  );
}
