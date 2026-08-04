import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import { getPortfolioBySlug } from "@/data/portfolio";
import { withCanonical, articleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return withCanonical(`/resources/${post.slug}`, { title: post.title, description: post.description });
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedService = post.relatedServiceSlug ? getServiceBySlug(post.relatedServiceSlug) : null;
  const relatedProjects = (post.relatedPortfolioSlugs || []).map(getPortfolioBySlug).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }} />

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {post.tags.map((t) => <span key={t} className="badge">{t}</span>)}
          </div>
          <h1>{post.title}</h1>
          <p style={{ marginTop: 14, fontSize: "0.85rem" }}>
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div style={{ marginTop: 32, display: "grid", gap: 20 }}>
            {post.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.7, color: "var(--color-ink)" }}>{p}</p>
            ))}
          </div>

          {(relatedService || relatedProjects.length > 0) && (
            <div className="card-flat" style={{ marginTop: 40 }}>
              <h3>Related</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                {relatedService && (
                  <Link href={`/services/${relatedService.slug}`} className="btn btn-outline btn-sm">
                    {relatedService.name} <Icon name="ArrowRight" size={14} />
                  </Link>
                )}
                {relatedProjects.map((p) => (
                  <Link key={p.slug} href={`/portfolio/${p.slug}`} className="btn btn-outline btn-sm">
                    {p.name} case study <Icon name="ArrowRight" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 40 }}>
            <Link href="/get-started" className="btn btn-primary">Get a Scoped Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
