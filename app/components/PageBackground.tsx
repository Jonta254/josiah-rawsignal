"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ROUTE_CONFIG: Record<string, { colors: string[]; style: "circuit" | "organic" | "geo" | "noise" }> = {
  "/":         { colors: ["#C87B2F", "#D4A843"], style: "circuit" },
  "/about":    { colors: ["#34D399", "#00C8FF"], style: "organic" },
  "/portfolio":{ colors: ["#A855F7", "#00C8FF"], style: "geo" },
  "/blog":     { colors: ["#A855F7", "#F5F0E8"], style: "noise" },
  "/contact":  { colors: ["#00C8FF", "#34D399"], style: "circuit" },
  "/now":      { colors: ["#D4A843", "#34D399"], style: "organic" },
};

function seededRand(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname  = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    const cfg = ROUTE_CONFIG[pathname] ?? ROUTE_CONFIG["/"];
    const rand = seededRand(pathname.split("").reduce((a, c) => a + c.charCodeAt(0), 42));
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    if (cfg.style === "circuit") {
      // Circuit grid traces
      ctx.strokeStyle = cfg.colors[0];
      ctx.lineWidth = 0.4;
      ctx.globalAlpha = 0.04;
      const step = 64;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      // Nodes
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = cfg.colors[0];
      for (let i = 0; i < 40; i++) {
        const x = Math.floor(rand() * (W / step)) * step;
        const y = Math.floor(rand() * (H / step)) * step;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      }
    } else if (cfg.style === "organic") {
      // Flowing curves
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(rand() * W, rand() * H);
        ctx.bezierCurveTo(rand() * W, rand() * H, rand() * W, rand() * H, rand() * W, rand() * H);
        ctx.strokeStyle = i % 2 === 0 ? cfg.colors[0] : cfg.colors[1];
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.05;
        ctx.stroke();
      }
      // Dots
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(rand() * W, rand() * H, rand() * 2 + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = rand() > 0.5 ? cfg.colors[0] : cfg.colors[1];
        ctx.globalAlpha = 0.06;
        ctx.fill();
      }
    } else if (cfg.style === "geo") {
      // Triangles / polygons
      ctx.globalAlpha = 0.04;
      for (let i = 0; i < 20; i++) {
        const x = rand() * W, y = rand() * H, r = rand() * 120 + 40;
        const sides = Math.floor(rand() * 4) + 3;
        ctx.beginPath();
        for (let s = 0; s < sides; s++) {
          const a = (s / sides) * Math.PI * 2;
          s === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r)
                  : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.strokeStyle = rand() > 0.5 ? cfg.colors[0] : cfg.colors[1];
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    } else {
      // Noise field
      for (let x = 0; x < W; x += 24) {
        for (let y = 0; y < H; y += 24) {
          const angle = (rand() * Math.PI * 2);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle) * 12, y + Math.sin(angle) * 12);
          ctx.strokeStyle = rand() > 0.5 ? cfg.colors[0] : cfg.colors[1];
          ctx.lineWidth = 0.4;
          ctx.globalAlpha = 0.04;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none", opacity: 1,
      }}
    />
  );
}
