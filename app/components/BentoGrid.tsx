import Link from "next/link";
import TiltCard from "./TiltCard";

const CELLS = [
  {
    id: "electrician",
    span: "md:col-span-2 md:row-span-2",
    label: "01 — Electrician",
    emoji: "⚡",
    color: "var(--color-wire)",
    bg: "rgba(212,168,67,0.06)",
    border: "rgba(212,168,67,0.2)",
    body: "Before I wrote a line of code I was inside walls, tracing faults by feel. The trade taught me that physical systems don't lie — they either work or they don't.",
    quote: "Every wire has a purpose.",
    href: "/about#electrician",
    large: true,
  },
  {
    id: "developer",
    span: "md:col-span-1 md:row-span-1",
    label: "02 — Developer",
    emoji: "💻",
    color: "var(--neon-cyan)",
    bg: "rgba(0,255,255,0.04)",
    border: "rgba(0,255,255,0.18)",
    body: "Full-stack. Shipping real things for real people.",
    quote: "Code is electricity for ideas.",
    href: "/about#developer",
    large: false,
  },
  {
    id: "designer",
    span: "md:col-span-1 md:row-span-1",
    label: "03 — Designer",
    emoji: "🎨",
    color: "var(--geo-pink)",
    bg: "rgba(255,87,127,0.04)",
    border: "rgba(255,87,127,0.18)",
    body: "Figma-native. Motion-aware. Obsessed with the space between things.",
    quote: "Design is how it works.",
    href: "/about#designer",
    large: false,
  },
  {
    id: "explorer",
    span: "md:col-span-1 md:row-span-1",
    label: "04 — Explorer",
    emoji: "🌿",
    color: "var(--color-moss)",
    bg: "rgba(74,124,89,0.06)",
    border: "rgba(74,124,89,0.2)",
    body: "The outdoors is not a hobby. It's infrastructure.",
    quote: "Best debugger: a long walk.",
    href: "/about#explorer",
    large: false,
  },
  {
    id: "human",
    span: "md:col-span-1 md:row-span-1",
    label: "05 — Human",
    emoji: "🧠",
    color: "var(--color-stone)",
    bg: "rgba(140,134,121,0.06)",
    border: "rgba(140,134,121,0.18)",
    body: "Curious without arrogance. Honest without cruelty. Present.",
    quote: "Being alive is the point.",
    href: "/about#human",
    large: false,
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
      {CELLS.map((cell) => (
        <TiltCard
          key={cell.id}
          className={`${cell.span} rounded-xl overflow-hidden group`}
          intensity={cell.large ? 6 : 10}
        >
          <Link href={cell.href} className="block h-full">
            <div
              className="h-full p-6 flex flex-col justify-between relative"
              style={{
                background: cell.bg,
                border: `1px solid ${cell.border}`,
                borderRadius: "12px",
                transition: "border-color 300ms, box-shadow 300ms",
              }}
            >
              {/* Animated top border on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: cell.color, boxShadow: `0 0 10px ${cell.color}` }}
              />

              {/* Geometric accent */}
              <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" viewBox="0 0 100 100">
                <polygon points="50,5 95,75 5,75" fill={cell.color} />
              </svg>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cell.emoji}</span>
                  <span className="font-mono text-xs tracking-widest" style={{ color: cell.color }}>{cell.label}</span>
                </div>
                {cell.large
                  ? <p className="text-base leading-relaxed" style={{ color: "var(--color-stone)" }}>{cell.body}</p>
                  : <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>{cell.body}</p>
                }
              </div>

              <p className="font-caveat text-lg" style={{ color: cell.color }}>
                &ldquo;{cell.quote}&rdquo;
              </p>
            </div>
          </Link>
        </TiltCard>
      ))}
    </div>
  );
}
