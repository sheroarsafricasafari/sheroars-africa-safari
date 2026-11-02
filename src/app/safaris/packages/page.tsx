import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Safari Packages | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Safari Packages" path="/safaris/packages" section="Safaris" />
  );
}
