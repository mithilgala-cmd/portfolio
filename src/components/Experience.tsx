import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Experience() {
  return (
    <section id="experience" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#5C5A54]">02</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
            Experience
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Production Systems & Engineering Track
        </span>
      </div>

      <div className="relative border-l border-[#D9D4C7] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {portfolioData.experience.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-3.5 h-3.5 bg-[#F6F3EC] border border-[#1A1A18] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#1A1A18]" />
            </div>

            <SpotlightCard className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D9D4C7]">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1A1A18]">
                    {item.role}
                  </h3>
                  {item.badge && (
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-[#D9D4C7] text-[#5C5A54]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-[#5C5A54]">
                  <Calendar className="w-3.5 h-3.5 text-[#5C5A54]" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="text-xs font-mono text-[#5C5A54] mb-3 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-[#5C5A54]" />
                <span className="font-medium text-[#1A1A18]">{item.organization}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed mb-3">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="pt-3 border-t border-[#D9D4C7] space-y-1.5 font-mono text-xs text-[#5C5A54]">
                  {item.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-[#B5361A] shrink-0 font-bold">—</span>
                      <span className="text-xs text-[#5C5A54]">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}
