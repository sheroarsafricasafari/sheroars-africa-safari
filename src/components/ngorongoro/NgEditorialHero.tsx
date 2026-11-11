import {
  ArrowUpRight,
  Clock3,
  Compass,
  Flower2,
  HandHeart,
  HeartHandshake,
  Mountain,
  PawPrint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/inner/Breadcrumbs";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import type { maasaiPage } from "@/data/ngorongoro-maasai";
import type { ngorongoroStayPage } from "@/data/ngorongoro-stays";
import styles from "./NgHero.module.css";

type EditorialHeroData = typeof maasaiPage.hero | typeof ngorongoroStayPage.hero;

const icons: Record<string, LucideIcon> = {
  consent: ShieldCheck,
  community: HeartHandshake,
  exchange: HandHeart,
  landscape: Mountain,
  garden: Flower2,
  compass: Compass,
  clock: Clock3,
  weather: Sparkles,
  wildlife: PawPrint,
};

export default function NgEditorialHero({
  data,
  breadcrumbs,
  mood,
}: {
  data: EditorialHeroData;
  breadcrumbs: readonly { title: string; href: string }[];
  mood: "sunrise" | "mist";
}) {
  return (
    <section aria-labelledby="editorial-hero-title" className={`relative isolate flex min-h-[88svh] items-end overflow-hidden text-white md:min-h-[92svh] ${mood === "sunrise" ? "bg-earth" : "bg-forest"}`}>
      <SmartImage src={data.image} alt={data.imageAlt} sizes="100vw" fill priority className="object-cover" />
      {mood === "sunrise" ? (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-terracotta/55 via-earth/30 to-earth/90" />
      ) : (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/25 to-earth/90" />
          <div aria-hidden="true" className={styles.mist} />
          <div aria-hidden="true" className={`${styles.mist} ${styles.mistSecondary}`} />
        </>
      )}
      {mood === "mist" ? (
        <svg aria-hidden="true" viewBox="0 0 1440 190" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 z-[1] h-28 w-full md:h-40">
          <path d="M0 125 0 150 220 140 390 100 520 132 690 65 840 126 1020 87 1210 134 1440 103V190H0Z" fill="#1f3d2b" />
          <path d="M0 150 220 142 390 106 520 138 690 74 840 132 1020 96 1210 142 1440 114V190H0Z" fill="#2a1f17" opacity=".8" />
          <g fill="#2a1f17" opacity=".92">
            <path d="M1020 90h54v48h-54zM1072 104h33v34h-33zM1008 84h17v54h-17z" />
            <path d="M1013 77h22l-11-18zM1080 95h17l-8-15z" />
            <rect x="1031" y="106" width="7" height="10" fill="#d9a441" />
            <rect x="1050" y="106" width="7" height="10" fill="#d9a441" />
          </g>
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 1440 84" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 z-[1] h-16 w-full md:h-20">
          <rect width="1440" height="84" fill="#b5532f" />
          <path d="M0 18H1440M0 66H1440" stroke="#d9a441" strokeWidth="5" />
          <path d="M0 37H1440M0 49H1440" stroke="#1f3d2b" strokeWidth="5" />
          <g fill="#fbf6ee">
            <path d="m50 42 17-17 17 17-17 17zM142 42l17-17 17 17-17 17zM234 42l17-17 17 17-17 17zM326 42l17-17 17 17-17 17zM418 42l17-17 17 17-17 17zM510 42l17-17 17 17-17 17zM602 42l17-17 17 17-17 17zM694 42l17-17 17 17-17 17zM786 42l17-17 17 17-17 17zM878 42l17-17 17 17-17 17zM970 42l17-17 17 17-17 17zM1062 42l17-17 17 17-17 17zM1154 42l17-17 17 17-17 17zM1246 42l17-17 17 17-17 17zM1338 42l17-17 17 17-17 17z" />
          </g>
          <path d="M0 0h1440v11H0zM0 73h1440v11H0z" fill="#1f3d2b" />
        </svg>
      )}
      <Container className="relative z-10 w-full pb-28 pt-36 md:pb-36">
        <div className="max-w-4xl">
          <Breadcrumbs items={[...breadcrumbs]} tone="light" className="mb-8" />
          <p className="text-eyebrow text-gold">{data.eyebrow}</p>
          <h1 id="editorial-hero-title" className="mt-4 max-w-4xl text-display text-white">{data.title}</h1>
          <div className="gold-rule mb-6 mt-7" />
          <p className="max-w-[65ch] text-[17px] leading-[1.8] text-cream/90 sm:text-lg">{data.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {data.badges.map((badge) => {
              const Icon = icons[badge.icon] ?? ArrowUpRight;
              return (
                <span key={badge.label} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <Icon aria-hidden="true" size={16} className="text-gold" />
                  {badge.label}
                </span>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={data.primaryCta.href} size="lg">{data.primaryCta.label}</Button>
            <Button href={data.secondaryCta.href} variant="outline-light" size="lg">{data.secondaryCta.label}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
