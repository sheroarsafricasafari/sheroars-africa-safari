import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Safari Packing List | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Safari Packing List" path="/travel-guide/packing-list" section="Travel Guide" />
  );
}
