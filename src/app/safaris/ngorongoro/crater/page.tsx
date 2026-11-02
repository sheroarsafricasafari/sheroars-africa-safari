import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Ngorongoro Crater | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Ngorongoro Crater" path="/safaris/ngorongoro/crater" section="Safaris" />
  );
}
