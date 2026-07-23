import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* Favicon — copper "J" monogram on ink, matching the site identity.
   Token values inlined (Satori can't read CSS custom properties). */
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
          background: "#17140F",
          borderRadius: 7,
          color: "#E8925A",
          fontFamily: "serif",
          fontSize: 22,
          fontWeight: 600,
          paddingBottom: 2,
        }}
      >
        J
      </div>
    ),
    { ...size }
  );
}
