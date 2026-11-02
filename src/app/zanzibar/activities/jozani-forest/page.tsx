import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Jozani Forest | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Jozani Forest" path="/zanzibar/activities/jozani-forest" section="Zanzibar" />
  );
}
