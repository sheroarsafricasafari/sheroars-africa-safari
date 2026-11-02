import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";
import { homeCopy } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPreview() {
  return (
    <>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={homeCopy.faqHeading.eyebrow} title={homeCopy.faqHeading.title} align="left" />
            <p className="mb-6 max-w-md leading-7 text-muted">Planning your journey should feel exciting. Here are a few answers to help you get started.</p>
            <Button href="/faq" variant="secondary">See All FAQs</Button>
          </Reveal>
          <div className="divide-y divide-sand rounded-2xl border border-sand bg-white px-5">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-semibold marker:hidden">
                  {faq.question}<ChevronDown aria-hidden="true" className="size-5 shrink-0 text-terracotta transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-2 pt-3 text-sm leading-6 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
