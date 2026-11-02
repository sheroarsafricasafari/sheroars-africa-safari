import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Terms and Conditions | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Terms and Conditions" path="/terms" section="Main" />
  );
}
