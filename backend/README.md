# Game Nock backend

A small Node.js/Express app that gives the site:

- a **contact form that actually saves leads** (`POST /api/leads`) instead of discarding them,
- a **public JSON API** the Astro frontend reads from (`/api/testimonials`, `/api/work`, `/api/insights`),
- an **admin panel** at `/admin` to manage leads, testimonials, work/case studies and insights articles,
- a **MySQL database** it creates and manages itself (no separate migration tool needed).

It's a separate app from the Astro site — the Astro site stays on Netlify exactly as it is today; this runs
on your symbolhost cPanel hosting and the frontend calls it over the network.

## 1. Create the database (cPanel)

In cPanel, open **MySQL® Databases**:

1. Create a database, e.g. `yourcpaneluser_gamenock`.
2. Create a database user with a strong password.
3. Add that user to the database with **All Privileges**.

You don't need to run any SQL yourself — the app creates its tables automatically on first start.

## 2. Deploy the app (cPanel "Setup Node.js App")

1. Upload the entire `backend/` folder to your hosting (e.g. via the cPanel File Manager or FTP), for example to
   `~/gamenock-backend`.
2. In cPanel, open **Setup Node.js App** → **Create Application**:
   - Node version: 18 or newer.
   - Application root: the folder you uploaded to (e.g. `gamenock-backend`).
   - Application URL: the domain/subdomain you want the API on (see step 4).
   - Application startup file: `server.js`.
3. Copy `.env.example` to `.env` in that folder and fill in:
   - `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` from step 1 (host is almost always `localhost` on cPanel),
   - `SESSION_SECRET` — generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`,
   - `CORS_ORIGIN` — your live site's URL, e.g. `https://gamenock.com`.
4. In the Node.js App screen, click **Run NPM Install**.
5. Start (or restart) the app from the same screen.

## 3. Create your admin login

Using the "Run JS Script" / terminal button in the Node.js App screen (or SSH if you have it), run:

```bash
node scripts/create-admin.js youradminname a-strong-password
```

Then sign in at `https://<wherever-you-pointed-the-app>/admin/login`.

## 4. Point a URL at the app

The simplest, lowest-risk option is a **subdomain**, since the main `gamenock.com` domain currently points at
Netlify for the static site:

1. In cPanel, create a subdomain, e.g. `api.gamenock.com`.
2. Point the Node.js App's "Application URL" at that subdomain.
3. Set `CORS_ORIGIN=https://gamenock.com` in `.env` (and restart the app) so the browser is allowed to call it
   from the live site.

## 5. Point the frontend at it

In the Astro repo, open `public/js/site.js` and set `API_BASE` near the top to your API's URL, e.g.:

```js
const API_BASE = 'https://api.gamenock.com';
```

Redeploy the Astro site (push to `main`; Netlify rebuilds automatically). The contact form will now save to
the database, and the testimonials carousel will load from it too.

## What's editable from the admin panel

| Section | Where it shows on the site |
|---|---|
| **Leads** | Nowhere public — this is your inbox of contact-form submissions, with a status (new/contacted/archived). |
| **Testimonials** | The "Strong Partners. Brighter Worlds." carousel on the homepage. |
| **Work** | The database backing is ready and has its own API, and the homepage "Featured Work" carousel can be swapped to read from it — ask me when you're ready and I'll wire that swap in, the same way I did for testimonials. Until then, the case-study *pages* still come from the existing project files, so nothing on the live site changes yet. |
| **Insights** | Same as Work: the database + API are ready, the article *pages* still come from the existing project files until we wire the swap. |

Leads and testimonials are fully live end-to-end. Work and Insights have a complete database + admin CRUD +
public API ready to go, but I kept the actual case-study and article *pages* on the site pointed at their
existing source for now, since swapping those over means turning the Astro site's routing for those two
sections into fetch-driven pages — a bigger, separate change I didn't want to make silently. Say the word and
I'll do that migration next.

## Local development

```bash
cd backend
cp .env.example .env   # point DB_HOST etc. at a local MySQL, or a tunnel to the cPanel one
npm install
npm start
node scripts/create-admin.js admin devpassword123
```

Then open `http://localhost:4000/admin/login`.
