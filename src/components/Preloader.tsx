"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Terminal, CheckCircle2, ChevronRight } from "lucide-react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const finishBoot = useCallback(() => {
    sessionStorage.setItem("mg_boot_v2", "true");
    setVisible(false);
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Check if already booted in this session
    const hasBooted = sessionStorage.getItem("mg_boot_v2");
    if (hasBooted) {
      if (onComplete) onComplete();
      return;
    }

    setVisible(true);

    // Boot sequence timer: fast (~1.1s total)
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), 500);
    const t3 = setTimeout(() => setStep(3), 850);
    const t4 = setTimeout(() => finishBoot(), 1150);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishBoot();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishBoot, onComplete]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="System Boot Sequence"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06080c] px-4 font-mono select-none"
    >
      <div className="w-full max-w-lg p-6 rounded-lg bg-[#0b0f17] border border-white/10 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wider">SYSTEM_INIT // CORE_V2</span>
          </div>
          <button
            onClick={finishBoot}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded border border-white/10 hover:border-cyan-400/50 transition-colors"
          >
            Skip [ESC]
          </button>
        </div>

        {/* Boot Sequence Lines */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="font-medium text-white">BOOT // mithilgala.is-a.dev v2.0</span>
          </div>

          <div
            className={`flex items-center justify-between text-slate-300 transition-opacity duration-200 ${
              step >= 1 ? "opacity-100" : "opacity-20"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-slate-500">INIT //</span>
              <span>fullstack-cloud & agent-runtime</span>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              {step >= 1 ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>[OK]</span>
                </>
              ) : (
                <span className="text-slate-600">...</span>
              )}
            </span>
          </div>

          <div
            className={`flex items-center justify-between text-slate-300 transition-opacity duration-200 ${
              step >= 2 ? "opacity-100" : "opacity-20"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-slate-500">SYNC //</span>
              <span>github(@mithilgala-cmd) & leetcode(@Mithilgala)</span>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              {step >= 2 ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>[OK]</span>
                </>
              ) : (
                <span className="text-slate-600">...</span>
              )}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
            <span>STARTUP_SEQUENCE</span>
            <span className="text-cyan-400">{Math.min(100, progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
