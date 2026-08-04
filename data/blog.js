// The /resources/ blog — first posts per Document 9, Section 3's content
// clusters ("how much does X cost" posts, case-study breakdowns, technical
// comparison posts). Every figure below is pulled directly from the real
// pricing/portfolio data files, not invented — no stats beyond what's
// already documented elsewhere on the site.

export const BLOG_POSTS = [
  {
    slug: "how-much-does-a-blockchain-game-cost",
    title: "How Much Does a Blockchain Game Cost in 2026?",
    description: "A real breakdown of blockchain/crypto game development costs, based on projects we've actually shipped — not a generic industry estimate.",
    date: "2026-02-10",
    tags: ["Pricing", "Blockchain"],
    paragraphs: [
      "If you've searched this question, you've probably found answers ranging from \"$5,000\" to \"$500,000\" with no explanation of what changes the number. Here's a more useful answer: at GameNock, blockchain/crypto game projects start from $1,500 — and what pushes the price up from there is almost always one of three things.",
      "First, wallet and chain integration. A game that just needs a basic wallet connect is simpler than one doing on-chain trading, smart contract-driven item ownership, or a custom SDK against a less common chain. Blast Wheels, for example, needed NFT-based cars with real on-chain trading value — built on the Sui blockchain using a custom Sui SDK — which is meaningfully more work than a simple \"connect wallet, mint token\" flow.",
      "Second, game complexity independent of the blockchain layer. Azuma-Coin is a full 3D multiplayer PvP action/RPG — the blockchain integration (crypto IAPs, a token-driven economy) sits on top of a genuinely complex game, not a simple mobile title.",
      "Third, backend and anti-cheat requirements. On-chain economies attract exploit attempts, so backend-authoritative logic (server-side validation of anything that touches value) adds engineering time that a purely cosmetic NFT skin system wouldn't need.",
      "The honest floor is $1,500. Anything past that depends on which of the three factors above apply to your project — which is exactly what a short discovery call is for.",
    ],
    relatedServiceSlug: "blockchain-games",
    relatedPortfolioSlugs: ["azuma-coin", "blast-wheels"],
  },
  {
    slug: "hyper-casual-game-development-cost-breakdown",
    title: "Hyper-Casual Game Development Cost Breakdown",
    description: "What actually changes the price of a hyper-casual or casual game — from a $50 web build to a $500 monetized 3D version.",
    date: "2026-02-24",
    tags: ["Pricing", "Casual Games"],
    paragraphs: [
      "Casual and hyper-casual games have the widest price range of anything we build — from $50 to $500 — because the category itself covers very different scopes. Here's what actually moves the number.",
      "A 2D web build with no monetization or customization starts at $50 — this is the fastest, simplest version, often used to test a concept or run a single campaign. Move that same build to mobile and it becomes $100, mainly due to store submission, mobile-specific testing, and platform requirements.",
      "Add monetization and customization — ad networks like AdMob or AppLovin, in-app purchases, player customization — and the price moves to $300, whether on web or mobile, because monetization integration and testing add real engineering time beyond the base game loop.",
      "A 3D version with no monetization also starts at $300, since 3D art, animation, and lighting take longer than 2D even without any monetization layer. Combine 3D with monetization and customization, and that's the top of the range at $500.",
      "Our own Crawl Out: Gecko Escape and Space Shooter: Alien Invasion are both real examples in this category — both hyper-casual, both shipped on Android and iOS with ad monetization.",
    ],
    relatedServiceSlug: "casual-games",
    relatedPortfolioSlugs: ["crawl-out-gecko-escape", "space-shooter-alien-invasion"],
  },
  {
    slug: "azuma-coin-case-study-breakdown",
    title: "Case Study Breakdown: Azuma-Coin",
    description: "How we gave a token real in-game utility with a full 3D multiplayer PvP action/RPG — the decisions behind the build, not just the feature list.",
    date: "2026-03-09",
    tags: ["Case Study", "Blockchain"],
    paragraphs: [
      "Azuma-Coin's team came to us with a problem a lot of token projects have: an AZUM token and NFT items with no real utility beyond speculation. The ask wasn't \"build us a game\" in the abstract — it was \"make our token and NFTs mean something to hold.\"",
      "The decision that shaped everything else was building a full 3D multiplayer PvP action/RPG rather than a lighter, faster-to-ship game layered on top of the token. A shallow game with a token bolted on doesn't hold a community's attention — the game had to be worth playing on its own, with the token woven into real mechanics: play-to-earn rewards, Enjin-backed collectible items, and backend-controlled player stats so token-linked progress couldn't be spoofed client-side.",
      "On the technical side, Photon PUN 2 handled the real-time multiplayer layer, while ChainSafe's Meta Wallet handled the wallet integration — chosen specifically because it fit the project's target chain and wallet UX needs, not as a default choice. The team on this project was a Unity Developer, a Blockchain Developer, a 3D Artist/Animator, a Game Designer, and a QA Tester — five roles, one accountable delivery.",
      "We don't have download or revenue numbers to share for this project yet — we'd rather say that plainly than invent a number. What we can point to is the build itself: a live, working PvP economy where the token has an actual mechanical role, not a decorative one.",
    ],
    relatedServiceSlug: "blockchain-games",
    relatedPortfolioSlugs: ["azuma-coin"],
  },
  {
    slug: "gamisodes-case-study-breakdown",
    title: "Case Study Breakdown: Gamisodes",
    description: "Turning passive episodic cartoon content into something viewers actively play — the video-to-gameplay handoff, explained.",
    date: "2026-03-23",
    tags: ["Case Study", "Interactive Cartoons"],
    paragraphs: [
      "Gamisodes started from a specific frustration IP owners run into: episodic cartoon content is watched, not used. A viewer finishes an episode and closes the app. The ask was to make that content something a viewer participates in instead.",
      "The core technical decision was building a seamless handoff between passive video and active gameplay, using Unity's Video Player and Timeline tooling — rather than treating video and game as two separate modes a user has to switch between manually. An episode plays, then hands off into a mini-game or interactive scene, then hands back to video, without the viewer feeling a mode switch.",
      "The result blends 2D, 2.5D, and 3D across episodes and mini-games, built by a Unity Developer, a Game Designer, a 2D/3D Artist, and a Video Designer working from the client's existing character art and brand guidelines — matching an established visual style precisely mattered more here than on an original IP project.",
      "As with our other case studies, we're not going to publish engagement or retention numbers we don't actually have yet. The proof here is structural: an episodic mobile game where the interactive layer never breaks the illusion of a continuous cartoon experience.",
    ],
    relatedServiceSlug: "interactive-cartoons",
    relatedPortfolioSlugs: ["gamisodes"],
  },
  {
    slug: "unity-vs-alternatives-for-outsourced-game-development",
    title: "Unity vs. Other Engines for Outsourced Game Development",
    description: "Why Unity is our default engine for client work, and when a different tool actually makes more sense.",
    date: "2026-04-06",
    tags: ["Technical"],
    paragraphs: [
      "Unity is the engine behind the overwhelming majority of our shipped work — from Azuma-Coin's 3D multiplayer PvP to Gamisodes' interactive cartoons to straightforward hyper-casual titles like Bird Simulator. That's not because it's the only engine we know; it's because for client-funded outsourced work specifically, Unity's tradeoffs line up well with what clients actually need.",
      "Cross-platform reach is the biggest factor. A single Unity project ships to web, mobile, and PC with far less platform-specific rework than most alternatives, which matters directly for categories like casual and multiplayer games where clients often want to be on every storefront at once.",
      "The second factor is the ecosystem around the engine, not the engine alone. Photon (PUN2, Fusion, Voice) for multiplayer, PlayFab for backend, Thirdweb SDK and wallet SDKs for blockchain integration, AdMob/AppLovin/Unity Ads for monetization — Unity's plugin ecosystem covers nearly everything in our six service categories without custom infrastructure built from scratch every time.",
      "That said, Unity isn't the only tool we reach for. Backend and blockchain-heavy logic often lives in Node.js and custom Sui SDK work rather than inside Unity itself, and web-facing pieces (like some blockchain game front-ends) sometimes use standard web stacks alongside a Unity WebGL build. The honest answer to \"why Unity\" is that it's the right default for the categories we build most often — not a dogmatic choice.",
    ],
    relatedServiceSlug: null,
    relatedPortfolioSlugs: [],
  },
];

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
