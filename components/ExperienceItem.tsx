import { FC } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Separator } from "./ui/separator";
interface ExperienceItemProps {
  company: string;
  duration: string;
  isLast?: boolean;
  jobTitle: string;
  isSamePrevCompany: boolean;
  isSameNextCompany: boolean;
  responsibilities: string[];
  links?: {
    web?: string;
    ios?: string;
    android?: string;
  };
}

const ExperienceItem: FC<ExperienceItemProps> = ({
  company,
  duration,
  isLast,
  jobTitle,
  links,
  responsibilities,
  isSamePrevCompany,
  isSameNextCompany,
}) => {
  return (
    <div className="max-w-full px-6 pt-6 ">
      <div className="pb-2">
        <div className="flex flex-col justify-between items-center">
          {!isSamePrevCompany && (
            <h4 className="text-lg text-left w-full font-bold">{company}</h4>
          )}
          <div className="flex flex-col sm:flex-row gap-2 mb-2 justify-between w-full text-gray-600">
            <p className="text-md italic text-gray-600">{jobTitle}</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>
      <div className={`${isLast ? "mb-4" : ""}`}>
        <ul className="list-disc sm:pl-4 list-inside space-y-2 text-gray-700">
          {responsibilities?.map((responsibility: string) => (
            <li key={responsibility}>
              <Markdown
                className="inline"
                components={{
                  p: ({ node, ...props }) => <span {...props} />,
                }}
                rehypePlugins={[rehypeRaw]}
              >
                {responsibility}
              </Markdown>
            </li>
          ))}

          {links && links.web ? (
            <li className=" list-none">
              <Link
                className="text-wrap break-words hover:underline text-violet-600"
                href={links?.web}
              >
                {links?.web}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      {!isLast && !isSamePrevCompany && !isSameNextCompany && (
        <Separator className="mt-4" />
      )}
    </div>
  );
};

export default ExperienceItem;
