import { z } from "zod";

export type RouteSlug = "machame" | "lemosho" | "marangu" | "rongai" | "northern-circuit" | "umbwe";

export interface ProfilePoint {
  day: number;
  label: string;
  sleepM: number;
  highM: number;
}

export interface RouteDay {
  day: number;
  title: string;
  from: string;
  to: string;
  campAltitudeM: number;
  hours: string;
  distanceKm: number;
  text: string;
}

export interface KiliRoute {
  slug: RouteSlug;
  name: string;
  nickname?: string;
  badge: string;
  days: { min: number; max: number; recommended: number };
  distanceKm: number;
  startGate: { name: string; altitudeM: number };
  stay: "Camping" | "Huts";
  difficulty: 1 | 2 | 3 | 4 | 5;
  scenery: 1 | 2 | 3 | 4 | 5;
  crowds: 1 | 2 | 3 | 4 | 5;
  acclimatisation: 1 | 2 | 3 | 4 | 5;
  successPct: number;
  successLabel: string;
  descent: string;
  bestSeason: string;
  hook: string;
  story: string;
  highlights: string[];
  bestFor: string[];
  thinkTwice: string[];
  parkFeeTotalUsd: number;
  profile: ProfilePoint[];
  itinerary: RouteDay[];
}

const routeSchema = z.object({
  slug: z.enum(["machame", "lemosho", "marangu", "rongai", "northern-circuit", "umbwe"]),
  name: z.string().min(1),
  nickname: z.string().optional(),
  badge: z.string().min(1),
  days: z.object({ min: z.number().int().positive(), max: z.number().int().positive(), recommended: z.number().int().positive() }),
  distanceKm: z.number().positive(),
  startGate: z.object({ name: z.string().min(1), altitudeM: z.number().positive() }),
  stay: z.enum(["Camping", "Huts"]),
  difficulty: z.number().int().min(1).max(5),
  scenery: z.number().int().min(1).max(5),
  crowds: z.number().int().min(1).max(5),
  acclimatisation: z.number().int().min(1).max(5),
  successPct: z.number().min(0).max(100),
  successLabel: z.string().min(1),
  descent: z.string().min(1),
  bestSeason: z.string().min(1),
  hook: z.string().min(1),
  story: z.string().min(1),
  highlights: z.array(z.string()).min(1),
  bestFor: z.array(z.string()).min(1),
  thinkTwice: z.array(z.string()).min(1),
  parkFeeTotalUsd: z.number().positive(),
  profile: z.array(z.object({
    day: z.number().int().positive(),
    label: z.string().min(1),
    sleepM: z.number().positive(),
    highM: z.number().positive(),
  })).min(2),
  itinerary: z.array(z.object({
    day: z.number().int().positive(),
    title: z.string().min(1),
    from: z.string().min(1),
    to: z.string().min(1),
    campAltitudeM: z.number().positive(),
    hours: z.string().min(1),
    distanceKm: z.number().positive(),
    text: z.string().min(1),
  })).min(1),
});

export const SUMMIT = { name: "Uhuru Peak", heightM: 5895 };

export const KILI_FACTS = {
  heightM: 5895,
  riseAbovePlainsM: 4800,
  cones: ["Kibo", "Mawenzi", "Shira"],
  firstSummit: { year: 1889, climbers: "Hans Meyer and Ludwig Purtscheller", guide: "Yohani Lauwo" },
  coords: { lat: -3.0674, lng: 37.3556 },
  parkFeesUsd: { conservationPerDay: 82.6, campingPerNight: 59, hutPerNight: 70.8, rescueOnce: 23.6 },
};

export const ZONES = [
  { id: "farmland", name: "Cultivated Farmland and Foothills", fromM: 800, toM: 1800, oxygen: "about 90%", feel: "Warm and humid", story: "The mountain begins in coffee, bananas and maize. Chagga farms climb the lower slopes in a patchwork of green, and this is the warmest, wettest, most populated part of the mountain.", lookFor: ["Coffee farms", "Banana groves", "Village paths"], image: "/images/kilimanjaro/zones-farmland.jpg" },
  { id: "rainforest", name: "Montane Rainforest", fromM: 1800, toM: 2800, oxygen: "about 80 to 75%", feel: "Mild and damp", story: "Step into the cloud forest and the world turns green and quiet. Giant trees drip with moss, orchids cling to the branches and monkeys swing overhead. This is where most routes begin and it is the most humid part of the climb.", lookFor: ["Colobus monkeys", "Turacos", "Ferns and mist"], image: "/images/kilimanjaro/zones-rainforest.jpg" },
  { id: "moorland", name: "Heath and Moorland", fromM: 2800, toM: 4000, oxygen: "about 70 to 62%", feel: "Warm sun, cold nights", story: "The trees shrink into heather and the sky opens. Giant groundsels and lobelias stand like sculpture in the mist and, for the first time, you can see the whole summit. Days are warm in the sun and nights turn cold.", lookFor: ["Giant groundsel", "Lobelias", "Everlasting flowers"], image: "/images/kilimanjaro/zones-moorland.jpg" },
  { id: "alpine-desert", name: "Alpine Desert", fromM: 4000, toM: 5000, oxygen: "about 60 to 53%", feel: "Fierce sun, freezing nights", story: "Almost nothing grows here. The ground is lava rock and dust, the sun is fierce, the nights freeze and the air thins. It feels like walking across the surface of another planet.", lookFor: ["Lava towers", "Vast silence", "Starry skies"], image: "/images/kilimanjaro/zones-alpine-desert.jpg" },
  { id: "summit", name: "Arctic Summit Zone", fromM: 5000, toM: 5895, oxygen: "about 50%", feel: "Very cold, around -20 C on summit night reported", story: "Ice, rock and stars. The air holds roughly half the oxygen of sea level. This is where you walk through the night, one slow step after another, to watch the sun rise over the curve of the Earth from Africa's highest point.", lookFor: ["Glaciers and ice cliffs", "The crater rim", "Uhuru Peak"], image: "/images/kilimanjaro/zones-summit.jpg" },
] as const;

