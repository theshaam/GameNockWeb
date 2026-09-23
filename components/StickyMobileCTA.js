import Link from "next/link";
import { SITE_CONFIG } from "@/data/config";

// Document 8, Section 9 (Mobile-First Requirements): "Sticky bottom CTA
// bar on mobile — the primary action is always one tap away." Hidden on
// desktop via CSS.
export default function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta">
      <Link href="/start-a-project/" className="btn btn-primary btn-block">
        {SITE_CONFIG.primaryCta}
      </Link>
    </div>
  );
}
