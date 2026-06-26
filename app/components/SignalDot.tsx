"use client";
import { useRef } from "react";

export default function SignalDot() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    timerRef.current = setTimeout(() => {
      (window as Window & { triggerEasterEgg?: () => void }).triggerEasterEgg?.();
    }, 1500);
  };

  const onLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <span
      id="signal-dot"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-hidden="true"
    />
  );
}
