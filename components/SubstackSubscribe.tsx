import { SUBSTACK_URL } from "@/constants/substack";

export default function SubstackSubscribe({
  centered = false,
  lazy = false,
}: {
  centered?: boolean;
  lazy?: boolean;
}) {
  return (
    <div className={`w-full max-w-[480px] ${centered ? "mx-auto" : "mx-auto sm:mx-0"}`}>
      <iframe
        src={`${SUBSTACK_URL}/embed`}
        title="Subscribe to the newsletter on Substack"
        width="480"
        height="320"
        className="w-full rounded-lg border border-gray-200 bg-white"
        loading={lazy ? "lazy" : "eager"}
      />
      <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:justify-start">
        <a
          href={`${SUBSTACK_URL}/subscribe`}
          className="text-violet-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe on Substack
        </a>
        <a
          href={`${SUBSTACK_URL}/feed`}
          className="text-violet-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe via RSS
        </a>
      </div>
    </div>
  );
}
