import type { RouteSlug } from "@/data/kilimanjaro-packages";

export interface RouteCopy {
  hero: { eyebrow: string; h1: string; sub: string; imageAlt: string };
  story: { eyebrow: string; heading: string; paragraphs: string[] };
  whyChoose: { title: string; text: string }[];
  seasonNote: string;
  metadata: { title: string; description: string; keywords: string[] };
}

export const MACHAME_COPY: RouteCopy = {
  hero: {
    eyebrow: "KILIMANJARO ROUTE | THE WHISKEY ROUTE",
    h1: "Machame Route: The Whiskey Route to the Roof of Africa",
    sub: "Rainforest, moorland, alpine desert and glacier, with the Barranco Wall in between. Choose 6, 7 or 8 days, in Mid-range or Luxury comfort, and see every day explained.",
    imageAlt: "Climbers on the Machame route with Kibo above the clouds",
  },
  story: {
    eyebrow: "THE ROUTE",
    heading: "Kilimanjaro's Most Popular Road, and Why",
    paragraphs: [
      "Machame is the route most people picture when they dream of Kilimanjaro. It leaves the southern slopes through a hushed, dripping rainforest, breaks out onto the Shira Plateau and climbs to the strange, brooding Lava Tower before dropping to a lush valley camp at Barranco.",
      "There, the famous Barranco Wall rises in front of you: a hands-on scramble that looks daunting and is, in truth, one of the most joyful hours of the climb. Beyond it the trail crosses wild valleys to Barafu, the high camp from which you leave for the summit at midnight.",
      "Machame is steeper and busier than some routes, but its climb-high, sleep-low rhythm is excellent for acclimatisation and its scenery is among the best on the mountain. The trail has a lively, shared-adventure feel, with a strong sense of purpose.",
      "Choose the length that suits you: six days is quick and demanding, seven is the balanced classic, and eight adds a full rest day on the Shira Plateau for the calmest, most comfortable climb.",
    ],
  },
  whyChoose: [
    { title: "All five climate zones", text: "Rainforest, moorland, alpine desert and the glacier summit zone in a single climb." },
    { title: "The Barranco Wall", text: "A thrilling, non-technical scramble that gives the route its character." },
    { title: "Smart acclimatisation", text: "Climb high at Lava Tower, sleep low at Barranco, the way the body likes it." },
    { title: "A well-supported classic", text: "Established camps, an experienced crew and a route we know well." },
  ],
  seasonNote: "Machame is climbed all year and is busiest from June to October and January to March. In the long rains (mid-March to May) the forest can be very muddy, and Rongai is often a better choice.",
  metadata: {
    title: "Machame Route Kilimanjaro: 6, 7 & 8 Days | She Roars",
    description: "Climb Kilimanjaro via the Machame Whiskey Route. Compare 6, 7 and 8 day mid-range and luxury packages with explained itineraries and prices.",
    keywords: ["Machame route", "Machame route Kilimanjaro", "Whiskey route", "Machame 7 day", "Machame 6 day", "Machame 8 day", "Kilimanjaro Machame price", "Kilimanjaro luxury climb", "Kilimanjaro mid-range climb", "Barranco Wall", "Lava Tower"],
  },
};

