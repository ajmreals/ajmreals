import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Social share card. Rendered at build/request time by next/og — no external
// font is fetched, deliberately: a Google Fonts fetch at build time is what
// broke a deploy before.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#2A9D8F",
            }}
          >
            Real estate · Drone · Photography
          </div>
          {/* satori requires an explicit display on any element with more
              than one child — this one holds text plus the accent span. */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 32,
              fontSize: 104,
              fontWeight: 700,
              color: "#F5F5F5",
              lineHeight: 1.05,
              letterSpacing: -3,
            }}
          >
            <span>Content that</span>
            <span style={{ color: "#2A9D8F" }}>closes.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #262626",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, color: "#F5F5F5" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 22, color: "#888888" }}>
            NY · NJ · CT · MA
          </div>
        </div>
      </div>
    ),
    size
  );
}
