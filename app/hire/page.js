import Link from "next/link";
import { ROLE_GROUPS } from "@/data/roles";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/hire", {
  title: "Hire Developers",
  description: "Hire vetted game-dev talent by role — Unity developers, blockchain engineers, artists, QA, and more.",
});

export default function HireIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">Dedicated Teams</div>
        <h1 style={{ maxWidth: 640 }}>Hire by role, not by resume pile</h1>
        <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
          Every role below is vetted, billed monthly or hourly, and managed under one accountable studio —
          not a rotating cast of freelancers.
        </p>

        {ROLE_GROUPS.map((group) => (
          <div key={group.group} style={{ marginTop: 36 }}>
            <h3 style={{ marginBottom: 16 }}>{group.group}</h3>
            <div className="grid grid-4">
              {group.roles.map((r) => (
                <Link
                  key={r.slug}
                  href={r.hasPage ? `/hire/${r.slug}` : "/pricing#team"}
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
        ))}
      </div>
    </section>
  );
}
