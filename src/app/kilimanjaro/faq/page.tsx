import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro FAQ | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro FAQ" path="/kilimanjaro/faq" section="Kilimanjaro" />
  );
}
