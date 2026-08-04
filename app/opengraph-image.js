import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/data/config";

// Generated social share image (Open Graph / Twitter card), built with
// Next.js's built-in ImageResponse — no npm install required. This is a
// clean brand-colored card with real facts, not a fake screenshot of a
// game (Document 1's honesty principle applies to imagery too).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 28, fontWeight: 800 }}>
            GN
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#12141c" }}>{SITE_CONFIG.siteName}</div>
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: "#12141c", lineHeight: 1.15, maxWidth: 900 }}>
          {SITE_CONFIG.tagline}
        </div>
        <div style={{ fontSize: 26, color: "#5c6072", marginTop: 24 }}>
          {SITE_CONFIG.gamesShipped} games shipped since {SITE_CONFIG.founded} · {SITE_CONFIG.countriesServed} countries
        </div>
      </div>
    ),
    { ...size }
  );
}
