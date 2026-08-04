import Script from "next/script";
import { SITE_CONFIG } from "@/data/config";

// Document 10, Section 5: "This should be built in from day one of
// development, not bolted on after launch." The script only loads a
// REAL tracking ID once you replace the placeholder in data/config.js —
// until then this renders nothing, so no requests go out to a fake ID.
export default function Analytics() {
  const { provider, ga4MeasurementId, plausibleDomain } = SITE_CONFIG.analytics;
  const hasRealGa4 = provider === "ga4" && ga4MeasurementId && !ga4MeasurementId.includes("XXXX");

  if (hasRealGa4) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4MeasurementId}');`}
        </Script>
      </>
    );
  }

  if (provider === "plausible" && plausibleDomain) {
    return (
      <Script
        src="https://plausible.io/js/script.js"
        data-domain={plausibleDomain}
        strategy="afterInteractive"
      />
    );
  }

  return null;
}

// Document 9, Section 5: Meta Pixel for retargeting visitors who hit
// /pricing or started the wizard without converting. FAKE pixel ID —
// see data/config.js. Rendered alongside Analytics() in the root layout.
export function MetaPixel() {
  const { metaPixelId } = SITE_CONFIG;
  if (!metaPixelId) return null;
  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');`}
    </Script>
  );
}
