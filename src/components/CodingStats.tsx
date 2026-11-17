import React from "react";
import { portfolioData } from "@/data/portfolio";
import statsData from "@/data/stats.json";
import {
  Code2,
  Github,
  Linkedin,
  ArrowUpRight,
  Flame,
  Trophy,
} from "lucide-react";

export default function CodingStats() {
  const { leetcode, github, updatedAt } = statsData;

  const totalLC = leetcode.totalSolved;
  const easyLC = leetcode.easy;
  const medLC = leetcode.medium;
  const hardLC = leetcode.hard;

  const easyPercent = Math.round((easyLC / totalLC) * 100);
  const medPercent = Math.round((medLC / totalLC) * 100);
  const hardPercent = Math.round((hardLC / totalLC) * 100);

  // Format date dynamically in "as of Month YYYY" format
  const dateObj = new Date(updatedAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(dateObj);

  return (
    <section id="numbers" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Plain Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
            Numbers
          </h2>
          <span className="font-mono text-xs text-[#5C5A54]">
            as of {formattedDate}
          </span>
        </div>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Verified Algorithmic & Systems Output
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* LeetCode Solved Section */}
        <div className="p-6 md:col-span-2 border border-[#D9D4C7] bg-[#F6F3EC] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D9D4C7] mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#5C5A54]" />
                <span className="font-serif text-lg font-normal text-[#1A1A18]">
                  LeetCode Algorithmic Solving
                </span>
              </div>
              <a
                href={portfolioData.socials.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#5C5A54] hover:text-[#1A1A18] flex items-center gap-1 min-h-[44px]"
              >
                <span>@{portfolioData.socials.leetcode.username}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Top solved numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
                <span className="font-mono text-[10px] text-[#5C5A54] block mb-0.5">
                  TOTAL SOLVED
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
                  {totalLC}
                </span>
              </div>

              <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
                <span className="font-mono text-[10px] text-[#5C5A54] block mb-0.5">
                  EASY ({easyPercent}%)
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#0d9488]">
                  {easyLC}
                </span>
              </div>

              <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
                <span className="font-mono text-[10px] text-[#5C5A54] block mb-0.5">
                  MEDIUM ({medPercent}%)
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#92400e]">
                  {medLC}
                </span>
              </div>

              <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
                <span className="font-mono text-[10px] text-[#5C5A54] block mb-0.5">
                  HARD ({hardPercent}%)
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#B5361A]">
                  {hardLC}
                </span>
              </div>
            </div>

            {/* Distribution proportional bar */}
            <div className="mb-4">
              <div className="h-2 w-full flex overflow-hidden border border-[#D9D4C7]">
                <div style={{ width: `${easyPercent}%` }} className="bg-[#0d9488]" title={`Easy: ${easyLC}`} />
                <div style={{ width: `${medPercent}%` }} className="bg-[#d97706]" title={`Medium: ${medLC}`} />
                <div style={{ width: `${hardPercent}%` }} className="bg-[#B5361A]" title={`Hard: ${hardLC}`} />
              </div>
            </div>

            {/* Key LeetCode Proof Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="flex items-center gap-2 p-2 border border-[#D9D4C7] bg-[#F6F3EC]">
                <Trophy className="w-3.5 h-3.5 text-[#5C5A54] shrink-0" />
                <span className="text-[#1A1A18] truncate">{leetcode.rankingHighlight}</span>
              </div>
              <div className="flex items-center gap-2 p-2 border border-[#D9D4C7] bg-[#F6F3EC]">
                <Flame className="w-3.5 h-3.5 text-[#5C5A54] shrink-0" />
                <span className="text-[#1A1A18]">{leetcode.maxStreak}</span>
              </div>
              <div className="flex items-center gap-2 p-2 border border-[#D9D4C7] bg-[#F6F3EC]">
                <span className="text-[#5C5A54]">Rate:</span>
                <span className="text-[#1A1A18]">{leetcode.acceptanceRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub & LinkedIn Side Column */}
        <div className="flex flex-col gap-6">
          <div className="p-6 border border-[#D9D4C7] bg-[#F6F3EC] flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9D4C7] mb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-[#5C5A54]" />
                  <span className="font-serif text-base text-[#1A1A18]">GitHub</span>
                </div>
                <a
                  href={portfolioData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#5C5A54] hover:text-[#1A1A18] flex items-center gap-1 min-h-[44px]"
                >
                  <span>@{portfolioData.socials.github.username}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="font-serif text-3xl font-normal text-[#1A1A18] mb-1">
                {github.publicRepos} Public Repos
              </div>
              <p className="text-xs text-[#5C5A54] font-mono leading-relaxed">
                Open-source systems, algorithmic problem sets & distributed simulations.
              </p>
            </div>
          </div>

          <div className="p-6 border border-[#D9D4C7] bg-[#F6F3EC] flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9D4C7] mb-3">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#5C5A54]" />
                  <span className="font-serif text-base text-[#1A1A18]">LinkedIn</span>
                </div>
                <a
                  href={portfolioData.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#5C5A54] hover:text-[#1A1A18] flex items-center gap-1 min-h-[44px]"
                >
                  <span>/in/{portfolioData.socials.linkedin.username}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="font-serif text-3xl font-normal text-[#1A1A18] mb-1">
                {portfolioData.socials.linkedin.followers}
              </div>
              <p className="text-xs text-[#5C5A54] font-mono leading-relaxed">
                Engineering reach across campus operations, student leadership, and industry peers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Pipeline Colophon Note */}
      <div className="p-3 border border-[#D9D4C7] bg-[#F6F3EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-[#5C5A54]">
        <div>
          <span>Data Pipeline: Committed data in </span>
          <code className="text-[#1A1A18]">src/data/stats.json</code>
          <span> updated daily via GitHub Actions.</span>
        </div>
        <div>
          <span>Zero runtime fetch overhead · Static SSR</span>
        </div>
      </div>
    </section>
  );
}
