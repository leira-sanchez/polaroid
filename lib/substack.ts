import { XMLParser, XMLValidator } from "fast-xml-parser";

export type SubstackPost = {
  title: string;
  url: string;
  summary: string;
  publishedAt: string | null;
  image: string | null;
};

const text = (value: unknown): string =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

function descriptionText(value: unknown): string {
  // Substack descriptions can contain HTML entities inside CDATA.
  const entities: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  };
  return text(text(value).replace(/<[^>]*>/g, " ").replace(
    /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi,
    (match, entity: string) => {
      if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match;
      const hex = entity.slice(0, 2).toLowerCase() === "#x";
      const code = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
  ));
}

function httpsUrl(value: unknown): string | null {
  try {
    const url = new URL(text(value));
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function parseSubstackFeed(xml: string): SubstackPost[] {
  if (/<!DOCTYPE/i.test(xml) || XMLValidator.validate(xml) !== true) {
    throw new Error("Invalid Substack XML");
  }
  const parsed = new XMLParser({
    parseTagValue: false,
    ignoreAttributes: false,
  }).parse(xml);
  const channel = parsed?.rss?.channel;
  if (!channel || typeof channel !== "object" || !text(channel.title)) {
    throw new Error("Invalid Substack RSS channel");
  }
  if (channel.item === undefined) return [];
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  const seen = new Set<string>();
  const posts: SubstackPost[] = [];

  for (const item of items) {
    const title = text(item?.title);
    const url = httpsUrl(item?.link);
    if (!title || !url) throw new Error("Invalid Substack post");
    if (seen.has(url)) continue;
    seen.add(url);

    const date = Date.parse(text(item.pubDate));
    const enclosures = Array.isArray(item.enclosure)
      ? item.enclosure
      : [item.enclosure];
    const image = enclosures.find((entry: Record<string, unknown> | undefined) =>
      text(entry?.["@_type"]).startsWith("image/")
    );
    posts.push({
      title,
      url,
      // Only render the feed's short description as text, never its article HTML.
      summary: descriptionText(item.description),
      publishedAt: Number.isFinite(date) ? new Date(date).toISOString() : null,
      image: httpsUrl(image?.["@_url"]),
    });
  }

  return posts.sort((a, b) => {
    if (a.publishedAt === b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  });
}

export async function fetchSubstackPosts(publicationUrl: string) {
  const response = await fetch(`${publicationUrl}/feed`, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });
  if (!response.ok) throw new Error(`Substack returned HTTP ${response.status}`);
  return parseSubstackFeed(await response.text());
}
