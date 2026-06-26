import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Josiah is currently working on, reading, listening to, and thinking about.",
};

export default function Now() {
  return (
    <section
      className="pt-32 pb-24 min-h-screen"
      style={{ background: "var(--color-earth)" }}
    >
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// A living snapshot</p>
          <h1 className="font-bebas text-7xl mb-4" style={{ color: "var(--color-chalk)" }}>NOW</h1>
          <p className="font-caveat text-xl" style={{ color: "var(--color-stone)" }}>
            What&apos;s actually happening in my life right now.
          </p>
        </div>

        {[
          {
            label: "Currently Working On",
            icon: "⚡",
            items: [
              "This website — getting it live and real",
              "ElectriMap v2 — adding offline sync",
              "A new design system component library (in progress)",
            ],
          },
          {
            label: "Reading",
            icon: "📖",
            items: [
              "Shop Class as Soulcraft — Matthew Crawford (for the third time)",
              "The Design of Everyday Things — Norman",
            ],
          },
          {
            label: "Listening To",
            icon: "🎵",
            items: [
              "Nils Frahm — All Melody (while working)",
              "Field recordings of rain and wind (while thinking)",
            ],
          },
          {
            label: "Thinking About",
            icon: "🧠",
            items: [
              "What it means to be a generalist in a world that rewards specialisation",
              "The relationship between physical making and digital making",
              "How to build things that last",
            ],
          },
          {
            label: "Outside",
            icon: "🌿",
            items: [
              "Weekend hikes — trying to do at least one long walk per week",
              "Planning a proper multi-day trail for later this year",
            ],
          },
          {
            label: "Learning",
            icon: "💡",
            items: [
              "Rust — slowly and with great humility",
              "Better photography composition",
              "3-phase motor control systems",
            ],
          },
        ].map((section, i) => (
          <div key={section.label}>
            {i > 0 && (
              <div className="relative my-8">
                <svg viewBox="0 0 600 30" className="w-full" preserveAspectRatio="none" style={{ height: "30px" }}>
                  <path d="M0,15 Q150,5 300,15 Q450,25 600,15" stroke="rgba(184,115,51,0.3)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            )}
            <div className="mb-2">
              <span className="font-mono text-xs" style={{ color: "var(--color-copper)" }}>
                {section.icon} {section.label}
              </span>
            </div>
            <ul className="space-y-2 mb-4">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-stone)" }}>
                  <span style={{ color: "var(--color-copper)", marginTop: "0.15em" }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(184,115,51,0.15)" }}>
          <p className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>
            Last updated: <span style={{ color: "var(--color-copper)" }}>June 25, 2026</span>
          </p>
          <p className="font-mono text-xs mt-1" style={{ color: "var(--color-stone)" }}>
            Inspired by{" "}
            <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-copper)" }}>
              nownownow.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
