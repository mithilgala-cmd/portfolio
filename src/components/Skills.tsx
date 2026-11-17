import React from "react";
import { portfolioData } from "@/data/portfolio";
import SpotlightCard from "./SpotlightCard";

export default function Skills() {
  return (
    <section id="skills" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#5C5A54]">03</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
            Skills
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Technical Competencies & Tooling
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.skills.map((cat) => (
          <SpotlightCard key={cat.category} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D9D4C7]">
                <h3 className="font-serif text-lg font-normal text-[#1A1A18]">
                  {cat.category}
                </h3>
                <span className="font-mono text-[10px] text-[#5C5A54]">
                  {cat.skills.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 border border-[#D9D4C7] text-[#1A1A18] bg-[#F6F3EC] hover:border-[#1A1A18] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#D9D4C7] text-[11px] text-[#5C5A54] font-mono">
              Production & Project Stack
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
