"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, Copy, Check, ArrowUpRight, Github, Code2, Linkedin, MapPin } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <h2 className="section-index mb-8">
        <span>06 // CONTACT</span>
        <span className="text-slate-400 font-normal">Get In Touch</span>
      </h2>

      <SpotlightCard className="p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-2">
            <Mail className="w-4 h-4" />
            <span>COMMUNICATION // DIRECT</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-3">
            Let&apos;s Build Something Reliable.
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
            Currently open to 2027 Software Engineering internships and engineering roles across
            backend systems, distributed infrastructure, and agentic workflows.
          </p>

          {/* Direct Communication Channels */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-8">
            <a
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#06080c] font-semibold transition-all shadow-md shadow-cyan-950/30"
            >
              <Mail className="w-4 h-4" />
              <span>{portfolioData.email}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all border ${
                copied
                  ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Social Connections */}
          <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Location: {portfolioData.location} (Open to Relocation / Remote)</span>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <a
                href={portfolioData.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={portfolioData.socials.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>LeetCode</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
