import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { fetchCurrentlyReading } from "@/lib/goodreads";

export const runtime = "nodejs";

const getCurrentlyReading = unstable_cache(
  async () => {
    try {
      return await fetchCurrentlyReading();
    } catch (error) {
      console.error("Goodreads refresh failed", error);
      throw error;
    }
  },
  ["goodreads", "3518990", "currently-reading", "v1"],
  { revalidate: 86400 }
);

// Reading the request opts out of Next 14's route cache without disabling the Data Cache.
export async function GET(request: NextRequest) {
  void request.url;
  const headers = { "Cache-Control": "no-store" };
  try {
    return NextResponse.json(await getCurrentlyReading(), { headers });
  } catch {
    return NextResponse.json(
      { error: "Reading shelf unavailable" },
      { status: 503, headers }
    );
  }
}
