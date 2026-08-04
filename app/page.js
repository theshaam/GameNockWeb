import Link from "next/link";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import PersonaStrip from "@/components/PersonaStrip";
import ObjectionsSection from "@/components/ObjectionsSection";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import { SITE_CONFIG } from "@/data/config";
import { getFlagships } from "@/data/portfolio";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/");

export default function HomePage() {
  const flagships = getFlagships().slice(0, 3);

  return (
    <>
      {/* HERO — Document 7, Section 2 headline/subhead, verbatim */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Game Development Studio · Est. {SITE_CONFIG.founded}</div>
          <h1 style={{ maxWidth: 780 }}>{SITE_CONFIG.tagline}</h1>
          <p style={{ maxWidth: 620, fontSize: "1.05rem", marginTop: 18 }}>
            Since {SITE_CONFIG.founded}, GameNock has shipped {SITE_CONFIG.gamesShipped} games for clients in{" "}
            {SITE_CONFIG.countriesServed} countries. Hand us your idea and we build the entire thing — or tell us
            which roles you need and we staff a dedicated team under our studio.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <TrackedCtaLink href="/get-started" ctaType="Start My Project" className="btn btn-primary">
              <Icon name="Compass" size={18} /> Start My Project
            </TrackedCtaLink>
            <Link href="/portfolio" className="btn btn-outline">
              See If We're a Fit
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONA STRIP */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Who we work with</div>
            <h2>Built for teams who need to move fast</h2>
          </div>
          <PersonaStrip />
        </div>
      </section>

      {/* TWO MODELS — explained, no prices here on purpose (progressive disclosure) */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Two ways to work with us</div>
            <h2>Pick the model that fits how you want to build</h2>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <span className="badge badge-primary">Full Project Development</span>
              <h3 style={{ marginTop: 16 }}>Your Idea, Fully Built — Start to Finish</h3>
              <p style={{ marginTop: 10 }}>
                One accountable studio handles design, development, art, QA, and deployment — across every
                category, priced to your project's actual scope.
              </p>
              <Link href="/solutions/project-development" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                See What It Costs <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
            <div className="card">
              <span className="badge badge-secondary">Dedicated Teams</span>
              <h3 style={{ marginTop: 16 }}>Hire the Team You Need, Not the Team You're Stuck With</h3>
              <p style={{ marginTop: 10 }}>
                Pick the roles — Unity developers, artists, QA, PMs — and we staff them monthly under one
                reliable studio, at Pakistan's well-known cost advantage.
              </p>
              <Link href="/solutions/dedicated-teams" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                Build Your Team <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-STEP PROCESS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">How it works</div>
            <h2>From first message to shipped game</h2>
          </div>
          <div className="grid grid-3">
            {[
              { icon: "MessageCircle", title: "Tell us your need", body: "Answer a few questions about your project or team need — takes about 2 minutes." },
              { icon: "FileCheck2", title: "Get a real recommendation", body: "We match you to the right model and give you an honest scope and price range, not a generic quote." },
              { icon: "Rocket", title: "We build, you ship", body: "Your team or project kicks off with a single point of contact and clear milestones." },
            ].map((s) => (
              <div key={s.title} className="card">
                <IconWrap name={s.icon} accent="primary" />
                <h3 style={{ marginTop: 12 }}>{s.title}</h3>
                <p style={{ marginTop: 8 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS — Document 7's /portfolio/ H1 reused here as framing */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Proof, not promises</div>
            <h2>100+ games shipped. Here are a few.</h2>
          </div>
          <div className="grid grid-3">
            {flagships.map((p) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card">
                <h3>{p.name}</h3>
                <p style={{ marginTop: 8 }}>{p.solution}</p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/portfolio" className="btn btn-outline">View full portfolio</Link>
          </div>
        </div>
      </section>

      {/* OBJECTION HANDLING — Document 7, Section 4, verbatim */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Common questions</div>
            <h2>Answered directly, not talked around</h2>
          </div>
          <ObjectionsSection />
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Not sure which model fits?</h2>
          <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
            Answer five quick questions and we'll tell you honestly — project, team, or something else.
          </p>
          <Link href="/get-started" className="btn btn-primary" style={{ marginTop: 24 }}>
            Start My Project
          </Link>
        </div>
      </section>
    </>
  );
}
