// The Insights hub — content direction and article template sourced
// from GameNock_Complete_Website_Blueprint.docx, Section 9. Three of the
// eight priority guides are written in full; the rest are queued for
// December per the blueprint's own build plan (Dec 1–15: "first three
// authority guides").

export const INSIGHT_CATEGORIES = ["Cost and Planning", "Production", "Multiplayer and Backend", "Porting and Optimization", "Platforms"];

export const INSIGHTS = [
  {
    slug: "how-much-does-unity-game-development-cost",
    title: "How Much Does Unity Game Development Cost in 2027",
    category: "Cost and Planning",
    author: "GameNock",
    reviewedDate: "2026-09-24",
    summary:
      "Unity game development typically ranges from a few thousand dollars for a simple hyper-casual prototype to well over $100,000 for a full-cycle production with multiplayer, backend and cross-platform release. The real driver isn't the engine — it's genre complexity, platform count, multiplayer/backend requirements, and content volume. A useful planning range: simple 2D mobile games often land in the low five figures, mid-complexity 3D or multiplayer titles in the $25,000–$100,000 range, and full productions with custom backend, live-ops and multi-platform release above that. Get a scoped number by sharing your GDD or concept rather than relying on a rule of thumb.",
    applicability:
      "This applies to founders, studios and publishers scoping a new Unity project, and to anyone comparing quotes from different development partners who quoted wildly different numbers for what sounds like the same game.",
    factors: [
      { title: "Genre and scope", body: "A level-based puzzle game costs a fraction of an open-world RPG — genre sets the production-complexity floor before anything else is decided." },
      { title: "Platform count", body: "Each additional platform (mobile, PC, WebGL, console) adds input, UI and certification work, not just a recompile." },
      { title: "Multiplayer and backend", body: "Real-time multiplayer, accounts, economy and leaderboards are a separate, substantial cost layer — not a checkbox." },
      { title: "Content volume", body: "More levels, more art, more writing — content volume scales cost roughly linearly once the core systems exist." },
      { title: "Team seniority", body: "Senior developers cost more per hour and ship faster with fewer rework cycles — the effective cost gap is usually smaller than the rate-card gap suggests." },
      { title: "Engagement model", body: "Full-cycle development, co-development and specialized development price differently — see How to Choose a Game Development Partner." },
    ],
    experience:
      "Across GameNock's shipped titles, hyper-casual mobile games have moved fastest and cheapest, while projects like Azuma-Coin and Blast Wheels — full 3D multiplayer titles with blockchain-backed economies — represent the upper end of scope and cost. The gap between those two is almost entirely explained by multiplayer/backend complexity and content volume, not by which studio built them.",
    checklist: [
      "Write down your genre and core loop in one paragraph before requesting quotes",
      "List every platform you actually need at launch — not \"eventually\"",
      "Decide if multiplayer is required at launch or a later expansion",
      "Estimate content volume (levels, characters, environments) even roughly",
      "Ask any quote to break down cost by system, not just a single number",
    ],
    mistakes: [
      { title: "Comparing quotes without comparing scope", body: "A $5,000 quote and a $50,000 quote for \"the same game\" usually reflect very different assumptions about platforms, content and multiplayer — not one studio ripping you off." },
      { title: "Treating the engine as the cost driver", body: "Unity licensing and tooling cost is a rounding error next to development labor — don't let engine choice distract from scoping the actual game." },
      { title: "Skipping a prototype to save money", body: "Building full production before validating the core loop often costs more in rework than the prototype would have cost outright." },
    ],
    faqs: [
      { q: "Is Unity more expensive than Unreal to develop in?", a: "Not inherently — team familiarity and project requirements matter more than engine choice for most game types outside high-end console/PC visuals." },
      { q: "Can I get a fixed price instead of an hourly estimate?", a: "Yes, once scope is defined — GameNock's full-cycle engagements are milestone-priced against a written scope, not open-ended hourly billing." },
      { q: "Does a smaller budget mean a lower-quality team?", a: "No — it usually means a smaller scope. A hyper-casual prototype and a live-service multiplayer game need very different budgets regardless of team quality." },
    ],
    relatedOffer: "full-cycle-game-development",
    relatedCaseStudy: "blast-wheels",
  },
  {
    slug: "how-to-choose-a-game-development-partner",
    title: "How to Choose a Game Development Partner",
    category: "Cost and Planning",
    author: "GameNock",
    reviewedDate: "2026-09-24",
    summary:
      "Choosing a game development partner comes down to four questions: can they show real, relevant shipped work (not just a portfolio of screenshots); do they clearly define what they'll own versus what stays with you; do they communicate in playable builds and written updates rather than vague check-ins; and is their pricing tied to a real scope rather than a suspiciously round number quoted before they understand your project. Studios that pass all four are rare enough that finding one is worth the extra discovery time upfront.",
    applicability:
      "This applies to publishers, studios and funded ventures evaluating outsourced or co-development partners for the first time, or switching after a bad experience with a previous vendor.",
    factors: [
      { title: "Relevant proof, not just any proof", body: "A studio's best game in a different genre or platform than yours tells you less than their weakest project in your actual genre." },
      { title: "Clear ownership", body: "Ask exactly what they'll take responsibility for — a vague \"we handle everything\" is a red flag, not reassurance." },
      { title: "Communication rhythm", body: "Weekly playable builds and written updates beat monthly calls — you should be able to see progress, not just hear about it." },
      { title: "Pricing that follows scope", body: "A real quote follows a discovery conversation about your specific project. A price given before that conversation is a guess." },
      { title: "IP and source-code terms", body: "Confirm IP ownership and source-code handover in writing before work starts, not after the engagement ends." },
    ],
    experience:
      "GameNock's own engagement structure — a technical review or discovery conversation before any quote, a written responsibility matrix, and weekly playable builds — exists specifically because we've seen what goes wrong when those steps are skipped: scope disputes, silent months, and handoffs that don't actually hand anything usable back.",
    checklist: [
      "Ask to see a project in your specific genre and platform, not just their best work overall",
      "Get the ownership breakdown in writing before signing anything",
      "Confirm the communication rhythm — how often, in what format, with what evidence",
      "Confirm IP and source-code ownership terms explicitly",
      "Treat a quote given before discovery as provisional, not final",
    ],
    mistakes: [
      { title: "Picking the cheapest quote without checking scope", body: "The cheapest number is often the one with the least scope attached — you find out what's missing after work starts." },
      { title: "Skipping the technical review on a legacy project", body: "Handing over an existing codebase without a review means both sides are guessing at scope, which almost always leads to disputes later." },
      { title: "Assuming 'full-service' means the same thing everywhere", body: "Ask what a studio actually owns end-to-end versus what they'll subcontract further — the answer changes accountability significantly." },
    ],
    faqs: [
      { q: "Should I always get multiple quotes?", a: "Yes, but only after each studio has done a real discovery conversation — comparing pre-discovery guesses tells you little." },
      { q: "How important is time-zone overlap?", a: "Less than communication quality — some overlap for live discussion matters, but written updates and playable builds matter more day to day." },
      { q: "What's a reasonable first-response time to expect?", a: "24–48 business hours for an initial review is a reasonable industry standard for a serious inquiry." },
    ],
    relatedOffer: "co-development",
    relatedCaseStudy: "gamisodes",
  },
  {
    slug: "co-development-versus-hiring-internal-team",
    title: "Co-Development Versus Hiring an Internal Team",
    category: "Production",
    author: "GameNock",
    reviewedDate: "2026-09-24",
    summary:
      "Co-development makes sense when you need capacity faster than a hiring cycle allows, for a defined period, or for a specialization you don't need permanently. Hiring internally makes sense when the capability is core to your studio's long-term identity and you have the runway to build and retain a team. Most studios end up using both: a stable internal core team for creative direction and ongoing product ownership, plus co-development capacity for release pressure, specialist gaps, or content spikes that don't justify a permanent hire.",
    applicability:
      "This applies to studio founders, producers and development directors deciding how to close a capacity or skills gap on an active or upcoming project.",
    factors: [
      { title: "Timeline", body: "Hiring takes weeks to months; a co-development engagement can typically start within one to two weeks of a confirmed scope." },
      { title: "Duration of need", body: "A permanent capability gap favors hiring; a release-cycle or milestone-specific gap favors co-development." },
      { title: "Specialization", body: "Deep, occasional-use specialization (blockchain integration, VR, porting) is expensive to hire for and easy to bring in as needed." },
      { title: "Management overhead", body: "Internal hires need ongoing management and career development; a co-development engagement is managed against a defined scope and ends cleanly." },
      { title: "Cost structure", body: "Hiring is a fixed ongoing cost regardless of workload; co-development scales with the engagement and ends when the need does." },
      { title: "Creative control", body: "Both models can preserve full creative control — the difference is who owns execution of the defined work, not who directs it." },
    ],
    experience:
      "GameNock's co-development work — including long-term production support on projects like Gamisodes — has typically started where a studio's internal team owned creative direction and roadmap, while GameNock took ownership of specific features, content pipelines or technical systems the internal team didn't have capacity or specialization to cover.",
    checklist: [
      "Is this a permanent capability gap or a temporary one?",
      "Do you have the runway and pipeline to hire and retain this role?",
      "How fast do you actually need capacity in place?",
      "Is the skill deep-but-occasional, or needed continuously?",
      "Would a defined-scope engagement or an open-ended hire better match your actual roadmap?",
    ],
    mistakes: [
      { title: "Hiring for a one-off specialization", body: "Hiring a full-time blockchain or porting specialist for a single project often costs more than a scoped co-development engagement, with less flexibility afterward." },
      { title: "Treating co-development as 'renting bodies'", body: "The value of co-development is ownership of defined outcomes, not headcount — an engagement scoped as generic staff augmentation underperforms one scoped around a specific deliverable." },
      { title: "Underestimating ramp-up time either way", body: "Both a new hire and a new co-development team need onboarding time — budget for it rather than expecting instant full speed." },
    ],
    faqs: [
      { q: "Can co-development convert into a longer-term relationship?", a: "Yes — many co-development engagements extend or renew once the fit is proven, without requiring a hiring process." },
      { q: "Does co-development mean giving up creative control?", a: "No — co-development is ownership of defined execution; creative direction stays with your team unless you explicitly scope it otherwise." },
      { q: "Is co-development cheaper than hiring?", a: "It depends on duration and specialization — for short-term or highly specialized needs, usually yes; for permanent core capability, hiring is often more cost-effective long term." },
    ],
    relatedOffer: "co-development",
    relatedCaseStudy: "highnoon",
  },
];

export function getInsightBySlug(slug) {
  return INSIGHTS.find((i) => i.slug === slug);
}

// Titles queued for later per the blueprint's Dec 1–15 milestone — not
// yet written. Kept here as a visible backlog, not published as pages.
export const INSIGHT_BACKLOG = [
  "Photon Fusion Versus PUN for Multiplayer Games",
  "How Much Does a Multiplayer Game Cost",
  "How to Rescue a Delayed Unity Project",
  "PlayFab Versus Firebase for Game Backends",
  "How to Optimize Unity Games for Lower-End Android Devices",
];
