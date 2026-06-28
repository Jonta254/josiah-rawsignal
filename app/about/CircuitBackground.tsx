"use client";
import { useEffect, useRef } from "react";

interface Nd { x: number; y: number }
interface Seg { a: Nd; b: Nd }
interface Pulse { seg: number; t: number; spd: number; col: string; size: number }

const PALETTE = ["#FF8820","#00DFFF","#B040FF","#F0C030","#00FF88"];

export default function CircuitBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    let segs: Seg[] = [], nodes: Nd[] = [], pulses: Pulse[] = [];

    function build() {
      segs = []; nodes = []; pulses = [];
      const G = 72, cols = Math.ceil(W / G) + 1, rows = Math.ceil(H / G) + 1;
      const grid: Nd[][] = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
          x: c * G + (Math.random() - 0.5) * 10,
          y: r * G + (Math.random() - 0.5) * 10,
        }))
      );
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push(grid[r][c]);
          if (c + 1 < cols && Math.random() < 0.42) segs.push({ a: grid[r][c], b: grid[r][c+1] });
          if (r + 1 < rows && Math.random() < 0.42) segs.push({ a: grid[r][c], b: grid[r+1][c] });
          if (c + 1 < cols && r + 1 < rows && Math.random() < 0.06) segs.push({ a: grid[r][c], b: grid[r+1][c+1] });
        }
      }
      const n = Math.min(segs.length, 18);
      for (let i = 0; i < n; i++) spawn();
    }

    function spawn() {
      if (!segs.length) return;
      pulses.push({
        seg: Math.floor(Math.random() * segs.length),
        t: Math.random(),
        spd: 0.0025 + Math.random() * 0.0035,
        col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        size: 12 + Math.random() * 10,
      });
    }

    function resize() {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      build();
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      /* ── traces ── */
      ctx.lineWidth = 0.6;
      for (const s of segs) {
        ctx.strokeStyle = "rgba(80,110,180,0.07)";
        ctx.beginPath(); ctx.moveTo(s.a.x, s.a.y); ctx.lineTo(s.b.x, s.b.y); ctx.stroke();
      }

      /* ── junction nodes ── */
      for (const n of nodes) {
        ctx.fillStyle = "rgba(80,110,180,0.09)";
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }

      /* ── signal pulses ── */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.spd;
        if (p.t >= 1) { pulses.splice(i, 1); spawn(); continue; }
        const s = segs[p.seg];
        const x = s.a.x + (s.b.x - s.a.x) * p.t;
        const y = s.a.y + (s.b.y - s.a.y) * p.t;

        const g = ctx.createRadialGradient(x, y, 0, x, y, p.size);
        g.addColorStop(0,   p.col + "E0");
        g.addColorStop(0.3, p.col + "50");
        g.addColorStop(1,   p.col + "00");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = p.col + "30";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.a.x + (s.b.x - s.a.x) * Math.max(0, p.t - 0.12), s.a.y + (s.b.y - s.a.y) * Math.max(0, p.t - 0.12));
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    resize();
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={ref} aria-hidden="true" style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}
