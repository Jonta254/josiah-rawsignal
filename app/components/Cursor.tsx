"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      dotX += (cursorX - dotX) * 0.12;
      dotY += (cursorY - dotY) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${dotX}px`;
        cursorRef.current.style.top  = `${dotY}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onEnter = () => cursorRef.current?.classList.add("expanded");
    const onLeave = () => cursorRef.current?.classList.remove("expanded");
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Hide on mobile
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile && cursorRef.current) cursorRef.current.style.display = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div id="cursor" ref={cursorRef} aria-hidden="true" />;
}
