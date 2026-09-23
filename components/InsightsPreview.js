import Link from "next/link";
import { RevealGroup, RevealItem } from "./Reveal";

// "Latest Guides and Perspectives" preview row, adopted from a
// reference mockup.
export default function InsightsPreview({ posts }) {
  return (
    <RevealGroup className="grid grid-3">
      {posts.map((p) => (
        <RevealItem as="div" key={p.slug} className="card glow-card">
          <span className="badge badge-primary">{p.category}</span>
          <h3 style={{ marginTop: 12, fontSize: "1.02rem" }}>
            <Link href={`/insights/${p.slug}/`}>{p.title}</Link>
          </h3>
          <p style={{ marginTop: 8, fontSize: "0.88rem" }}>{p.summary.slice(0, 110)}…</p>
          <p style={{ marginTop: 12, fontSize: "0.78rem", color: "var(--color-ink-soft)" }}>
            {p.author} · Reviewed {p.reviewedDate}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
