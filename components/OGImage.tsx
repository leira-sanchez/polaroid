import React from "react";
import Image from "next/image";

interface OGImagePreviewProps {
  title?: string;
  description?: string;
}

export default function OGImagePreview({
  title = "Leira C Sánchez Quiñones",
  description = "Senior Full Stack Software Engineer",
}: OGImagePreviewProps) {
  return (
    <div className="w-[600px] h-[315px] border border-gray-300 rounded-lg overflow-hidden font-sans flex items-center justify-between p-5 bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="flex-1 mr-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-2.5">{title}</h1>
        {description && (
          <p className="text-base text-gray-600 mb-3">{description}</p>
        )}
        <h2 className="text-sm text-gray-600 mb-3">
          Founder at MofongoJobs.com
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            React
          </span>
          <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded">
            Node.js
          </span>
          <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
            TypeScript
          </span>
          <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
            Tailwind
          </span>
        </div>
      </div>
      <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src="/MofongoJobs_pre18_G6_Headshots-16.jpg"
          alt="Profile"
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
    </div>
  );
}
