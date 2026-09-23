import Link from "next/link";
import Icon from "./Icon";
import IconWrap from "./IconWrap";
import { RevealGroup, RevealItem } from "./Reveal";

// "Creative Range. Technical Depth." style expertise card grid,
// adopted from a reference mockup.
export default function ExpertiseGrid({ items }) {
  return (
    <RevealGroup className="grid grid-3">
      {items.map((e) => (
        <RevealItem as="div" key={e.slug} className="card glow-card">
          <IconWrap name={e.icon} accent="primary" />
          <h3 style={{ marginTop: 12, fontSize: "1.05rem" }}>{e.name}</h3>
          <p style={{ marginTop: 8, fontSize: "0.9rem" }}>{e.heroIntro}</p>
          <Link href={`/expertise/${e.slug}/`} className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>
            Explore <Icon name="ArrowRight" size={14} />
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
