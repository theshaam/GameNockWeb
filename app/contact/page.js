import Link from "next/link";
import Icon from "@/components/Icon";
import IconWrap from "@/components/IconWrap";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/config";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/contact/", {
  title: "Contact GameNock",
  description: "Choose the reason for contacting GameNock so the message reaches the right team.",
});

const ROUTES = [
  { title: "Project", body: "Have a game to build, staff or expand?", href: "/start-a-project/", cta: "Discuss Your Project", icon: "Rocket", primary: true },
  { title: "Partnership", body: "Publisher, studio or investment conversation.", href: "/solutions/publishers/", cta: "Explore Publisher Support", icon: "Handshake" },
  { title: "Careers", body: "Looking to join the team?", href: "/company/careers/", cta: "View Open Roles", icon: "Briefcase" },
  { title: "Media / General", body: "Press, general questions or anything else.", href: "#general-form", cta: "Send a Message", icon: "Mail" },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Contact" }]} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Contact</div>
          <h1 style={{ maxWidth: 620 }}>Contact the Right GameNock Team</h1>
          <p style={{ maxWidth: 580, marginTop: 18, fontSize: "1.05rem" }}>
            Choose the reason for contacting GameNock so the message reaches the right team.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <RevealGroup className="grid grid-4">
            {ROUTES.map((r) => (
              <RevealItem as="div" key={r.title} className="card" style={r.primary ? { borderColor: "var(--color-primary)", borderWidth: "1.5px" } : undefined}>
                <IconWrap name={r.icon} accent="primary" />
                <h3 style={{ marginTop: 12, fontSize: "1.02rem" }}>{r.title}</h3>
                <p style={{ marginTop: 8, fontSize: "0.9rem" }}>{r.body}</p>
                <Link href={r.href} className={r.primary ? "btn btn-primary btn-sm" : "btn btn-outline btn-sm"} style={{ marginTop: 16 }}>
                  {r.cta} <Icon name="ArrowRight" size={14} />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <div className="eyebrow">Company details</div>
              <h2 style={{ fontSize: "1.6rem" }}>Verified information</h2>
              <div style={{ marginTop: 20, display: "grid", gap: 14, fontSize: "0.95rem" }}>
                <div><strong>{SITE_CONFIG.siteName}</strong></div>
                <div>{SITE_CONFIG.addressPakistan}</div>
                <div>{SITE_CONFIG.addressCanada}</div>
                <div><a href={`mailto:${SITE_CONFIG.email}`} style={{ color: "var(--color-primary)" }}>{SITE_CONFIG.email}</a></div>
                <div>{SITE_CONFIG.businessHours}</div>
              </div>
            </div>
            <div id="general-form">
              <div className="eyebrow">General inquiries</div>
              <h2 style={{ fontSize: "1.6rem" }}>Send a message</h2>
              <div style={{ marginTop: 20 }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
