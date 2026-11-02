import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Prison Island | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Prison Island" path="/zanzibar/activities/prison-island" section="Zanzibar" />
  );
}
