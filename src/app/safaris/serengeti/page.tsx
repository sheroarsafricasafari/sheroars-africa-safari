import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Serengeti National Park | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Serengeti National Park" path="/safaris/serengeti" section="Safaris" />
  );
}
