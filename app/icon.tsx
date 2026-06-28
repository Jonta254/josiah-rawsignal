import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08001A",
          borderRadius: 6,
        }}
      >
        {/* Signal bolt */}
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path
            d="M11 1L2 13H9L7 21L16 9H9L11 1Z"
            fill="url(#g)"
            stroke="rgba(0,223,255,0.3)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id="g" x1="9" y1="1" x2="9" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00DFFF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    { ...size }
  );
}
