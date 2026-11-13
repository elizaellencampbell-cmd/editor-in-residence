// Edit site-wide details here. Email, Instagram, LinkedIn and the sign-off
// can also be edited in the site editor (src/content/settings.json), which wins.
import settings from './content/settings.json';

const defaults = {
  name: 'Editor in Residence',
  byline: 'by Eliza Campbell',
  tagline: 'Editor by trade, resident by invitation',
  // The main sign-off line (from the hazy handoff kit), one label per line
  signoff: ['From the desk of a professional party girl.', 'By Eliza Campbell.'],
  signature: 'From the desk of a professional party girl.',
  instagram: 'https://www.instagram.com/lizacampbell/',
  instagramHandle: '@lizacampbell',
  // Hero colourway: cobalt, hotpink, navy, violet, peacock, emerald or sky
  heroColourway: 'hotpink',
  // From the hazy kit's business card
  email: 'eliza@editorinresidence.com.au',
  linkedin: 'https://www.linkedin.com/in/elizaellencampbell',
  hourlyRate: '$150',
};

export const site = { ...defaults, ...Object.fromEntries(Object.entries(settings).filter(([, v]) => v && (!Array.isArray(v) || v.length))) };

// Colour for each vertical (used on article cards and filters)
export const verticals = {
  'Food & Drink': 'var(--coral)',
  'Bars & Wine': 'var(--pink)',
  'Travel': 'var(--aqua)',
  'Arts & Music': 'var(--sun)',
  'Design & Fashion': 'var(--seagreen)',
  'Health & Wellness': 'var(--sky)',
};

// Portfolio categories: the filter buttons and bottom menu, in this order
export const categories = ['Travel', 'Food', 'Lifestyle', 'Interviews'];

// Colourway for each portfolio category (tiles' text cards, tabs and filter dots)
export const categoryColourways = {
  Travel: 'peacock',
  Food: 'hotpink',
  Lifestyle: 'violet',
  Interviews: 'sky',
};

export const sections = ['Features & Interviews', 'Guides & Reviews', 'Columns'];
