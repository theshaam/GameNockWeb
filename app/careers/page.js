import { SITE_CONFIG } from "@/data/config";
import { withCanonical } from "@/lib/seo";

// Document 3's IA kept /careers/ "as-is for now" from the existing site.
// This rebuild doesn't have the original page's real content, and the
// 3 openings below are FABRICATED — filled in only to preview the page
// fully populated, per your explicit request. Replace with GameNock's
// real current openings (or remove them and revert to a holding-page
// message) before this goes live — publishing fake job listings could
// waste real applicants' time.
export const metadata = withCanonical("/careers", {
  title: "Careers",
  description: `Work with ${SITE_CONFIG.siteName} — a game development studio shipping ${SITE_CONFIG.gamesShipped} games since ${SITE_CONFIG.founded}.`,
});

const FAKE_OPENINGS = [
  { title: "Mid-Level Unity Developer", location: "Rawalpindi (on-site) or remote", type: "Full-time" },
  { title: "3D Artist / Animator", location: "Rawalpindi (on-site)", type: "Full-time" },
  { title: "QA Tester (Part-time)", location: "Remote", type: "Part-time" },
];

export default function CareersPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="eyebrow">Careers</div>
        <h1>Work with GameNock</h1>
        <p style={{ marginTop: 18, fontSize: "1.05rem" }}>
          We're a Rawalpindi-based studio that's shipped {SITE_CONFIG.gamesShipped} games since{" "}
          {SITE_CONFIG.founded} for clients across {SITE_CONFIG.countriesServed} countries.
        </p>

        <div className="honest-note" style={{ marginTop: 20 }}>
          The openings below are placeholder examples, not real current listings — replace with GameNock's
          actual openings before this page goes live.
        </div>

        <div style={{ marginTop: 28, display: "grid", gap: 14 }}>
          {FAKE_OPENINGS.map((job) => (
            <div key={job.title} className="card-flat">
              <h3 style={{ fontSize: "1.05rem" }}>{job.title}</h3>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <span className="badge">{job.location}</span>
                <span className="badge">{job.type}</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 24 }}>
          Interested? Email us at{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>{SITE_CONFIG.email}</a>.
        </p>
      </div>
    </section>
  );
}
