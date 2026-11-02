import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Best Time to Climb Kilimanjaro | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Best Time to Climb Kilimanjaro" path="/kilimanjaro/guide/best-time-to-climb" section="Kilimanjaro" />
  );
}
