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
          fontSize: 14,
          background: "#F6F3EC",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1A1A18",
          fontWeight: 700,
          border: "1px solid #D9D4C7",
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
