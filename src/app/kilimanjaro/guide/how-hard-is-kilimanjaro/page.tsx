import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "How Hard Is Kilimanjaro? | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="How Hard Is Kilimanjaro?" path="/kilimanjaro/guide/how-hard-is-kilimanjaro" section="Kilimanjaro" />
  );
}
