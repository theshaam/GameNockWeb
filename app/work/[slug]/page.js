import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Breadcrumb from "@/components/Breadcrumb";
import PageViewTracker from "@/components/PageViewTracker";
import ProofGrid from "@/components/ProofGrid";
import { getFlagships, getPortfolioBySlug } from "@/data/portfolio";
import { withCanonical } from "@/lib/seo";

export function generateStaticParams() {
  return getFlagships().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getPortfolioBySlug(params.slug);
  if (!project) return {};
  return withCanonical(`/work/${project.slug}/`, { title: project.name, description: project.solution });
}

export default function CaseStudyPage({ params }) {
  const project = getPortfolioBySlug(params.slug);
  if (!project || !project.flagship) notFound();

  const otherProof = getFlagships().filter((p) => p.slug !== project.slug).slice(0, 3).map((p) => p.slug);

  return (
    <>
      <PageViewTracker event="case_study_view" params={{ project: project.slug, role: project.role }} />
      <Breadcrumb items={[{ name: "Our Work", href: "/work/" }, { name: project.name }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Case Study</div>
          {project.isSample && (
            <div className="honest-note" style={{ marginBottom: 20, maxWidth: 620 }}>
              This is a fabricated sample case study, added only so you can preview this page's layout — it
              is not a real GameNock project. Replace or remove before this page goes live.
            </div>
          )}
          <h1 style={{ maxWidth: 640 }}>{project.name}</h1>
          <p style={{ maxWidth: 600, marginTop: 12, fontSize: "1.05rem" }}>{project.solution}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            {project.role && <span className="badge badge-primary">{project.role}</span>}
            <span className="badge">{project.platform}</span>
            <span className="badge">{project.dim}</span>
            {(project.genres || []).map((g) => <span key={g} className="badge">{g}</span>)}
          </div>
          {project.link && (
            <a href={project.link.startsWith("http") ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
              Visit project <Icon name="ExternalLink" size={14} />
            </a>
          )}
        </div>
      </section>

      {project.image && (
        <section className="container" style={{ marginTop: -12 }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <Image src={project.image} alt={project.name} fill style={{ objectFit: "cover" }} sizes="100vw" priority />
          </div>
        </section>
      )}

      {/* QUICK FACTS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Quick facts</div>
          </div>
          <div className="grid grid-4">
            <div className="card-flat"><h3 style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Engagement</h3><p style={{ marginTop: 6, fontWeight: 600 }}>{project.role || "—"}</p></div>
            <div className="card-flat"><h3 style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Platform</h3><p style={{ marginTop: 6, fontWeight: 600 }}>{project.platform}</p></div>
            <div className="card-flat"><h3 style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Engine/Stack</h3><p style={{ marginTop: 6, fontWeight: 600 }}>{(project.stack || []).join(", ")}</p></div>
            <div className="card-flat"><h3 style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Status</h3><p style={{ marginTop: 6, fontWeight: 600 }}>{project.confidential ? "Confidential" : "Public"}</p></div>
          </div>
        </div>
      </section>

      {/* CHALLENGE / RESPONSIBILITY */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>The challenge</h3>
              <p style={{ marginTop: 10 }}>{project.challenge}</p>
            </div>
            <div className="card">
              <h3>GameNock's responsibility</h3>
              <p style={{ marginTop: 10 }}>
                {project.role === "Co-Development"
                  ? "GameNock owned defined features and systems within this project, integrated with the client's existing team and production pipeline."
                  : project.role === "Specialized Development"
                  ? "GameNock owned the technical systems described below — architecture, implementation, testing and documentation — while the client retained overall product direction."
                  : "GameNock owned the complete production: design, art, engineering, backend, QA and launch."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION / DELIVERED SYSTEMS */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2">
            <div className="card-flat">
              <h3>Our solution</h3>
              <p style={{ marginTop: 10 }}>{project.solution}</p>
            </div>
            <div className="card-flat">
              <h3>Delivered systems</h3>
              <ul style={{ marginTop: 12, paddingLeft: 18 }}>
                {(project.features || []).map((f) => <li key={f} style={{ marginBottom: 6 }}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL DETAIL / COLLABORATION */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card-flat">
              <h3>Technical detail</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {[...(project.stack || []), ...(project.tools || [])].map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>
            <div className="card-flat">
              <h3>Collaboration</h3>
              <p style={{ marginTop: 10, fontSize: "0.9rem", color: "var(--color-ink-soft)" }}>Team composition:</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {(project.teamComposition || []).map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME */}
      {project.results && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Outcome</div>
              <h2>How it performed</h2>
              <p style={{ marginTop: 10, fontSize: "0.85rem" }}>
                Illustrative placeholder figures — see PLACEHOLDERS.md. Replace with real numbers before launch.
              </p>
            </div>
            <div className="grid grid-3">
              {Object.values(project.results).map((r) => (
                <div key={r.label} className="card">
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--color-primary)" }}>{r.value}</div>
                  <p style={{ marginTop: 6 }}>{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED PROOF */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Related proof</div>
            <h2>More work like this</h2>
          </div>
          <ProofGrid slugs={otherProof} />
        </div>
      </section>

      <section className="section section-alt" style={{ textAlign: "center" }}>
        <div className="container">
          <h2>Planning a similar project?</h2>
          <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
            Discuss a Similar Project <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
