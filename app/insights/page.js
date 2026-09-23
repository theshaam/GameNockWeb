import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { INSIGHTS } from "@/data/insights";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/insights/", {
  title: "Game Nock Insights — Game Development Guides",
  description: "Practical guides on game development cost, production, multiplayer, backend, porting and optimization.",
});

export default function InsightsPage() {
  const [featured, ...rest] = INSIGHTS;

  return (
    <>
      <Breadcrumb items={[{ name: "Insights" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Insights</div>
          <h1 style={{ maxWidth: 620 }}>Practical Guides for Serious Game Development Decisions</h1>
          <p style={{ maxWidth: 580, marginTop: 18, fontSize: "1.05rem" }}>
            Cost and planning, production, multiplayer and backend, and porting and optimization — written from
            what we've actually shipped, not generic advice.
          </p>
        </div>
      </section>

      {featured && (
        <section className="section section-alt">
          <div className="container">
            <Link href={`/insights/${featured.slug}/`} className="card" style={{ display: "block" }}>
              <span className="badge badge-primary">{featured.category}</span>
              <h2 style={{ marginTop: 14 }}>{featured.title}</h2>
              <p style={{ marginTop: 10, maxWidth: 640 }}>{featured.summary.slice(0, 220)}…</p>
            </Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <RevealGroup className="grid grid-3">
            {rest.map((post) => (
              <RevealItem as="div" key={post.slug} className="card">
                <span className="badge">{post.category}</span>
                <h3 style={{ marginTop: 12, fontSize: "1.05rem" }}>
                  <Link href={`/insights/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p style={{ marginTop: 8, fontSize: "0.9rem" }}>{post.summary.slice(0, 140)}…</p>
                <p style={{ marginTop: 10, fontSize: "0.78rem", color: "var(--color-ink-soft)" }}>
                  {post.author} · Reviewed {post.reviewedDate}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
