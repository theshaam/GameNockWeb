// The six Project Development categories — content sourced directly
// from Document 4 (Service Architecture). Each entry drives both the
// /services/[slug] page and the pricing cards.

export const SERVICES = [
  {
    slug: "casual-games",
    ctaLabel: "Get a Scoped Quote",
    icon: "Zap",
    name: "Simple & Casual Games",
    shortDesc: "Hyper-casual, endless runners, level-progression & RPG-style games.",
    heroTitle: "Casual & Hyper-Casual Game Development",
    heroSubhead:
      "A low-cost, fast way to test an idea or run a campaign — without heavy production investment.",
    whoItsFor: ["Startup Founders", "Marketing Agencies", "Indie Developers"],
    problemsSolved:
      "Need a fast, affordable way to validate a game idea or launch a campaign activation without committing to a full production budget.",
    technologies: ["Unity", "C#", "DOTween", "LeanTween", "AdMob", "Firebase", "AppLovin", "Unity Ads"],
    monetization: ["Ads", "In-app purchases", "Subscriptions"],
    platforms: ["Web", "Mobile"],
    pricing: {
      startingLabel: "from $50",
      tiers: [
        { label: "2D web, no monetization/customization", price: "$50" },
        { label: "Mobile, no monetization/customization", price: "$100" },
        { label: "With monetization, customization & ads", price: "$300" },
        { label: "3D version, no monetization", price: "$300" },
        { label: "3D version, with monetization/customization", price: "$500" },
      ],
    },
    caseStudySlugs: ["crawl-out-gecko-escape", "space-shooter-alien-invasion"],
    faqs: [
      { q: "How fast can a casual game actually be built?", a: "Simple 2D builds can move quickly — exact timeline depends on scope, confirmed after a discovery call." },
      { q: "Is the starting price really the full cost?", a: "It's an honest floor for the simplest version of this category. Monetization, customization, and 3D all add to that base — we'll scope your exact price before anything starts." },
      { q: "Do you handle App Store/Play Store submission?", a: "Yes — submission and store listing setup are part of the delivery process." },
    ],
  },
  {
    slug: "multiplayer-games",
    ctaLabel: "Get a Scoped Quote",
    icon: "Swords",
    name: "Multiplayer Games",
    shortDesc: "PvP competition, power-ups, and customization drive revenue.",
    heroTitle: "Multiplayer Game Development",
    heroSubhead: "Engagement and retention through competitive play — built on real-time netcode by engineers who've shipped it before.",
    whoItsFor: ["Gaming Studios", "Investor-Backed Startups", "Enterprise"],
    problemsSolved:
      "Building fair, responsive real-time multiplayer requires experienced backend/netcode engineering most generalist teams don't have in-house.",
    technologies: ["Photon PUN2", "Photon Fusion", "Photon Voice", "PlayFab", "Node.js", "ToxMod"],
    monetization: ["Power-up IAPs", "Cosmetics / customization", "Ranked & season systems"],
    platforms: ["Mobile", "PC"],
    pricing: { startingLabel: "from $1,500", tiers: [] },
    caseStudySlugs: ["highnoon"],
    faqs: [
      { q: "How do you handle backend/netcode at scale?", a: "We use production-tested tools like Photon Fusion/PUN2 and PlayFab, with backend-authoritative logic to prevent cheating." },
      { q: "Can an existing single-player game get multiplayer added later?", a: "Yes — it depends on the existing architecture, which we assess during discovery." },
    ],
  },
  {
    slug: "blockchain-games",
    ctaLabel: "Talk Through Your Token/NFT Idea",
    icon: "Link2",
    name: "Blockchain / Crypto Games",
    shortDesc: "For meme coin, crypto, and NFT projects, with wallet integration.",
    heroTitle: "Games That Give Your Token Real Utility",
    heroSubhead:
      "From wallet integration to on-chain trading, we've built blockchain games on Sui, with ChainSafe and Phantom wallet integration — not just \"we do blockchain\" as a bullet point.",
    whoItsFor: ["Web3 Startups", "Investor-Backed Startups"],
    problemsSolved:
      "Turning a token or NFT collection into something with real in-game utility, and building on-chain trust with a community that's naturally skeptical of execution quality.",
    technologies: ["Thirdweb SDK", "ChainSafe Meta Wallet", "Phantom Wallet", "Sui Blockchain (Move)", "Custom Sui SDK", "Smart Contracts", "Web3 Bridge"],
    // Document 4, Section 4: blockchain gets an 11th subsection — Wallets
    // & Chains — since that's a distinct buyer concern for Web3 founders.
    walletsChains: ["Sui Blockchain (Move)", "ChainSafe Meta Wallet", "Phantom Wallet"],
    monetization: ["Crypto in-app purchases", "Play-to-earn", "NFT trading/marketplace integration"],
    platforms: ["Web", "Mobile", "PC"],
    pricing: { startingLabel: "from $1,500", tiers: [] },
    caseStudySlugs: ["azuma-coin", "blast-wheels"],
    faqs: [
      { q: "Which chains and wallets do you support?", a: "We've shipped on Sui blockchain with ChainSafe and Phantom wallet integration — we'll confirm fit for your specific chain during discovery." },
      { q: "Do you handle smart contract security/auditing, or just the game layer?", a: "We build the game and integration layer; for a full third-party audit we can recommend and coordinate with specialist auditors." },
      { q: "Can you integrate with our existing token?", a: "Yes — this is discussed in detail during the discovery call." },
    ],
  },
  {
    slug: "interactive-cartoons",
    ctaLabel: "Show Us Your IP",
    icon: "Paintbrush",
    name: "Interactive Cartoons",
    shortDesc: "Turn a cartoon into a playable world viewers can join.",
    heroTitle: "Turn Your Cartoon Into Something Kids Can Actually Play",
    heroSubhead:
      "We convert existing IP and educational content into interactive experiences — tap, draw, and problem-solve alongside the characters, not just watch them.",
    whoItsFor: ["Educational Companies", "IP / Cartoon Owners"],
    problemsSolved:
      "Turning passive content into something a viewer actively participates in — for education specifically, using interactive play and finger-drawing input to engage toddlers and young learners more effectively than video alone.",
    technologies: ["Unity Video Player", "Unity Timeline", "Unity UI", "Figma"],
    monetization: ["Often client/brand-funded", "IAP/subscription for consumer-facing apps"],
    platforms: ["Mobile", "Web"],
    pricing: { startingLabel: "from $500 / minute", tiers: [
      { label: "Per 1-minute segment (1–3 mini-games or 1–5 interactive scenes)", price: "$500" },
    ] },
    caseStudySlugs: ["gamisodes"],
    faqs: [
      { q: "Can you match our existing character art style exactly?", a: "Yes — style matching is a core part of the process; we work from your existing art/brand guidelines." },
      { q: "Is this safe and age-appropriate for young children?", a: "Child-safety and educational appropriateness are treated as first-class requirements, not an afterthought." },
      { q: "How does the video-to-game transition actually work?", a: "We use Unity's Timeline and Video Player tooling to hand off seamlessly between video playback and interactive gameplay." },
    ],
  },
  {
    slug: "vr-experiences",
    ctaLabel: "Discuss Your VR Project",
    icon: "Box",
    name: "VR Experiences",
    shortDesc: "Any category above, built for Quest & Vision Pro.",
    heroTitle: "VR Experiences, Built by Our Proven Unity Team",
    heroSubhead:
      "We don't have a VR title shipped yet — what we have is a Unity and AR/VR-capable team ready to apply the same rigor that shipped 100+ other titles to your headset project.",
    whoItsFor: ["Enterprise / VR Buyers"],
    problemsSolved:
      "Training simulations and immersive brand experiences are genuinely harder to build well because of custom spatial controls and hand-tracking UX — which is why this is priced as a premium layer rather than a flat price.",
    technologies: ["Unity", "XR Toolkits", "Meta Quest SDK", "Apple Vision Pro SDK"],
    monetization: ["Typically a direct enterprise contract fee"],
    platforms: ["Meta Quest", "Apple Vision Pro"],
    pricing: { startingLabel: "Custom quote", tiers: [] },
    caseStudySlugs: ["sample-vr-onboarding-experience"], // FAKE sample — see data/portfolio.js header comment
    honestGap: true, // Document 4/5: no real VR case study exists yet — page must say so plainly, not hide it.
    gapNote: "We don't have a shipped VR project yet. The case study below is a fabricated example added only to preview the page layout — not real client work.",
    faqs: [
      { q: "Do you have existing VR titles we can see?", a: "Not yet — we're honest about that. What we do have is a proven Unity and AR/VR-capable team, and we'd rather tell you that directly than overclaim." },
      { q: "Which headsets do you build for?", a: "Meta Quest and Apple Vision Pro." },
    ],
  },
  {
    slug: "trivia-games",
    ctaLabel: "Get a Scoped Quote",
    icon: "HelpCircle",
    name: "Trivia Games",
    shortDesc: "Simple, lightweight builds — fast to launch, low complexity.",
    heroTitle: "Trivia Game Development",
    heroSubhead: "A cheap, fast, simple engagement tool — the lowest floor price of any category.",
    whoItsFor: ["Marketing Agencies", "Startup Founders"],
    problemsSolved: "Need a very low-cost, quick-turnaround engagement tool, often tied to a campaign or activation.",
    technologies: ["Unity", "C#", "Standard mobile ad/analytics SDKs"],
    monetization: ["Ads", "Light IAP"],
    platforms: ["Mobile", "Web"],
    pricing: { startingLabel: "from $200", tiers: [] },
    caseStudySlugs: ["sample-trivia-arena"], // FAKE sample — see data/portfolio.js header comment
    honestGap: true, // no real trivia project yet, per Document 4/5
    gapNote: "We don't have a named trivia project yet. The case study below is a fabricated example added only to preview the page layout — not real client work.",
    faqs: [
      { q: "How fast can a trivia game be built and launched?", a: "This category has the fastest realistic turnaround of anything we build — exact timeline confirmed during discovery." },
    ],
  },
];

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
