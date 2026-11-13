# Editor in Residence website

Astro site, hosted free on Cloudflare Pages.

## Editing the site (TinaCMS)
Go to https://www.editorinresidence.com.au/admin and log in with your TinaCloud account. Every save is a commit to this GitHub repo, and Cloudflare Pages republishes the site in a minute or two.

- **Home page:** the page's sections. Drag to reorder, + to add a Text section or a Big quote. In paragraphs, *asterisks* make italics and [text](https://link) makes a link.
- **Featured + category picks:** paste article links. Featured picks show first on the home page, in order; each category's picks show first under that filter. A link already on the site needs nothing else; you can override its headline, quote or photo. A new link needs a headline. These lists are what Claude fills from the Merch EiR Notion board.
- **Contact details + sign-off:** email, Instagram, LinkedIn and the footer labels.

Files: `src/content/home.json`, `src/content/merch.json`, `src/content/settings.json`. The full byline list is still `src/data/articles.json`.

Cloudflare Pages build command: `npm run build:cms` (needs the `TINA_CLIENT_ID` and `TINA_TOKEN` environment variables). `npm run build` builds the site without the editor.

## v1 (portfolio only)
The homepage is the hero, a "Featured." masonry grid of two-card tiles (photo, then a text card with the outlet, headline and pull quote), then a short About and the email line. Visitors can filter by Travel, Food, Lifestyle and Interviews, and the bottom menu links to each one (`/#travel`, `/#food` and so on). The About page has the experience list.

Strategy, Services, Writing and Contact are parked in `v2-drafts/` and are not built. Move a file back into `src/pages/` to bring it back.

**Look:** the hazy handoff kit, hot pink and navy colourway (`heroColourway` in `src/site.config.js`). Each portfolio category has its own kit colourway (`categoryColourways`). The dot on the i of "in" flashes through the kit colourways, rebuilt in CSS from `eir-signature-dot.gif`.

**About:** the headshot sits next to the bio. Two low-resolution candid crops from the talent deck are kept in `v2-drafts/images/` in case you want a collage later.

**Images:** publisher image URLs load on the live site. To keep your own copies (recommended), run `node scripts/fetch-images.mjs` once on your Mac. Articles without an image show the text card only, so you can add your own photos to `public/images/` and set `image` to `/images/your-photo.jpg`.

## Add an article
Open `src/data/articles.json` and copy an existing entry. Fields:

- `title`, `outlet`, `url`, `date` (YYYY-MM-DD)
- `image`: the article's lead image URL (or a file you put in `public/images/`, written as `/images/name.jpg`)
- `quote`: one pull quote; `quoteBy`: who said it (leave out if it's your line)
- `section`: `Features & Interviews`, `Guides & Reviews` or `Columns`
- `vertical`: `Food & Drink`, `Bars & Wine`, `Travel`, `Arts & Music`, `Design & Fashion` or `Health & Wellness`
- The grid shows every article newest first (by `date`), 36 at a time with a "Show more" button. Dates marked as estimated in the build notes were inferred from the byline order.
- `category`: `Travel`, `Food`, `Lifestyle` or `Interviews` (the homepage filters)
- `label`: the small label on the text card (Feature, Interview, Column, Guide, Review, News, Partnership)
- `shape`: `portrait` (default), `landscape`, `tall` or `short` – the tile's proportions
- `label`: optional, overrides the small label on the text card (Feature, Interview, Column, Guide, Review)

## Change site details
`src/site.config.js` holds the name, tagline, email, hourly rate and vertical colours.

## Run it on your Mac
Install Node.js (nodejs.org), then in this folder: `npm install` then `npm run dev`, and open http://localhost:4321

## Go live (free)
1. Create a GitHub account and a new repository, then upload this folder (not `node_modules` or `dist`).
2. Create a Cloudflare account → Workers & Pages → Create → Pages → Connect to Git → pick the repository.
3. Build settings: framework preset **Astro**, build command `npm run build`, output folder `dist`.
4. Custom domains → add both `editorinresidence.com.au` and `www.editorinresidence.com.au`. Cloudflare shows the DNS records to add wherever the domain's DNS is managed (VentraIP). Leave your Google Workspace MX records as they are so your email keeps working. Then add a redirect so one version (say `www`) sends to the other.

## Contact form
Enquiries are sent by `functions/api/contact.js` through Resend (free tier).
1. Sign up at resend.com and verify `editorinresidence.com.au` (add the DNS records it gives you at VentraIP).
2. Create an API key.
3. In Cloudflare → your project → Settings → Variables and secrets, add `RESEND_API_KEY` (secret), `CONTACT_TO` (your inbox) and `CONTACT_FROM` (e.g. `website@editorinresidence.com.au`).
