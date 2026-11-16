"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Experience() {
  return (
    <section id="experience" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <div className="section-index mb-8">
        <span>02 // EXPERIENCE</span>
        <span className="text-slate-400 font-normal">Production & Engineering Experience</span>
      </div>

      <div className="relative border-l border-white/10 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {portfolioData.experience.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Indicator */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#06080c] border border-white/20 group-hover:border-cyan-400 flex items-center justify-center transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            <SpotlightCard className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-sans">
                    {item.role}
                  </h3>
                  {item.badge && (
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="text-xs font-mono font-medium text-slate-300 mb-3 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.organization}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="pt-3 border-t border-white/5 space-y-1.5 font-mono text-xs text-slate-400">
                  {item.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-slate-300">{point}</span>
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
