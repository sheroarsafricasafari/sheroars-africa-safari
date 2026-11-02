import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Photography Safaris | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Photography Safaris" path="/experiences/photography-safaris" section="Experiences" />
  );
}
