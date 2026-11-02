import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Chemka Hot Springs | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Chemka Hot Springs" path="/day-trips/chemka-hot-springs" section="Day Trips" />
  );
}
