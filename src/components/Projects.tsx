"use client";

import React, { useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { featuredProjects, isComprehensiveCaseStudy } from "@/data/projects";
import {
  ArrowUpRight,
  Terminal,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FolderGit2,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Projects() {
  const [showMoreRepos, setShowMoreRepos] = useState(false);

  // Filter out featured repo names from the full repository list
  const featuredRepoNames = new Set([
    "infrapulse",
    "agent-orchestration-system",
    "smart-gateway-mcp",
    "portfolio-projects",
  ]);

  const moreRepos = portfolioData.publicRepositories.filter(
    (repo) => !featuredRepoNames.has(repo.name)
  );

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
      default:
        return "text-slate-300 bg-slate-800 border-white/10";
    }
  };

  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <h2 className="section-index mb-8">
        <span>01</span>
        <span>Projects</span>
        <span className="text-slate-400 font-normal">Featured Systems & Repositories</span>
      </h2>

      {/* 4 Large Featured Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {featuredProjects.map((project) => (
          <SpotlightCard
            key={project.slug}
            className="p-6 sm:p-7 flex flex-col justify-between group hover:border-cyan-400/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/5 font-mono text-xs">
                <span className="text-cyan-400 font-semibold tracking-wide flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>{project.highlight}</span>
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getLanguageColor(
                    project.language
                  )}`}
                >
                  {project.language}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 font-sans">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {project.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              {isComprehensiveCaseStudy(project) ? (
                <>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/30 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                    <span>→</span>
                  </Link>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Collapsed More Repositories Section */}
      <div className="border border-white/10 rounded-xl bg-[#0b0f17] overflow-hidden">
        <button
          onClick={() => setShowMoreRepos(!showMoreRepos)}
          className="w-full px-5 py-4 flex items-center justify-between text-left font-mono text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">More Repositories ({moreRepos.length})</span>
            <span className="text-slate-400 hidden sm:inline">
              · Additional algorithmic patterns, pipelines & tools
            </span>
          </div>

          <div className="flex items-center gap-1 text-cyan-400 font-medium">
            <span>{showMoreRepos ? "Hide" : "Expand"}</span>
            {showMoreRepos ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showMoreRepos && (
          <div className="divide-y divide-white/5 border-t border-white/5 font-mono text-xs">
            {moreRepos.map((repo) => (
              <div
                key={repo.name}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{repo.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${getLanguageColor(
                        repo.language
                      )}`}
                    >
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate font-sans">
                    {repo.description}
                  </p>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors self-start sm:self-auto text-[11px]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
