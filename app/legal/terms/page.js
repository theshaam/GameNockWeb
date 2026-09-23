import Breadcrumb from "@/components/Breadcrumb";
import HonestNote from "@/components/HonestNote";
import { SITE_CONFIG } from "@/data/config";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/legal/terms/", { title: "Terms" });

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Terms" }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="eyebrow">Legal</div>
          <h1>Terms of Use</h1>
          <div style={{ marginTop: 20 }}>
            <HonestNote>
              This is a starter terms page, not reviewed by a lawyer — replace with counsel-reviewed text before
              this page goes live, per the launch checklist's legal and trust requirements.
            </HonestNote>
          </div>
          <div style={{ marginTop: 24, display: "grid", gap: 20 }}>
            <div>
              <h3>Website use</h3>
              <p style={{ marginTop: 8 }}>
                This website is provided for informational purposes about {SITE_CONFIG.siteName}'s services.
                Project engagements are governed by separate signed agreements, not by these terms alone.
              </p>
            </div>
            <div>
              <h3>Intellectual property</h3>
              <p style={{ marginTop: 8 }}>
                Case studies, project descriptions and site content belong to {SITE_CONFIG.siteName} or the
                respective project owners, and are shown here with permission where required.
              </p>
            </div>
            <div>
              <h3>Contact</h3>
              <p style={{ marginTop: 8 }}>
                Questions about these terms can be sent to{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: "var(--color-primary)" }}>{SITE_CONFIG.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
