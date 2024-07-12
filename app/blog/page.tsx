"use client";
import { useEffect, useState } from "react";
import { client } from "../../tina/__generated__/client";
import { Post, PostConnectionQuery } from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogHome = () => {
  const [allBlogs, setAllBlogs] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      const { data } = await client.queries.postConnection();
      const posts = data?.postConnection?.edges?.map((post) => {
        return post?.node;
      });
      setAllBlogs(posts);
    };
    try {
      fetchAllBlogPosts();
    } catch (error) {
      console.error("Failed to fetch all blogs");
    }
  }, []);
  return (
    <>
      <section className="w-full bg-white py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <Image
            src="/the-sim.webp"
            alt="Hero Image"
            width={400}
            height={400}
            className="mx-auto aspect-square  overflow-hidden rounded-xl object-cover"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              We're Here for a Good Time
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Entrepreneurship, Puerto Rican culture, tech, and more—embrace the
              journey in Spanglish
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
              />
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Filter by Tag</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "react",
              "hooks",
              "css",
              "grid",
              "performance",
              "optimization",
              "design",
              "trends",
              "accessibility",
              "inclusive",
              "javascript",
              "modern",
              "serverless",
              "cloud",
              "future",
            ].map((tag) => {
              const includesTag = selectedTags.includes(tag) ? true : false;
              return (
                <Button
                  className={`border-violet-500 hover:bg-violet-500 hover:text-white ${
                    includesTag && "bg-violet-500"
                  }`}
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allBlogs.map((post, index) => (
            <Card key={index} className="rounded-lg overflow-hidden shadow-lg">
              {post?.image && (
                <img
                  src={post?.image}
                  alt="Blog Post Image"
                  width={400}
                  height={225}
                  className="w-full rounded-t-lg aspect-video h-48 object-cover hover:cursor-pointer"
                  onClick={() => router.push(`/${post?.slug}`)}
                />
              )}
              <div className="p-4 flex flex-col bg-background gap-2">
                <Link href={`/${post?.slug}`}>
                  <h3 className="text-lg font-semibold mb-2 hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <h4 className="text-sm text-gray-400 text-right">
                  {post?.publishDate}
                </h4>
                <p className="text-muted-foreground text-sm">{post?.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post?.tags?.map((tag, index) => (
                    <Badge
                      variant="outline"
                      key={index}
                      className="border border-violet-500 text-black hover:bg-violet-500 hover:text-white hover:cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  className="text-sm text-violet-500 hover:underline w-full text-right block"
                  href={`/${post?.slug}`}
                >
                  Read More
                </Link>
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
