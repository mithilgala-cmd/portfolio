"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import {
  Github,
  Code2,
  Linkedin,
  Copy,
  Check,
  ArrowUpRight,
  FileText,
} from "lucide-react";

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const totalSolved = portfolioData.fallbackStats.leetcode.totalSolved;

  // TODO(mithil): Add resume PDF file to public/resume.pdf to enable primary CTA button
  const hasResumePdf = false;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mithil.gala@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Main Text Column */}
        <div className="md:col-span-8">
          {/* Mobile Avatar (visible on mobile <768px) */}
          <div className="flex md:hidden items-center gap-4 mb-6">
            <div className="relative w-20 h-20 shrink-0 border border-[#D9D4C7] overflow-hidden bg-[#F6F3EC]">
              <Image
                src="/mithil-gala-square.jpg"
                alt="Mithil Gala"
                width={80}
                height={80}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#D9D4C7] bg-[#F6F3EC] text-[11px] font-mono text-[#5C5A54]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>Open for 2027 Roles</span>
              </div>
            </div>
          </div>

          {/* Availability Status Pill (desktop) */}
          <div className="hidden md:inline-flex items-center gap-2.5 px-3 py-1.5 border border-[#D9D4C7] bg-[#F6F3EC] text-xs font-mono text-[#5C5A54] mb-6">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="truncate">{portfolioData.statusBadge}</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight text-[#1A1A18] mb-3">
            Mithil Gala
          </h1>

          {/* Credentials Subtitle */}
          <div className="font-mono text-xs sm:text-sm text-[#5C5A54] mb-6 flex flex-wrap items-center gap-2">
            <span>{portfolioData.subheadline}</span>
            <span className="text-[#D9D4C7] hidden sm:inline">|</span>
            <span>Backend Infrastructure · Distributed Systems · Agentic AI</span>
          </div>

          {/* Concrete Build Statement */}
          <p className="text-base sm:text-lg text-[#1A1A18] leading-relaxed font-normal mb-5 max-w-2xl">
            I build backend services, distributed algorithm simulations, and agentic AI workflows.
            Backed by{" "}
            <span className="font-mono font-medium text-[#1A1A18] border border-[#D9D4C7] px-1.5 py-0.5 bg-[#F6F3EC]">
              {totalSolved}+ solved on LeetCode
            </span>{" "}
            (Top 0.8% in Java) and hands-on financial systems operations.
          </p>

          <p className="text-sm text-[#5C5A54] leading-relaxed mb-8 max-w-2xl">
            {portfolioData.bio}
          </p>

          {/* Verified Technical Proof Points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-xl">
            <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
              <div className="font-mono text-[10px] text-[#5C5A54] uppercase tracking-wider mb-0.5">
                LeetCode Track
              </div>
              <div className="font-serif text-xl text-[#1A1A18]">
                {portfolioData.fallbackStats.leetcode.totalSolved} Solved
              </div>
              <div className="font-mono text-[11px] text-[#5C5A54]">
                {portfolioData.fallbackStats.leetcode.acceptanceRate} acceptance
              </div>
            </div>

            <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
              <div className="font-mono text-[10px] text-[#5C5A54] uppercase tracking-wider mb-0.5">
                Public Repos
              </div>
              <div className="font-serif text-xl text-[#1A1A18]">
                {portfolioData.fallbackStats.github.publicRepos} Repositories
              </div>
              <div className="font-mono text-[11px] text-[#5C5A54]">
                MIT Licensed Code
              </div>
            </div>

            <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC] col-span-2 sm:col-span-1">
              <div className="font-mono text-[10px] text-[#5C5A54] uppercase tracking-wider mb-0.5">
                Network
              </div>
              <div className="font-serif text-xl text-[#1A1A18]">
                {portfolioData.socials.linkedin.followers}
              </div>
              <div className="font-mono text-[11px] text-[#5C5A54]">
                Engineering Reach
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {hasResumePdf && (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A18] text-[#F6F3EC] font-mono text-xs font-medium hover:bg-[#1A1A18]/90 transition-all border border-[#1A1A18]"
              >
                <FileText className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            )}

            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs transition-all border ${
                copiedEmail
                  ? "border-[#B5361A] text-[#B5361A] bg-[#F6F3EC]"
                  : "bg-[#F6F3EC] border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18]"
              }`}
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-[#B5361A]" />
                  <span>mithil.gala@gmail.com copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#5C5A54]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-mono text-xs transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#5C5A54]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5A54]" />
            </a>

            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-mono text-xs transition-all"
            >
              <Github className="w-4 h-4 text-[#5C5A54]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5A54]" />
            </a>

            <a
              href={portfolioData.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-mono text-xs transition-all"
            >
              <Code2 className="w-4 h-4 text-[#5C5A54]" />
              <span>LeetCode</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5A54]" />
            </a>
          </div>
        </div>

        {/* Desktop Portrait Photo Column (visible on md+) */}
        <div className="hidden md:block md:col-span-4">
          <div className="border border-[#D9D4C7] p-2 bg-[#F6F3EC]">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#D9D4C7] bg-[#F6F3EC]">
              <Image
                src="/mithil-gala.webp"
                alt="Mithil Gala portrait"
                fill
                priority
                sizes="(min-width: 768px) 300px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] text-[#5C5A54]">
              <span>Mithil Gala</span>
              <span>Mumbai, IN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
