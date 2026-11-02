import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Central Serengeti (Seronera) | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Central Serengeti (Seronera)" path="/safaris/serengeti/central-seronera" section="Safaris" />
  );
}
