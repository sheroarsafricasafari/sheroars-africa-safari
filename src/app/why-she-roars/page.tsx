import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Why She Roars | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Why She Roars" path="/why-she-roars" section="Main" />
  );
}
