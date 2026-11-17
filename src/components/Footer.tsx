import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, Code2, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#D9D4C7] bg-[#F6F3EC] mt-20 py-12 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#5C5A54]">
          {/* Identity & Status */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-serif text-base text-[#1A1A18]">
              {portfolioData.name}
            </span>
            <span className="hidden sm:inline text-[#D9D4C7]">|</span>
            <span>{portfolioData.subheadline}</span>
          </div>

          {/* External Profiles */}
          <div className="flex items-center gap-6">
            <a
              href={portfolioData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[#1A1A18] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4 text-[#5C5A54]" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.socials.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="hover:text-[#1A1A18] transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4 text-[#5C5A54]" />
              <span>LeetCode</span>
            </a>
            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[#1A1A18] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4 text-[#5C5A54]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Structural Sub-footer */}
        <div className="mt-8 pt-6 border-t border-[#D9D4C7] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#5C5A54]">
          <div>
            <span>Next.js 15 · TypeScript · Editorial Design System</span>
          </div>

          <div>
            <span>Domain: </span>
            <a
              href={portfolioData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A18] hover:underline"
            >
              mithilgala.is-a.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
