"use client";

// Document 9, Section 6 / Document 10, Section 5: event tracking for
// wizard starts/completions (and step drop-off), CTA clicks by type,
// pricing/portfolio views, and contact form submissions.
//
// This fires real gtag/plausible calls IF a real ID is configured in
// data/config.js (SITE_CONFIG.analytics). Until you set a real GA4
// Measurement ID or Plausible domain, calls below are safe no-ops —
// see PLACEHOLDERS.md item 6.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
  if (typeof window.plausible === "function") {
    window.plausible(name, { props: params });
  }
}
