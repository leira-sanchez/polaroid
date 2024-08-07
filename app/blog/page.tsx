import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog Home",
  description: "Explore our latest blog posts on various topics",
  openGraph: {
    title: "Blog Home",
    description:
      "Tech, startups, Puerto Rican culture, entrepreneurship, and more — embrace the journey in Spanglish",
    type: "website",
    url: "https://leirasanchez.com/blog",
    images: [
      {
        url: "https://leirasanchez.com/ogimage-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Home",
      },
      {
        url: "https://leirasanchez.com/ogimage-blog-squared.png",
        width: 600,
        height: 600,
        alt: "Leira C Sánchez Quiñones - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Home",
    description:
      "Tech, startups, Puerto Rican culture, entrepreneurship, and more — embrace the journey in Spanglish",
    images: ["https://leirasanchez.com/ogimage-blog.jpg"],
  },
};

const BlogHomeClient = dynamic(() => import("./BlogHomeClient"), {
  ssr: false,
});

export default function BlogHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogHomeClient />
    </Suspense>
  );
}
