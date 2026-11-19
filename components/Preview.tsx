"use client";
import type { ComponentType } from "react";
import dynamic from "next/dynamic";

const previews: Record<string, ComponentType<any>> = {
  CurrentlyReadingCard: dynamic(() => import("./CurrentlyReadingCard"), { ssr: false, loading: () => <div>Loading component...</div> }),
  HotJar: dynamic(() => import("./HotJar"), { ssr: false, loading: () => <div>Loading component...</div> }),
  OGImageSquared: dynamic(() => import("./OGImageSquared"), { ssr: false, loading: () => <div>Loading component...</div> }),
  MediaAppearances: dynamic(() => import("./MediaAppearances"), { ssr: false, loading: () => <div>Loading component...</div> }),
  OGImage: dynamic(() => import("./OGImage"), { ssr: false, loading: () => <div>Loading component...</div> }),
  SubstackSubscribe: dynamic(() => import("./SubstackSubscribe"), { ssr: false, loading: () => <div>Loading component...</div> }),
  ContactForm: dynamic(() => import("./ContactForm"), { ssr: false, loading: () => <div>Loading component...</div> }),
  Skills: dynamic(() => import("./Skills"), { ssr: false, loading: () => <div>Loading component...</div> }),
  Education: dynamic(() => import("./Education"), { ssr: false, loading: () => <div>Loading component...</div> }),
  ExperienceItem: dynamic(() => import("./ExperienceItem"), { ssr: false, loading: () => <div>Loading component...</div> }),
};

const Preview = ({ component }: { component: string }) => {
  const DynamicComponent = previews[component];
  if (!DynamicComponent) return <div>No component specified or unknown component</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Preview: {component}</h1>
      <div className="border p-4 rounded-lg">
        <DynamicComponent />
      </div>
    </div>
  );
};

export default Preview;
