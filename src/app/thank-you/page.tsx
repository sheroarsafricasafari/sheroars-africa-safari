import PagePlaceholder from "@/components/ui/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Thank you for contacting She Roars Africa Safari.",
  path: "/thank-you",
  noIndex: true,
});

export default function Page() {
  return (
    <PagePlaceholder title="Thank You" path="/thank-you" section="Main" />
  );
}
