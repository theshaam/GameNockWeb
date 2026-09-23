import Link from "next/link";
import Icon from "./Icon";

// Circular capability diagram — a hub with capability nodes ringed
// around it, adopted from a reference mockup's visual language.
export default function OrbitDiagram({ hub, nodes }) {
  const radius = 42; // percent of container
  const count = nodes.length;

  return (
    <div className="orbit-wrap">
      <div className="orbit-ring" />
      <div className="orbit-hub">
        <div>
          <Icon name={hub.icon} size={28} style={{ color: "var(--color-secondary)" }} />
          <div style={{ marginTop: 8, fontWeight: 700, fontSize: "0.95rem" }}>{hub.title}</div>
        </div>
      </div>
      {nodes.map((node, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
        const left = 50 + radius * Math.cos(angle);
        const top = 50 + radius * Math.sin(angle);
        const content = (
          <>
            <Icon name={node.icon} size={20} style={{ color: "var(--color-primary)" }} />
            <div style={{ fontSize: "0.72rem", fontWeight: 600, lineHeight: 1.2 }}>{node.label}</div>
          </>
        );
        return node.href ? (
          <Link key={node.label} href={node.href} className="orbit-node" style={{ left: `${left}%`, top: `${top}%` }}>
            {content}
          </Link>
        ) : (
          <div key={node.label} className="orbit-node" style={{ left: `${left}%`, top: `${top}%` }}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
