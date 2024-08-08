import Preview from "../../../components/Preview";

export default function PreviewPage({
  params,
}: {
  params: { component: string };
}) {
  return <Preview component={params.component} />;
}
