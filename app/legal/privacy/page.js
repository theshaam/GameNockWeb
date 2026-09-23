import Breadcrumb from "@/components/Breadcrumb";
import HonestNote from "@/components/HonestNote";
import { SITE_CONFIG } from "@/data/config";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/legal/privacy/", { title: "Privacy Policy" });

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Privacy Policy" }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <div style={{ marginTop: 20 }}>
            <HonestNote>
              This is a starter privacy policy, not reviewed by a lawyer — replace with counsel-reviewed text
              before this page goes live, per the launch checklist's legal and trust requirements.
            </HonestNote>
          </div>
          <div style={{ marginTop: 24, display: "grid", gap: 20 }}>
            <div>
              <h3>What we collect</h3>
              <p style={{ marginTop: 8 }}>
                When you submit a project form or contact form, we collect the information you provide —
                including your name, company, email, country, project details, and any files you choose to
                upload.
              </p>
            </div>
            <div>
              <h3>How we use it</h3>
              <p style={{ marginTop: 8 }}>
                We use submitted information to review your project and respond to your inquiry. We do not sell
                your information to third parties.
              </p>
            </div>
            <div>
              <h3>File uploads</h3>
              <p style={{ marginTop: 8 }}>
                Files you attach to a project submission are included in that submission and retained for as
                long as needed to review and respond to your inquiry.
              </p>
            </div>
            <div>
              <h3>Analytics</h3>
              <p style={{ marginTop: 8 }}>
                We use analytics tools to understand how visitors use this site. See our cookie settings for
                details.
              </p>
            </div>
            <div>
              <h3>Contact</h3>
              <p style={{ marginTop: 8 }}>
                Questions about this policy can be sent to{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: "var(--color-primary)" }}>{SITE_CONFIG.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
