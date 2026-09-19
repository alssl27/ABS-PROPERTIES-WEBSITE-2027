import { ImageResponse } from "next/og";
export const alt = "ABS Properties — Homes, thoughtfully managed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#24272b",
        color: "white",
        padding: 80,
        borderBottom: "18px solid #d71920",
      }}
    >
      <div style={{ fontSize: 36, color: "#ff777d", marginBottom: 60 }}>
        ABS PROPERTIES
      </div>
      <div style={{ fontSize: 76, lineHeight: 1.1 }}>
        Homes, thoughtfully managed.
      </div>
      <div style={{ fontSize: 25, marginTop: 40 }}>
        UK lettings & property management · Demonstration site
      </div>
    </div>,
    size,
  );
}
