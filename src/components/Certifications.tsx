"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Award, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CategoryFilter = "All" | "AI & Agents" | "Cloud & DevOps" | "Data & BI" | "Software Eng";

export default function Certifications() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

  const allCerts = portfolioData.certifications;
  const totalCount = allCerts.length; // 17

  // Filter based on selected tag
  const filteredCerts = allCerts.filter((cert) => {
    if (selectedFilter === "All") return true;
    return cert.category === selectedFilter;
  });

  // Decide how many to display: if showAll is true or if user is filtering by a specific category, show all matching; else show featured
  const displayedCerts = showAll || selectedFilter !== "All"
    ? filteredCerts
    : filteredCerts.filter((c) => c.featured);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: `All (${totalCount})`, value: "All" },
    { label: "AI & Agents", value: "AI & Agents" },
    { label: "Cloud & DevOps", value: "Cloud & DevOps" },
    { label: "Data & BI", value: "Data & BI" },
    { label: "Software Eng", value: "Software Eng" },
  ];

  return (
    <section id="certifications" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-cyanAccent">
          Licenses & Certifications
        </span>
        <div className="flex-1 h-px bg-borderDark" />
      </div>

      {/* Top Banner: Verification badge & LinkedIn link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-slate-900/60 border border-borderDark/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyanAccent/10 text-cyanAccent">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              17 Verified Licenses & Professional Certifications
            </h4>
            <p className="text-xs text-slate-400">
              Credentials covering Agentic AI, Cloud Architecting, Data Engineering & Distributed Systems
            </p>
          </div>
        </div>

        <a
          href={portfolioData.socials.linkedin.certificationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 rounded-lg bg-surface hover:bg-surfaceHover border border-borderDark hover:border-cyanAccent text-slate-200 hover:text-white text-xs font-semibold transition-all transform hover:-translate-y-0.5"
        >
          <span>View All 17 Credentials on LinkedIn</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyanAccent" />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedFilter(cat.value);
              }}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all ${
                isActive
                  ? "bg-cyanAccent text-[#070b14] border-cyanAccent font-semibold shadow-sm shadow-cyanAccent/20"
                  : "bg-surface text-slate-300 border-borderDark hover:border-slate-600 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {displayedCerts.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-xl p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyanAccent border border-borderDark">
                    {cert.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {cert.issueDate}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyanAccent transition-colors mb-1.5">
                  {cert.title}
                </h4>

                <p className="text-xs text-slate-300 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyanAccent flex-shrink-0" />
                  <span>{cert.issuer}</span>
                </p>

                {cert.credentialId && (
                  <p className="text-[11px] text-slate-400 font-mono truncate" title={cert.credentialId}>
                    ID: <span className="text-slate-300">{cert.credentialId}</span>
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-borderDark/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  {cert.featured ? "Featured Credential" : "Verified Record"}
                </span>
                <a
                  href={cert.credentialUrl || portfolioData.socials.linkedin.certificationsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyanAccent hover:underline font-medium"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expand / Collapse Toggle (for "All" filter) */}
      {selectedFilter === "All" && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-borderDark hover:border-cyanAccent text-slate-200 hover:text-white text-xs font-semibold transition-all transform hover:-translate-y-0.5"
          >
            <span>{showAll ? "Show Less (Top Featured Only)" : "Show All 17 Certifications"}</span>
            {showAll ? <ChevronUp className="w-4 h-4 text-cyanAccent" /> : <ChevronDown className="w-4 h-4 text-cyanAccent" />}
          </button>
        </div>
      )}
    </section>
  );
}
