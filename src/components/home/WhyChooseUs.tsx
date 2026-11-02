import { whyChooseUs, homeCopy } from "@/data/home";
import * as Lucide from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, Lucide.LucideIcon> = {
  "users-round": Lucide.UsersRound,
  "shield-check": Lucide.ShieldCheck,
  compass: Lucide.Compass,
  map: Lucide.Map,
  "heart-handshake": Lucide.HeartHandshake,
  "map-pinned": Lucide.MapPinned,
};

export default function WhyChooseUs() {
  return (
    <Container>
      <SectionHeading {...homeCopy.whyHeading} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item) => {
          const IconComponent = iconMap[item.icon] ?? Lucide.Compass;
          return (
            <Reveal key={item.title} className="rounded-2xl border border-sand bg-white p-6 shadow-[0_8px_24px_rgba(42,31,23,0.05)] transition-transform hover:-translate-y-1">
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-full bg-gold/20 text-terracotta"><IconComponent aria-hidden="true" size={23} /></span>
              <h3 className="font-heading text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-9 text-center"><Button href="/why-she-roars" variant="secondary">Discover Why She Roars</Button></div>
    </Container>
  );
}
