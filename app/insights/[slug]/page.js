import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import ProofGrid from "@/components/ProofGrid";
import { INSIGHTS, getInsightBySlug } from "@/data/insights";
import { getOfferBySlug } from "@/data/offers";
import { withCanonical, articleJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }) {
  const post = getInsightBySlug(params.slug);
  if (!post) return {};
  return withCanonical(`/insights/${post.slug}/`, { title: post.title, description: post.summary.slice(0, 155) });
}

export default function InsightPage({ params }) {
  const post = getInsightBySlug(params.slug);
  if (!post) notFound();

  const offer = post.relatedOffer ? getOfferBySlug(post.relatedOffer) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title: post.title, description: post.summary, date: post.reviewedDate })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faqs)) }} />
      <Breadcrumb items={[{ name: "Insights", href: "/insights/" }, { name: post.title }]} />

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="badge badge-primary">{post.category}</span>
          <h1 style={{ marginTop: 16 }}>{post.title}</h1>
          <p style={{ marginTop: 8, fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
            {post.author} · Reviewed {post.reviewedDate}
          </p>
          <p style={{ marginTop: 20, fontSize: "1.05rem" }}>{post.summary}</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "1.3rem" }}>Who this applies to</h2>
          <p style={{ marginTop: 10 }}>{post.applicability}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "1.3rem" }}>Decision factors</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
            {post.factors.map((f) => (
              <div key={f.title} className="card-flat">
                <h3 style={{ fontSize: "1rem" }}>{f.title}</h3>
                <p style={{ marginTop: 6 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "1.3rem" }}>What we've seen in practice</h2>
          <p style={{ marginTop: 10 }}>{post.experience}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "1.3rem" }}>Checklist</h2>
          <ul style={{ marginTop: 16, paddingLeft: 20 }}>
            {post.checklist.map((c) => (
              <li key={c} style={{ marginBottom: 10, color: "var(--color-ink-soft)" }}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "1.3rem" }}>Common mistakes</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
            {post.mistakes.map((m) => (
              <div key={m.title} className="card-flat">
                <h3 style={{ fontSize: "1rem" }}>{m.title}</h3>
                <p style={{ marginTop: 6 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "1.3rem" }}>FAQ</h2>
          <div style={{ marginTop: 16 }}>
            <FaqAccordion faqs={post.faqs} />
          </div>
        </div>
      </section>

      {post.relatedCaseStudy && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head center">
              <div className="eyebrow">Related work</div>
            </div>
            <ProofGrid slugs={[post.relatedCaseStudy]} columns={1} />
          </div>
        </section>
      )}

      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <h2>Have a project in mind?</h2>
          {offer && (
            <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
              Related: <Link href={`/what-we-do/${offer.slug}/`} style={{ color: "var(--color-primary)" }}>{offer.name}</Link>
            </p>
          )}
          <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 20 }}>
            Discuss Your Project <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
