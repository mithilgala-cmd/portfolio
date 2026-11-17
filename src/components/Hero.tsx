import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { portfolioData } from "@/data/portfolio";
import statsData from "@/data/stats.json";
import CopyEmailButton from "@/components/CopyEmailButton";
import {
  Github,
  Code2,
  Linkedin,
  ArrowUpRight,
  FileText,
} from "lucide-react";

export default function Hero() {
  const totalSolved = statsData.leetcode.totalSolved;
  const publicRepos = statsData.github.publicRepos;
  const acceptanceRate = statsData.leetcode.acceptanceRate;

  // Show Resume navigation and hero links only if public/resume.pdf exists
  const hasResumePdf = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Main Text Column */}
        <div className="md:col-span-8">
          {/* Availability Status Line (visible across all viewports) */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-[#D9D4C7] bg-[#F6F3EC] text-xs font-mono text-[#5C5A54] mb-6">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Open to 2027 software engineering internships and roles · Mumbai / Remote</span>
          </div>

          {/* Primary Editorial Headline with 96px Mobile Avatar beside Name */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight text-[#1A1A18]">
              Mithil Gala
            </h1>
            {/* 96px Mobile Profile Avatar beside Name (visible on mobile <768px) */}
            <div className="md:hidden relative w-24 h-24 shrink-0 border border-[#D9D4C7] overflow-hidden bg-[#F6F3EC]">
              <Image
                src="/mithil-gala-square.jpg"
                alt="Mithil Gala avatar"
                width={96}
                height={96}
                priority
                className="object-cover w-full h-full"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </div>

          {/* Credentials Subtitle */}
          <div className="font-mono text-xs sm:text-sm text-[#5C5A54] mb-6 flex flex-wrap items-center gap-2">
            <span>{portfolioData.subheadline}</span>
            <span className="text-[#D9D4C7] hidden sm:inline">|</span>
            <span>Backend Infrastructure · Distributed Systems · Agentic AI</span>
          </div>

          {/* Concrete Build Statement */}
          <p className="text-base sm:text-lg text-[#1A1A18] leading-relaxed font-normal mb-5 max-w-2xl">
            I build backend services, distributed systems infrastructure, and agentic AI workflows.
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
                {totalSolved} Solved
              </div>
              <div className="font-mono text-[11px] text-[#5C5A54]">
                {acceptanceRate} acceptance
              </div>
            </div>

            <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
              <div className="font-mono text-[10px] text-[#5C5A54] uppercase tracking-wider mb-0.5">
                Public Repos
              </div>
              <div className="font-serif text-xl text-[#1A1A18]">
                {publicRepos} Repositories
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

            <CopyEmailButton />

            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-mono text-xs transition-all min-h-[44px]"
            >
              <Linkedin className="w-4 h-4 text-[#5C5A54]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5A54]" />
            </a>

            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-mono text-xs transition-all min-h-[44px]"
            >
              <Github className="w-4 h-4 text-[#5C5A54]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5A54]" />
            </a>

            <a
              href={portfolioData.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-mono text-xs transition-all min-h-[44px]"
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
