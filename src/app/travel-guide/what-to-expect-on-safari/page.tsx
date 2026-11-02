import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "What to Expect on Safari | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="What to Expect on Safari" path="/travel-guide/what-to-expect-on-safari" section="Travel Guide" />
  );
}
