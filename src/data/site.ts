export const siteConfig = {
  name: "SheRoarsAfricaSafari",
  shortName: "She Roars Africa Safari",
  tagline: "Wild Tanzania, Led by Women Who Roar",
  url: "https://sheroarsafricasafari.com", // TODO(REPLACE): replace with the production domain.
  email: "sheroarsafricasafari@gmail.com",
  phoneDisplay: "+255 748 157 630",
  phoneLocal: "0748 157 630",
  phoneTel: "+255748157630",
  whatsappNumber: "255748157630",
  whatsappUrl: "https://wa.me/255748157630",
  whatsappUrlWithMessage(message: string) {
    return `${this.whatsappUrl}?text=${encodeURIComponent(message)}`;
  },
  defaultWhatsappMessage: "Hello She Roars Africa Safari! I'd like to plan a trip to Tanzania. Could you please share more details about our safaris, Kilimanjaro climbs and Zanzibar packages? Thank you.",
  address: "Office address coming soon", // TODO(REPLACE): publish the verified business address.
  hours: "Monday to Saturday, 8:00 to 18:00 East Africa Time", // TODO(CONFIRM): verify business hours.
  responseTime: "within 24 hours", // TODO(CONFIRM): verify the response-time commitment.
  mapUrl: "", // TODO(REPLACE): set the Google Maps link for the office.
  socials: {
    instagram: "https://instagram.com/replace-this", // TODO(REPLACE)
    facebook: "https://facebook.com/replace-this", // TODO(REPLACE)
    tiktok: "https://tiktok.com/@replace-this", // TODO(REPLACE)
    youtube: "https://youtube.com/@replace-this", // TODO(REPLACE)
  },
};

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const navigation: NavItem[] = [
  { label: "Safaris", href: "/safaris", children: [
    { label: "Serengeti", href: "/safaris/serengeti" },
    { label: "Ngorongoro", href: "/safaris/ngorongoro" },
    { label: "Tarangire", href: "/safaris/tarangire" },
    { label: "Lake Manyara", href: "/safaris/lake-manyara" },
    { label: "All Safari Packages", href: "/safaris/packages" },
  ] },
  { label: "Kilimanjaro", href: "/kilimanjaro", children: [
    { label: "Routes", href: "/kilimanjaro/routes" },
    { label: "Climb Packages", href: "/kilimanjaro/packages" },
    { label: "Climbing Guide", href: "/kilimanjaro/guide" },
  ] },
  { label: "Zanzibar", href: "/zanzibar", children: [
    { label: "Beach Escapes", href: "/zanzibar" },
    { label: "Where to Stay", href: "/zanzibar/where-to-stay" },
    { label: "Activities", href: "/zanzibar/activities" },
    { label: "Safari and Beach", href: "/zanzibar/safari-and-beach" },
  ] },
  { label: "Day Trips", href: "/day-trips" },
  { label: "Experiences", href: "/experiences", children: [
    { label: "Honeymoon and Romance", href: "/experiences/honeymoon-and-romance" },
    { label: "Family Safaris", href: "/experiences/family-safaris" },
    { label: "Photography Safaris", href: "/experiences/photography-safaris" },
  ] },
  { label: "About", href: "/about", children: [
    { label: "Our Story", href: "/about" },
    { label: "Meet the Roarers", href: "/team" },
    { label: "Why She Roars", href: "/why-she-roars" },
    { label: "Giving Back", href: "/giving-back" },
  ] },
  { label: "Travel Guide", href: "/travel-guide" },
];

export const footerLinks = {
  safaris: [
    { label: "Serengeti", href: "/safaris/serengeti" },
    { label: "Ngorongoro", href: "/safaris/ngorongoro" },
    { label: "Tarangire", href: "/safaris/tarangire" },
    { label: "Lake Manyara", href: "/safaris/lake-manyara" },
    { label: "Safari Packages", href: "/safaris/packages" },
    { label: "Great Migration", href: "/safaris/serengeti/great-migration" },
  ],
  more: [
    { label: "Kilimanjaro Routes", href: "/kilimanjaro/routes" },
    { label: "Climb Packages", href: "/kilimanjaro/packages" },
    { label: "Zanzibar", href: "/zanzibar" },
    { label: "Day Trips", href: "/day-trips" },
    { label: "Experiences", href: "/experiences" },
    { label: "Travel Guide", href: "/travel-guide" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Meet the Roarers", href: "/team" },
    { label: "Giving Back", href: "/giving-back" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Plan Your Safari", href: "/plan-your-safari" },
  ],
};