export const LEMOSHO_COPY: RouteCopy = {
  hero: {
    eyebrow: "KILIMANJARO ROUTE | THE SCENIC ROUTE",
    h1: "Lemosho Route: The Most Beautiful Way Up Kilimanjaro",
    sub: "Remote western rainforest, the golden Shira Plateau and a gentle, well-paced climb to the summit. Choose 6, 7 or 8 days, in Mid-range or Luxury comfort, and see every day explained.",
    imageAlt: "Trekkers crossing the Shira Plateau on the Lemosho route",
  },
  story: {
    eyebrow: "THE ROUTE",
    heading: "The Wild, Quiet, Beautiful Side of the Mountain",
    paragraphs: [
      "If you want the very best chance of standing on the summit while seeing Kilimanjaro at its most beautiful, Lemosho is the route. It begins on the remote western slopes, where untouched rainforest is alive with colobus monkeys and you may have the trail almost to yourself.",
      "Then it climbs onto the vast, golden Shira Plateau, a high, open bowl with Kibo floating on the horizon, before joining the southern circuit towards Lava Tower, the Barranco Wall and Barafu.",
      "The profile is gradual, and the extra time spent crossing the plateau gives your body the time it needs. That is why Lemosho on eight days is the route we recommend most to first-time climbers who can spare the time.",
      "Six days is the fast Express for experienced trekkers, seven is a lovely, well-paced classic and eight is our signature climb.",
    ],
  },
  whyChoose: [
    { title: "The best scenery", text: "Untouched western rainforest and the wide Shira Plateau, with fewer people." },
    { title: "A gradual, kind profile", text: "Extra days let your body adapt before the steep sections." },
    { title: "Among the highest summit success", text: "Longer itineraries are widely reported to have the highest success rates." },
    { title: "Quiet trails", text: "Far fewer climbers than the southern routes until the routes join near Lava Tower." },
  ],
  seasonNote: "Lemosho is climbed all year. The long drive to the western gate makes the start of the climb a little later in the day, and the western rainforest can be wet from mid-March to May.",
  metadata: {
    title: "Lemosho Route Kilimanjaro: 6, 7 & 8 Days | She Roars",
    description: "Climb Kilimanjaro on the scenic Lemosho route. Compare 6, 7 and 8 day mid-range and luxury packages with explained itineraries and prices.",
    keywords: ["Lemosho route", "Lemosho route Kilimanjaro", "Lemosho 8 day", "Lemosho 7 day", "Lemosho 6 day", "Kilimanjaro Lemosho price", "best Kilimanjaro route", "Shira Plateau", "Kilimanjaro luxury climb", "Kilimanjaro mid-range climb"],
  },
};

export const MARANGU_COPY: RouteCopy = {
  hero: {
    eyebrow: "KILIMANJARO ROUTE | THE HUT ROUTE",
    h1: "Marangu Route: The Hut Route to Uhuru Peak",
    sub: "The only Kilimanjaro route with sleeping huts, a gentle gradient and a clear, classic trail. Choose 6, 7 or 8 days, in Mid-range or Luxury comfort, and see every day explained.",
    imageAlt: "Mandara Hut among the rainforest on the Marangu route",
  },
  story: {
    eyebrow: "THE ROUTE",
    heading: "The Original Path, Done the Right Way",
    paragraphs: [
      "Marangu is the old original, the oldest and best-known trail on Kilimanjaro and the only one where you sleep in mountain huts rather than tents. The path is clear, the gradient is gentle and the huts give you a dry, warm place to rest every night.",
      "It is often called the easiest route, and that is only half true. The walking is gentle, but the classic five-day itinerary leaves too little time for your body to adapt, which is why we only offer it with extra acclimatisation days.",
      "Our six-day version adds a rest day at Horombo. The seven-day version adds a second acclimatisation day. The eight-day version adds a rest day at Mandara with another easy walk. Each extra day gives your body more time to adapt.",
      "If you love the idea of a bunk, a roof and a hot dining room, and you would rather not sleep in a tent, Marangu is a lovely, honest way to reach the summit.",
    ],
  },
  whyChoose: [
    { title: "The only hut route", text: "Sleep in simple wooden huts with bunk beds and a communal dining hall." },
    { title: "A gentle gradient", text: "A steady path that is kind to the legs and easy to pace." },
    { title: "Extra acclimatisation built in", text: "Our itineraries add rest days so your body has time to adapt." },
    { title: "A good wet-season choice", text: "Huts keep you dry when the rains arrive." },
  ],
  seasonNote: "Marangu is climbed all year, and huts make it a good choice in the rainy months. It is busy from June to October and January to March, and huts are limited, so book early.",
  metadata: {
    title: "Marangu Route Kilimanjaro: 6, 7 & 8 Days | She Roars",
    description: "Climb Kilimanjaro on the Marangu hut route. Compare 6, 7 and 8 day mid-range and luxury packages with explained itineraries and prices.",
    keywords: ["Marangu route", "Marangu route Kilimanjaro", "Coca-Cola route", "Marangu 6 day", "Marangu 7 day", "Marangu 8 day", "Kilimanjaro hut route", "Kilimanjaro huts", "Kilimanjaro Marangu price", "Kilimanjaro luxury climb"],
  },
};

