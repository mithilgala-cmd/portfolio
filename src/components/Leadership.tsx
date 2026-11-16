import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Users, Calendar, Trophy, Activity } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Leadership() {
  return (
    <section id="leadership" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <h2 className="section-index mb-8">
        <span>04 // LEADERSHIP</span>
        <span className="text-slate-400 font-normal">Leadership & Achievements</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Leadership Roles */}
        {portfolioData.leadership.map((item) => (
          <SpotlightCard key={item.id} className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                  {item.badge || "Leadership"}
                </span>
                <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {item.period}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1 font-sans">
                {item.role}
              </h3>
              <p className="font-mono text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.organization}</span>
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </SpotlightCard>
        ))}

        {/* Endurance Achievement Tile */}
        {portfolioData.achievements.map((item) => (
          <SpotlightCard
            key={item.id}
            className="p-5 sm:p-6 md:col-span-2 flex flex-col justify-between border-rose-500/20 bg-gradient-to-br from-[#0b0f17] to-rose-950/10"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                  <Activity className="w-4 h-4" />
                  <span>{item.category.toUpperCase()}</span>
                </div>
                {item.metric && (
                  <span className="font-mono text-[10px] text-rose-300 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                    {item.metric}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-1 font-sans flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{item.title}</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
