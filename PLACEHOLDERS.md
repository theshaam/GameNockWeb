# Everything that's fake — the full replace-before-launch checklist

You asked me to fill in every remaining gap with fake or chosen-by-Claude
content so you could see the whole site populated, and to keep an exact
record of what to check and replace. This is that record. Nothing below
should go live as-is — treat this file as your pre-launch punch list,
roughly in priority order.

## 🔴 Highest priority — could actively mislead a real visitor

### 1. Two fabricated "sample" case studies (VR and Trivia)
- **Files**: `data/portfolio.js` — entries `sample-vr-onboarding-experience`
  and `sample-trivia-arena` (both `isSample: true`).
- **What's fake**: the entire project — name, challenge, solution,
  features, team, and results are all invented. GameNock has not shipped
  a VR or trivia project.
- **Why it's flagged highest priority**: this is the one case where
  "filling in a gap" means claiming shipped work that doesn't exist, not
  just an unverified number. Both pages carry a visible orange
  "Illustrative Example — Not Yet Shipped" badge (on `/portfolio` and on
  the linked `/services/vr-experiences` and `/services/trivia-games`
  pages) plus a full-width warning banner on the case study page itself,
  specifically so this can't silently ship. **Replace with a real project
  once you have one, or delete these two entries** (and remove their
  slugs from `caseStudySlugs` in `data/services.js`) to go back to the
  honest "we don't have one yet" messaging this build used before.

### 2. Four fabricated testimonials
- **File**: `data/config.js` — `TESTIMONIALS` array (Sara K., Daniel R.,
  Mina T., Owen P., all tagged "(fake)" in their company names).
- **What's fake**: all four quotes, names, roles, and companies.
- **Why it's flagged highest priority**: publishing invented testimonials
  as if they were real customers is a real deceptive-marketing risk if
  this ships unreplaced — the "(fake)" tags in the company names are a
  safety net, not a fix. **Replace with 3–5 real client quotes, or revert
  this array to `[]`** (which makes the Testimonials section on `/about`
  disappear again, exactly like before this pass).

## 🟡 Fake numbers — plausible but invented

### 3. Portfolio "Results" — every project
- **File**: `data/portfolio.js`.
- All 6 original flagships (Azuma-Coin, Gamisodes, HighNoon, Blast
  Wheels, Crawl Out, Space Shooter) now have a `results` object with 3
  invented stats each, rendered in a new "Results" section on their case
  study pages (`app/portfolio/[slug]/page.js`) — visibly labeled
  "Illustrative placeholder figures" under the section heading.
- All ~20 standard portfolio cards have a one-line fake `results` string
  ending in "(fake)".
