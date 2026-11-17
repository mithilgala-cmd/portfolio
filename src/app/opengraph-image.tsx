import { ImageResponse } from "next/og";

export const alt = "Mithil Gala · Software & Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};
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
          padding: "64px 72px",
          backgroundColor: "#F6F3EC",
          color: "#1A1A18",
          border: "8px solid #D9D4C7",
          fontFamily: "serif",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 16px",
              border: "1px solid #D9D4C7",
              backgroundColor: "#F6F3EC",
              color: "#1A1A18",
              fontSize: "16px",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: "#059669",
                marginRight: "10px",
                display: "flex",
              }}
            />
            <span style={{ display: "flex" }}>Open to 2027 SWE Roles</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: "16px",
              color: "#5C5A54",
            }}
          >
            <span>mithilgala.is-a.dev</span>
          </div>
        </div>

        {/* Center Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#1A1A18",
              marginBottom: "12px",
            }}
          >
            Mithil Gala
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontFamily: "monospace",
              color: "#B5361A",
              marginBottom: "16px",
            }}
          >
            Software &amp; Systems Engineer
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#5C5A54",
              maxWidth: "850px",
              lineHeight: 1.5,
            }}
          >
            B.Tech Computer Engineering &apos;27 at MPSTME, NMIMS Mumbai. Specializing in Backend Infrastructure, Distributed Systems &amp; Agentic AI.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid #D9D4C7",
            color: "#5C5A54",
            fontSize: "16px",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", marginRight: "16px" }}>
            630+ LeetCode Solutions (Top 0.8% Java)
          </div>
          <div style={{ display: "flex", marginRight: "16px" }}>|</div>
          <div style={{ display: "flex", marginRight: "16px" }}>
            Production Web Infrastructure
          </div>
          <div style={{ display: "flex", marginRight: "16px" }}>|</div>
          <div style={{ display: "flex" }}>
            Agentic AI Workflows
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
