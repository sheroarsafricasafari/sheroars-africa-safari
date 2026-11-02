import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Solo Women Travelers | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Solo Women Travelers" path="/experiences/solo-women-travelers" section="Experiences" />
  );
}
