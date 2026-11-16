"use client";

import React, { useState } from "react";
import { Cpu, ArrowRight, ShieldCheck, Play, RefreshCw } from "lucide-react";

type Stage = "Plan" | "Act" | "Evaluate" | "Iterate" | "Goal";

interface StageData {
  title: string;
  role: string;
  state: string;
  guardrail: string;
  schemaSnippet: string;
}

export default function AgentLoopInspector() {
  const [activeStage, setActiveStage] = useState<Stage>("Plan");
  const [isSimulating, setIsSimulating] = useState(false);

  const stageDetails: Record<Stage, StageData> = {
    Plan: {
      title: "Plan // Task Decomposition & Graph Route",
      role: "Orchestrator Agent (Python StateGraph)",
      state: "DISPATCHING_GRAPH (Subtasks: 3, Priority: P0)",
      guardrail: "Max plan depth <= 4, circular dependency validation check",
      schemaSnippet: JSON.stringify(
        {
          stage: "PLAN",
          intent: "optimize_energy_distribution",
          subagents: ["weather_telemetry_agent", "battery_load_balancer"],
          execution_order: ["STEP_FETCH_WEATHER", "STEP_COMPUTE_DISPATCH"],
        },
        null,
        2
      ),
    },
    Act: {
      title: "Act // Schema Tool Calling & Execution",
      role: "Worker Agent (LangChain Tool Node)",
      state: "INVOKING_MCP_TOOL (mcp://gateway/telemetry/forecast)",
      guardrail: "Strict Pydantic schema validation, timeout ceiling: 1500ms",
      schemaSnippet: JSON.stringify(
        {
          stage: "ACT",
          tool_call: "get_solar_irradiance",
          parameters: { coordinates: [19.076, 72.877], horizon_hrs: 6 },
          status: "SUCCESS_200",
        },
        null,
        2
      ),
    },
    Evaluate: {
      title: "Evaluate // Objective Convergence Check",
      role: "Evaluator Agent (Verification Guardrail)",
      state: "SCORE_CALCULATION (Tolerance delta: 0.04 < threshold: 0.05)",
      guardrail: "Automated regression rejection & hallucination check",
      schemaSnippet: JSON.stringify(
        {
          stage: "EVALUATE",
          criteria_satisfied: true,
          convergence_score: 0.96,
          action: "CONTINUE_TO_GOAL",
        },
        null,
        2
      ),
    },
    Iterate: {
      title: "Iterate // Error Recovery & Re-prompting",
      role: "Correction Loop Agent",
      state: "RETRY_DISPATCH (Attempt: 1/3 with updated context)",
      guardrail: "Exponential backoff with memory rollback on schema drift",
      schemaSnippet: JSON.stringify(
        {
          stage: "ITERATE",
          previous_error: null,
          adjusted_parameters: { backoff_ms: 300, retry_ceiling: 3 },
          state_checkpoint: "chk_08f92a",
        },
        null,
        2
      ),
    },
    Goal: {
      title: "Goal // Output Delivery & Artifact Generation",
      role: "Synthesis Node (Human-in-the-Loop Gate)",
      state: "COMPLETED (Artifact verified, final state persisted)",
      guardrail: "Audit log immutability check and cryptographic hash seal",
      schemaSnippet: JSON.stringify(
        {
          stage: "GOAL",
          status: "FINAL_OBJECTIVE_MET",
          execution_time_ms: 412,
          audit_hash: "sha256:8f3c...b91a",
        },
        null,
        2
      ),
    },
  };

  const stages: Stage[] = ["Plan", "Act", "Evaluate", "Iterate", "Goal"];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index >= stages.length) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStage(stages[index]);
      }
    }, 450);
  };

  const current = stageDetails[activeStage];

  return (
    <div className="bg-[#06080c] p-4 rounded-xl border border-white/10 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wide">
            Execution Loop Inspector
          </span>
        </div>
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/40 text-slate-300 hover:text-white transition-colors text-[11px] disabled:opacity-40"
        >
          {isSimulating ? (
            <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
          ) : (
            <Play className="w-3 h-3 text-indigo-400" />
          )}
          <span>{isSimulating ? "Stepping..." : "Step Loop"}</span>
        </button>
      </div>

      {/* Interactive Stage Pipeline Breadcrumbs */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {stages.map((st, i) => {
          const isActive = st === activeStage;
          return (
            <React.Fragment key={st}>
              <button
                onClick={() => setActiveStage(st)}
                className={`px-2.5 py-1.5 rounded-lg border text-left transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  isActive
                    ? "bg-indigo-950/40 border-indigo-500/60 text-indigo-200 shadow-[0_0_8px_rgba(99,102,241,0.25)] font-bold"
                    : "bg-[#0b0f17] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] text-slate-500">0{i + 1}</span>
                <span>{st}</span>
              </button>
              {i < stages.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Inspector Detail Box */}
      <div className="bg-[#0b0f17] p-3 rounded-lg border border-white/10 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/5">
          <span className="font-bold text-slate-200">{current.title}</span>
          <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/40">
            {current.role}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="bg-[#030508] p-2 rounded border border-white/5">
            <span className="text-[10px] text-slate-500 block mb-0.5">CURRENT_STATE</span>
            <span className="text-slate-300 truncate block">{current.state}</span>
          </div>
          <div className="bg-[#030508] p-2 rounded border border-white/5">
            <span className="text-[10px] text-slate-500 block mb-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              GUARDRAIL_ASSERTION
            </span>
            <span className="text-slate-300 truncate block">{current.guardrail}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 block mb-1">
            JSON SCHEMA & TOOL PAYLOAD
          </span>
          <pre className="p-2 rounded bg-[#030508] border border-white/5 text-[10px] text-cyan-300/90 overflow-x-auto leading-relaxed">
            {current.schemaSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
