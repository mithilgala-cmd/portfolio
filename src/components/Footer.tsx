"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, Code2, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-borderDark/80 bg-background/95 mt-16 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {/* Copyright & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-semibold text-slate-200">
              © {currentYear} {portfolioData.name}
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="text-slate-400">{portfolioData.location}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-cyanAccent transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="hover:text-cyanAccent transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4 text-[#ffc01e]" />
              <span>LeetCode</span>
            </a>
            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-cyanAccent transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-borderDark/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            Built with Next.js 15 App Router, TypeScript & Tailwind CSS. Hosted on Vercel.
          </p>
          <p>
            Portfolio URL:{" "}
            <a
              href={portfolioData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyanAccent hover:underline"
            >
              {portfolioData.liveUrl.replace("https://", "")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
