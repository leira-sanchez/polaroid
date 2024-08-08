"use client";
import { client } from "@/tina/__generated__/client";
import { Post } from "@/tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

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
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchBlog(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
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

const BlogPost = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<Post | undefined | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const blog = await fetchBlog(params.slug as string);
      setPost(blog);
    };

    if (params?.slug) {
      fetchPost();
    }
  }, [params?.slug]);

  const getBlogHomeUrl = () => {
    const tags = searchParams.getAll("tags");
    return tags.length > 0
      ? `/blog?${tags
          .map((tag) => `tags=${encodeURIComponent(tag)}`)
          .join("&")}`
      : "/blog";
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-6 h-full mx-auto w-full justify-center">
      <div className="container mx-auto gap-6 flex flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={getBlogHomeUrl()}>Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {post.image && (
          <Image
            className="rounded-t-lg aspect-video"
            src={post.image}
            alt={post.title}
            width={1200}
            height={628}
          />
        )}
        <h1 className="sm:text-4xl text-3xl">{post.title}</h1>
        <p>{post.publishDate}</p>
        <TinaMarkdown content={post.body} />
      </div>
    </div>
  );
};

export default BlogPost;
