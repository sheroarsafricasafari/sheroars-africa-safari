import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Lake Manyara Day Trip | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Lake Manyara Day Trip" path="/day-trips/lake-manyara" section="Day Trips" />
  );
}
