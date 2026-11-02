import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Zanzibar Activities | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Zanzibar Activities" path="/zanzibar/activities" section="Zanzibar" />
  );
}
