import PagePlaceholder from "@/components/ui/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: "Learn about She Roars Africa Safari, a women-led Tanzania-based travel company.",
  path: "/about",
});

export default function Page() {
  return (
    <PagePlaceholder title="About Us" path="/about" section="Main" />
  );
}
