"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PORTFOLIO } from "@/data/portfolio";
import { SERVICES } from "@/data/services";

const CATEGORY_OPTIONS = [{ slug: "all", name: "All categories" }, ...SERVICES.map((s) => ({ slug: s.slug, name: s.name }))];

export default function PortfolioPage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => (category === "all" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === category)),
    [category]
  );

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="eyebrow">Portfolio</div>
          <h1 style={{ maxWidth: 640 }}>Proof, Not Promises</h1>
          <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
            100+ shipped titles. Here are the ones that best show what we can do for you. Some client names
            stay confidential by request; the work itself is real.
          </p>
        </div>
      </section>

      <section className="section section-alt" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={category === c.slug ? "badge badge-primary" : "badge"}
                style={{ cursor: "pointer", border: category === c.slug ? undefined : "1px solid var(--color-border)" }}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Document 5, Section 8: "flagships visually distinguished
              (larger card, 'Read the full story' link)" from standard cards. */}
          <div className="grid grid-3">
            {filtered.map((p) => (
              <div key={p.slug} className={p.flagship ? "card portfolio-card-flagship" : "card"}>
                {p.flagship && !p.isSample && <span className="badge badge-primary" style={{ marginBottom: 10 }}>Flagship</span>}
                {p.isSample && <span className="badge" style={{ marginBottom: 10, background: "var(--color-warn-bg)", borderColor: "var(--color-warn-border)", color: "var(--color-warn-ink)" }}>Illustrative Example</span>}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  <span className="badge">{p.platform}</span>
                  <span className="badge">{p.dim}</span>
                </div>
                <h3 style={p.flagship ? { fontSize: "1.4rem" } : undefined}>{p.confidential ? `${p.name} (confidential)` : p.name}</h3>
                <p style={{ marginTop: 8, fontSize: p.flagship ? "0.95rem" : "0.88rem" }}>
                  {p.flagship ? p.solution : (p.genres || []).join(" · ")}
                </p>
                {!p.flagship && p.results && (
                  <p style={{ marginTop: 6, fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>
                    {p.results}
                  </p>
                )}
                {p.flagship ? (
                  <Link href={`/portfolio/${p.slug}`} className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                    Read the full story
                  </Link>
                ) : p.link ? (
                  <a href={p.link.startsWith("http") ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ marginTop: 16 }}>
                    View project
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
