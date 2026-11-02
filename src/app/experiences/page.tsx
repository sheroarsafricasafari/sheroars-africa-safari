import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Safari Experiences | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Safari Experiences" path="/experiences" section="Experiences" />
  );
}
