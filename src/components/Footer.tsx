"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, Code2, Linkedin, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06080c] mt-20 py-12 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          {/* Identity & Status */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-white font-sans text-sm">
              {portfolioData.name}
            </span>
            <span className="hidden sm:inline text-slate-600">/</span>
            <span className="text-slate-400">{portfolioData.subheadline}</span>
          </div>

          {/* Direct External Verified Profiles */}
          <div className="flex items-center gap-6">
            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>LeetCode</span>
            </a>
            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Structural Sub-footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>TELEMETRY_ONLINE</span>
            </span>
            <span>·</span>
            <span>Next.js 15 App Router · TypeScript · Tailwind CSS</span>
          </div>

          <div>
            <span>Canonical Domain: </span>
            <a
              href={portfolioData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              mithilgala.is-a.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
