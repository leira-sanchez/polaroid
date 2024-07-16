// app/api/tina/tags/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/tina/__generated__/client";

export async function GET(request: NextRequest) {
  const { data } = await client.queries.postConnection();
  const tags = data?.postConnection?.edges?.flatMap(
    (edge: any) => edge?.node?.tags ?? []
  );
  const uniqueTags = Array.from(new Set(tags));
  return NextResponse.json(uniqueTags);
}
