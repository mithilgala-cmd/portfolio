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
        background: "#070b14",
        surface: "#0f172a",
        surfaceHover: "#162038",
        borderDark: "#1e293b",
        cyanAccent: "#38bdf8",
        cyanGlow: "rgba(56, 189, 248, 0.15)",
        lcEasy: "#00b8a3",
        lcMed: "#ffc01e",
        lcHard: "#ff375f",
      },
    },
  },
  plugins: [],
};

export default config;

