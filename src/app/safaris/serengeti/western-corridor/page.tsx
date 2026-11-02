import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Western Corridor (Grumeti) | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Western Corridor (Grumeti)" path="/safaris/serengeti/western-corridor" section="Safaris" />
  );
}
