import Link from "next/link";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import ProofGrid from "@/components/ProofGrid";
import { SITE_CONFIG, TESTIMONIALS } from "@/data/config";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/company/about/", {
  title: "About GameNock",
  description: "GameNock brings game design, engineering, art, backend and quality disciplines together to help serious projects move from plan to launch and beyond.",
});

const PRINCIPLES = [
  { title: "Ownership", body: "We take responsibility for what we agree to own — not a vague promise to help." },
  { title: "Transparency", body: "A real scope and price range upfront, and honest answers when we haven't done something before." },
  { title: "Playable progress", body: "Weekly playable builds, not status updates you have to take on faith." },
  { title: "Practical technology", body: "Tools chosen for the product, not for what looks impressive in a pitch." },
  { title: "Long-term partnership", body: "Most of our best work has come from clients we've worked with more than once." },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Company", href: "/company/about/" }, { name: "About" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">About GameNock</div>
          <h1 style={{ maxWidth: 680 }}>A Development Partner Built Around Ownership and Delivery</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            GameNock brings game design, engineering, art, backend and quality disciplines together to help
            serious projects move from plan to launch and beyond.
          </p>
          <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
            {SITE_CONFIG.primaryCta} <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Company story</div>
            <h2>From hands-on development to multidisciplinary delivery</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ maxWidth: 720, fontSize: "1.02rem" }}>
              GameNock started as a small team of Unity developers shipping games directly. As client requirements
              grew — multiplayer systems, blockchain integrations, backend infrastructure, cross-platform ports —
              the studio grew alongside them, adding design, art, backend and QA disciplines rather than
              subcontracting them out piecemeal. Since {SITE_CONFIG.founded}, that coordinated team has shipped{" "}
              {SITE_CONFIG.gamesShipped} games for clients in {SITE_CONFIG.countriesServed} countries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">What we believe</div>
            <h2>Five operating principles</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {PRINCIPLES.map((p) => (
              <RevealItem as="div" key={p.title} className="card">
                <h3 style={{ fontSize: "1.05rem" }}>{p.title}</h3>
                <p style={{ marginTop: 8 }}>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Capabilities at a glance</div>
            <h2>Three ways to work with us</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            <RevealItem as="div" className="card">
              <IconWrap name="Rocket" accent="primary" />
              <h3 style={{ marginTop: 12 }}>Full-Cycle Development</h3>
              <p style={{ marginTop: 8 }}>Complete ownership from validated concept to launch.</p>
            </RevealItem>
            <RevealItem as="div" className="card">
              <IconWrap name="Users" accent="primary" />
              <h3 style={{ marginTop: 12 }}>Co-Development</h3>
              <p style={{ marginTop: 8 }}>Coordinated capacity integrated with your existing team.</p>
            </RevealItem>
            <RevealItem as="div" className="card">
              <IconWrap name="Cpu" accent="primary" />
              <h3 style={{ marginTop: 12 }}>Specialized Development</h3>
              <p style={{ marginTop: 8 }}>Ownership of a defined technical system or platform expansion.</p>
            </RevealItem>
          </RevealGroup>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/what-we-do/" className="btn btn-outline">Explore What We Do</Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP — honestly generic until real bios/photos are approved; see PLACEHOLDERS.md */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Leadership and team</div>
            <h2>An accountable, multidisciplinary team</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-flat" style={{ maxWidth: 720 }}>
              <p>
                GameNock is led by a founding team with hands-on game-development backgrounds, supported by
                discipline leads across engineering, art, backend and production. Individual leadership profiles
                are being finalized for publication — check back, or ask directly during a project discussion.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Global delivery</div>
            <h2>Where GameNock works from</h2>
          </Reveal>
          <div className="grid grid-2">
            <Reveal>
              <div className="card">
                <h3 style={{ fontSize: "1.05rem" }}>Delivery base</h3>
                <p style={{ marginTop: 8 }}>{SITE_CONFIG.addressPakistan}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card">
                <h3 style={{ fontSize: "1.05rem" }}>Additional presence</h3>
                <p style={{ marginTop: 8 }}>{SITE_CONFIG.addressCanada}</p>
              </div>
            </Reveal>
          </div>
          <p style={{ marginTop: 20, maxWidth: 620 }}>
            We work with clients across {SITE_CONFIG.countriesServed} countries remotely, with time-zone overlap
            agreed per engagement.
          </p>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="section-head center">
              <div className="eyebrow">Proof</div>
              <h2>{SITE_CONFIG.gamesShipped} games shipped since {SITE_CONFIG.founded}</h2>
            </Reveal>
            <ProofGrid slugs={["gamisodes", "highnoon", "blast-wheels"]} />
          </div>
        </section>
      )}

      <section className="section section-alt">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Ready to discuss a project?</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              {SITE_CONFIG.primaryCta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
