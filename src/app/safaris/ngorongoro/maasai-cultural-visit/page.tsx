import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Maasai Cultural Visit | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Maasai Cultural Visit" path="/safaris/ngorongoro/maasai-cultural-visit" section="Safaris" />
  );
}
