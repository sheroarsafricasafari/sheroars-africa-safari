import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Best Time to Visit Tanzania | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Best Time to Visit Tanzania" path="/travel-guide/best-time-to-visit" section="Travel Guide" />
  );
}
