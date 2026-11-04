import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import PageHero from "@/components/inner/PageHero";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Thank you for contacting She Roars Africa Safari. We will be in touch soon.",
  path: "/thank-you",
  noIndex: true,
});

export default function Page() {
  return (
    <main className="bg-cream">
      <PageHero
        eyebrow="Thank you"
        title="Your message is on its way"
        subtitle="We have received your enquiry and our team will get back to you soon with next steps, ideas and recommendations."
        image={{ src: "/images/home/cta-banner.webp", alt: "Warm safari sunset" }}
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Thank you", href: "/thank-you" }]}
        badges={["We reply soon", "Tailor-made help", "Personal guidance"]}
      />

      <section className="py-12 md:py-16">
        <Container className="mx-auto max-w-3xl">
          <div className="rounded-[28px] border border-sand bg-white p-6 shadow-soft md:p-10">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-gold/15 text-terracotta">
              <CheckCircle2 className="size-8" aria-hidden="true" />
            </div>
            <h2 className="font-heading text-3xl text-earth">We are delighted to hear from you.</h2>
            <p className="mt-4 text-base leading-8 text-muted">
              If you would like to continue the conversation right away, you can also send us a WhatsApp message or email us directly.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Button href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} variant="primary" size="lg">
                <MessageCircle aria-hidden="true" size={18} />
                WhatsApp us
              </Button>
              <Button href={`mailto:${siteConfig.email}`} variant="secondary" size="lg">
                <ArrowRight aria-hidden="true" size={18} />
                Email us
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-sand bg-cream p-5 text-sm leading-7 text-muted">
              <p><strong className="text-earth">Email:</strong> {siteConfig.email}</p>
              <p><strong className="text-earth">WhatsApp:</strong> {siteConfig.phoneDisplay}</p>
              <p><strong className="text-earth">Typical reply time:</strong> {siteConfig.responseTime}</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
