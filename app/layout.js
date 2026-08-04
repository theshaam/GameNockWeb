import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Analytics, { MetaPixel } from "@/components/Analytics";
import { SITE_CONFIG } from "@/data/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: `${SITE_CONFIG.siteName} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.siteName}`,
  },
  description:
    "GameNock builds complete games end-to-end and staffs vetted game-dev talent by role — for startups, agencies, and studios who need to ship without the overhead of local hiring.",
  openGraph: {
    title: `${SITE_CONFIG.siteName} — ${SITE_CONFIG.tagline}`,
    description:
      "Full project development or dedicated game-dev teams, built by a studio that has shipped 100+ games since 2022.",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.siteName} — ${SITE_CONFIG.tagline}`,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.siteUrl,
    foundingDate: String(SITE_CONFIG.founded),
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: [
      { "@type": "PostalAddress", streetAddress: SITE_CONFIG.addressPakistan },
      { "@type": "PostalAddress", streetAddress: SITE_CONFIG.addressCanada },
    ],
    sameAs: Object.values(SITE_CONFIG.socials),
  };

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <MetaPixel />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
