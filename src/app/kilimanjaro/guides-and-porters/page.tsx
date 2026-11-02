import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Guides and Porters | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Guides and Porters" path="/kilimanjaro/guides-and-porters" section="Kilimanjaro" />
  );
}
