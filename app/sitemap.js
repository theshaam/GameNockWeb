import { SITE_CONFIG } from "@/data/config";
import { OFFERS } from "@/data/offers";
import { EXPERTISE } from "@/data/expertise";
import { AUDIENCES } from "@/data/audiences";
import { LOCATIONS } from "@/data/locations";
import { INSIGHTS } from "@/data/insights";
import { getFlagships } from "@/data/portfolio";

export default function sitemap() {
  const base = SITE_CONFIG.siteUrl;
  const staticRoutes = [
    "", "/what-we-do/", "/how-we-work/", "/work/", "/insights/",
    "/company/about/", "/company/technology/", "/company/careers/",
    "/contact/", "/start-a-project/", "/legal/privacy/", "/legal/terms/",
  ].map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));

  const offerRoutes = OFFERS.map((o) => ({ url: `${base}/what-we-do/${o.slug}/`, changeFrequency: "monthly", priority: 0.75 }));
  const expertiseRoutes = EXPERTISE.map((e) => ({ url: `${base}/expertise/${e.slug}/`, changeFrequency: "monthly", priority: 0.7 }));
  const audienceRoutes = AUDIENCES.map((a) => ({ url: `${base}/solutions/${a.slug}/`, changeFrequency: "monthly", priority: 0.65 }));
  const locationRoutes = LOCATIONS.map((l) => ({ url: `${base}/locations/${l.slug}/`, changeFrequency: "monthly", priority: 0.6 }));
  const caseStudyRoutes = getFlagships().map((p) => ({ url: `${base}/work/${p.slug}/`, changeFrequency: "yearly", priority: 0.6 }));
  const insightRoutes = INSIGHTS.map((i) => ({ url: `${base}/insights/${i.slug}/`, changeFrequency: "yearly", priority: 0.5 }));

  return [...staticRoutes, ...offerRoutes, ...expertiseRoutes, ...audienceRoutes, ...locationRoutes, ...caseStudyRoutes, ...insightRoutes];
}
