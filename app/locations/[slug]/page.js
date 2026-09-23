import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import ProofGrid from "@/components/ProofGrid";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { LOCATIONS, getLocationBySlug } from "@/data/locations";
import { withCanonical, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }) {
  const location = getLocationBySlug(params.slug);
  if (!location) return {};
  return withCanonical(`/locations/${location.slug}/`, { title: `Game Development Company in ${location.countryName}`, description: location.heroIntro });
}

export default function LocationPage({ params }) {
  const location = getLocationBySlug(params.slug);
  if (!location) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(location.faqs)) }} />
      <Breadcrumb items={[{ name: "Locations", href: "/what-we-do/" }, { name: location.countryName }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Global delivery · {location.countryName}</div>
          <h1 style={{ maxWidth: 720 }}>{location.heroH1}</h1>
          <p style={{ maxWidth: 640, marginTop: 18, fontSize: "1.05rem" }}>{location.heroIntro}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/start-a-project/" className="btn btn-primary">
              {location.ctaLabel} <Icon name="ArrowRight" size={16} />
            </Link>
            <Link href="/work/" className="btn btn-outline">View Our Work</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Regional needs</div>
          </Reveal>
          <RevealGroup className="grid grid-2">
            {location.regionalNeeds.map((n) => (
              <RevealItem as="div" key={n.title} className="card">
                <h3 style={{ fontSize: "1.05rem" }}>{n.title}</h3>
                <p style={{ marginTop: 8 }}>{n.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Relevant proof</div>
            <h2>Transferable experience</h2>
          </Reveal>
          <ProofGrid slugs={["gamisodes", "highnoon", "blast-wheels"]} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Regional FAQ</div>
          </Reveal>
          <FaqAccordion faqs={location.faqs} />
        </div>
      </section>

      <section className="section">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Share your project, organization and preferred communication language.</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              {location.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
