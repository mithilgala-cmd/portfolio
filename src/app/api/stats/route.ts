import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";

export const revalidate = 3600; // Cache for 1 hour

interface LeetCodeAcSubmission {
  difficulty: string;
  count: number;
}

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser?: {
      submitStats?: {
        acSubmissionNum?: LeetCodeAcSubmission[];
      };
    };
  };
}

export async function GET() {
  const fallback = portfolioData.fallbackStats;

  let publicRepos = fallback.github.publicRepos;
  let leetcodeStats = { ...fallback.leetcode };
  let isGithubLive = false;
  let isLeetCodeLive = false;

  // 1. Fetch GitHub stats
  try {
    const ghRes = await fetch("https://api.github.com/users/mithilgala-cmd", {
      headers: {
        "User-Agent": "MithilGala-Portfolio-Stats/1.0",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });

    if (ghRes.ok) {
      const ghData = await ghRes.json();
      if (typeof ghData.public_repos === "number") {
        publicRepos = ghData.public_repos;
        isGithubLive = true;
      }
    }
  } catch (error) {
    console.warn("GitHub API fetch fallback used:", error);
  }

  // 2. Fetch LeetCode stats
  try {
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: portfolioData.socials.leetcode.username },
      }),
      next: { revalidate: 3600 },
    });

    if (lcRes.ok) {
      const lcData: LeetCodeGraphQLResponse = await lcRes.json();
      const submissions = lcData.data?.matchedUser?.submitStats?.acSubmissionNum;
      if (Array.isArray(submissions) && submissions.length > 0) {
        let total = 0;
        let easy = 0;
        let medium = 0;
        let hard = 0;

        for (const item of submissions) {
          if (item.difficulty === "All") total = item.count;
          if (item.difficulty === "Easy") easy = item.count;
          if (item.difficulty === "Medium") medium = item.count;
          if (item.difficulty === "Hard") hard = item.count;
        }

        if (total > 0) {
          leetcodeStats = {
            totalSolved: total,
            easy,
            medium,
            hard,
            acceptanceRate: fallback.leetcode.acceptanceRate,
            maxStreak: fallback.leetcode.maxStreak,
            rankingHighlight: fallback.leetcode.rankingHighlight,
          };
          isLeetCodeLive = true;
        }
      }
    }
  } catch (error) {
    console.warn("LeetCode GraphQL fetch fallback used:", error);
  }

  return NextResponse.json({
    success: true,
    data: {
      github: {
        username: portfolioData.socials.github.username,
        publicRepos,
        isLive: isGithubLive,
      },
      leetcode: {
        username: portfolioData.socials.leetcode.username,
        ...leetcodeStats,
        isLive: isLeetCodeLive,
      },
      linkedin: {
        username: portfolioData.socials.linkedin.username,
        followers: portfolioData.socials.linkedin.followers,
      },
      lastUpdated: new Date().toISOString(),
    },
  });
}

