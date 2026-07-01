"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) return;

    let raf: number;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${e.clientX - 160}px,${e.clientY - 160}px)`;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.11);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.11);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const expand = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "54px";
      ringRef.current.style.height = "54px";
      ringRef.current.style.borderColor = "rgba(255,136,32,0.85)";
      ringRef.current.style.mixBlendMode = "normal";
    };
    const contract = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "32px";
      ringRef.current.style.height = "32px";
      ringRef.current.style.borderColor = "rgba(200,123,47,0.5)";
      ringRef.current.style.mixBlendMode = "";
    };

    // Attach to existing + future interactive elements
    let targets: Element[] = [];
    const attach = () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", contract);
      });
      targets = Array.from(document.querySelectorAll("a,button,[data-cursor]"));
      targets.forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", contract);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", contract);
      });
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow"  aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"   aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring"  aria-hidden="true" />
    </>
  );
}
