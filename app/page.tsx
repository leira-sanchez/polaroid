"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExperienceItem from "@/components/ExperienceItem";
import EXPERIENCE_STRINGS from "@/constants/experience";
import Skills from "@/components/Skills";
import Link from "next/link";

const allExperiences = EXPERIENCE_STRINGS.map((experience, idx) => (
  <ExperienceItem key={idx} {...experience} />
));

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center gap-6 sm:p-24">
      <section>
        <h1 className="font-cal-sans text-5xl text-center font-bold mb-2">
          Leira C. Sánchez Quiñones
        </h1>
        <h2 className="text-2xl text-center mx-auto">
          Fullstack Senior Software Engineer
        </h2>
        <h3 className="text-xl text-center mx-auto">
          Founder at{" "}
          <Link
            className="text-wrap break-words hover:underline text-violet-600"
            href="https://www.mofongojobs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            MofongoJobs.com
          </Link>
        </h3>
      </section>
      <section className="flex flex-col sm:flex-row w-full gap-4">
        <div className=" w-full sm:w-2/5 flex gap-4 flex-col justify-between">
          <Card className="max-w-[640px] sm:hidden w-full sm:w-3/5 h-auto relative rounded-lg aspect-square">
            <Image
              src="/MofongoJobs_pre18_G6_Headshots-16.jpg"
              alt="brunette profile pic"
              layout="fill"
              className="object-cover object-top rounded-lg p-2"
            />
          </Card>

          <Card>
            <CardHeader className="gap-2">
              <span className="text-gray-600 font-bold shadow-sm bg-slate-100 max-w-fit py-1 px-2 rounded-md border">
                ⚡️
              </span>
              <CardTitle>Leira</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-700">📍 Puerto Rico (US territory)</p>
                <p className="text-gray-700">🐶 Maltipoo named Beni</p>
                <p className="text-gray-700 flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  <Link
                    className="hover:underline text-violet-500"
                    href="https://www.linkedin.com/in/leirasanchez"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="min-h-1/2 h-full">
            <CardHeader className="gap-2">
              <span className="text-gray-600 font-bold shadow-sm bg-slate-100 max-w-fit py-1 px-2 rounded-md border">
                📚
              </span>
              <CardTitle>Currently Reading</CardTitle>
              <CardDescription>
                Fiction, Business, Self-Improvement and beyond
              </CardDescription>
            </CardHeader>
            <CardContent
              className="flex gap-2 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.goodreads.com/book/show/37786022-storyworthy"
                )
              }
            >
              <Image
                src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1514780933i/37786022.jpg"
                width="80"
                height="120"
                className=" aspect-auto flex max-w-fit"
                alt="Storyworthy cover photo"
              />
              <div className="flex flex-col justify-between">
                <p>
                  <strong>Storyworthy</strong>: Engage, Teach, Persuade, and
                  Change Your Life through the Power of Storytelling
                </p>
                <p>
                  by <em>Matthew Dicks</em>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="max-w-[640px] hidden sm:flex w-full sm:w-3/5 h-auto relative rounded-lg aspect-square">
          <Image
            src="/MofongoJobs_pre18_G6_Headshots-16.jpg"
            alt="brunette profile pic"
            layout="fill"
            className="object-cover object-top rounded-lg p-2"
          />
        </Card>
      </section>
      <Skills />
      <section className="w-full">
        <Card className="w-full flex flex-col">
          <CardHeader className="gap-2">
            <span className="text-gray-600 font-bold shadow-sm bg-slate-100 max-w-fit py-1 px-2 rounded-md border">
              ⚡️
            </span>
            <CardTitle>Experience</CardTitle>
            <CardDescription>
              From Mechanical Engineer to Founding Fullstack Engineer
            </CardDescription>
          </CardHeader>
          {allExperiences}
        </Card>
      </section>
    </main>
  );
}
