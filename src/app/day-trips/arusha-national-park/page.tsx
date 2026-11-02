import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Arusha National Park Day Trip | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Arusha National Park Day Trip" path="/day-trips/arusha-national-park" section="Day Trips" />
  );
}
