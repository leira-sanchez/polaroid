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

const allExperiences = EXPERIENCE_STRINGS.map((experience, idx) => (
  <ExperienceItem key={idx} {...experience} />
));

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center gap-6 sm:p-24">
      <section>
        <h1 className=" text-4xl text-center font-bold mb-2">
          Leira C. Sánchez Quiñones
        </h1>
        <h2 className="text-xl text-center mx-auto">
          Fullstack Senior Software Engineer
        </h2>
        <h2 className="text-xl text-center mx-auto">
          React | TypeScript | JavaScript | React Native | Node | Prisma
        </h2>
        <h2 className="text-xl text-center mx-auto">
          Founder at MofongoJobs.com
        </h2>
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
                <p className="text-gray-700">💻 Passionate about startups</p>
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
              <p className="flex flex-col justify-between">
                <p>
                  <strong>Storyworthy</strong>: Engage, Teach, Persuade, and
                  Change Your Life through the Power of Storytelling
                </p>
                <p>
                  by <em>Matthew Dicks</em>
                </p>
              </p>
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
