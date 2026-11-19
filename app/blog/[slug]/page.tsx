import { Metadata } from "next";
import { client } from "@/tina/__generated__/client";
import { Post } from "@/tina/__generated__/types";
import BlogPostClient from "./BlogPostClient";

const fetchBlog = async (slug: string) => {
  try {
    const { data } = await client.queries.post({
      relativePath: `${slug}.md`,
    });
    return data?.post as Post;
  } catch (error) {
    console.error({ error });
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlog(slug);
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
      publishedTime: new Date(post.publishDate!).toISOString(),
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
  const post = await fetchBlog(slug);
  return <BlogPostClient post={post} />;
}
