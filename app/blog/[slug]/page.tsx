import { Metadata } from "next";
import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {
      title: "Leira Sánchez | Blog",
      description:
        "Tech, startups, entrepreneurship, Puerto Rican culture, and more — embrace the journey in Spanglish",
    };
  }
  return {
    title: post.title,
    description: post?.summary || post.title,
    openGraph: {
      title: post.title,
      description: post?.summary || post.title,
      images: post.image ? [{ url: post.image }] : [],
      type: "article",
      publishedTime: post.publishDate && !Number.isNaN(Date.parse(post.publishDate))
        ? new Date(post.publishDate).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post?.summary || post.title,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
