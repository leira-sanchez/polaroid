import { XMLParser, XMLValidator } from "fast-xml-parser";

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

export async function fetchCurrentlyReading(): Promise<CurrentlyReadingResponse> {
  const response = await fetch(GOODREADS_FEED, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });
  if (!response.ok)
    throw new Error(`Goodreads returned HTTP ${response.status}`);
  return parseCurrentlyReading(await response.text());
}
