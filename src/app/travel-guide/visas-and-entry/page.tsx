import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Visas and Entry Requirements | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Visas and Entry Requirements" path="/travel-guide/visas-and-entry" section="Travel Guide" />
  );
}
