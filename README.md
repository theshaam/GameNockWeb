# Game Nock website

Built with [Astro](https://astro.build): static pages, automatic image optimisation (AVIF/WebP at several sizes), zero framework JavaScript, one cached CSS file and one cached script.

## Run it
```bash
npm install          # once
npm run dev          # local preview at http://localhost:4321
npm run build        # production build into dist/
```

## Deploy (free)
Cloudflare Pages, Netlify or Vercel: connect this GitHub repo, build command `npm run build`, output folder `dist`. Every push redeploys automatically.
Set the real domain in `astro.config.mjs` (`site:`) so canonical links and the sitemap are correct.

## Where things live
| What | File |
|---|---|
| Home page | `src/pages/index.astro` |
| Menu / footer / contact section | `src/components/Header.astro`, `Footer.astro`, `Contact.astro` |
| Shared page shell, SEO tags | `src/layouts/Layout.astro` |
| Styles | `src/styles/global.css` |
| Animations, sky, carousels, forms, section scrolling | `public/js/site.js` |
| Services pages | `src/pages/services/*.astro`, card list in `src/data/services.json` |
| **Case studies** | `src/content/work/*.md` — copy one file to add a new case study |
| **Articles** | `src/content/insights/*.md` — copy one file to add a new article |
| **Testimonials** | `TESTIMONIALS` list near the top of the testimonials block in `public/js/site.js` |
| Images (auto-optimised) | `src/assets/img/` |
| Images loaded by scripts (sun, moon, clouds, logo) | `public/img/` |

## Still to do before launch
- Founder photo, Blast Wheels platforms
- Legal review of Privacy and Terms
- Optional: a form service (e.g. Formspree) so enquiries arrive without the email/WhatsApp step
