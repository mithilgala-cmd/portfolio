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

  // TODO(mithil): Set to true once public/resume.pdf is provided
  const hasResumePdf = false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key press and restore focus to menu button
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
    { label: "Contact", href: "#contact", index: "06" },
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
            ? "systems-nav py-2.5 shadow-xl shadow-black/40"
            : "bg-[#06080c]/80 backdrop-blur-md py-3.5 border-b border-white/5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Mark with Monospace Tag */}
          <Link
            href="#"
            className="flex items-center gap-2 group text-slate-100 hover:text-white transition-colors"
          >
            {/* Monogram avatar mark (hidden on mobile ≤640px) */}
            <div className="w-7 h-7 rounded border border-white/10 bg-[#0b0f17] hidden sm:flex items-center justify-center font-mono text-xs font-bold text-cyan-400 group-hover:border-cyan-400/50 transition-colors">
              MG
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Mithil Gala
              </span>
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest -mt-0.5">
                Engineering v2.0
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-5 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-cyan-400 transition-colors py-1 flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-cyan-400 rounded min-h-[36px] items-center"
              >
                <span className="text-[10px] text-slate-400">{link.index}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Action CTAs: Command Palette + Copy Email + LinkedIn + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#0b0f17] border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-slate-200 text-xs transition-colors font-mono min-h-[44px]"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-white/5 border border-white/10 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Quick Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all border min-h-[44px] ${
                copiedEmail
                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                  : "bg-[#0b0f17] border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white"
              }`}
              title="Copy mithil.gala@gmail.com"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline text-[11px]">Copy Email</span>
                </>
              )}
            </button>

            {/* LinkedIn Quick Link */}
            <a
              href={portfolioData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-cyan-400 text-[#06080c] hover:bg-cyan-300 transition-all font-mono min-h-[44px] items-center"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Toggle (≤640px) */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="sm:hidden min-h-[44px] min-w-[44px] p-2 rounded-md text-slate-300 hover:text-white border border-white/10 bg-[#0b0f17] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Width Dropdown Drawer (≤640px) */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="sm:hidden systems-nav border-b border-white/10 px-4 py-3 space-y-1 font-mono w-full"
          >
            <div className="flex flex-col space-y-1 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileNavClick}
                  className="flex items-center gap-3 px-3 min-h-[44px] rounded-lg text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span className="text-xs text-cyan-400 font-semibold">{link.index} ·</span>
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}

              {hasResumePdf && (
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMobileNavClick}
                  className="flex items-center gap-3 px-3 min-h-[44px] rounded-lg text-cyan-300 hover:bg-cyan-950/30 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">Resume (PDF)</span>
                </a>
              )}

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleCopyEmail();
                    handleMobileNavClick();
                  }}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>Copy Direct Email</span>
                </button>
                <a
                  href={portfolioData.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full min-h-[44px] py-2.5 rounded-lg bg-cyan-400 text-[#06080c] text-xs font-semibold hover:bg-cyan-300 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette Component */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
