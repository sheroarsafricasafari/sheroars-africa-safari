import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Lake Manyara National Park | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Lake Manyara National Park" path="/safaris/lake-manyara" section="Safaris" />
  );
}
