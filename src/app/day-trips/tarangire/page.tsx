import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Tarangire Day Trip | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Tarangire Day Trip" path="/day-trips/tarangire" section="Day Trips" />
  );
}
