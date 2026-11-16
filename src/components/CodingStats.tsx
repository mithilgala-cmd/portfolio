"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Code2,
  Github,
  Linkedin,
  ArrowUpRight,
  Flame,
  Trophy,
  GitFork,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface LiveStatsState {
  github: {
    username: string;
    publicRepos: number;
    source: "live" | "fallback";
  };
  leetcode: {
    username: string;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    acceptanceRate: string;
    maxStreak: string;
    rankingHighlight: string;
    source: "live" | "fallback";
  };
  linkedin: {
    username: string;
    followers: string;
  };
}

export default function CodingStats() {
  const fallback = portfolioData.fallbackStats;
  const [stats, setStats] = useState<LiveStatsState>({
    github: {
      username: portfolioData.socials.github.username,
      publicRepos: fallback.github.publicRepos,
      source: "fallback",
    },
    leetcode: {
      username: portfolioData.socials.leetcode.username,
      ...fallback.leetcode,
      source: "fallback",
    },
    linkedin: {
      username: portfolioData.socials.linkedin.username,
      followers: portfolioData.socials.linkedin.followers,
    },
  });
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [overallSource, setOverallSource] = useState<"live" | "fallback">("fallback");

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const json = await res.json();
          if (json.data && isMounted) {
            setStats(json.data);
            setFetchedAt(json.fetchedAt || null);
            setOverallSource(json.source || "fallback");
          }
        }
      } catch (err) {
        console.warn("Telemetry fallback active:", err);
      }
    }
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = stats.leetcode.totalSolved || fallback.leetcode.totalSolved;
  const easy = stats.leetcode.easy;
  const med = stats.leetcode.medium;
  const hard = stats.leetcode.hard;

  const easyPct = Math.round((easy / total) * 100);
  const medPct = Math.round((med / total) * 100);
  const hardPct = Math.max(1, 100 - easyPct - medPct);

  const formattedDate = fetchedAt
    ? new Date(fetchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section id="telemetry" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <h2 className="section-index mb-8">
        <span>By the numbers</span>
        <span className="text-slate-400 font-normal">
          Metrics & Activity {formattedDate ? `(as of ${formattedDate})` : ""}{" "}
          <span className="text-slate-400 font-mono text-[11px]">
            [{overallSource === "live" ? "Live Connected" : "Fallback Baseline"}]
          </span>
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: LeetCode Telemetry */}
        <SpotlightCard className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                    LeetCode Metrics
                  </h3>
                  <span className="font-mono text-[11px] text-slate-400">
                    @{stats.leetcode.username}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                    stats.leetcode.source === "live"
                      ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/30"
                      : "text-slate-400 bg-white/5 border-white/10"
                  }`}
                  title={
                    stats.leetcode.source === "live"
                      ? "Live from LeetCode GraphQL API"
                      : "Displaying cached fallback statistics"
                  }
                >
                  {stats.leetcode.source === "live" ? "Live" : "Fallback"}
                </span>
                <a
                  href={portfolioData.socials.leetcode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="View LeetCode Profile"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {total}
                </span>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">
                  Solved
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-mono">
                <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{stats.leetcode.rankingHighlight}</span>
              </div>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-2 pt-3 border-t border-white/5 font-mono">
              <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-slate-800">
                <div
                  style={{ width: `${easyPct}%` }}
                  className="bg-emerald-400 transition-all duration-500"
                  title={`Easy: ${easy}`}
                />
                <div
                  style={{ width: `${medPct}%` }}
                  className="bg-amber-400 transition-all duration-500"
                  title={`Medium: ${med}`}
                />
                <div
                  style={{ width: `${hardPct}%` }}
                  className="bg-rose-500 transition-all duration-500"
                  title={`Hard: ${hard}`}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  E: <b className="text-slate-200">{easy}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  M: <b className="text-slate-200">{med}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  H: <b className="text-slate-200">{hard}</b>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{stats.leetcode.maxStreak}</span>
            </span>
            <span>
              Acc: <span className="text-emerald-400 font-bold">{stats.leetcode.acceptanceRate}</span>
            </span>
          </div>
        </SpotlightCard>

        {/* Card 2: GitHub Code Index */}
        <SpotlightCard className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-white/5 text-slate-200 border border-white/10">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                    GitHub Codebase
                  </h3>
                  <span className="font-mono text-[11px] text-slate-400">
                    @{stats.github.username}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                    stats.github.source === "live"
                      ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/30"
                      : "text-slate-400 bg-white/5 border-white/10"
                  }`}
                  title={
                    stats.github.source === "live"
                      ? "Live from GitHub REST API"
                      : "Displaying cached fallback repository count"
                  }
                >
                  {stats.github.source === "live" ? "Live" : "Fallback"}
                </span>
                <a
                  href={portfolioData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="View GitHub Profile"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {stats.github.publicRepos}
                </span>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">
                  Public Repositories
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                <GitFork className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Distributed consensus, multi-agent graphs & DSA</span>
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
              Source code spanning Linux monitoring (Java), autonomous orchestrator loops (Python),
              and Redis token-bucket rate limiters.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan-400">
            <a href="#repos" className="hover:underline flex items-center gap-1">
              <span>View Repository Index</span>
              <span>→</span>
            </a>
            <span className="text-slate-400">All {stats.github.publicRepos} Public</span>
          </div>
        </SpotlightCard>

        {/* Card 3: Professional Network */}
        <SpotlightCard className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                    Professional Network
                  </h3>
                  <span className="font-mono text-[11px] text-slate-400">
                    in/{stats.linkedin.username}
                  </span>
                </div>
              </div>
              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="View LinkedIn Profile"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {stats.linkedin.followers}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Technical community, engineering peers & alumni
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
              Publishing insights on Agentic AI workflows, algorithmic consistency, and university
              operations scaling.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan-400">
            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-400 font-mono text-[11px]">
              Profile Snapshot
            </span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
