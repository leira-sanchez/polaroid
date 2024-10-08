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
import Education from "@/components/Education";
import { Separator } from "@/components/ui/separator";
import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import MediaAppearances from "@/components/MediaAppearances";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";

const allExperiences = EXPERIENCE_STRINGS.map((experience, idx) => (
  <ExperienceItem
    isLast={idx === EXPERIENCE_STRINGS.length - 1}
    key={idx}
    {...experience}
    isSamePrevCompany={
      (idx > 0 && EXPERIENCE_STRINGS[idx - 1].company) === experience.company
        ? true
        : false
    }
    isSameNextCompany={
      (idx < EXPERIENCE_STRINGS.length - 1 &&
        EXPERIENCE_STRINGS[idx + 1].company) === experience.company
        ? true
        : false
    }
  />
));

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#7e5bef" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="container flex min-h-screen flex-col items-center gap-6 sm:pb-24 sm:px-24">
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
            aria-label="Visit MofongoJobs.com"
          >
            MofongoJobs.com
          </Link>
        </h3>
      </section>
      <section className="flex flex-col sm:flex-row w-full gap-4">
        <div className=" w-full flex gap-4 flex-col justify-between">
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
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex sm:grid sm:grid-cols-2 flex-col ">
                <div className="space-y-2 mb-2">
                  <p className="text-gray-700">
                    📍 &nbsp;Puerto Rico (US territory)
                  </p>
                  <p className="text-gray-700">🐶&nbsp; Maltipoo named Beni</p>
                </div>
                <div className=" flex flex-row items-baseline sm:justify-normal justify-between sm:flex-col space-y-2">
                  <p className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <rect
                        width="16"
                        height="16"
                        x="12"
                        y="16"
                        fill="#fff"
                        transform="rotate(-90 20 24)"
                      ></rect>
                      <polygon
                        fill="#1e88e5"
                        points="3,17 3,31 8,32 13,31 13,17 8,16"
                      ></polygon>
                      <path
                        fill="#4caf50"
                        d="M37,24v14c0,1.657-1.343,3-3,3H13l-1-5l1-5h14v-7l5-1L37,24z"
                      ></path>
                      <path
                        fill="#fbc02d"
                        d="M37,10v14H27v-7H13l-1-5l1-5h21C35.657,7,37,8.343,37,10z"
                      ></path>
                      <path
                        fill="#1565c0"
                        d="M13,31v10H6c-1.657,0-3-1.343-3-3v-7H13z"
                      ></path>
                      <polygon
                        fill="#e53935"
                        points="13,7 13,17 3,17"
                      ></polygon>
                      <polygon
                        fill="#2e7d32"
                        points="38,24 37,32.45 27,24 37,15.55"
                      ></polygon>
                      <path
                        fill="#4caf50"
                        d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z"
                      ></path>
                    </svg>
                    <button
                      data-cal-link="leira/30min"
                      data-cal-config='{"layout":"month_view"}'
                      className="text-violet-500 hover:underline"
                    >
                      Let&apos;s talk
                    </button>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Link
                      href="https://www.linkedin.com/in/leirasanchez"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit Leira's profile on LinkedIn"
                    >
                      <svg
                        width="20"
                        height="20"
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
                      </svg>
                    </Link>
                    <Link
                      href="https://x.com/mechengsanchez"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit Leira's profile on Twitter/X"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.23336 4.69629C7.23336 2.96884 8.63335 1.56857 10.36 1.56857C11.3736 1.56857 12.183 2.04804 12.7254 2.74385C13.3079 2.62467 13.8557 2.40913 14.3513 2.11508C14.1559 2.72598 13.7424 3.2396 13.2033 3.56463C13.2038 3.56568 13.2042 3.56674 13.2047 3.56779C13.7334 3.50361 14.2364 3.36302 14.7048 3.15546L14.7037 3.15715C14.3667 3.66183 13.9431 4.10736 13.4561 4.47034C13.4823 4.64672 13.4956 4.82427 13.4956 5.00079C13.4956 8.6871 10.6873 12.9746 5.52122 12.9746C3.93906 12.9746 2.46544 12.511 1.22505 11.7152C0.992632 11.5661 0.925108 11.2568 1.07423 11.0244C1.0874 11.0038 1.10183 10.9846 1.11734 10.9666C1.20582 10.8202 1.37438 10.7309 1.5554 10.7522C2.47066 10.8601 3.38568 10.7485 4.19219 10.3962C3.39226 10.0434 2.77129 9.35975 2.50204 8.51974C2.45359 8.3686 2.48835 8.20311 2.59351 8.08422C2.59716 8.0801 2.60087 8.07606 2.60464 8.0721C1.96391 7.50819 1.55973 6.68208 1.55973 5.76143V5.72759C1.55973 5.56814 1.64411 5.42059 1.78155 5.33974C1.82671 5.31317 1.87537 5.29511 1.92532 5.28558C1.70549 4.86154 1.58116 4.37984 1.58116 3.86958C1.58116 3.40165 1.58384 2.81192 1.91332 2.28081C1.98718 2.16175 2.10758 2.08915 2.2364 2.07195C2.42588 2.01237 2.64087 2.06969 2.77406 2.23302C3.86536 3.57126 5.44066 4.49583 7.23366 4.73961L7.23336 4.69629ZM5.52122 11.9746C4.73387 11.9746 3.97781 11.8435 3.27248 11.6023C4.13012 11.4538 4.95307 11.1159 5.66218 10.5602C5.81211 10.4427 5.87182 10.2435 5.81126 10.0629C5.7507 9.88234 5.583 9.75943 5.39255 9.75607C4.68968 9.74366 4.06712 9.39716 3.67793 8.86845C3.86828 8.85306 4.05428 8.82039 4.23445 8.77167C4.43603 8.71716 4.57363 8.53114 4.56674 8.32243C4.55985 8.11372 4.41029 7.93718 4.20555 7.89607C3.42694 7.73977 2.79883 7.16764 2.56169 6.42174C2.76255 6.47025 2.97102 6.4991 3.18482 6.5061C3.38563 6.51267 3.56646 6.38533 3.62795 6.19405C3.68943 6.00277 3.61666 5.79391 3.44963 5.68224C2.86523 5.29155 2.48116 4.62464 2.48116 3.86958C2.48116 3.70213 2.48352 3.55268 2.49355 3.41719C3.85115 4.79913 5.70873 5.68931 7.77588 5.79338C7.93225 5.80126 8.08328 5.73543 8.18395 5.61553C8.28463 5.49562 8.32332 5.33548 8.28851 5.18284C8.25255 5.02517 8.23336 4.86284 8.23336 4.69629C8.23336 3.52085 9.18591 2.56857 10.36 2.56857C11.5943 2.56857 12.4956 3.71208 12.4956 5.00079C12.4956 8.25709 10.0202 11.9746 5.52122 11.9746Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                    <Link
                      href="https://github.com/leira-sanchez"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit Leira's profile on GitHub"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                    <Dialog onOpenChange={setIsOpen}>
                      <DialogTrigger asChild className="cursor-pointer">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </DialogTrigger>
                      <ContactForm open={isOpen} />
                    </Dialog>
                  </p>
                </div>
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
                width="100"
                height="140"
                className="w-full aspect-auto flex max-w-fit"
                alt="Storyworthy cover photo"
              />
              <div className="flex flex-col">
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
        <Card className="max-w-[640px] hidden sm:flex w-full h-auto relative rounded-lg aspect-square">
          <Image
            src="/MofongoJobs_pre18_G6_Headshots-16.jpg"
            alt="brunette profile pic"
            layout="fill"
            className="object-cover object-top rounded-lg p-2"
          />
        </Card>
      </section>
      <Skills />
      <MediaAppearances />
      <Card id="experience" className="w-full flex flex-col">
        <CardHeader className="gap-2 pb-0">
          <span className="text-gray-600 font-bold shadow-sm bg-slate-100 max-w-fit py-1 px-2 rounded-md border">
            ⚡️
          </span>
          <CardTitle>Experience</CardTitle>
          <CardDescription>
            From Mechanical Engineer to Founding Fullstack Engineer
          </CardDescription>
          <Separator />
        </CardHeader>

        {allExperiences}
      </Card>
      <Education />
    </main>
  );
}
