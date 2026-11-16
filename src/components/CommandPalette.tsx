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

  // Focus restoration
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
        title: "01 // Projects",
        description: "Featured engineering systems & open-source repositories",
        icon: <Hash className="w-4 h-4 text-cyan-400" />,
        action: () => navigateTo("#projects"),
      },
      {
        id: "sec-experience",
        category: "Sections",
        title: "02 // Experience",
        description: "Web infrastructure maintenance & technical training",
        icon: <Hash className="w-4 h-4 text-cyan-400" />,
        action: () => navigateTo("#experience"),
      },
      {
        id: "sec-skills",
        category: "Sections",
        title: "03 // Skills",
        description: "Languages, frameworks, databases & cloud infrastructure",
        icon: <Hash className="w-4 h-4 text-cyan-400" />,
        action: () => navigateTo("#skills"),
      },
      {
        id: "sec-leadership",
        category: "Sections",
        title: "04 // Leadership",
        description: "Executive operations, university conclaves & achievements",
        icon: <Hash className="w-4 h-4 text-cyan-400" />,
        action: () => navigateTo("#leadership"),
      },
      {
        id: "sec-credentials",
        category: "Sections",
        title: "05 // Certifications",
        description: "Licenses & certifications (Anthropic, AWS, etc.)",
        icon: <Hash className="w-4 h-4 text-cyan-400" />,
        action: () => navigateTo("#certifications"),
      },
      {
        id: "sec-contact",
        category: "Sections",
        title: "06 // Contact",
        description: "Direct email and professional communication channels",
        icon: <Hash className="w-4 h-4 text-cyan-400" />,
        action: () => navigateTo("#contact"),
      },
      {
        id: "act-copy-email",
        category: "Actions",
        title: copied ? "Email Copied!" : "Copy Direct Email",
        description: "mithil.gala@gmail.com",
        icon: copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4 text-cyan-400" />
        ),
        action: copyEmail,
      },
      {
        id: "act-github",
        category: "Actions",
        title: "GitHub Profile",
        description: "github.com/mithilgala-cmd",
        icon: <Github className="w-4 h-4 text-slate-300" />,
        action: () => openUrl("https://github.com/mithilgala-cmd"),
      },
      {
        id: "act-leetcode",
        category: "Actions",
        title: "LeetCode Profile",
        description: "leetcode.com/u/Mithilgala (630+ Solved)",
        icon: <Code2 className="w-4 h-4 text-amber-400" />,
        action: () => openUrl("https://leetcode.com/u/Mithilgala"),
      },
      {
        id: "act-linkedin",
        category: "Actions",
        title: "LinkedIn Profile",
        description: "linkedin.com/in/mithilgala",
        icon: <Linkedin className="w-4 h-4 text-sky-400" />,
        action: () => openUrl("https://www.linkedin.com/in/mithilgala"),
      },
      {
        id: "repo-infrapulse",
        category: "Repositories",
        title: "infrapulse",
        description: "Java Linux infrastructure monitoring & automated diagnostics",
        icon: <Terminal className="w-4 h-4 text-emerald-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/infrapulse"),
      },
      {
        id: "repo-agent-system",
        category: "Repositories",
        title: "agent-orchestration-system",
        description: "Autonomous multi-agent execution loop with tool calling",
        icon: <Terminal className="w-4 h-4 text-cyan-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/agent-orchestration-system"),
      },
      {
        id: "repo-smart-gateway",
        category: "Repositories",
        title: "smart-gateway-mcp",
        description: "Redis token-bucket rate limiter & MCP server",
        icon: <Terminal className="w-4 h-4 text-purple-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/smart-gateway-mcp"),
      },
      {
        id: "repo-chargewise",
        category: "Repositories",
        title: "ChargeWise_EdgeAI",
        description: "Intelligent EV Charging & Battery Optimization (Tata InnoVent-27)",
        icon: <Terminal className="w-4 h-4 text-emerald-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/ChargeWise_EdgeAI"),
      },
      {
        id: "repo-crop-weather",
        category: "Repositories",
        title: "crop-weather-pipeline",
        description: "Airflow, dbt, DuckDB & Streamlit data engineering pipeline",
        icon: <Terminal className="w-4 h-4 text-amber-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/crop-weather-pipeline"),
      },
      {
        id: "repo-mern",
        category: "Repositories",
        title: "mern-student-management-system",
        description: "Production full-stack student management architecture",
        icon: <Terminal className="w-4 h-4 text-blue-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/mern-student-management-system"),
      },
      {
        id: "repo-leetcode-java",
        category: "Repositories",
        title: "leetcode-java",
        description: "Structured Java algorithmic patterns (Top 0.8% ranking)",
        icon: <Terminal className="w-4 h-4 text-amber-400" />,
        action: () => openUrl("https://github.com/mithilgala-cmd/leetcode-java"),
      },
    ],
    [copied, copyEmail, navigateTo, openUrl]
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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
      } else if (e.key === "Tab") {
        // Focus trap: keep focus within the dialog
        e.preventDefault();
        inputRef.current?.focus();
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl rounded-xl bg-[#0b0f17] border border-white/10 shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#06080c]/60">
          <Search className="w-4 h-4 text-slate-400" />
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
            placeholder="Type a command, section, or repository..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          id="command-list"
          role="listbox"
          aria-label="Commands and options"
          className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5"
        >
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 font-mono">
              No matching commands found.
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-cyan-500/10 text-white" : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected ? "bg-cyan-500/20" : "bg-white/5"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-100">{item.title}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          [{item.category}]
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono flex-shrink-0 ml-2">
                    {item.category === "Repositories" || item.id.startsWith("act-") ? (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${
                          isSelected ? "text-cyan-400 translate-x-0.5" : "text-slate-400"
                        } transition-transform`}
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-white/10 bg-[#06080c]/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400">mithilgala.is-a.dev</span>
        </div>
      </div>
    </div>
  );
}
