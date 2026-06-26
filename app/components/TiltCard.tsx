"use client";
import { useRef, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  glare?: boolean;
}

export default function TiltCard({ children, className = "", style, intensity = 12, glare = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
    card.style.transition = "transform 0ms";
    if (glareRef.current) {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    card.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d", willChange: "transform", position: "relative" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            pointerEvents: "none", opacity: 0,
            transition: "opacity 300ms ease", zIndex: 10,
          }}
        />
      )}
      {children}
    </div>
  );
}
