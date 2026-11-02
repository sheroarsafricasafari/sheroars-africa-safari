import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Food and Camping on Kilimanjaro | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Food and Camping on Kilimanjaro" path="/kilimanjaro/guide/food-and-camping" section="Kilimanjaro" />
  );
}
