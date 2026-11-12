import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CtaBanner from "@/components/inner/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import NgorongoroPackageDetail from "@/components/safaris/ngorongoro/NgorongoroPackageDetail";
import SafariPackageExperience from "@/components/safaris/SafariPackageExperience";
import { ngorongoroPackages } from "@/data/ngorongoro-packages";
import { safaris } from "@/data/safaris";
import { siteConfig } from "@/data/site";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...safaris, ...ngorongoroPackages].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const safari = safaris.find((item) => item.slug === slug);
  const ngorongoroPackage = ngorongoroPackages.find((item) => item.slug === slug);
  if (!safari && !ngorongoroPackage) notFound();
  if (ngorongoroPackage) {
    return buildMetadata({
      title: ngorongoroPackage.seo.title,
      description: ngorongoroPackage.seo.description,
      path: `/safaris/packages/${slug}`,
      image: ngorongoroPackage.heroImage.src,
    });
  }
  if (!safari) notFound();
  return buildMetadata({
    title: safari.title,
    description: safari.summary,
    path: `/safaris/packages/${slug}`,
    image: `/images/safaris/${slug}/hero.jpg`,
  });
}

export default function SafariPackagePage({ params }: PageProps) {
  return (
    <Suspense fallback={<div role="status" className="grid min-h-[50svh] place-items-center bg-cream text-muted">Loading safari journey...</div>}>
      <SafariPackageContent params={params} />
    </Suspense>
  );
}

async function SafariPackageContent({ params }: PageProps) {
  const { slug } = await params;
  const ngorongoroPackage = ngorongoroPackages.find((item) => item.slug === slug);
  if (ngorongoroPackage) {
    const breadcrumbItems = [
      { title: "Home", href: "/" },
      { title: "Safaris", href: "/safaris" },
      { title: "Packages", href: "/safaris/packages" },
      { title: ngorongoroPackage.title, href: `/safaris/packages/${slug}` },
    ];
    return (
      <>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: ngorongoroPackage.title,
          description: ngorongoroPackage.seo.description,
          url: `${siteConfig.url}/safaris/packages/${slug}`,
          image: `${siteConfig.url}${ngorongoroPackage.heroImage.src}`,
          itinerary: {
            "@type": "ItemList",
            itemListElement: ngorongoroPackage.itinerary.map((day) => ({
              "@type": "ListItem",
              position: day.day,
              name: day.title,
              description: day.opening,
            })),
          },
          provider: { "@type": "TravelAgency", name: siteConfig.shortName, url: siteConfig.url },
        }} />
        <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ngorongoroPackage.faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }} />
        <NgorongoroPackageDetail
          item={ngorongoroPackage}
          relatedPackages={ngorongoroPackage.relatedPackages.flatMap((relatedSlug) => {
            const related = ngorongoroPackages.find((candidate) => candidate.slug === relatedSlug);
            return related ? [related] : [];
          })}
        />
      </>
    );
  }
  const safari = safaris.find((item) => item.slug === slug);
  if (!safari) notFound();

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Safaris", href: "/safaris" },
    { title: "Packages", href: "/safaris/packages" },
    { title: safari.title, href: `/safaris/packages/${slug}` },
  ];
  const faqItems = [
    ...safari.faqs,
    { question: "Can I customise this itinerary?", answer: "Yes. Every journey is tailor-made." },
    { question: "How do I book?", answer: "Send us an enquiry and we will confirm availability and send a written quote. See our booking page at /book." },
  ];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: safari.title,
        description: safari.summary,
        url: `${siteConfig.url}/safaris/packages/${slug}`,
        image: `${siteConfig.url}/images/safaris/${slug}/hero.jpg`,
        itinerary: {
          "@type": "ItemList",
          itemListElement: safari.dayByDay.map((day) => ({
            "@type": "ListItem",
            position: day.day,
            name: day.title,
            description: day.description,
          })),
        },
        provider: { "@type": "TravelAgency", name: siteConfig.shortName, url: siteConfig.url },
      }} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      }} />
      <SafariPackageExperience
        safari={safari}
        relatedPackages={safari.related.flatMap((relatedSlug) => {
          const item = safaris.find((candidate) => candidate.slug === relatedSlug);
          return item ? [{ slug: item.slug, title: item.title, image: item.image, summary: item.summary }] : [];
        })}
      />
      <CtaBanner
        eyebrow="LET'S MAKE IT YOURS"
        title="Ready to Make This Journey Yours?"
        description="Tell us your dates and dreams and we will design a safari that is entirely yours."
        image={{ src: "/images/safaris/hub/cta.jpg", alt: "Golden light over a Tanzania safari landscape" }}
        primaryCta={{ label: "Enquire About This Journey", href: `/plan-your-safari?package=${slug}` }}
        secondaryCta={{ label: "Chat on WhatsApp", href: siteConfig.whatsappUrlWithMessage(`Hello! I'm interested in the ${safari.title}.`) }}
        parallax
      />
    </>
  );
}
