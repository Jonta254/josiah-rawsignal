import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Josiah. I build software for people who work with their hands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Share card. Mirrors the site's actual identity — warm paper, one copper
   accent, editorial serif — rather than the retired neon look. Token values
   are inlined because Satori (next/og) can't read CSS custom properties.
   Kept in sync with app/styles/tokens.css by hand. */
const PAPER = "#FBF9F6";
const INK = "#17140F";
const MUTED = "#6B6459";
const FAINT = "#8C8478";
const ACCENT = "#9A4F1B";
const LINE = "#DED7CC";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: PAPER,
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 32, color: INK, fontFamily: "serif" }}>
            Josiah
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 4,
              color: FAINT,
              textTransform: "uppercase",
            }}
          >
            Raw Signal
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: ACCENT, display: "flex" }} />
            Available for remote work across timezones
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: INK,
              fontFamily: "serif",
              maxWidth: 900,
            }}
          >
            I build software for people who work with their hands.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>Product designer and full-stack engineer</div>
          <div style={{ display: "flex", color: ACCENT }}>Five live products</div>
        </div>
      </div>
    ),
    size
  );
}
