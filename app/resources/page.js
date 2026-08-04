import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { withCanonical } from "@/lib/seo";

// Document 3's IA: "/resources/ (blog) — ongoing content, fully scoped
// in Document 9." Document 9, Section 9: "publish first 4–6 blog posts"
// in the first 3 months post-launch — these are those first posts.
export const metadata = withCanonical("/resources", {
  title: "Resources",
  description: "Real cost breakdowns and case-study write-ups from GameNock — no generic industry filler.",
});

export default function ResourcesIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">Resources</div>
        <h1 style={{ maxWidth: 640 }}>Real numbers, not generic industry filler</h1>
        <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>
          Cost breakdowns and case-study write-ups pulled directly from projects we've actually shipped.
        </p>

        <div className="grid grid-3" style={{ marginTop: 40 }}>
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/resources/${post.slug}`} className="card">
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {post.tags.map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
              <h3>{post.title}</h3>
              <p style={{ marginTop: 8 }}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
