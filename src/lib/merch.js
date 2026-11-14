// Merchandising: the Featured list and one list per category (src/content/merch.json,
// edited in the site editor or filled from the Merch EiR Notion board).
// Picks are matched to articles.json by link; any field set on a pick overrides the
// article's own (wide: true = the Notion "Full width" tag; hidden: true = Live unticked everywhere, so it's left off the site). A pick whose link isn't in articles.json becomes a new tile.
import articles from '../data/articles.json';
import merch from '../content/merch.json';
import { categories } from '../site.config.js';

const norm = (u = '') => u.trim().replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/+$/, '').toLowerCase();
const clean = (o) => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => v !== '' && v != null));

export function buildTiles() {
  const byUrl = new Map();
  const list = articles.map((a, i) => ({ ...a, _i: i }));
  list.forEach((a) => byUrl.set(norm(a.url), a));

  const lists = { featured: merch.featured || [] };
  categories.forEach((c) => (lists[c] = merch[c.toLowerCase()] || []));

  for (const [key, picks] of Object.entries(lists)) {
    picks.forEach((p, idx) => {
      if (!p || !p.url) return;
      let a = byUrl.get(norm(p.url));
      if (!a) {
        if (!p.title) return; // a new link needs at least a headline
        a = { title: p.title, url: p.url, outlet: p.outlet || '', date: '', _i: list.length,
              category: key === 'featured' ? p.category || '' : key };
        list.push(a);
        byUrl.set(norm(p.url), a);
      }
      const { url, ...over } = clean(p);
      Object.assign(a, over);
      if (key === 'featured') a.rankAll = idx;
      else a.rankCat = idx;
    });
  }

  // Featured picks first (in order), then everything else newest first.
  return list.filter((a) => !a.hidden).sort((a, b) =>
    (a.rankAll ?? 1e6) - (b.rankAll ?? 1e6) || (b.date || '').localeCompare(a.date || '') || a._i - b._i);
}