export const RONGAI_COPY: RouteCopy = {
  hero: {
    eyebrow: "KILIMANJARO ROUTE | THE NORTHERN ROUTE",
    h1: "Rongai Route: The Quiet Way Up Kilimanjaro",
    sub: "A gentle, uncrowded climb from the drier northern side, with wide views of Mawenzi. Choose 6, 7 or 8 days, in Mid-range or Luxury comfort, and see every day explained.",
    imageAlt: "Trekkers walking across open moorland on the Rongai route with Mawenzi ahead",
  },
  story: {
    eyebrow: "THE ROUTE",
    heading: "Kilimanjaro From the Quiet Side",
    paragraphs: [
      "Almost every Kilimanjaro route climbs from the south or the west. Rongai is the exception. It approaches from the north, near the Kenyan border, on the side of the mountain that most trekkers never see.",
      "The trail begins in quiet pine plantation and thin, sunlit forest, then climbs onto wide, open moorland where the sky is enormous and the jagged spires of Mawenzi stand on the horizon. You camp beneath those cliffs at Mawenzi Tarn, cross the vast Saddle to Kibo and make your push for the summit by night.",
      "The gradient is gentle, the trail is quiet and the northern side is often drier, which makes Rongai a favourite in the rainy months. It has fewer climb-high, sleep-low moments than Machame or Lemosho, so we recommend seven days, with a full rest day at Mawenzi Tarn, or eight days for the most gradual profile.",
      "Because the route descends by the Marangu trail, your last night on the mountain is spent in a simple hut at Horombo, a warm, sociable end to the climb.",
    ],
  },
  whyChoose: [
    { title: "Quiet trails", text: "Far fewer climbers than the southern routes, with a wild, remote feel." },
    { title: "A gentle gradient", text: "A steady, kind profile that is easy to pace." },
    { title: "A drier side of the mountain", text: "Often a better choice when the southern slopes are wet." },
    { title: "Beneath Mawenzi", text: "An unforgettable camp under the spires of Kilimanjaro's second peak." },
  ],
  seasonNote: "Rongai is climbed all year and is a particular favourite in April, May and November, when the northern side is often drier than the southern routes. It is also lovely in the dry seasons, from January to early March and June to October.",
  metadata: {
    title: "Rongai Route Kilimanjaro: 6, 7 and 8 Day Packages | She Roars",
    description: "Climb Kilimanjaro on the quiet Rongai route. Compare 6, 7 and 8 day mid-range and luxury packages with explained itineraries and prices.",
    keywords: ["Rongai route", "Rongai route Kilimanjaro", "Rongai 7 day", "Rongai 6 day", "Rongai 8 day", "Kilimanjaro Rongai price", "quiet Kilimanjaro route", "Kilimanjaro in the rainy season", "Mawenzi Tarn", "Kilimanjaro luxury climb", "Kilimanjaro mid-range climb"],
  },
};

