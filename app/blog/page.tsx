"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const BlogHomeClient = dynamic(() => import("./BlogHomeClient"), {
  ssr: false,
});

const BlogHome = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogHomeClient />
    </Suspense>
  );
};

export default BlogHome;
