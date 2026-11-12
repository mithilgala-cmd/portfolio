"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Code, Layout, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    if (category === "Languages") return <Code className="w-4 h-4 text-cyanAccent" />;
    if (category === "Frameworks & Web") return <Layout className="w-4 h-4 text-indigo-400" />;
    return <Database className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <section id="skills" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-cyanAccent">
          Technical Skills & Tooling
        </span>
        <div className="flex-1 h-px bg-borderDark" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.skills.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-borderDark/60">
                {getCategoryIcon(cat.category)}
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 hover:border-cyanAccent/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-borderDark/40 text-[11px] text-slate-500 font-mono">
              {cat.skills.length} competencies
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

