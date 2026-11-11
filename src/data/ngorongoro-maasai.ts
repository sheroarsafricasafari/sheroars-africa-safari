// TODO(CONFIRM): Verify the described community visit practices and logistics before publication.
export const maasaiBreadcrumbs = [
  { title: "Home", href: "/" },
  { title: "Safaris", href: "/safaris" },
  { title: "Ngorongoro", href: "/safaris/ngorongoro" },
  { title: "Maasai Cultural Visit", href: "/safaris/ngorongoro/maasai-cultural-visit" },
] as const;

export type FeeTransparency = {
  feePerPerson: number | null;
  recipient: string;
  communityShare: string;
  craftPayment: string;
  labels: { fee: string; recipient: string; share: string; crafts: string };
};

export const maasaiPage = {
  path: "/safaris/ngorongoro/maasai-cultural-visit",
  metadata: {
    title: "Maasai Cultural Visit in Ngorongoro: Respectful Boma Tour",
    description: "Meet a Maasai community near the Ngorongoro Crater on a respectful, consent-based cultural visit. What to expect, etiquette and how to choose ethically.",
    image: "/images/safaris/ngorongoro/maasai/hero.jpg",
  },
  // TODO(CONFIRM): Use only supplied photographs of people taken with consent and shown with dignity.
  hero: {
    image: "/images/safaris/ngorongoro/maasai/hero.jpg",
    imageAlt: "A guide and visitors listening to a community representative at a Maasai homestead",
    eyebrow: "MAASAI CULTURE",
    title: "A Maasai Cultural Visit, Done With Respect",
    subtitle: "Step into a Maasai boma near the Ngorongoro Crater, meet the families who live here and hear, in their own words, how people and animals have shared this land for generations. This is a visit built on invitation, conversation and fair exchange, not on a quick photo stop.",
    primaryCta: { label: "Plan a Cultural Visit", href: "/plan-your-safari?type=Safari" },
    secondaryCta: { label: "How a visit works", href: "#visit" },
    // TODO(CONFIRM): Confirm consent-based, community-led and fair-exchange practices.
    badges: [
      { icon: "consent", label: "Consent-Based" },
      { icon: "community", label: "Community-Led" },
      { icon: "exchange", label: "Fair Exchange" },
    ],
  },
  // TODO(CONFIRM): Confirm designated visit locations, participant roles and language arrangements.
  quickFacts: [
    { label: "Where", text: "Designated cultural bomas near the Ngorongoro Crater rim and conservation area headquarters", icon: "landscape" },
    { label: "How long", text: "Usually 1 to 2 hours", icon: "clock" },
    { label: "Who you meet", text: "Maasai families, elders, women artisans and young men who share daily life", icon: "community" },
    { label: "Languages", text: "Maa and Swahili, with your guide translating into English", icon: "journey" },
    { label: "Best for", text: "Curious travelers of all ages who like conversation more than performance", icon: "wildlife" },
  ],
  // TODO(CONFIRM): Review the cultural history and the description of current Maasai life with a reliable source.
  story: {
    image: "/images/safaris/ngorongoro/maasai/story.jpg",
    imageAlt: "Visitors speaking with a Maasai family at a homestead",
    eyebrow: "THE STORY",
    title: "Not a Show. A Conversation.",
    paragraphs: [
      "The Maasai are semi-nomadic pastoralists whose lives have long revolved around cattle, grazing lands and a deep knowledge of the animals that share them. In the Ngorongoro highlands, Maasai families have lived alongside wildlife for generations, and that way of life is part of what makes this place so special.",
      "A cultural visit is your chance to meet some of those families. You are welcomed into a boma, the circular homestead where families and livestock live, you hear songs, see a dance, learn how houses are built and meet the women who make the beadwork you may have admired. You ask questions, and they answer.",
      "The difference between a good visit and a hurried one is simple: who designed it, and who benefits. A great visit is arranged with the community, takes its time and pays people fairly. A poor one is a ten-minute stop on the way to lunch. We aim for the first kind, and we will tell you how to spot the difference.",
      "And a small warning, offered with affection: the questions the children ask you may be better than the ones you ask them.",
    ],
    pullQuote: "The best cultural visit is the one where you leave with more questions than photographs.",
  },
  visit: {
    id: "visit",
    eyebrow: "WHAT TO EXPECT",
    title: "A Visit, Step by Step",
    intro: "Every community runs its visit a little differently. This is the usual shape of the experience.",
    // TODO(CONFIRM): Visit programs and demonstrations vary by community and require current confirmation.
    steps: [
      { title: "A welcome at the gate", text: "Your guide introduces you, and the community greets you, usually with songs. Elders hold authority in Maasai life, so an elder or community representative sets the terms of the visit." },
      { title: "Song and dance", text: "You may see the famous jumping dance, in which young men compete to leap highest, and you may be invited to join in. Joining is optional and always fun to watch." },
      { title: "Inside a home", text: "Houses are built by women from wood, mud and cow dung. Step inside and see how a family sleeps, cooks and stays warm. It is small and smoky, and it is home." },
      { title: "Daily life", text: "Hear how families look after cattle and goats, how they get water and how children learn. Ask anything, politely." },
      { title: "Making fire", text: "A traditional fire-making demonstration is common. Expect laughter if you try it yourself." },
      { title: "The craft market", text: "Women sell beadwork and handmade items directly. What you buy goes to the person who made it. Bargain gently and kindly." },
      { title: "A thank-you and goodbye", text: "Leave with a handshake, some new words in Maa and a better sense of a living culture." },
    ],
    footnote: "Programs vary by community and by day.",
  },
  // TODO(CONFIRM): Verify the described visit standards and our ability to meet the closing commitment.
  comparison: {
    eyebrow: "HOW TO CHOOSE",
    title: "How to Tell a Good Visit From a Hurried Stop",
    goodTitle: "What a good visit looks like",
    good: [
      "The community decides how the visit is run.",
      "You are told the visit fee upfront, and it goes to the community.",
      "You buy crafts directly from the person who made them.",
      "Photography rules are explained before you start, and people can say no.",
      "There is time for real conversation, usually an hour or more.",
      "You meet the same community, not a rotating stage set.",
    ],
    warningTitle: "Warning signs",
    warnings: [
      "A ten-minute stop on the roadside.",
      "Fees that are vague or demanded after the visit.",
      "Pressure to buy, or to pay for photographs on the spot.",
      "Staged performances with no chance to talk.",
      "Photographing people without asking.",
      "A guide who cannot tell you where the money goes.",
    ],
    closing: "We design our visits with the left-hand column in mind. If anything ever feels like the right-hand one, tell your guide and we will change course.",
  },
  // TODO(CONFIRM): Confirm current host guidance, especially the guidance about gifts to children.
  etiquette: {
    eyebrow: "BEING A GOOD GUEST",
    title: "Eight Small Things That Make a Big Difference",
    items: [
      { title: "Ask before you photograph", text: "Always ask before taking a portrait, and respect anyone who says no. Taking photos of people on the roadside without permission is considered rude." },
      { title: "Greet first", text: "A warm hello and a handshake go a long way. Let your guide introduce you." },
      { title: "Dress modestly", text: "Cover shoulders and knees, and choose simple, muted colors." },
      { title: "Listen more than you speak", text: "Ask open questions and wait for the answer." },
      { title: "Do not hand out sweets or money", text: "Please do not give candy or cash to children. Support the community through the visit itself and the crafts you buy." },
      { title: "Buy from the maker", text: "Purchase crafts directly from the person who made them, and bargain with a smile." },
      { title: "Do not treat it like a museum", text: "These are homes. Ask before entering one, and mind the livestock." },
      { title: "Be patient", text: "A good visit takes time. Switch off the schedule for an hour." },
    ],
  },
  questions: {
    eyebrow: "START A CONVERSATION",
    title: "Questions Worth Asking",
    intro: "Not sure what to say? Try one of these, and let the conversation wander.",
    items: [
      "What does a normal day look like for you?",
      "How do you decide where the cattle graze?",
      "What is the hardest part of this season?",
      "What do you wish visitors knew about Maasai life today?",
      "How do the children learn the names of so many animals?",
      "What do you do for fun?",
    ],
  },
  // Fees remain hidden until the owner confirms every field.
  feeTransparency: {
    feePerPerson: null, // TODO(REPLACE): add the confirmed visit fee per person.
    recipient: "", // TODO(REPLACE): name the confirmed fee recipient.
    communityShare: "", // TODO(REPLACE): add the confirmed community-fund share.
    craftPayment: "", // TODO(REPLACE): explain the confirmed craft payment process.
    labels: {
      fee: "Visit fee per person",
      recipient: "Who receives it",
      share: "Community fund share",
      crafts: "How crafts are paid",
    },
  } satisfies FeeTransparency,
  showContextNote: false, // TODO(OWNER DECISION): keep hidden unless the owner approves this context note.
  contextNote: {
    title: "A Note on Context",
    text: "The future of communities in the conservation area is a subject of public discussion in Tanzania and abroad, including questions about land, services and relocation. Different groups describe the situation differently. Whatever your view, the practical principles do not change: visit only with consent, pay fairly, ask before photographing and listen more than you speak.",
  },
  // TODO(CONFIRM): Confirm visit scheduling and availability of longer community-led experiences.
  fitting: {
    eyebrow: "PLAN IT IN",
    title: "Fitting It Into Your Safari",
    cards: [
      { title: "When", text: "The visit usually fits on the way between the crater rim and the Serengeti, or on a free afternoon during a rim stay. Allow one to two hours." },
      { title: "Pair it with", text: "The crater descent, the Empakaai walk or the stop at Olduvai Gorge.", links: [
        { label: "The crater descent", href: "/safaris/ngorongoro/crater" },
        { label: "The Empakaai walk", href: "/safaris/ngorongoro/highlands-empakaai" },
        { label: "Olduvai Gorge", href: "/safaris/ngorongoro/olduvai-gorge" },
      ] },
    ],
    callout: "Want something longer? Ask us about community-led experiences, including walks with Maasai guides and longer stays.",
  },
  journeys: {
    eyebrow: "BUILD IT INTO YOUR SAFARI",
    title: "Journeys That Include a Ngorongoro Visit",
    subtitle: "Every itinerary can be tailored to your dates and pace.",
    noPackages: "Tell us what you have in mind, and we will help shape your Ngorongoro journey.",
    links: [
      { label: "View All Safari Packages", href: "/safaris/packages" },
      { label: "Back to Ngorongoro", href: "/safaris/ngorongoro" },
    ],
  },
  faqSection: {
    eyebrow: "GOOD TO KNOW",
    title: "Maasai Cultural Visit Questions, Answered",
  },
  // TODO(CONFIRM): Confirm that fees are included and paid directly, visit locations, and overnight options.
  faq: [
    { question: "What is a Maasai boma?", answer: "A boma is a Maasai homestead, a circular compound of family houses with space for livestock inside. Many families live in them, and a cultural boma is one that welcomes visitors by arrangement." },
    { question: "How long does a Maasai cultural visit take?", answer: "Usually one to two hours, depending on the community and how much conversation you have." },
    { question: "Is a Maasai village visit ethical?", answer: "It can be, when the community controls the visit, fees are clear and go to them, and visitors behave respectfully. Look for the signs on this page and choose a visit designed with the community." },
    { question: "Can I take photographs?", answer: "Photography is often part of a hosted visit, but always ask before taking portraits and respect anyone who declines. Photographing people on the roadside without permission is considered rude." },
    { question: "How much does it cost?", answer: "Fees vary between communities and are agreed with them. Ours is included in your itinerary price and paid directly to the community." },
    { question: "Is it suitable for children?", answer: "Generally yes. Children often love the songs, the animals and meeting other children. Please keep them close and supervised around livestock." },
    { question: "Do I need to buy anything?", answer: "No. Buying crafts directly from the artisans is a good way to support families, but it is never required." },
    { question: "What should I wear?", answer: "Modest, comfortable clothing in muted colors, and closed shoes. The ground can be dusty and muddy." },
    { question: "Will anyone speak English?", answer: "Your guide will translate. Some community members speak English and Swahili, and everyone enjoys it when you try a few words of Maa." },
    { question: "Where does the visit take place?", answer: "At a designated cultural boma near the conservation area headquarters or the crater rim, depending on your route." },
    { question: "Can I stay overnight with a Maasai community?", answer: "Longer, community-led experiences exist in some parts of Tanzania. Ask us what is possible for your journey.", href: "/plan-your-safari?type=Safari", linkLabel: "Ask about your journey" },
  ],
  // TODO(CONFIRM): Confirm that the described visit can be arranged as promised.
  cta: {
    eyebrow: "A MEETING, NOT A MONUMENT",
    title: "Ready to Meet the Families of the Highlands?",
    description: "Tell us your dates and what you hope to learn, and we will weave a respectful Maasai cultural visit into your Ngorongoro safari, with enough time for conversation and none for rush.",
    image: "/images/safaris/ngorongoro/maasai/cta.jpg",
    imageAlt: "Visitors and a local guide sharing a conversation at a Maasai homestead",
    primary: { label: "Plan a Cultural Visit", href: "/plan-your-safari?type=Safari" },
    secondaryLabel: "Chat With Our Team",
    whatsappMessage: "Hello She Roars Africa Safari! I would like to plan a Maasai cultural visit in Ngorongoro.",
  },
} as const;
