import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Success Rates | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Success Rates" path="/kilimanjaro/guide/success-rates" section="Kilimanjaro" />
  );
}