- **Replace with**: real download counts, ratings, revenue, retention, or
  community-size figures once you can pull them from app store consoles,
  analytics, or internal records (Document 5's original ask).

## 🟠 Fake operational values — won't function correctly if unreplaced

### 4. Lead notification inbox
- **File**: `data/config.js` → `leadNotifyEmail: "leads@gamenock.com"`.
- This inbox doesn't exist. Wizard/contact submissions still only log to
  the server console (`app/api/lead/route.js`) — this value isn't wired
  to actually send anywhere yet regardless. Replace with a real inbox,
  Google Sheet, or CRM endpoint, then update that route file to use it.

### 5. Booking link — RESOLVED
- **File**: `data/config.js` → `bookingLink`.
- Now set to a real Calendly URL (`https://calendly.com/hashammuhammad148/new-meeting`).
  Used on `/contact`'s "Book a call directly" button and by the wizard's
  "Book My Discovery Meeting" flow (`components/Wizard.js`). Nothing left
  to do here unless you want a different scheduling account.

### 6. GA4 Measurement ID
- **File**: `data/config.js` → `analytics.ga4MeasurementId: "G-9K3XQ7LM2P"`.
- **Behavior change worth knowing**: earlier builds used a placeholder
  containing "XXXX" specifically so `components/Analytics.js` would stay
  silent (no script tag at all) until you set a real ID. This fake ID no
  longer contains "XXXX", so the GA4 script **will now actually load** in
  the browser and send events to a nonexistent property — mostly
  harmless (Google just ignores unrecognized IDs) but it does mean real
  network requests fire that didn't before. Replace with your real GA4
  Measurement ID (or switch `provider` to `"plausible"` and set
  `plausibleDomain`).

### 7. Meta Pixel ID (new — this was a genuine missing piece, not just unfilled)
- **File**: `data/config.js` → `metaPixelId: "1234567890123456"`.
- Document 9, Section 5 asked for retargeting aimed at `/pricing`
  visitors and wizard abandoners — this was entirely unbuilt before this
  pass. `components/Analytics.js` now exports a `MetaPixel` component,
  wired into `app/layout.js`, that loads the standard Meta Pixel script
  using this ID. It's fake, so no real ad platform receives this data
  yet. Replace with a real Pixel ID from Meta Ads Manager, and set up a
  matching Google Ads remarketing tag if you want both channels.

## 🟢 Content decisions, not risky if left alone briefly

### 8. Wizard file uploads — no durable storage yet
- **Files**: `components/WizardFileUpload.js`, `app/api/lead/route.js`.
- The Smart Consultation Wizard's "Upload files" step reads attachments
  client-side into base64 (capped at 8MB combined) and includes them in
  the lead payload, so the feature works end-to-end today — but there's
  no S3/Cloudinary/etc. behind it. `app/api/lead/route.js` strips the
  base64 out of what it logs (so a few PDFs don't flood the console) but
  still receives the full data. Same category as the lead-notification
  email above: wire up real storage before launch, or files submitted
  through the wizard go nowhere durable.

### 9. Tagline
- **File**: `data/config.js` → `tagline: "Build It. Staff It. Ship It."`.
- This was Document 1's top recommendation among 5 options, used as the
  homepage H1. Confirm it, or swap in one of the other 4 (see
  Document 1, "Tagline Options").

### 10. Response-time commitment
- **File**: `data/config.js` → `responseTimeCommitment: "within 24 hours on business days"`.
- Shown on the Contact page. Confirm this is a promise your team can
  actually keep operationally.

### 11. Careers page listings
- **File**: `app/careers/page.js` → `FAKE_OPENINGS` array (Mid-Level
  Unity Developer, 3D Artist/Animator, QA Tester).
- The original gamenock.com's real careers content wasn't available to
  bring into this rebuild. These 3 listings are invented examples, with
  a visible on-page notice saying so. Replace with GameNock's real
  current openings, or delete the array and revert to a simple "no open
  roles right now" message.

## ⚪ Still genuinely open — not fake, just unresolved

These weren't touched in this pass because filling them with fake data
wouldn't mean anything — they need real-world action, not a code change:

- **CMS migration** (Document 10's Option A, Sanity) — still git-based
  data files.
- **Real screenshots, gameplay clips, or a professional logo** —
  `app/icon.js` / `app/opengraph-image.js` still generate a simple "GN"
  monogram, not real brand assets.
- **Off-page SEO** (Document 9, Section 4) — Google Business Profile,
  Clutch/GoodFirms/DesignRush directory listings — these require you to
  create real accounts; there's nothing to fake in code.
- **Testing & QA / Launch checklist** (Document 10, Sections 11–12) —
  cross-browser testing, an accessibility/Lighthouse audit, DNS
  cutover, 301 redirects, Search Console submission — all require a real
  deployment, which hasn't happened.
- **`npm run build`** — `npm install` and `npm run dev` have since been run
  successfully in a real environment, but a production build (`npm run
  build`) hasn't been verified yet. Run it before deploying.

## How to search for all of this yourself

Every fake value in the code is commented with the word `FAKE`. Search
the project for that exact word and you'll find every one of them,
cross-referenced against this file.
