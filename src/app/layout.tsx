import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mithilgala.vercel.app"),
  title: "Mithil Gala | Computer Engineering '27 & Software Developer",
  description:
    "Portfolio of Mithil Gala — B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Java, Distributed Systems, Multi-Agent Systems, and Full-Stack Web Development.",
  authors: [{ name: "Mithil Gala", url: "https://mithilgala.vercel.app" }],
  creator: "Mithil Gala",
  keywords: [
    "Mithil Gala",
    "Computer Engineering",
    "NMIMS Mumbai",
    "MPSTME",
    "Software Engineer",
    "Distributed Systems",
    "Agentic AI",
    "Java",
    "Next.js",
    "LeetCode",
    "Full Stack Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mithilgala.vercel.app",
    siteName: "Mithil Gala Portfolio",
    title: "Mithil Gala | Computer Engineering '27 & Software Developer",
    description:
      "B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Java, Distributed Systems, Multi-Agent Systems, and Full-Stack Web Development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithil Gala | Computer Engineering '27 & Software Developer",
    description:
      "B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Java, Distributed Systems, Multi-Agent Systems, and Full-Stack Web Development.",
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
      <body className="bg-background text-slate-100 font-sans antialiased min-h-screen selection:bg-cyanAccent selection:text-[#070b14]">
        {children}
      </body>
    </html>
  );
}

