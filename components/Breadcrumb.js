import Link from "next/link";
import { SITE_CONFIG } from "@/data/config";

// Blueprint Section 5: "Breadcrumb — Home > Section > Page, with schema
// markup" — required on every lower-level page except the homepage.
export default function Breadcrumb({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", url: SITE_CONFIG.siteUrl }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url || `${SITE_CONFIG.siteUrl}${item.href || ""}`,
    })),
  };

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
        <Link href="/">Home</Link>
        {items.map((item, i) => (
          <span key={item.href || item.name}>
            {" "}/{" "}
            {i === items.length - 1 || !item.href ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
