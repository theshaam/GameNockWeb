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
          <div className="eyebrow">About GameNock</div>
          <h1 style={{ maxWidth: 680 }}>A Rawalpindi Studio, Built for Global Clients</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            Founded in {SITE_CONFIG.founded}. Shipped for clients in {SITE_CONFIG.countriesServed} countries.
            Here's how we think about the work.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-3">
            <div className="card"><div style={{ fontSize: "2rem", fontWeight: 700 }}>{SITE_CONFIG.gamesShipped}</div><p style={{ marginTop: 6 }}>Games shipped</p></div>
            <div className="card"><div style={{ fontSize: "2rem", fontWeight: 700 }}>{SITE_CONFIG.countriesServed}</div><p style={{ marginTop: 6 }}>Countries served</p></div>
            <div className="card"><div style={{ fontSize: "2rem", fontWeight: 700 }}>{SITE_CONFIG.founded}</div><p style={{ marginTop: 6 }}>Founded</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>Full Project Development</h3>
              <p style={{ marginTop: 10 }}>We own client projects end-to-end — one team, one point of contact, priced to scope.</p>
            </div>
            <div className="card">
              <h3>Dedicated Teams</h3>
              <p style={{ marginTop: 10 }}>We staff vetted game-dev talent by role, billed monthly or hourly, at a fraction of local hiring costs.</p>
            </div>
          </div>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head center">
              <div className="eyebrow">What clients say</div>
              <h2>Testimonials</h2>
            </div>
            <div className="grid grid-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="card">
                  <p>"{t.quote}"</p>
                  <div style={{ marginTop: 14, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>{t.role}, {t.company}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Testimonials section renders nothing until TESTIMONIALS in data/config.js has real entries. */}
    </>
  );
}
