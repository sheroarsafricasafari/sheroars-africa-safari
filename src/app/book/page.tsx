import { MessageCircle } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";
import PageHero from "@/components/inner/PageHero";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Your Trip",
  description: "Request your safari, Kilimanjaro climb or Zanzibar escape and share the details we need to confirm your journey.",
  path: "/book",
});

export default function Page() {
  return (
    <main className="bg-cream">
      <PageHero
        eyebrow="Book your trip"
        title="Ready to lock in your Tanzania adventure?"
        subtitle="Share the details of your ideal route, dates and travelers and we will confirm the next steps with you."
        image={{ src: "/images/home/cta-banner.webp", alt: "Warm African sunset across a wild landscape" }}
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Book your trip", href: "/book" }]}
        badges={["Secure your dates", "Tailor-made", "Women-led support"]}
      />

      <section className="py-12 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="rounded-[28px] border border-sand bg-white p-5 shadow-soft md:p-8">
            <InquiryForm variant="book" />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft">
              <p className="text-eyebrow text-terracotta">Before you book</p>
              <h2 className="mt-3 font-heading text-2xl text-earth">We can help you finalise the right package.</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                <li>Confirm your preferred departure date and route.</li>
                <li>Choose your ideal accommodation and rooming style.</li>
                <li>Tell us any milestones, dietary needs or travel preferences.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft">
              <p className="text-eyebrow text-terracotta">Chat with us</p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <p>Email: <a href={`mailto:${siteConfig.email}`} className="font-semibold text-terracotta underline">{siteConfig.email}</a></p>
                <p>WhatsApp: <a href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} className="font-semibold text-terracotta underline">{siteConfig.phoneDisplay}</a></p>
              </div>
              <Button href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} variant="primary" className="mt-5 w-full" size="lg">
                <MessageCircle aria-hidden="true" size={18} />
                Send a WhatsApp message
              </Button>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
