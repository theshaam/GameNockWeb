import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import ProofGrid from "@/components/ProofGrid";
import EngagementComparison from "@/components/EngagementComparison";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { AUDIENCES, getAudienceBySlug } from "@/data/audiences";
import { withCanonical, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const audience = getAudienceBySlug(params.slug);
  if (!audience) return {};
  return withCanonical(`/solutions/${audience.slug}/`, { title: audience.name, description: audience.heroIntro });
}

export default function AudiencePage({ params }) {
  const audience = getAudienceBySlug(params.slug);
  if (!audience) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(audience.faqs)) }} />
      <Breadcrumb items={[{ name: "Solutions", href: "/what-we-do/" }, { name: audience.name }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">For {audience.name}</div>
          <h1 style={{ maxWidth: 720 }}>{audience.heroH1}</h1>
          <p style={{ maxWidth: 640, marginTop: 18, fontSize: "1.05rem" }}>{audience.heroIntro}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/start-a-project/" className="btn btn-primary">
              {audience.ctaLabel} <Icon name="ArrowRight" size={16} />
            </Link>
            <Link href="/work/" className="btn btn-outline">View Relevant Work</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">What you may be facing</div>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {audience.situations.map((s) => (
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
          <Reveal className="section-head center">
            <div className="eyebrow">How Game Nock can engage</div>
            <h2>Three ownership levels</h2>
          </Reveal>
          <EngagementComparison />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Relevant work</div>
            <h2>Proof for {audience.name}</h2>
          </Reveal>
          <ProofGrid slugs={audience.proof || ["gamisodes", "highnoon", "blast-wheels"]} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </Reveal>
          <FaqAccordion faqs={audience.faqs} />
        </div>
      </section>

      <section className="section section-alt">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Share your portfolio, project or approved plan.</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              {audience.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
