"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PALETTES: Record<string, [string, string, string]> = {
  "/":          ["#FF8820", "#00DFFF", "#B040FF"],
  "/about":     ["#34D399", "#00C8FF", "#B040FF"],
  "/portfolio": ["#A855F7", "#00C8FF", "#34D399"],
  "/blog":      ["#A855F7", "#F5F0E8", "#FF8820"],
  "/contact":   ["#00C8FF", "#34D399", "#FF8820"],
  "/now":       ["#D4A843", "#34D399", "#00C8FF"],
};

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const pathname  = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    setSize();
    window.addEventListener("resize", setSize);

    const [c1, c2, c3] = PALETTES[pathname] ?? PALETTES["/"];
    const COLS = 16, ROWS = 11;

    const draw = (now: number) => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cw = W / COLS, ch = H / ROWS;

      for (let col = 0; col <= COLS; col++) {
        for (let row = 0; row <= ROWS; row++) {
          const x = col * cw, y = row * ch;
          const t = now * 0.00042;

          const angle = Math.sin(t + col * 0.38 + row * 0.28) * Math.PI * 0.5
                      + Math.cos(t * 0.73 + row * 0.52 - col * 0.21) * Math.PI * 0.3;

          const len = 15 + Math.sin(t * 1.8 + col + row) * 5;
          const xEnd = x + Math.cos(angle) * len;
          const yEnd = y + Math.sin(angle) * len;

          const c = (col + row) % 3 === 0 ? c1 : (col + row) % 3 === 1 ? c2 : c3;
          const pulse = 0.022 + Math.abs(Math.sin(t * 1.2 + col * 0.6 + row * 0.4)) * 0.008;

          ctx.beginPath();
          ctx.moveTo(x, y); ctx.lineTo(xEnd, yEnd);
          ctx.strokeStyle = c;
          ctx.globalAlpha = pulse;
          ctx.lineWidth = 0.35;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fillStyle = c;
          ctx.globalAlpha = pulse * 1.6;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
