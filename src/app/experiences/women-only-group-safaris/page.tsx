import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Women-Only Group Safaris | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Women-Only Group Safaris" path="/experiences/women-only-group-safaris" section="Experiences" />
  );
}