export const NORTHERN_CIRCUIT_COPY: RouteCopy = {
  hero: {
    eyebrow: "KILIMANJARO ROUTE | THE GRAND CIRCUIT",
    h1: "Northern Circuit: The Longest, Quietest Road to the Summit",
    sub: "A full circle of Kibo, the quietest trails on the mountain and the gentlest acclimatisation of any route. Choose 8, 9 or 10 days, in Mid-range or Luxury comfort, and see every day explained.",
    imageAlt: "Trekkers on the empty northern slopes of Kilimanjaro with Kibo above",
  },
  story: {
    eyebrow: "THE ROUTE",
    heading: "The Whole Mountain, Slowly",
    paragraphs: [
      "Other routes go up. The Northern Circuit goes around. It begins on the quiet western slopes, crosses the golden Shira Plateau, then keeps going, sweeping around the entire northern flank of Kibo through country that most climbers never see.",
      "Days are long and slow, and the views are huge: the northern plains stretching toward Kenya, the glaciers glowing above you, and almost no other groups in sight. You camp at remote places with names like Moir, Buffalo and Third Cave, and you finally approach the summit from the north, through the high, empty Saddle to School Hut.",
      "Because it is the longest route, the Northern Circuit has the most gradual profile of all, with several climb-high, sleep-low days. That extra time is the secret behind its reputation for the best summit success on the mountain.",
      "Nine days is the classic. Eight is a brisker version for strong trekkers. Ten adds a full rest day at Moir for the calmest and most complete climb.",
    ],
  },
  whyChoose: [
    { title: "The best acclimatisation", text: "The longest, most gradual profile on Kilimanjaro." },
    { title: "The quietest trails", text: "Days of wide, wild silence with very few other climbers." },
    { title: "A full circle of Kibo", text: "360-degree views that no other route gives you." },
    { title: "One of the highest summit rates", text: "Longer itineraries are widely reported to have the best success." },
  ],
  seasonNote: "The Northern Circuit is climbed all year and is at its best in the dry seasons, from January to early March and June to October, when the long, high northern stretches are clearest and the views are widest.",
  metadata: {
    title: "Northern Circuit Kilimanjaro: 8, 9 and 10 Day Packages | She Roars",
    description: "Climb Kilimanjaro on the Northern Circuit. Compare 8, 9 and 10 day mid-range and luxury packages with explained itineraries and prices.",
    keywords: ["Northern Circuit Kilimanjaro", "Northern Circuit route", "Northern Circuit 9 day", "Northern Circuit 10 day", "Northern Circuit 8 day", "longest Kilimanjaro route", "Kilimanjaro success rate", "Kilimanjaro Northern Circuit price", "Kilimanjaro luxury climb", "quietest Kilimanjaro route"],
  },
};

export const UMBWE_COPY: RouteCopy = {
  hero: {
    eyebrow: "KILIMANJARO ROUTE | THE DIRECT ROUTE",
    h1: "Umbwe Route: The Steep, Wild and Direct Way Up",
    sub: "Kilimanjaro's steepest and quietest route, for experienced high-altitude trekkers. Choose 6, 7 or 8 days, in Mid-range or Luxury comfort, and see every day explained.",
    imageAlt: "A narrow forest ridge on the Umbwe route with mist in the trees",
  },
  story: {
    eyebrow: "THE ROUTE",
    heading: "A Serious Climb for Serious Trekkers",
    paragraphs: [
      "Umbwe is the mountain's most direct route and its most demanding. From the first step it climbs steeply along a narrow forest ridge, under ancient, moss-draped trees, with deep valleys dropping away on both sides.",
      "It is quiet, wild and very beautiful, and you will meet very few other trekkers until you join the Barranco valley on day two. From there it follows the same trail as the Machame and Lemosho routes to Barafu and the summit.",
      "The catch is speed. Umbwe gains a great deal of height in the first two days, which gives the body little time to adapt, and that is why it has the lowest success rate of the main routes. We only recommend it to experienced trekkers who have been above 4,000 m before and felt well.",
      "If Umbwe is your choice, take seven days at the least. The rest day at Barranco, with a climb-high, sleep-low hike toward Lava Tower, is the single biggest factor in a safe and successful climb. Eight days adds a second rest day at the very start, for the most careful version of this wild, rewarding route.",
    ],
  },
  whyChoose: [
    { title: "The most direct route", text: "Fewer days and a more demanding, more rewarding feel." },
    { title: "Wild and very quiet", text: "Almost no other trekkers on the first two days." },
    { title: "A real sense of achievement", text: "A hard-won summit for climbers who like a challenge." },
    { title: "A good-value, experienced choice", text: "For trekkers who know how their body handles altitude." },
  ],
  seasonNote: "Umbwe is best in the dry seasons, from January to early March and June to October. The steep forest trail can be slippery in the rains of April, May and November, so we do not recommend Umbwe in those months.",
  metadata: {
    title: "Umbwe Route Kilimanjaro: 6, 7 and 8 Day Packages | She Roars",
    description: "Climb Kilimanjaro on the steep, quiet Umbwe route. Compare 6, 7 and 8 day mid-range and luxury packages with explained itineraries and prices.",
    keywords: ["Umbwe route", "Umbwe route Kilimanjaro", "Umbwe 7 day", "Umbwe 6 day", "Umbwe 8 day", "steepest Kilimanjaro route", "Kilimanjaro for experienced trekkers", "Kilimanjaro Umbwe price", "Barranco Wall", "Kilimanjaro luxury climb"],
  },
};

