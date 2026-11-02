import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Getting to Tanzania | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Getting to Tanzania" path="/travel-guide/getting-to-tanzania" section="Travel Guide" />
  );
}
