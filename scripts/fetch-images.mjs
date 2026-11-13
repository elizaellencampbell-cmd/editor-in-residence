// Downloads each article's remote lead image into public/images/articles/
// and points articles.json at the local copy. Run on your Mac: node scripts/fetch-images.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const file = new URL('../src/data/articles.json', import.meta.url);
const dir = new URL('../public/images/articles/', import.meta.url);
await mkdir(dir, { recursive: true });
const articles = JSON.parse(await readFile(file, 'utf8'));
const slug = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

for (const a of articles) {
  if (!a.image || !a.image.startsWith('http')) continue;
  try {
    const res = await fetch(a.image, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const name = `${slug(a.title)}.jpg`;
    await writeFile(new URL(name, dir), Buffer.from(await res.arrayBuffer()));
    a.image = `/images/articles/${name}`;
    console.log('saved', name);
  } catch (e) {
    console.log('skipped', a.title, '-', e.message);
  }
}
await writeFile(file, JSON.stringify(articles, null, 2) + '\n');
