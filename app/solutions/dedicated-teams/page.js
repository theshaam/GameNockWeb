import Link from "next/link";
import Icon from "@/components/Icon";
import { ROLE_GROUPS } from "@/data/roles";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/solutions/dedicated-teams", {
  title: "Dedicated Teams",
  description: "Hire vetted game-dev talent by role — billed monthly or hourly, at a fraction of local hiring costs.",
});

export default function DedicatedTeamsPage() {
  return (
    <>
      {/* Document 7, Section 2: H1/subhead/CTA, verbatim */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Dedicated Teams</div>
          <h1 style={{ maxWidth: 720 }}>Hire the Team You Need, Not the Team You're Stuck With</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            Pick the roles — Unity developers, artists, QA, PMs — and we staff them monthly under one
            reliable studio, at Pakistan's well-known cost advantage.
          </p>
          <Link href="/get-started" className="btn btn-primary" style={{ marginTop: 28 }}>
            Build Your Team <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      {ROLE_GROUPS.map((group) => (
        <section key={group.group} className="section section-alt" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="container">
            <h3 style={{ marginBottom: 18 }}>{group.group}</h3>
            <div className="grid grid-4">
              {group.roles.map((r) => (
                <Link
                  key={r.slug}
                  href={r.hasPage ? `/hire/${r.slug}` : "/pricing"}
                  className="card-flat"
                >
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: "0.8rem", marginTop: 6, color: "var(--color-ink-soft)" }}>
                    from ${r.monthlyMin}/mo
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Want an estimate for your exact need?</h2>
          <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
            Use the team calculator on the pricing page to estimate monthly or hourly cost by role and experience level.
          </p>
          <Link href="/pricing" className="btn btn-outline" style={{ marginTop: 24 }}>Open the team calculator</Link>
        </div>
      </section>
    </>
  );
}
