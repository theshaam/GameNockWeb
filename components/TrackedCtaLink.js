"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// Document 9, Section 6: "CTA clicks by type (Book a Call / Request a
// Proposal / Build a Team)". Wraps next/link with a click-tracking call —
// used on the highest-intent conversion CTAs across the site.
export default function TrackedCtaLink({ href, ctaType, className, children, external = false, style }) {
  const handleClick = () => trackEvent("cta_click", { ctaType });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}
