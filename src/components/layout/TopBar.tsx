import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import SocialIcon from "@/components/layout/SocialIcon";

const socialEntries = [
  ["instagram", siteConfig.socials.instagram],
  ["facebook", siteConfig.socials.facebook],
  ["tiktok", siteConfig.socials.tiktok],
  ["youtube", siteConfig.socials.youtube],
] as const;

export default function TopBar() {
  return (
    <div className="hidden bg-forest text-cream md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs">
        <div className="flex items-center gap-5">
          <a className="inline-flex items-center gap-2 hover:text-gold" href={`mailto:${siteConfig.email}`}><Mail size={13} />{siteConfig.email}</a>
          <a className="inline-flex items-center gap-2 hover:text-gold" href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}><Phone size={13} />{siteConfig.phone}</a>
          <a className="inline-flex items-center gap-2 hover:text-gold" href={`https://wa.me/${siteConfig.whatsappNumber}`}><SocialIcon name="whatsapp" className="size-3.5" /> WhatsApp</a>
        </div>
        <div className="flex items-center gap-3">
          {socialEntries.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Follow us on ${name}`} className="hover:text-gold">
              <SocialIcon name={name} className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
