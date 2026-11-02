import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Where to Stay in the Serengeti | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Where to Stay in the Serengeti" path="/safaris/serengeti/where-to-stay" section="Safaris" />
  );
}
