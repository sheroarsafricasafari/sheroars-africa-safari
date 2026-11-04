import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

type BreadcrumbItem = {
  title: string;
  href: string;
};

const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: MetadataInput): Metadata {
  const imageUrl = image ? absoluteUrl(image) : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Women-led safaris, Kilimanjaro climbs and Zanzibar escapes across Tanzania.",
    areaServed: "Tanzania",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arusha",
      addressCountry: "TZ",
    },
    sameAs: Object.values(siteConfig.socials).filter((url) => !url.includes("replace-this")),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.shortName,
    url: siteConfig.url,
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  excerpt: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: absoluteUrl(article.path),
    image: article.image ? absoluteUrl(article.image) : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
  };
}

export function buildTouristTripJsonLd(trip: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.description,
    url: absoluteUrl(trip.path),
    image: trip.image ? absoluteUrl(trip.image) : undefined,
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
  };
}
