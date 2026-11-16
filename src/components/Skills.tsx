import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Code, Cpu, Cloud } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Languages")) return <Code className="w-4 h-4 text-cyan-400" />;
    if (category.includes("Frameworks") || category.includes("Architecture"))
      return <Cpu className="w-4 h-4 text-indigo-400" />;
    return <Cloud className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <section id="skills" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <h2 className="section-index mb-8">
        <span>03 // SKILLS</span>
        <span className="text-slate-400 font-normal">Technical Competencies</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.skills.map((cat) => (
          <SpotlightCard key={cat.category} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5 font-mono">
                {getCategoryIcon(cat.category)}
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1.5 rounded-lg bg-[#06080c] hover:bg-white/5 text-slate-300 border border-white/10 hover:border-cyan-400/40 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-slate-400 font-mono">
              {"//"} {cat.skills.length} technical competencies
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
