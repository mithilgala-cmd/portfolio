#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATS_FILE = path.resolve(__dirname, "../src/data/stats.json");

const GITHUB_USERNAME = "mithilgala-cmd";
const LEETCODE_USERNAME = "Mithilgala";
const TIMEOUT_MS = 5000;

export async function fetchStatsWithFetcher(fetcher = fetch) {
  const headers = {
    "User-Agent": "mithilgala-portfolio-stats-updater/1.0",
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // 1. Fetch GitHub
  const ghPromise = fetcher(`https://api.github.com/users/${GITHUB_USERNAME}`, {
    headers,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).then(async (res) => {
    if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
    const json = await res.json();
    if (typeof json.public_repos !== "number") {
      throw new Error("Invalid GitHub response payload");
    }
    return { publicRepos: json.public_repos };
  });

  // 2. Fetch LeetCode
  const lcQuery = `
    query userPublicStats($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const lcPromise = fetcher("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "mithilgala-portfolio-stats-updater/1.0",
    },
    body: JSON.stringify({
      query: lcQuery,
      variables: { username: LEETCODE_USERNAME },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).then(async (res) => {
    if (!res.ok) throw new Error(`LeetCode responded with ${res.status}`);
    const json = await res.json();
    const acSubmissions = json?.data?.matchedUser?.submitStats?.acSubmissionNum;
    if (!Array.isArray(acSubmissions)) {
      throw new Error("Invalid LeetCode response payload");
    }

    const all = acSubmissions.find((s) => s.difficulty === "All")?.count;
    const easy = acSubmissions.find((s) => s.difficulty === "Easy")?.count;
    const medium = acSubmissions.find((s) => s.difficulty === "Medium")?.count;
    const hard = acSubmissions.find((s) => s.difficulty === "Hard")?.count;

    if (typeof all !== "number") throw new Error("Missing LeetCode total count");

    return {
      totalSolved: all,
      easy: typeof easy === "number" ? easy : 308,
      medium: typeof medium === "number" ? medium : 245,
      hard: typeof hard === "number" ? hard : 77,
    };
  });

  const [ghResult, lcResult] = await Promise.all([ghPromise, lcPromise]);
  return { ghResult, lcResult };
}

export async function updateStatsFile(fetcher = fetch) {
  try {
    const existingRaw = await fs.readFile(STATS_FILE, "utf-8");
    const existing = JSON.parse(existingRaw);

    const { ghResult, lcResult } = await fetchStatsWithFetcher(fetcher);

    const updated = {
      leetcode: {
        totalSolved: lcResult.totalSolved,
        easy: lcResult.easy,
        medium: lcResult.medium,
        hard: lcResult.hard,
        acceptanceRate: existing.leetcode?.acceptanceRate || "85.93%",
        maxStreak: existing.leetcode?.maxStreak || "141-day max streak",
        rankingHighlight: existing.leetcode?.rankingHighlight || "Top 0.8% / Beats 99.21% in Java",
      },
      github: {
        publicRepos: ghResult.publicRepos,
      },
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(STATS_FILE, JSON.stringify(updated, null, 2) + "\n", "utf-8");
    console.log(`[stats-update] Successfully updated ${STATS_FILE}: ${updated.leetcode.totalSolved} LC solved, ${updated.github.publicRepos} GH repos.`);
    return true;
  } catch (err) {
    console.warn(`[stats-update] Warning: Could not update stats. Retaining committed baseline unchanged. Reason: ${err?.message || err}`);
    return false;
  }
}

// Direct execution guard
const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  updateStatsFile()
    .then(() => {
      // Always exit 0 as specified by requirements
      process.exit(0);
    })
    .catch((err) => {
      console.warn(`[stats-update] Warning: Unexpected error in updater. Exiting 0 per spec:`, err);
      process.exit(0);
    });
}
