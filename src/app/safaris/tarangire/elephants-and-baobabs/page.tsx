import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Tarangire Elephants and Baobabs | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Tarangire Elephants and Baobabs" path="/safaris/tarangire/elephants-and-baobabs" section="Safaris" />
  );
}