export const SUMMIT_NIGHT = [
  { time: "23:30", title: "Wake and warm up", altitudeM: 4650, text: "Hot tea, a light snack and a final gear check in the cold. Your guides check how everyone is feeling." },
  { time: "00:00", title: "Into the dark", altitudeM: 4700, text: "Headtorches on, one slow step after another. A long line of tiny lights climbs the slope above you." },
  { time: "03:00", title: "The long middle", altitudeM: 5300, text: "The hardest part. Cold, thin air and steep zigzags. Guides keep the pace steady and call regular rest breaks." },
  { time: "05:30", title: "Stella Point", altitudeM: 5756, text: "Arrive on the crater rim at about 5,756 m. The sky begins to glow and your legs begin to believe. On northern approaches the rim is reached at Gilman's Point, about 5,681 m." },
  { time: "06:15", title: "Sunrise on Uhuru Peak", altitudeM: 5895, text: "Walk the final stretch along the glaciers to Uhuru Peak at 5,895 m. Stand on the highest point in Africa as the sun rises." },
  { time: "08:00", title: "The descent", altitudeM: 4650, text: "Back down to high camp for a rest, then on to a lower camp where the air feels rich and sleep comes easy." },
];

export const SEASONS = [
  { id: "jan-mar", label: "January to mid-March", level: "best", text: "Dry and warm on the lower slopes, colder on top with a chance of fresh snow near the summit. Quieter than the northern-hemisphere summer." },
  { id: "mar-may", label: "Mid-March to May", level: "wet", text: "The long rains. Quiet trails, lush forest and lower prices, but wet and cloudy. Rongai is often preferred." },
  { id: "jun-oct", label: "June to October", level: "best", text: "The main dry season and the most popular window. Clear skies, cold nights and busier trails, especially July to September." },
  { id: "nov-dec", label: "November to December", level: "good", text: "The short rains. Fewer climbers and good clear spells between showers. Pack for wet weather." },
] as const;

export const MONTH_LEVELS: { m: string; level: "best" | "good" | "wet" }[] = [
  { m: "Jan", level: "best" }, { m: "Feb", level: "best" }, { m: "Mar", level: "wet" }, { m: "Apr", level: "wet" },
  { m: "May", level: "wet" }, { m: "Jun", level: "best" }, { m: "Jul", level: "best" }, { m: "Aug", level: "best" },
  { m: "Sep", level: "best" }, { m: "Oct", level: "best" }, { m: "Nov", level: "wet" }, { m: "Dec", level: "good" },
];

export const SUCCESS_BY_DAYS = [
  { days: 5, pct: 27 }, { days: 6, pct: 44 }, { days: 7, pct: 64 }, { days: 8, pct: 85 },
];

export const PARK_FEE_TOTALS = [
  { label: "5-day Marangu (huts)", usd: 720 },
  { label: "6-day Marangu (huts)", usd: 873 },
  { label: "6-day Machame, Umbwe or Rongai", usd: 814 },
  { label: "7-day Machame, Lemosho or Rongai", usd: 956 },
  { label: "8-day Lemosho", usd: 1097 },
  { label: "9-day Northern Circuit", usd: 1239 },
];

