import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import HotJar from "@/components/HotJar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leira | Software Engineer",
  description:
    "Fullstack Senior Software Engineer | React | TypeScript | JavaScript | React Native | Node | Prisma | Founder of MofongoJobs.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leirasanchez.com",
    siteName: "Leira C Sánchez Quiñones",
    title: "Leira C Sánchez Quiñones | Senior Software Engineer",
    description:
      "Fullstack Senior Software Engineer specializing in React, TypeScript, and Node.js. Founder of MofongoJobs.com",
    images: [
      {
        url: "https://leirasanchez.com/ogimage-index.png",
        width: 1200,
        height: 630,
        alt: "Leira C Sánchez Quiñones - Senior Software Engineer",
      },
      {
        url: "https://leirasanchez.com/ogimage-index-squared.png",
        width: 600,
        height: 600,
        alt: "Leira C Sánchez Quiñones - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@leirasanchez",
    creator: "@leirasanchez",
    title: "Leira C Sánchez Quiñones | Senior Software Engineer",
    description:
      "Fullstack Senior Software Engineer specializing in React, TypeScript, and Node.js. Founder of MofongoJobs.com",
    images: ["https://leirasanchez.com/ogimage-index.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <body className={inter.className + " bg-[#f5f5f9]"}>
        {children}
        <HotJar />
      </body>
    </html>
  );
}
