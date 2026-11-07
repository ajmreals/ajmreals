import { ImageResponse } from "next/og";

// Browser tab icon. The site had none, so every tab showed a blank page glyph.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          color: "#2A9D8F",
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 6,
        }}
      >
        A
      </div>
    ),
    size
  );
}
