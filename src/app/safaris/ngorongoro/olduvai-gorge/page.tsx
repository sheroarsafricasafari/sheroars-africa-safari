import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Olduvai Gorge | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Olduvai Gorge" path="/safaris/ngorongoro/olduvai-gorge" section="Safaris" />
  );
}
