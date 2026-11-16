"use client";

import React, { useState } from "react";
import { RotateCcw, AlertTriangle, Zap, Lock } from "lucide-react";

interface NodeState {
  id: number;
  name: string;
  role: string;
  alive: boolean;
  hasLock: boolean;
}

export default function ConsensusSimulator() {
  const [nodes, setNodes] = useState<NodeState[]>([
    { id: 101, name: "Node A", role: "Solar Gen", alive: true, hasLock: false },
    { id: 102, name: "Node B", role: "Wind Turbine", alive: true, hasLock: false },
    { id: 103, name: "Node C", role: "Battery Storage", alive: true, hasLock: false },
    { id: 104, name: "Node D", role: "Grid Intertie", alive: true, hasLock: false },
  ]);

  const [leaderId, setLeaderId] = useState<number>(104);
  const [log, setLog] = useState<string[]>(["[INIT] Cluster stable. Coordinator is Node D (ID: 104)"]);
  const [isElecting, setIsElecting] = useState<boolean>(false);
  const [isRequestingLock, setIsRequestingLock] = useState<boolean>(false);

  const toggleNodeFailure = (id: number) => {
    setNodes((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, alive: !n.alive, hasLock: false } : n));
      const target = prev.find((n) => n.id === id);
      const willBeAlive = target ? !target.alive : false;

      if (!willBeAlive) {
        addLog(`[FAIL] Node ${id} experienced network partition / outage`);
        if (id === leaderId) {
          triggerBullyElection(updated);
        }
      } else {
        addLog(`[RECOVER] Node ${id} rejoined cluster via gossip announcement`);
        // If revived node has higher ID than current leader, trigger election
        if (id > leaderId) {
          triggerBullyElection(updated);
        }
      }
      return updated;
    });
  };

  const triggerBullyElection = (currentNodes: NodeState[]) => {
    setIsElecting(true);
    addLog("[BULLY] Coordinator failed! Starting Bully election sequence...");

    setTimeout(() => {
      const aliveNodes = currentNodes.filter((n) => n.alive);
      if (aliveNodes.length === 0) {
        setLeaderId(0);
        addLog("[CRITICAL] All nodes partitioned. Cluster offline.");
        setIsElecting(false);
        return;
      }

      const newLeader = aliveNodes.reduce((max, node) => (node.id > max.id ? node : max), aliveNodes[0]);
      setLeaderId(newLeader.id);
      addLog(`[BULLY] Highest active ID won: Node ${newLeader.name} (ID: ${newLeader.id}) elected Coordinator.`);
      setIsElecting(false);
    }, 450);
  };

  const requestMutualExclusionLock = () => {
    if (isRequestingLock) return;
    const aliveNodes = nodes.filter((n) => n.alive);
    if (aliveNodes.length === 0) return;

    setIsRequestingLock(true);
    const requester = aliveNodes[0];
    const timestamp = Math.floor(Date.now() % 10000);

    addLog(`[RICART-AGRAWALA] ${requester.name} requested Bus Lock (TS=${timestamp})`);

    setTimeout(() => {
      const acks = aliveNodes.length - 1;
      addLog(`[RICART-AGRAWALA] Received ${acks}/${acks} peer ACKs → Lock GRANTED to ${requester.name}`);
      setNodes((prev) =>
        prev.map((n) => (n.id === requester.id ? { ...n, hasLock: true } : { ...n, hasLock: false }))
      );

      setTimeout(() => {
        addLog(`[RICART-AGRAWALA] ${requester.name} released Lock → State gossip propagated`);
        setNodes((prev) => prev.map((n) => ({ ...n, hasLock: false })));
        setIsRequestingLock(false);
      }, 900);
    }, 450);
  };

  const resetCluster = () => {
    setNodes([
      { id: 101, name: "Node A", role: "Solar Gen", alive: true, hasLock: false },
      { id: 102, name: "Node B", role: "Wind Turbine", alive: true, hasLock: false },
      { id: 103, name: "Node C", role: "Battery Storage", alive: true, hasLock: false },
      { id: 104, name: "Node D", role: "Grid Intertie", alive: true, hasLock: false },
    ]);
    setLeaderId(104);
    setIsElecting(false);
    setIsRequestingLock(false);
    setLog(["[RESET] Cluster re-synchronized to initial state (Coordinator: Node 104)"]);
  };

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev.slice(0, 4)]);
  };

  return (
    <div className="bg-[#06080c] p-4 rounded-xl border border-white/10 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wide">
            Mini Cluster Consensus Simulator
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={resetCluster}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Reset Cluster"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cluster Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {nodes.map((node) => {
          const isLeader = node.id === leaderId && node.alive;
          return (
            <button
              key={node.id}
              onClick={() => toggleNodeFailure(node.id)}
              className={`p-2 rounded-lg border text-left transition-all relative ${
                !node.alive
                  ? "bg-red-950/20 border-red-500/30 text-red-400"
                  : isLeader
                  ? "bg-cyan-950/30 border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.15)]"
                  : "bg-[#0b0f17] border-white/10 text-slate-300 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-500">ID: {node.id}</span>
                {node.hasLock && (
                  <span className="flex items-center gap-0.5 text-[9px] text-amber-400 font-bold bg-amber-950/40 px-1 rounded border border-amber-500/40">
                    <Lock className="w-2.5 h-2.5" /> LOCK
                  </span>
                )}
                {isLeader && (
                  <span className="text-[9px] text-cyan-400 font-bold bg-cyan-950/60 px-1 rounded border border-cyan-500/40">
                    LEADER
                  </span>
                )}
              </div>
              <div className="font-semibold text-xs text-white truncate">{node.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{node.role}</div>
              <div className="mt-1 text-[9px]">
                {node.alive ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    FAIL / OFFLINE
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={requestMutualExclusionLock}
          disabled={isRequestingLock || nodes.filter((n) => n.alive).length === 0}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white transition-colors disabled:opacity-40"
        >
          <Lock className="w-3 h-3 text-amber-400" />
          <span>Request Ricart–Agrawala Lock</span>
        </button>

        <button
          onClick={() => {
            const coordinator = nodes.find((n) => n.id === leaderId);
            if (coordinator && coordinator.alive) {
              toggleNodeFailure(coordinator.id);
            }
          }}
          disabled={leaderId === 0 || isElecting}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 transition-colors disabled:opacity-40"
        >
          <AlertTriangle className="w-3 h-3 text-red-400" />
          <span>Simulate Coordinator Outage</span>
        </button>
      </div>

      {/* Real-Time Consensus Log Terminal */}
      <div className="bg-[#030508] p-2.5 rounded-lg border border-white/5 space-y-1 text-[11px] font-mono">
        <div className="text-[10px] text-slate-500 flex items-center justify-between pb-1 border-b border-white/5">
          <span>CONSENSUS_LOG // REALTIME_DISPATCH</span>
          {isElecting && <span className="text-cyan-400 animate-pulse">ELECTION_IN_PROGRESS</span>}
        </div>
        {log.map((entry, idx) => (
          <div
            key={idx}
            className={`truncate ${
              idx === 0
                ? entry.includes("FAIL") || entry.includes("CRITICAL")
                  ? "text-red-400 font-semibold"
                  : entry.includes("BULLY")
                  ? "text-cyan-300 font-semibold"
                  : entry.includes("RICART")
                  ? "text-amber-300 font-semibold"
                  : "text-slate-200"
                : "text-slate-500"
            }`}
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}
