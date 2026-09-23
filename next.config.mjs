/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Redirects from the pre-repositioning site structure, per the launch
  // checklist ("Redirects from old URLs are mapped"). Old slugs that
  // don't map 1:1 onto the new content model fall back to the nearest
  // relevant hub rather than a dead link.
  async redirects() {
    return [
      { source: "/get-started", destination: "/start-a-project/", permanent: true },
      { source: "/pricing", destination: "/start-a-project/", permanent: true },
      { source: "/about", destination: "/company/about/", permanent: true },
      { source: "/careers", destination: "/company/careers/", permanent: true },
      { source: "/portfolio", destination: "/work/", permanent: true },
      { source: "/portfolio/:slug", destination: "/work/:slug/", permanent: true },
      { source: "/resources", destination: "/insights/", permanent: true },
      { source: "/resources/:slug", destination: "/insights/", permanent: true },
      { source: "/solutions/dedicated-teams", destination: "/what-we-do/co-development/", permanent: true },
      { source: "/solutions/project-development", destination: "/what-we-do/full-cycle-game-development/", permanent: true },

      { source: "/services", destination: "/expertise/unity-game-development/", permanent: true },
      { source: "/services/casual-games", destination: "/expertise/mobile-game-development/", permanent: true },
      { source: "/services/multiplayer-games", destination: "/expertise/multiplayer-game-development/", permanent: true },
      { source: "/services/blockchain-games", destination: "/expertise/web3-game-development/", permanent: true },
      { source: "/services/interactive-cartoons", destination: "/what-we-do/full-cycle-game-development/", permanent: true },
      { source: "/services/vr-experiences", destination: "/expertise/ar-vr-development/", permanent: true },
      { source: "/services/trivia-games", destination: "/what-we-do/full-cycle-game-development/", permanent: true },

      { source: "/industries", destination: "/what-we-do/", permanent: true },
      { source: "/industries/gaming-studios", destination: "/solutions/game-studios/", permanent: true },
      { source: "/industries/web3-blockchain", destination: "/expertise/web3-game-development/", permanent: true },
      { source: "/industries/education", destination: "/solutions/educational-games/", permanent: true },
      { source: "/industries/enterprise", destination: "/solutions/funded-ventures/", permanent: true },
      { source: "/industries/publishers-agencies", destination: "/solutions/publishers/", permanent: true },

      { source: "/hire", destination: "/what-we-do/co-development/", permanent: true },
      { source: "/hire/:slug", destination: "/what-we-do/co-development/", permanent: true },
    ];
  },
};

export default nextConfig;
