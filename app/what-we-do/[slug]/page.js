import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import ProofGrid from "@/components/ProofGrid";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { OFFERS, getOfferBySlug } from "@/data/offers";
import { withCanonical, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return OFFERS.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({ params }) {
  const offer = getOfferBySlug(params.slug);
  if (!offer) return {};
  return withCanonical(`/what-we-do/${offer.slug}/`, { title: offer.name, description: offer.heroIntro });
}

export default function OfferPage({ params }) {
  const offer = getOfferBySlug(params.slug);
  if (!offer) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(offer.faqs)) }} />
      <Breadcrumb items={[{ name: "What We Do", href: "/what-we-do/" }, { name: offer.name }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">{offer.heroTagline}</div>
          <h1 style={{ maxWidth: 720 }}>{offer.heroH1}</h1>
          <p style={{ maxWidth: 640, marginTop: 18, fontSize: "1.05rem" }}>{offer.heroIntro}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/start-a-project/" className="btn btn-primary">
              {offer.ctaLabel} <Icon name="ArrowRight" size={16} />
            </Link>
            <Link href="/work/" className="btn btn-outline">{offer.secondaryCtaLabel}</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">{offer.situationsHeading}</div>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {offer.situations.map((s) => (
              <RevealItem as="div" key={s.title} className="card">
                <h3 style={{ fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ marginTop: 8 }}>{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <Reveal>
              <div className="eyebrow">{offer.ownershipHeading}</div>
              <h2 style={{ fontSize: "1.6rem" }}>What Game Nock takes responsibility for</h2>
              <ul style={{ marginTop: 18, paddingLeft: 18 }}>
                {offer.ownership.map((item) => (
                  <li key={item} style={{ marginBottom: 10, color: "var(--color-ink-soft)" }}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="eyebrow">{offer.commercialHeading}</div>
              <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
                {offer.commercialNotes.map((n) => (
                  <div key={n.title} className="card-flat">
                    <h3 style={{ fontSize: "1rem" }}>{n.title}</h3>
                    <p style={{ marginTop: 6, fontSize: "0.92rem" }}>{n.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">{offer.processHeading}</div>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {offer.process.map((p) => (
              <RevealItem as="div" key={p.title} className="card">
                <IconWrap name={offer.icon} accent="primary" />
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-primary)", marginTop: 8 }}>STEP {p.step}</div>
                <h3 style={{ marginTop: 4, fontSize: "1.05rem" }}>{p.title}</h3>
                <p style={{ marginTop: 8 }}>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">{offer.disciplinesHeading}</div>
          </Reveal>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {offer.disciplines.map((d) => <span key={d} className="badge">{d}</span>)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Related work</div>
            <h2>Proof for {offer.name}</h2>
          </Reveal>
          <ProofGrid slugs={offer.proof} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </Reveal>
          <FaqAccordion faqs={offer.faqs} />
        </div>
      </section>

      <section className="section section-alt">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>{offer.closingHeading}</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              {offer.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
