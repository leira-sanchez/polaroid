import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import HotJar from "@/components/HotJar";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

const NavMenu: React.FC = () => {
  return (
    <NavigationMenu className="flex justify-end mx-auto w-full pt-24 pb-12">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
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
      <body className={inter.className + " bg-[#f5f5f9] "}>
        {/* <NavMenu /> */}
        <header className="w-full bg-white shadow mb-12">
          <nav className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700">
                Home
              </a>
              <a href="/blog" className="text-gray-700">
                Blog
              </a>
              <a href="/#skills" className="text-gray-700">
                Skills
              </a>
              <a href="/#experience" className="text-gray-700">
                Experience
              </a>
            </div>
          </nav>
        </header>
        {children}
        <HotJar />
      </body>
    </html>
  );
}
