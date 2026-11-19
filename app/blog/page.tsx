import { Metadata } from "next";
import { Suspense } from "react";
import { unstable_cache, unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { SUBSTACK_URL } from "@/constants/substack";
import { fetchSubstackPosts, SubstackPost } from "@/lib/substack";

export const metadata: Metadata = {
  title: "Blog Home",
  description: "Read the latest newsletter posts on Substack.",
  openGraph: {
    title: "Blog Home",
    description:
      "Tech, startups, Puerto Rican culture, entrepreneurship, and more — embrace the journey in Spanglish",
    type: "website",
    url: "https://leirasanchez.com/blog",
    images: [
      {
        url: "https://leirasanchez.com/ogimage-blog.png",
        width: 1200,
        height: 630,
        alt: "Blog Home",
      },
      {
        url: "https://leirasanchez.com/ogimage-blog-squared.png",
        width: 600,
        height: 600,
        alt: "Leira C Sánchez Quiñones - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Home",
    description:
      "Tech, startups, Puerto Rican culture, entrepreneurship, and more — embrace the journey in Spanglish",
    images: ["https://leirasanchez.com/ogimage-blog.png"],
  },
};

const getPosts = unstable_cache(
  () => fetchSubstackPosts(SUBSTACK_URL),
  ["substack-posts", SUBSTACK_URL, "v1"],
  { revalidate: 3600 }
);

async function SubstackPosts() {
  // Cache successful feed data, not the rendered fallback after a failed fetch.
  // Keep this outside both unstable_cache and the catch: Next uses it to bail
  // out of prerendering before making an upstream request at build time.
  noStore();
  let posts: SubstackPost[];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Substack refresh failed", error);
    return (
      <p className="py-8 text-muted-foreground" role="status">
        Posts are temporarily unavailable here. You can still{" "}
        <a className="text-link hover:underline" href={`${SUBSTACK_URL}/archive`} target="_blank" rel="noopener noreferrer">
          read them on Substack
        </a>.
      </p>
    );
  }

  if (posts.length === 0) {
    return <p className="py-8 text-muted-foreground">No posts yet. Subscribe to get the first one in your inbox.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <article key={post.url} className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
          {post.image && (
            <a href={post.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
              <Image
                src={post.image}
                alt=""
                width={1200}
                height={628}
                unoptimized
                className="aspect-[1200/628] w-full object-cover"
              />
            </a>
          )}
          <div className="flex flex-1 flex-col gap-3 p-5">
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
                })}
              </time>
            )}
            <h3 className="text-lg font-semibold leading-snug">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:text-link hover:underline">{post.title}</a>
            </h3>
            {post.summary && <p className="line-clamp-4 text-sm text-muted-foreground">{post.summary}</p>}
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-2 text-sm text-link hover:underline" aria-label={`Read ${post.title} on Substack`}>
              Read on Substack <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function BlogHome() {
  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold">Latest on Substack</h2>
        <a href={`${SUBSTACK_URL}/archive`} target="_blank" rel="noopener noreferrer" className="text-sm text-link hover:underline">
          View all posts <span aria-hidden="true">↗</span>
        </a>
      </div>
      <Suspense fallback={<p className="py-8 text-muted-foreground" role="status">Loading posts…</p>}>
        <SubstackPosts />
      </Suspense>
    </main>
  );
}
