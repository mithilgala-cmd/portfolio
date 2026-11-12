"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Coding", href: "#coding" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Skills", href: "#skills" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-lg shadow-black/20" : "bg-background/80 backdrop-blur-md py-4 border-b border-borderDark/60"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand mark */}
        <Link
          href="#"
          className="flex items-center gap-1.5 font-bold text-lg sm:text-xl tracking-tight text-slate-100 hover:text-cyanAccent transition-colors"
        >
          <span>{portfolioData.name}</span>
          <span className="text-cyanAccent">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyanAccent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-md bg-cyanAccent text-[#070b14] hover:bg-cyan-400 transition-all transform hover:-translate-y-0.5 shadow-sm shadow-cyanAccent/20"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded bg-cyanAccent text-[#070b14]"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-borderDark px-6 py-5 mt-3 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-base font-medium text-slate-200 hover:text-cyanAccent transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-borderDark/60">
              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="inline-flex items-center justify-center gap-2 w-full text-sm font-semibold px-4 py-2.5 rounded-lg bg-cyanAccent text-[#070b14] hover:bg-cyan-400 transition-colors"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

