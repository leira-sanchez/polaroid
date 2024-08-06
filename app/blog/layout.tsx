"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="w-full bg-[#f5f5f9] py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6 px-4 md:px-6 lg:gap-10">
          <Image
            src="/the-sim.webp"
            alt="Hero Image"
            width={400}
            height={400}
            className="w-1/2 sm:w-auto max-w-[200px] sm:max-w-[400px] mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            loading="lazy"
          />
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              We&apos;re Here for a Good Time
            </h1>
            <p className="md:text-xl">
              Entrepreneurship, Puerto Rican culture, tech, and more — embrace
              the journey in Spanglish
            </p>
            <SubscribeForm align="justify-start" />
          </div>
        </div>
      </section>
      <div className="bg-white">{children}</div>

      <section className="w-full bg-[#f5f5f9] py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Stay Updated
            </h2>
            <p className="text-xl">
              Entrepreneurship, Puerto Rican culture, tech, and more — embrace
              the journey in Spanglish
            </p>
            <SubscribeForm />
          </div>
        </div>
      </section>
    </>
  );
}

const SubscribeForm = ({
  align = "justify-center",
}: {
  align?: "justify-center" | "justify-start";
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed!");
        setEmail("");
      } else {
        console.error("Subscription error:", data);
        setMessage(`Failed to subscribe: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row items-center ${align} space-y-2 sm:space-y-0 sm:space-x-2`}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="max-w-sm bg-white"
          required
        />
        <Button type="submit" className="w-full sm:w-auto">
          Subscribe
        </Button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
      <div className="mt-4">
        <Link
          href="https://rss.beehiiv.com/feeds/a1IdnbeLUm.xml"
          className="inline-flex items-center text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
          Subscribe via RSS
        </Link>
      </div>
    </>
  );
};
