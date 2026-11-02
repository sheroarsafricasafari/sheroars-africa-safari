import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Family Safaris | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Family Safaris" path="/experiences/family-safaris" section="Experiences" />
  );
}
