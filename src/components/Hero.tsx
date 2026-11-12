"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, Code2, Linkedin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyanAccent/10 border border-cyanAccent/30 text-cyanAccent text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{portfolioData.statusBadge}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-3">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {portfolioData.headline}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl font-medium text-cyanAccent mb-5 flex items-center gap-2">
          <span>{portfolioData.subheadline}</span>
        </p>

        {/* Bio */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
          {portfolioData.bio}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={portfolioData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyanAccent text-[#070b14] font-semibold text-sm hover:bg-cyan-300 transition-all transform hover:-translate-y-0.5 shadow-md shadow-cyanAccent/20"
          >
            <Github className="w-4 h-4" />
            <span>GitHub (@{portfolioData.socials.github.username})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={portfolioData.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-borderDark text-slate-200 font-semibold text-sm hover:border-cyanAccent hover:text-white hover:bg-surfaceHover transition-all transform hover:-translate-y-0.5"
          >
            <Code2 className="w-4 h-4 text-[#ffc01e]" />
            <span>LeetCode Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-borderDark text-slate-200 font-semibold text-sm hover:border-cyanAccent hover:text-white hover:bg-surfaceHover transition-all transform hover:-translate-y-0.5"
          >
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
