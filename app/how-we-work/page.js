import Link from "next/link";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import Breadcrumb from "@/components/Breadcrumb";
import EngagementComparison from "@/components/EngagementComparison";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/how-we-work/", {
  title: "How Game Nock Works — Game Development Process and Engagements",
  description: "Every Game Nock engagement begins by defining the client outcome, the area of ownership, the approval process and the evidence required to confirm progress.",
});

const STEPS = [
  { step: "1", title: "Review", body: "We review your documentation, current build or requirement before proposing anything." },
  { step: "2", title: "Recommendation", body: "A recommended engagement model — full-cycle, co-development, or specialized — with reasoning." },
  { step: "3", title: "Scope", body: "A written scope, milestones and acceptance criteria you approve before work starts." },
  { step: "4", title: "Development", body: "Coordinated work against weekly playable builds, not a black box until the deadline." },
  { step: "5", title: "Validation", body: "Testing against the acceptance criteria defined at scoping, not a vague \"looks done.\"" },
  { step: "6", title: "Continuation", body: "A clear handover, and an honest conversation about what ongoing support looks like." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "How We Work" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">How We Work</div>
          <h1 style={{ maxWidth: 680 }}>Clear Ownership, Visible Progress and Practical Delivery</h1>
          <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
            Every Game Nock engagement begins by defining the client outcome, the area of ownership, the approval
            process and the evidence required to confirm progress.
          </p>
          <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
            Get a Recommended Approach <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Choose involvement</div>
            <h2>Three engagement models</h2>
          </Reveal>
          <EngagementComparison />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">The standard journey</div>
            <h2>Six-step process</h2>
          </Reveal>
          <RevealGroup className="grid grid-3">
            {STEPS.map((s) => (
              <RevealItem as="div" key={s.title} className="card">
                <IconWrap name="CheckCircle2" accent="primary" />
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-primary)", marginTop: 8 }}>STEP {s.step}</div>
                <h3 style={{ marginTop: 4, fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ marginTop: 8 }}>{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <Reveal>
              <div className="eyebrow">Communication</div>
              <h2 style={{ fontSize: "1.6rem" }}>Reducing delivery anxiety</h2>
              <p style={{ marginTop: 14 }}>
                Meeting rhythm, written updates, playable builds, issue escalation and decisions are all agreed
                before the first sprint — not improvised once work is underway.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-flat">
                <h3 style={{ fontSize: "1rem" }}>A typical weekly update includes:</h3>
                <ul style={{ marginTop: 12, paddingLeft: 18 }}>
                  <li style={{ marginBottom: 6, color: "var(--color-ink-soft)" }}>What shipped this week, playable</li>
                  <li style={{ marginBottom: 6, color: "var(--color-ink-soft)" }}>What's next, and any blockers</li>
                  <li style={{ marginBottom: 6, color: "var(--color-ink-soft)" }}>Any decisions we need from you</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <div className="eyebrow">Tools and access</div>
            <h2>Professional workflow, not promises</h2>
          </Reveal>
          <RevealGroup className="grid grid-4">
            {["Project management", "Source control", "Build distribution", "Documentation & security"].map((t) => (
              <RevealItem as="div" key={t} className="card">
                <h3 style={{ fontSize: "0.95rem" }}>{t}</h3>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-2">
            <Reveal>
              <div className="card">
                <h3>Change control</h3>
                <p style={{ marginTop: 10 }}>New requirements are estimated and approved before they're scheduled — scope doesn't drift silently.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card">
                <h3>Quality</h3>
                <p style={{ marginTop: 10 }}>Acceptance criteria, code review, QA, device testing, performance and regression — our definition of done, not just "it runs."</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal effect="zoom" as="div" className="container">
          <div style={{ textAlign: "center" }}>
            <h2>Share the project and receive a recommended engagement structure.</h2>
            <Link href="/start-a-project/" className="btn btn-primary" style={{ marginTop: 24 }}>
              Get a Recommended Approach
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
