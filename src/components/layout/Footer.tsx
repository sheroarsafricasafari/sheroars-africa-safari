import Link from "next/link";
import { siteConfig, footerLinks } from "@/data/site";
import Logo from "@/components/layout/Logo";
import SocialIcon from "@/components/layout/SocialIcon";
import NewsletterForm from "@/components/layout/NewsletterForm";
import CurrentYear from "@/components/ui/CurrentYear";

const socials = [
  ["instagram", siteConfig.socials.instagram],
  ["facebook", siteConfig.socials.facebook],
  ["tiktok", siteConfig.socials.tiktok],
  ["youtube", siteConfig.socials.youtube],
] as const;

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-gold">{title}</h2>
      <ul className="grid gap-3 text-sm text-cream/80">
        {links.map((link) => <li key={link.href}><Link className="hover:text-gold" href={link.href}>{link.label}</Link></li>)}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-6 text-cream/75">A women-led travel company crafting safaris, Kilimanjaro climbs and Zanzibar escapes across Tanzania.</p>
            <div className="mt-5 flex gap-4">
              {socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Follow us on ${name}`} className="text-cream/80 hover:text-gold"><SocialIcon name={name} className="size-5" /></a>)}
            </div>
            <NewsletterForm />
          </div>
          <LinkColumn title="Safaris" links={footerLinks.safaris} />
          <LinkColumn title="Kilimanjaro and More" links={footerLinks.more} />
          <div>
            <LinkColumn title="Company" links={footerLinks.company} />
            <div className="mt-6 grid gap-2 text-sm text-cream/75">
              <p>{siteConfig.address}</p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-gold">{siteConfig.phoneDisplay}</a>
              <a href={siteConfig.whatsappUrlWithMessage(siteConfig.defaultWhatsappMessage)} className="hover:text-gold">WhatsApp us</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3 border-y border-white/15 py-5">
          {/* TODO(REPLACE): replace this licence/membership badge placeholder with verified logos. */}
          <span className="rounded-lg border border-gold/50 px-4 py-2 text-xs text-cream/70">Licence / membership badge (add logo)</span>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-xs text-cream/65 md:flex-row md:items-center md:justify-between">
          <p>© <CurrentYear /> SheRoarsAfricaSafari. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms</Link>
            <Link href="/booking-terms" className="hover:text-gold">Booking Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
