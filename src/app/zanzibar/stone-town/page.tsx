import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Stone Town | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Stone Town" path="/zanzibar/stone-town" section="Zanzibar" />
  );
}
