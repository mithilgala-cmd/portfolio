import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#06080c",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#38bdf8",
          fontWeight: 700,
          borderRadius: "6px",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          fontFamily: "monospace",
        }}
      >
        MG
      </div>
    ),
    {
      ...size,
    }
  );
}
