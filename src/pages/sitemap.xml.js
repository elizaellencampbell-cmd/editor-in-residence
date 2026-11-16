// The sitemap: a list of every page for search engines, at /sitemap.xml.
// Add a line here when a new page goes on the site.
const pages = [
  { path: '/', priority: '1.0' },
  { path: '/writing/', priority: '0.9' },
  { path: '/work-with-me/', priority: '0.9' },
  { path: '/about/', priority: '0.8' },
  { path: '/artist-in-residence/', priority: '0.7' },
  { path: '/dj-in-residence/', priority: '0.5' },
];

export function GET({ site }) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p.path, site).href}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
