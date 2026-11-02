import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Sunset Dhow Cruise | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Sunset Dhow Cruise" path="/zanzibar/activities/sunset-dhow-cruise" section="Zanzibar" />
  );
}
