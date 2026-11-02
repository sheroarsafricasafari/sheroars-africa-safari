import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Lake Duluti Canoeing | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Lake Duluti Canoeing" path="/day-trips/lake-duluti-canoeing" section="Day Trips" />
  );
}
