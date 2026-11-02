import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Private Kilimanjaro Climbs | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Private Kilimanjaro Climbs" path="/kilimanjaro/private-climbs" section="Kilimanjaro" />
  );
}
