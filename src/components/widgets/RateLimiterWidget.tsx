"use client";

import React, { useState, useEffect } from "react";
import { Server, Activity, Database, RefreshCw, Zap } from "lucide-react";

export default function RateLimiterWidget() {
  const MAX_TOKENS = 5;
  const [tokens, setTokens] = useState<number>(5);
  const [lastStatus, setLastStatus] = useState<number>(200);
  const [cacheStatus, setCacheStatus] = useState<"HIT" | "MISS">("HIT");
  const [lastRoute, setLastRoute] = useState<string>("mcp://gateway/tools/db_query");
  const [requestCount, setRequestCount] = useState<number>(0);

  // Token refill: 1 token every 3.5 seconds up to MAX_TOKENS
  useEffect(() => {
    const timer = setInterval(() => {
      setTokens((prev) => (prev < MAX_TOKENS ? prev + 1 : prev));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const dispatchRequest = (count: number = 1) => {
    if (tokens >= count) {
      setTokens((prev) => prev - count);
      setLastStatus(200);
      setCacheStatus(Math.random() > 0.4 ? "HIT" : "MISS");
      const routes = [
        "mcp://gateway/tools/db_query",
        "mcp://gateway/tools/verify_jwt",
        "mcp://gateway/tools/cluster_metrics",
      ];
      setLastRoute(routes[Math.floor(Math.random() * routes.length)]);
      setRequestCount((c) => c + count);
    } else {
      setLastStatus(429);
      setRequestCount((c) => c + count);
    }
  };

  const refillManually = () => {
    setTokens(MAX_TOKENS);
    setLastStatus(200);
  };

  return (
    <div className="bg-[#06080c] p-4 rounded-xl border border-white/10 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wide">
            Token-Bucket Rate Limiter & MCP Flow
          </span>
        </div>
        <button
          onClick={refillManually}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Refill Bucket"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Token Capacity Bar & Bucket Visual */}
      <div className="bg-[#0b0f17] p-3 rounded-lg border border-white/10 mb-3 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Database className="w-3 h-3 text-cyan-400" />
            <span>Redis Token Bucket [Capacity: 5]</span>
          </span>
          <span className="text-cyan-400 font-bold">
            {tokens} / {MAX_TOKENS} AVAILABLE
          </span>
        </div>

        {/* Visual Token Cells */}
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: MAX_TOKENS }).map((_, idx) => {
            const hasToken = idx < tokens;
            return (
              <div
                key={idx}
                className={`h-2.5 rounded transition-all duration-300 ${
                  hasToken
                    ? "bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    : "bg-slate-800 border border-white/5"
                }`}
              />
            );
          })}
        </div>
        <p className="text-[10px] text-slate-500">
          Refill rate: +1 token per 3.5s (Sliding window atomic Redis counter)
        </p>
      </div>

      {/* Action Dispatch Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={() => dispatchRequest(1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-semibold transition-colors"
        >
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>Dispatch Request (1 token)</span>
        </button>

        <button
          onClick={() => dispatchRequest(3)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <Activity className="w-3 h-3 text-purple-400" />
          <span>Burst Request (3 tokens)</span>
        </button>
      </div>

      {/* Response Headers & MCP Route Telemetry */}
      <div className="bg-[#030508] p-2.5 rounded-lg border border-white/5 space-y-1.5 text-[11px]">
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <span className="text-slate-500">HTTP_GATEWAY_RESPONSE</span>
          <span
            className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
              lastStatus === 200
                ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                : "bg-red-950/60 text-red-400 border border-red-500/30"
            }`}
          >
            {lastStatus === 200 ? "HTTP 200 OK" : "HTTP 429 TOO MANY REQUESTS"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] text-slate-400">
          <div>
            <span className="text-slate-500 block">X-RateLimit-Remaining:</span>
            <span className="text-slate-200 font-bold">{tokens}</span>
          </div>
          <div>
            <span className="text-slate-500 block">X-Cache-Status:</span>
            <span
              className={`font-bold ${
                cacheStatus === "HIT" ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {lastStatus === 429 ? "N/A" : cacheStatus}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Total Dispatched:</span>
            <span className="text-slate-200">{requestCount}</span>
          </div>
        </div>

        <div className="pt-1 border-t border-white/5 flex items-center gap-1.5 text-[10px] truncate">
          <span className="text-slate-500">MCP_ROUTER //</span>
          <span className="text-cyan-300 truncate">{lastRoute}</span>
        </div>
      </div>
    </div>
  );
}
