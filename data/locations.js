// The three regional pages — content direction sourced from
// GameNock_Complete_Website_Blueprint.docx, Sections 25–27. Per the
// blueprint's own instruction, these state regional relevance through
// global remote delivery — they do not claim a local office Game Nock
// does not have.

export const LOCATIONS = [
  {
    slug: "saudi-arabia",
    countryName: "Saudi Arabia",
    heroH1: "Game Development Partner for Saudi Arabia",
    heroIntro: "Game Nock supports organizations in Saudi Arabia with complete game development, co-development, multiplayer, backend, platform expansion and interactive products, delivered remotely with agreed time-zone overlap.",
    ctaLabel: "Discuss a Saudi Arabia Project",
    regionalNeeds: [
      { title: "Localization", body: "English/Arabic coordination across the project, not just the marketing copy." },
      { title: "Mobile-first audiences", body: "Design and performance decisions matched to a mobile-first player base." },
      { title: "Entertainment & institutional initiatives", body: "Experience across both consumer game projects and institution-backed interactive products." },
      { title: "Procurement expectations", body: "Clear scoping, milestone reporting and contracts that fit institutional procurement processes." },
    ],
    faqs: [
      { q: "Does Game Nock have an office in Saudi Arabia?", a: "No — delivery is global and remote, with agreed working-hour overlap with your team." },
      { q: "Can the project be run in Arabic?", a: "Yes, with professionally reviewed Arabic content — not machine translation." },
      { q: "What time-zone overlap can we expect?", a: "Confirmed during scoping, based on your team's working hours." },
      { q: "How are contracts and currency handled?", a: "Confirmed during scoping — reach out with your organization's requirements." },
      { q: "Do you support institutional or government-adjacent procurement processes?", a: "Yes, including the documentation and reporting those processes typically require." },
    ],
  },
  {
    slug: "uae",
    countryName: "United Arab Emirates",
    heroH1: "Game Development Partner for United Arab Emirates",
    heroIntro: "Game Nock supports organizations in the United Arab Emirates with complete game development, co-development, multiplayer, backend, platform expansion and interactive products, delivered remotely with agreed time-zone overlap.",
    ctaLabel: "Discuss a United Arab Emirates Project",
    regionalNeeds: [
      { title: "Regional business coordination", body: "Communication and reporting structured for a UAE-based team." },
      { title: "Branded & entertainment products", body: "Experience across branded campaign games and consumer-facing titles." },
      { title: "Mobile & immersive experiences", body: "Mobile, WebGL and early-stage AR/VR capability for regional launches." },
      { title: "Time-zone alignment", body: "Working hours coordinated with your team for real-time collaboration." },
    ],
    faqs: [
      { q: "Does Game Nock have an office in the UAE?", a: "No — delivery is global and remote, with agreed working-hour overlap with your team." },
      { q: "Can the project be run in Arabic?", a: "Yes, with professionally reviewed Arabic content — not machine translation." },
      { q: "What time-zone overlap can we expect?", a: "Confirmed during scoping, based on your team's working hours." },
      { q: "How are contracts and currency handled?", a: "Confirmed during scoping — reach out with your organization's requirements." },
      { q: "Can you support a branded campaign launch on a fixed date?", a: "Yes — campaign timelines are scoped explicitly during discovery so the launch date is realistic before work starts." },
    ],
  },
  {
    slug: "qatar",
    countryName: "Qatar",
    heroH1: "Game Development Partner for Qatar",
    heroIntro: "Game Nock supports organizations in Qatar with complete game development, co-development, multiplayer, backend, platform expansion and interactive products, delivered remotely with agreed time-zone overlap.",
    ctaLabel: "Discuss a Qatar Project",
    regionalNeeds: [
      { title: "Institutional & educational initiatives", body: "Experience building interactive products for institutional and educational buyers." },
      { title: "Branded & entertainment opportunities", body: "Capability across branded campaign games and consumer titles." },
      { title: "Arabic/English delivery", body: "Coordination and content available in both languages where needed." },
      { title: "Remote-first collaboration", body: "A delivery model built around clear reporting rather than requiring an on-site presence." },
    ],
    faqs: [
      { q: "Does Game Nock have an office in Qatar?", a: "No — delivery is global and remote, with agreed working-hour overlap with your team." },
      { q: "Can the project be run in Arabic?", a: "Yes, with professionally reviewed Arabic content — not machine translation." },
      { q: "What time-zone overlap can we expect?", a: "Confirmed during scoping, based on your team's working hours." },
      { q: "How are contracts and currency handled?", a: "Confirmed during scoping — reach out with your organization's requirements." },
      { q: "Do you support institutional or educational procurement processes?", a: "Yes, including the documentation and reporting those processes typically require." },
    ],
  },
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((l) => l.slug === slug);
}