export const COMMON_FAQS = [
  { question: "What is the difference between Mid-range and Luxury?", answer: "Both options follow the same route. Comfort features and service arrangements vary by package and are confirmed in your written quote. Choose Mid-range if you want to focus on the route and price. Choose Luxury if comfort and added options matter to you." },
  { question: "Who is Luxury for?", answer: "Climbers who value comfort, rest and recovery at altitude, honeymooners and milestone celebrations, or anyone who wants to discuss additional comfort options before booking. It is not required for reaching the summit." },
  { question: "Who is Mid-range for?", answer: "Climbers comparing route length and price, first-timers comfortable with simple camp life, and friends or small groups sharing costs. You can also ask for a quote that prioritizes extra days on the mountain." },
  { question: "How many days should I choose?", answer: "Seven or eight days is the sweet spot for most climbers. Six days is possible for fit, experienced trekkers but gives less time to adapt. More days improve your chances of reaching the summit comfortably." },
  { question: "What is included in the price?", answer: "The written quote confirms the park fees, services, accommodation, meals and transfers included in your package. Flights, visas, insurance, personal gear, tips and drinks are not included unless your quote says otherwise." },
  { question: "How are prices calculated?", answer: "Prices are per person sharing and depend on the route, days, comfort level, group size and season. Larger groups share costs, so the per-person price falls as the group grows. Green season prices are about 8 percent lower. Your written quote confirms the exact amount." },
  { question: "How much should I tip the crew?", answer: "Tipping is customary and the crew relies on it. Typical guidance is about $250 to $350 per climber for the whole crew, pooled and shared at the end of the climb. We give you a clear guide before you travel." },
  { question: "Do I need to be an experienced climber?", answer: "No. Kilimanjaro is a trek, not a technical climb. Good general fitness, enough days and a slow pace make the difference." },
];

