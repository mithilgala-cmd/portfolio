"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

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
      {/* Editorial Plain Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
          Certifications
        </h2>
        <a
          href={portfolioData.socials.linkedin.certificationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-[#5C5A54] hover:text-[#1A1A18] transition-colors min-h-[44px]"
        >
          <span>LinkedIn Certifications</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Featured Certifications & Dynamic Course Count Summary */}
      <div className="mb-6 font-mono text-xs text-[#5C5A54] leading-relaxed">
        <span>AWS Academy Graduate (Cloud Architecting) and Managing Projects with AI (AI CERTs), plus </span>
        <span className="text-[#1A1A18] font-semibold">{totalCount - 2} shorter courses</span>
        <span> across cloud infrastructure, generative AI, and agent architectures.</span>
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
              className={`px-3 py-1.5 transition-all focus-visible:ring-2 focus-visible:ring-[#B5361A] focus-visible:outline-none min-h-[44px] sm:min-h-0 ${
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

      {/* Certifications Index List */}
      <div
        role="tabpanel"
        aria-label="Certifications list"
        className="divide-y divide-[#D9D4C7] border-t border-b border-[#D9D4C7] font-mono text-xs"
      >
        {displayedCerts.map((cert) => (
          <div
            key={cert.id}
            className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="font-serif text-base text-[#1A1A18] font-normal">
                  {cert.title}
                </span>
                <span className="text-[#5C5A54]">· {cert.issuer}</span>
                <span className="text-[10px] text-[#5C5A54] border border-[#D9D4C7] px-1.5 py-0.2">
                  {cert.category}
                </span>
              </div>
              <div className="text-[11px] text-[#5C5A54]">
                Issued: {cert.issueDate}
                {cert.credentialId && <span> · ID: {cert.credentialId}</span>}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start sm:self-baseline">
              <span className="text-[11px] text-[#5C5A54]">
                {cert.featured ? "Featured" : "Coursework"}
              </span>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#B5361A] hover:underline font-medium min-h-[44px] sm:min-h-0 items-center"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expand / Collapse Toggle */}
      {selectedFilter === "All" && totalCount > 5 && (
        <div className="mt-8 flex justify-center font-mono text-xs">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] transition-all min-h-[44px]"
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
