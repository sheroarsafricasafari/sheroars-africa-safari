import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Safari and Beach Combo | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Safari and Beach Combo" path="/zanzibar/safari-and-beach" section="Zanzibar" />
  );
}
