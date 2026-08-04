import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import HonestNote from "@/components/HonestNote";
import FaqAccordion from "@/components/FaqAccordion";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { getPortfolioBySlug } from "@/data/portfolio";
import { withCanonical, serviceJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return withCanonical(`/services/${service.slug}`, { title: service.name, description: service.heroSubhead });
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const caseStudies = service.caseStudySlugs.map(getPortfolioBySlug).filter(Boolean);

  return (
    <>
      {/* Document 10, Section 4: Service schema + FAQPage schema per service page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(service.faqs)) }} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Full Project Development</div>
          <h1 style={{ maxWidth: 720 }}>{service.heroTitle}</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>{service.heroSubhead}</p>

          {service.honestGap && (
            <div style={{ marginTop: 24, maxWidth: 620 }}>
              <HonestNote>{service.gapNote || service.faqs[0].a}</HonestNote>
            </div>
          )}

          {/* Document 4, Section 1, item 10: every service page's CTA links
              to both /pricing/#project and /get-started/ — only the second
              was wired before. */}
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/get-started" className="btn btn-primary">
              {service.ctaLabel} <Icon name="ArrowRight" size={16} />
            </Link>
            <Link href="/pricing#project" className="btn btn-outline">
              {service.pricing.startingLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>Who this is for</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {service.whoItsFor.map((w) => <span key={w} className="badge">{w}</span>)}
              </div>
              <p style={{ marginTop: 16 }}>{service.problemsSolved}</p>
            </div>
            <div className="card">
              <h3>Built with</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {service.technologies.map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
              <h3 style={{ marginTop: 20 }}>Platforms</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {service.platforms.map((p) => <span key={p} className="badge">{p}</span>)}
              </div>
              {service.walletsChains && (
                <>
                  <h3 style={{ marginTop: 20 }}>Wallets &amp; Chains</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    {service.walletsChains.map((w) => <span key={w} className="badge badge-primary">{w}</span>)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Document 4, Section 1: "Development Process" is one of the ten
          required sections on every service page — the shared 3-step
          process, restated with this category's own hero title. */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Development process</div>
            <h2>How we build your {service.name.toLowerCase()}</h2>
          </div>
          <div className="grid grid-3">
            {[
              { icon: "MessageCircle", title: "Scope it together", body: "A short discovery conversation confirms exactly what you need and gives you a real price." },
              { icon: "Code2", title: "We build it", body: `${service.technologies.slice(0, 3).join(", ")}, and the rest of our proven stack for this category.` },
              { icon: "Rocket", title: "You ship it", body: "Delivery, testing, and store/platform submission are part of the process, not an extra line item." },
            ].map((s) => (
              <div key={s.title} className="card-flat">
                <Icon name={s.icon} size={22} />
                <h3 style={{ marginTop: 12, fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ marginTop: 8 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document 4, Section 1: "Monetization Models" — its own section,
          relevant to founders sizing up ROI. */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Monetization</div>
            <h2>How games in this category typically make money</h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {service.monetization.map((m) => <span key={m} className="badge badge-secondary">{m}</span>)}
          </div>
        </div>
      </section>

      {service.pricing.tiers.length > 0 && (
        <section id="pricing-detail" className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Starting prices</div>
              <h2>What it costs</h2>
            </div>
            <table className="rate-table">
              <thead><tr><th>Scope</th><th>Starting price</th></tr></thead>
              <tbody>
                {service.pricing.tiers.map((t) => (
                  <tr key={t.label}><td>{t.label}</td><td>{t.price}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {caseStudies.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Case studies</div>
              <h2>Projects in this category</h2>
            </div>
            <div className="grid grid-3">
              {caseStudies.map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="card">
                  {p.isSample && <span className="badge" style={{ marginBottom: 10, background: "var(--color-warn-bg)", borderColor: "var(--color-warn-border)", color: "var(--color-warn-ink)" }}>Illustrative Example — Not Yet Shipped</span>}
                  <h3>{p.name}</h3>
                  <p style={{ marginTop: 8 }}>{p.solution}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>
          <FaqAccordion faqs={service.faqs} />
        </div>
      </section>
    </>
  );
}
