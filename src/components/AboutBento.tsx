"use client";

import React from "react";
import {
  Server,
  GraduationCap,
  Trophy,
  Activity,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function AboutBento() {
  return (
    <section id="engineering" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Monospace Index */}
      <div className="section-index mb-8">
        <span>03 // ABOUT & ENGINEERING</span>
        <span className="text-slate-400 font-normal">Foundations, Production & Discipline</span>
      </div>

      {/* 4-Tile Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Tile 1: Production Web Maintenance (7 cols) */}
        <SpotlightCard className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <Server className="w-4 h-4" />
                <span>FINANCIAL_INFRASTRUCTURE // PRODUCTION</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE_DEPLOYMENT
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 font-sans">
              Production Web Maintenance & Financial Backend Reliability
            </h3>
            <p className="font-mono text-xs text-cyan-400 mb-3">
              Minolta Finance Ltd. (RBI-Registered NBFC)
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Responsible for maintaining legacy PHP backend scripts, DNS configuration, SSL
              certificates, and public regulatory disclosure portals in adherence to non-banking
              statutory compliance requirements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-2">
              <div className="bg-[#06080c] p-2.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block mb-0.5">CORE_SCOPE</span>
                <span className="text-slate-200">PHP scripts, DNS, SSL & regulatory portals</span>
              </div>
              <div className="bg-[#06080c] p-2.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block mb-0.5">COMPLIANCE</span>
                <span className="text-slate-200">RBI disclosure standards & updates</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span>Maintenance: Legacy PHP & Web</span>
            <span className="text-slate-300 font-medium">Statutory Disclosures</span>
          </div>
        </SpotlightCard>

        {/* Tile 2: Academic & Systems Focus (5 cols) */}
        <SpotlightCard className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC_FOUNDATION</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                CLASS OF &apos;27
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 font-sans">
              B.Tech in Computer Engineering
            </h3>
            <p className="font-mono text-xs text-indigo-300 mb-3">
              MPSTME, NMIMS Mumbai
            </p>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Coursework and engineering foundations spanning Operating Systems, Computer Networks,
              Database Systems, and Distributed Computing, supplemented by a 5-day (~30-hour) hands-on
              training program in Agentic AI conducted by visiting faculty from Japan.
            </p>

            <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Distributed Systems & Consensus Protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Agentic AI & Tool Integration (5-Day Program, Japan Faculty)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Cloud Architecting (AWS Academy Graduate)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-slate-500 flex justify-between">
            <span>Location: Mumbai, India</span>
            <span className="text-slate-400">Graduation: 2027</span>
          </div>
        </SpotlightCard>

        {/* Tile 3: Algorithmic Consistency (5 cols) */}
        <SpotlightCard className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                <Trophy className="w-4 h-4" />
                <span>ALGORITHMIC_DISCIPLINE</span>
              </div>
              <span className="font-mono text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                BEATS 99.21% JAVA
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 font-sans">
              630+ LeetCode Solutions & Pattern Mastery
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Systematic problem-solving across Graph Algorithms, Dynamic Programming, Binary Trees,
              and Concurrency. Maintained an unbroken 141-day daily solving streak with an 85.93%
              acceptance rate.
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[11px] mb-2">
              <div className="bg-[#06080c] p-2 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block">TOTAL SOLVED</span>
                <span className="text-lg font-bold text-white">630+</span>
              </div>
              <div className="bg-[#06080c] p-2 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block">MAX STREAK</span>
                <span className="text-lg font-bold text-orange-400">141 Days</span>
              </div>
              <div className="bg-[#06080c] p-2 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block">ACCEPTANCE</span>
                <span className="text-sm font-bold text-emerald-400">85.93%</span>
              </div>
              <div className="bg-[#06080c] p-2 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block">JAVA RANKING</span>
                <span className="text-sm font-bold text-cyan-400">Top 0.8%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Profile: @Mithilgala</span>
            <a
              href="https://leetcode.com/u/Mithilgala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View LeetCode Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </SpotlightCard>

        {/* Tile 4: Endurance & Discipline (7 cols) */}
        <SpotlightCard className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                <Activity className="w-4 h-4" />
                <span>ENDURANCE_&_LEADERSHIP</span>
              </div>
              <span className="font-mono text-[10px] text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                21.1 KM HALF-MARATHON
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 font-sans">
              Endurance Running & Campus-Scale Operations
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Physical endurance and operational leadership run parallel to software engineering.
              Actively training for timed 21.1 km half-marathons in Mumbai, balancing rigorous daily
              mileage with executive responsibility: budgeting, vendor logistics, and emergency
              protocols for university events hosting 500+ attendees.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#06080c] p-2.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block mb-0.5">DISTANCE MILESTONE</span>
                <span className="text-slate-200">21.097 km (Timed Half-Marathon Regimen)</span>
              </div>
              <div className="bg-[#06080c] p-2.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-500 block mb-0.5">OPERATIONAL SCALE</span>
                <span className="text-slate-200">Ex-VP Operations (4C) & Sattva Conclaves</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span>Regimen: Consistency & Stamina</span>
            <span className="text-cyan-400">Mental Fortitude</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
