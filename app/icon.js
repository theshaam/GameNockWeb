import { ImageResponse } from "next/og";

// A generated favicon/app icon — a simple "GN" monogram in the brand
// blue. This uses Next.js's built-in ImageResponse (no extra
// package install needed, which matters since this sandbox couldn't reach
// npm anyway). Document 8's open question #3 asked for "an actual logo
// file, not just a GN monogram placeholder" — this IS that placeholder,
// clearly marked as one. Replace with a real designed logo file when ready.
export const size = { width: 64, height: 64 };
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
          background: "#0075f2",
          borderRadius: 14,
          color: "#fff",
          fontSize: 34,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        GN
      </div>
    ),
    { ...size }
  );
}
