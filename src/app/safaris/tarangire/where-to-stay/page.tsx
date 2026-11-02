import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Where to Stay in Tarangire | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Where to Stay in Tarangire" path="/safaris/tarangire/where-to-stay" section="Safaris" />
  );
}
