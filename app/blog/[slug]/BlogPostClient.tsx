"use client";

import { Post } from "@/tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
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

export default BlogPostClient;
