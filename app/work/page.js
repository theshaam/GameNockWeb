"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { PORTFOLIO } from "@/data/portfolio";

const ROLE_OPTIONS = ["All roles", "Full-Cycle Development", "Co-Development", "Specialized Development"];

export default function WorkPage() {
  const [role, setRole] = useState("All roles");

  const filtered = useMemo(
    () => (role === "All roles" ? PORTFOLIO : PORTFOLIO.filter((p) => p.role === role)),
    [role]
  );

  return (
    <>
      <Breadcrumb items={[{ name: "Our Work" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Our Work</div>
          <h1 style={{ maxWidth: 640 }}>Work That Shows What Game Nock Took Responsibility For</h1>
          <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
            Explore complete games, co-development contributions, multiplayer systems, connected platforms and
            technical expansions delivered by Game Nock. Every project identifies Game Nock's role — some client
            names stay confidential by request; the work itself is real.
          </p>
        </div>
      </section>

      <section className="section section-alt" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={role === r ? "badge badge-primary" : "badge"}
                style={{ cursor: "pointer", border: role === r ? undefined : "1px solid var(--color-border)" }}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="grid grid-3">
            {filtered.map((p) => (
              <div key={p.slug} className={p.flagship ? "card portfolio-card-flagship" : "card"} style={p.image ? { padding: 0, overflow: "hidden" } : undefined}>
                {p.image && (
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--color-bg-alt)" }}>
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                )}
                <div style={p.image ? { padding: 28 } : undefined}>
                  {p.role && <span className="badge badge-primary" style={{ marginBottom: 10 }}>{p.role}</span>}
                  {p.isSample && <span className="badge" style={{ marginBottom: 10, marginLeft: 6, background: "var(--color-warn-bg)", borderColor: "var(--color-warn-border)", color: "var(--color-warn-ink)" }}>Illustrative Example</span>}
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
                    <Link href={`/work/${p.slug}/`} className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                      Read the Case Study
                    </Link>
                  ) : p.link ? (
                    <a href={p.link.startsWith("http") ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ marginTop: 16 }}>
                      View project
                    </a>
                  ) : (
                    <span className="badge" style={{ marginTop: 16 }}>Confidential Engagement</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/start-a-project/" className="btn btn-outline">Discuss a Similar Project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
