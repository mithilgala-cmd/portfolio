import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function Leadership() {
  return (
    <section id="leadership" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Plain Section Header */}
      <div className="border-b border-[#D9D4C7] pb-3 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
          Leadership
        </h2>
      </div>

      <div className="divide-y divide-[#D9D4C7] border-t border-b border-[#D9D4C7] mb-8">
        {portfolioData.leadership.map((item) => (
          <div key={item.id} className="py-6 sm:py-7">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1A1A18]">
                  {item.role}
                </h3>
                <span className="font-mono text-xs text-[#5C5A54]">
                  · {item.organization}
                </span>
                {item.badge && (
                  <span className="font-mono text-[10px] text-[#5C5A54] border border-[#D9D4C7] px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="font-mono text-xs text-[#5C5A54] shrink-0">
                {item.period}
              </span>
            </div>

            <p className="text-sm text-[#5C5A54] leading-relaxed max-w-3xl">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Endurance Achievement */}
      {portfolioData.achievements.map((item) => (
        <div
          key={item.id}
          className="p-5 sm:p-6 border border-[#D9D4C7] bg-[#F6F3EC] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
        >
          <div>
            <div className="font-mono text-[10px] text-[#B5361A] uppercase tracking-wider mb-1">
              {item.category}
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1A1A18] mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-[#5C5A54]">{item.description}</p>
          </div>
          {item.metric && (
            <span className="font-mono text-xs text-[#B5361A] border border-[#B5361A]/40 px-2.5 py-1 self-start sm:self-center shrink-0">
              {item.metric}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
