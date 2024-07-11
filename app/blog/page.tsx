"use client";
import { useEffect, useState } from "react";
import { client } from "../../tina/__generated__/client";
import { Post, PostConnectionQuery } from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const BlogHome = () => {
  const [allBlogs, setAllBlogs] = useState<Post[]>([]);
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
            ].map((tag) => (
              <Button
                className="bg-violet-500"
                key={tag}
                //   variant={selectedTags.includes(tag) ? "primary" : "outline"}
                //   onClick={() => {
                //     if (selectedTags.includes(tag)) {
                //       setSelectedTags(selectedTags.filter((t) => t !== tag));
                //     } else {
                //       setSelectedTags([...selectedTags, tag]);
                //     }
                //   }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allBlogs.map((post, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={400}
                height={225}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm">{post?.summary}</p>
                {/* <div className="mt-4 flex flex-wrap gap-2">
                {post?.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-primary text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div> */}
              </div>
            </div>
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
