"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-cyanAccent">
          Leadership & Programs
        </span>
        <div className="flex-1 h-px bg-borderDark" />
      </div>

      <div className="relative border-l border-borderDark/80 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {portfolioData.experience.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Timeline node icon */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-borderDark group-hover:border-cyanAccent flex items-center justify-center transition-colors">
              <div className="w-2 h-2 rounded-full bg-cyanAccent" />
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-cyanAccent transition-colors">
                  {item.role}
                </h3>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/30">
                      {item.badge}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyanAccent" />
                    <span>{item.period}</span>
                  </span>
                </div>
              </div>

              <div className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyanAccent" />
                <span>{item.organization}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-3 pt-3 border-t border-borderDark/60 space-y-1.5">
                  {item.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyanAccent flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
