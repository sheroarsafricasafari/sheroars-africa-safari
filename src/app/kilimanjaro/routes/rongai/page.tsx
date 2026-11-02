import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Rongai Route | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Rongai Route" path="/kilimanjaro/routes/rongai" section="Kilimanjaro" />
  );
}
