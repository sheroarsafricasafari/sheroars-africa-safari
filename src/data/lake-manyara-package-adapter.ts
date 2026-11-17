import { lakeManyaraPackages } from "@/data/lake-manyara-packages";

const mealCodes = {
  Breakfast: "B",
  Lunch: "L",
  Dinner: "D",
} as const;

const highlightTitles = ["Forest wildlife", "Hippo Pool", "Birdlife", "Local culture", "Private safari"];

export const lakeManyaraSafariPackageAdapters = lakeManyaraPackages.map((item) => ({
  item,
  input: {
    slug: item.slug,
    title: item.title,
    duration: item.duration,
    days: item.days,
    parks: item.parks,
    summary: item.summary,
    highlight: item.tagline,
    highlights: item.highlights,
    bestFor: item.bestFor,
    difficulty: item.pace,
    groupSize: item.groupSize,
    groupSizeNote: item.groupSizeNote ?? "Private safari; share your party size when enquiring.",
    tags: item.tags,
    image: item.cardImage,
    pricing: item.pricing,
    inclusions: item.inclusions,
    exclusions: item.exclusions,
    badge: item.badge,
    nights: item.nights,
    startPoint: "Arusha",
    endPoint: "Arusha",
    pace: item.pace.toLowerCase().includes("moderate") ? "Moderate" as const : "Relaxed" as const,
    comfortLevel: item.accommodationSummary,
    overview: [item.hook, item.accommodationSummary],
    highlightCards: item.highlights.map((text, index) => ({
      icon: ["paw", "map", "bird", "users", "car"][index % 5] ?? "paw",
      title: highlightTitles[index % highlightTitles.length] ?? "Safari highlight",
      text,
    })),
    route: item.routeStops.map((label, index, stops) => ({
      id: `manyara-stop-${index + 1}`,
      label,
      kind: index === 0 ? "start" as const : index === stops.length - 1 ? "end" as const : "park" as const,
      note: index === 0 || index === stops.length - 1 ? "Arusha transfer" : `Included in the ${item.name} route`,
    })),
    wildlife: item.highlights.slice(0, 3),
    seasonNote: item.seasonsNote,
    accommodationTiers: item.nights === 0
      ? [{
          name: "Return to Arusha",
          description: "This day safari has no overnight stay. Return to your Arusha hotel or Kilimanjaro Airport.",
          bestFor: "Guests with a free day in Arusha.",
          askUsFor: "Ask us to adjust the pick-up and drop-off details to your plans.",
        }]
      : [
          {
            name: "Comfort",
            description: "A Comfort lodge or tented camp near or inside Lake Manyara, with full-board meals.",
            bestFor: "Travellers seeking a comfortable stay and considered value.",
            askUsFor: "We confirm the exact property in your written quote.",
          },
          {
            name: "Luxury",
            description: "A Luxury lodge or tented camp near or inside Lake Manyara, with full-board meals.",
            bestFor: "Travellers seeking a more elevated stay and the Luxury-tier night drive.",
            askUsFor: "We confirm the exact property in your written quote.",
            recommended: true,
          },
        ],
    dayByDay: item.itinerary.map((day, index) => ({
      day: day.day,
      title: day.title,
      description: day.story,
      overnight: day.overnight,
      accommodation: day.overnight,
      meals: day.meals.map((meal) => mealCodes[meal]),
      routeId: `manyara-stop-${Math.min(index + 1, item.routeStops.length - 2)}`,
      driveNote: "See the detailed itinerary for the day's route.",
      activities: day.activities.map((activity) => `${activity.time} ${activity.text}`),
      imageSrc: item.gallery[index % item.gallery.length]?.src,
    })),
    goodToKnow: [
      { variant: "note" as const, title: "Published rates", text: item.pricing.note },
      { variant: "note" as const, title: "Season", text: item.seasonsNote },
      { variant: "tip" as const, title: "Wildlife", text: "Wildlife sightings vary and cannot be guaranteed." },
    ],
    faqs: item.faqs.slice(0, 3),
    gallery: [
      { src: item.heroImage, alt: item.heroAlt, span: "wide" as const },
      { src: item.cardImage, alt: item.cardAlt, span: "square" as const },
      ...item.gallery.slice(0, 4).map((image, index) => ({
        src: image.src,
        alt: image.alt,
        span: index === 0 ? "tall" as const : "square" as const,
      })),
    ],
    departureInfo: { type: "private" as const, datesNote: "Choose your preferred travel dates." },
    extraInclusions: [],
    related: item.related,
  },
}));
