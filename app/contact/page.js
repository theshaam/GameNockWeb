import Icon from "@/components/Icon";
import { SITE_CONFIG } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/contact", {
  title: "Contact",
  description: `Get in touch with ${SITE_CONFIG.siteName} — ${SITE_CONFIG.responseTimeCommitment}.`,
});

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <div>
            <div className="eyebrow">Contact</div>
            <h1>Let's talk about your project</h1>
            <p style={{ marginTop: 16 }}>We respond {SITE_CONFIG.responseTimeCommitment}.</p>

            <div style={{ marginTop: 28, display: "grid", gap: 16 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Icon name="Mail" size={18} /> {SITE_CONFIG.email}
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Icon name="Phone" size={18} /> {SITE_CONFIG.phone}
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="MapPin" size={18} style={{ marginTop: 2 }} />
                <div>
                  <div>{SITE_CONFIG.addressPakistan}</div>
                  <div style={{ marginTop: 4 }}>{SITE_CONFIG.addressCanada}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Icon name="Clock" size={18} /> {SITE_CONFIG.businessHours}
              </div>
            </div>

            <TrackedCtaLink href={SITE_CONFIG.bookingLink} external ctaType="Book a Call" className="btn btn-outline" style={{ marginTop: 28 }}>
              <Icon name="Calendar" size={16} /> Book a call directly
            </TrackedCtaLink>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
