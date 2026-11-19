"use client";

import type { Post } from "@/lib/posts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BlogPostClient = ({ post }: { post: Post | undefined | null }) => {
  const searchParams = useSearchParams();

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
    <div className="bg-card py-6 h-full mx-auto w-full justify-center">
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
        <div className="space-y-4 [&_h2]:text-2xl [&_h2]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:underline [&_pre]:overflow-x-auto [&_pre]:p-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-4">
          <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPostClient;
