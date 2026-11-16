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
          backgroundColor: "#06080c",
          color: "#f1f5f9",
          border: "1px solid rgba(255, 255, 255, 0.1)",
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
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#0b0f17",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: "18px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "5px",
                backgroundColor: "#10b981",
                marginRight: "10px",
                display: "flex",
              }}
            />
            <span style={{ display: "flex" }}>Open to 2027 SWE internships</span>
          </div>

          <div
            style={{
              display: "flex",
              color: "#38bdf8",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            mithilgala.is-a.dev
          </div>
        </div>

        {/* Center */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            Mithil Gala
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "30px",
              fontWeight: 600,
              color: "#38bdf8",
              marginBottom: "16px",
            }}
          >
            Software &amp; Systems Engineer
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "800px",
            }}
          >
            B.Tech Computer Engineering &apos;27 at MPSTME, NMIMS Mumbai. Focus on Backend Infrastructure, Distributed Systems &amp; Agentic AI.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#64748b",
            fontSize: "17px",
          }}
        >
          <div style={{ display: "flex", marginRight: "16px" }}>
            {"// 630+ LeetCode Solutions (Top 0.8% Java)"}
          </div>
          <div style={{ display: "flex", marginRight: "16px" }}>•</div>
          <div style={{ display: "flex", marginRight: "16px" }}>
            Production Web &amp; Financial Backend
          </div>
          <div style={{ display: "flex", marginRight: "16px" }}>•</div>
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
