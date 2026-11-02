import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Safaris | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Safaris" path="/safaris" section="Safaris" />
  );
}
