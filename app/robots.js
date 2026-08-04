import { SITE_CONFIG } from "@/data/config";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  };
}
