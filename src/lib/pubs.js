// Publication names: always italic, always linked to the outlet, never split across lines.
export const PUB_LINKS = {
  'Halliday Wine Companion': 'https://www.winecompanion.com.au',
  'Time Out Melbourne': 'https://www.timeout.com/melbourne',
  'Concrete Playground': 'https://concreteplayground.com',
  'Broadsheet': 'https://www.broadsheet.com.au',
};
const re = new RegExp('(?:<i>)?(' + Object.keys(PUB_LINKS).join('|') + ')(?:</i>)?', 'g');
// Wraps every bare mention in an italic link. Text already inside an <a>…</a> is left alone.
export const linkPubs = (html = '') =>
  html.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/).map((part) =>
    part.startsWith('<a') ? part : part.replace(re, (_, name) =>
      `<a class="pub" href="${PUB_LINKS[name]}" target="_blank" rel="noopener"><i>${name}</i></a>`)
  ).join('');
