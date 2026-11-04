"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InquiryForm from "./InquiryForm";
import type { InquiryFormValues } from "@/types/inquiry";

function PrefilledForm() {
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");
  const validInterests = new Set<InquiryFormValues["interest"]>([
    "safari", "kilimanjaro", "zanzibar", "safari-and-beach", "day-trip",
    "family", "honeymoon", "private-journey", "other",
  ]);
  const initialValues: Partial<InquiryFormValues> = {
    interest: interest && validInterests.has(interest as InquiryFormValues["interest"]) ? interest as InquiryFormValues["interest"] : undefined,
    packageSlug: searchParams.get("package")?.slice(0, 120) ?? "",
    message: searchParams.get("message")?.slice(0, 2000) ?? "",
  };

  return <InquiryForm initialValues={initialValues} />;
}

export default function InquiryFormWithPrefill() {
  return (
    <Suspense fallback={<InquiryForm />}>
      <PrefilledForm />
    </Suspense>
  );
}
