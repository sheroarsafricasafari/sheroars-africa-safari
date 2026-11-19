import type { ProfilePoint } from "@/data/kilimanjaro";
import { DAY_LIBRARY_B, PACKAGES_B } from "./kilimanjaro-packages-b";

export type RouteSlug = "machame" | "lemosho" | "marangu" | "rongai" | "northern-circuit" | "umbwe";
export type TierKey = "midRange" | "luxury";
export type SeasonKey = "peak" | "green";
export type GroupSize = 1 | 2 | 4 | 6;

export interface DaySegment {
  id: string;
  title: string;
  label: string;
  from: string;
  to: string;
  sleepM: number;
  highM: number;
  hours: string;
  distanceKm: number;
  story: string;
  activities: string[];
  meals: ("Breakfast" | "Lunch" | "Dinner")[];
  midNote: string;
  luxNote: string;
}

export interface KiliPackage {
  slug: string;
  route: RouteSlug;
  days: 6 | 7 | 8 | 9 | 10;
  name: string;
  tagline: string;
  hook: string;
  bestFor: string[];
  pace: string;
  successNote: string;
  highlights: string[];
  accommodation: "Camping" | "Huts" | "Camping, final night in a hut";
  recommended: boolean;
  dayIds: string[];
  fromUsd: number;
  pricing: Record<TierKey, Record<SeasonKey, Record<GroupSize, number>>>;
}

