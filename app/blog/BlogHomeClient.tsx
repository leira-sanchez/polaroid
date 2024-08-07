"use client";
import { useEffect, useState } from "react";
import { client } from "../../tina/__generated__/client";
import { Post } from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await fetchAllBlogPosts();
      setPosts(allPosts);

      // Extract and set unique tags
      const allTags = Array.from(
        new Set(allPosts.flatMap((post) => post.tags ?? []))
      );
      setTags(allTags as any);

      // Get selected tags from URL
      const tagsFromUrl = searchParams.getAll("tags");
      setSelectedTags(tagsFromUrl);
    };

    fetchPosts();
  }, [searchParams]);

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

    // Update URL with selected tags
    const newSearchParams = new URLSearchParams();
    selectedTags.forEach((tag) => newSearchParams.append("tags", tag));
    router.push(`/blog?${newSearchParams.toString()}`, { scroll: false });
  }, [selectedTags, posts, router]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const navigateToBlogPost = (slug: string) => {
    const currentUrl = new URL(window.location.href);
    const tagParams = currentUrl.searchParams.getAll("tags");
    const queryString =
      tagParams.length > 0
        ? `?${tagParams
            .map((tag) => `tags=${encodeURIComponent(tag)}`)
            .join("&")}`
        : "";
    router.push(`/blog/${slug}${queryString}`);
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
                <Image
                  src={post?.image}
                  alt="Blog Post Image"
                  width={1200}
                  height={628}
                  className="w-full rounded-t-lg aspect-[1200/628] h-48 object-cover hover:cursor-pointer"
                  onClick={() => navigateToBlogPost(post?.slug)}
                />
              )}
              <div className="p-4 flex flex-col bg-background gap-2">
                <Link href="#" onClick={() => navigateToBlogPost(post?.slug)}>
                  <h3 className="text-lg font-semibold mb-2 hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-xs">{post?.publishDate}</p>
                <p className="text-muted-foreground text-sm line-clamp-4">
                  {post?.summary}
                </p>
                <Link
                  className="text-sm text-violet-500 hover:underline w-full text-right block"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToBlogPost(post?.slug);
                  }}
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
