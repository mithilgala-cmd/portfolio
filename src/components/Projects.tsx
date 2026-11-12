"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, Layers, Cpu, Server, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const getProjectIcon = (category: string) => {
    if (category.includes("Distributed")) return <Server className="w-5 h-5 text-cyanAccent" />;
    if (category.includes("Agentic") || category.includes("AI")) return <Cpu className="w-5 h-5 text-indigo-400" />;
    return <Layers className="w-5 h-5 text-emerald-400" />;
  };

  return (
    <section id="projects" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-cyanAccent">
          Featured Engineering Projects
        </span>
        <div className="flex-1 h-px bg-borderDark" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Subtle card top glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyanAccent/50 via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header: Category Badge & Status */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyanAccent">
                  {getProjectIcon(project.category)}
                  <span>{project.category}</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-borderDark">
                  {project.statusBadge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyanAccent transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Architecture Highlights */}
              <div className="mb-6 space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-borderDark/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Architectural Highlights
                </p>
                <ul className="space-y-1.5">
                  {project.architectureHighlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyanAccent flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techTags.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action: Link to GitHub */}
              <div className="pt-4 border-t border-borderDark/60 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-cyanAccent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository & Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyanAccent" />
                </a>
                <span className="text-[11px] text-slate-500 font-mono">MIT / Verified</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

