import type { Metadata } from "next";
import BlogPreview from "@/components/home/BlogPreview";
import DayTrips from "@/components/home/DayTrips";
import Destinations from "@/components/home/Destinations";
import Experiences from "@/components/home/Experiences";
import FaqPreview from "@/components/home/FaqPreview";
import FeaturedSafaris from "@/components/home/FeaturedSafaris";
import FinalCta from "@/components/home/FinalCta";
import GalleryPreview from "@/components/home/GalleryPreview";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import KilimanjaroFeature from "@/components/home/KilimanjaroFeature";
import OurStory from "@/components/home/OurStory";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import TrustBar from "@/components/home/TrustBar";
import WhenToGo from "@/components/home/WhenToGo";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ZanzibarFeature from "@/components/home/ZanzibarFeature";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: {
    absolute: "SheRoarsAfricaSafari | Women-Led Safaris, Kilimanjaro Climbs and Zanzibar Escapes in Tanzania",
  },
  description: "Women-led safaris in the Serengeti, Ngorongoro and Tarangire, Kilimanjaro climbs and Zanzibar beach escapes. Tailor-made, safe and unforgettable journeys across Tanzania.",
  openGraph: {
    title: "SheRoarsAfricaSafari | Women-Led Safaris, Kilimanjaro Climbs and Zanzibar Escapes in Tanzania",
    description: "Women-led safaris in the Serengeti, Ngorongoro and Tarangire, Kilimanjaro climbs and Zanzibar beach escapes. Tailor-made, safe and unforgettable journeys across Tanzania.",
    images: [{ url: "/images/destinations/serengeti.jpeg", width: 1200, height: 630, alt: "Wild Tanzania, led by women who roar" }],
  },
};

export default function HomePage() {
  return (
    <main>
      <Section id="hero" className="!p-0"><Hero /></Section>
      <Section id="trust" className="!py-8"><TrustBar /></Section>
      <Section id="our-story" background="sand"><OurStory /></Section>
      <Section id="signature-safaris"><FeaturedSafaris /></Section>
      <Section id="destinations" background="sand"><Destinations /></Section>
      <Section id="kilimanjaro" background="forest" className="!p-0"><KilimanjaroFeature /></Section>
      <Section id="why-choose-us"><WhyChooseUs /></Section>
      <Section id="experiences" background="sand"><Experiences /></Section>
      <Section id="when-to-go" background="forest"><WhenToGo /></Section>
      <Section id="zanzibar"><ZanzibarFeature /></Section>
      <Section id="day-trips" background="sand"><DayTrips /></Section>
      <Section id="how-it-works"><HowItWorks /></Section>
      <Section id="testimonials" background="sand"><TestimonialsCarousel /></Section>
      <Section id="gallery"><GalleryPreview /></Section>
      <Section id="travel-guides" background="sand"><BlogPreview /></Section>
      <Section id="faq"><FaqPreview /></Section>
      <Section id="final-cta" className="!p-0"><FinalCta /></Section>
    </main>
  );
}
