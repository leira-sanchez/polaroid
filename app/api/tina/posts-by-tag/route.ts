// app/api/tina/posts-by-tags/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/tina/__generated__/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tags = url.searchParams.get("tags")?.split(",");
  const { data } = await client.queries.postConnection();
  const posts = data?.postConnection?.edges
    ?.map((edge) => edge?.node)
    .filter((post) => tags?.some((tag) => post?.tags?.includes(tag)));
  return NextResponse.json(posts);
}
