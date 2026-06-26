"use client";
import { useEffect, useRef } from "react";

interface Node { x: number; y: number; }
interface Segment { from: Node; to: Node; progress: number; speed: number; color: string; active: boolean; }

const COLORS = ["rgba(0,255,255,0.5)", "rgba(184,115,51,0.5)", "rgba(212,168,67,0.4)", "rgba(0,255,255,0.3)"];

export default function CircuitBoard({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Build a grid of nodes
    const COLS = 12, ROWS = 8;
    const nodes: Node[][] = [];
    const getX = (c: number) => (c / (COLS - 1)) * canvas.width;
    const getY = (r: number) => (r / (ROWS - 1)) * canvas.height;

    for (let r = 0; r < ROWS; r++) {
      nodes[r] = [];
      for (let c = 0; c < COLS; c++) {
        // Jitter grid positions slightly for organic feel
        nodes[r][c] = {
          x: getX(c) + (Math.random() - 0.5) * 40,
          y: getY(r) + (Math.random() - 0.5) * 30,
        };
      }
    }

    // Build segments (horizontal + vertical connections)
    const segments: Segment[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 1; c++) {
        if (Math.random() > 0.35) {
          segments.push({ from: nodes[r][c], to: nodes[r][c + 1], progress: 0, speed: 0.004 + Math.random() * 0.006, color: COLORS[Math.floor(Math.random() * COLORS.length)], active: Math.random() > 0.6 });
        }
      }
    }
    for (let r = 0; r < ROWS - 1; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() > 0.5) {
          segments.push({ from: nodes[r][c], to: nodes[r + 1][c], progress: Math.random(), speed: 0.003 + Math.random() * 0.005, color: COLORS[Math.floor(Math.random() * COLORS.length)], active: Math.random() > 0.7 });
        }
      }
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static lines (faint)
      segments.forEach((seg) => {
        ctx.beginPath();
        ctx.moveTo(seg.from.x, seg.from.y);
        ctx.lineTo(seg.to.x, seg.to.y);
        ctx.strokeStyle = "rgba(184,115,51,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw animated pulses
      segments.forEach((seg) => {
        if (!seg.active) return;
        seg.progress += seg.speed;
        if (seg.progress > 1.3) { seg.progress = -0.3; }

        const p = Math.max(0, Math.min(1, seg.progress));
        const px = seg.from.x + (seg.to.x - seg.from.x) * p;
        const py = seg.from.y + (seg.to.y - seg.from.y) * p;

        // Glow dot
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, seg.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        const trail = 0.15;
        const t0 = Math.max(0, p - trail);
        ctx.beginPath();
        ctx.moveTo(seg.from.x + (seg.to.x - seg.from.x) * t0, seg.from.y + (seg.to.y - seg.from.y) * t0);
        ctx.lineTo(px, py);
        ctx.strokeStyle = seg.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw nodes (junction dots)
      nodes.flat().forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(184,115,51,0.2)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.65 }}
      aria-hidden="true"
    />
  );
}
