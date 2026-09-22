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

export default function HomePage() {
  const flagships = getFlagships();

  return (
    <>
      {/* HERO — Document 7, Section 2 headline/subhead, verbatim */}
      <section className="section hero-animated">
        <FloatingParticles />
        <div className="container">
          <Reveal effect="fade">
            <div className="eyebrow">Game Development Studio · Est. {SITE_CONFIG.founded}</div>
          </Reveal>
          <Reveal effect="up" delay={0.1}>
            <h1 style={{ maxWidth: 780 }}>{SITE_CONFIG.tagline}</h1>
          </Reveal>
          <Reveal effect="up" delay={0.2}>
            <p style={{ maxWidth: 620, fontSize: "1.05rem", marginTop: 18 }}>
              Since {SITE_CONFIG.founded}, GameNock has shipped {SITE_CONFIG.gamesShipped} games for clients in{" "}
              {SITE_CONFIG.countriesServed} countries. Hand us your idea and we build the entire thing — or tell us
              which roles you need and we staff a dedicated team under our studio.
            </p>
          </Reveal>
          <Reveal effect="up" delay={0.3}>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <TrackedCtaLink href="/get-started" ctaType="Start My Project" className="btn btn-primary">
                <Icon name="Compass" size={18} /> Start My Project
              </TrackedCtaLink>
              <Link href="/portfolio" className="btn btn-outline">
                See If We're a Fit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsMarquee />

      {/* INTRODUCTION — who GameNock is, reusing the real facts from data/config.js */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <Reveal effect="up">
              <div className="eyebrow">About GameNock</div>
              <h2 style={{ maxWidth: 480 }}>A full-stack game development studio, built for global clients</h2>
              <p style={{ marginTop: 18, fontSize: "1.02rem" }}>
                GameNock is a game development studio founded in {SITE_CONFIG.founded} and based in{" "}
                {SITE_CONFIG.addressPakistan}, with a presence in {SITE_CONFIG.addressCanada}. We've shipped{" "}
                {SITE_CONFIG.gamesShipped} games for clients in {SITE_CONFIG.countriesServed} countries — casual
                mobile games, multiplayer titles, blockchain/Web3 games, and interactive cartoons.
              </p>
              <p style={{ marginTop: 14, fontSize: "1.02rem" }}>
                Whether you hand us a single idea to build end-to-end, or need a dedicated team of Unity
                developers, artists, and QA embedded under one roof, we run design, development, art, and
                deployment ourselves — so you're never managing a scattered cast of freelancers.
              </p>
              <Link href="/about" className="btn btn-outline" style={{ marginTop: 24 }}>
                More about us <Icon name="ArrowRight" size={16} />
              </Link>
            </Reveal>
            <RevealGroup className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <RevealItem as="div" className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>{SITE_CONFIG.gamesShipped}</div>
                <p style={{ marginTop: 6 }}>Games shipped</p>
              </RevealItem>
              <RevealItem as="div" className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>{SITE_CONFIG.countriesServed}</div>
                <p style={{ marginTop: 6 }}>Countries served</p>
              </RevealItem>
              <RevealItem as="div" className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>{SITE_CONFIG.founded}</div>
                <p style={{ marginTop: 6 }}>Founded</p>
              </RevealItem>
              <RevealItem as="div" className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>2</div>
                <p style={{ marginTop: 6 }}>Ways to work with us</p>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* WHY GAMENOCK — differentiators, consistent with the objections section further down */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Why GameNock</div>
            <h2>What you get that a freelancer roster can't offer</h2>
          </Reveal>
          <RevealGroup className="grid grid-4">
            {[
              { icon: "Users", title: "Senior Unity & Unreal talent", body: "Every project is staffed with experienced game developers, not junior freelancers learning on your budget." },
              { icon: "ShieldCheck", title: "Transparent, honest pricing", body: "A real scope and price range upfront — no surprise costs mid-project, no talked-around answers." },
              { icon: "UserCheck", title: "One accountable studio", body: "A single point of contact manages quality and continuity, not a rotating cast of freelancers you vet yourself." },
              { icon: "Link2", title: "Real Web3 & blockchain work", body: "We've shipped on-chain trading, NFT items, and smart contracts — not just a wallet button bolted on." },
            ].map((d) => (
              <RevealItem as="div" key={d.title} className="card">
                <IconWrap name={d.icon} accent="secondary" />
                <h3 style={{ marginTop: 12, fontSize: "1.05rem" }}>{d.title}</h3>
                <p style={{ marginTop: 8, fontSize: "0.92rem" }}>{d.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PERSONA STRIP */}
      <section className="section">
        <div className="container">
          <Reveal as="div" className="section-head center">
            <div className="eyebrow">Who we work with</div>
            <h2>Built for teams who need to move fast</h2>
          </Reveal>
          <PersonaStrip />
        </div>
      </section>

      {/* TWO MODELS — explained, no prices here on purpose (progressive disclosure) */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Two ways to work with us</div>
            <h2>Pick the model that fits how you want to build</h2>
          </Reveal>
          <RevealGroup className="grid grid-2">
            <RevealItem as="div" className="card">
              <span className="badge badge-primary">Full Project Development</span>
              <h3 style={{ marginTop: 16 }}>Your Idea, Fully Built — Start to Finish</h3>
              <p style={{ marginTop: 10 }}>
                One accountable studio handles design, development, art, QA, and deployment — across every
                category, priced to your project's actual scope.
              </p>
              <Link href="/solutions/project-development" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                See What It Costs <Icon name="ArrowRight" size={16} />
              </Link>
            </RevealItem>
            <RevealItem as="div" className="card">
              <span className="badge badge-secondary">Dedicated Teams</span>
              <h3 style={{ marginTop: 16 }}>Hire the Team You Need, Not the Team You're Stuck With</h3>
              <p style={{ marginTop: 10 }}>
                Pick the roles — Unity developers, artists, QA, PMs — and we staff them monthly under one
                reliable studio, at Pakistan's well-known cost advantage.
              </p>
              <Link href="/solutions/dedicated-teams" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                Build Your Team <Icon name="ArrowRight" size={16} />
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* 3-STEP PROCESS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">How it works</div>
            <h2>From first message to shipped game</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {[
              { icon: "MessageCircle", title: "Tell us your need", body: "Answer a few questions about your project or team need — takes about 2 minutes." },
              { icon: "FileCheck2", title: "Get a real recommendation", body: "We match you to the right model and give you an honest scope and price range, not a generic quote." },
              { icon: "Rocket", title: "We build, you ship", body: "Your team or project kicks off with a single point of contact and clear milestones." },
            ].map((s) => (
              <RevealItem as="div" key={s.title} className="card">
                <IconWrap name={s.icon} accent="primary" />
                <h3 style={{ marginTop: 12 }}>{s.title}</h3>
                <p style={{ marginTop: 8 }}>{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS — Document 7's /portfolio/ H1 reused here as framing */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Proof, not promises</div>
            <h2>100+ games shipped. Here are a few.</h2>
          </Reveal>
          <PortfolioCarousel items={flagships} />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Link href="/portfolio" className="btn btn-outline">View full portfolio</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — reuses the existing (flagged fake, see PLACEHOLDERS.md) quotes from data/config.js */}
      {TESTIMONIALS.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-head center">
              <div className="eyebrow">What clients say</div>
              <h2>Don't take our word for it</h2>
            </Reveal>
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </section>
      )}

      {/* OBJECTION HANDLING — Document 7, Section 4, verbatim */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Common questions</div>
            <h2>Answered directly, not talked around</h2>
          </Reveal>
          <ObjectionsSection />
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <Reveal effect="zoom" className="container" as="div">
          <div style={{ textAlign: "center" }}>
            <h2>Not sure which model fits?</h2>
            <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
              Answer five quick questions and we'll tell you honestly — project, team, or something else.
            </p>
            <Link href="/get-started" className="btn btn-primary" style={{ marginTop: 24 }}>
              Start My Project
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