const DAY_LIBRARY_A: Record<string, DaySegment> = {
  m1: {
    id: "m1", title: "Machame Gate to Machame Camp", label: "Rainforest day",
    from: "Machame Gate (about 1,800 m)", to: "Machame Camp", sleepM: 2835, highM: 2835,
    hours: "5 to 7 h", distanceKm: 11,
    story: "Your climb begins in the cool, dripping heart of Kilimanjaro's southern rainforest. After a short drive from Moshi and park registration at Machame Gate, you step onto a muddy, root-woven trail beneath giant trees draped in moss. Birdsong and the occasional colobus monkey keep you company while your crew, who have already moved ahead, set up camp. Walk slowly: this first afternoon is about settling into the rhythm of pole pole, learning to breathe steadily and enjoying the green. By late afternoon the forest opens onto Machame Camp, where hot water, tea and popcorn are waiting.",
    activities: ["07:30 Breakfast at your hotel, gear check and transfer to Machame Gate (about 45 minutes)", "09:30 Park registration, meet your porters and set off", "10:00 to 15:30 Steady climb through rainforest with a packed lunch on the trail", "16:00 Arrive at Machame Camp, hot water for washing, tea and snacks", "18:30 Three-course dinner and a briefing on tomorrow"],
    meals: ["Lunch", "Dinner"],
    midNote: "Spacious four-season sleeping tents with foam mattresses, a mess tent with table and chairs, and a private toilet tent shared by the group.",
    luxNote: "Your own tent with a thick camp bed, a private portable toilet, a heated dining tent and hot washing water delivered to your door, with a three-course dinner from your private chef.",
  },
  m2: {
    id: "m2", title: "Machame Camp to Shira Camp", label: "Into the moorland",
    from: "Machame Camp", to: "Shira Camp", sleepM: 3810, highM: 3810,
    hours: "4 to 6 h", distanceKm: 5,
    story: "Today the world changes. The forest thins into heather and moorland, the trail steepens and, as you climb out of the clouds, the great white shoulder of Kibo appears for the first time. This is a shorter, steeper day, so take it slowly and drink plenty of water. By the time you reach Shira Camp on the old volcano's collapsed plateau, you are above 3,800 m and the evening light turns the whole plateau gold. It is cold here after dark, so the camp feels wonderfully cosy.",
    activities: ["07:00 Wake-up with hot tea or coffee and warm washing water", "08:00 Breakfast, then depart", "08:30 to 13:00 Climb steadily through heather to open moorland", "13:00 Lunch stop with views of Kibo and Mount Meru", "14:30 Arrive at Shira Camp, rest and acclimatise", "18:30 Dinner and a health check with your guide"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Hot meals served in the mess tent, with your guide checking your pulse and oxygen levels each evening.",
    luxNote: "Your chef's three-course dinner is served on china by lantern light, with a heater in the dining tent and a private toilet tent kept spotless.",
  },
  mx: {
    id: "mx", title: "Shira Plateau Acclimatisation Day", label: "Rest and adapt",
    from: "Shira Camp", to: "Shira Cathedral and back to camp", sleepM: 3810, highM: 3960,
    hours: "3 to 4 h", distanceKm: 4,
    story: "Few things help your summit chances more than a day of gentle acclimatisation, and the Shira Plateau is the perfect place for it. Today you stay at the same camp, so your body can adapt to the altitude while you explore. After a leisurely breakfast you walk across the plateau toward the dramatic Shira Cathedral, with sweeping views and almost no one else around, then return to camp to sleep at the same height. Afternoon is for rest, photographs and reading. It is a quiet, restorative day that makes the climbs ahead feel easier.",
    activities: ["07:30 Slow breakfast and morning health check", "09:00 to 12:00 Gentle acclimatisation walk across the plateau toward Shira Cathedral", "12:30 Lunch at camp", "13:30 Free time: rest, read, photograph the plateau", "18:30 Dinner and an early night"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "A relaxed rest day with hot meals and a morning health check.",
    luxNote: "A relaxed rest day with a private breakfast, a private breakfast and a candlelit dinner.",
  },
  m3: {
    id: "m3", title: "Shira Camp to Lava Tower to Barranco Camp", label: "Climb high, sleep low",
    from: "Shira Camp", to: "Barranco Camp", sleepM: 3985, highM: 4630,
    hours: "6 to 8 h", distanceKm: 10,
    story: "This is the day that makes Machame work. You climb out of the plateau into the alpine desert, a barren, lunar landscape of lava rock and silence, and reach the strange volcanic spire of Lava Tower at about 4,630 m. This is high, and you feel it, but the secret is what happens next: you drop for hours into the green, protected valley of Barranco, where giant senecios stand like sentinels against the wall of Kibo. By sleeping lower than you climbed, your body adapts far better. Expect a long, rewarding day and a spectacular evening sky.",
    activities: ["07:00 Early breakfast", "08:00 Climb steadily through alpine desert toward Lava Tower", "12:00 Lunch beside Lava Tower at about 4,630 m", "13:00 Descend through a valley of giant senecios", "16:00 Arrive at Barranco Camp, tea and rest", "18:30 Dinner beneath the Barranco Wall"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Hot lunch served at Lava Tower, with your guide monitoring everyone's pulse and oxygen.",
    luxNote: "Lunch is served by your waiter on a camp table at Lava Tower with a hot drink, and your tent and toilet are ready before you arrive at Barranco.",
  },
  m4: {
    id: "m4", title: "Barranco Camp to Karanga Camp", label: "Barranco Wall",
    from: "Barranco Camp", to: "Karanga Camp", sleepM: 3995, highM: 4030,
    hours: "4 to 5 h", distanceKm: 5,
    story: "Today begins with the Barranco Wall, a 250 m rock face that looks daunting from camp but is, in truth, a fun scramble that needs no technical skills, only careful hands and feet. Porters pass you, singing, with their loads on their heads. At the top you are rewarded with open views over the Karanga Valley and Kibo glowing above. After a few hours of rolling valleys you reach Karanga, a quiet camp. This is a shorter day designed to save your energy for the climb ahead.",
    activities: ["07:00 Breakfast", "08:00 Scramble up the Barranco Wall (about 1 to 2 hours)", "10:30 Cross the Karanga Valley with Kibo ahead", "12:30 Lunch", "13:30 Arrive at Karanga Camp, rest", "18:30 Dinner and a briefing on summit night"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Light, high-energy meals and a pre-summit briefing from your lead guide.",
    luxNote: "A summit-preparation briefing, hot towels on arrival and a private chef's high-energy menu to fuel the push.",
  },
  m4b: {
    id: "m4b", title: "Barranco Camp to Barafu Camp", label: "Wall and high camp",
    from: "Barranco Camp", to: "Barafu Camp", sleepM: 4673, highM: 4673,
    hours: "7 to 8 h", distanceKm: 9,
    story: "A big, rewarding day. You begin with the Barranco Wall, a friendly scramble that is far less scary than it looks, then cross the Karanga Valley and pause at Karanga Camp for lunch. After the meal the trail climbs gradually through stony alpine desert to Barafu Camp, high camp at about 4,673 m. The wind is cold and the air is thin, so the evening is about rest, warm layers and early sleep. Your guides will brief you on summit night before an early dinner.",
    activities: ["07:00 Breakfast", "08:00 Barranco Wall scramble", "11:30 Lunch at Karanga Camp", "12:30 to 16:00 Steady climb to Barafu Camp", "16:30 Rest and warm drinks", "17:30 Early dinner, summit briefing and kit check", "19:00 Sleep"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "An early dinner and a summit briefing in the mess tent.",
    luxNote: "A private rest tent, an early three-course dinner and a guide-led kit check so everything is laid out for the night.",
  },
  m5: {
    id: "m5", title: "Karanga Camp to Barafu Camp", label: "High camp",
    from: "Karanga Camp", to: "Barafu Camp", sleepM: 4673, highM: 4673,
    hours: "3 to 4 h", distanceKm: 4,
    story: "A short, steady climb brings you to Barafu, high camp. The word means 'ice' in Swahili and, as the wind sweeps the rocky ridge, you will understand why. The afternoon is for rest, hydration and a nap, because tonight you will wake before midnight. Your guides check you carefully, brief you on the plan for summit night and help you prepare your layers, torch and water. Eat what you can, sleep if you can, and trust the process.",
    activities: ["08:00 Breakfast", "09:00 Short climb to Barafu Camp", "12:30 Lunch and rest", "15:00 Early dinner, summit briefing and kit check", "17:00 to 23:00 Sleep"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Early dinner and a summit-night briefing.",
    luxNote: "A private rest tent, an early three-course dinner and a guide-led kit check so everything is laid out for the night.",
  },
  msum: {
    id: "msum", title: "Summit Day: Barafu to Uhuru Peak to Mweka Camp", label: "Summit night",
    from: "Barafu Camp", to: "Mweka Camp", sleepM: 3100, highM: 5895,
    hours: "12 to 15 h", distanceKm: 17,
    story: "This is the day you came for. Shortly before midnight you are woken with hot tea and biscuits, wrapped in every layer and set off by headtorch. The climb is slow, cold and steep, one deliberate step after another, with a long line of tiny lights above you. Around dawn you reach the crater rim at Stella Point, and as the sky turns orange you walk the final stretch past glaciers to Uhuru Peak at 5,895 m. Take your photographs, hug your guide and look out over Africa. Then descend to Barafu for a rest and a hot meal before continuing to Mweka Camp, where the air feels rich and sleep comes easily.",
    activities: ["23:30 Wake-up, tea and biscuits", "00:00 Depart Barafu by headtorch", "05:30 Stella Point on the crater rim (about 5,756 m)", "06:30 Uhuru Peak (5,895 m) at sunrise", "08:00 Descent to Barafu, rest and brunch", "10:30 to 15:00 Continue to Mweka Camp", "18:00 Dinner and celebration"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Your guide team stays close, with extra snacks, warm drinks and constant health checks on the ascent.",
    luxNote: "Guides walk one-to-one with each climber on the ascent, emergency oxygen is carried close by, and a hot lunch and a celebration dinner are waiting at the lower camp.",
  },
  mout: {
    id: "mout", title: "Mweka Camp to Mweka Gate", label: "Descent and celebration",
    from: "Mweka Camp", to: "Mweka Gate (about 1,640 m) and your hotel", sleepM: 1640, highM: 3100,
    hours: "3 to 4 h", distanceKm: 10,
    story: "A joyful final descent through the rainforest you walked on day one, now bright with green and birdsong. At Mweka Gate you sign out, receive your summit certificate and say thank you to the crew with a song and, if you wish, a tip ceremony. Then it is a short drive back to your hotel, where a hot shower and a clean bed feel like pure luxury. This is the moment the whole mountain finally sinks in.",
    activities: ["07:30 Breakfast and farewell to camp", "08:30 Descend through the rainforest", "11:30 Mweka Gate, certificates and crew thank-you", "12:30 Lunch and transfer to your hotel", "Evening: hot shower, celebration dinner (own cost unless stated)"],
    meals: ["Breakfast", "Lunch"],
    midNote: "Hotel night, bed and breakfast.",
    luxNote: "A luxury hotel night with a celebration dinner, spa access where available and a late checkout.",
  },
  l1: {
    id: "l1", title: "Londorossi Gate to Mti Mkubwa Camp", label: "Western rainforest",
    from: "Londorossi Gate and Lemosho Glades (about 2,360 m)", to: "Mti Mkubwa Camp (\"Big Tree\")",
    sleepM: 2780, highM: 2780, hours: "3 to 4 h", distanceKm: 6,
    story: "Lemosho starts quietly, on the far western flank of Kilimanjaro. The journey to the trailhead is an adventure in itself: you drive from Moshi through farmland and forest, register at Londorossi Gate, then continue along a rough forest track to Lemosho Glades. The first walk is gentle and short, through untouched rainforest where colobus monkeys play in the canopy. By afternoon you reach Mti Mkubwa, or Big Tree Camp, nestled among giant trees. It is a perfect, unhurried start that lets your body settle.",
    activities: ["07:00 Breakfast and drive to Londorossi Gate (about 3 to 4 hours including registration)", "12:00 Lunch at the trailhead", "13:00 to 16:30 Gentle walk through virgin rainforest", "17:00 Arrive at Mti Mkubwa Camp", "18:30 Dinner and a briefing on tomorrow"],
    meals: ["Lunch", "Dinner"],
    midNote: "Warm sleeping tents, a mess tent and a shared toilet tent.",
    luxNote: "Your own tent with a camp bed, a private portable toilet, a heated mess tent and a three-course dinner by your chef.",
  },
  l2: {
    id: "l2", title: "Mti Mkubwa Camp to Shira 1 Camp", label: "Out of the forest",
    from: "Mti Mkubwa Camp", to: "Shira 1 Camp", sleepM: 3500, highM: 3500,
    hours: "5 to 6 h", distanceKm: 8,
    story: "Today you climb out of the forest. The trees shrink into heather and moorland and the air turns crisp. By afternoon you step onto the Shira Plateau, a vast golden bowl and one of the loveliest places on the mountain. Kibo rises in the distance, floating above the clouds. You arrive at Shira 1 Camp at about 3,500 m, with plenty of time to rest, photograph the sunset and enjoy a hot dinner under a spectacular sky.",
    activities: ["07:00 Breakfast", "08:00 Climb steadily through heather and moorland", "12:30 Lunch with views over the plateau", "15:00 Arrive at Shira 1 Camp, rest and acclimatise", "18:30 Dinner and sunset photography"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Hot meals served in the mess tent and a daily health check.",
    luxNote: "A candlelit dinner and a hot-water bowl for washing delivered to your tent.",
  },
  l2b: {
    id: "l2b", title: "Mti Mkubwa Camp to Shira 2 Camp", label: "Out of the forest, onto the plateau",
    from: "Mti Mkubwa Camp", to: "Shira 2 Camp", sleepM: 3840, highM: 3840,
    hours: "7 to 8 h", distanceKm: 14,
    story: "A long and beautiful day in which you leave the forest behind and cross the golden Shira Plateau. After a few hours of climbing through heather and moorland you reach the plateau and pause for lunch near Shira 1, with Kibo floating on the horizon. Then you continue across the vast, empty plateau to Shira 2 Camp at about 3,840 m. It is a long day but the views are exceptional, and you will earn your sleep.",
    activities: ["07:00 Breakfast", "08:00 Climb through moorland to the plateau", "12:30 Lunch near Shira 1", "13:30 to 16:30 Cross the plateau to Shira 2", "17:00 Rest, tea and snacks", "18:30 Dinner"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Hot meals served in the mess tent and a daily health check.",
    luxNote: "Your guides check each climber's health twice and your private chef serves a warm three-course dinner.",
  },
  l3: {
    id: "l3", title: "Shira 1 Camp to Shira 2 Camp", label: "Across the plateau",
    from: "Shira 1 Camp", to: "Shira 2 Camp", sleepM: 3840, highM: 3960,
    hours: "4 to 5 h", distanceKm: 6,
    story: "A gentle day across the plateau gives your body time to adapt. You walk on rolling, open ground with Kibo growing larger on the horizon, and your guide may lead a short extra walk to higher ground in the afternoon, a classic climb high, sleep low move that helps with acclimatisation. The pace is easy, the views are huge and the plateau is almost empty. You arrive at Shira 2 Camp, at about 3,840 m, with plenty of time to rest.",
    activities: ["07:30 Breakfast", "08:30 Easy walk across the Shira Plateau", "12:00 Lunch at Shira 2", "14:30 Optional acclimatisation walk to higher ground", "18:30 Dinner"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "A short day with a relaxed lunch and an optional acclimatisation walk.",
    luxNote: "Chef-prepared meals, a private toilet tent and an unhurried afternoon at camp.",
  },
  l4: {
    id: "l4", title: "Shira 2 Camp to Lava Tower to Barranco Camp", label: "Climb high, sleep low",
    from: "Shira 2 Camp", to: "Barranco Camp", sleepM: 3985, highM: 4630,
    hours: "6 to 8 h", distanceKm: 10,
    story: "This is the day that makes Lemosho work. You climb out of the plateau into the alpine desert and reach the strange volcanic spire of Lava Tower at about 4,630 m. It is high, and you feel it, but what happens next is the secret: you drop for hours into the lush valley of Barranco, where giant senecios stand against the wall of Kibo. By sleeping lower than you climbed, your body adapts far better. A long, rewarding day and a spectacular evening sky.",
    activities: ["07:00 Breakfast", "08:00 Climb through alpine desert toward Lava Tower", "12:00 Lunch beside Lava Tower at about 4,630 m", "13:00 Descend through a valley of giant senecios", "16:00 Arrive at Barranco Camp", "18:30 Dinner beneath the Barranco Wall"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Hot lunch served at Lava Tower, with your guide monitoring everyone's pulse and oxygen.",
    luxNote: "Lunch served at a camp table at Lava Tower, and your tent and toilet are ready before you arrive at Barranco.",
  },
  l5: {
    id: "l5", title: "Barranco Camp to Karanga Camp", label: "Barranco Wall",
    from: "Barranco Camp", to: "Karanga Camp", sleepM: 3995, highM: 4030,
    hours: "4 to 5 h", distanceKm: 5,
    story: "Today begins with the Barranco Wall, a 250 m rock face that looks daunting from camp but is, in truth, a fun scramble that needs no technical skills, only careful hands and feet. At the top you are rewarded with open views over the Karanga Valley and Kibo glowing above. After a few hours of rolling valleys you reach Karanga, a quiet camp. A shorter day, designed to save your energy for the climb ahead.",
    activities: ["07:00 Breakfast", "08:00 Scramble up the Barranco Wall", "10:30 Cross the Karanga Valley", "12:30 Lunch", "13:30 Arrive at Karanga Camp", "18:30 Dinner and summit briefing"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Light, high-energy meals and a pre-summit briefing.",
    luxNote: "A private chef's high-energy menu, hot towels on arrival and a detailed summit briefing.",
  },
  l5b: {
    id: "l5b", title: "Barranco Camp to Barafu Camp", label: "Wall and high camp",
    from: "Barranco Camp", to: "Barafu Camp", sleepM: 4673, highM: 4673,
    hours: "7 to 8 h", distanceKm: 9,
    story: "A big day. You begin with the Barranco Wall, a friendly scramble that looks scarier than it is, then cross the Karanga Valley and stop for lunch at Karanga Camp. After the meal the trail climbs through stony alpine desert to Barafu Camp, high camp at about 4,673 m. The wind is cold and the air is thin, so the evening is about rest, warm layers and an early night. Your guides brief you on summit night before an early dinner.",
    activities: ["07:00 Breakfast", "08:00 Barranco Wall scramble", "11:30 Lunch at Karanga", "12:30 to 16:00 Climb to Barafu Camp", "17:30 Early dinner, summit briefing and kit check", "19:00 Sleep"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "An early dinner and a summit briefing in the mess tent.",
    luxNote: "A private rest tent, early dinner and a guide-led kit check.",
  },
  l6: {
    id: "l6", title: "Karanga Camp to Barafu Camp", label: "High camp",
    from: "Karanga Camp", to: "Barafu Camp", sleepM: 4673, highM: 4673,
    hours: "3 to 4 h", distanceKm: 4,
    story: "A short, steady climb brings you to Barafu, high camp. The word means 'ice' in Swahili and, as the wind sweeps the rocky ridge, you will understand why. The afternoon is for rest, hydration and a nap, because tonight you will wake before midnight. Your guides check you carefully, brief you on summit night and help you prepare your layers, headtorch and water. Eat what you can, sleep if you can and trust the process.",
    activities: ["08:00 Breakfast", "09:00 Short climb to Barafu", "12:30 Lunch and rest", "15:00 Early dinner, summit briefing and kit check", "17:00 to 23:00 Sleep"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Early dinner and a summit-night briefing.",
    luxNote: "A private rest tent, early dinner and a guide-led kit check.",
  },
  lsum: {
    id: "lsum", title: "Summit Day: Barafu to Uhuru Peak to Mweka Camp", label: "Summit night",
    from: "Barafu Camp", to: "Mweka Camp", sleepM: 3100, highM: 5895,
    hours: "12 to 15 h", distanceKm: 17,
    story: "This is the day you came for. Shortly before midnight you are woken with hot tea and biscuits, wrapped in every layer and set off by headtorch. The climb is slow, cold and steep, one deliberate step after another, with a long line of tiny lights above you. Around dawn you reach the crater rim at Stella Point, and as the sky turns orange you walk the final stretch past glaciers to Uhuru Peak at 5,895 m. Take your photographs, hug your guide and look out over Africa. Then descend to Barafu for a rest and a hot meal before continuing to Mweka Camp, where the air feels rich and sleep comes easily.",
    activities: ["23:30 Wake-up, tea and biscuits", "00:00 Depart Barafu by headtorch", "05:30 Stella Point on the crater rim (about 5,756 m)", "06:30 Uhuru Peak (5,895 m) at sunrise", "08:00 Descent to Barafu, rest and brunch", "10:30 to 15:00 Continue to Mweka Camp", "18:00 Dinner and celebration"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Your guide team stays close, with extra snacks, warm drinks and constant health checks on the ascent.",
    luxNote: "Guides walk one-to-one with each climber on the ascent, emergency oxygen is carried close by, and a hot lunch and a celebration dinner are waiting at the lower camp.",
  },
  lout: {
    id: "lout", title: "Mweka Camp to Mweka Gate", label: "Descent and celebration",
    from: "Mweka Camp", to: "Mweka Gate (about 1,640 m) and your hotel", sleepM: 1640, highM: 3100,
    hours: "3 to 4 h", distanceKm: 10,
    story: "A joyful final descent through the rainforest you walked on day one, now bright with green and birdsong. At Mweka Gate you sign out, receive your summit certificate and say thank you to the crew with a song and, if you wish, a tip ceremony. Then it is a short drive back to your hotel, where a hot shower and a clean bed feel like pure luxury. This is the moment the whole mountain finally sinks in.",
    activities: ["07:30 Breakfast and farewell to camp", "08:30 Descend through the rainforest", "11:30 Mweka Gate, certificates and crew thank-you", "12:30 Lunch and transfer to your hotel", "Evening: hot shower, celebration dinner (own cost unless stated)"],
    meals: ["Breakfast", "Lunch"],
    midNote: "Hotel night, bed and breakfast.",
    luxNote: "A luxury hotel night with a celebration dinner, spa access where available and a late checkout.",
  },
  mn1: {
    id: "mn1", title: "Marangu Gate to Mandara Hut", label: "Forest approach",
    from: "Marangu Gate (about 1,860 m)", to: "Mandara Hut", sleepM: 2720, highM: 2720,
    hours: "4 to 5 h", distanceKm: 8,
    story: "Marangu is the original Kilimanjaro trail and the only one with huts. You drive from Moshi to Marangu Gate, register and set off along a clear, gently rising path through lush rainforest alive with birds and monkeys. The gradient is kind and the walking is easy, so enjoy the green. By early afternoon you reach Mandara Hut, a cluster of wooden A-frame cabins in a forest clearing, where hot tea and a hearty dinner await. It is a warm, sociable start.",
    activities: ["08:00 Breakfast and transfer to Marangu Gate (about 45 minutes)", "09:30 Park registration and start walking", "10:00 to 13:00 Climb gently through rainforest", "13:00 Lunch on the trail", "14:30 Arrive at Mandara Hut, rest, optional short acclimatisation walk", "18:30 Dinner in the dining hall"],
    meals: ["Lunch", "Dinner"],
    midNote: "Shared bunk beds in a wooden A-frame hut with foam mattresses and a communal dining hall.",
    luxNote: "Any added hut-comfort arrangements are confirmed in your written itinerary.",
  },
  mn1b: {
    id: "mn1b", title: "Acclimatisation Day at Mandara", label: "Rest and adapt",
    from: "Mandara Hut", to: "A gentle walk and back to Mandara", sleepM: 2720, highM: 2800,
    hours: "2 to 3 h", distanceKm: 4,
    story: "Today you stay at Mandara and give your body an unhurried head start on adapting. After a relaxed breakfast you take a gentle walk near camp, then return for a long, lazy afternoon. It is an extra day for rest and acclimatisation that makes the harder days ahead feel easier.",
    activities: ["08:00 Slow breakfast and health check", "09:30 to 12:00 Gentle guided acclimatisation walk near camp", "12:30 Lunch", "13:30 Free time: rest, read and photograph", "18:30 Dinner"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "A relaxed rest day with hot meals and a morning health check.",
    luxNote: "A leisurely rest day with a private breakfast and a chef's candlelit dinner.",
  },
  mn2: {
    id: "mn2", title: "Mandara Hut to Horombo Hut", label: "Into the moorland",
    from: "Mandara Hut", to: "Horombo Hut", sleepM: 3720, highM: 3720,
    hours: "5 to 6 h", distanceKm: 12,
    story: "The forest falls away and the world opens into giant groundsel, heather and wide, windswept moorland. The path climbs steadily with the pointed spires of Mawenzi appearing ahead and Kibo above. Plan to walk slowly and drink often: you are now above 3,000 m. After a long afternoon you reach Horombo Hut, perched on a ridge at about 3,720 m, with views down over the clouds. Hot tea and a hot meal make the hut feel wonderfully cosy.",
    activities: ["07:30 Breakfast", "08:30 Climb through moorland", "12:30 Lunch on the trail", "15:00 Arrive at Horombo Hut", "18:30 Dinner in the dining hall"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Shared bunk beds in the huts, hot meals in the dining hall and daily health checks.",
    luxNote: "A private chef cooks for your group, hot washing water is delivered to your door and your guide team checks everyone's health twice a day.",
  },
  mn3: {
    id: "mn3", title: "Acclimatisation Day at Horombo", label: "Rest and adapt",
    from: "Horombo Hut", to: "Zebra Rocks and back to Horombo", sleepM: 3720, highM: 4000,
    hours: "3 to 4 h", distanceKm: 5,
    story: "This extra day at Horombo is the single most important piece of the Marangu itinerary and it dramatically improves your summit chances. After breakfast you take a slow acclimatisation walk to Zebra Rocks at about 4,000 m, with the dramatic cliffs of Mawenzi towering above you. Then you return to sleep at Horombo, lower than where you walked. The afternoon is free: rest, read and drink plenty of water. Your body is quietly adapting.",
    activities: ["07:30 Breakfast and health check", "09:00 to 12:00 Acclimatisation walk to Zebra Rocks and back", "12:30 Lunch", "13:30 Rest, read and hydrate", "18:30 Dinner"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "A relaxed rest day with hot meals and health checks.",
    luxNote: "A private breakfast, a post-walk hot drink and a candlelit dinner.",
  },
  mn3b: {
    id: "mn3b", title: "Second Acclimatisation Day", label: "Rest and adapt",
    from: "Horombo Hut", to: "A higher acclimatisation point and back to Horombo",
    sleepM: 3720, highM: 4550, hours: "4 to 5 h", distanceKm: 6,
    story: "A second day of gentle adaptation, with wide views over the saddle and plains. After breakfast you take an acclimatisation walk to a higher point, then return to sleep at Horombo. This is a classic climb-high, sleep-low day, and a quiet, atmospheric way to prepare for the final approach.",
    activities: ["07:30 Breakfast and health check", "09:00 Acclimatisation walk toward higher ground", "11:30 Rest at the high point and photograph", "13:00 Return to Horombo for lunch", "15:00 Rest and hydrate", "18:30 Dinner"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Hot meals, a packed snack for the hike and a health check.",
    luxNote: "A private chef's menu, an extra guide with you on the hike and a restorative hot drink on your return.",
  },
  mn4: {
    id: "mn4", title: "Horombo Hut to Kibo Hut", label: "Across the Saddle",
    from: "Horombo Hut", to: "Kibo Hut", sleepM: 4700, highM: 4700,
    hours: "5 to 6 h", distanceKm: 10,
    story: "Today you cross the Saddle, a vast, windswept alpine desert between Kibo and Mawenzi where nothing grows and the silence is enormous. The path is clear and gently rising, with Kibo's summit cone appearing ahead and growing with each hour. The air is thin and cold. You arrive at Kibo Hut, at about 4,700 m, in the early afternoon. The rest of the day is for resting, eating and preparing your kit for summit night. Try to sleep early.",
    activities: ["07:30 Breakfast", "08:30 Walk across the Saddle", "12:30 Lunch at Kibo Hut", "14:00 Rest and hydrate", "17:00 Early dinner, summit briefing and kit check", "18:30 Sleep"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "An early dinner and a briefing in the dining hall, then an early night in a shared bunk.",
    luxNote: "An early dinner, a private rest area, a guide-led kit check and extra emergency oxygen kept close.",
  },
  mnsum: {
    id: "mnsum", title: "Summit Day: Kibo Hut to Uhuru Peak to Horombo Hut", label: "Summit night",
    from: "Kibo Hut", to: "Horombo Hut", sleepM: 3720, highM: 5895,
    hours: "14 to 16 h", distanceKm: 20,
    story: "This is the day you came for. Shortly before midnight you are woken with hot tea and biscuits, wrapped in every layer and set off by headtorch. The climb is slow, cold and steep, one deliberate step after another, with a long line of tiny lights above you. Around dawn you reach the crater rim at Gilman's Point, and as the sky turns orange you walk the long rim past glaciers to Uhuru Peak at 5,895 m. Take your photographs, hug your guide and look out over Africa. Then descend to Kibo for a rest and a hot meal before continuing to Horombo, where you will sleep deeply.",
    activities: ["23:30 Wake-up, tea and biscuits", "00:00 Depart Kibo Hut by headtorch", "05:30 Gilman's Point on the crater rim (about 5,681 m)", "06:45 Uhuru Peak (5,895 m) at sunrise", "09:00 Descent to Kibo Hut, rest and brunch", "11:30 to 16:00 Continue to Horombo Hut", "18:30 Dinner and celebration"],
    meals: ["Breakfast", "Lunch", "Dinner"],
    midNote: "Your guide team stays close, with extra snacks, warm drinks and constant health checks on the ascent.",
    luxNote: "Guides walk one-to-one with each climber, emergency oxygen is carried close by and a hot lunch and celebration dinner await at the lower hut.",
  },
  mnout: {
    id: "mnout", title: "Horombo Hut to Marangu Gate", label: "Descent and celebration",
    from: "Horombo Hut", to: "Marangu Gate (about 1,860 m) and your hotel", sleepM: 1860, highM: 3720,
    hours: "5 to 6 h", distanceKm: 20,
    story: "A joyful final descent down the same trail you climbed, now with the summit behind you. You pass through moorland and into the forest, which feels like a warm green welcome after the barren heights. At Marangu Gate you sign out, receive your summit certificate and thank the crew with a song and, if you wish, a tip ceremony. Then it is a short drive to your hotel, where a hot shower and a clean bed feel like pure luxury.",
    activities: ["07:30 Breakfast and farewell to Horombo", "08:30 Descend through moorland and forest", "13:30 Marangu Gate, certificates and crew thank-you", "14:30 Lunch and transfer to your hotel", "Evening: hot shower, celebration dinner (own cost unless stated)"],
    meals: ["Breakfast", "Lunch"],
    midNote: "Hotel night, bed and breakfast.",
    luxNote: "A luxury hotel night with a celebration dinner, spa access where available and a late checkout.",
  },
};

// Segments are reused across packages of the same route; resolved itineraries assign day numbers by order.

const PACKAGES_A: KiliPackage[] = [
  {
    slug: "machame-6-day", route: "machame", days: 6, name: "Machame 6-Day Classic",
    tagline: "The classic Whiskey Route, tightened into six days for fit, focused climbers.",
    hook: "Six days is the fastest sensible way up Machame, and it rewards climbers who are fit, well prepared and comfortable at altitude. You pass through all five climate zones, cross the stunning Shira Plateau, scramble the Barranco Wall and push for Uhuru Peak on the sixth morning. It is a thrilling, efficient climb with less margin for acclimatisation, so we recommend it for experienced hikers and anyone who has been above 4,000 m before.",
    bestFor: ["Fit, experienced hikers", "Climbers who have handled altitude before", "Travellers with limited time"],
    pace: "Fast", successNote: "Lower than longer itineraries. Seven days is our recommendation for first-timers.",
    highlights: ["All five climate zones in six days", "Lava Tower climb high, sleep low profile", "The Barranco Wall scramble", "Summit sunrise at Uhuru Peak", "A well-supported, classic route"],
    accommodation: "Camping", recommended: false, dayIds: ["m1", "m2", "m3", "m4b", "msum", "mout"], fromUsd: 2140,
    pricing: {
      midRange: { peak: { 1: 3100, 2: 2500, 4: 2450, 6: 2330 }, green: { 1: 2850, 2: 2300, 4: 2250, 6: 2140 } },
      luxury: { peak: { 1: 5630, 2: 4130, 4: 3740, 6: 3610 }, green: { 1: 5180, 2: 3800, 4: 3440, 6: 3320 } },
    },
  },
  {
    slug: "machame-7-day", route: "machame", days: 7, name: "Machame 7-Day Classic",
    tagline: "The perfect balance of time, scenery and summit chances on Kilimanjaro's most popular route.",
    hook: "Seven days is the sweet spot on Machame. An extra night at Karanga splits the long climb to Barafu into two kinder days, so your body has more time to adapt and you reach summit night feeling strong. You still enjoy everything that makes Machame famous: the rainforest, the Shira Plateau, Lava Tower, the Barranco Wall and a legendary sunrise on Uhuru Peak. This is the version we recommend to most first-time climbers on this route.",
    bestFor: ["First-time climbers", "Fit hikers who want a classic climb", "Anyone who values a well-paced itinerary"],
    pace: "Steady", successNote: "Operators commonly report about 85 percent summit success on 7 days.",
    highlights: ["The recommended Machame length for first-timers", "An extra short day at Karanga for better acclimatisation", "Lava Tower climb high, sleep low", "The Barranco Wall scramble", "Summit sunrise at Uhuru Peak"],
    accommodation: "Camping", recommended: true, dayIds: ["m1", "m2", "m3", "m4", "m5", "msum", "mout"], fromUsd: 2460,
    pricing: {
      midRange: { peak: { 1: 3530, 2: 2860, 4: 2810, 6: 2670 }, green: { 1: 3250, 2: 2630, 4: 2590, 6: 2460 } },
      luxury: { peak: { 1: 6340, 2: 4670, 4: 4230, 6: 4080 }, green: { 1: 5830, 2: 4290, 4: 3890, 6: 3750 } },
    },
  },
  {
    slug: "machame-8-day", route: "machame", days: 8, name: "Machame 8-Day Extended",
    tagline: "The extra rest day on the Shira Plateau that turns a good chance into a great one.",
    hook: "Eight days gives Machame the acclimatisation profile of a longer route. A full rest day on the Shira Plateau lets your body adapt at 3,800 m before the big climb to Lava Tower, and the extra time makes every day gentler and every night easier. You will still sleep at the same camps, but with more rest between the hard parts. If you want the best chance of the summit on this route, and you want to enjoy it, this is the one.",
    bestFor: ["First-timers who want the highest chance of success", "Climbers who dislike rushing", "Older or more cautious climbers"],
    pace: "Relaxed", successNote: "The longest and gentlest Machame itinerary, with the best acclimatisation.",
    highlights: ["A dedicated acclimatisation day on the Shira Plateau", "More rest, lower risk of altitude sickness", "Lava Tower climb high, sleep low", "The Barranco Wall scramble", "The best Machame chance of the summit"],
    accommodation: "Camping", recommended: false, dayIds: ["m1", "m2", "mx", "m3", "m4", "m5", "msum", "mout"], fromUsd: 2770,
    pricing: {
      midRange: { peak: { 1: 3960, 2: 3220, 4: 3170, 6: 3020 }, green: { 1: 3640, 2: 2960, 4: 2920, 6: 2770 } },
      luxury: { peak: { 1: 7050, 2: 5200, 4: 4710, 6: 4540 }, green: { 1: 6490, 2: 4790, 4: 4330, 6: 4180 } },
    },
  },
  {
    slug: "lemosho-6-day", route: "lemosho", days: 6, name: "Lemosho 6-Day Express",
    tagline: "The wild western approach on a compressed timetable, for experienced climbers only.",
    hook: "Lemosho is usually a seven or eight-day journey, and this six-day Express is the fast version for strong, experienced trekkers. You still start in the quiet western rainforest and cross the Shira Plateau, but you cover it in fewer, longer days, with less time to adapt. It is a serious, rewarding climb. If this is your first high-altitude trek, we strongly suggest adding days and choosing the 7 or 8-day Lemosho instead.",
    bestFor: ["Experienced high-altitude trekkers", "Fit climbers with limited time"],
    pace: "Fast", successNote: "Lower than longer Lemosho itineraries. We recommend 7 or 8 days for first-timers.",
    highlights: ["Remote western rainforest", "Shira Plateau views of Kibo", "Lava Tower climb high, sleep low", "Barranco Wall scramble", "A fast route for strong trekkers"],
    accommodation: "Camping", recommended: false, dayIds: ["l1", "l2b", "l4", "l5b", "lsum", "lout"], fromUsd: 2190,
    pricing: {
      midRange: { peak: { 1: 3150, 2: 2550, 4: 2500, 6: 2380 }, green: { 1: 2900, 2: 2340, 4: 2300, 6: 2190 } },
      luxury: { peak: { 1: 5740, 2: 4230, 4: 3840, 6: 3710 }, green: { 1: 5280, 2: 3890, 4: 3540, 6: 3420 } },
    },
  },
  {
    slug: "lemosho-7-day", route: "lemosho", days: 7, name: "Lemosho 7-Day Classic",
    tagline: "Wild forests, the golden Shira Plateau and a well-paced route to the summit.",
    hook: "Seven days on Lemosho is a lovely, well-paced climb. You start in the quiet western rainforest, cross the vast Shira Plateau in a single long day and join the southern circuit for Lava Tower, the Barranco Wall and the push to Uhuru Peak. You have a short extra day at Karanga for acclimatisation and a good chance of the summit. It is an excellent choice if you cannot spare a full eight days.",
    bestFor: ["First-timers with 7 days", "Photographers and scenery lovers", "Climbers who want fewer crowds"],
    pace: "Steady", successNote: "Operators commonly report strong success on 7 days, and higher on 8.",
    highlights: ["Remote western rainforest and few crowds", "Shira Plateau views of Kibo", "Lava Tower climb high, sleep low", "Barranco Wall scramble", "An extra short day for acclimatisation"],
    accommodation: "Camping", recommended: false, dayIds: ["l1", "l2b", "l4", "l5", "l6", "lsum", "lout"], fromUsd: 2510,
    pricing: {
      midRange: { peak: { 1: 3580, 2: 2910, 4: 2860, 6: 2720 }, green: { 1: 3290, 2: 2680, 4: 2630, 6: 2510 } },
      luxury: { peak: { 1: 6450, 2: 4770, 4: 4330, 6: 4180 }, green: { 1: 5930, 2: 4390, 4: 3980, 6: 3850 } },
    },
  },
  {
    slug: "lemosho-8-day", route: "lemosho", days: 8, name: "Lemosho 8-Day Signature",
    tagline: "Our signature climb: the most beautiful route, the gentlest profile and one of the highest summit rates.",
    hook: "If you can spare eight days, this is the Kilimanjaro climb we would choose for our own friends and family. You begin in untouched western rainforest, spend two unhurried days crossing the Shira Plateau, then join the southern circuit for Lava Tower, the Barranco Wall and a calm, well-prepared summit night. The slow, gradual profile gives your body the time it needs, and the scenery is the best on the mountain. It is long, beautiful and rewarding.",
    bestFor: ["First-time climbers who want the best chance of the summit", "Photographers and scenery lovers", "Climbers who prefer a calm, unhurried pace"],
    pace: "Relaxed", successNote: "Operators commonly report about 90 percent summit success on 8 days.",
    highlights: ["Our most recommended route and length", "Two gentle days across the Shira Plateau", "Remote western rainforest with few other climbers", "Lava Tower climb high, sleep low", "One of the highest reported success rates"],
    accommodation: "Camping", recommended: true, dayIds: ["l1", "l2", "l3", "l4", "l5", "l6", "lsum", "lout"], fromUsd: 2820,
    pricing: {
      midRange: { peak: { 1: 4010, 2: 3270, 4: 3220, 6: 3070 }, green: { 1: 3690, 2: 3010, 4: 2970, 6: 2820 } },
      luxury: { peak: { 1: 7150, 2: 5310, 4: 4810, 6: 4650 }, green: { 1: 6580, 2: 4880, 4: 4430, 6: 4280 } },
    },
  },
  {
    slug: "marangu-6-day", route: "marangu", days: 6, name: "Marangu 6-Day Hut Climb",
    tagline: "The classic hut route with the all-important acclimatisation day.",
    hook: "Marangu is the only Kilimanjaro route where you sleep in huts, not tents, and the six-day version, with a full acclimatisation day at Horombo, is the right way to do it. The gradient is gentle, the trail is clear and the huts give you a warm, dry place to rest each night. The price you pay is a simpler, less varied landscape and a route that is busier than most. If you like the idea of a bunk and a roof over your head, this is for you.",
    bestFor: ["Climbers who prefer huts to tents", "Those wanting a gentle gradient", "Travellers in wetter months"],
    pace: "Steady", successNote: "Success varies widely by itinerary, and is best on 6 days with an acclimatisation day.",
    highlights: ["The only route with huts and bunk beds", "A dedicated acclimatisation day at Horombo", "A gentle, steady gradient", "Crossing the vast Saddle between Kibo and Mawenzi", "Summit via Gilman's Point"],
    accommodation: "Huts", recommended: false, dayIds: ["mn1", "mn2", "mn3", "mn4", "mnsum", "mnout"], fromUsd: 2120,
    pricing: {
      midRange: { peak: { 1: 3040, 2: 2470, 4: 2430, 6: 2310 }, green: { 1: 2800, 2: 2270, 4: 2230, 6: 2120 } },
      luxury: { peak: { 1: 5360, 2: 3960, 4: 3570, 6: 3440 }, green: { 1: 4940, 2: 3640, 4: 3280, 6: 3160 } },
    },
  },
  {
    slug: "marangu-7-day", route: "marangu", days: 7, name: "Marangu 7-Day Extended",
    tagline: "Two acclimatisation days at Horombo for a calmer, safer hut climb.",
    hook: "Seven days turns Marangu into a much better climb. Two acclimatisation days at Horombo, one to Zebra Rocks and one higher walk, give your body more time to adapt. The hut nights keep everything simple and warm. The gentle gradient and slow pace make this a lovely choice for climbers who want a roof over their head and a calm, well-prepared summit attempt.",
    bestFor: ["Hut lovers who want a higher chance of success", "Cautious or older climbers", "First-timers wanting comfort"],
    pace: "Relaxed", successNote: "Longer Marangu itineraries with extra acclimatisation report markedly better success than the 5-day version.",
    highlights: ["Two acclimatisation days at Horombo", "The only route with huts", "A second higher acclimatisation walk", "A gentle, steady gradient", "A calm, well-paced summit night"],
    accommodation: "Huts", recommended: true, dayIds: ["mn1", "mn2", "mn3", "mn3b", "mn4", "mnsum", "mnout"], fromUsd: 2440,
    pricing: {
      midRange: { peak: { 1: 3470, 2: 2840, 4: 2790, 6: 2650 }, green: { 1: 3190, 2: 2610, 4: 2570, 6: 2440 } },
      luxury: { peak: { 1: 6040, 2: 4480, 4: 4040, 6: 3890 }, green: { 1: 5560, 2: 4120, 4: 3710, 6: 3580 } },
    },
  },
  {
    slug: "marangu-8-day", route: "marangu", days: 8, name: "Marangu 8-Day Slow Ascent",
    tagline: "The slowest, gentlest way up Kilimanjaro, with three days of built-in acclimatisation.",
    hook: "Eight days is Marangu at its most comfortable. An extra rest day at Mandara with a gentle walk, plus two acclimatisation days at Horombo, give your body additional time to adapt before summit night. Hut accommodation keeps the logistics simple and the evenings warm. This is the route for climbers who prefer comfort and calm and want to allow more time for the climb.",
    bestFor: ["Climbers who want maximum acclimatisation in huts", "Older or more cautious climbers", "Those prioritising comfort"],
    pace: "Very relaxed", successNote: "The gentlest Marangu itinerary, with the most time to adapt.",
    highlights: ["Three acclimatisation days built in", "A gentle walk on the Mandara rest day", "Hut accommodation throughout", "A second higher acclimatisation walk", "The most relaxed route to the summit"],
    accommodation: "Huts", recommended: false, dayIds: ["mn1", "mn1b", "mn2", "mn3", "mn3b", "mn4", "mnsum", "mnout"], fromUsd: 2760,
    pricing: {
      midRange: { peak: { 1: 3890, 2: 3200, 4: 3150, 6: 3000 }, green: { 1: 3580, 2: 2940, 4: 2900, 6: 2760 } },
      luxury: { peak: { 1: 6710, 2: 5000, 4: 4500, 6: 4340 }, green: { 1: 6180, 2: 4600, 4: 4140, 6: 3990 } },
    },
  },
];

export const DAY_LIBRARY: Record<string, DaySegment> = { ...DAY_LIBRARY_A, ...DAY_LIBRARY_B };
export const PACKAGES: KiliPackage[] = [...PACKAGES_A, ...PACKAGES_B];

export const SEASON_LABELS: Record<SeasonKey, { name: string; when: string; note: string }> = {
  peak: { name: "Peak season", when: "1 Jan to 15 Mar, 1 Jun to 31 Oct, 20 to 31 Dec", note: "Clearest skies and the busiest trails." },
  green: { name: "Green season", when: "16 Mar to 31 May, 1 Nov to 19 Dec", note: "Quieter trails, lush scenery, lower prices. Expect rain." },
};

export const TIER_COPY = {
  midRange: {
    name: "Mid-range",
    tagline: "A practical comfort level for climbers who want a clear price and a well-paced mountain itinerary.",
    whoFor: ["Climbers comparing package price and route length", "First-timers who are comfortable with simple camp life", "Friends, couples and small groups sharing costs", "People who would rather spend extra on a longer route than on extras"],
    notFor: "Climbers who want private space, premium sleeping comfort or a more personal level of care on summit night.",
  },
  luxury: {
    name: "Luxury",
    tagline: "The same mountain with a higher comfort option; any added services are confirmed in your written quote.",
    whoFor: ["Climbers who value comfort, rest and recovery at altitude", "Honeymooners, milestone celebrations and anyone marking a special occasion", "Older or more cautious climbers who prefer to ask about available support options", "Travellers who prefer to discuss added comfort arrangements before booking"],
    notFor: "Climbers on a tight budget who are happy with simple camp life.",
  },
} as const;

export const TIER_ROWS = [
  { area: "Guides and crew", icon: "Users", mid: "Your written quote confirms the guiding and crew arrangements for this package.", lux: "Your written quote confirms any additional guiding and crew arrangements for this package." },
  { area: "Your tent and bed", icon: "Tent", mid: "On Marangu and the final night of Rongai, shared bunk beds are in mountain huts. Other sleeping and camp arrangements are confirmed for your route and dates.", lux: "On Marangu and the final night of Rongai, shared bunk beds are in mountain huts. Any added sleeping or camp-comfort arrangements are confirmed for your route and dates." },
  { area: "Toilets and washing", icon: "Bath", mid: "Facilities available at camp are listed in your written itinerary.", lux: "Any private facilities or added washing arrangements are confirmed in your written itinerary." },
  { area: "Food and dining", icon: "UtensilsCrossed", mid: "Meal plans and dietary requirements are confirmed before booking.", lux: "Any additional dining arrangements are confirmed for your package." },
  { area: "Safety and health", icon: "HeartPulse", mid: "Safety equipment and health procedures are confirmed for your climb before booking.", lux: "Any additional safety arrangements are confirmed for your climb before booking." },
  { area: "Hotels before and after", icon: "Hotel", mid: "Hotel category and meal arrangements are confirmed in your written itinerary.", lux: "Any upgraded hotel or meal arrangements are confirmed for your dates." },
  { area: "Transfers", icon: "Car", mid: "Transfer details are confirmed in your written quote.", lux: "Any private or upgraded transfer arrangements are confirmed in your written quote." },
  { area: "Group size", icon: "UsersRound", mid: "Available group size and guide support are confirmed before booking.", lux: "Available group size and additional guide support are confirmed before booking." },
] as const;

// TODO(CONFIRM): confirm each service-level standard in TIER_ROWS (porter ratio, guide ratio, hotel star level, oxygen and medical kit, private toilet, chef and waiter) matches what is actually delivered before launch.
// TODO(CONFIRM): owner to confirm hut availability, the Mawenzi Hut hike and Maundi Crater walk, and the more-private Luxury hut option on Marangu before launch.

export const INCLUSIONS_COMMON = [
  "Your written quote lists the Kilimanjaro park fees and permits included for your itinerary.",
  "Your written quote confirms the guiding and crew arrangements for your climb.",
  "Meal and drinking-water arrangements are confirmed in the itinerary.",
  "Camp accommodation and equipment are confirmed for your chosen route.",
  "Safety equipment and health procedures are confirmed before booking.",
  "Airport and trailhead transfer arrangements are listed in your written quote.",
  "Any before- and after-climb hotel nights are confirmed in your itinerary.",
  "Your pre-climb briefing and gear-check arrangements are confirmed before travel.",
  "Any taxes included in the quoted price are itemized in your written quote.",
];
export const EXCLUSIONS_COMMON = [
  "International flights",
  "Tanzania visa",
  "Travel and medical insurance (must cover trekking to 6,000 m and emergency evacuation)",
  "Tips for the mountain crew (we provide a clear guide before you travel)",
  "Personal clothing and equipment (rental can be arranged)",
  "Drinks other than water, laundry, and personal expenses",
  "Meals not mentioned in the itinerary",
  "Optional extras such as extra hotel nights, private portable toilets (Mid-range) and safaris",
  "Any government fee increase announced after booking",
];

export function resolveDays(pkg: KiliPackage) {
  return pkg.dayIds.map((id, index) => {
    const segment = DAY_LIBRARY[id];
    if (!segment) throw new Error(`Unknown Kilimanjaro day segment: ${id}`);
    return { ...segment, day: index + 1 };
  });
}

export function packagesForRoute(route: RouteSlug) {
  return PACKAGES.filter((pkg) => pkg.route === route).sort((a, b) => a.days - b.days);
}

export function getPrice(pkg: KiliPackage, tier: TierKey, season: SeasonKey, group: GroupSize) {
  return pkg.pricing[tier][season][group];
}

export function profileOf(pkg: KiliPackage): ProfilePoint[] {
  return resolveDays(pkg).map((day) => ({
    day: day.day,
    label: day.to.split(" (")[0],
    sleepM: day.sleepM,
    highM: day.highM,
  }));
}
