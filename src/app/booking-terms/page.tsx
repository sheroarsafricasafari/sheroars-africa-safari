import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Booking Terms and Cancellation Policy | SheRoarsAfricaSafari",
};

export default function Page() {
  return (
    <PagePlaceholder title="Booking Terms and Cancellation Policy" path="/booking-terms" section="Main" />
  );
}
