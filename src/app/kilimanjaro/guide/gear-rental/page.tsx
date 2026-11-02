import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Gear Rental | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Gear Rental" path="/kilimanjaro/guide/gear-rental" section="Kilimanjaro" />
  );
}
