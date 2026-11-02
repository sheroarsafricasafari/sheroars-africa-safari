import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Climate and Seasons | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Climate and Seasons" path="/travel-guide/climate-and-seasons" section="Travel Guide" />
  );
}