const routeData: KiliRoute[] = [
  {
    slug: "machame", name: "Machame", nickname: "Whiskey Route", badge: "Most popular", days: { min: 6, max: 7, recommended: 7 }, distanceKm: 62,
    startGate: { name: "Machame Gate", altitudeM: 1800 }, stay: "Camping", difficulty: 4, scenery: 5, crowds: 5, acclimatisation: 4, successPct: 85,
    successLabel: "About 85% on 7 days (typical)", descent: "Mweka Route", bestSeason: "Jan to Mar and Jun to Oct",
    hook: "Classic, social and spectacular: five zones, the Barranco Wall and a legendary summit night.",
    story: "Machame is the route most people picture when they dream of Kilimanjaro. It leaves the southern slopes through a hushed, dripping rainforest, breaks out onto the Shira Plateau and climbs to the strange, brooding Lava Tower before dropping to a lush valley camp at Barranco. There, the famous Barranco Wall rises in front of you: a hands-on scramble that feels like an adventure and is far friendlier than it looks. The route is steeper and more demanding than some, but its climb-high, sleep-low rhythm is excellent for acclimatisation, and the views are among the best on the mountain. It is lively and sociable, with a real sense of shared adventure on the trail.",
    highlights: ["Rainforest, moorland, alpine desert and summit in one route", "Climb high, sleep low at Lava Tower for better acclimatisation", "The Barranco Wall: a thrilling, non-technical scramble", "Big skies and glacier views from Shira and Barafu", "A well-trodden, well-supported route"],
    bestFor: ["Fit first-timers who want a classic climb", "Climbers who enjoy a social trail", "Those with 7 days available"], thinkTwice: ["You want a quiet, uncrowded trail", "You only have 6 days and little altitude experience"], parkFeeTotalUsd: 956,
    profile: [
      { day: 1, label: "Machame Camp", sleepM: 2835, highM: 2835 }, { day: 2, label: "Shira Camp", sleepM: 3810, highM: 3810 },
      { day: 3, label: "Barranco", sleepM: 3985, highM: 4630 }, { day: 4, label: "Karanga", sleepM: 3995, highM: 4030 },
      { day: 5, label: "Barafu", sleepM: 4673, highM: 4673 }, { day: 6, label: "Summit, Mweka Camp", sleepM: 3100, highM: 5895 },
      { day: 7, label: "Mweka Gate", sleepM: 1640, highM: 3100 },
    ],
    itinerary: [
      { day: 1, title: "Machame Gate to Machame Camp", from: "Machame Gate (1,800 m)", to: "Machame Camp", campAltitudeM: 2835, hours: "5 to 7 h", distanceKm: 11, text: "Begin your climb in the lush rainforest of the southern slopes. The trail is muddy and magical, with towering trees and the chatter of monkeys. Arrive at camp for hot tea and dinner." },
      { day: 2, title: "Machame Camp to Shira Camp", from: "Machame Camp", to: "Shira Camp", campAltitudeM: 3810, hours: "4 to 6 h", distanceKm: 5, text: "Leave the forest behind and climb through heather and moorland onto the Shira Plateau. The views open up, and Kibo's glaciers glow at sunset." },
      { day: 3, title: "Shira Camp to Lava Tower to Barranco Camp", from: "Shira Camp", to: "Barranco Camp", campAltitudeM: 3985, hours: "6 to 8 h", distanceKm: 10, text: "Climb to Lava Tower at about 4,630 m, then descend to the green valley of Barranco. This climb-high, sleep-low day is the heart of your acclimatisation." },
      { day: 4, title: "Barranco Camp to Karanga Camp", from: "Barranco Camp", to: "Karanga Camp", campAltitudeM: 3995, hours: "4 to 5 h", distanceKm: 5, text: "Scramble up the Barranco Wall for sweeping views, then cross valleys to Karanga. A shorter day that lets your body adapt." },
      { day: 5, title: "Karanga Camp to Barafu Camp", from: "Karanga Camp", to: "Barafu Camp", campAltitudeM: 4673, hours: "3 to 4 h", distanceKm: 4, text: "A short climb to high camp. Rest, eat and prepare for summit night. Barafu means ice in Swahili, and the wind will tell you why." },
      { day: 6, title: "Summit Day: Barafu to Uhuru Peak to Mweka Camp", from: "Barafu Camp", to: "Mweka Camp", campAltitudeM: 3100, hours: "12 to 15 h", distanceKm: 17, text: "Start around midnight. Climb through the night to Stella Point and on to Uhuru Peak at sunrise, then descend to Barafu for a rest and continue to Mweka Camp." },
      { day: 7, title: "Mweka Camp to Mweka Gate", from: "Mweka Camp", to: "Mweka Gate (1,640 m)", campAltitudeM: 1640, hours: "3 to 4 h", distanceKm: 10, text: "Walk down through the rainforest to the gate. Collect your summit certificate, then return to your hotel for a hot shower and a celebration." },
    ],
  },
  {
    slug: "lemosho", name: "Lemosho", badge: "Highest scenery and success", days: { min: 7, max: 8, recommended: 8 }, distanceKm: 70,
    startGate: { name: "Londorossi Gate and Lemosho Glades", altitudeM: 2100 }, stay: "Camping", difficulty: 3, scenery: 5, crowds: 2, acclimatisation: 5, successPct: 90,
    successLabel: "About 90% on 8 days (typical)", descent: "Mweka Route", bestSeason: "Jan to Mar and Jun to Oct",
    hook: "The most beautiful approach: wild western rainforest, the Shira Plateau and a gentle, well-paced climb.",
    story: "If you want the very best chance of standing on the summit while seeing the mountain at its most beautiful, Lemosho is the route. It starts on the remote western slopes, where you are likely to meet colobus monkeys in untouched rainforest and have the trail almost to yourself. It then crosses the vast, golden Shira Plateau, with Kibo floating on the horizon, before joining the southern circuit towards Lava Tower and Barafu. The gradual profile and the extra days give your body time to adapt, which is why this is our favourite recommendation for first-time climbers who can spare eight days.",
    highlights: ["Remote western rainforest with fewer people", "Wide-open Shira Plateau views of Kibo", "Gradual profile and extra acclimatisation days", "Climb high, sleep low via Lava Tower", "Among the highest reported success rates"],
    bestFor: ["First-time climbers who can spare 8 days", "Photographers and scenery lovers", "Anyone prioritising the best chance of the summit"], thinkTwice: ["You only have 5 or 6 days", "You prefer huts over tents"], parkFeeTotalUsd: 1097,
    profile: [
      { day: 1, label: "Mti Mkubwa", sleepM: 2780, highM: 2780 }, { day: 2, label: "Shira 1", sleepM: 3500, highM: 3500 },
      { day: 3, label: "Shira 2", sleepM: 3840, highM: 3840 }, { day: 4, label: "Barranco", sleepM: 3985, highM: 4630 },
      { day: 5, label: "Karanga", sleepM: 3995, highM: 4030 }, { day: 6, label: "Barafu", sleepM: 4673, highM: 4673 },
      { day: 7, label: "Summit, Mweka Camp", sleepM: 3100, highM: 5895 }, { day: 8, label: "Mweka Gate", sleepM: 1640, highM: 3100 },
    ],
    itinerary: [
      { day: 1, title: "Londorossi Gate to Mti Mkubwa Camp", from: "Lemosho Glades (about 2,360 m)", to: "Mti Mkubwa Camp", campAltitudeM: 2780, hours: "3 to 4 h", distanceKm: 6, text: "After the drive and park formalities, walk gently through untouched rainforest. You may spot colobus monkeys and birdlife on the way to camp." },
      { day: 2, title: "Mti Mkubwa to Shira 1 Camp", from: "Mti Mkubwa Camp", to: "Shira 1 Camp", campAltitudeM: 3500, hours: "5 to 6 h", distanceKm: 8, text: "Climb out of the forest into heather and open moorland. The first views of the Shira Plateau appear in the afternoon light." },
      { day: 3, title: "Shira 1 to Shira 2 Camp", from: "Shira 1 Camp", to: "Shira 2 Camp", campAltitudeM: 3840, hours: "4 to 5 h", distanceKm: 6, text: "A gentle day across the plateau, with Kibo rising ahead. A short extra walk to higher ground helps you start adapting." },
      { day: 4, title: "Shira 2 to Lava Tower to Barranco Camp", from: "Shira 2 Camp", to: "Barranco Camp", campAltitudeM: 3985, hours: "6 to 8 h", distanceKm: 10, text: "Climb to Lava Tower at about 4,630 m for acclimatisation, then drop to the lush valley of Barranco to sleep lower." },
      { day: 5, title: "Barranco to Karanga Camp", from: "Barranco Camp", to: "Karanga Camp", campAltitudeM: 3995, hours: "4 to 5 h", distanceKm: 5, text: "Scramble the Barranco Wall and cross the valleys beneath the glaciers. A shorter day that keeps your energy for what comes next." },
      { day: 6, title: "Karanga to Barafu Camp", from: "Karanga Camp", to: "Barafu Camp", campAltitudeM: 4673, hours: "3 to 4 h", distanceKm: 4, text: "A short climb to high camp. Rest, eat and prepare for the summit attempt." },
      { day: 7, title: "Summit Day: Barafu to Uhuru Peak to Mweka Camp", from: "Barafu Camp", to: "Mweka Camp", campAltitudeM: 3100, hours: "12 to 15 h", distanceKm: 17, text: "Climb through the night to Stella Point and Uhuru Peak for sunrise, then descend to Barafu for a rest and continue to Mweka Camp." },
      { day: 8, title: "Mweka Camp to Mweka Gate", from: "Mweka Camp", to: "Mweka Gate (1,640 m)", campAltitudeM: 1640, hours: "3 to 4 h", distanceKm: 10, text: "Descend through the rainforest to the gate, collect your certificate and return to your hotel." },
    ],
  },
  {
    slug: "marangu", name: "Marangu", nickname: "Coca-Cola Route", badge: "Only hut route", days: { min: 5, max: 6, recommended: 6 }, distanceKm: 72,
    startGate: { name: "Marangu Gate", altitudeM: 1860 }, stay: "Huts", difficulty: 2, scenery: 3, crowds: 5, acclimatisation: 2, successPct: 55,
    successLabel: "Varies widely: lower on 5 days, better on 6 days with an acclimatisation day", descent: "Same trail as the ascent", bestSeason: "Jan to Mar, Jun to Oct, and a good choice in the rains",
    hook: "The only route with sleeping huts, a gentle gradient and a straightforward path.",
    story: "Marangu is the old original, the only route where you sleep in simple mountain huts with bunk beds instead of tents. The gradient is gentle and the path is clear, which makes it feel approachable, and the huts are a real draw for anyone who dreads a night under canvas. The catch is time: the classic five-day itinerary is too short for most bodies to adapt, so we strongly recommend the six-day version with an acclimatisation day at Horombo. Done that way, it is a good, honest climb with a simple, rhythmic feel.",
    highlights: ["Hut accommodation with bunk beds and a dining hall", "Gentle, steady gradient", "Passes through rainforest and the open Saddle", "Good in wetter months", "A shorter, simpler logistics route"],
    bestFor: ["Climbers who prefer a roof and a bunk to a tent", "People who want a gentle gradient", "Those with 6 days available"], thinkTwice: ["You only have 5 days", "You want solitude or the most varied scenery"], parkFeeTotalUsd: 873,
    profile: [
      { day: 1, label: "Mandara Hut", sleepM: 2720, highM: 2720 }, { day: 2, label: "Horombo Hut", sleepM: 3720, highM: 3720 },
      { day: 3, label: "Horombo (rest)", sleepM: 3720, highM: 4000 }, { day: 4, label: "Kibo Hut", sleepM: 4700, highM: 4700 },
      { day: 5, label: "Summit, Horombo", sleepM: 3720, highM: 5895 }, { day: 6, label: "Marangu Gate", sleepM: 1860, highM: 3720 },
    ],
    itinerary: [
      { day: 1, title: "Marangu Gate to Mandara Hut", from: "Marangu Gate (1,860 m)", to: "Mandara Hut", campAltitudeM: 2720, hours: "4 to 5 h", distanceKm: 8, text: "A gentle walk through lush rainforest to the first huts. Watch for monkeys and enjoy a hot meal in the dining hall." },
      { day: 2, title: "Mandara Hut to Horombo Hut", from: "Mandara Hut", to: "Horombo Hut", campAltitudeM: 3720, hours: "5 to 6 h", distanceKm: 12, text: "Leave the forest for open moorland with giant groundsel and views of Mawenzi. Arrive at Horombo in the afternoon." },
      { day: 3, title: "Acclimatisation Day at Horombo", from: "Horombo Hut", to: "Zebra Rocks and back", campAltitudeM: 3720, hours: "3 to 4 h", distanceKm: 5, text: "Walk up toward Zebra Rocks at about 4,000 m and return to sleep lower. This extra day makes a big difference to your summit chances." },
      { day: 4, title: "Horombo Hut to Kibo Hut", from: "Horombo Hut", to: "Kibo Hut", campAltitudeM: 4700, hours: "5 to 6 h", distanceKm: 10, text: "Cross the Saddle, a vast, windswept alpine desert between Kibo and Mawenzi. Rest early at Kibo Hut ahead of summit night." },
      { day: 5, title: "Summit Day: Kibo Hut to Uhuru Peak to Horombo Hut", from: "Kibo Hut", to: "Horombo Hut", campAltitudeM: 3720, hours: "14 to 16 h", distanceKm: 20, text: "Start around midnight to Gilman's Point, then along the rim to Uhuru Peak at sunrise. Descend to Kibo for a rest and continue to Horombo." },
      { day: 6, title: "Horombo Hut to Marangu Gate", from: "Horombo Hut", to: "Marangu Gate", campAltitudeM: 1860, hours: "5 to 6 h", distanceKm: 20, text: "Walk down the same trail through moorland and forest to the gate. Collect your certificate and return to your hotel." },
    ],
  },
  {
    slug: "rongai", name: "Rongai", badge: "Quietest from the north", days: { min: 6, max: 7, recommended: 7 }, distanceKm: 73,
    startGate: { name: "Rongai Gate (Nale Moru)", altitudeM: 1950 }, stay: "Camping", difficulty: 3, scenery: 4, crowds: 2, acclimatisation: 3, successPct: 80,
    successLabel: "About 80% on 7 days (typical)", descent: "Marangu Route", bestSeason: "All year, and a good choice in the rainy months",
    hook: "A gentle, uncrowded climb from the north with big views of Mawenzi.",
    story: "Rongai approaches Kilimanjaro from the north, close to the Kenyan border, where the weather is drier and the trails are far quieter. The gradient is steady and kind, the forest is thinner and the landscape feels wide and wild, with wonderful views of the jagged Mawenzi peak. Because the northern side is shielded from the heaviest rains, Rongai is a popular pick in wetter months. It offers fewer climb-high, sleep-low opportunities than Machame or Lemosho, so we recommend seven days with an acclimatisation stop at Mawenzi Tarn.",
    highlights: ["Quiet, gentle approach from the north", "Drier weather and more reliable in the rains", "Wide views of the Mawenzi peak", "Steady, easy-to-pace profile", "A wild, remote feel"],
    bestFor: ["First-timers who dislike crowds", "Climbers travelling in wetter months", "Those wanting a gentler gradient"], thinkTwice: ["You want the lushest rainforest scenery", "You want a very varied climb-high, sleep-low profile"], parkFeeTotalUsd: 956,
    profile: [
      { day: 1, label: "Simba Camp", sleepM: 2630, highM: 2630 }, { day: 2, label: "Kikelewa", sleepM: 3600, highM: 3600 },
      { day: 3, label: "Mawenzi Tarn", sleepM: 4330, highM: 4330 }, { day: 4, label: "Mawenzi Tarn (rest)", sleepM: 4330, highM: 4500 },
      { day: 5, label: "Kibo Hut", sleepM: 4700, highM: 4700 }, { day: 6, label: "Summit, Horombo", sleepM: 3720, highM: 5895 },
      { day: 7, label: "Marangu Gate", sleepM: 1860, highM: 3720 },
    ],
    itinerary: [
      { day: 1, title: "Rongai Gate to Simba Camp", from: "Rongai Gate (1,950 m)", to: "Simba Camp", campAltitudeM: 2630, hours: "3 to 4 h", distanceKm: 7, text: "A gentle first walk through farmland and quiet pine and rainforest. Plenty of time to settle in at camp." },
      { day: 2, title: "Simba Camp to Kikelewa Camp", from: "Simba Camp", to: "Kikelewa Camp", campAltitudeM: 3600, hours: "6 to 7 h", distanceKm: 14, text: "Climb out of the forest onto open moorland with growing views of Kibo and Mawenzi. A longer day, with a steady gradient." },
      { day: 3, title: "Kikelewa Camp to Mawenzi Tarn", from: "Kikelewa Camp", to: "Mawenzi Tarn", campAltitudeM: 4330, hours: "3 to 4 h", distanceKm: 5, text: "A short, steep climb to a dramatic camp beneath the spires of Mawenzi. Arrive early to rest and acclimatise." },
      { day: 4, title: "Acclimatisation Day at Mawenzi Tarn", from: "Mawenzi Tarn", to: "Rest and short hike", campAltitudeM: 4330, hours: "2 to 3 h", distanceKm: 3, text: "Rest and take a short acclimatisation walk higher before returning to sleep at the same altitude. A quiet, spectacular place to adapt." },
      { day: 5, title: "Mawenzi Tarn to Kibo Hut", from: "Mawenzi Tarn", to: "Kibo Hut", campAltitudeM: 4700, hours: "5 to 6 h", distanceKm: 9, text: "Cross the vast lunar Saddle between the two peaks to Kibo Hut. Rest and eat early before summit night." },
      { day: 6, title: "Summit Day: Kibo Hut to Uhuru Peak to Horombo Hut", from: "Kibo Hut", to: "Horombo Hut", campAltitudeM: 3720, hours: "13 to 15 h", distanceKm: 20, text: "Start around midnight to Gilman's Point, continue to Uhuru Peak at sunrise, then descend to Kibo and on to Horombo." },
      { day: 7, title: "Horombo Hut to Marangu Gate", from: "Horombo Hut", to: "Marangu Gate", campAltitudeM: 1860, hours: "5 to 6 h", distanceKm: 20, text: "Descend through moorland and rainforest to the gate. Collect your certificate and return to your hotel." },
    ],
  },
  {
    slug: "northern-circuit", name: "Northern Circuit", badge: "Longest and quietest", days: { min: 9, max: 10, recommended: 9 }, distanceKm: 90,
    startGate: { name: "Londorossi Gate and Lemosho Glades", altitudeM: 2100 }, stay: "Camping", difficulty: 3, scenery: 5, crowds: 1, acclimatisation: 5, successPct: 92,
    successLabel: "90% and above on 9 days (typical)", descent: "Mweka Route", bestSeason: "Jan to Mar and Jun to Oct",
    hook: "The longest route and the most complete: a full 360-degree circuit of Kibo with the best acclimatisation.",
    story: "The Northern Circuit is Kilimanjaro at its most generous. It starts on the quiet western slopes, then, instead of heading straight for the summit, it swings around the entire northern flank of Kibo, giving you 360-degree views of the mountain and some of the loneliest, most beautiful country anywhere on it. The extra days are the secret: with the longest and gentlest acclimatisation profile of any route, the Northern Circuit reports the highest success rates and the quietest trails. It is the one to choose if you can invest nine days and want the full, unhurried experience.",
    highlights: ["360-degree views as you circle Kibo", "Very few other climbers on the northern slopes", "The best acclimatisation of any route", "Remote, wild landscapes", "Among the highest reported success rates"],
    bestFor: ["Serious summit seekers with 9 days", "Climbers who love solitude", "Those who want the best chance of success"], thinkTwice: ["You have under 9 days", "Your budget is tight"], parkFeeTotalUsd: 1239,
    profile: [
      { day: 1, label: "Mti Mkubwa", sleepM: 2780, highM: 2780 }, { day: 2, label: "Shira 1", sleepM: 3500, highM: 3500 },
      { day: 3, label: "Shira 2", sleepM: 3840, highM: 3840 }, { day: 4, label: "Moir Hut", sleepM: 4200, highM: 4200 },
      { day: 5, label: "Buffalo Camp", sleepM: 4020, highM: 4200 }, { day: 6, label: "Third Cave", sleepM: 3870, highM: 4200 },
      { day: 7, label: "School Hut", sleepM: 4750, highM: 4750 }, { day: 8, label: "Summit, Mweka Camp", sleepM: 3100, highM: 5895 },
      { day: 9, label: "Mweka Gate", sleepM: 1640, highM: 3100 },
    ],
    itinerary: [
      { day: 1, title: "Londorossi Gate to Mti Mkubwa Camp", from: "Lemosho Glades (about 2,360 m)", to: "Mti Mkubwa Camp", campAltitudeM: 2780, hours: "3 to 4 h", distanceKm: 6, text: "A gentle first walk through untouched western rainforest, with a good chance of colobus monkeys." },
      { day: 2, title: "Mti Mkubwa to Shira 1 Camp", from: "Mti Mkubwa Camp", to: "Shira 1 Camp", campAltitudeM: 3500, hours: "5 to 6 h", distanceKm: 8, text: "Emerge from the forest onto the heather-covered Shira Plateau with its first views of Kibo." },
      { day: 3, title: "Shira 1 to Shira 2 Camp", from: "Shira 1 Camp", to: "Shira 2 Camp", campAltitudeM: 3840, hours: "4 to 5 h", distanceKm: 6, text: "A slow day across the plateau, letting your body begin to adapt." },
      { day: 4, title: "Shira 2 to Moir Hut", from: "Shira 2 Camp", to: "Moir Hut", campAltitudeM: 4200, hours: "5 to 6 h", distanceKm: 8, text: "Leave the busy southern circuit and head into the quiet northern wilderness. Moir is a remote, beautiful camp." },
      { day: 5, title: "Moir Hut to Buffalo Camp", from: "Moir Hut", to: "Buffalo Camp", campAltitudeM: 4020, hours: "5 to 6 h", distanceKm: 8, text: "Climb up and over ridges, then drop to Buffalo Camp, using a climb-high, sleep-low rhythm." },
      { day: 6, title: "Buffalo Camp to Third Cave", from: "Buffalo Camp", to: "Third Cave", campAltitudeM: 3870, hours: "5 to 6 h", distanceKm: 8, text: "Circle the northern slopes of Kibo with sweeping views toward Kenya and the plains below." },
      { day: 7, title: "Third Cave to School Hut", from: "Third Cave", to: "School Hut", campAltitudeM: 4750, hours: "4 to 5 h", distanceKm: 6, text: "Climb to School Hut, your base for summit night. Rest early and prepare." },
      { day: 8, title: "Summit Day: School Hut to Uhuru Peak to Mweka Camp", from: "School Hut", to: "Mweka Camp", campAltitudeM: 3100, hours: "12 to 15 h", distanceKm: 18, text: "Start around midnight to Gilman's Point and Uhuru Peak at sunrise, then descend through the high camps to Mweka Camp." },
      { day: 9, title: "Mweka Camp to Mweka Gate", from: "Mweka Camp", to: "Mweka Gate (1,640 m)", campAltitudeM: 1640, hours: "3 to 4 h", distanceKm: 10, text: "Descend through the rainforest to the gate and celebrate with your crew." },
    ],
  },
  {
    slug: "umbwe", name: "Umbwe", badge: "Steepest and most demanding", days: { min: 6, max: 7, recommended: 7 }, distanceKm: 53,
    startGate: { name: "Umbwe Gate", altitudeM: 1600 }, stay: "Camping", difficulty: 5, scenery: 3, crowds: 1, acclimatisation: 2, successPct: 70,
    successLabel: "About 70% (typical)", descent: "Mweka Route", bestSeason: "Jan to Mar and Jun to Oct",
    hook: "Short, steep and wild: a serious challenge for experienced high-altitude trekkers.",
    story: "Umbwe is the mountain's most direct and demanding route. It begins with a steep, narrow ridge through thick forest, climbing almost relentlessly to its first camp. The reward is solitude, wild scenery and a true sense of earning the summit. The drawback is speed: height is gained quickly in the first two days, which gives little time to adapt, and that is why it has the lowest success rate of the main routes. We only recommend Umbwe to experienced high-altitude trekkers, and we always suggest seven days over six.",
    highlights: ["The steepest, most direct route", "Very few other climbers", "Dense, quiet forest on the ascent", "Joins the Barranco valley and southern circuit", "A true challenge for experienced trekkers"],
    bestFor: ["Experienced, fit high-altitude trekkers", "Climbers wanting solitude and a challenge"], thinkTwice: ["This is your first high-altitude trek", "You are nervous about altitude", "You only have 6 days"], parkFeeTotalUsd: 956,
    profile: [
      { day: 1, label: "Umbwe Cave", sleepM: 2940, highM: 2940 }, { day: 2, label: "Barranco", sleepM: 3985, highM: 3985 },
      { day: 3, label: "Karanga", sleepM: 3995, highM: 4630 }, { day: 4, label: "Barafu", sleepM: 4673, highM: 4673 },
      { day: 5, label: "Summit, Mweka Camp", sleepM: 3100, highM: 5895 }, { day: 6, label: "Mweka Gate", sleepM: 1640, highM: 3100 },
    ],
    itinerary: [
      { day: 1, title: "Umbwe Gate to Umbwe Cave Camp", from: "Umbwe Gate (1,600 m)", to: "Umbwe Cave Camp", campAltitudeM: 2940, hours: "5 to 6 h", distanceKm: 8, text: "A steep, relentless climb through dense forest along a narrow ridge. Arrive at camp tired but proud." },
      { day: 2, title: "Umbwe Cave to Barranco Camp", from: "Umbwe Cave Camp", to: "Barranco Camp", campAltitudeM: 3985, hours: "6 to 7 h", distanceKm: 7, text: "Climb out of the forest into moorland and reach the lush Barranco valley, a big altitude gain in one day." },
      { day: 3, title: "Barranco Camp to Karanga Camp", from: "Barranco Camp", to: "Karanga Camp", campAltitudeM: 3995, hours: "4 to 5 h", distanceKm: 5, text: "Scramble the Barranco Wall, then cross valleys to Karanga. A shorter day that lets your body adapt." },
      { day: 4, title: "Karanga Camp to Barafu Camp", from: "Karanga Camp", to: "Barafu Camp", campAltitudeM: 4673, hours: "3 to 4 h", distanceKm: 4, text: "A short climb to high camp. Rest, eat and prepare for summit night." },
      { day: 5, title: "Summit Day: Barafu to Uhuru Peak to Mweka Camp", from: "Barafu Camp", to: "Mweka Camp", campAltitudeM: 3100, hours: "12 to 15 h", distanceKm: 17, text: "Climb through the night to Stella Point and Uhuru Peak for sunrise, then descend to Mweka Camp." },
      { day: 6, title: "Mweka Camp to Mweka Gate", from: "Mweka Camp", to: "Mweka Gate (1,640 m)", campAltitudeM: 1640, hours: "3 to 4 h", distanceKm: 10, text: "Walk down through the rainforest to the gate. Collect your certificate and return to your hotel." },
    ],
  },
];

