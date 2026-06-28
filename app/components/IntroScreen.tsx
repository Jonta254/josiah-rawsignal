"use client";
import { useEffect, useState } from "react";

const LETTERS = ["J", "O", "S", "I", "A", "H"];
const ROLES = ["Electrician", "Developer", "Designer", "Explorer", "Human"];

export default function IntroScreen() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [showTagline, setShowTagline] = useState(false);
  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    // Skip if already visited
    if (sessionStorage.getItem("intro-done")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    // Stagger letter appearance at 30ms each starting at 420ms
    LETTERS.forEach((l, i) => {
      setTimeout(() => {
        setLetters((prev) => [...prev, l]);
      }, 420 + i * 30);
    });

    setTimeout(() => setShowTagline(true), 1000);
    setTimeout(() => setShowRole(true), 1200);
    setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("intro-done", "1");
    }, 2800);
  }, []);

  useEffect(() => {
    if (!showRole) return;
    const interval = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [showRole]);

  if (done) return null;

  return (
    <div id="intro-screen" className={done ? "done" : ""}>
      {/* Wire SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity 600ms" }}
      >
        <path
          d="M-10,450 Q360,100 720,450 Q1080,800 1450,450"
          className="copper-path"
        />
        <path
          d="M-10,450 Q360,100 720,450 Q1080,800 1450,450"
          className="wire-glow"
        />
      </svg>

      <div className="relative z-10 text-center px-4">
        {/* Name */}
        <div className="overflow-hidden">
          <h1
            className="font-bebas tracking-widest leading-none"
            style={{ fontSize: "clamp(5rem,15vw,10rem)", color: "var(--color-chalk)" }}
          >
            {letters.map((l, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: "flipIn 0.3s ease forwards",
                  animationDelay: `${i * 30}ms`,
                }}
              >
                {l}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        {showTagline && (
          <p
            className="font-playfair italic mt-4 text-xl"
            style={{
              color: "var(--color-stone)",
              animation: "flipIn 0.5s ease forwards",
            }}
          >
            I wire things — circuits, code, and connections.
          </p>
        )}

        {/* Role badge */}
        {showRole && (
          <div
            className="mt-6 inline-block font-mono text-sm px-4 py-2 border rounded-full"
            style={{
              borderColor: "var(--color-copper)",
              color: "var(--color-copper)",
              animation: "flipIn 0.4s ease forwards",
            }}
          >
            ⚡ {ROLES[roleIdx]}
          </div>
        )}
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: "rgba(184,115,51,0.2)" }}>
        <div
          className="h-full"
          style={{
            background: "var(--color-copper)",
            width: done ? "100%" : "0%",
            transition: "width 2.8s linear",
          }}
        />
      </div>
    </div>
  );
}
