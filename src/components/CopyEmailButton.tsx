"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyEmailButtonProps {
  email?: string;
  variant?: "hero" | "contact" | "navbar";
  className?: string;
}

export default function CopyEmailButton({
  email = "mithil.gala@gmail.com",
  variant = "hero",
  className = "",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "navbar") {
    return (
      <button
        onClick={handleCopy}
        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all border min-h-[44px] min-w-[44px] ${
          copied
            ? "border-[#B5361A] text-[#B5361A] bg-[#F6F3EC]"
            : "bg-[#F6F3EC] border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18]"
        } ${className}`}
        title={`Copy ${email}`}
        aria-label={`Copy email address ${email}`}
      >
        {copied ? (
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
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs transition-all border min-h-[44px] ${
        copied
          ? "border-[#B5361A] text-[#B5361A] bg-[#F6F3EC]"
          : "bg-[#F6F3EC] border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18]"
      } ${className}`}
      aria-label={`Copy email address ${email}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[#B5361A]" />
          <span>{email} copied</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-[#5C5A54]" />
          <span>Copy Email</span>
        </>
      )}
    </button>
  );
}
