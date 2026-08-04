// GameNock Smart Consultation Wizard™ — journey data.
// Pure data (no JSX) so components/Wizard.js can walk it generically via
// components/WizardQuestion.js. Every journey ends with a shared
// budget + timeline pair EXCEPT "hire-team", which already has its own
// cost signals (headcount/experience/duration/working model) — asking a
// generic budget question there would feel like a form, not a consult.

export const PERSONA_OPTIONS = [
  "Startup Founder",
  "Business Owner",
  "Game Studio",
  "Enterprise",
  "Marketing Agency",
  "Educational Company",
  "Blockchain / Web3 Project",
  "Content Creator",
  "Investor",
  "Other",
];

export const GOAL_OPTIONS = [
  "🚀 Build a New Product",
  "👥 Hire a Dedicated Team",
  "💡 Validate an Idea",
  "🎮 Develop a Game",
  "📱 Build an App",
  "🪙 Build a Blockchain Product",
  "📺 Make My Cartoon Interactive",
  "🥽 Build a VR Experience",
  "🤖 Build an AI Product",
  "🔧 Improve My Existing Product",
];

export const GOAL_TO_JOURNEY = {
  "🚀 Build a New Product": "new-product",
  "👥 Hire a Dedicated Team": "hire-team",
  "💡 Validate an Idea": "validate-idea",
  "🎮 Develop a Game": "game-dev",
  "📱 Build an App": "build-app",
  "🪙 Build a Blockchain Product": "blockchain",
  "📺 Make My Cartoon Interactive": "interactive-cartoon",
  "🥽 Build a VR Experience": "vr",
  "🤖 Build an AI Product": "ai",
  "🔧 Improve My Existing Product": "improve-existing",
};

export const INDUSTRY_OPTIONS = [
  "Gaming", "Education", "Healthcare", "Finance", "Retail", "Sports",
  "Entertainment", "Travel", "Food", "Government", "Real Estate", "AI",
  "Blockchain", "Other",
];

export const STAGE_OPTIONS = [
  "Just an Idea", "Research Phase", "Business Plan Ready", "UI Ready",
  "Prototype Ready", "Existing Product",
];

export const SERVICES_OPTIONS = [
  "Discovery Workshop", "Product Strategy", "UI/UX Design", "Game Design",
  "Development", "Backend", "Multiplayer", "Blockchain", "AI", "Testing",
  "Publishing", "Marketing", "Maintenance",
];

export const PARTNERSHIP_OPTIONS = [
  "Fixed Price", "Agile Team", "Monthly Development", "Long-Term Technology Partner",
];

export const BUDGET_OPTIONS = [
  "Under $5K", "$5K–20K", "$20K–50K", "$50K–100K", "$100K+", "Not Sure Yet",
];

export const TIMELINE_OPTIONS = [
  "ASAP", "1 Month", "3 Months", "6 Months", "12+ Months", "Flexible",
];

export const PREFERRED_CONTACT_OPTIONS = ["Email", "Phone", "WhatsApp"];

export const FOCUS_AREA_OPTIONS = [
  "Budget optimization", "Technical feasibility", "Timeline estimation",
  "Team recommendations", "Product strategy", "Monetization",
  "Investor readiness", "Scalability",
];

const budgetTimelineBlocks = [
  { key: "budget", type: "single", title: "What's your estimated budget?", options: BUDGET_OPTIONS },
  { key: "timeline", type: "single", title: "What's your timeline?", options: TIMELINE_OPTIONS },
];

