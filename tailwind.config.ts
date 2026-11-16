import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06080c",
        surface: "#0b0f17",
        surfaceHover: "#111824",
        surfaceElevated: "#151e2e",
        borderHairline: "rgba(255, 255, 255, 0.08)",
        borderSubtle: "#1a2436",
        borderActive: "rgba(56, 189, 248, 0.4)",
        cyanAccent: "#38bdf8",
        lcEasy: "#00b8a3",
        lcMed: "#ffc01e",
        lcHard: "#ff375f",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
