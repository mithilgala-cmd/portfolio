"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Code2, Github, Linkedin, ArrowUpRight, Flame, Trophy, GitFork } from "lucide-react";
import { motion } from "framer-motion";

interface LiveStatsState {
  github: {
    username: string;
    publicRepos: number;
    isLive: boolean;
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
    isLive: boolean;
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
      isLive: false,
    },
    leetcode: {
      username: portfolioData.socials.leetcode.username,
      ...fallback.leetcode,
      isLive: false,
    },
    linkedin: {
      username: portfolioData.socials.linkedin.username,
      followers: portfolioData.socials.linkedin.followers,
    },
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const json = await res.json();
          if (json.data && isMounted) {
            setStats(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic stats, using verified fallbacks:", err);
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

  return (
    <section id="coding" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-cyanAccent">
          Coding Activity & Profiles
        </span>
        <div className="flex-1 h-px bg-borderDark" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: LeetCode */}
        <motion.a
          href={portfolioData.socials.leetcode.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#ffc01e]/10 text-[#ffc01e]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-cyanAccent transition-colors">
                    LeetCode
                  </h3>
                  <span className="text-xs text-slate-400">@{stats.leetcode.username}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyanAccent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {total}
                </span>
                <span className="text-xs font-semibold text-cyanAccent uppercase tracking-wide">
                  Problems Solved
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{stats.leetcode.rankingHighlight}</span>
              </p>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-2 mt-4 pt-4 border-t border-borderDark/60">
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800">
                <div
                  style={{ width: `${easyPct}%` }}
                  className="bg-lcEasy transition-all duration-500"
                  title={`Easy: ${easy}`}
                />
                <div
                  style={{ width: `${medPct}%` }}
                  className="bg-lcMed transition-all duration-500"
                  title={`Medium: ${med}`}
                />
                <div
                  style={{ width: `${hardPct}%` }}
                  className="bg-lcHard transition-all duration-500"
                  title={`Hard: ${hard}`}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-lcEasy inline-block" />
                  Easy: <b className="text-slate-200">{easy}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-lcMed inline-block" />
                  Med: <b className="text-slate-200">{med}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-lcHard inline-block" />
                  Hard: <b className="text-slate-200">{hard}</b>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-borderDark/60 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{stats.leetcode.maxStreak}</span>
            </span>
            <span className="text-slate-400">
              Acceptance: <span className="text-emerald-400 font-semibold">{stats.leetcode.acceptanceRate}</span>
            </span>
          </div>
        </motion.a>

        {/* Card 2: GitHub */}
        <motion.a
          href={portfolioData.socials.github.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-800 text-slate-100">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-cyanAccent transition-colors">
                    GitHub
                  </h3>
                  <span className="text-xs text-slate-400">@{stats.github.username}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyanAccent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {stats.github.publicRepos}
                </span>
                <span className="text-xs font-semibold text-cyanAccent uppercase tracking-wide">
                  Public Repositories
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5 text-cyanAccent" />
                <span>Open-source algorithms, MERN architectures & DSA</span>
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              Explore hands-on distributed systems code, multi-agent capstone prototypes, and production-tested data structure solutions.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-borderDark/60 flex items-center justify-between text-xs text-cyanAccent font-medium">
            <span>Explore Repositories</span>
            <span>→</span>
          </div>
        </motion.a>

        {/* Card 3: LinkedIn */}
        <motion.a
          href={portfolioData.socials.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#0077b5]/10 text-[#0077b5]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-cyanAccent transition-colors">
                    LinkedIn
                  </h3>
                  <span className="text-xs text-slate-400">in/{stats.linkedin.username}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyanAccent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {stats.linkedin.followers}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Active engineering community & peer network
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              Sharing technical milestones in Agentic AI workflows, algorithmic consistency, systems architecture, and collegiate tech leadership.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-borderDark/60 flex items-center justify-between text-xs text-cyanAccent font-medium">
            <span>View Network & Insights</span>
            <span>→</span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
