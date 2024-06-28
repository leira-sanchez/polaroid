import Link from "next/link";
import { FC } from "react";

interface ExperienceItemProps {
  jobTitle: string;
  company: string;
  duration: string;
  responsibilities: string[];
  links?: {
    web?: string;
    ios?: string;
    android?: string;
  };
}

const ExperienceItem: FC<ExperienceItemProps> = ({
  jobTitle,
  company,
  duration,
  responsibilities,
  links,
}) => {
  return (
    <div className="max-w-full p-6 ">
      <div className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-bold">{company}</h4>
            <p className="text-md italic text-gray-600">{jobTitle}</p>
          </div>
          <div className="text-right text-gray-600">
            <p>{duration}</p>
          </div>
        </div>
      </div>
      <div>
        <ul className="list-disc pl-4 list-inside space-y-2 text-gray-700">
          {responsibilities?.map((responsibility: string) => (
            <li key={responsibility}>{responsibility}</li>
          ))}

          {links && links.web ? (
            <li>
              <Link
                className="hover:underline text-violet-600"
                href={links?.web}
              >
                {links?.web}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceItem;
