import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Spice Tour | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Spice Tour" path="/zanzibar/activities/spice-tour" section="Zanzibar" />
  );
}
