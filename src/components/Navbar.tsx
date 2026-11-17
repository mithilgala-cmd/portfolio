"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolio";
import {
  Menu,
  X,
  Search,
  Copy,
  Check,
  ArrowUpRight,
  FileText,
} from "lucide-react";

const CommandPalette = dynamic(() => import("./CommandPalette"), {
  ssr: false,
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Resume PDF presence check
  const hasResumePdf = false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mithil.gala@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { label: "Projects", href: "#projects", index: "01" },
    { label: "Experience", href: "#experience", index: "02" },
    { label: "Skills", href: "#skills", index: "03" },
    { label: "Leadership", href: "#leadership", index: "04" },
    { label: "Certifications", href: "#certifications", index: "05" },
    { label: "Telemetry", href: "#telemetry", index: "06" },
    { label: "Contact", href: "#contact", index: "07" },
  ];

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#F6F3EC]/95 backdrop-blur-md py-2.5 border-b border-[#D9D4C7] shadow-sm"
            : "bg-[#F6F3EC]/90 backdrop-blur-sm py-3.5 border-b border-[#D9D4C7]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Editorial Brand Mark */}
          <Link
            href="#"
            className="flex items-center gap-2 group text-[#1A1A18] transition-colors"
          >
            <div className="w-7 h-7 border border-[#D9D4C7] bg-[#F6F3EC] hidden sm:flex items-center justify-center font-mono text-xs font-bold text-[#1A1A18] group-hover:border-[#1A1A18] transition-colors">
              MG
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-[#1A1A18] font-normal">
                Mithil Gala
              </span>
              <span className="font-mono text-[9px] text-[#5C5A54] uppercase tracking-wider -mt-0.5">
                Software & Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#5C5A54] hover:text-[#1A1A18] transition-colors py-1 flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-[#B5361A] min-h-[36px]"
              >
                <span className="text-[10px] text-[#5C5A54]/70">{link.index}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#5C5A54] hover:text-[#1A1A18] text-xs transition-colors font-mono min-h-[44px]"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5 text-[#5C5A54]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-[#F6F3EC] border border-[#D9D4C7] text-[#5C5A54]">
                ⌘K
              </kbd>
            </button>

            {/* Quick Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all border min-h-[44px] ${
                copiedEmail
                  ? "border-[#B5361A] text-[#B5361A] bg-[#F6F3EC]"
                  : "bg-[#F6F3EC] border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18]"
              }`}
              title="Copy mithil.gala@gmail.com"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#B5361A]" />
                  <span className="text-[11px] font-semibold text-[#B5361A]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#5C5A54]" />
                  <span className="hidden md:inline text-[11px]">Copy Email</span>
                </>
              )}
            </button>

            {/* LinkedIn Quick Link */}
            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-[#1A1A18] text-[#F6F3EC] hover:bg-[#1A1A18]/90 transition-all font-mono min-h-[44px] border border-[#1A1A18]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="lg:hidden min-h-[44px] min-w-[44px] p-2 text-[#1A1A18] border border-[#D9D4C7] bg-[#F6F3EC] hover:border-[#1A1A18] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#B5361A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden bg-[#F6F3EC] border-b border-[#D9D4C7] px-4 py-3 space-y-1 font-mono w-full"
          >
            <div className="flex flex-col space-y-1 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileNavClick}
                  className="flex items-center gap-3 px-3 min-h-[44px] text-[#1A1A18] hover:bg-[#D9D4C7]/30 transition-colors focus-visible:ring-2 focus-visible:ring-[#B5361A]"
                >
                  <span className="text-xs text-[#5C5A54] font-semibold">{link.index} ·</span>
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}

              {hasResumePdf && (
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMobileNavClick}
                  className="flex items-center gap-3 px-3 min-h-[44px] text-[#B5361A] hover:bg-[#D9D4C7]/30 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#B5361A]" />
                  <span className="font-semibold">Resume (PDF)</span>
                </a>
              )}

              <div className="pt-2 border-t border-[#D9D4C7] flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleCopyEmail();
                    handleMobileNavClick();
                  }}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] text-xs text-[#1A1A18] hover:border-[#1A1A18] transition-colors"
                >
                  <Copy className="w-4 h-4 text-[#5C5A54]" />
                  <span>Copy Direct Email</span>
                </button>
                <a
                  href={portfolioData.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full min-h-[44px] py-2.5 bg-[#1A1A18] text-[#F6F3EC] text-xs font-medium hover:bg-[#1A1A18]/90 transition-colors"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
