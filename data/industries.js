// The five /industries/ pages from Document 3's IA, written directly
// from the Document 2 persona profiles (Gaming Studio, Web3 Startup,
// Educational/IP Owner, Enterprise, and Publisher+Marketing Agency
// combined per Document 3's note that they share similar white-label needs).

export const INDUSTRIES = [
  {
    slug: "gaming-studios",
    name: "Gaming Studios",
    seoTitle: "Dedicated Game Development Teams for Studios",
    heroTitle: "Scale Your Studio's Production Without Scaling Local Headcount",
    heroSubhead:
      "Fill a specific role gap — a Unity developer, a 3D artist, a backlog of QA — with vetted talent embedded in your pipeline, not a rotating cast of freelancers.",
    problems: [
      "Local hiring is slow and expensive, and vetted senior talent is hard to find fast.",
      "Production bottlenecks on one or two specific roles slow the whole pipeline.",
      "Freelance marketplaces don't guarantee consistency or real dedication to your project.",
    ],
    whyGameNock:
      "\"Dedicated\" means dedicated — your hires work on your project, not split across five clients at once, under one accountable studio rather than an individual freelancer.",
    model: "dedicated-teams",
    cta: "Build My Team",
    ctaHref: "/get-started",
    keywords: "hire game developers Pakistan, dedicated game development team",
  },
  {
    slug: "web3-blockchain",
    name: "Web3 & Blockchain",
    seoTitle: "Blockchain Game Development for Web3 Startups",
    heroTitle: "A Game Studio That Actually Understands Wallets, Tokens, and On-Chain Mechanics",
    heroSubhead:
      "We've built on Sui blockchain with ChainSafe and Phantom wallet integration, on-chain trading, and smart contracts — not just \"we do blockchain\" as a bullet point.",
    problems: [
      "Most agencies don't understand wallet integration, tokenomics, or on-chain mechanics.",
      "Your community's trust depends entirely on execution quality — a broken mint or laggy on-chain trade is public and permanent.",
      "Crypto moves fast; a studio with a learning curve on your dime costs you time you don't have.",
    ],
    whyGameNock:
      "See the Azuma-Coin and Blast Wheels case studies — both shipped with real wallet integration and on-chain economies, not concept art.",
    model: "project-development",
    cta: "Talk Through My Token Idea",
    ctaHref: "/get-started",
    keywords: "Web3 game studio, crypto game development partner, NFT game development company",
  },
  {
    slug: "education",
    name: "Education & IP Owners",
    seoTitle: "Interactive Cartoon & Educational Game Development",
    heroTitle: "Turn Your Cartoon or Curriculum Into Something a Child Can Actually Play",
    heroSubhead:
      "We convert existing IP and educational content into interactive experiences — tap, draw, and problem-solve alongside the characters, not just watch them.",
    problems: [
      "Passive video content doesn't engage the way active, interactive content does.",
      "You need production quality that matches your existing brand and character art exactly.",
      "Child-safety and educational appropriateness have to be first-class requirements, not an afterthought.",
    ],
    whyGameNock:
      "Gamisodes is a live example — an episodic mobile experience blending video and gameplay, built to match existing character art precisely.",
    model: "project-development",
    cta: "Show Us Your IP",
    ctaHref: "/get-started",
    keywords: "interactive cartoon development, cartoon to game conversion, educational game development company",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    seoTitle: "Enterprise Game & Interactive Development Partner",
    heroTitle: "A Long-Term Technical Partner, Not a One-Off Vendor",
    heroSubhead:
      "Whether it starts as dedicated staffing or a full project, we're built to be the stable, accountable partner procurement can actually sign off on.",
    problems: [
      "Freelancers and small shops don't scale or provide real continuity.",
      "Procurement processes need a real studio, not an individual contractor.",
      "The engagement needs to flex between project work and staffing as needs evolve.",
    ],
    whyGameNock:
      "100+ games shipped since 2022 for clients across 12+ countries — proof of continuity, not a single case study cherry-picked for a pitch.",
    model: "both",
    cta: "Book a Strategy Call",
    ctaHref: "/contact",
    keywords: "enterprise app development partner Pakistan, long-term game development vendor",
  },
  {
    slug: "publishers-agencies",
    name: "Publishers & Agencies",
    seoTitle: "White-Label Game Development for Publishers & Agencies",
    heroTitle: "A Studio That Follows Your Brief and Stays Invisible When You Need It To",
    heroSubhead:
      "Whether you're a publisher co-developing a title or an agency building a branded activation for your own client, we deliver to spec, on schedule, under NDA if required.",
    problems: [
      "You need a studio that can follow someone else's creative brief precisely, not improvise.",
      "Deadlines are often tied to a release or campaign calendar that doesn't move.",
      "Confidentiality matters — you may need the work to stay unlisted or fully white-labeled.",
    ],
    whyGameNock:
      "Several projects in our portfolio are shown without client names for exactly this reason — we're used to working under confidentiality, not just claiming we can.",
    model: "project-development",
    cta: "Book a Strategy Call",
    ctaHref: "/contact",
    keywords: "white-label game development studio, work-for-hire game development, campaign game development agency",
  },
];

export function getIndustryBySlug(slug) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
