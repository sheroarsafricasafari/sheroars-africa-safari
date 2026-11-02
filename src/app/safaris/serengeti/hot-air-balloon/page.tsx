import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Serengeti Hot Air Balloon Safari | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Serengeti Hot Air Balloon Safari" path="/safaris/serengeti/hot-air-balloon" section="Safaris" />
  );
}
