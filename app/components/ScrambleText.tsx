"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!?/\\|~";

export default function ScrambleText({
  text, className, style, trigger = true, delay = 0, speed = 30,
}: {
  text: string; className?: string; style?: React.CSSProperties;
  trigger?: boolean; delay?: number; speed?: number;
}) {
  const [display, setDisplay] = useState(() => text.replace(/[^ .]/g, CHARS[0]));
  const idRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => {
      let frame = 0;
      const steps = text.length * 5;
      idRef.current = setInterval(() => {
        setDisplay(
          text.split("").map((ch, i) => {
            if (ch === " " || ch === "." || ch === "—" || ch === "/" || ch === "#") return ch;
            return frame > (steps * i) / text.length
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        frame++;
        if (frame > steps) { setDisplay(text); clearInterval(idRef.current); }
      }, speed);
    }, delay);
    return () => { clearTimeout(t); clearInterval(idRef.current); };
  }, [trigger, text, delay, speed]);

  return <span className={className} style={style}>{display}</span>;
}
