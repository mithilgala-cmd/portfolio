"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Github,
  Server,
  Cpu,
  Layers,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import ConsensusSimulator from "./widgets/ConsensusSimulator";
import AgentLoopInspector from "./widgets/AgentLoopInspector";
import RateLimiterWidget from "./widgets/RateLimiterWidget";

export default function Projects() {
  const renderInteractiveWidget = (projectId: string) => {
    switch (projectId) {
      case "distributed-smart-grid":
        return <ConsensusSimulator />;
      case "autonomous-multi-agent":
        return <AgentLoopInspector />;
      case "fullstack-cloud-systems":
        return <RateLimiterWidget />;
      default:
        return null;
    }
  };

  const getProjectIcon = (category: string) => {
    if (category.includes("Distributed")) return <Server className="w-4 h-4 text-cyan-400" />;
    if (category.includes("Agentic") || category.includes("AI"))
      return <Cpu className="w-4 h-4 text-indigo-400" />;
    return <Layers className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <div className="section-index mb-8">
        <span>02 // SYSTEMS & ARCHITECTURE</span>
        <span className="text-slate-400 font-normal">Featured Core Projects</span>
      </div>

      <div className="space-y-10">
        {portfolioData.projects.map((project) => (
          <SpotlightCard key={project.id} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Project Info & Architecture Specs (lg: 6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      {getProjectIcon(project.category)}
                      <span>{project.category}</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-sans">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Architecture Highlights */}
                  <div className="mb-5 space-y-2 bg-[#06080c] p-4 rounded-xl border border-white/10 font-mono">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Architectural Highlights</span>
                    </p>
                    <ul className="space-y-2 pt-1">
                      {project.architectureHighlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="font-sans leading-normal">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 font-mono">
                    {project.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 font-mono text-xs">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white font-semibold transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </a>

                  {project.secondaryUrl && (
                    <a
                      href={project.secondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Secondary Service Repo</span>
                    </a>
                  )}

                  <span className="text-[11px] text-slate-500 ml-auto">MIT / Open Source</span>
                </div>
              </div>

              {/* Right Column: Interactive System Architecture Simulator (lg: 6 cols) */}
              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl">
                  {renderInteractiveWidget(project.id)}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
