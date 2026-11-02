import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Materuni Waterfalls and Coffee Tour | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Materuni Waterfalls and Coffee Tour" path="/day-trips/materuni-waterfalls-and-coffee" section="Day Trips" />
  );
}
