import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Mto wa Mbu Village Tour | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Mto wa Mbu Village Tour" path="/day-trips/mto-wa-mbu-village-tour" section="Day Trips" />
  );
}
