import test from "node:test";
import assert from "node:assert";
import { getStats } from "../src/lib/stats.ts";
import { portfolioData } from "../src/data/portfolio.ts";

test("GET /api/stats - Success path with live upstream APIs", async () => {
  const mockFetcher: typeof fetch = async (input, init) => {
    const url = input.toString();

    if (url.includes("api.github.com")) {
      return new Response(JSON.stringify({ public_repos: 42 }), {
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
                  { difficulty: "All", count: 680 },
                  { difficulty: "Easy", count: 200 },
                  { difficulty: "Medium", count: 400 },
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

  const response = await getStats(mockFetcher);

  assert.strictEqual(response.source, "live");
  assert.strictEqual(response.data.github.source, "live");
  assert.strictEqual(response.data.github.publicRepos, 42);
  assert.strictEqual(response.data.leetcode.source, "live");
  assert.strictEqual(response.data.leetcode.totalSolved, 680);
  assert.strictEqual(response.data.leetcode.easy, 200);
  assert.strictEqual(response.data.leetcode.medium, 400);
  assert.strictEqual(response.data.leetcode.hard, 80);
  assert.ok(response.fetchedAt);
});

test("GET /api/stats - Upstream timeout path triggers fallback", async () => {
  const mockTimeoutFetcher: typeof fetch = async () => {
    throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
  };

  const response = await getStats(mockTimeoutFetcher);

  assert.strictEqual(response.source, "fallback");
  assert.strictEqual(response.data.github.source, "fallback");
  assert.strictEqual(
    response.data.github.publicRepos,
    portfolioData.fallbackStats.github.publicRepos
  );
  assert.strictEqual(response.data.leetcode.source, "fallback");
  assert.strictEqual(
    response.data.leetcode.totalSolved,
    portfolioData.fallbackStats.leetcode.totalSolved
  );
  assert.ok(response.fetchedAt);
});

test("GET /api/stats - Upstream error (500 Internal Error) triggers fallback", async () => {
  const mockErrorFetcher: typeof fetch = async () => {
    return new Response("Internal Server Error", { status: 500 });
  };

  const response = await getStats(mockErrorFetcher);

  assert.strictEqual(response.source, "fallback");
  assert.strictEqual(response.data.github.source, "fallback");
  assert.strictEqual(
    response.data.github.publicRepos,
    portfolioData.fallbackStats.github.publicRepos
  );
  assert.strictEqual(response.data.leetcode.source, "fallback");
  assert.strictEqual(
    response.data.leetcode.totalSolved,
    portfolioData.fallbackStats.leetcode.totalSolved
  );
  assert.ok(response.fetchedAt);
});
