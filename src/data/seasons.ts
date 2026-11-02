export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const seasonRows = [
  { name: "Wildlife viewing", seasons: ["good", "good", "good", "low", "low", "peak", "peak", "peak", "peak", "peak", "low", "good"] },
  { name: "Kilimanjaro climbing", seasons: ["peak", "peak", "peak", "low", "low", "peak", "peak", "peak", "peak", "peak", "low", "good"] },
  { name: "Zanzibar beaches", seasons: ["peak", "peak", "good", "low", "low", "peak", "peak", "peak", "peak", "peak", "good", "peak"] },
] as const;

export const seasonHighlights = [
  { title: "Calving Season, Jan to Mar", description: "Southern Serengeti and Ndutu fill with newborn wildebeest and the predators that follow." },
  { title: "Western Corridor, Jun to Jul", description: "The herds head north through the Grumeti region." },
  { title: "Mara River Crossings, Jul to Oct", description: "Dramatic river crossings in the northern Serengeti." },
  { title: "Green Season, Apr to May", description: "Lush landscapes, fewer visitors and lower rates." }, // TODO(CONFIRM): verify seasonal rate claim.
];
