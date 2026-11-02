import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Safari Tipping Guide | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Safari Tipping Guide" path="/travel-guide/tipping-guide" section="Travel Guide" />
  );
}
