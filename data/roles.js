// Full 17-role team-rate table (source: team-pricing-rates.md project doc).
// `hasPage: true` marks the 8 roles prioritized for their own /hire/[slug]
// page per Document 3 — the rest still power the team calculator and the
// full rate table on /pricing, they just don't have a dedicated landing page yet.

export const ROLE_GROUPS = [
  {
    group: "Management & Marketing",
    roles: [
      { slug: "project-managers", name: "Project Manager", monthlyMin: 900, monthlyMax: 2200, hourlyMin: 7, hourlyMax: 12, hasPage: true },
      { slug: "project-planners", name: "Project Planner", monthlyMin: 700, monthlyMax: 1500, hourlyMin: 6, hourlyMax: 10, hasPage: false },
      { slug: "digital-marketers", name: "Digital Marketer", monthlyMin: 900, monthlyMax: 1800, hourlyMin: 7, hourlyMax: 11, hasPage: false },
      { slug: "community-managers", name: "Community Manager", monthlyMin: 700, monthlyMax: 1500, hourlyMin: 6, hourlyMax: 10, hasPage: false },
    ],
  },
  {
    group: "Development",
    roles: [
      { slug: "unity-developers", name: "Unity Developer", monthlyMin: 700, monthlyMax: 2000, hourlyMin: 6, hourlyMax: 12, hasPage: true },
      { slug: "front-end-developers", name: "Front-End Developer", monthlyMin: 500, monthlyMax: 1500, hourlyMin: 5, hourlyMax: 10, hasPage: false },
      { slug: "back-end-developers", name: "Back-End Developer", monthlyMin: 750, monthlyMax: 2400, hourlyMin: 7, hourlyMax: 14, hasPage: false },
      { slug: "shopify-developers", name: "Shopify Developer", monthlyMin: 500, monthlyMax: 800, hourlyMin: 4, hourlyMax: 8, hasPage: false },
      { slug: "full-stack-developers", name: "Full-Stack Developer", monthlyMin: 900, monthlyMax: 2400, hourlyMin: 8, hourlyMax: 14, hasPage: true },
      { slug: "app-developers", name: "App Developer", monthlyMin: 700, monthlyMax: 2000, hourlyMin: 6, hourlyMax: 12, hasPage: false },
      { slug: "blockchain-developers", name: "Blockchain Developer", monthlyMin: 900, monthlyMax: 2400, hourlyMin: 8, hourlyMax: 14, hasPage: true },
      { slug: "ai-engineers", name: "AI Engineer", monthlyMin: 900, monthlyMax: 2400, hourlyMin: 8, hourlyMax: 14, hasPage: true },
    ],
  },
  {
    group: "Design, Creative & QA",
    roles: [
      { slug: "game-designers", name: "Game Designer", monthlyMin: 700, monthlyMax: 1500, hourlyMin: 6, hourlyMax: 10, hasPage: true },
      { slug: "graphics-designers", name: "Graphics Designer", monthlyMin: 550, monthlyMax: 1200, hourlyMin: 4, hourlyMax: 10, hasPage: false },
      { slug: "2d-artists", name: "2D Artist/Illustrator", monthlyMin: 800, monthlyMax: 1500, hourlyMin: 7, hourlyMax: 12, hasPage: true },
      { slug: "3d-artists", name: "3D Artist/Animator", monthlyMin: 800, monthlyMax: 1500, hourlyMin: 7, hourlyMax: 12, hasPage: false },
      { slug: "qa-testers", name: "QA Tester", monthlyMin: 550, monthlyMax: 1500, hourlyMin: 4, hourlyMax: 12, hasPage: true },
      { slug: "sound-designers", name: "Sound Designer", monthlyMin: 800, monthlyMax: 1500, hourlyMin: 6, hourlyMax: 12, hasPage: false },
      { slug: "video-designers", name: "Video Designer", monthlyMin: 750, monthlyMax: 1500, hourlyMin: 6, hourlyMax: 12, hasPage: false },
    ],
  },
];

export const ALL_ROLES = ROLE_GROUPS.flatMap((g) => g.roles.map((r) => ({ ...r, group: g.group })));
export const ROLES_WITH_PAGES = ALL_ROLES.filter((r) => r.hasPage);

export function getRoleBySlug(slug) {
  return ALL_ROLES.find((r) => r.slug === slug);
}

// Rate scaling logic (Document from team-pricing-rates.md):
// Level 1/5 + Skills Rank 6/10 -> min rate. Level 5/5 + Skills Rank 10/10 -> max rate.
export const EXPERIENCE_LEVELS = [
  { level: 1, years: "0–1.5" },
  { level: 2, years: "1.5–3" },
  { level: 3, years: "3–5" },
  { level: 4, years: "5–10" },
  { level: 5, years: "10+" },
];

// Simple linear interpolation used by the Team Calculator component.
export function estimateRate(role, level) {
  const t = (level - 1) / 4; // 0 at level 1, 1 at level 5
  const monthly = Math.round(role.monthlyMin + t * (role.monthlyMax - role.monthlyMin));
  const hourly = Math.round(role.hourlyMin + t * (role.hourlyMax - role.hourlyMin));
  return { monthly, hourly };
}
