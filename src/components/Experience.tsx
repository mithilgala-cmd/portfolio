import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Plain Section Header */}
      <div className="border-b border-[#D9D4C7] pb-3 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
          Experience
        </h2>
      </div>

      <div className="divide-y divide-[#D9D4C7] border-t border-b border-[#D9D4C7]">
        {portfolioData.experience.map((item) => (
          <div key={item.id} className="py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A18]">
                  {item.role}
                </h3>
                <span className="font-mono text-xs text-[#5C5A54]">
                  · {item.organization}
                </span>
                {item.badge && (
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-[#D9D4C7] text-[#5C5A54]">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="font-mono text-xs text-[#5C5A54] shrink-0">
                {item.period}
              </div>
            </div>

            <p className="text-sm text-[#5C5A54] leading-relaxed mb-4 max-w-3xl">
              {item.description}
            </p>

            {item.highlights && item.highlights.length > 0 && (
              <ul className="space-y-1.5 font-mono text-xs text-[#5C5A54]">
                {item.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-[#B5361A] shrink-0 font-bold">—</span>
                    <span className="text-xs text-[#5C5A54]">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
