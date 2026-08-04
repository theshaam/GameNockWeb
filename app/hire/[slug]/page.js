import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import FaqAccordion from "@/components/FaqAccordion";
import { ROLES_WITH_PAGES, getRoleBySlug } from "@/data/roles";
import { withCanonical, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return ROLES_WITH_PAGES.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }) {
  const role = getRoleBySlug(params.slug);
  if (!role) return {};
  return withCanonical(`/hire/${role.slug}`, {
    title: `Hire a ${role.name}`,
    description: `Hire a vetted ${role.name} from GameNock, billed monthly or hourly.`,
  });
}

// Document 7, Section 2: the Unity Developer page has an exact specified
// H1/subhead/CTA. Other role pages follow the same real-rate-first pattern
// since no exact copy was specified for them individually.
function heroCopyFor(role) {
  if (role.slug === "unity-developers") {
    return {
      h1: "Hire a Unity Developer, Managed by Us",
      subhead: `From $${role.monthlyMin}–$${role.monthlyMax}/month depending on seniority — vetted, consistent, and accountable to one studio, not a rotating freelancer.`,
      cta: "See the Full Rate Card",
    };
  }
  return {
    h1: `Hire a ${role.name}`,
    subhead: `Vetted ${role.name.toLowerCase()} talent, matched to your project and billed monthly or hourly — without the months of sourcing and interviewing that local hiring takes.`,
    cta: `Get Matched With a ${role.name}`,
  };
}

function faqsFor(role) {
  return [
    { q: `How fast can you place a ${role.name.toLowerCase()}?`, a: "Typically much faster than a local hiring process — exact timing depends on current availability, confirmed on a short intro call." },
    { q: "Is this person dedicated only to my project?", a: "Yes — \"dedicated\" means dedicated. They work on your project, not split across several clients at once." },
    { q: "What if the fit isn't right?", a: "We can discuss a swap or adjustment — the goal is a reliable long-term fit, not locking you into a bad match." },
    { q: "How is billing handled?", a: "Monthly or hourly, based on the rate range shown above and the scope we agree on together." },
  ];
}

export default function HireRolePage({ params }) {
  const role = getRoleBySlug(params.slug);
  if (!role) notFound();

  const hero = heroCopyFor(role);
  const faqs = faqsFor(role);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Dedicated Teams</div>
          <h1 style={{ maxWidth: 640 }}>{hero.h1}</h1>
          <p style={{ maxWidth: 600, marginTop: 18, fontSize: "1.05rem" }}>{hero.subhead}</p>
          <Link href="/pricing#team" className="btn btn-primary" style={{ marginTop: 28 }}>
            {hero.cta} <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>Monthly rate range</h3>
              <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-ink)", marginTop: 10 }}>
                ${role.monthlyMin} – ${role.monthlyMax}<span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--color-ink-soft)" }}> / month</span>
              </p>
              <p style={{ marginTop: 10 }}>Scales with experience level — see the full team calculator on the pricing page for an exact estimate.</p>
            </div>
            <div className="card">
              <h3>Hourly rate range</h3>
              <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-ink)", marginTop: 10 }}>
                ${role.hourlyMin} – ${role.hourlyMax}<span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--color-ink-soft)" }}> / hour</span>
              </p>
              <p style={{ marginTop: 10 }}>Ideal for shorter engagements or supplementing an existing team.</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/pricing#team" className="btn btn-outline">Open the full team calculator</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}
