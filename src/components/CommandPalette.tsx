"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Hash,
  Terminal,
  Github,
  Code2,
  Linkedin,
} from "lucide-react";

interface PaletteItem {
  id: string;
  category: "Sections" | "Actions" | "Repositories";
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("mithil.gala@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 800);
  }, [onClose]);

  const navigateTo = useCallback(
    (hash: string) => {
      onClose();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onClose]
  );

  const openUrl = useCallback(
    (url: string) => {
      onClose();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [onClose]
  );

  const items: PaletteItem[] = useMemo(
    () => [
      {
        id: "sec-projects",
        category: "Sections",
        title: "01 — Projects",
        description: "Featured engineering systems & open-source repositories",
        icon: <Hash className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#projects"),
      },
      {
        id: "sec-experience",
        category: "Sections",
        title: "02 — Experience",
        description: "Production web infrastructure maintenance & engineering experience",
        icon: <Hash className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#experience"),
      },
      {
        id: "sec-skills",
        category: "Sections",
        title: "03 — Skills",
        description: "Technical competencies across languages, architecture & cloud",
        icon: <Hash className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#skills"),
      },
      {
        id: "sec-leadership",
        category: "Sections",
        title: "04 — Leadership",
        description: "Campus leadership roles, conclave operations & marathon endurance",
        icon: <Hash className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#leadership"),
      },
      {
        id: "sec-certifications",
        category: "Sections",
        title: "05 — Certifications",
        description: "Verified credentials from Anthropic, AWS, AI CERTs & Udemy",
        icon: <Hash className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#certifications"),
      },
      {
        id: "sec-telemetry",
        category: "Sections",
        title: "06 — Telemetry",
        description: "Live GitHub repositories and verified LeetCode stats breakdown",
        icon: <Terminal className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#telemetry"),
      },
      {
        id: "sec-contact",
        category: "Sections",
        title: "07 — Contact",
        description: "Direct email contact card, LinkedIn and location details",
        icon: <Hash className="w-4 h-4 text-[#5C5A54]" />,
        action: () => navigateTo("#contact"),
      },
      {
        id: "act-copy-email",
        category: "Actions",
        title: copied ? "Email Copied!" : "Copy Email Address",
        description: "Copies mithil.gala@gmail.com directly to clipboard",
        icon: copied ? (
          <Check className="w-4 h-4 text-[#B5361A]" />
        ) : (
          <Copy className="w-4 h-4 text-[#5C5A54]" />
        ),
        action: copyEmail,
      },
      {
        id: "act-github",
        category: "Actions",
        title: "Open GitHub Profile",
        description: "github.com/mithilgala-cmd",
        icon: <Github className="w-4 h-4 text-[#5C5A54]" />,
        action: () => openUrl("https://github.com/mithilgala-cmd"),
      },
      {
        id: "act-leetcode",
        category: "Actions",
        title: "Open LeetCode Profile",
        description: "leetcode.com/u/Mithilgala (630+ Solved)",
        icon: <Code2 className="w-4 h-4 text-[#5C5A54]" />,
        action: () => openUrl("https://leetcode.com/u/Mithilgala"),
      },
      {
        id: "act-linkedin",
        category: "Actions",
        title: "Open LinkedIn Profile",
        description: "linkedin.com/in/mithilgala (4,440+ Followers)",
        icon: <Linkedin className="w-4 h-4 text-[#5C5A54]" />,
        action: () => openUrl("https://www.linkedin.com/in/mithilgala"),
      },
    ],
    [navigateTo, copyEmail, openUrl, copied]
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl bg-[#F6F3EC] border border-[#D9D4C7] shadow-xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#D9D4C7] bg-[#F6F3EC]">
          <Search className="w-4 h-4 text-[#5C5A54]" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={filteredItems[selectedIndex]?.id || undefined}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section, command, or profile..."
            className="flex-1 bg-transparent text-sm text-[#1A1A18] placeholder-[#5C5A54] focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#5C5A54] bg-[#F6F3EC] border border-[#D9D4C7]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          id="command-list"
          role="listbox"
          aria-label="Commands and options"
          className="max-h-80 overflow-y-auto p-2 divide-y divide-[#D9D4C7]"
        >
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#5C5A54] font-mono">
              No matching items found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${
                    isSelected ? "bg-[#D9D4C7]/50 text-[#1A1A18]" : "text-[#5C5A54] hover:bg-[#D9D4C7]/20"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1 border border-[#D9D4C7] bg-[#F6F3EC]">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#1A1A18]">{item.title}</span>
                        <span className="text-[10px] font-mono text-[#5C5A54] uppercase tracking-wider">
                          [{item.category}]
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5C5A54] truncate">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#5C5A54] font-mono shrink-0 ml-2">
                    {item.id.startsWith("act-") ? (
                      <ExternalLink className="w-3.5 h-3.5 text-[#5C5A54]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#5C5A54]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#D9D4C7] bg-[#F6F3EC] flex items-center justify-between text-[11px] text-[#5C5A54] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>mithilgala.is-a.dev</span>
        </div>
      </div>
    </div>
  );
}
