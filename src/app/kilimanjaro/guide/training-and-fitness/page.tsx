import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kilimanjaro Training and Fitness | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Kilimanjaro Training and Fitness" path="/kilimanjaro/guide/training-and-fitness" section="Kilimanjaro" />
  );
}
