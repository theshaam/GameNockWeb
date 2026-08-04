import { SITE_CONFIG } from "@/data/config";

// Document 10, Section 4: "Canonical tags on every page to prevent
// duplicate-content issues as the site scales to 35–40 pages."
export function withCanonical(path, metadata = {}) {
  return {
    ...metadata,
    alternates: { canonical: `${SITE_CONFIG.siteUrl}${path}` },
  };
}

// Document 10, Section 4: "JSON-LD schema per page type: ... Service
// schema on each /services/* page, FAQPage schema wherever an FAQ
// section exists."
export function serviceJsonLd(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@type": "ProfessionalService", name: SITE_CONFIG.siteName, url: SITE_CONFIG.siteUrl },
    areaServed: "Worldwide",
    description: service.heroSubhead,
  };
}

export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_CONFIG.siteName },
  };
}
