import React from "react";
import { portfolioData } from "@/data/portfolio";
import CopyEmailButton from "@/components/CopyEmailButton";
import { Mail, ArrowUpRight, Github, Code2, Linkedin, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#D9D4C7] pb-3 mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18]">
          Contact
        </h2>
        <span className="font-mono text-xs text-[#5C5A54] hidden sm:inline">
          Direct Communication & Inquiries
        </span>
      </div>

      <div className="border border-[#D9D4C7] bg-[#F6F3EC] p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs mb-2">
            <Mail className="w-4 h-4 text-[#B5361A]" />
            <span>Direct Communication</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#1A1A18] mb-3">
            Let&apos;s build something reliable.
          </h3>

          <p className="text-sm text-[#5C5A54] leading-relaxed mb-6">
            Currently open to 2027 software engineering internships and roles across backend systems,
            distributed infrastructure, and agentic workflows.
          </p>

          {/* Direct Communication Channels */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-8">
            <a
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A18] text-[#F6F3EC] font-medium hover:bg-[#1A1A18]/90 transition-all border border-[#1A1A18] min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>{portfolioData.email}</span>
            </a>

            <CopyEmailButton />
          </div>

          {/* Location & Social Connections */}
          <div className="pt-6 border-t border-[#D9D4C7] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-[#5C5A54]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5C5A54] shrink-0" />
              <span>{portfolioData.location} (Open to Relocation / Remote)</span>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <a
                href={portfolioData.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A1A18] transition-colors flex items-center gap-1 min-h-[44px] py-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={portfolioData.socials.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A1A18] transition-colors flex items-center gap-1 min-h-[44px] py-1"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>LeetCode</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A1A18] transition-colors flex items-center gap-1 min-h-[44px] py-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
