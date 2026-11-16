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
} from "lucide-react";

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [totalSolved, setTotalSolved] = useState<number>(
    portfolioData.fallbackStats.leetcode.totalSolved
  );

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
        {/* Status Pill Badge */}
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
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400">Systems & Distributed Architectures</span>
        </div>

        {/* Concrete, authentic engineering summary */}
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
          Computer Engineering undergraduate (&apos;27) focused on{" "}
          <strong className="text-white font-semibold">Distributed Systems</strong>,{" "}
          <strong className="text-white font-semibold">High-Concurrency Cloud Platforms</strong>, and{" "}
          <strong className="text-white font-semibold">Autonomous Multi-Agent Graph Architectures</strong>.
          Verified track record with{" "}
          <span className="inline-flex items-center gap-1 font-mono text-cyan-400 font-bold bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-400/20">
            {totalSolved}+
          </span>{" "}
          solved algorithmic problems on LeetCode (Beats 99.21% / Top 0.8% in Java). Experienced
          maintaining live financial web infrastructure and directing large-scale university
          operations.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-xs">
          <a
            href={portfolioData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white font-medium transition-all"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>GitHub (@{portfolioData.socials.github.username})</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={portfolioData.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-white font-medium transition-all"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>LeetCode ({totalSolved} Solved)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/50 text-white font-medium transition-all"
          >
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span>LinkedIn (4,440+)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={handleCopyEmail}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg font-medium transition-all border ${
              copiedEmail
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                : "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-400/30 text-cyan-300"
            }`}
          >
            {copiedEmail ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>mithil.gala@gmail.com [Copied!]</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Copy Direct Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
