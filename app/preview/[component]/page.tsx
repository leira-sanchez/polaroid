import Preview from "../../../components/Preview";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  return <Preview component={component} />;
}
