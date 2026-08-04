import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import PageViewTracker from "@/components/PageViewTracker";
import { getFlagships, getPortfolioBySlug } from "@/data/portfolio";
import { getServiceBySlug } from "@/data/services";
import { withCanonical } from "@/lib/seo";

export function generateStaticParams() {
  return getFlagships().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getPortfolioBySlug(params.slug);
  if (!project) return {};
  return withCanonical(`/portfolio/${project.slug}`, { title: project.name, description: project.solution });
}

export default function CaseStudyPage({ params }) {
  const project = getPortfolioBySlug(params.slug);
  if (!project || !project.flagship) notFound();

  const service = getServiceBySlug(project.category);

  return (
    <>
      <PageViewTracker event="portfolio_case_study_open" params={{ project: project.slug }} />
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
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
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

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>The challenge</h3>
              <p style={{ marginTop: 10 }}>{project.challenge}</p>
            </div>
            <div className="card">
              <h3>Our solution</h3>
              <p style={{ marginTop: 10 }}>{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card-flat">
              <h3>Key features</h3>
              <ul style={{ marginTop: 12, paddingLeft: 18 }}>
                {(project.features || []).map((f) => <li key={f} style={{ marginBottom: 6 }}>{f}</li>)}
              </ul>
            </div>
            <div className="card-flat">
              <h3>Team composition</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {(project.teamComposition || []).map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
              <h3 style={{ marginTop: 20 }}>Built with</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {[...(project.stack || []), ...(project.tools || [])].map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>
          </div>

        </div>
      </section>

      {project.results && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Results</div>
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

      {service && (
        <section className="section section-alt" style={{ textAlign: "center" }}>
          <div className="container">
            <h2>Need something similar built?</h2>
            <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
              {project.name} was built under our {service.name} category.
            </p>
            <Link href={`/services/${service.slug}`} className="btn btn-primary" style={{ marginTop: 24 }}>
              Explore {service.name} <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
