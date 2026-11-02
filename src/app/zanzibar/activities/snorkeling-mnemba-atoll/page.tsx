import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Snorkeling at Mnemba Atoll | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Snorkeling at Mnemba Atoll" path="/zanzibar/activities/snorkeling-mnemba-atoll" section="Zanzibar" />
  );
}
