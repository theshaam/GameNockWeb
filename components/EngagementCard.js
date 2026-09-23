import Link from "next/link";
import Icon from "./Icon";

// A "mountain peak" shaped card — adopted from a reference mockup's
// engagement-model section.
export default function EngagementCard({ icon, title, body, href, cta }) {
  return (
    <Link href={href} className="mountain-card glow-card">
      <div className="mountain-peak">
        <Icon name={icon} size={22} style={{ color: "#111117" }} />
      </div>
      <div className="mountain-card-body">
        <h3 style={{ fontSize: "1.05rem" }}>{title}</h3>
        <p style={{ marginTop: 8, fontSize: "0.9rem" }}>{body}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: "0.88rem", fontWeight: 600, color: "var(--color-secondary)" }}>
          {cta} <Icon name="ArrowRight" size={14} />
        </span>
      </div>
    </Link>
  );
}
