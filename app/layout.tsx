import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Hotjar from "@hotjar/browser";
import { useEffect } from "react";

const siteId = 5053419;
const hotjarVersion = 6;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leira | Software Engineer",
  description:
    "Fullstack Senior Software Engineer | React | TypeScript | JavaScript | React Native | Node | Prisma | Founder of MofongoJobs.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Initialise Hotjar only client side
    Hotjar.init(siteId, hotjarVersion);
  }, []);
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <body className={inter.className + " bg-[#f5f5f9]"}>{children}</body>
    </html>
  );
}
