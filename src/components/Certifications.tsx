"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Award,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type CategoryFilter = "All" | "AI & Agents" | "Cloud & DevOps" | "Data & BI" | "Software Eng";

export default function Certifications() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

  const allCerts = portfolioData.certifications;
  const totalCount = allCerts.length;

  const countFor = (cat: CategoryFilter) =>
    cat === "All" ? allCerts.length : allCerts.filter((c) => c.category === cat).length;

  // Filter based on selected tag
  const filteredCerts = allCerts.filter((cert) => {
    if (selectedFilter === "All") return true;
    return cert.category === selectedFilter;
  });

  const displayedCerts = showAll || selectedFilter !== "All"
    ? filteredCerts
    : filteredCerts.filter((c) => c.featured).slice(0, 5);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: `All (${countFor("All")})`, value: "All" },
    { label: `AI & Agents (${countFor("AI & Agents")})`, value: "AI & Agents" },
    { label: `Cloud & DevOps (${countFor("Cloud & DevOps")})`, value: "Cloud & DevOps" },
    { label: `Software Eng (${countFor("Software Eng")})`, value: "Software Eng" },
    { label: `Data & BI (${countFor("Data & BI")})`, value: "Data & BI" },
  ];

  return (
    <section id="certifications" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <h2 className="section-index mb-8">
        <span>05</span>
        <span>Certifications</span>
        <span className="text-slate-400 font-normal">Licenses & Certifications</span>
      </h2>

      {/* Verification Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-[#0b0f17] border border-white/10 font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-sans">
              Professional Certifications & Completed Training
            </h3>
            <p className="text-xs text-slate-400">
              Issued by Anthropic, Amazon Web Services (AWS), AI CERTs & Udemy
            </p>
          </div>
        </div>

        <a
          href={portfolioData.socials.linkedin.certificationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span>LinkedIn Certifications</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>

      {/* Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter certifications by category"
        className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs"
      >
        {categories.map((cat) => {
          const isActive = selectedFilter === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedFilter(cat.value)}
              className={`px-3 py-1.5 rounded-lg border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-300 border-cyan-400/50 font-bold"
                  : "bg-[#0b0f17] text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Certifications Grid */}
      <div
        role="tabpanel"
        aria-label="Certifications list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {displayedCerts.map((cert) => (
          <SpotlightCard
            key={cert.id}
            className="p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-white/5 font-mono">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-cyan-400 border border-white/10">
                  {cert.category}
                </span>
                <span className="text-[11px] text-slate-400">
                  {cert.issueDate}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 font-sans leading-snug">
                {cert.title}
              </h3>

              <div className="text-xs text-slate-300 flex items-center gap-1.5 mb-2 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{cert.issuer}</span>
              </div>

              {cert.credentialId && (
                <div
                  className="text-[10px] text-slate-400 font-mono truncate bg-[#06080c] px-2 py-1 rounded border border-white/5 mb-2"
                  title={cert.credentialId}
                >
                  <span className="text-slate-400">ID: </span>
                  <span className="text-slate-300">{cert.credentialId}</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">
                {cert.featured ? "Featured" : "Coursework"}
              </span>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-medium"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Expand / Collapse Toggle (for "All" filter) */}
      {selectedFilter === "All" && totalCount > 5 && (
        <div className="mt-8 flex justify-center font-mono text-xs">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white transition-all"
          >
            <span>{showAll ? "Collapse to Top 5 Featured Only" : `Show All ${totalCount} Certifications`}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-cyan-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-cyan-400" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
