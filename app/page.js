import Link from "next/link";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import PersonaStrip from "@/components/PersonaStrip";
import ObjectionsSection from "@/components/ObjectionsSection";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import FloatingParticles from "@/components/FloatingParticles";
import StatsMarquee from "@/components/StatsMarquee";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { SITE_CONFIG, TESTIMONIALS } from "@/data/config";
import { getFlagships } from "@/data/portfolio";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/");

const REASONS = [
  {
    title: "Build a Complete Game",
    body: "Hand us a validated concept, funded plan, prototype or licensed IP and we take ownership of design, art, engineering and launch.",
    href: "/what-we-do/full-cycle-game-development/",
    cta: "Explore Full-Cycle Development",
    icon: "Rocket",
  },
  {
    title: "Scale an Existing Team",
    body: "We integrate with your studio and take ownership of a defined feature, system or milestone while you keep creative control.",
    href: "/what-we-do/co-development/",
    cta: "Explore Co-Development",
    icon: "Users",
  },
  {
    title: "Expand or Improve a Game",
    body: "Multiplayer, backend, porting, optimization and platform expansion for a game that already exists.",
    href: "/what-we-do/specialized-development/",
    cta: "Explore Specialized Development",
    icon: "Cpu",
  },
];

const JOURNEY = [
  { stage: "Validated concept", body: "An approved GDD or funded plan, ready to become a production." },
  { stage: "Prototype", body: "A playable proof of concept that needs to become a full game." },
  { stage: "Active production", body: "A team already building, that needs more coordinated capacity." },
  { stage: "Launch", body: "A game approaching release that needs QA, submission and readiness." },
  { stage: "Live game", body: "A shipped game that needs stability, updates and continued growth." },
  { stage: "Expansion", body: "A game ready for another platform, market or connected system." },
];

const CAPABILITIES = [
  { title: "Game Development", items: ["Unity architecture", "Gameplay engineering", "UI/UX", "2D/3D art & animation"], href: "/expertise/unity-game-development/" },
  { title: "Connected Games", items: ["Multiplayer & matchmaking", "Backend & accounts", "Economy & leaderboards", "Web3 integration"], href: "/expertise/multiplayer-game-development/" },
  { title: "Platforms", items: ["Mobile (iOS/Android)", "PC (Windows/Mac)", "WebGL", "AR/VR"], href: "/expertise/mobile-game-development/" },
  { title: "Supporting Systems", items: ["Porting & optimization", "Analytics & monetization", "QA & live support", "Platform certification"], href: "/expertise/game-porting-optimization/" },
];

const QUALIFICATION_SIGNALS = [
  "An approved concept, funded plan, prototype or existing game",
  "A defined outcome — not just \"we need help with everything\"",
  "Budget approved or actively being planned",
  "A team or stakeholder who can approve milestones",
];

