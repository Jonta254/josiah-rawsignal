"use client";
import { useEffect, useRef } from "react";

export default function Signature({ color = "#C87B2F", width = 280 }: { color?: string; width?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const fired   = useRef(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray  = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        path.style.transition = "stroke-dashoffset 2s cubic-bezier(0.25,1,0.5,1) 0.2s";
        path.style.strokeDashoffset = "0";
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(path);
    return () => obs.disconnect();
  }, []);

  const h = Math.round(width * 0.38);

  return (
    <svg
      viewBox="0 0 280 106"
      width={width}
      height={h}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Josiah signature"
    >
      {/* Handwritten "Josiah" path — carefully crafted cursive letterforms */}
      <path
        ref={pathRef}
        d="
          M 18 32
          C 20 24, 26 22, 28 28
          C 30 34, 24 44, 20 50
          C 16 56, 14 62, 18 66
          C 22 70, 30 66, 34 60

          M 40 30
          C 42 20, 52 18, 58 26
          C 64 34, 62 46, 56 52
          C 50 58, 42 56, 40 50
          C 38 44, 42 38, 48 36

          M 70 44
          C 70 38, 72 28, 76 24
          M 76 24
          C 80 20, 88 22, 88 30
          C 88 38, 80 46, 74 50
          C 70 53, 70 56, 72 58
          C 76 62, 84 60, 88 56

          M 98 24
          C 98 24, 96 40, 96 52
          C 96 58, 98 62, 102 62

          M 94 36
          C 98 34, 108 32, 112 36
          C 116 40, 114 50, 110 54
          C 106 58, 100 58, 98 54

          M 122 24
          C 122 24, 120 42, 120 56
          C 120 64, 124 68, 128 64
          C 132 60, 130 50, 128 44
          C 126 38, 128 34, 132 34
          C 136 34, 138 38, 138 44
          C 138 52, 136 60, 136 66

          M 148 36
          C 148 28, 150 22, 154 22
          C 158 22, 158 28, 154 36
          C 150 44, 144 50, 142 56
          C 140 62, 144 66, 150 64
          C 156 62, 160 58, 162 52

          M 192 60
          C 210 56, 232 50, 250 46
          C 258 44, 262 46, 258 50
          C 254 54, 240 56, 230 54
        "
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      {/* Underline flourish */}
      <path
        ref={undefined}
        d="M 18 80 C 60 76, 140 78, 200 74 C 220 72, 236 68, 240 70"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
