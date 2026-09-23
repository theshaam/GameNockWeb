import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/company/technology/", {
  title: "Game Nock Game Development Technology — Unity, Photon, PlayFab and More",
  description: "Game Nock selects tools based on gameplay, platform, scale, team and long-term maintenance rather than forcing every project into one stack.",
});

const GROUPS = [
  { title: "Game development", body: "Unity, C#, URP, IL2CPP, Burst and editor/tooling experience.", href: "/expertise/unity-game-development/", cta: "Explore Unity Development" },
  { title: "Multiplayer", body: "Photon PUN, Fusion and Voice; matchmaking and state systems.", href: "/expertise/multiplayer-game-development/", cta: "Explore Multiplayer" },
  { title: "Backend", body: "PlayFab, Firebase, Node.js, Supabase and REST integrations.", href: "/expertise/game-backend-development/", cta: "Explore Backend" },
  { title: "Platforms", body: "Android, iOS, Windows, Mac, WebGL and Quest.", href: "/what-we-do/platform-expansion/", cta: "Explore Platform Expansion" },
  { title: "Analytics & monetization", body: "Ad networks, IAP, subscriptions and event design.", href: "/expertise/mobile-game-development/", cta: "Discuss Product Systems" },
  { title: "Web3 & emerging", body: "ChainSafe, Thirdweb, wallets, Sui Move, and AR/VR where required.", href: "/expertise/web3-game-development/", cta: "Explore Specialist Work" },
];

export default function TechnologyPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Company", href: "/company/about/" }, { name: "Technology" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Technology</div>
          <h1 style={{ maxWidth: 680 }}>Technology Chosen Around the Product</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            Game Nock selects tools based on gameplay, platform, scale, team and long-term maintenance rather than
            forcing every project into one stack.
          </p>
          <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
            Discuss Technical Requirements <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <RevealGroup className="grid grid-3">
            {GROUPS.map((g) => (
              <RevealItem as="div" key={g.title} className="card">
                <h3 style={{ fontSize: "1.05rem" }}>{g.title}</h3>
                <p style={{ marginTop: 8 }}>{g.body}</p>
                <Link href={g.href} className="btn btn-outline btn-sm" style={{ marginTop: 16 }}>
                  {g.cta} <Icon name="ArrowRight" size={14} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Have an architecture or integration question?</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              Discuss Technical Requirements
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
