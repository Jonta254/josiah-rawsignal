"use client";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", style, strength = 0.35, as: Tag = "button", href, onClick }: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = "transform 0ms";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
    el.style.transition = "transform 500ms cubic-bezier(0.16,1,0.3,1)";
  };

  const props = {
    ref,
    className,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    ...(href ? { href } : {}),
  };

  return Tag === "a"
    ? <a {...props}>{children}</a>
    : <button {...props}>{children}</button>;
}
