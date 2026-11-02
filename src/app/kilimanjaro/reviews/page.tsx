import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Climber Reviews | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Climber Reviews" path="/kilimanjaro/reviews" section="Kilimanjaro" />
  );
}
