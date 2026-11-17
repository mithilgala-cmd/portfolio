"use client";

import React from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  ...props
}: SpotlightCardProps) {
  return (
    <div
      className={`border border-[#D9D4C7] bg-[#F6F3EC] p-6 transition-all duration-150 hover:border-[#1A1A18] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