export const JOURNEYS = {
  "new-product": {
    label: "Build a New Product",
    blocks: [
      {
        key: "productType", type: "single", title: "What type of product?",
        options: ["Mobile Game", "PC Game", "Console Game", "Mobile App", "SaaS Platform", "Marketplace", "AI Platform", "Educational Platform", "VR Experience", "Web3 Product", "Other"],
      },
      { key: "industry", type: "single", title: "Which industry?", options: INDUSTRY_OPTIONS },
      { key: "stage", type: "single", title: "Current Stage", options: STAGE_OPTIONS },
      { key: "services", type: "multi", title: "Which services do you need?", options: SERVICES_OPTIONS },
      { key: "partnership", type: "single", title: "Preferred Partnership", options: PARTNERSHIP_OPTIONS },
      ...budgetTimelineBlocks,
    ],
  },

  "hire-team": {
    label: "Hire a Dedicated Team",
    blocks: [
      {
        key: "department", type: "single", title: "Which department?",
        options: ["Development", "Design", "Management", "Marketing", "QA", "Audio", "Mixed Team"],
      },
      {
        key: "roles", type: "multi", title: "Choose roles",
        options: ["Unity", "Unreal", "Frontend", "Backend", "Full Stack", "Mobile", "Blockchain", "AI", "DevOps", "Shopify"],
        showIf: (a) => a.department === "Development" || a.department === "Mixed Team",
      },
      { key: "headcount", type: "slider", title: "How many team members?", min: 1, max: 21 },
      { key: "experience", type: "single", title: "Experience level", options: ["Junior", "Mid", "Senior", "Lead", "Architect"] },
      { key: "workingModel", type: "single", title: "Working Model", options: ["Part-Time", "Full-Time", "Dedicated", "Hybrid"] },
      { key: "duration", type: "single", title: "Duration", options: ["1 Month", "3 Months", "6 Months", "12+ Months", "Long-Term"] },
      { key: "needPM", type: "single", title: "Need project management?", options: ["Yes", "No", "Already Have One"] },
      { key: "needQA", type: "single", title: "Need QA?", options: ["Yes", "No"] },
      { key: "needReporting", type: "single", title: "Need daily reporting?", options: ["Yes", "No"] },
    ],
  },

  "validate-idea": {
    label: "Validate an Idea",
    blocks: [
      { key: "ideaDescription", type: "text", title: "Describe your idea in one sentence." },
      {
        key: "validationNeeds", type: "multi", title: "What do you need?",
        options: ["Market Research", "Competition Analysis", "Business Model", "Technical Validation", "Cost Estimation", "Roadmap", "Prototype", "Pitch Deck", "Investor Presentation", "MVP Plan", "Everything"],
      },
      { key: "spokenToInvestors", type: "single", title: "Have you spoken with investors?", options: ["Yes", "No", "Planning To"] },
      { key: "fundingGoal", type: "single", title: "Funding Goal", options: ["Angel", "Seed", "Series A", "Grant", "Crowdfunding", "Bootstrapped"] },
      { key: "industry", type: "single", title: "Industry", options: ["Gaming", "Education", "Healthcare", "Blockchain", "AI", "SaaS", "Entertainment", "Other"] },
      ...budgetTimelineBlocks,
    ],
  },

  "game-dev": {
    label: "Develop a Game",
    blocks: [
      {
        key: "genre", type: "single", title: "What are you building?",
        options: ["Hyper Casual", "Casual", "Arcade", "Puzzle", "Simulation", "Racing", "Sports", "RPG", "MMORPG", "Open World", "Shooter", "Platformer", "Educational", "Card", "Board", "Trivia", "Idle", "Tycoon", "Interactive Story", "Visual Novel", "Strategy", "Other"],
      },
      { key: "playerMode", type: "single", title: "Single Player or Multiplayer?", options: ["Single Player", "Multiplayer"] },
      {
        key: "multiplayerFeatures", type: "multi", title: "Multiplayer features",
        options: ["PvP", "PvE", "Co-op", "MMO", "Battle Royale", "Voice Chat", "Friends", "Guilds", "Leaderboards", "Ranked", "Cross Platform", "Dedicated Servers"],
        showIf: (a) => a.playerMode === "Multiplayer",
      },
      { key: "platforms", type: "multi", title: "Platforms", options: ["Android", "iOS", "Web", "PC", "Console", "VR"] },
      { key: "monetization", type: "multi", title: "Monetization", options: ["Ads", "IAP", "Subscription", "Premium", "Battle Pass", "Cosmetics", "NFT", "Token", "Marketplace"] },
      { key: "artStyle", type: "single", title: "Art Style", options: ["Pixel", "Low Poly", "Stylized", "Realistic", "Anime", "Cartoon", "Minimal", "Other"] },
      { key: "existingAssets", type: "multi", title: "Do you already have?", options: ["Game Design", "Characters", "UI", "Backend", "Documentation", "Nothing Yet"] },
      ...budgetTimelineBlocks,
    ],
  },

  blockchain: {
    label: "Build a Blockchain Product",
    blocks: [
      {
        key: "buildType", type: "single", title: "What are you building?",
        options: ["NFT Game", "Play-to-Earn", "Marketplace", "Wallet", "Launchpad", "Token Utility", "Community Platform", "Meme Coin", "DAO", "DeFi", "Other"],
      },
      { key: "chain", type: "single", title: "Blockchain", options: ["Ethereum", "Solana", "Polygon", "BNB", "Sui", "Base", "Avalanche", "TON", "Other"] },
      { key: "needs", type: "multi", title: "Need", options: ["Smart Contracts", "Wallet Integration", "NFT", "Marketplace", "Backend", "Game", "Website", "Tokenomics Guidance"] },
      { key: "hasToken", type: "single", title: "Already have a token?", options: ["Yes", "Launching Soon", "No"] },
      { key: "communityEngagement", type: "single", title: "Need community engagement?", options: ["Yes", "No"] },
      ...budgetTimelineBlocks,
    ],
  },

  "interactive-cartoon": {
    label: "Make My Cartoon Interactive",
    blocks: [
      { key: "ownsCartoon", type: "single", title: "Do you already own the cartoon?", options: ["Yes", "No", "Planning One"] },
      { key: "contentType", type: "single", title: "Content Type", options: ["YouTube", "TV Series", "Educational Videos", "Books", "Original Story"] },
      { key: "audience", type: "single", title: "Audience", options: ["0–3", "4–7", "8–12", "13+", "Adults"] },
      { key: "interaction", type: "multi", title: "Interaction", options: ["Drawing", "Tracing", "Mini Games", "Voice", "AR", "Learning", "Choices", "Puzzles", "Reward System"] },
      { key: "length", type: "single", title: "Estimated Length", options: ["1–5 Minutes", "5–20 Minutes", "20–50 Minutes", "50+ Minutes"] },
      { key: "goal", type: "multi", title: "Goal", options: ["Education", "Entertainment", "Brand", "School", "YouTube", "TV", "App"] },
      ...budgetTimelineBlocks,
    ],
  },

  vr: {
    label: "Build a VR Experience",
    blocks: [
      { key: "platform", type: "single", title: "Platform", options: ["Meta Quest", "Vision Pro", "HTC Vive", "Pico", "PC VR", "Mixed Reality"] },
      { key: "purpose", type: "single", title: "Purpose", options: ["Game", "Training", "Education", "Healthcare", "Real Estate", "Architecture", "Marketing", "Simulation"] },
      { key: "needMultiplayer", type: "single", title: "Need Multiplayer?", options: ["Yes", "No"] },
      { key: "needHandTracking", type: "single", title: "Need Hand Tracking?", options: ["Yes", "No"] },
      { key: "needVoiceChat", type: "single", title: "Need Voice Chat?", options: ["Yes", "No"] },
      ...budgetTimelineBlocks,
    ],
  },

  ai: {
    label: "Build an AI Product",
    blocks: [
      {
        key: "aiFor", type: "multi", title: "AI For",
        options: ["Game", "Business", "Education", "Healthcare", "Automation", "Customer Support", "Recommendation", "Vision", "Voice", "Analytics", "Agents"],
      },
      { key: "need", type: "single", title: "Need", options: ["AI Integration", "New AI Product", "Prototype", "Consulting", "Research"] },
      { key: "existingProduct", type: "single", title: "Existing Product?", options: ["Yes", "No"] },
      { key: "preferredAI", type: "single", title: "Preferred AI", options: ["OpenAI", "Claude", "Gemini", "Llama", "Custom", "Not Sure"] },
      ...budgetTimelineBlocks,
    ],
  },

  // Not in the original spec — designed to match the depth/shape of the
  // other journeys, reusing the shared option lists where they fit.
  "build-app": {
    label: "Build an App",
    blocks: [
      {
        key: "appType", type: "single", title: "What type of app?",
        options: ["Consumer / Social App", "E-commerce / Marketplace", "SaaS / B2B Platform", "Booking / Scheduling", "Fintech / Payments", "Health & Fitness", "On-Demand / Delivery", "Internal Tools", "Other"],
      },
      { key: "platforms", type: "multi", title: "Which platforms?", options: ["iOS", "Android", "Web", "Cross-Platform", "Desktop"] },
      { key: "industry", type: "single", title: "Which industry?", options: INDUSTRY_OPTIONS },
      { key: "stage", type: "single", title: "Current Stage", options: STAGE_OPTIONS },
      { key: "services", type: "multi", title: "Which services do you need?", options: SERVICES_OPTIONS },
      { key: "partnership", type: "single", title: "Preferred Partnership", options: PARTNERSHIP_OPTIONS },
      ...budgetTimelineBlocks,
    ],
  },

  // Not in the original spec — designed for a scoping conversation about
  // improving something that already exists, so the "pain point" question
  // does the personalization work the other journeys get from genre/type.
  "improve-existing": {
    label: "Improve My Existing Product",
    blocks: [
      { key: "currentAsset", type: "single", title: "What do you already have?", options: ["Live App", "Live Game", "Website", "MVP / Prototype", "Legacy Codebase", "Other"] },
      {
        key: "improvementAreas", type: "multi", title: "What needs improvement?",
        options: ["Performance & Bugs", "New Features", "UI/UX Redesign", "Backend / Infrastructure", "Scaling for Growth", "Security", "Monetization", "Codebase Migration / Rewrite", "Third-Party Integrations", "Other"],
      },
      { key: "currentStack", type: "text", title: "What's your current tech stack?", subtitle: "Optional — helps us route you to the right specialists." },
      { key: "painPoint", type: "textarea", title: "What's the biggest pain point right now?" },
      { key: "partnership", type: "single", title: "Preferred Partnership", options: PARTNERSHIP_OPTIONS },
      ...budgetTimelineBlocks,
    ],
  },
};
