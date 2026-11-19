import "server-only";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parseDocument } from "yaml";

export type Post = {
  title: string;
  summary?: string;
  publishDate?: string;
  image?: string;
  tags: string[];
  slug: string;
  body: string;
  draft: boolean;
};

const directory = path.join(process.cwd(), "content", "posts");

// Filenames are the existing public route keys, not the editable slug field.
export function parsePost(source: string, slug: string): Post {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`Missing frontmatter in post: ${slug}`);
  const document = parseDocument(match[1], { uniqueKeys: true });
  if (document.errors.length) throw new Error(`Invalid frontmatter in post: ${slug}`);
  const data = document.toJS({ maxAliasCount: 50 });
  if (!data || typeof data !== "object" || typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`Missing title in post: ${slug}`);
  }
  for (const key of ["summary", "publishDate", "image", "slug"]) {
    if (data[key] !== undefined && typeof data[key] !== "string") throw new Error(`Invalid ${key} in post: ${slug}`);
  }
  if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag: unknown) => typeof tag !== "string"))) {
    throw new Error(`Invalid tags in post: ${slug}`);
  }
  if (data.draft !== undefined && typeof data.draft !== "boolean") throw new Error(`Invalid draft flag in post: ${slug}`);
  return { title: data.title, summary: data.summary, publishDate: data.publishDate, image: data.image,
    tags: data.tags ?? [], slug, body: source.slice(match[0].length), draft: data.draft === true };
}

export async function getPost(slug: string): Promise<Post | null> {
  // Validate before joining paths; never allow routes to read outside authored content.
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(slug)) return null;
  let source: string;
  try { source = await readFile(path.join(directory, `${slug}.md`), "utf8"); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return null; throw error; }
  const post = parsePost(source, slug);
  return post.draft ? null : post;
}

export async function getPosts(): Promise<Post[]> {
  const files = (await readdir(directory)).filter((name) => name.endsWith(".md")).sort();
  const posts = await Promise.all(files.map((name) => getPost(name.slice(0, -3))));
  return posts.filter((post): post is Post => post !== null);
}
