"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Preview = ({ component }: { component: string }) => {
  const searchParams = useSearchParams();

  if (!component) {
    return <div>No component specified</div>;
  }

  const DynamicComponent = dynamic(() => import(`../components/${component}`), {
    loading: () => <div>Loading component...</div>,
    ssr: false,
  });

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
