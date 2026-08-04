import { SITE_CONFIG } from "@/data/config";
import { SERVICES } from "@/data/services";
import { ROLES_WITH_PAGES } from "@/data/roles";
import { getFlagships } from "@/data/portfolio";
import { INDUSTRIES } from "@/data/industries";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap() {
  const base = SITE_CONFIG.siteUrl;
  const staticRoutes = [
    "", "/solutions/project-development", "/solutions/dedicated-teams",
    "/industries", "/services", "/hire", "/resources",
    "/pricing", "/portfolio", "/get-started", "/about", "/careers", "/contact",
  ].map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));

  const industryRoutes = INDUSTRIES.map((i) => ({ url: `${base}/industries/${i.slug}`, changeFrequency: "monthly", priority: 0.65 }));
  const serviceRoutes = SERVICES.map((s) => ({ url: `${base}/services/${s.slug}`, changeFrequency: "monthly", priority: 0.6 }));
  const roleRoutes = ROLES_WITH_PAGES.map((r) => ({ url: `${base}/hire/${r.slug}`, changeFrequency: "monthly", priority: 0.6 }));
  const caseStudyRoutes = getFlagships().map((p) => ({ url: `${base}/portfolio/${p.slug}`, changeFrequency: "yearly", priority: 0.5 }));
  const blogRoutes = BLOG_POSTS.map((p) => ({ url: `${base}/resources/${p.slug}`, changeFrequency: "yearly", priority: 0.5 }));

  return [...staticRoutes, ...industryRoutes, ...serviceRoutes, ...roleRoutes, ...caseStudyRoutes, ...blogRoutes];
}
