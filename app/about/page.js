import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { SITE_CONFIG, TESTIMONIALS } from "@/data/config";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/about", {
  title: "About",
  description: `${SITE_CONFIG.siteName} is a game development studio founded in ${SITE_CONFIG.founded}, shipping ${SITE_CONFIG.gamesShipped} games for clients in ${SITE_CONFIG.countriesServed} countries.`,
});

export default function AboutPage() {
  return (
    <>
      {/* Document 7, Section 2: H1/subhead, verbatim */}
      <section className="section">
        <div className="container">
          <Reveal effect="fade">
            <div className="eyebrow">About GameNock</div>
          </Reveal>
          <Reveal effect="up" delay={0.1}>
            <h1 style={{ maxWidth: 680 }}>A Rawalpindi Studio, Built for Global Clients</h1>
          </Reveal>
          <Reveal effect="up" delay={0.2}>
            <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
              Founded in {SITE_CONFIG.founded}. Shipped for clients in {SITE_CONFIG.countriesServed} countries.
              Here's how we think about the work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <RevealGroup className="grid grid-3">
            <RevealItem as="div" className="card"><div style={{ fontSize: "2rem", fontWeight: 700 }}>{SITE_CONFIG.gamesShipped}</div><p style={{ marginTop: 6 }}>Games shipped</p></RevealItem>
            <RevealItem as="div" className="card"><div style={{ fontSize: "2rem", fontWeight: 700 }}>{SITE_CONFIG.countriesServed}</div><p style={{ marginTop: 6 }}>Countries served</p></RevealItem>
            <RevealItem as="div" className="card"><div style={{ fontSize: "2rem", fontWeight: 700 }}>{SITE_CONFIG.founded}</div><p style={{ marginTop: 6 }}>Founded</p></RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealGroup className="grid grid-2">
            <RevealItem as="div" className="card">
              <h3>Full Project Development</h3>
              <p style={{ marginTop: 10 }}>We own client projects end-to-end — one team, one point of contact, priced to scope.</p>
            </RevealItem>
            <RevealItem as="div" className="card">
              <h3>Dedicated Teams</h3>
              <p style={{ marginTop: 10 }}>We staff vetted game-dev talent by role, billed monthly or hourly, at a fraction of local hiring costs.</p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <Reveal className="section-head center">
              <div className="eyebrow">What clients say</div>
              <h2>Testimonials</h2>
            </Reveal>
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </section>
      )}
      {/* Testimonials section renders nothing until TESTIMONIALS in data/config.js has real entries. */}
    </>
  );
}
