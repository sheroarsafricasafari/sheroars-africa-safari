import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Travel Guide | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Travel Guide" path="/travel-guide" section="Travel Guide" />
  );
}
