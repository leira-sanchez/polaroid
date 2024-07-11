// app/blog/[filename]/page.tsx

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const BlogPage = async ({ params }) => {
  const { filename } = params;

  // Fetch data from TinaCMS
  const data = await fetchDataFromTina(filename);

  return (
    <div>
      <h1>{data.title}</h1>
      <TinaMarkdown content={data.body} />
    </div>
  );
};

const fetchDataFromTina = async (filename) => {
  // Replace this with your actual TinaCMS data fetching logic
  // Example:
  // const res = await fetch(`/api/tina/${filename}`);
  // return res.json();

  // Dummy data for example
  return {
    title: `Title for ${filename}`,
    body: `Body content for ${filename}`,
  };
};

export default BlogPage;
