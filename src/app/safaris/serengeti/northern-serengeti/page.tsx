import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Northern Serengeti (Mara River) | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Northern Serengeti (Mara River)" path="/safaris/serengeti/northern-serengeti" section="Safaris" />
  );
}
