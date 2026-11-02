import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Ngorongoro Crater Day Trip | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Ngorongoro Crater Day Trip" path="/day-trips/ngorongoro-crater" section="Day Trips" />
  );
}
