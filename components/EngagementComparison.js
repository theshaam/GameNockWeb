import Link from "next/link";
import Icon from "./Icon";
import { RevealGroup, RevealItem } from "./Reveal";

// Blueprint Section 5: "Process step... Engagement comparison — best
// fit, client inputs, GameNock ownership, commercial model, typical
// outcome." Used on What We Do, How We Work and every audience page.
const MODELS = [
  {
    slug: "full-cycle-game-development",
    name: "Full-Cycle Development",
    bestFit: "You have a concept, GDD, or prototype and need it built end to end.",
    clientInput: "Documentation, approvals at each milestone, final sign-off.",
    ownership: "Design, art, engineering, backend, QA, launch and support.",
    outcome: "A complete, launch-ready game.",
  },
  {
    slug: "co-development",
    name: "Co-Development",
    bestFit: "You have a team and need coordinated extra capacity.",
    clientInput: "Access to your codebase, creative direction, sprint participation.",
    ownership: "Defined features, systems, disciplines or milestones.",
    outcome: "Faster roadmap delivery without losing creative control.",
  },
  {
    slug: "specialized-development",
    name: "Specialized Development",
    bestFit: "You have a specific technical requirement — multiplayer, backend, porting, optimization.",
    clientInput: "Source access under NDA, a defined problem or requirement.",
    ownership: "The defined system, feature or platform expansion.",
    outcome: "A working, documented, handed-over system.",
  },
];

export default function EngagementComparison() {
  return (
    <RevealGroup className="grid grid-3">
      {MODELS.map((m) => (
        <RevealItem as="div" key={m.slug} className="card">
          <h3 style={{ fontSize: "1.1rem" }}>{m.name}</h3>
          <div style={{ marginTop: 14, display: "grid", gap: 10, fontSize: "0.88rem" }}>
            <div><strong>Best fit:</strong> <span style={{ color: "var(--color-ink-soft)" }}>{m.bestFit}</span></div>
            <div><strong>You provide:</strong> <span style={{ color: "var(--color-ink-soft)" }}>{m.clientInput}</span></div>
            <div><strong>We own:</strong> <span style={{ color: "var(--color-ink-soft)" }}>{m.ownership}</span></div>
            <div><strong>Outcome:</strong> <span style={{ color: "var(--color-ink-soft)" }}>{m.outcome}</span></div>
          </div>
          <Link href={`/what-we-do/${m.slug}/`} className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>
            Explore {m.name} <Icon name="ArrowRight" size={14} />
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
