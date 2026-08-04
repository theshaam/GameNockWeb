import Link from "next/link";
import { SITE_CONFIG } from "@/data/config";
import { ROLES_WITH_PAGES } from "@/data/roles";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";

export default function Footer() {
  const year = "2026"; // static build year; safe to hardcode, avoids new Date() drift in server render
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid footer-grid-6">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>{SITE_CONFIG.siteName}</div>
            <p style={{ maxWidth: 260, marginBottom: 12 }}>
              {SITE_CONFIG.gamesShipped} games shipped since {SITE_CONFIG.founded}, for clients in {SITE_CONFIG.countriesServed} countries.
            </p>
            <p style={{ fontSize: "0.85rem" }}>{SITE_CONFIG.addressPakistan}</p>
            <p style={{ fontSize: "0.85rem" }}>{SITE_CONFIG.addressCanada}</p>
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>
            ))}
          </div>
          <div>
            <h4>Hire a Role</h4>
            {ROLES_WITH_PAGES.map((r) => (
              <Link key={r.slug} href={`/hire/${r.slug}`}>{r.name}</Link>
            ))}
          </div>
          <div>
            <h4>Industries</h4>
            {INDUSTRIES.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`}>{i.name}</Link>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {SITE_CONFIG.siteName}. All rights reserved.</span>
          <span>{SITE_CONFIG.email} · {SITE_CONFIG.phone}</span>
        </div>
      </div>
    </footer>
  );
}
