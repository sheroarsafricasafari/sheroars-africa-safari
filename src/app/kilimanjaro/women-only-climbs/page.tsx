import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Women-Only Kilimanjaro Climbs | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Women-Only Kilimanjaro Climbs" path="/kilimanjaro/women-only-climbs" section="Kilimanjaro" />
  );
}
