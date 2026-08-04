"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Document 9, Section 6: "pricing page visits, portfolio case-study opens"
// are named events to track. This is a tiny client component dropped into
// otherwise-server pages so the event fires without converting the whole
// page to a client component.
export default function PageViewTracker({ event, params = {} }) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
