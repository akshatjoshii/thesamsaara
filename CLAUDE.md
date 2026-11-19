# Project: The Samsaara Club & Resort (thesamsaara.com)

Fast static resort website built with Astro v5 (SSG) and Tailwind CSS v4, managed via Pages CMS (`.pages.yml`).

## Essential Commands
- `npm run dev` — Local development server (http://localhost:4321)
- `npm run build` — Build static output to `/dist` (Note: set `ASTRO_TELEMETRY_DISABLED=1` if building in restricted environments)
- `npm run preview` — Serve built `/dist` locally

## Tech Stack & Architecture
- **Framework**: Astro 5 (Static Site Generation), Node 18.20+ / 20+
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` (configured in `src/styles/global.css`, NO `tailwind.config.js`)
- **Typography**: `@fontsource-variable/fraunces` (serif) & `@fontsource-variable/inter` (sans)
- **CMS**: Pages CMS (admin interface configuration in `.pages.yml`)
- **Blog**: Astro Content Collections (`src/content/blog/*.md` via `src/content.config.ts`)
- **SEO/Analytics**: Canonical URLs, Google Analytics 4, JSON-LD Schema (`src/lib/schema.ts`, `src/layouts/Base.astro`)
- **Forms**: Web3Forms integration in `src/components/EnquiryForm.astro`

## Code & Content Separation Rules (CRITICAL)
- **Never hardcode copy, prices, or contact info in `.astro` templates:**
  - Page banners (photo, alt, eyebrow, heading, sub-heading, "representative" flag), in-page photos and SEO title/description/share image belong in `src/data/pages/<page-name>.json` (editable via Pages CMS).
  - Known gap: long body paragraphs and some section headings are still written in the `.astro` pages. When you change one, prefer moving it into that page's JSON (and its `.pages.yml` form).
  - Global resort settings, pricing, contact numbers belong in `src/data/site.json`.
  - Stays/cottages: `src/data/stay.json`. FAQs: `src/data/faqs.json`. Reviews: `src/data/reviews.json`.
  - Food menu: `src/data/menu.json`. Experiences: `src/data/experiences.json`. Gallery: `src/data/gallery.json`.
- **Dynamic Price Replacement**:
  - Always use `fill(text)` from `src/lib/content.ts` when rendering copy that might contain the `{price}` placeholder (dynamically inserts `₹{startingPrice}`).
- **WhatsApp Links**:
  - Use `waLink(customMessage)` from `src/lib/links.ts`. Every page defines its own contextual `waMessage`.
  - Mobile bottom sticky CTA: `src/components/StickyBar.astro`.
- **Images (every image must stay editable in the CMS)**:
  - Never put an image path directly in a template. Every image comes from a data file field with an `alt` beside it, and that field must exist in `.pages.yml`.
  - Logos, favicon, iPhone icon and default share image: `site.json` → `branding`.
  - Images reside in `public/images/` (CMS uploads land there). Refer to them with absolute web paths (e.g., `/images/hero.jpg`). Uploads are NOT resized automatically; keep files ~1600–1920 px wide and under ~300 KB.
  - Fallback share image: `shareImage(img)` from `src/lib/content.ts`. Blog posts without `image` fall back to `site.branding.shareImage`.
  - Photo strips (camping, wedding, café) are lists: templates must handle any number of items, including zero.

## Tailwind v4 Theme Tokens & Utility Classes
Defined in `src/styles/global.css`:
- **Colors**: `teal` (`#1F5E63`), `teal-dark` (`#17484c`), `sand` (`#EDE3D1`), `sand-light` (`#F6F0E5`), `forest` (`#2E4A3A`), `amber` (`#E08A3C`), `amber-dark` (`#B8641C`), `charcoal` (`#1C1C1C`), `whatsapp` (`#1DA851`)
- **Component Classes**:
  - Layout: `.container-x` (max-w-6xl px-5 sm:px-8), `.section` (py-16 sm:py-24)
  - Typography: `.eyebrow` (uppercase tracking-widest text-amber-dark), `.lead` (text-lg sm:text-xl)
  - Buttons: `.btn` combined with `.btn-wa`, `.btn-amber`, `.btn-outline`, or `.btn-light`
  - Cards & Badges: `.card` (rounded-3xl bg-white shadow-sm ring-1 ring-black/5), `.chip` (rounded-full bg-sand px-3 py-1 text-forest)
  - Content: `.prose-s` for styled markdown/article typography
- **Icons**:
  - Use `<Icon name="..." />` (`src/components/Icon.astro`). Supported names: `whatsapp`, `phone`, `mail`, `instagram`, `map`, `pin`, `check`, `arrow`, `menu`, `close`, `star`.

## Pages CMS (`.pages.yml`)
- Admin: https://app.pagescms.org (GitHub sign-in, repo `akshatjoshii/thesamsaara`, branch `main`). Every save is a commit to `main`, which redeploys the site.
- The JSON files and `.pages.yml` must stay in sync: when you add, rename or remove a field in a data file, update its form too (and vice versa). A field missing from the form can't be edited; a form field missing from the JSON shows empty.
- YAML gotcha: quote labels that contain commas, `{`, `}` or start with a quote, e.g. `label: 'Banner photo (landscape, ~1920 px wide)'`. Otherwise the whole admin panel fails to load.
- After editing `.pages.yml`, check it parses (e.g. with a YAML parser) before pushing.

## Hosting & deployment
- GitHub: `akshatjoshii/thesamsaara` (public). Cloudflare Pages project `thesamsaara` builds every push to `main` (`npm run build` → `dist`). Preview URL: https://thesamsaara.pages.dev
- Domain: `thesamsaara.com` (registered at GoDaddy, DNS on Cloudflare). `www.thesamsaara.com` 301-redirects to the root via a Cloudflare Redirect Rule (path and query string preserved). Netlify is no longer used.
- Pages CMS commits to `main` too, so always `git pull --rebase` before committing locally; `push-changes.bat` does pull → commit → push.
- Commits on this PC must be authored as Akshat Joshi: the repo-local `git config user.name/user.email` is set (GitHub noreply address). Don't rely on the PC's global Git identity, which belongs to someone else.

## Forms & analytics
- Web3Forms access key and GA4 ID live in `site.json` → `integrations` (`web3formsKey`, `ga4Id`) (the Web3Forms key is public by design; it appears in the page HTML).
