"use client";
import { useEffect, useState } from "react";
import { client } from "../../tina/__generated__/client";
import { Post } from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fetchAllBlogPosts = async () => {
  const { data } = await client.queries.postConnection();
  const posts = data?.postConnection?.edges
    ?.map((edge) => edge?.node)
    .filter(Boolean);
  return posts as Post[];
};

const BlogHome = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await fetchAllBlogPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);

      // Extract and set unique tags
      const allTags = Array.from(
        new Set(allPosts.flatMap((post) => post.tags ?? []))
      );
      setTags(allTags as any);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) =>
          selectedTags.every((tag) => post.tags?.includes(tag))
        )
      );
    }
  }, [selectedTags, posts]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };
  return (
    <>
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Filter by Tag</h2>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => {
              const includesTag = selectedTags.includes(tag) ? true : false;
              return (
                <Button
                  className={`border-violet-500 hover:bg-violet-500 hover:text-white ${
                    includesTag && "bg-violet-500"
                  }`}
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPosts.map((post, index) => (
            <Card key={index} className="rounded-lg overflow-hidden shadow-lg">
              {post?.image && (
                <img
                  src={post?.image}
                  alt="Blog Post Image"
                  width={400}
                  height={209}
                  className="w-full rounded-t-lg aspect-[1200/628] h-48 object-cover hover:cursor-pointer"
                  onClick={() => router.push(`/blog/${post?.slug}`)}
                />
              )}
              <div className="p-4 flex flex-col bg-background gap-2">
                <Link href={`/blog/${post?.slug}`}>
                  <h3 className="text-lg font-semibold mb-2 hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <h4 className="text-sm text-gray-400 text-right">
                  {post?.publishDate}
                </h4>
                <p className="text-muted-foreground text-sm line-clamp-4">
                  {post?.summary}
                </p>
                <Link
                  className="text-sm text-violet-500 hover:underline w-full text-right block"
                  href={`/blog/${post?.slug}`}
                >
                  Read More
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post?.tags?.map((tag, index) => (
                    <Badge
                      onClick={() => handleTagClick(tag as any)}
                      variant="outline"
                      key={index}
                      className="border border-violet-500 text-black hover:bg-violet-500 hover:text-white hover:cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
        </div>
      </main>
    </>
  );
};

export default BlogHome;
