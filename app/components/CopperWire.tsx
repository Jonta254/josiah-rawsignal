interface CopperWireProps {
  className?: string;
  viewBox?: string;
  d?: string;
}

export default function CopperWire({
  className = "",
  viewBox = "0 0 1440 200",
  d = "M0,100 Q360,20 720,100 Q1080,180 1440,100",
}: CopperWireProps) {
  return (
    <svg
      className={`w-full pointer-events-none ${className}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={d} className="copper-path" />
      <path d={d} className="wire-glow" />
    </svg>
  );
}
