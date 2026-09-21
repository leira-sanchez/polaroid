"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CurrentlyReadingResponse } from "@/lib/goodreads";

const profileUrl = "https://www.goodreads.com/user/show/3518990-leira";

export default function CurrentlyReadingCard() {
  const [result, setResult] = useState<CurrentlyReadingResponse>();
  const [failed, setFailed] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/currently-reading", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Reading shelf unavailable");
        const data: CurrentlyReadingResponse = await response.json();
        if (!controller.signal.aborted) setResult(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const book = result?.book;
  return (
    <Card className="min-h-1/2 h-full">
      <CardHeader className="gap-2">
        <span className="text-gray-600 font-bold shadow-sm bg-slate-100 max-w-fit py-1 px-2 rounded-md border">
          📚
        </span>
        <CardTitle>Currently Reading</CardTitle>
        <CardDescription>
          Fiction, Business, Self-Improvement and beyond
        </CardDescription>
      </CardHeader>
      <CardContent aria-live="polite" aria-busy={!result && !failed}>
        {!result && !failed ? (
          <div role="status" className="flex gap-2">
            <span className="sr-only">Loading current book</span>
            <div
              aria-hidden="true"
              className="h-[70px] w-[50px] shrink-0 rounded bg-slate-100 motion-safe:animate-pulse"
            />
            <div
              aria-hidden="true"
              className="flex-1 space-y-3 pt-1 motion-safe:animate-pulse"
            >
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        ) : book ? (
          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
          >
            {book.coverUrl && !coverFailed ? (
              <Image
                src={book.coverUrl}
                width={50}
                height={70}
                sizes="50px"
                className="w-[50px] h-auto self-start shrink-0"
                alt={`${book.title} cover`}
                onError={() => setCoverFailed(true)}
              />
            ) : (
              <div
                aria-label="Cover unavailable"
                role="img"
                className="flex h-[70px] w-[50px] shrink-0 items-center justify-center rounded bg-slate-100"
              >
                📖
              </div>
            )}
            <div className="min-w-0 break-words">
              <p>
                <strong>{book.title}</strong>
              </p>
              <p>
                by <em>{book.author}</em>
              </p>
            </div>
          </a>
        ) : (
          <div>
            {!failed && (
              <p className="mb-2">Nothing on my reading shelf right now</p>
            )}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 underline underline-offset-4"
            >
              {failed
                ? "See what I’m reading on Goodreads"
                : "Visit my Goodreads profile"}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
