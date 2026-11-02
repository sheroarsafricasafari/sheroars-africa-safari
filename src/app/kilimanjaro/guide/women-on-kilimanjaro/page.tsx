import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Women on Kilimanjaro | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Women on Kilimanjaro" path="/kilimanjaro/guide/women-on-kilimanjaro" section="Kilimanjaro" />
  );
}
