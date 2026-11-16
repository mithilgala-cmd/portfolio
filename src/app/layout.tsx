import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#06080c",
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
    siteName: "Mithil Gala // Portfolio",
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* TODO(mithil): Add privacy-friendly analytics script (e.g. Cloudflare Web Analytics token or self-hosted Umami script) */}
      </head>
      <body className="bg-[#06080c] text-slate-100 font-sans antialiased min-h-screen selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