export const ROUTE_FAQS: Record<RouteSlug, { question: string; answer: string }[]> = {
  machame: [
    { question: "Is the Barranco Wall dangerous?", answer: "It looks intimidating but needs no technical skills. It is a hands-and-feet scramble of about one to two hours, with your guides beside you and porters passing carrying their loads." },
    { question: "Why is Machame called the Whiskey Route?", answer: "It is nicknamed the Whiskey Route in contrast to the gentler Marangu, or Coca-Cola Route. It is steeper, more rugged and a little more of an adventure." },
    { question: "Is Machame crowded?", answer: "It is one of the most popular routes, especially from June to October and January to March. The camps are well run and the atmosphere is sociable. If you prefer solitude, consider Lemosho or Rongai." },
  ],
  lemosho: [
    { question: "Why does Lemosho start later in the day?", answer: "The western trailhead is further from Moshi, so the first day includes a longer drive and registration at Londorossi Gate. The walking that day is short and gentle." },
    { question: "Is Lemosho better than Machame?", answer: "Both reach the same summit. Lemosho is longer, quieter and more gradual, which helps acclimatisation, while Machame is shorter and livelier. For first-timers with eight days, we usually recommend Lemosho." },
    { question: "Is the six-day Lemosho a good idea?", answer: "It suits experienced, high-altitude trekkers. For most first-time climbers we recommend the seven or eight-day itineraries." },
  ],
  marangu: [
    { question: "Is Marangu really the easiest route?", answer: "The gradient is gentle and you sleep in huts, so it feels easier on the legs. But on the classic five-day itinerary there is too little time to acclimatise, so we only offer Marangu with extra acclimatisation days." },
    { question: "What are the huts like?", answer: "Simple wooden A-frame huts with bunk beds, foam mattresses, a communal dining hall and basic toilets. You bring your own sleeping bag, and ask us about rental options. Any additional room arrangements depend on availability and will be confirmed in your written itinerary." },
    { question: "Do we go up and down the same trail?", answer: "Yes. Marangu is the only route that ascends and descends by the same path. Many climbers enjoy seeing the mountain again from a different angle on the way down." },
  ],
  rongai: [
    { question: "Why is Rongai good in the rainy season?", answer: "Rongai approaches from the northern side of the mountain, which sits in a rain shadow. In April, May and November it is often noticeably drier than the southern routes, with more settled weather. Conditions are never guaranteed, but it is the route we most often recommend for wet-month climbs." },
    { question: "Why is the final night in a hut?", answer: "Rongai descends by the Marangu trail, and camping is not permitted on that trail, so your last night is spent in a simple hut at Horombo. It is a warm, sociable end to the climb." },
    { question: "Is Rongai less scenic than the other routes?", answer: "It is quieter and wilder rather than less scenic. You do not pass through the same dense southern rainforest, but you get wide open moorland, the dramatic spires of Mawenzi and the vast Saddle." },
    { question: "Why does Rongai start so far away?", answer: "The northern gate at Nale Moru is a longer drive from Moshi than the southern gates, so the first morning begins with a scenic drive. The walking on day one is short and gentle." },
  ],
  "northern-circuit": [
    { question: "Why is the Northern Circuit the longest route?", answer: "Because it does not head straight for the summit. It circles the entire northern flank of Kibo, which adds days and distance, and that is exactly what gives it the most gradual acclimatisation profile on Kilimanjaro." },
    { question: "Is the Northern Circuit worth the extra days?", answer: "If you can spare nine or ten days, yes. You get the quietest trails, a full circle of the mountain and one of the highest reported summit success rates." },
    { question: "Will I see other climbers?", answer: "Very few. The first three days share the Lemosho trail, but from the northern stretch onward you will often have the mountain almost to yourself." },
    { question: "Which package should I choose: 8, 9 or 10 days?", answer: "Nine days is the classic and our recommendation. Eight is a brisker version for strong, well-prepared trekkers. Ten adds a full rest day at Moir for the calmest and most complete climb." },
  ],
  umbwe: [
    { question: "Is Umbwe dangerous?", answer: "Umbwe is not technical, but it is steep and gains height very quickly, which raises the risk of altitude sickness. It is safe for experienced, well-acclimatised trekkers who take enough days, and we do not recommend it for first-time high-altitude climbers." },
    { question: "Why does Umbwe have the lowest success rate?", answer: "Because it gains more than two kilometres of altitude in the first two days, which leaves the body little time to adapt. Extra rest days make a big difference, which is why we only recommend seven or eight days." },
    { question: "Should my first Kilimanjaro climb be Umbwe?", answer: "We would suggest not. Lemosho on eight days, Machame on seven days or Rongai on seven days all reach the same summit with a gentler profile." },
    { question: "What experience do I need for Umbwe?", answer: "We recommend previous trekking above 4,000 m with no serious altitude problems, excellent fitness and confidence on steep, narrow trails." },
  ],
};

export function getRouteFaqs(route: RouteSlug) {
  return [...COMMON_FAQS, ...ROUTE_FAQS[route]];
}
