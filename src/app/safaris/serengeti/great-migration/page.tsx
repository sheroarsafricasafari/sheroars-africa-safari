import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "The Great Migration | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="The Great Migration" path="/safaris/serengeti/great-migration" section="Safaris" />
  );
}
