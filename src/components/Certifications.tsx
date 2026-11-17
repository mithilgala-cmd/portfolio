"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  Award,
  ArrowUpRight,
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
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#5C5A54]">05</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
            Certifications
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Credentials & Verified Training
        </span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 border border-[#D9D4C7] bg-[#F6F3EC] font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-[#D9D4C7] bg-[#F6F3EC] text-[#1A1A18]">
            <Award className="w-5 h-5 text-[#5C5A54]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#1A1A18]">
              Professional Certifications & Coursework
            </h3>
            <p className="text-xs text-[#5C5A54]">
              Issued by Anthropic, Amazon Web Services (AWS), AI CERTs & Udemy
            </p>
          </div>
        </div>

        <a
          href={portfolioData.socials.linkedin.certificationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] text-xs font-mono transition-all"
        >
          <span>LinkedIn Certifications</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5A54]" />
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
              className={`px-3 py-1.5 transition-all focus-visible:ring-2 focus-visible:ring-[#B5361A] focus-visible:outline-none ${
                isActive
                  ? "bg-[#1A1A18] text-[#F6F3EC] border border-[#1A1A18] font-medium"
                  : "bg-[#F6F3EC] text-[#5C5A54] border border-[#D9D4C7] hover:border-[#1A1A18] hover:text-[#1A1A18]"
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
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-[#D9D4C7] font-mono">
                <span className="text-[10px] text-[#5C5A54]">
                  {cert.category}
                </span>
                <span className="text-[11px] text-[#5C5A54]">
                  {cert.issueDate}
                </span>
              </div>

              <h3 className="font-serif text-lg font-normal text-[#1A1A18] mb-2 leading-snug">
                {cert.title}
              </h3>

              <div className="text-xs text-[#5C5A54] mb-2 font-mono">
                {cert.issuer}
              </div>

              {cert.credentialId && (
                <div
                  className="text-[10px] text-[#5C5A54] font-mono truncate border border-[#D9D4C7] px-2 py-1 mb-2"
                  title={cert.credentialId}
                >
                  <span>ID: {cert.credentialId}</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-[#D9D4C7] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#5C5A54]">
                {cert.featured ? "Featured" : "Coursework"}
              </span>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#B5361A] hover:underline font-medium"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Expand / Collapse Toggle */}
      {selectedFilter === "All" && totalCount > 5 && (
        <div className="mt-8 flex justify-center font-mono text-xs">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] transition-all"
          >
            <span>{showAll ? "Collapse to Top 5 Featured" : `Show All ${totalCount} Certifications`}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-[#5C5A54]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5C5A54]" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
