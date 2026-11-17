import React from "react";
import { portfolioData } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Plain Section Header */}
      <div className="border-b border-[#D9D4C7] pb-3 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
          Skills
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-[#D9D4C7] py-8">
        {portfolioData.skills.map((cat) => (
          <div key={cat.category} className="space-y-4">
            <div className="border-b border-[#D9D4C7] pb-2">
              <h3 className="font-serif text-lg font-normal text-[#1A1A18]">
                {cat.category}
              </h3>
            </div>

            <ul className="space-y-2 font-mono text-xs text-[#5C5A54]">
              {cat.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#B5361A] shrink-0" />
                  <span className="text-[#1A1A18]">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
