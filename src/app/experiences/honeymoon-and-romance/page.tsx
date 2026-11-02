import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Honeymoon and Romance Safaris | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Honeymoon and Romance Safaris" path="/experiences/honeymoon-and-romance" section="Experiences" />
  );
}
