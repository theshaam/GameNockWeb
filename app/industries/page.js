import Link from "next/link";
import IconWrap from "@/components/IconWrap";
import { INDUSTRIES } from "@/data/industries";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/industries", {
  title: "Industries",
  description: "GameNock works with gaming studios, Web3 startups, educational IP owners, enterprise buyers, and publishers/agencies.",
});

const ICONS = {
  "gaming-studios": "Users",
  "web3-blockchain": "Link2",
  education: "GraduationCap",
  enterprise: "Building",
  "publishers-agencies": "Megaphone",
};

export default function IndustriesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">Industries</div>
        <h1 style={{ maxWidth: 640 }}>Built for the people who actually buy game development</h1>
        <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
          A Web3 founder and an enterprise buyer need to hear different things from the same studio.
          Find the page written for you.
        </p>

        <div className="grid grid-3" style={{ marginTop: 40 }}>
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="card">
              <IconWrap name={ICONS[i.slug]} accent={i.model === "dedicated-teams" ? "secondary" : "primary"} />
              <h3 style={{ marginTop: 12 }}>{i.name}</h3>
              <p style={{ marginTop: 8 }}>{i.heroSubhead}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
