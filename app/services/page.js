import Link from "next/link";
import Icon from "@/components/Icon";
import { SERVICES } from "@/data/services";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/services", {
  title: "Services",
  description: "All six Full Project Development categories — casual, multiplayer, blockchain, interactive cartoons, VR, and trivia.",
});

export default function ServicesIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">Full Project Development</div>
        <h1 style={{ maxWidth: 640 }}>Six categories, one accountable team</h1>
        <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
          Every category below is a distinct scope with its own starting price — not one generic
          "we build games" page trying to cover everything at once.
        </p>

        <div className="grid grid-3" style={{ marginTop: 40 }}>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card">
              <Icon name={s.icon} size={24} />
              <h3 style={{ marginTop: 14 }}>{s.name}</h3>
              <p style={{ marginTop: 8 }}>{s.shortDesc}</p>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: "0.85rem" }}>{s.pricing.startingLabel}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
