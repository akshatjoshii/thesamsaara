# The Samsaara Club & Resort — website

Fast static website for **thesamsaara.com**, built with Astro + Tailwind CSS, editable through Pages CMS, hosted free on Cloudflare Pages.

## Run it on your computer

Needs Node.js 18.20+ (20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs the static site to /dist
npm run preview    # serve the built site locally
```

## Before going live — fill these in

| What | Where |
|---|---|
| Web3Forms access key (free at web3forms.com, use thesamsaaracafe@gmail.com) | `src/data/site.json` → `integrations.web3formsKey` |
| Google Analytics 4 ID (G-XXXXXXX) | `src/data/site.json` → `integrations.ga4Id` |
| Real photos | Admin panel → the relevant **Page:** form, Gallery, Cottages & camping or Experiences |
| Logos, favicon, default share image | Admin panel → Site settings & prices → **Logos, favicon & share image** |
| 4–6 real Google reviews | `src/data/reviews.json` |
| Google rating + review count (only if it matches Google) | `src/data/site.json` → `googleRating` |
| Verify map coordinates (decoded from plus code 594F+38P) and driving distances | `src/data/site.json` → `geo`, `distances` |
| Cottage tier details (Deluxe/Superior differences, counts) | `src/data/stay.json` |
| Confirm MAP meals (breakfast + dinner?) | `src/data/site.json` → `mealPlan`; FAQ text in `src/data/faqs.json` |

All placeholder photos say “PHOTO PLACEHOLDER”, so it's easy to spot any left over.

## Project layout

```
src/
  data/            ← all editable content (prices, FAQs, reviews, menu, gallery…)
  data/pages/      ← per-page banner, photos, headings and Google title/description
  content/blog/    ← travel guides (Markdown)
  pages/           ← one file per page (URL = file name)
  components/      ← header, footer, sticky WhatsApp bar, enquiry form, etc.
  layouts/Base.astro ← SEO tags, schema, analytics
  lib/             ← WhatsApp link builder, JSON-LD schema helpers
public/images/     ← photos
.pages.yml         ← Pages CMS admin panel config
```

## WhatsApp / call / form

- Every page has its own pre-filled WhatsApp message (`waMessage` on each page).
- Mobile: sticky bottom bar with Call + WhatsApp. Desktop: floating WhatsApp button.
- The enquiry form posts to Web3Forms → email. After sending, the visitor gets a button to send the same details on WhatsApp.
- GA4 events: `whatsapp_click`, `call_click`, `form_submit` — mark these as **key events** in GA4.

## Deploy (Cloudflare Pages, free)

1. Push this folder to a new GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset **Astro**; build command `npm run build`; output directory `dist`.
4. Custom domains → add `thesamsaara.com` and `www.thesamsaara.com`. **Moving from Netlify:** check the site works on its `*.pages.dev` address first, then remove the domain from the Netlify site and add it here; Cloudflare shows the DNS records to set. Keep the Netlify site until the domain is live on Cloudflare.
5. Redirect www → non-www: Rules → Redirect Rules → “Redirect from WWW to root” template.
6. Every edit pushed to GitHub (including from Pages CMS) redeploys automatically.

## Admin panel (Pages CMS)

1. Go to https://app.pagescms.org and sign in with GitHub.
2. Open the repo. Every image on the site is editable from here:

| Form | What it controls |
|---|---|
| Site settings & prices → Logos, favicon & share image | Header logo, footer logo, favicon, iPhone icon, default WhatsApp/Facebook preview image |
| Page: Home | Hero banner and text, Cottages/Camping cards, "Plan your occasion" cards, café photo |
| Page: Cottages, Camping, Wedding, Corporate, School trips, Birthday, Experiences, Café | Each page's top banner (photo, description, heading, sub-heading, "Representative image" label), extra photo strips on that page, and its Google title/description/share image |
| Cottages & camping | Photo, description, price and features of each cottage tier; camping price and features |
| Experiences | Photo and text of each experience (Home carousel + Experiences page) |
| Gallery | All gallery photos and their categories |
| Travel guides (blog) | Cover image and article (images can be added inside articles) |

3. Edit → Save. The site rebuilds in about a minute.

Tips:
- In titles and descriptions, `{price}` is replaced with the starting price from Site settings, so changing the price updates every page.
- Always fill in the photo description — Google reads it and it helps visually impaired visitors.
- Uploads go to `public/images/`. They are **not** resized automatically, so before uploading export photos as WebP or JPG, about 1600–1920 px wide and under ~300 KB (e.g. with squoosh.app). Phone photos straight from the camera will slow the site down.

## Launch checklist

- [ ] Web3Forms key + GA4 ID added; test the form and check the email arrives
- [ ] Real photos and logo in place
- [ ] Google Search Console + Bing Webmaster: verify domain, submit `https://thesamsaara.com/sitemap-index.xml`
- [ ] Lighthouse mobile ≥ 90; LCP < 2.5 s; CLS < 0.1
- [ ] Update the website link on Google Business Profile and Instagram bio
- [ ] Test WhatsApp links on a phone

## Photo credits

Most photos are The Samsaara's own (from the Google Drive folder), colour-corrected for the web.

These banner images are free stock photos from Unsplash (Unsplash License: free for commercial use, no attribution required). They are shown with a small "Representative image" label because they are not taken at The Samsaara. Replace them with your own photos when you have good ones.

| File | Used on | Unsplash image |
|---|---|---|
| banner-camping-campfire.webp | Camping banner, home + experiences cards | images.unsplash.com/photo-1681505541409-35a11c40d712 |
| banner-rafting-ganga.webp | Experiences banner, rafting guide | images.unsplash.com/photo-1603867106100-0d2039fc8757 |
| banner-team-rafting.webp | Corporate banner, rafting card | images.unsplash.com/photo-1596021688656-35fdc9ed0274 |
| banner-wedding-stage.webp | Wedding banner | images.unsplash.com/photo-1745573673416-66e829644ae9 |
| banner-ganga-valley.webp | School trips banner | images.unsplash.com/photo-1731761436804-2019dd38223b |
| camping-beach-sunset.webp | "Best time for camping" guide | images.unsplash.com/photo-1781427012162-8387c78f1dfb |
