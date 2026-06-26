interface GeoShapesProps {
  className?: string;
  variant?: "purple" | "cyan" | "copper";
}

export default function GeoShapes({ className = "", variant = "copper" }: GeoShapesProps) {
  const colors = {
    purple: { a: "rgba(127,90,240,0.08)", b: "rgba(255,87,127,0.06)", c: "rgba(0,201,167,0.05)" },
    cyan:   { a: "rgba(0,255,255,0.07)",  b: "rgba(189,0,255,0.05)", c: "rgba(0,255,255,0.04)" },
    copper: { a: "rgba(184,115,51,0.08)", b: "rgba(212,168,67,0.05)", c: "rgba(232,98,42,0.05)" },
  };
  const c = colors[variant];

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Large triangle top-right */}
      <polygon
        points="1200,0 1440,0 1440,300 1050,0"
        fill={c.a}
        className="geo-shape geo-shape-slow"
      />
      {/* Hexagon mid-left */}
      <polygon
        points="80,350 130,300 180,350 180,430 130,480 80,430"
        fill="none" stroke={c.b} strokeWidth="1"
        className="geo-shape"
      />
      {/* Circle bottom-right */}
      <circle cx="1350" cy="700" r="120" fill="none" stroke={c.a} strokeWidth="1"
        className="geo-shape geo-shape-fast"
      />
      {/* Small squares scattered */}
      <rect x="250" y="100" width="40" height="40" fill="none" stroke={c.c} strokeWidth="1"
        transform="rotate(20 270 120)" className="geo-shape"
      />
      <rect x="1100" y="400" width="60" height="60" fill="none" stroke={c.b} strokeWidth="1"
        transform="rotate(45 1130 430)" className="geo-shape geo-shape-slow"
      />
      {/* Diagonal lines */}
      <line x1="0" y1="0" x2="200" y2="200" stroke={c.a} strokeWidth="0.5" />
      <line x1="1440" y1="800" x2="1240" y2="600" stroke={c.a} strokeWidth="0.5" />
      {/* Grid dots (subtle) */}
      {[...Array(6)].map((_, row) =>
        [...Array(8)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 200 + 100}
            cy={row * 130 + 50}
            r="1.5"
            fill={c.c}
          />
        ))
      )}
    </svg>
  );
}
