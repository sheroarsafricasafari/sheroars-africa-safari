import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Tipping Guide | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Tipping Guide" path="/kilimanjaro/guide/tipping-guide" section="Kilimanjaro" />
  );
}
