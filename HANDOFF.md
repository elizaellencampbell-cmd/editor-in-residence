# Handoff: portfolio, first iteration

**Goal:** get a working portfolio live quickly, with the Writing grid styled after the Featured section on genevievephelan.com.au, in Editor in Residence colours. Strategy and Services can wait for v2.

**Repo:** this folder. Astro 7, static output, deploys to Cloudflare Pages (`npm run build` → `dist`). Article data is in `src/data/articles.json`, and site details are in `src/site.config.js`.

---

## How Gen's Featured section works

I measured this on her live site in a 1280px-wide browser on 13 Nov 2026. It's a Cargo site.

**Page background**
- Her colours are a cobalt field (`#1A37E2`) and cream (`#F0E6D8`).
- The top of the screen is always cobalt, fading to cream about a third of the way down. The fade stays put while the tiles scroll over it.
- The section heading "Featured." is centred, in Freight Big (a high-contrast display serif), weight 400, in cream on the cobalt.

**Grid**
- Three columns, each about 366px wide at 1280px, which is roughly 28.6vw.
- About 26px between columns and about 65px side margins.
- It's a masonry layout: each column stacks independently with mixed tile heights. The columns start at different heights, with the third about 250px lower than the first two.
- Tiles come in four sizes, all 366px wide: portrait 524px tall (about 7:10), landscape 292px (about 5:4), tall 631px and short 198px.
- Tiles fade in as you scroll to them.

**Each tile is a two-card slideshow**
- Card 1 is the lead photo, cropped to the tile.
- Card 2 is a text card: a flat greige background (about `#DCD3C6`, estimated by eye), a small "Editorial" label in a cobalt sans, and the headline centred below it in Freight Big, cobalt, title case, three to four lines.
- The tile switches between the two cards on its own every 1.9 seconds, with an instant cut rather than a fade.
- The outlet tab is a cobalt rectangle with the outlet name ("VOGUE", "T MAGAZINE", "MECCA") in white, uppercase Helvetica Neue. It sits centred on the tile's top edge, partly hanging above it.
- On her site the tab and the text card are baked into PNG images. **Don't copy that.** Build both in HTML so they're editable, crisp and readable by screen readers and search engines.
- Only 3 of her 10 tiles link anywhere. **Ours should all link** to the original article.

**Everything else on her page**
- The menu is fixed to the bottom of the screen: Editorial · Publicity · Events · Copywriting · Testimonials, spaced evenly across, plus email and Instagram icons. It uses Helvetica Neue, in cream on cobalt.
- The About section is a single centred serif paragraph. It ends on "Email me. Let's do the thing." with her email address.
- There are no buttons, card borders or shadows, and no stats.

---

## How to adapt it for Editor in Residence

| Gen | EiR |
|---|---|
| Cobalt `#1A37E2` | Lagoon teal `--field: #0b6f7a`, deep navy `#06182a` at night |
| Cream `#F0E6D8` | `--bg: #f4ede1` |
| Greige text card | Cream card with a soft glow in the article's vertical colour (`verticals` in `site.config.js`) |
| Freight Big (paid, Adobe) | Bodoni Moda 400 for headlines; the wordmark stays Bodoni Moda 700 with the big two-tone dot on the i |
| Helvetica Neue tab and nav | Nunito, uppercase, letter-spacing 0.16em, small |
| Plain fade from cobalt to cream | Same fade, plus the drifting aura glows (`Aura.astro`) in the field |
| "Editorial" label | The article's `section` (Feature / Interview / Column / Guide) |

**Text card contents, top to bottom:** the outlet tab, the section label, the headline, then the pull quote in Bodoni italic, with `quoteBy` under it in small caps. That quote is the only real difference from Gen's version, since showing it was in your brief.

**Switching between cards:** alternate photo → text card about every 3 seconds (1.9s feels frantic). Use a 300ms crossfade, pause on hover, and stagger each tile's start time so they don't all flip together. Under `prefers-reduced-motion`, show the text card only.

**Tile sizes:** add an optional `"shape": "portrait" | "landscape" | "tall" | "short"` field to each article in `articles.json`. Default to portrait, and vary them by hand so the grid feels art-directed.

**Responsive layout:** three columns above 900px, two columns from 560 to 900px, and one column below that. On mobile, keep the cards switching but make tiles full width.

---

## Build checklist for v1

1. Replace `ArticleCard.astro` with a `Tile.astro`: a photo card and a text card stacked in one link, an outlet tab, and a CSS/JS swap.
2. Change `.tiles` in `global.css` to CSS multi-column masonry (`columns: 3; column-gap: 26px`, with `break-inside: avoid` on each tile). Push the third column down with a spacer, or simply add `margin-top` to the first tile.
3. Fix the page background: a cobalt-style field at the top, fading to cream. The current hero and `fade-out` already do most of this.
4. Make the homepage the hero plus "Featured." plus the grid, then one About paragraph and the email line. Drop the services index for v1.
5. Add real images. The CP and Time Out image URLs in `articles.json` load on the live site but were blocked in the build environment. For reliability, download them into `public/images/` and point `image` at `/images/...`.
6. Check day and night at 1280px and 390px, and with reduced motion on.

## Still open

- Confirm the dot-on-i treatment (currently on all three i's) and the public email (`hello@editorinresidence.com.au` is a placeholder).
- Find the missing pieces: WitchTok, free tram zone and anything from Halliday.
- Decide whether $150/hr is shown publicly.
