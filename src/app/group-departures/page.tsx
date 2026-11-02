import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Group Departures | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Group Departures" path="/group-departures" section="Experiences" />
  );
}
