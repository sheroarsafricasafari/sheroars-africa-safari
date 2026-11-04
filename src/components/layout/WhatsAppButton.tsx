"use client";

import SocialIcon from "@/components/layout/SocialIcon";
import { siteConfig } from "@/data/site";

export default function WhatsAppButton() {
  const href = siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage);
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-terracotta text-white shadow-xl transition hover:scale-105 hover:bg-terracotta-hover motion-safe:after:absolute motion-safe:after:inset-0 motion-safe:after:animate-ping motion-safe:after:rounded-full motion-safe:after:border-2 motion-safe:after:border-terracotta/50 motion-reduce:after:animate-none">
      <SocialIcon name="whatsapp" className="relative z-10 size-7" />
    </a>
  );
}
