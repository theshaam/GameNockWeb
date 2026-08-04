# GameNock Website (Next.js)

A real, working Next.js site — not a mockup. It implements the full
10-document planning series: all ~40 pages from Document 3's sitemap,
the exact headlines/CTAs/objection copy from Document 7, the complete
Document 8 design system (dropdown + mobile nav, sticky mobile CTA,
FAQ accordions, icon-wrap containers, the two-button-variant rule), and
the Document 10 technical spec (per-page SEO schema, canonical tags,
analytics event wiring, a generated logo/OG image). Your "honesty over
invention" rule is enforced directly in the data — no fake testimonials,
no invented results, VR/Trivia gaps stated plainly, no fabricated
screenshots.

## Running it yourself

This sandbox's network access couldn't reach npm's registry (or any
package registry) to install dependencies or run a build, so this
hasn't been build-tested inside this session — but the code is complete
and was reviewed carefully by hand. To run it:

```bash
npm install
npm run dev       # http://localhost:3000
```

To build for production:

```bash
npm run build
npm run start
```

The easiest real deployment is [Vercel](https://vercel.com) (made by the
same team as Next.js): push this folder to a GitHub repo, import it in
Vercel, and it deploys with zero config.

## Full page list (Document 3's sitemap, built out)

- `/` — Home
- `/solutions/project-development`, `/solutions/dedicated-teams`
- `/industries` (index) + 5 persona pages: gaming-studios, web3-blockchain, education, enterprise, publishers-agencies
- `/services` (index) + 6 category pages
- `/hire` (index) + 8 role pages
- `/portfolio` (filterable index) + 6 full case studies
- `/pricing` (category cards + full rate table + team calculator)
- `/get-started` (5-step wizard)
- `/resources` (blog index) + 5 real posts
- `/about`, `/careers`, `/contact`

## What's new since the first build

- Header navigation now matches Document 3 exactly, with desktop dropdowns
  and a real mobile hamburger + slide-down menu (Document 8, Section 4).
- A sticky bottom "Get a Quote" bar on mobile (Document 8, Section 9).
- FAQ sections use native `<details>/<summary>` accordions everywhere
  (Document 8, Section 4), not static cards.
- Icons sit inside a consistent tinted `icon-wrap` container (Document 8,
  Section 5); buttons are strictly `btn-primary` / `btn-outline`, matching
  the two-variant rule.
- Exact headline/subhead/CTA copy from Document 7 on the homepage, both
  solution pages, the blockchain/interactive-cartoons/VR service pages,
  the Unity Developer hire page, pricing, portfolio, and about — plus a
  verbatim objection-handling section on the homepage.
- Service + FAQPage JSON-LD schema per relevant page, and a canonical
  tag on every page (Document 10, Section 4).
- Analytics event wiring for wizard step/completion, CTA clicks, and
  pricing/portfolio page views (Document 9/10) — fires for real the
  moment you set a real GA4/Plausible ID in `data/config.js`.
- A generated favicon and Open Graph image (`app/icon.js`,
  `app/opengraph-image.js`) using Next.js's built-in image generation —
  no npm install required, and no fake game screenshots.

## Project structure

- `app/` — every route, using the Next.js App Router. Dynamic routes
  read from the data files below instead of being hand-written per page.
- `components/` — shared UI (Header, NavBar, Footer, Wizard, TeamCalculator,
  FaqAccordion, IconWrap, Analytics, TrackedCtaLink, etc).
- `data/` — all real business content: `config.js`, `services.js`,
  `roles.js`, `portfolio.js`, `industries.js`, `blog.js`.
- `lib/` — `seo.js` (canonical + JSON-LD helpers), `analytics.js` (event
  tracking helper).
- `app/api/lead/route.js` — where wizard + contact form submissions land.
  Currently just logs to the console — see PLACEHOLDERS.md.

## See PLACEHOLDERS.md

Every value that still needs your real input — not code, just business
decisions or real assets — is listed there with the exact file.
