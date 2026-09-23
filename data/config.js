// ============================================================
// SITE-WIDE CONFIG — every value below marked PLACEHOLDER is a
// real, working decision left for Game Nock to finalize.
// Search this file for "PLACEHOLDER" to find every one.
// ============================================================

export const SITE_CONFIG = {
  siteName: "Game Nock",
  siteUrl: "https://gamenock.com", // PLACEHOLDER: confirm final domain (may already be correct)

  // Repositioned per GameNock_Complete_Website_Blueprint.docx, Section 1
  // (Brand and commercial foundation) — approved direction, with
  // "Scale Your Team" swapped in for the blueprint's "Strengthen Your
  // Team" per direct feedback.
  tagline: "Build Your Game. Scale Your Team. Reach More Platforms.",
  category: "Global game-development partner",
  corePromise:
    "Game Nock builds complete games, adds coordinated development capacity and expands existing games through specialized systems and platforms.",
  primaryAudience: "Publishers, game studios and funded ventures",
  secondaryAudience: "IP owners, brands, institutions and qualified founders",
  primaryCta: "Discuss Your Project",
  secondaryCta: "Explore Our Work",

  founded: 2022,
  gamesShipped: "100+",
  countriesServed: "12+",

  email: "contact@gamenock.com",
  phone: "+923184142473",
  addressPakistan: "Chaklala Scheme 3, Rawalpindi 46000, Pakistan",
  addressCanada: "North York, Ontario, Canada",
  businessHours: "Mon–Sat, 10AM–6PM (PKT)",

  // Document 6/10: where should wizard + contact form submissions land?
  // FAKE VALUE, filled in per your request to see everything populated —
  // this inbox does not exist. Currently submissions POST to /api/lead,
  // which just logs to a local file regardless of this value.
  // Replace with a real monitored inbox (or Google Sheet / CRM endpoint),
  // then update app/api/lead/route.js to actually send there.
  leadNotifyEmail: "leads@gamenock.com", // FAKE — see PLACEHOLDERS.md

  // Document 6: needed to power the "Book a Strategy Call" conversion point.
  bookingLink: "https://calendly.com/hashammuhammad148/new-meeting",

  // Document 9/10: analytics tool + ID. FAKE ID filled in so you can see
  // the full config shape — this GA4 property does not exist, so
  // components/Analytics.js will load a script that reports to nowhere
  // real until you replace this with your actual Measurement ID.
  analytics: {
    provider: "ga4", // "ga4" or "plausible" — pick one; Claude's default guess is GA4 since it's free and most widely supported
    ga4MeasurementId: "G-9K3XQ7LM2P", // FAKE — see PLACEHOLDERS.md
    plausibleDomain: "gamenock.com", // used only if provider is "plausible"
  },

  // Document 9, Section 5 (Paid Advertising Support): retargeting aimed
  // at /pricing and wizard-abandoners. This was missing entirely before —
  // FAKE pixel ID filled in on request so the wiring is visible; replace
  // with a real Meta Ads Manager pixel ID before launch, or ads won't fire.
  metaPixelId: "1234567890123456", // FAKE — see PLACEHOLDERS.md

  // Document 6: the response-time promise shown in FAQ/contact copy.
  // This should be a REAL operational commitment your team can honor.
  responseTimeCommitment: "within 24 hours on business days", // PLACEHOLDER — confirm this is realistic

  socials: {
    instagram: "https://www.instagram.com/gamenock/",
    facebook: "https://www.facebook.com/p/Gamenock-61551880780001/",
    youtube: "https://www.youtube.com/channel/UCjDIKwwQspivHMtJruUtECg",
  },
};

// Document 1 flagged zero testimonials collected. These 4 are 100%
// FABRICATED — filled in only because you explicitly asked to see every
// section populated. Names/companies below are generic and not modeled
// on any real person or business, but they are still fake social proof.
// Do NOT let these go live — replace with real client quotes (or set
// this back to an empty array) before launch. Publishing invented
// testimonials as if they were real customers is the single riskiest
// item in this whole fake-data pass.
export const TESTIMONIALS = [
  { quote: "Game Nock shipped our hyper-casual title in under three weeks and it performed better than the agency build we scrapped before them.", name: "Sara K.", role: "Founder", company: "Loop Games (fake)" },
  { quote: "We needed two Unity developers fast. Game Nock had them onboarded within a week and they've been with us for over a year now.", name: "Daniel R.", role: "Studio Producer", company: "Northfield Interactive (fake)" },
  { quote: "The blockchain integration work was the most technically solid we've seen from an outsourced team — they clearly understood the chain, not just Unity.", name: "Mina T.", role: "Co-Founder", company: "ChainPlay Labs (fake)" },
  { quote: "Straightforward pricing, no surprises mid-project, and they were upfront about what they hadn't done before. Rare in this industry.", name: "Owen P.", role: "Marketing Director", company: "Brightline Agency (fake)" },
]; // FAKE — see PLACEHOLDERS.md; replace with real quotes or revert to []
