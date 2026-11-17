"use client";

import React, { useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { featuredProjects, isComprehensiveCaseStudy } from "@/data/projects";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  FolderGit2,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Projects() {
  const [showMoreRepos, setShowMoreRepos] = useState(false);

  const featuredRepoNames = new Set([
    "infrapulse",
    "agent-orchestration-system",
    "smart-gateway-mcp",
    "portfolio-projects",
  ]);

  const moreRepos = portfolioData.publicRepositories.filter(
    (repo) => !featuredRepoNames.has(repo.name)
  );

  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#5C5A54]">01</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
            Projects
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Featured Systems & Repositories
        </span>
      </div>

      {/* 4 Featured Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredProjects.map((project) => (
          <SpotlightCard
            key={project.slug}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#D9D4C7] font-mono text-xs">
                <span className="text-[#B5361A] font-medium tracking-wide">
                  {project.highlight}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#D9D4C7] text-[#5C5A54]">
                  {project.language}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A18] mb-2">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed mb-6">
                {project.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-[#D9D4C7] flex items-center justify-between font-mono text-xs">
              {isComprehensiveCaseStudy(project) ? (
                <>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-[#B5361A] hover:underline font-medium"
                  >
                    <span>Read Case Study</span>
                    <span>→</span>
                  </Link>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#5C5A54] hover:text-[#1A1A18] transition-colors"
                  >
                    <span>Source</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#5C5A54] hover:text-[#1A1A18] font-medium transition-colors"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Collapsed More Repositories Section */}
      <div className="border border-[#D9D4C7] bg-[#F6F3EC]">
        <button
          onClick={() => setShowMoreRepos(!showMoreRepos)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left font-mono text-xs text-[#1A1A18] hover:bg-[#D9D4C7]/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#5C5A54]" />
            <span className="font-medium">All Public Repositories ({moreRepos.length})</span>
            <span className="text-[#5C5A54] hidden sm:inline">
              · Algorithmic patterns, pipelines & tools
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#B5361A] font-medium">
            <span>{showMoreRepos ? "Collapse" : "Expand"}</span>
            {showMoreRepos ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showMoreRepos && (
          <div className="divide-y divide-[#D9D4C7] border-t border-[#D9D4C7] font-mono text-xs">
            {moreRepos.map((repo) => (
              <div
                key={repo.name}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#D9D4C7]/20 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1A1A18] hover:text-[#B5361A] transition-colors flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{repo.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#5C5A54]" />
                    </a>
                    <span className="text-[9px] px-1.5 py-0.2 border border-[#D9D4C7] text-[#5C5A54]">
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5C5A54] truncate">
                    {repo.description}
                  </p>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#5C5A54] hover:text-[#1A1A18] self-start sm:self-center shrink-0"
                >
                  <span>View Code</span>
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
