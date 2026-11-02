import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Meet the Roarers | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Meet the Roarers" path="/team" section="Main" />
  );
}
