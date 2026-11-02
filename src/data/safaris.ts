export type SafariPackage = {
  slug: string;
  title: string;
  duration: string;
  parks: string;
  highlight: string;
  badge?: string;
  priceFrom: number | null;
  image: string;
};

export const safaris: SafariPackage[] = [
  {
    slug: "3-day-tarangire-manyara-ngorongoro",
    title: "3-Day Classic Safari",
    duration: "3 days",
    parks: "Tarangire, Lake Manyara, Ngorongoro",
    highlight: "Elephants among baobabs, flamingo shores and a descent into the crater.",
    priceFrom: null, // TODO(REPLACE): add a verified starting price, if published.
    image: "/images/safaris/3-day-tarangire-manyara-ngorongoro.jpg",
  },
  {
    slug: "4-day-tarangire-serengeti-ngorongoro",
    title: "4-Day Serengeti Escape",
    duration: "4 days",
    parks: "Tarangire, Serengeti, Ngorongoro",
    highlight: "A short, powerful taste of the great plains.",
    priceFrom: null, // TODO(REPLACE): add a verified starting price, if published.
    image: "/images/safaris/4-day-tarangire-serengeti-ngorongoro.jpg",
  },
  {
    slug: "5-day-northern-circuit-classic",
    title: "5-Day Northern Circuit Classic",
    duration: "5 days",
    parks: "Tarangire, Serengeti, Ngorongoro",
    highlight: "Tanzania's iconic safari route, perfectly paced.",
    badge: "Most Popular",
    priceFrom: null, // TODO(REPLACE): add a verified starting price, if published.
    image: "/images/safaris/5-day-northern-circuit-classic.jpg",
  },
  {
    slug: "6-day-serengeti-great-migration",
    title: "6-Day Great Migration Safari",
    duration: "6 days",
    parks: "Serengeti, Ngorongoro",
    highlight: "Follow the herds to where the action is, season by season.",
    priceFrom: null, // TODO(REPLACE): add a verified starting price, if published.
    image: "/images/safaris/6-day-serengeti-great-migration.jpg",
  },
  {
    slug: "7-day-women-only-group-safari",
    title: "7-Day Women-Only Group Safari",
    duration: "7 days",
    parks: "Tarangire, Serengeti, Ngorongoro",
    highlight: "Share the adventure with like-minded women.",
    badge: "Women-Only Departure",
    priceFrom: null, // TODO(REPLACE): add a verified starting price, if published.
    image: "/images/safaris/7-day-women-only-group-safari.jpg",
  },
  {
    slug: "8-day-safari-and-zanzibar",
    title: "8-Day Safari and Zanzibar Escape",
    duration: "8 days",
    parks: "Northern Circuit + Zanzibar",
    highlight: "Savanna sundowners, then barefoot on white sand.",
    priceFrom: null, // TODO(REPLACE): add a verified starting price, if published.
    image: "/images/safaris/8-day-safari-and-zanzibar.jpg",
  },
];
