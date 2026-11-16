import { getStats } from "@/lib/stats";

export const revalidate = 900; // 15-minute ISR cache

export async function GET() {
  const responseBody = await getStats(fetch);
  return Response.json(responseBody);
}