routeSchema.array().parse(routeData);
export const ROUTES: KiliRoute[] = routeData;

export const HUB_FAQS = [
  { q: "How hard is it to climb Kilimanjaro?", a: "Kilimanjaro is a trek, not a technical climb. You do not need ropes, ice axes or mountaineering skills. The challenge is altitude and endurance: many long days, cold nights and a very long summit night. Good general fitness, enough days on the mountain and a steady pace make the biggest difference." },
  { q: "Do I need previous climbing experience?", a: "No. Many successful climbers have never trekked at altitude before. We recommend some regular hiking beforehand and choosing a longer route with built-in acclimatisation." },
  { q: "What are my chances of reaching the summit?", a: "Success depends mostly on the number of days and your pace. Published park figures from the early 2000s show roughly 27 percent on 5 days, 44 percent on 6, 64 percent on 7 and 85 percent on 8 days. Operators commonly report 80 to 90 percent or more on the longer routes such as Lemosho and the Northern Circuit." },
  { q: "Which route is best for a first-time climber?", a: "We usually recommend Lemosho on 8 days for its scenery, gradual profile and high reported success. Machame on 7 days is a classic alternative, and Rongai suits climbers who prefer quieter trails or are travelling in wetter months." },
  { q: "How many days should I plan?", a: "Seven or eight days on the mountain is the sweet spot for most first-timers. Five days is rarely enough and six is only suitable for fit climbers who have handled altitude before." },
  { q: "How cold does it get at the summit?", a: "Summit night can be very cold, with temperatures around -20 C reported, plus wind chill. We help you plan a layering system and warm gear for the climb." },
  { q: "What is altitude sickness and how do I avoid it?", a: "Altitude sickness is the body's reaction to thin air and can affect anyone above about 2,500 m. Reduce your risk by choosing a longer route, walking slowly, drinking plenty of water, climbing high and sleeping low where the route allows, and telling your guide early about any symptoms. Serious symptoms mean descending immediately. Speak to your doctor before booking." },
  { q: "How should I train?", a: "Start about 8 to 12 weeks before. Build up to 4 to 6 hour hikes with a daypack, add hills or stairs two to three times a week, strengthen legs and core and practise in the boots you will wear." },
  { q: "Is there a minimum age?", a: "Kilimanjaro National Park sets a minimum age of 10 years for climbing. Younger climbers need extra care at altitude, so please talk to us and your doctor." },
  { q: "What is included in the price?", a: "Our climb prices include park fees, guides, porters and cook, meals and safe drinking water on the mountain, tents and camp equipment, and the transfers and hotel nights listed on each package. Flights, visas, insurance, personal gear, tips and drinks are extra." },
  { q: "How much should I tip the crew?", a: "Tipping is customary and the crew relies on it. Typical guidance is about $250 to $350 per climber for the whole crew, pooled and shared at the end of the climb. We will give you a clear guide before you travel." },
  { q: "Do I carry everything myself?", a: "No. Porters carry the camping equipment, food and your main bag. You carry a small daypack with water, a rain jacket, warm layers, snacks, camera and personal items." },
];

