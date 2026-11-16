"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  GitFork,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type FilterLanguage = "All" | "Java" | "Python" | "JavaScript / TS";

export default function PublicRepositories() {
  const [selectedFilter, setSelectedFilter] = useState<FilterLanguage>("All");

  const repos = portfolioData.publicRepositories;

  const filteredRepos = repos.filter((repo) => {
    if (selectedFilter === "All") return true;
    return repo.categoryTag === selectedFilter;
  });

  const filters: { label: string; value: FilterLanguage }[] = [
    { label: `All (${repos.length})`, value: "All" },
    { label: "Java", value: "Java" },
    { label: "Python", value: "Python" },
    { label: "JavaScript / TS", value: "JavaScript / TS" },
  ];

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case "Java":
        return "text-orange-400 bg-orange-950/40 border-orange-500/30";
      case "Python":
        return "text-blue-400 bg-blue-950/40 border-blue-500/30";
      case "JavaScript":
      case "TypeScript":
      case "JavaScript / TS":
        return "text-amber-300 bg-amber-950/40 border-amber-500/30";
      case "System Design":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-500/30";
      default:
        return "text-slate-300 bg-slate-800 border-white/10";
    }
  };

  return (
    <section id="repos" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <div className="section-index mb-8">
        <span>03 // OPEN-SOURCE REPOS</span>
        <span className="text-slate-400 font-normal">Public Engineering Index</span>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {filters.map((f) => {
            const isActive = selectedFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setSelectedFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-300 border-cyan-400/50 font-bold"
                    : "bg-[#0b0f17] text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
          <GitFork className="w-3.5 h-3.5 text-cyan-400" />
          <span>Showing {filteredRepos.length} of {repos.length} Repositories</span>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => (
          <SpotlightCard
            key={repo.name}
            className="p-5 flex flex-col justify-between group hover:border-cyan-400/40 transition-colors"
          >
            <div>
              {/* Header: Name & Language badge */}
              <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                <div className="min-w-0">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-sm text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 truncate"
                  >
                    <Terminal className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </a>
                </div>
                <span
                  className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${getLanguageColor(
                    repo.language
                  )}`}
                >
                  {repo.language}
                </span>
              </div>

              {/* Highlight Tag */}
              {repo.highlight && (
                <div className="font-mono text-[10px] text-cyan-400/90 mb-2 font-medium">
                  {"//"} {repo.highlight}
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {repo.description}
              </p>
            </div>

            {/* Direct GitHub Link */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500 text-[11px]">github.com/mithilgala-cmd</span>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
