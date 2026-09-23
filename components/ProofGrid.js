import Link from "next/link";
import Image from "next/image";
import { getPortfolioBySlug } from "@/data/portfolio";
import { RevealGroup, RevealItem } from "./Reveal";

// Renders relevant-work proof cards from a list of portfolio slugs.
// Flagship projects link to their full /work/[slug] case study;
// non-flagship projects render as a compact card (matching the /work
// hub's existing behavior for standard, non-case-study entries).
export default function ProofGrid({ slugs, columns = 3 }) {
  const projects = slugs.map(getPortfolioBySlug).filter(Boolean);
  if (projects.length === 0) return null;

  return (
    <RevealGroup className={`grid grid-${columns}`}>
      {projects.map((p) =>
        p.flagship ? (
          <RevealItem as="div" key={p.slug} className="card" style={p.image ? { padding: 0, overflow: "hidden" } : undefined}>
            <Link href={`/work/${p.slug}/`} style={{ display: "block", height: "100%" }}>
              {p.image && (
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--color-bg-alt)" }}>
                  <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
              )}
              <div style={p.image ? { padding: 24 } : undefined}>
                {p.role && <span className="badge badge-primary" style={{ marginBottom: 10 }}>{p.role}</span>}
                {p.isSample && <span className="badge" style={{ marginBottom: 10, marginLeft: 6, background: "var(--color-warn-bg)", borderColor: "var(--color-warn-border)", color: "var(--color-warn-ink)" }}>Illustrative Example</span>}
                <h3>{p.name}</h3>
                <p style={{ marginTop: 8 }}>{p.solution}</p>
              </div>
            </Link>
          </RevealItem>
        ) : (
          <RevealItem as="div" key={p.slug} className="card">
            {p.confidential ? <span className="badge" style={{ marginBottom: 10 }}>Confidential Engagement</span> : null}
            <h3>{p.confidential ? `${p.name} (confidential)` : p.name}</h3>
            <p style={{ marginTop: 8, fontSize: "0.88rem" }}>{(p.genres || []).join(" · ")}</p>
          </RevealItem>
        )
      )}
    </RevealGroup>
  );
}
