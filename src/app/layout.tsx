import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6F3EC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mithilgala.is-a.dev"),
  title: "Mithil Gala | Software & Systems Engineer",
  description:
    "Engineering portfolio of Mithil Gala — B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Backend Infrastructure, Distributed Systems, and Agentic AI.",
  authors: [{ name: "Mithil Gala", url: "https://mithilgala.is-a.dev" }],
  creator: "Mithil Gala",
  alternates: {
    canonical: "https://mithilgala.is-a.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mithilgala.is-a.dev",
    siteName: "Mithil Gala",
    title: "Mithil Gala | Software & Systems Engineer",
    description:
      "B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Backend Systems, Distributed Architecture, and Agentic AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithil Gala | Software & Systems Engineer",
    description:
      "B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai. Specializing in Backend Systems, Distributed Architecture, and Agentic AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mithil Gala",
  jobTitle: "Software & Systems Engineer",
  url: "https://mithilgala.is-a.dev",
  sameAs: [
    "https://github.com/mithilgala-cmd",
    "https://www.linkedin.com/in/mithilgala",
    "https://leetcode.com/u/Mithilgala",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mukesh Patel School of Technology Management & Engineering (MPSTME), NMIMS Mumbai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* TODO(mithil): Add privacy-friendly analytics script (e.g. Cloudflare Web Analytics token or self-hosted Umami script) */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-[#F6F3EC] text-[#1A1A18] min-h-screen selection:bg-[#B5361A]/10 selection:text-[#B5361A]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1A1A18] focus:text-[#F6F3EC] focus:font-mono focus:text-xs focus:font-bold focus:shadow-md focus:ring-2 focus:ring-[#B5361A] focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
