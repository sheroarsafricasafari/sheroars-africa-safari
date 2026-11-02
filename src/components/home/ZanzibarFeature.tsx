import Link from "next/link";
import { Anchor, CheckCircle2, Sparkles } from "lucide-react";
import { homeCopy, zanzibar } from "@/data/home";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";

const featureIcons = [Anchor, Sparkles, CheckCircle2];

export default function ZanzibarFeature() {
  return (
    <Container>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative pb-7 pr-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[42%_58%_55%_45%/48%_44%_56%_52%] shadow-xl">
            <SmartImage src="/images/home/zanzibar.jpg" alt="Turquoise water and white-sand beach in Zanzibar" sizes="(max-width: 1024px) 90vw, 45vw" fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 max-w-56 rounded-2xl bg-white p-4 text-center text-sm font-bold text-earth shadow-xl">Safari + Beach combos available</div>
        </Reveal>
        <Reveal>
          <SectionHeading {...homeCopy.zanzibarHeading} align="left" />
          <p className="leading-7 text-muted">{zanzibar.paragraph}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {zanzibar.places.map((place) => <Link key={place.href} href={place.href} className="rounded-full border border-terracotta/40 px-4 py-2 text-sm font-medium text-terracotta hover:bg-terracotta hover:text-white">{place.label}</Link>)}
          </div>
          <ul className="mt-6 grid gap-3">
            {zanzibar.features.map((feature, index) => {
              const FeatureIcon = featureIcons[index];
              return <li key={feature} className="flex items-center gap-3 text-sm font-medium"><FeatureIcon aria-hidden="true" className="size-5 text-terracotta" />{feature}</li>;
            })}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/zanzibar">Explore Zanzibar</Button>
            <Button href="/zanzibar/safari-and-beach" variant="ghost">Safari and Beach Packages</Button>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
