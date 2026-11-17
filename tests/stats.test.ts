import test from "node:test";
import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fetchStatsWithFetcher, updateStatsFile } from "../scripts/update-stats.mjs";

test("Stats Pipeline - Successful fetch returns validated stats numbers", async () => {
  const mockFetcher: typeof fetch = async (input, init) => {
    const url = input.toString();

    if (url.includes("api.github.com")) {
      return new Response(JSON.stringify({ public_repos: 18 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("leetcode.com")) {
      return new Response(
        JSON.stringify({
          data: {
            matchedUser: {
              submitStats: {
                acSubmissionNum: [
                  { difficulty: "All", count: 650 },
                  { difficulty: "Easy", count: 315 },
                  { difficulty: "Medium", count: 255 },
                  { difficulty: "Hard", count: 80 },
                ],
              },
            },
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response("Not Found", { status: 404 });
  };

  const { ghResult, lcResult } = await fetchStatsWithFetcher(mockFetcher);

  assert.strictEqual(ghResult.publicRepos, 18);
  assert.strictEqual(lcResult.totalSolved, 650);
  assert.strictEqual(lcResult.easy, 315);
  assert.strictEqual(lcResult.medium, 255);
  assert.strictEqual(lcResult.hard, 80);
});

test("Stats Pipeline - Upstream timeout leaves committed file untouched and returns false", async () => {
  const mockTimeoutFetcher: typeof fetch = async () => {
    throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
  };

  const statsFilePath = path.resolve(process.cwd(), "src/data/stats.json");
  const beforeContent = await fs.readFile(statsFilePath, "utf-8");

  const success = await updateStatsFile(mockTimeoutFetcher);

  assert.strictEqual(success, false);
  const afterContent = await fs.readFile(statsFilePath, "utf-8");
  assert.strictEqual(beforeContent, afterContent);
});

test("Stats Pipeline - src/data/stats.json conforms to expected schema", async () => {
  const statsFilePath = path.resolve(process.cwd(), "src/data/stats.json");
  const raw = await fs.readFile(statsFilePath, "utf-8");
  const data = JSON.parse(raw);

  assert.ok(data.leetcode, "Missing leetcode object");
  assert.ok(typeof data.leetcode.totalSolved === "number");
  assert.ok(typeof data.leetcode.easy === "number");
  assert.ok(typeof data.leetcode.medium === "number");
  assert.ok(typeof data.leetcode.hard === "number");
  assert.ok(typeof data.leetcode.acceptanceRate === "string");
  assert.ok(typeof data.leetcode.maxStreak === "string");
  assert.ok(typeof data.leetcode.rankingHighlight === "string");

  assert.ok(data.github, "Missing github object");
  assert.ok(typeof data.github.publicRepos === "number");
  assert.ok(data.github.publicRepos > 0);
});
