import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Where to Stay in Ngorongoro | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Where to Stay in Ngorongoro" path="/safaris/ngorongoro/where-to-stay" section="Safaris" />
  );
}
