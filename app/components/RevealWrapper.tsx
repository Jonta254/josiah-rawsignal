"use client";
import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  revealClass?: string;
  delay?: number;
  threshold?: number;
}

export default function Reveal({
  children,
  className = "reveal",
  style,
  revealClass,
  delay = 0,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(revealClass ?? "revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold, revealClass]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
