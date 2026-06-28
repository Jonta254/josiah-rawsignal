"use client";
import { useEffect, useState } from "react";

interface TypeWriterProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export default function TypeWriter({
  words, speed = 80, deleteSpeed = 40, pauseMs = 1800,
  className = "", style, prefix = "",
}: TypeWriterProps) {
  const [display, setDisplay]   = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [blink, setBlink]       = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setIsTyping(false), pauseMs);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), deleteSpeed);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWordIdx((i) => i + 1);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, isTyping, wordIdx, words, speed, deleteSpeed, pauseMs]);

  return (
    <span className={className} style={style}>
      {prefix}{display}
      <span style={{
        display: "inline-block", width: "2px", height: "1em",
        background: "currentColor", marginLeft: "2px",
        verticalAlign: "middle",
        opacity: blink ? 1 : 0,
        transition: "opacity 0.1s",
        boxShadow: "0 0 6px currentColor",
      }} />
    </span>
  );
}
