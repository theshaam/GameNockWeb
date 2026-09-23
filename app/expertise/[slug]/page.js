import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import ProofGrid from "@/components/ProofGrid";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { EXPERTISE, EXPERTISE_APPROACH, getExpertiseBySlug } from "@/data/expertise";
import { withCanonical, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return EXPERTISE.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }) {
  const capability = getExpertiseBySlug(params.slug);
  if (!capability) return {};
  return withCanonical(`/expertise/${capability.slug}/`, { title: capability.name, description: capability.heroIntro });
}

export default function ExpertisePage({ params }) {
  const capability = getExpertiseBySlug(params.slug);
  if (!capability) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(capability.faqs)) }} />
      <Breadcrumb items={[{ name: "Expertise", href: "/expertise/unity-game-development/" }, { name: capability.name }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Expertise</div>
          <h1 style={{ maxWidth: 720 }}>{capability.heroH1}</h1>
          <p style={{ maxWidth: 640, marginTop: 18, fontSize: "1.05rem" }}>{capability.heroIntro}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/start-a-project/" className="btn btn-primary">
              {capability.ctaLabel} <Icon name="ArrowRight" size={16} />
            </Link>
            <Link href="/work/" className="btn btn-outline">View Relevant Work</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Problems solved</div>
          </Reveal>
          <RevealGroup className="grid grid-4">
            {capability.problems.map((p) => (
              <RevealItem as="div" key={p.title} className="card">
                <h3 style={{ fontSize: "0.98rem" }}>{p.title}</h3>
                <p style={{ marginTop: 8, fontSize: "0.9rem" }}>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">What Game Nock delivers</div>
          </Reveal>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {capability.deliverables.map((d) => <span key={d} className="badge badge-primary">{d}</span>)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Approach</div>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {EXPERTISE_APPROACH.map((s) => (
              <RevealItem as="div" key={s.title} className="card">
                <IconWrap name="CheckCircle2" accent="secondary" />
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-primary)", marginTop: 8 }}>STEP {s.step}</div>
                <h3 style={{ marginTop: 4, fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ marginTop: 8 }}>{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Technology and decisions</div>
          </Reveal>
          <div className="grid grid-2">
            {capability.technologies.map((g) => (
              <div key={g.group} className="card-flat">
                <h3 style={{ fontSize: "1rem" }}>{g.group}</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                  {g.items.map((t) => <span key={t} className="badge">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Relevant work</div>
            <h2>Proof for {capability.name}</h2>
          </Reveal>
          <ProofGrid slugs={capability.proof} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </Reveal>
          <FaqAccordion faqs={capability.faqs} />
        </div>
      </section>

      <section className="section section-alt">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Share the current project stage, requirement and available documentation.</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              {capability.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
