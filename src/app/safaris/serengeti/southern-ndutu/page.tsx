import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Southern Serengeti (Ndutu) | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Southern Serengeti (Ndutu)" path="/safaris/serengeti/southern-ndutu" section="Safaris" />
  );
}
