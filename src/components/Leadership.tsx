import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Calendar } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Leadership() {
  return (
    <section id="leadership" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#5C5A54]">04</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
            Leadership
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Initiatives, Operations & Endurance
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Leadership Roles */}
        {portfolioData.leadership.map((item) => (
          <SpotlightCard key={item.id} className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D9D4C7]">
                <span className="font-mono text-[10px] text-[#5C5A54] border border-[#D9D4C7] px-2 py-0.5">
                  {item.badge || "Leadership"}
                </span>
                <span className="font-mono text-xs text-[#5C5A54] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#5C5A54]" />
                  {item.period}
                </span>
              </div>

              <h3 className="font-serif text-lg font-normal text-[#1A1A18] mb-1">
                {item.role}
              </h3>
              <p className="font-mono text-xs text-[#5C5A54] mb-3">
                {item.organization}
              </p>

              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed">
                {item.description}
              </p>
            </div>
          </SpotlightCard>
        ))}

        {/* Endurance Achievement Tile */}
        {portfolioData.achievements.map((item) => (
          <SpotlightCard
            key={item.id}
            className="p-5 sm:p-6 md:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D9D4C7]">
                <div className="text-[#B5361A] font-mono text-xs font-medium">
                  {item.category.toUpperCase()}
                </div>
                {item.metric && (
                  <span className="font-mono text-[10px] text-[#B5361A] border border-[#B5361A]/30 px-2 py-0.5">
                    {item.metric}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1A1A18] mb-1">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed">
                {item.description}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
