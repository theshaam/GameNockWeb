import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { withCanonical } from "@/lib/seo";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return {};
  return withCanonical(`/industries/${industry.slug}`, { title: industry.seoTitle, description: industry.heroSubhead });
}

export default function IndustryPage({ params }) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const modelHref = industry.model === "dedicated-teams" ? "/solutions/dedicated-teams"
    : industry.model === "project-development" ? "/solutions/project-development"
    : null;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="eyebrow">Industries · {industry.name}</div>
          <h1 style={{ maxWidth: 720 }}>{industry.heroTitle}</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>{industry.heroSubhead}</p>
          <TrackedCtaLink href={industry.ctaHref} ctaType={industry.cta} className="btn btn-primary" style={{ marginTop: 28 }}>
            {industry.cta} <Icon name="ArrowRight" size={16} />
          </TrackedCtaLink>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>What you're dealing with</h3>
              <ul style={{ marginTop: 12, paddingLeft: 18 }}>
                {industry.problems.map((p) => <li key={p} style={{ marginBottom: 8 }}>{p}</li>)}
              </ul>
            </div>
            <div className="card">
              <h3>Why GameNock</h3>
              <p style={{ marginTop: 10 }}>{industry.whyGameNock}</p>
              {modelHref && (
                <Link href={modelHref} className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>
                  See how this model works
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
