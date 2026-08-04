import Link from "next/link";

// Document 8, Section 9 (Mobile-First Requirements): "Sticky bottom CTA
// bar on mobile — the primary action is always one tap away." Document 7,
// Section 3's CTA library: sticky mobile bar copy is "Get a Quote", kept
// short for thumb-width tap targets. Hidden on desktop via CSS.
export default function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta">
      <Link href="/get-started" className="btn btn-primary btn-block">
        Get a Quote
      </Link>
    </div>
  );
}
