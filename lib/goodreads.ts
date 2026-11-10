import { XMLParser, XMLValidator } from "fast-xml-parser";
import { load } from "cheerio/slim";

export const GOODREADS_PROFILE = "https://www.goodreads.com/user/show/3518990-leira";

export const GOODREADS_FEED =
  "https://www.goodreads.com/review/list_rss/3518990?shelf=currently-reading";

export type ReadingBook = {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  url: string;
};

export type CurrentlyReadingResponse = { book: ReadingBook | null };

const text = (value: unknown): string =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

function coverUrl(item: Record<string, unknown>): string | null {
  for (const field of [
    "book_large_image_url",
    "book_medium_image_url",
    "book_image_url",
    "book_small_image_url",
  ]) {
    try {
      const url = new URL(text(item[field]));
      if (
        url.protocol === "https:" &&
        ["i.gr-assets.com", "images-na.ssl-images-amazon.com"].includes(
          url.hostname
        )
      ) {
        return url.href;
      }
    } catch {
      // A missing or invalid cover should not hide the book.
    }
  }
  return null;
}

export function parseCurrentlyReading(xml: string): CurrentlyReadingResponse {
  if (/<!DOCTYPE/i.test(xml) || XMLValidator.validate(xml) !== true) {
    throw new Error("Invalid Goodreads XML");
  }
  const parsed = new XMLParser({
    parseTagValue: false,
    ignoreAttributes: true,
  }).parse(xml);
  const channel = parsed?.rss?.channel;
  if (!channel || typeof channel !== "object" || !text(channel.title)) {
    throw new Error("Invalid Goodreads RSS channel");
  }
  if (channel.item === undefined) return { book: null };
  const items: Record<string, unknown>[] = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];
  const books = items.map((item: Record<string, unknown>, index: number) => {
    const id = text(item?.book_id);
    const title = text(item?.title);
    const author = text(item?.author_name);
    if (!/^\d+$/.test(id) || !title || !author) {
      throw new Error("Invalid Goodreads book entry");
    }
    const date = Date.parse(text(item.user_date_added));
    return {
      book: {
        id,
        title,
        author,
        coverUrl: coverUrl(item),
        url: `https://www.goodreads.com/book/show/${id}`,
      },
      date: Number.isFinite(date) ? date : -Infinity,
      index,
    };
  });
  books.sort((a, b) =>
    a.date === b.date ? a.index - b.index : b.date - a.date
  );
  return { book: books[0].book };
}

// The public profile is a limited fallback, not the complete RSS shelf.
// Keep Goodreads' display order: it does not expose user_date_added here.
export function parseCurrentlyReadingProfile(html: string): CurrentlyReadingResponse {
  const $ = load(html);
  const section = $("#currentlyReadingReviews");
  if (section.length !== 1) throw new Error("Invalid Goodreads reading section");
  const entry = section.find(".Updates").first();
  const link = entry.find("a.bookTitle").first();
  const title = text(link.text());
  const author = text(entry.find("a.authorName").first().text());
  const url = new URL(link.attr("href") || "", GOODREADS_PROFILE);
  const id = url.pathname.match(/^\/book\/show\/(\d+)(?:[.-][^/]*)?$/)?.[1];
  if (url.origin !== "https://www.goodreads.com" || !id || !title || !author)
    throw new Error("Invalid Goodreads profile book");
  return { book: {
    id, title, author,
    url: `https://www.goodreads.com/book/show/${id}`,
    coverUrl: coverUrl({book_image_url: entry.find(".firstcol img").first().attr("src")}),
  } };
}

export async function fetchCurrentlyReading(): Promise<CurrentlyReadingResponse> {
  // One overall deadline bounds both upstream attempts.
  const signal = AbortSignal.timeout(10_000);
  try {
    const response = await fetch(GOODREADS_FEED, {
      cache: "no-store", signal,
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!response.ok) throw new Error(`Goodreads returned HTTP ${response.status}`);
    return parseCurrentlyReading(await response.text());
  } catch (error) {
    if (signal.aborted) throw error;
    const response = await fetch(GOODREADS_PROFILE, {
      cache: "no-store", signal,
      headers: { Accept: "text/html" },
    });
    if (!response.ok) throw new Error(`Goodreads returned HTTP ${response.status}`);
    // Missing/changed markup is an error, never a cacheable empty shelf.
    return parseCurrentlyReadingProfile(await response.text());
  }
}
