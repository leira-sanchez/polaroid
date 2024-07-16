"use client";
import { client } from "@/tina/__generated__/client";
import { Post } from "@/tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState<Post | undefined | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const blog = await fetchBlog(params.slug);
      setPost(blog);
    };

    if (params?.slug) {
      fetchPost();
    }
  }, [params?.slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-6 h-full mx-auto w-full justify-center">
      <div className="container mx-auto gap-6 flex flex-col">
        {post.image && (
          <Image
            className="rounded-t-lg aspect-video"
            src={post.image}
            alt={post.title}
            width={1200}
            height={628}
          />
        )}
        <h1>{post.title}</h1>
        <p>{post.publishDate}</p>
        <TinaMarkdown content={post.body} />
      </div>
    </div>
  );
};

export default BlogPost;
