// Preserve the existing public URL for consumers; no Tina service is used.
import { NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";

export async function GET() {
  return NextResponse.json(Array.from(new Set((await getPosts()).flatMap(post => post.tags))));
}
