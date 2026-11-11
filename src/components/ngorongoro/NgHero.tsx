import {
  Bird,
  Clock3,
  Compass,
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
import { resolvePublicImage } from "@/lib/ngorongoro-images";
import styles from "./NgHero.module.css";

const icons = {
  caldera: Mountain,
  heritage: ShieldCheck,
  wildlife: PawPrint,
  season: Sparkles,
  landscape: Mountain,
  journey: Compass,
  clock: Clock3,
  gate: Compass,
} satisfies Record<string, LucideIcon>;

type HeroData = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  badges: readonly { icon: string; label: string }[];
};

export default function NgHero({
  data,
  breadcrumbs,
  fallbackImage,
  divider = "rim",
}: {
  data: HeroData;
  breadcrumbs: readonly { title: string; href: string }[];
  fallbackImage?: string;
  divider?: "rim" | "strata";
}) {
  const image = resolvePublicImage(data.image, fallbackImage);

  return (
    <section
      aria-labelledby="ngorongoro-page-title"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-forest text-white md:min-h-[92svh]"
    >
      <SmartImage
        src={image}
        alt={data.imageAlt}
        sizes="100vw"
        fill
        priority
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-earth/80 via-transparent to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/35 to-earth/5" />
      <div aria-hidden="true" className={styles.mist} />
      <div aria-hidden="true" className={`${styles.mist} ${styles.mistSecondary}`} />

      <Container className="relative z-10 w-full pb-28 pt-36 md:pb-36">
        <div className="max-w-4xl">
          <Breadcrumbs items={[...breadcrumbs]} tone="light" className="mb-8" />
          <p className="text-eyebrow text-gold">{data.eyebrow}</p>
          <h1 id="ngorongoro-page-title" className="mt-4 max-w-4xl text-display text-white">
            {data.title}
          </h1>
          <div className="gold-rule mb-6 mt-7" />
          <p className="max-w-[65ch] text-[17px] leading-[1.8] text-cream/90 sm:text-lg">
            {data.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {data.badges.map((badge) => {
              const Icon = icons[badge.icon as keyof typeof icons] ?? Bird;
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

      {divider === "strata" ? (
        <svg aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-20 w-full md:h-28" viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path d="M0 30C260 48 405 13 690 32C964 50 1191 12 1440 34V140H0Z" fill="#d9a441" />
          <path d="M0 48C248 66 431 35 684 51C963 69 1174 33 1440 54V140H0Z" fill="#b5532f" />
          <path d="M0 70C257 84 445 58 700 73C975 89 1193 53 1440 75V140H0Z" fill="#2a1f17" />
          <path d="M0 89C267 102 433 81 710 94C985 107 1195 78 1440 97V140H0Z" fill="#fbf6ee" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-16 w-full md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 72C165 110 275 90 408 51C559 7 669 16 808 54C954 94 1052 103 1186 67C1280 42 1363 43 1440 59V120H0V72Z" fill="#fbf6ee" />
        </svg>
      )}
    </section>
  );
}
