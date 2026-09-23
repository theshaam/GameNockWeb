import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/config";
import { OFFERS } from "@/data/offers";
import { EXPERTISE } from "@/data/expertise";

// Blueprint Section 4 (Global footer): Brand / What We Do / Expertise /
// Company / Start columns, plus a legal row.
export default function Footer() {
  const year = "2026"; // static build year; safe to hardcode, avoids new Date() drift in server render
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid footer-grid-6">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <Image src="/brand/gamenock-mark.png" alt="" width={28} height={24} />
              {SITE_CONFIG.siteName}
            </div>
            <p style={{ maxWidth: 260, marginBottom: 12 }}>
              {SITE_CONFIG.category} for {SITE_CONFIG.primaryAudience.toLowerCase()}.
            </p>
            <p style={{ fontSize: "0.85rem" }}>{SITE_CONFIG.addressPakistan}</p>
            <p style={{ fontSize: "0.85rem" }}>{SITE_CONFIG.addressCanada}</p>
          </div>
          <div>
            <h4>What We Do</h4>
            {OFFERS.map((o) => (
              <Link key={o.slug} href={`/what-we-do/${o.slug}/`}>{o.navLabel}</Link>
            ))}
          </div>
          <div>
            <h4>Expertise</h4>
            {EXPERTISE.map((e) => (
              <Link key={e.slug} href={`/expertise/${e.slug}/`}>{e.name}</Link>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/company/about/">About</Link>
            <Link href="/how-we-work/">How We Work</Link>
            <Link href="/work/">Our Work</Link>
            <Link href="/insights/">Insights</Link>
            <Link href="/company/careers/">Careers</Link>
            <Link href="/contact/">Contact</Link>
          </div>
          <div>
            <h4>Start</h4>
            <Link href="/start-a-project/" className="btn btn-primary btn-sm" style={{ marginBottom: 12 }}>
              {SITE_CONFIG.primaryCta}
            </Link>
            <p style={{ fontSize: "0.82rem" }}>
              Share your requirements and receive a recommended next step within 24–48 business hours.
            </p>
          </div>
        </div>
        <div className="footer-bottom" style={{ flexWrap: "wrap", gap: 10 }}>
          <span>© {year} {SITE_CONFIG.siteName}. All rights reserved.</span>
          <span style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/legal/privacy/">Privacy Policy</Link>
            <Link href="/legal/terms/">Terms</Link>
            <span>{SITE_CONFIG.email}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
