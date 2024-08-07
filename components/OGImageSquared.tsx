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
    <div className="w-[600px] h-[600px] border border-gray-300 rounded-lg overflow-hidden font-sans flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
        <Image
          src="/MofongoJobs_pre18_G6_Headshots-16.jpg"
          alt="Profile"
          width={192}
          height={192}
          className="object-cover"
        />
      </div>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-2">{description}</p>
        <h2 className="text-sm text-gray-600">Founder at MofongoJobs.com</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
          React
        </span>
        <span className="bg-green-200 text-green-800 text-sm font-semibold px-3 py-1 rounded">
          Node.js
        </span>
        <span className="bg-purple-200 text-purple-800 text-sm font-semibold px-3 py-1 rounded">
          TypeScript
        </span>
        <span className="bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded">
          Tailwind
        </span>
      </div>
      <p className="text-sm text-gray-600">
        <em>leirasanchez.com</em>
      </p>
    </div>
  );
}
