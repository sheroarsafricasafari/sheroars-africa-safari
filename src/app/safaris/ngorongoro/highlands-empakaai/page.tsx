import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Ngorongoro Highlands and Empakaai Crater | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Ngorongoro Highlands and Empakaai Crater" path="/safaris/ngorongoro/highlands-empakaai" section="Safaris" />
  );
}
