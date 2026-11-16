import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#06080c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mithilgala.is-a.dev"),
  title: "Mithil Gala | Systems & Software Engineer · Distributed Systems & Agentic AI",
  description:
    "Engineering portfolio of Mithil Gala — B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Distributed Systems, Bully & Ricart–Agrawala consensus, Agentic AI, and Full-Stack Cloud Platforms.",
  authors: [{ name: "Mithil Gala", url: "https://mithilgala.is-a.dev" }],
  creator: "Mithil Gala",
  keywords: [
    "Mithil Gala",
    "Systems Engineer",
    "Distributed Systems",
    "Agentic AI",
    "Computer Engineering",
    "NMIMS Mumbai",
    "MPSTME",
    "Java",
    "Python",
    "LangChain",
    "Model Context Protocol",
    "LeetCode 630+",
    "Cloud Architecture",
    "Full Stack Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mithilgala.is-a.dev",
    siteName: "Mithil Gala // Systems Portfolio",
    title: "Mithil Gala | Systems & Software Engineer · Distributed Systems & Agentic AI",
    description:
      "B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Distributed Systems, Agentic AI, and High-Throughput Cloud Platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithil Gala | Systems & Software Engineer",
    description:
      "B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Distributed Systems, Agentic AI, and High-Throughput Cloud Platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#06080c] text-slate-100 font-sans antialiased min-h-screen selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
