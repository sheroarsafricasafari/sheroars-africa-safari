import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Climb and Zanzibar | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Climb and Zanzibar" path="/kilimanjaro/climb-and-zanzibar" section="Kilimanjaro" />
  );
}
