import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Josiah — Raw Signal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #08001A 0%, #050012 40%, #010006 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,223,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,223,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(140,80,255,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,223,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Signal dot */}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 72,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00DFFF",
              boxShadow: "0 0 12px rgba(0,223,255,0.8)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "rgba(0,223,255,0.7)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            RAW SIGNAL
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            color: "#FFFFFF",
            marginBottom: 24,
            display: "flex",
          }}
        >
          JOSIAH
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(176,190,221,0.7)",
            letterSpacing: "0.04em",
            marginBottom: 40,
            display: "flex",
          }}
        >
          Electrician · Developer · Designer
        </div>

        {/* Bottom bar */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: "linear-gradient(to right, rgba(0,223,255,0.4), transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
