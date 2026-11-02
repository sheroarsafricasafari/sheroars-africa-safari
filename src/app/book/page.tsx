import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Book Your Trip | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Book Your Trip" path="/book" section="Main" />
  );
}
