import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Maasai Boma Cultural Tour | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Maasai Boma Cultural Tour" path="/day-trips/maasai-boma-cultural-tour" section="Day Trips" />
  );
}
