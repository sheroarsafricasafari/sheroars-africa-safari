import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Permits, Park Fees and Visas | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Permits, Park Fees and Visas" path="/kilimanjaro/guide/permits-park-fees-and-visas" section="Kilimanjaro" />
  );
}
