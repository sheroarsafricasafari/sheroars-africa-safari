import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Ngorongoro Conservation Area | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Ngorongoro Conservation Area" path="/safaris/ngorongoro" section="Safaris" />
  );
}