export const ROUTE_FAQS = [
  { q: "What is the best Kilimanjaro route?", a: "There is no single best route, but for most first-time climbers with eight days, Lemosho offers the best mix of scenery, acclimatisation and summit success. Machame on seven days is a close second, and Northern Circuit is best if you have nine days and want solitude." },
  { q: "Machame or Lemosho?", a: "Both share the same southern circuit and summit approach. Lemosho starts further west, is longer and quieter and gives your body an extra day or two to adapt, which helps your summit chances. Machame is shorter, livelier and slightly steeper." },
  { q: "Is Marangu really the easiest route?", a: "Marangu has a gentle gradient and huts, so it feels easy on the legs. But it climbs and descends the same trail and offers little acclimatisation on five days, which is why many climbers find it harder than expected. If you choose Marangu, take six days." },
  { q: "Why do you recommend seven days or more?", a: "Because time is the best tool against altitude. More days let your body adapt gradually and sharply improve your chances of reaching the summit comfortably." },
  { q: "Is Rongai a good choice in the rainy season?", a: "Yes. Rongai approaches from the drier north and is often the preferred choice in wetter months. It is also quieter than most routes." },
  { q: "Camping or huts?", a: "Only Marangu uses huts, with bunk beds and a dining hall. Every other route uses tents, with camp crews who set up a mess tent, sleeping tents and a toilet tent." },
  { q: "Is the Northern Circuit worth the extra days?", a: "If you can spare nine days, yes. It offers the best acclimatisation, the quietest trails and a complete 360-degree view of Kibo, and it reports the highest success rates." },
  { q: "Is Umbwe safe?", a: "It can be done safely by experienced, well-acclimatised trekkers, but it gains height very quickly and has the lowest success rate of the main routes. We do not recommend it for first-time high-altitude climbers." },
  { q: "Which trails do you descend on?", a: "Most climbs from the south and west, including Machame, Lemosho, Umbwe and the Northern Circuit, descend by the Mweka Route. Marangu descends on its own trail and Rongai descends via Marangu." },
  { q: "Can I change my route or number of days?", a: "Tell us your dates, experience and priorities and we will recommend the best option. Most itineraries can be adapted before you travel." },
];
