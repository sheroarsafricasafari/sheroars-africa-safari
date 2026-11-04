import { Mail, MessageCircle, Phone } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";
import PageHero from "@/components/inner/PageHero";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with She Roars Africa Safari about your safari planning, Kilimanjaro climb, Zanzibar escape or general travel questions.",
  path: "/contact",
});

export default function Page() {
  return (
    <main className="bg-cream">
      <PageHero
        eyebrow="Contact us"
        title="We are here to help you travel well"
        subtitle="Whether you are planning a first Tanzania safari, preparing for Kilimanjaro or looking for a beach escape, we are ready to help."
        image={{ src: "/images/home/about-main.avif", alt: "A warm Tanzanian landscape and welcoming team" }}
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Contact", href: "/contact" }]}
        badges={["Fast replies", "Personal support", "Travel guidance"]}
      />

      <section className="py-12 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="rounded-[28px] border border-sand bg-white p-5 shadow-soft md:p-8">
            <InquiryForm variant="contact" />
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft">
              <p className="text-eyebrow text-terracotta">Contact details</p>
              <h2 className="mt-3 font-heading text-2xl text-earth">Talk to our team</h2>
              <div className="mt-5 space-y-4 text-sm text-muted">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl border border-sand p-3 hover:border-terracotta/40 hover:bg-cream">
                  <Mail className="size-5 text-terracotta" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
                <a href={`tel:${siteConfig.phoneTel}`} className="flex items-center gap-3 rounded-2xl border border-sand p-3 hover:border-terracotta/40 hover:bg-cream">
                  <Phone className="size-5 text-terracotta" aria-hidden="true" />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
                <a href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} className="flex items-center gap-3 rounded-2xl border border-sand p-3 hover:border-terracotta/40 hover:bg-cream">
                  <MessageCircle className="size-5 text-terracotta" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft">
              <p className="text-eyebrow text-terracotta">Response time</p>
              <p className="mt-3 text-lg font-semibold text-earth">We usually reply {siteConfig.responseTime}.</p>
              <p className="mt-2 text-sm leading-6 text-muted">Share your rough plans and we will guide you toward the best route, season and style for your trip.</p>
              <Button href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} variant="primary" className="mt-5 w-full" size="lg">
                <MessageCircle aria-hidden="true" size={18} />
                WhatsApp us now
              </Button>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
