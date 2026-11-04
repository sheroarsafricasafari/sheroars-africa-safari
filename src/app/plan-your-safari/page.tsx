import { MessageCircle } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";
import PageHero from "@/components/inner/PageHero";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan Your Safari",
  description: "Tell us about your ideal Tanzania safari, Kilimanjaro climb or Zanzibar escape and we will shape a custom journey.",
  path: "/plan-your-safari",
});

export default function Page() {
  return (
    <main className="bg-cream">
      <PageHero
        eyebrow="Plan your journey"
        title="Build a safari that feels like yours"
        subtitle="Tell us where you want to go, when you want to travel and what matters most to you. We will shape a thoughtful itinerary around your pace, style and budget."
        image={{ src: "/images/destinations/serengeti.jpeg", alt: "Open Serengeti plains at golden hour" }}
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Plan your safari", href: "/plan-your-safari" }]}
        badges={["Tailor-made", "Women-led expertise", "Tanzania-based"]}
      />

      <section className="py-12 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="rounded-[28px] border border-sand bg-white p-5 shadow-soft md:p-8">
            <InquiryForm variant="plan" />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft">
              <p className="text-eyebrow text-terracotta">What happens next</p>
              <h2 className="mt-3 font-heading text-2xl text-earth">A thoughtful plan, not a generic quote.</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                <li>We review your dream route, travel dates and budget.</li>
                <li>We suggest the right mix of parks, lodges and experiences.</li>
                <li>We refine it with you until it feels just right.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft">
              <p className="text-eyebrow text-terracotta">Need a quick answer?</p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <p>Typical response time: <span className="font-semibold text-earth">{siteConfig.responseTime}</span></p>
                <p>Email: <a href={`mailto:${siteConfig.email}`} className="font-semibold text-terracotta underline">{siteConfig.email}</a></p>
                <p>WhatsApp: <a href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} className="font-semibold text-terracotta underline">{siteConfig.phoneDisplay}</a></p>
              </div>
              <Button href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} variant="primary" className="mt-5 w-full" size="lg">
                <MessageCircle aria-hidden="true" size={18} />
                Chat on WhatsApp
              </Button>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
