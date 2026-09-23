// ============================================================
// FULLY POPULATED WITH FAKE / ILLUSTRATIVE DATA, PER YOUR EXPLICIT
// REQUEST ("fill everything with fake or of your choice ... I wanna
// see it allllll"). This overrides the honesty-over-invention policy
// this whole build followed up to this point — that's your call to
// make, not mine, but it means every `results` value and both sample
// case studies below are FABRICATED, not real numbers gathered from
// GameNock's records. See PLACEHOLDERS.md for the full replace-before-
// launch checklist — do not let any of this go live as-is.
// ============================================================

export const PORTFOLIO = [
  {
    slug: "azuma-coin",
    name: "Azuma-Coin",
    image: "/images/portfolio/azuma-coin.jpg",
    role: "Specialized Development",
    confidential: false,
    flagship: true,
    category: "blockchain-games",
    platform: "PC",
    dim: "3D",
    genres: ["Action", "Combat", "RPG", "Shooter"],
    link: "azumacoins.io",
    stack: ["Unity", "C#", "PlayFab"],
    tools: ["Photon PUN 2", "ChainSafe Meta Wallet", "Blender", "Figma", "Addressables"],
    challenge: "Needed a multiplayer game that gave their AZUM token and NFT items real utility, not just speculative value.",
    solution: "A full 3D multiplayer PvP action/RPG built in Unity, with crypto IAPs and a blockchain-driven in-game economy.",
    features: ["PvP combat", "Enjin-backed collectible items", "Play-to-earn token rewards", "Backend-controlled player stats"],
    teamComposition: ["Unity Developer", "Blockchain Developer", "3D Artist/Animator", "Game Designer", "QA Tester"],
    results: { stat1: { label: "Registered wallets", value: "18,400+" }, stat2: { label: "Peak concurrent players", value: "1,200" }, stat3: { label: "On-chain transactions", value: "62,000+" } }, // FAKE — replace with real figures
  },
  {
    slug: "gamisodes",
    name: "Gamisodes",
    role: "Co-Development",
    confidential: false,
    flagship: true,
    category: "interactive-cartoons",
    platform: "Mobile",
    dim: "2D / 2.5D / 3D",
    genres: ["Casual", "Arcade", "Puzzle", "Interactive Story"],
    link: "gamisodes.com",
    stack: ["Unity", "C#"],
    tools: ["Unity Video Player", "Timeline", "Figma"],
    challenge: "Wanted episodic cartoon content to be more than passive video — something viewers could actually interact with.",
    solution: "An episodic mobile game blending 2D/2.5D/3D with seamless video-to-game transitions and embedded mini-games.",
    features: ["Episodic structure", "Endless mini-games", "Direct video-to-gameplay handoff"],
    teamComposition: ["Unity Developer", "Game Designer", "2D/3D Artist", "Video Designer"],
    results: { stat1: { label: "Downloads", value: "82,000+" }, stat2: { label: "Avg. session length", value: "11 min" }, stat3: { label: "App store rating", value: "4.6★" } }, // FAKE — replace with real figures
  },
  {
    slug: "highnoon",
    name: "HighNoon",
    role: "Specialized Development",
    confidential: false,
    flagship: true,
    category: "multiplayer-games",
    platform: "Mobile",
    dim: "3D",
    genres: ["Action", "Combat", "Fighting", "Duel"],
    link: null,
    stack: ["Unity", "C#", "PlayFab"],
    tools: ["Photon Fusion", "AdMob", "Unity Ads", "AppLovin"],
    challenge: "Needed a fair, cheat-resistant real-time 1v1 combat game with real monetization built in.",
    solution: "Backend-controlled duels with a \"safe looting\" system and a full ad/IAP monetization stack.",
    features: ["Real-time 1v1 PvP", "Backend-authoritative combat (anti-cheat)", "Safe looting mechanic"],
    teamComposition: ["Unity Developer", "Backend Developer", "Game Designer", "QA Tester"],
    results: { stat1: { label: "Downloads", value: "140,000+" }, stat2: { label: "Day-7 retention", value: "24%" }, stat3: { label: "App store rating", value: "4.4★" } }, // FAKE — replace with real figures
  },
  {
    slug: "blast-wheels",
    name: "Blast Wheels",
    image: "/images/portfolio/blast-wheels.png",
    role: "Specialized Development",
    confidential: false,
    flagship: true,
    category: "blockchain-games",
    platform: "Mobile, Web, PC",
    dim: "3D",
    genres: ["Racing", "Action"],
    link: "blast-wheels.com",
    stack: ["Unity", "C#", "Node.js"],
    tools: ["Custom Sui SDK", "Sui Blockchain (Move)", "Smart Contracts"],
    challenge: "Needed a racing game where NFT-based cars had real competitive and trading value.",
    solution: "Multiplayer PvP & PvE racing with NFT-based cars, on-chain trading, and live rankings, built on the Sui blockchain.",
    features: ["Multiplayer PvP & PvE", "NFT-based cars", "On-chain trading", "Rankings & stats"],
    teamComposition: ["Unity Developer", "Blockchain Developer", "Backend Developer", "3D Artist"],
    results: { stat1: { label: "NFT cars minted", value: "9,300+" }, stat2: { label: "Marketplace trade volume", value: "$210,000+" }, stat3: { label: "Active racers/month", value: "6,800" } }, // FAKE — replace with real figures
  },
  {
    slug: "crawl-out-gecko-escape",
    name: "Crawl Out: Gecko Escape",
    role: "Full-Cycle Development",
    confidential: false,
    flagship: true,
    category: "casual-games",
    platform: "Android, iOS",
    dim: "2D",
    genres: ["Puzzle", "Hypercasual"],
    link: "https://play.google.com/store/apps/details?id=com.gamenock.crawlout.escape.puzzle.slither",
    stack: ["Unity", "C#"],
    tools: ["AdMob", "Firebase"],
    challenge: "Needed a fast, low-cost hypercasual puzzle title to test market response and ad monetization.",
    solution: "A level-based puzzle/hypercasual game shipped on both Android and iOS with ad + IAP monetization.",
    features: ["Level-based challenges", "Ad monetization", "Cross-platform (Android + iOS)"],
    teamComposition: ["Unity Developer", "Game Designer", "QA Tester"],
    results: { stat1: { label: "Downloads", value: "310,000+" }, stat2: { label: "Play Store rating", value: "4.2★" }, stat3: { label: "Avg. daily ad impressions", value: "48,000" } }, // FAKE — replace with real figures
  },
  {
    slug: "space-shooter-alien-invasion",
    name: "Space Shooter: Alien Invasion",
    role: "Full-Cycle Development",
    confidential: false,
    flagship: true,
    category: "casual-games",
    platform: "Android, iOS",
    dim: "2D & 3D",
    genres: ["Action", "Hyper Casual"],
    link: "https://play.google.com/store/apps/details?id=com.gamenock.alieninvasion.spaceshipshooter.galaxywar",
    stack: ["Unity", "C#"],
    tools: ["AdMob", "Firebase"],
    challenge: "Needed a hyper-casual action title combining 2D and 3D elements, shipped fast across both major app stores.",
    solution: "Level-based planet-shooting challenges with ad and IAP monetization, shipped on Android and iOS.",
    features: ["Level-based planet shooting", "2D & 3D blend", "Ad + IAP monetization"],
    teamComposition: ["Unity Developer", "Game Designer", "QA Tester"],
    results: { stat1: { label: "Downloads", value: "225,000+" }, stat2: { label: "Play Store rating", value: "4.3★" }, stat3: { label: "Day-1 retention", value: "38%" } }, // FAKE — replace with real figures
  },

  // ---- SAMPLE case studies for VR and Trivia (the two honest gaps) ----
  // These are 100% fabricated, added ONLY because you explicitly asked
  // to see every page fully populated. `isSample: true` drives a visible
  // "Illustrative Example — Not Yet Shipped" badge on these two case
  // study pages so a live visitor isn't misled if this ships unreplaced.
  // Document 1's brand value was to state these gaps honestly — treat
  // replacing (or removing) these two entries as the single highest-
  // priority item on the launch checklist.
  {
    slug: "sample-vr-onboarding-experience",
    name: "Nebula Onboarding VR (Sample)",
    role: "Full-Cycle Development",
    confidential: false,
    flagship: true,
    isSample: true,
    category: "vr-experiences",
    platform: "Meta Quest",
    dim: "3D",
    genres: ["Training", "Simulation"],
    link: null,
    stack: ["Unity", "XR Toolkits"],
    tools: ["Meta Quest SDK", "Hand-tracking"],
    challenge: "An enterprise client needed new-hire safety training to be more memorable than a slideshow.",
    solution: "A hand-tracked VR onboarding simulation walking new hires through a virtual facility floor.",
    features: ["Hand-tracked interactions", "Branching training scenarios", "Progress tracking dashboard"],
    teamComposition: ["Unity Developer", "Game Designer", "3D Artist/Animator", "QA Tester"],
    results: { stat1: { label: "Training completion rate", value: "94%" }, stat2: { label: "Reported retention improvement", value: "+31%" }, stat3: { label: "Avg. session length", value: "22 min" } }, // FAKE — illustrative sample only, not a real project
  },
  {
    slug: "sample-trivia-arena",
    name: "QuickTrivia Arena (Sample)",
    role: "Full-Cycle Development",
    confidential: false,
    flagship: true,
    isSample: true,
    category: "trivia-games",
    platform: "Mobile, Web",
    dim: "2D",
    genres: ["Trivia", "Party"],
    link: null,
    stack: ["Unity", "C#"],
    tools: ["AdMob", "Firebase"],
    challenge: "A marketing agency needed a fast, cheap trivia activation for a client's product launch campaign.",
    solution: "A lightweight branded trivia game with a leaderboard, built and shipped in under three weeks.",
    features: ["Branded question packs", "Live leaderboard", "Social share cards"],
    teamComposition: ["Unity Developer", "Game Designer", "QA Tester"],
    results: { stat1: { label: "Campaign plays", value: "41,000+" }, stat2: { label: "Avg. rounds per player", value: "3.8" }, stat3: { label: "Social shares", value: "2,900" } }, // FAKE — illustrative sample only, not a real project
  },

  // ---- Standard cards (no full case-study page yet) ----
  // Results below are also FAKE / illustrative — plausible download and
  // rating figures, not pulled from any real analytics or store console.
  { slug: "nugget-rush", name: "Nugget Rush", image: "/images/portfolio/nugget-rush.png", confidential: false, flagship: false, category: "blockchain-games", platform: "Web", dim: "2D", genres: ["Tycoon", "Idle", "Simulation"], link: "nuggetrush.io", stack: ["Unity", "C#"], tools: ["Thirdweb SDK", "Web3 Tools", "Figma"], results: "12,000+ wallet connections (fake)" },
  { slug: "cat-doodle", name: "Cat Doodle", confidential: false, flagship: false, category: "blockchain-games", platform: "Web", dim: "2D", genres: ["Endless", "Casual", "Arcade"], link: "https://catdoodle-bbe2d.web.app", stack: ["Unity", "C#"], tools: ["Phantom Wallet", "Web3 Bridge"], results: "6,500+ plays (fake)" },
  { slug: "dino-dash", name: "Dino Dash", confidential: false, flagship: false, category: "blockchain-games", platform: "WebGL", dim: "2D", genres: ["Endless", "Casual", "Arcade"], link: "https://dino-dash-d7cd7.web.app", stack: ["Unity", "C#"], tools: ["Phantom Wallet", "Web3 Bridge"], results: "8,100+ plays (fake)" },
  { slug: "kids-cartoons-app", name: "Kids Cartoons App", confidential: true, flagship: false, category: "interactive-cartoons", platform: "Mobile", dim: "2D", genres: ["Educational", "Casual", "Drawing"], link: null, stack: ["Unity", "C#"], tools: ["Unity UI", "Figma"], results: "22,000+ downloads (fake)" },
  { slug: "virtual-interview-studio", name: "Virtual Interview Studio", confidential: true, flagship: false, category: "multiplayer-games", platform: "Mobile, PC", dim: "3D", genres: ["Virtual World", "Social", "Live Show"], link: null, stack: ["Unity", "C#"], tools: ["Photon Fusion", "Photon Voice"], results: "3,200+ sessions hosted (fake)" },
  { slug: "kart-racing-game", name: "Kart Racing Game", confidential: true, flagship: false, category: "multiplayer-games", platform: "Mobile", dim: "3D", genres: ["Racing", "Arcade"], link: null, stack: ["Unity", "C#", "Node.js"], tools: ["Photon PUN 2", "Photon Voice", "ToxMod"], results: "15,000+ downloads (fake)" },
  { slug: "boxing-multiplier", name: "Boxing Multiplier", image: "/images/portfolio/boxing-multiplier.png", confidential: true, flagship: false, category: "multiplayer-games", platform: "Mobile, PC", dim: "3D", genres: ["Sports", "Fighting", "Combat"], link: null, stack: ["Unity", "C#", "Node.js"], tools: ["Server-authoritative systems", "Custom Animation System"], results: "9,800+ downloads (fake)" },
  { slug: "car-stunt-3d", name: "Car Stunt 3D", confidential: false, flagship: false, category: "casual-games", platform: "Mobile", dim: "3D", genres: ["Racing", "Stunt", "Simulation"], link: null, stack: ["Unity", "C#"], tools: ["Custom Vehicle Physics"], results: "34,000+ downloads (fake)" },
  { slug: "car-parking-3d", name: "Car Parking 3D", confidential: false, flagship: false, category: "casual-games", platform: "Mobile", dim: "3D", genres: ["Simulation", "Driving"], link: null, stack: ["Unity", "C#"], tools: ["Cinemachine"], results: "41,000+ downloads (fake)" },
  { slug: "bus-parking", name: "Bus Parking", confidential: false, flagship: false, category: "casual-games", platform: "Mobile", dim: "3D", genres: ["Simulation", "Driving"], link: null, stack: ["Unity", "C#"], tools: ["Heavy Vehicle Controller"], results: "19,000+ downloads (fake)" },
  { slug: "animal-simulation", name: "Animal Simulation", image: "/images/portfolio/animal-simulation.png", confidential: false, flagship: false, category: "casual-games", platform: "Mobile", dim: "3D", genres: ["Educational", "Simulation"], link: null, stack: ["Unity", "C#"], tools: ["AI Behavior Trees"], results: "27,000+ downloads (fake)" },
  { slug: "luna-escape", name: "Luna Escape Maze Puzzle Game", confidential: false, flagship: false, category: "casual-games", platform: "Android, iOS", dim: "2D", genres: ["Puzzle", "Hyper Casual"], link: "https://play.google.com/store/apps/details?id=com.gamenock.lunaescape.logicpuzzle", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "58,000+ downloads (fake)" },
  { slug: "rabbit-connect", name: "Rabbit Connect: Link and Flow", confidential: false, flagship: false, category: "casual-games", platform: "Android", dim: "2D", genres: ["Puzzle", "Casual"], link: "https://play.google.com/store/apps/details?id=com.gamenock.rabbitconnect", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "16,500+ downloads (fake)" },
  { slug: "jigsaw-hd-solitaire", name: "Jigsaw HD Solitaire Puzzle", confidential: false, flagship: false, category: "casual-games", platform: "Android", dim: "2D", genres: ["Puzzle", "Casual"], link: "https://play.google.com/store/apps/details?id=com.GameNock.JigsawHDsolitairepuzzle", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "12,900+ downloads (fake)" },
  {
    slug: "horse-run",
    name: "Horse Run: Running Game",
    role: "Full-Cycle Development",
    confidential: false,
    flagship: true,
    category: "casual-games",
    platform: "Android, iOS",
    dim: "3D",
    genres: ["Endless", "Casual"],
    link: "https://play.google.com/store/apps/details?id=com.W1ldCraft11Anima111",
    stack: ["Unity", "C#"],
    tools: ["AdMob", "Firebase"],
    challenge: "Needed a complete endless-runner built and shipped from scratch, with no existing team or codebase to build from.",
    solution: "A full 3D endless-running game designed, built, and published end-to-end, with ad monetization wired in from day one.",
    features: ["Endless procedural running", "Ad monetization", "Store-ready release on Android and iOS"],
    teamComposition: ["Unity Developer", "Game Designer", "3D Artist", "QA Tester"],
    results: { stat1: { label: "Downloads", value: "21,000+" }, stat2: { label: "Platforms", value: "Android, iOS" }, stat3: { label: "App store rating", value: "4.1★" } }, // FAKE — replace with real figures
  },
  { slug: "bunny-has-a-bomb", name: "Bunny has a Bomb: Race Rush", confidential: false, flagship: false, category: "casual-games", platform: "Android, iOS", dim: "3D", genres: ["Racing", "Action", "Simulation"], link: "https://play.google.com/store/apps/details?id=com.gamenock.bunnyhasthebomb.racinggame.kartgame.driftgame", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "17,800+ downloads (fake)" },
  { slug: "bird-simulator", name: "Bird Simulator Flying Game", confidential: false, flagship: false, category: "casual-games", platform: "Android, iOS", dim: "2D", genres: ["Endless", "Casual"], link: "https://play.google.com/store/apps/details?id=com.gamenock.flyingbird.simulator.game", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "23,600+ downloads (fake)" },
  { slug: "draw-car-parking", name: "Draw Car Parking", confidential: false, flagship: false, category: "casual-games", platform: "iOS", dim: "2D & 3D", genres: ["Simulation", "Driving"], link: "https://apps.apple.com/us/app/draw-car-parking/id6462827311", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "9,400+ downloads (fake)" },
  {
    slug: "bank-heist",
    name: "Bank Heist: Robbery Escape",
    role: "Full-Cycle Development",
    confidential: false,
    flagship: true,
    category: "casual-games",
    platform: "iOS",
    dim: "3D",
    genres: ["Action", "Hyper Casual"],
    link: "https://apps.apple.com/us/app/bank-heist-robbery-escape/id6746856663",
    stack: ["Unity", "C#"],
    tools: ["AdMob", "Firebase"],
    challenge: "Needed a complete hyper-casual action title built and shipped from concept to App Store release.",
    solution: "A full 3D heist-themed hyper-casual game designed, built, and published end-to-end, with ad monetization included.",
    features: ["Level-based heist gameplay", "Ad monetization", "Store-ready iOS release"],
    teamComposition: ["Unity Developer", "Game Designer", "3D Artist", "QA Tester"],
    results: { stat1: { label: "Downloads", value: "7,300+" }, stat2: { label: "Platform", value: "iOS" }, stat3: { label: "App store rating", value: "4.0★" } }, // FAKE — replace with real figures
  },
  { slug: "speedball-neon-rush", name: "Speedball Neon Rush: Endless", confidential: false, flagship: false, category: "casual-games", platform: "iOS", dim: "3D", genres: ["Endless", "Casual"], link: "https://apps.apple.com/us/app/speedball-neon-rush-endless/id6520381264", stack: ["Unity", "C#"], tools: ["AdMob", "Firebase"], results: "5,900+ downloads (fake)" },
  { slug: "wander", name: "Wander", confidential: false, flagship: false, category: "multiplayer-games", platform: "iOS", dim: "2D", genres: ["Puzzle", "Casual", "Multiplayer"], link: "https://apps.apple.com/pk/app/wander-game/id6751537890", stack: ["Unity", "C#", "PlayFab", "PUN2"], tools: ["AdMob", "Firebase", "Photon"], results: "4,100+ downloads (fake)" },
  { slug: "games4africa", name: "games4africa", confidential: false, flagship: false, category: "multiplayer-games", platform: "Android", dim: "2D", genres: ["Puzzle", "Casual", "Multiplayer"], link: "https://play.google.com/store/apps/details?id=com.decloud23tech.games4africa&hl=en", stack: ["Unity", "C#", "PlayFab", "PUN2"], tools: ["Photon"], results: "3,600+ downloads (fake)" },
];

export function getPortfolioBySlug(slug) {
  return PORTFOLIO.find((p) => p.slug === slug);
}
export function getFlagships() {
  return PORTFOLIO.filter((p) => p.flagship);
}
export function getByCategory(categorySlug) {
  return PORTFOLIO.filter((p) => p.category === categorySlug);
}
