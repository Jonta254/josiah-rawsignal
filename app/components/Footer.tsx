import Link from "next/link";

const socials = [
  { label: "GitHub",   href: "#", icon: "⌥" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Twitter",  href: "#", icon: "✕" },
  { label: "Email",    href: "mailto:josiah@rawsignal.dev", icon: "✉" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-void)", borderTop: "1px solid rgba(184,115,51,0.15)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="font-bebas text-2xl tracking-widest" style={{ color: "var(--color-chalk)" }}>JOSIAH</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-copper)" }} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>
              I wire things — circuits, code, and connections.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs mb-4" style={{ color: "var(--color-copper)" }}>// Navigate</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/about",     label: "About" },
                { href: "/portfolio", label: "Work" },
                { href: "/blog",      label: "Blog" },
                { href: "/now",       label: "Now" },
                { href: "/contact",   label: "Contact" },
                { href: "/cv",        label: "CV" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm nav-link"
                  style={{ color: "var(--color-stone)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-xs mb-4" style={{ color: "var(--color-copper)" }}>// Connect</p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border rounded transition-all hover:rotate-[15deg]"
                  style={{
                    borderColor: "rgba(184,115,51,0.3)",
                    color: "var(--color-stone)",
                  }}
                >
                  <span className="text-xs font-mono">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono"
          style={{ borderTop: "1px solid rgba(184,115,51,0.1)", color: "var(--color-stone)" }}
        >
          <span>© 2026 Josiah. All rights reserved.</span>
          <span style={{ color: "var(--color-copper)" }}>Built by Josiah · Raw Signal</span>
        </div>
      </div>
    </footer>
  );
}
