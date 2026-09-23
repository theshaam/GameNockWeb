import Icon from "@/components/Icon";
import Breadcrumb from "@/components/Breadcrumb";
import HonestNote from "@/components/HonestNote";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/config";
import { withCanonical } from "@/lib/seo";

// The 3 openings below remain FABRICATED placeholders, carried over
// from the previous /careers page — see PLACEHOLDERS.md. Replace with
// GameNock's real current openings before this ships.
export const metadata = withCanonical("/company/careers/", {
  title: "Game Development Careers at GameNock",
  description: `Join a multidisciplinary game-development team at ${SITE_CONFIG.siteName}, working across gameplay, multiplayer, connected systems, art and platform delivery.`,
});

const FAKE_OPENINGS = [
  { title: "Mid-Level Unity Developer", location: "Rawalpindi (on-site) or remote", type: "Full-time" },
  { title: "3D Artist / Animator", location: "Rawalpindi (on-site)", type: "Full-time" },
  { title: "QA Tester (Part-time)", location: "Remote", type: "Part-time" },
];

const PRINCIPLES = [
  { title: "Ownership", body: "Everyone owns a defined piece of the work, not just a task list." },
  { title: "Communication", body: "Clear, direct updates over long silent stretches." },
  { title: "Learning", body: "Every project is a chance to build something you haven't built before." },
  { title: "Playable progress", body: "We measure progress in builds you can play, not slide decks." },
  { title: "Respect", body: "For your time, your estimates, and your expertise." },
];

const DISCIPLINES = ["Engineering", "Art", "Design", "QA", "Backend", "Production coordination"];

export default function CareersPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Company", href: "/company/about/" }, { name: "Careers" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Careers</div>
          <h1 style={{ maxWidth: 640 }}>Build Games With a Team That Values Ownership</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            Join a multidisciplinary game-development team working across gameplay, multiplayer, connected
            systems, art and platform delivery.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">How we work</div>
            <h2>Cultural expectations</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {PRINCIPLES.map((p) => (
              <RevealItem as="div" key={p.title} className="card">
                <h3 style={{ fontSize: "1rem" }}>{p.title}</h3>
                <p style={{ marginTop: 8, fontSize: "0.9rem" }}>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Disciplines</div>
          </Reveal>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {DISCIPLINES.map((d) => <span key={d} className="badge">{d}</span>)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="eyebrow">Open roles</div>
          <h2>Current opportunities</h2>
          <div style={{ marginTop: 12 }}>
            <HonestNote>
              The openings below are placeholder examples, not real current listings — replace with GameNock's
              actual openings before this page goes live.
            </HonestNote>
          </div>
          <RevealGroup className="grid grid-3" style={{ marginTop: 24 }}>
            {FAKE_OPENINGS.map((job) => (
              <RevealItem as="div" key={job.title} className="card-flat">
                <h3 style={{ fontSize: "1.05rem" }}>{job.title}</h3>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <span className="badge">{job.location}</span>
                  <span className="badge">{job.type}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Application process</div>
          </Reveal>
          <RevealGroup className="grid grid-4">
            {["Application", "Review", "Practical assessment (if needed)", "Interview & decision"].map((step, i) => (
              <RevealItem as="div" key={step} className="card">
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-primary)" }}>STEP {i + 1}</div>
                <h3 style={{ marginTop: 6, fontSize: "0.98rem" }}>{step}</h3>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Don't see a role that fits?</h2>
          <p style={{ maxWidth: 480, margin: "14px auto 0" }}>
            Send a general application with your discipline and portfolio, and we'll reach out if something opens up.
          </p>
          <a href={`mailto:${SITE_CONFIG.email}`} className="btn btn-primary" style={{ marginTop: 24 }}>
            <Icon name="Mail" size={16} /> Submit General Application
          </a>
        </div>
      </section>
    </>
  );
}
