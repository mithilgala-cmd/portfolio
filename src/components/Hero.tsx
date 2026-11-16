"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Github,
  Code2,
  Linkedin,
  Copy,
  Check,
  ArrowUpRight,
  Mail,
  FileText,
} from "lucide-react";

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [totalSolved, setTotalSolved] = useState<number>(
    portfolioData.fallbackStats.leetcode.totalSolved
  );

  // TODO(mithil): Add resume PDF file to public/resume.pdf to enable primary CTA button
  const hasResumePdf = false;

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveCount() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.leetcode?.totalSolved && isMounted) {
            setTotalSolved(json.data.leetcode.totalSolved);
          }
        }
      } catch {
        // Fallback already set to 630
      }
    }
    fetchLiveCount();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mithil.gala@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="max-w-4xl">
        {/* Availability Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0b0f17] border border-white/10 text-xs font-mono text-slate-300 mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="truncate">{portfolioData.statusBadge}</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-2 font-sans">
          Mithil Gala
        </h1>

        {/* Engineering Credentials Subtitle */}
        <div className="font-mono text-xs sm:text-sm text-cyan-400 mb-6 flex flex-wrap items-center gap-2">
          <span>{portfolioData.subheadline}</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-400">Backend & Distributed Systems · Agentic AI</span>
        </div>

        {/* Concrete Build Statement + Single Proof Point */}
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-5">
          I build backend services, distributed algorithm simulations, and agentic AI workflows.
          Backed by{" "}
          <span className="font-mono text-cyan-400 font-bold bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-400/20">
            {totalSolved}+
          </span>{" "}
          algorithmic solutions on LeetCode (top 0.8% in Java) and ongoing maintenance of
          financial web infrastructure for an RBI-registered NBFC.
        </p>

        {/* Short Plain-English About */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0b0f17] border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2 mb-8 font-sans">
          <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
            {"//"} About
          </div>
          <p>
            Computer Engineering undergraduate (&apos;27) at MPSTME, NMIMS Mumbai with a core focus on
            backend systems, distributed computing fundamentals, and autonomous agent loops.
          </p>
          <p>
            Currently maintaining regulatory web portals, legacy PHP services, and DNS/SSL configurations
            for Minolta Finance Ltd., while directing operational logistics across collegiate conclaves.
          </p>
        </div>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-6">
          {hasResumePdf && (
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#06080c] font-semibold transition-all shadow-md shadow-cyan-950/30"
            >
              <FileText className="w-4 h-4" />
              <span>Resume (PDF)</span>
            </a>
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium transition-all"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Contact</span>
          </a>

          <a
            href="mailto:mithil.gala@gmail.com"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#0b0f17] border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all"
            title="Direct mailto link"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>mithil.gala@gmail.com</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg font-medium transition-all border ${
              copiedEmail
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social Profile Links */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <a
            href={portfolioData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0b0f17] border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all text-[11px]"
          >
            <Github className="w-3.5 h-3.5 text-slate-400" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={portfolioData.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0b0f17] border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white transition-all text-[11px]"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>LeetCode ({totalSolved})</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0b0f17] border border-white/10 hover:border-sky-400/40 text-slate-300 hover:text-white transition-all text-[11px]"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
