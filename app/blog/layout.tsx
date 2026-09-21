import Image from "next/image";
import SubstackSubscribe from "@/components/SubstackSubscribe";

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
              Tech, startups, entrepreneurship, Puerto Rican culture, and more —
              embrace the journey in Spanglish
            </p>
            <SubstackSubscribe />
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
              Tech, startups, entrepreneurship, Puerto Rican culture, and more —
              embrace the journey in Spanglish
            </p>
            <SubstackSubscribe centered lazy />
          </div>
        </div>
      </section>
    </>
  );
}
