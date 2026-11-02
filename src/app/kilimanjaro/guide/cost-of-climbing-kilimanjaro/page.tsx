import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Cost of Climbing Kilimanjaro | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Cost of Climbing Kilimanjaro" path="/kilimanjaro/guide/cost-of-climbing-kilimanjaro" section="Kilimanjaro" />
  );
}
