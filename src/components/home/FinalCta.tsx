import { MessageCircle } from "lucide-react";
import { homeCopy } from "@/data/home";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";

export default function FinalCta() {
  return (
    <div className="relative isolate flex min-h-[440px] items-center justify-center overflow-hidden bg-forest py-20 text-center text-white">
      <SmartImage src="/images/home/cta-banner.webp" alt="Warm sunset light across Tanzania's wild landscape" sizes="100vw" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-terracotta/75 via-earth/55 to-forest/85" />
      <Container className="relative max-w-3xl">
        <h2 className="text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{homeCopy.finalCta.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/85">{homeCopy.finalCta.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/plan-your-safari" variant="light" size="lg">Plan My Safari</Button>
          <Button href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20She%20Roars%20Africa%20Safari`} variant="outline-light" size="lg">
            <MessageCircle aria-hidden="true" size={18} />Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </div>
  );
}
