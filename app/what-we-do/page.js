import Link from "next/link";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import Breadcrumb from "@/components/Breadcrumb";
import EngagementComparison from "@/components/EngagementComparison";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import ProofGrid from "@/components/ProofGrid";
import { OFFERS } from "@/data/offers";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/what-we-do/", {
  title: "Game Development Services — Complete, Co-Development and Platform Expansion",
  description: "GameNock adapts its involvement to the project: taking responsibility for complete development, integrating with an internal team, or owning specialized systems and platform expansions.",
});

export default function WhatWeDoPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "What We Do" }]} />
      <section className="section">
        <div className="container">
          <div className="eyebrow">What We Do</div>
          <h1 style={{ maxWidth: 720 }}>Choose the Development Partnership Your Game Needs</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            GameNock adapts its involvement to the project: taking responsibility for complete development,
            integrating with an internal team, or owning specialized systems and platform expansions.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/start-a-project/" className="btn btn-primary">
              Get a Recommended Approach <Icon name="ArrowRight" size={16} />
            </Link>
            <Link href="/work/" className="btn btn-outline">View Our Work</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <RevealGroup className="grid grid-3">
            {OFFERS.map((o) => (
              <RevealItem as="div" key={o.slug} className="card">
                <IconWrap name={o.icon} accent="primary" />
                <h3 style={{ marginTop: 12 }}>{o.name}</h3>
                <p style={{ marginTop: 8 }}>{o.heroIntro}</p>
                <Link href={`/what-we-do/${o.slug}/`} className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>
                  Explore {o.name} <Icon name="ArrowRight" size={14} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Compare engagements</div>
            <h2>Help a buyer self-select</h2>
          </Reveal>
          <EngagementComparison />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Related work</div>
            <h2>One case study per engagement type</h2>
          </Reveal>
          <ProofGrid slugs={["horse-run", "gamisodes", "highnoon"]} />
        </div>
      </section>

      <section className="section">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Not sure which model fits?</h2>
            <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
              Share the current project stage and requirements and we'll recommend an approach.
            </p>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              Get a Recommended Approach
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
