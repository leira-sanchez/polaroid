import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="w-full bg-[#f5f5f9] py-12 md:py-24 lg:py-32">
        <div className="container flex items-center justify-between gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <Image
            src="/the-sim.webp"
            alt="Hero Image"
            width={400}
            height={400}
            className="mx-auto aspect-square  overflow-hidden rounded-xl object-cover"
            loading="lazy"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              We're Here for a Good Time
            </h1>
            <p className=" md:text-xl">
              Entrepreneurship, Puerto Rican culture, tech, and more — embrace
              the journey in Spanglish
            </p>
            <iframe
              src="https://embeds.beehiiv.com/6dc2b7d7-575b-4bef-977b-9779d4fd87e8?slim=true"
              data-test-id="beehiiv-embed"
              height="52"
              frameBorder="0"
              scrolling="no"
              className="m-0 rounded-none bg-transparent"
            ></iframe>
          </div>
        </div>
      </section>
      <div className="bg-white">{children}</div>
    </>
  );
}
