import Link from "next/link";
import Icon from "@/components/Icon";
import TeamCalculator from "@/components/TeamCalculator";
import PageViewTracker from "@/components/PageViewTracker";
import { SERVICES } from "@/data/services";
import { ROLE_GROUPS } from "@/data/roles";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/pricing", {
  title: "Pricing",
  description: "Starting prices for GameNock's six project categories, plus full team rates by role and experience level.",
});

export default function PricingPage() {
  return (
    <>
      <PageViewTracker event="pricing_view" />
      {/* Document 7, Section 2: H1/subhead, verbatim */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Pricing</div>
          <h1 style={{ maxWidth: 640 }}>What It Actually Costs</h1>
          <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
            Starting prices for both models — final cost always depends on complexity, timeline, and
            requirements. No hidden numbers.
          </p>
        </div>
      </section>

      <section id="project" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Full Project Development</div>
            <h2>Starting prices by category</h2>
          </div>
          <div className="grid grid-3">
            {SERVICES.map((s) => (
              <div key={s.slug} className="card">
                <Icon name={s.icon} size={22} />
                <h3 style={{ marginTop: 14 }}>{s.name}</h3>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 10 }}>{s.pricing.startingLabel}</div>
                <Link href={`/services/${s.slug}`} className="btn btn-outline btn-sm" style={{ marginTop: 16 }}>
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Dedicated Teams</div>
            <h2>Full rate table</h2>
          </div>
          {ROLE_GROUPS.map((group) => (
            <div key={group.group} style={{ marginBottom: 32 }}>
              <h3 style={{ marginBottom: 12 }}>{group.group}</h3>
              <table className="rate-table">
                <thead>
                  <tr><th>Role</th><th>Monthly</th><th>Hourly</th></tr>
                </thead>
                <tbody>
                  {group.roles.map((r) => (
                    <tr key={r.slug}>
                      <td>{r.hasPage ? <Link href={`/hire/${r.slug}`}>{r.name}</Link> : r.name}</td>
                      <td>${r.monthlyMin} – ${r.monthlyMax}</td>
                      <td>${r.hourlyMin} – ${r.hourlyMax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <TeamCalculator />
            <div className="card-flat">
              <h3>How rates scale</h3>
              <p style={{ marginTop: 10 }}>
                Every role has a rate range tied to experience level and skill rank. Level 1 (0–1.5 years)
                sits at the minimum of the range; Level 5 (10+ years) sits at the maximum. Rates in between
                scale proportionally.
              </p>
              <Link href="/get-started" className="btn btn-primary" style={{ marginTop: 18 }}>
                Get a Scoped Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
