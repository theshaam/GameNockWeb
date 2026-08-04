import Link from "next/link";
import Icon from "@/components/Icon";
import { SERVICES } from "@/data/services";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/solutions/project-development", {
  title: "Full Project Development",
  description: "GameNock owns your game project end-to-end — casual, multiplayer, blockchain, interactive, VR, and trivia — priced to your scope.",
});

export default function ProjectDevelopmentPage() {
  return (
    <>
      {/* Document 7, Section 2: H1/subhead/CTA, verbatim */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Full Project Development</div>
          <h1 style={{ maxWidth: 720 }}>Your Idea, Fully Built — Start to Finish</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            One accountable studio handles design, development, art, QA, and deployment — across every
            category, priced to your project's actual scope.
          </p>
          <Link href="/pricing#project" className="btn btn-primary" style={{ marginTop: 28 }}>
            See What It Costs <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Six categories, one team</div>
            <h2>What we build</h2>
          </div>
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card">
                <Icon name={s.icon} size={24} />
                <h3 style={{ marginTop: 14 }}>{s.name}</h3>
                <p style={{ marginTop: 8 }}>{s.shortDesc}</p>
                <div style={{ marginTop: 14, fontWeight: 600, fontSize: "0.85rem" }}>
                  {s.pricing.startingLabel}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Want to see exact starting prices?</h2>
          <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
            Full pricing by category lives on one page, so you can compare before you talk to us.
          </p>
          <Link href="/pricing" className="btn btn-outline" style={{ marginTop: 24 }}>View pricing</Link>
        </div>
      </section>
    </>
  );
}
