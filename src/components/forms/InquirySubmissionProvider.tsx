"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { InquiryFormValues } from "@/types/inquiry";

type InquirySubmissionContextValue = {
  submitInquiry: (values: InquiryFormValues) => Promise<void>;
};

const InquirySubmissionContext = createContext<InquirySubmissionContextValue | null>(null);

export function useInquirySubmission() {
  const context = useContext(InquirySubmissionContext);
  if (!context) throw new Error("useInquirySubmission must be used within InquirySubmissionProvider.");
  return context;
}

export default function InquirySubmissionProvider({ children }: { children: ReactNode }) {
  const submitInquiry = async () => {
    // TODO(CONNECT): Send this inquiry to the approved booking system or API.
    await Promise.resolve();
  };

  return (
    <InquirySubmissionContext.Provider value={{ submitInquiry }}>
      {children}
    </InquirySubmissionContext.Provider>
  );
}
