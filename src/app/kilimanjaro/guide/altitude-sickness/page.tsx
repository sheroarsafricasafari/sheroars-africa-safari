import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Altitude Sickness on Kilimanjaro | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Altitude Sickness on Kilimanjaro" path="/kilimanjaro/guide/altitude-sickness" section="Kilimanjaro" />
  );
}
