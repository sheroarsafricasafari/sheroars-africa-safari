import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Health and Vaccinations | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Health and Vaccinations" path="/travel-guide/health-and-vaccinations" section="Travel Guide" />
  );
}
