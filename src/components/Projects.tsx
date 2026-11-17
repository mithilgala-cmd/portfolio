"use client";

import React, { useState } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { featuredProjects, isComprehensiveCaseStudy } from "@/data/projects";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

export default function Projects() {
  const [showMoreRepos, setShowMoreRepos] = useState(false);

  const featuredRepoNames = new Set([
    "infrapulse",
    "agent-orchestration-system",
    "smart-gateway-mcp",
  ]);

  const moreRepos = portfolioData.publicRepositories.filter(
    (repo) => !featuredRepoNames.has(repo.name)
  );

  return (
    <section id="work" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Target anchor for backwards-compatibility */}
      <span id="projects" className="sr-only" />

      {/* Editorial Plain Section Header */}
      <div className="border-b border-[#D9D4C7] pb-3 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
          Selected Work
        </h2>
      </div>

      {/* Index List for Featured Projects */}
      <div className="divide-y divide-[#D9D4C7] border-t border-b border-[#D9D4C7] mb-8">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group"
          >
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A18] group-hover:text-[#B5361A] transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-[10px] text-[#5C5A54] border border-[#D9D4C7] px-2 py-0.5">
                  {project.language}
                </span>
                <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
                  {project.highlight}
                </span>
              </div>

              <p className="text-sm text-[#5C5A54] leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-5 font-mono text-xs shrink-0 self-start sm:self-baseline">
              {isComprehensiveCaseStudy(project) ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[#B5361A] hover:underline font-medium flex items-center gap-1 min-h-[44px]"
                >
                  <span>Case Study</span>
                  <span>→</span>
                </Link>
              ) : null}

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5C5A54] hover:text-[#1A1A18] transition-colors flex items-center gap-1 min-h-[44px]"
              >
                <span>Source</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Other Public Repositories (Collapsible Index List) */}
      <div>
        <button
          onClick={() => setShowMoreRepos(!showMoreRepos)}
          className="w-full py-3.5 flex items-center justify-between text-left font-mono text-xs text-[#1A1A18] hover:text-[#B5361A] transition-colors min-h-[44px]"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">All Public Repositories ({moreRepos.length})</span>
            <span className="text-[#5C5A54] hidden sm:inline">
              · Algorithmic problems, pipelines & tools
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#B5361A] font-medium">
            <span>{showMoreRepos ? "Collapse" : "Expand Index"}</span>
            {showMoreRepos ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showMoreRepos && (
          <div className="divide-y divide-[#D9D4C7] border-t border-b border-[#D9D4C7] font-mono text-xs">
            {moreRepos.map((repo) => (
              <div
                key={repo.name}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1A1A18] hover:text-[#B5361A] transition-colors flex items-center gap-1 truncate min-h-[44px]"
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
                  className="inline-flex items-center gap-1 text-[11px] text-[#5C5A54] hover:text-[#1A1A18] self-start sm:self-center shrink-0 min-h-[44px] sm:min-h-0 items-center"
                >
                  <span>Source</span>
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