export default function HomePage() {
  const flagships = getFlagships();

  return (
    <>
      {/* 1. HERO — Blueprint Section "1. Home", state the category and three outcomes immediately */}
      <section className="section hero-animated">
        <FloatingParticles />
        <div className="container">
          <Reveal effect="fade">
            <div className="eyebrow">{SITE_CONFIG.category} · Est. {SITE_CONFIG.founded}</div>
          </Reveal>
          <Reveal effect="up" delay={0.1}>
            <h1 style={{ maxWidth: 820 }}>{SITE_CONFIG.tagline}</h1>
          </Reveal>
          <Reveal effect="up" delay={0.2}>
            <p style={{ maxWidth: 640, fontSize: "1.05rem", marginTop: 18 }}>
              Game Nock is a global game-development partner helping publishers, studios and funded ventures build
              complete games, increase production capacity and bring existing titles to more platforms.
            </p>
          </Reveal>
          <Reveal effect="up" delay={0.25}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
              {REASONS.map((r) => (
                <Link key={r.href} href={r.href} className="badge">{r.title}</Link>
              ))}
            </div>
          </Reveal>
          <Reveal effect="up" delay={0.3}>
            <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
              <TrackedCtaLink href="/start-a-project/" ctaType="Discuss Your Project" className="btn btn-primary">
                <Icon name="Compass" size={18} /> {SITE_CONFIG.primaryCta}
              </TrackedCtaLink>
              <Link href="/work/" className="btn btn-outline">{SITE_CONFIG.secondaryCta}</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. PROOF STRIP */}
      <StatsMarquee />

      {/* 3. THREE REASONS CLIENTS HIRE US */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Route by commercial situation</div>
            <h2>Three reasons clients hire Game Nock</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {REASONS.map((r) => (
              <RevealItem as="div" key={r.href} className="card">
                <IconWrap name={r.icon} accent="primary" />
                <h3 style={{ marginTop: 12 }}>{r.title}</h3>
                <p style={{ marginTop: 8 }}>{r.body}</p>
                <Link href={r.href} className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                  {r.cta} <Icon name="ArrowRight" size={16} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 4. PROJECT-STAGE JOURNEY */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Wherever you are</div>
            <h2>Game Nock can join at different serious stages</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {JOURNEY.map((j, i) => (
              <RevealItem as="div" key={j.stage} className="card">
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-primary)" }}>STAGE {i + 1}</div>
                <h3 style={{ marginTop: 6, fontSize: "1.05rem" }}>{j.stage}</h3>
                <p style={{ marginTop: 8 }}>{j.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/how-we-work/" className="btn btn-outline">See How We Work</Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CASE STUDIES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Proof, not promises</div>
            <h2>{SITE_CONFIG.gamesShipped} games shipped. Here are a few.</h2>
          </Reveal>
          <PortfolioCarousel items={flagships} />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Link href="/work/" className="btn btn-outline">View All Work</Link>
          </div>
        </div>
      </section>

      {/* 6. CAPABILITIES */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Breadth without losing focus</div>
            <h2>Capabilities</h2>
          </Reveal>
          <RevealGroup className="grid grid-4">
            {CAPABILITIES.map((c) => (
              <RevealItem as="div" key={c.title} className="card">
                <h3 style={{ fontSize: "1.02rem" }}>{c.title}</h3>
                <ul style={{ marginTop: 12, paddingLeft: 18, fontSize: "0.88rem" }}>
                  {c.items.map((item) => (
                    <li key={item} style={{ marginBottom: 6, color: "var(--color-ink-soft)" }}>{item}</li>
                  ))}
                </ul>
                <Link href={c.href} className="btn btn-outline btn-sm" style={{ marginTop: 16 }}>
                  Explore <Icon name="ArrowRight" size={14} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 7. INTEGRATION AND PROCESS */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <Reveal effect="up">
              <div className="eyebrow">Reassurance for studios</div>
              <h2 style={{ maxWidth: 460 }}>External support that stays controlled</h2>
              <p style={{ marginTop: 16 }}>
                Every engagement defines ownership, a communication rhythm, and a way to verify progress before
                the first sprint starts — not after something's already gone wrong.
              </p>
              <Link href="/how-we-work/" className="btn btn-outline" style={{ marginTop: 20 }}>
                Explore Our Process <Icon name="ArrowRight" size={16} />
              </Link>
            </Reveal>
            <RevealGroup className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { title: "Ownership", body: "A written responsibility matrix before work starts." },
                { title: "Communication", body: "Regular written updates on a fixed rhythm." },
                { title: "Playable builds", body: "Weekly milestones you can actually see and play." },
                { title: "QA & handover", body: "Documented, tested, and handed back to your team." },
              ].map((p) => (
                <RevealItem as="div" key={p.title} className="card-flat">
                  <h3 style={{ fontSize: "0.95rem" }}>{p.title}</h3>
                  <p style={{ marginTop: 6, fontSize: "0.88rem" }}>{p.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGY PROOF */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Technology follows the product</div>
            <h2>Chosen around what the game actually needs</h2>
          </Reveal>
          <RevealGroup className="grid grid-4">
            {[
              { group: "Engine", items: ["Unity", "C#"] },
              { group: "Multiplayer", items: ["Photon PUN/Fusion"] },
              { group: "Backend", items: ["PlayFab", "Firebase", "Node.js", "Supabase"] },
              { group: "Web3", items: ["Sui (Move)", "ChainSafe"] },
            ].map((g) => (
              <RevealItem as="div" key={g.group} className="card-flat">
                <h3 style={{ fontSize: "0.9rem" }}>{g.group}</h3>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                  {g.items.map((t) => <span key={t} className="badge">{t}</span>)}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/company/technology/" className="btn btn-outline">View Technology</Link>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head center">
            <div className="eyebrow">Who we work with</div>
            <h2>Built for teams who need a real production partner</h2>
          </Reveal>
          <PersonaStrip />
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      {TESTIMONIALS.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <Reveal className="section-head center">
              <div className="eyebrow">What clients say</div>
              <h2>Don't take our word for it</h2>
            </Reveal>
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </section>
      )}

      {/* ANSWERED DIRECTLY */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Common questions</div>
            <h2>Answered directly, not talked around</h2>
          </Reveal>
          <ObjectionsSection />
        </div>
      </section>

      {/* 10. QUALIFICATION SECTION */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Set the standard for serious inquiries</div>
            <h2>Check Project Fit</h2>
          </Reveal>
          <div className="grid grid-2">
            <Reveal>
              <div className="card-flat">
                <h3 style={{ fontSize: "1rem" }}>A good-fit project usually has:</h3>
                <ul style={{ marginTop: 14, paddingLeft: 18 }}>
                  {QUALIFICATION_SIGNALS.map((s) => (
                    <li key={s} style={{ marginBottom: 8, color: "var(--color-ink-soft)" }}>{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-flat">
                <h3 style={{ fontSize: "1rem" }}>Earlier-stage concept?</h3>
                <p style={{ marginTop: 10 }}>
                  If you're not there yet, discovery can include helping formalize a concept into a scoped plan —
                  tell us where you are and we'll recommend the right first step.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11. CLOSING CTA */}
      <section className="section">
        <Reveal effect="zoom" className="container" as="div">
          <div style={{ textAlign: "center" }}>
            <h2>Tell us what stage your game is at.</h2>
            <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
              Share your concept, production requirement, current build or technical challenge — we'll review it
              and recommend the most suitable development approach within 24–48 business hours.
            </p>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              Submit Your Project
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
