import { defineConfig, type Template, type TinaField } from 'tinacms';

// Site editor for Editor in Residence (TinaCMS, free plan).
// Edit at https://www.editorinresidence.com.au/admin – every save is a commit to GitHub,
// and Cloudflare Pages rebuilds the site from it in a minute or two.

const paragraphs: TinaField = {
  type: 'string', name: 'paragraphs', label: 'Paragraphs', list: true,
  ui: { component: 'textarea' },
  description: 'One box per paragraph. *Asterisks* make italics; [link text](https://…) makes a link.',
};

const sectionTemplates: Template[] = [
  {
    name: 'hero', label: 'Top of page + Featured grid',
    ui: { defaultItem: { featuredHeading: 'Featured.' } },
    fields: [
      { type: 'string', name: 'signoff', label: 'Sign-off label' },
      { type: 'string', name: 'byline', label: 'Byline' },
      { type: 'string', name: 'credentials', label: 'Line under byline (italics)' },
      { type: 'string', name: 'featuredHeading', label: 'Grid heading' },
    ],
  },
  {
    name: 'about', label: 'About (headshot + bio)',
    fields: [
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'role', label: 'Role line' },
      paragraphs,
      { type: 'string', name: 'emailPrompt', label: 'Line above the email address' },
      { type: 'image', name: 'photo', label: 'Photo (optional, replaces the headshot)' },
    ],
  },
  {
    name: 'text', label: 'Text section',
    fields: [
      { type: 'string', name: 'label', label: 'Small label above (optional)' },
      { type: 'string', name: 'heading', label: 'Heading' },
      paragraphs,
      { type: 'string', name: 'buttonText', label: 'Button text (optional)' },
      { type: 'string', name: 'buttonLink', label: 'Button link (optional)' },
      { type: 'string', name: 'anchor', label: 'Link name, e.g. services makes /#services (optional)' },
    ],
  },
  {
    name: 'quote', label: 'Big quote',
    fields: [
      { type: 'string', name: 'quote', label: 'Quote', ui: { component: 'textarea' } },
      { type: 'string', name: 'by', label: 'Who said it (optional)' },
    ],
  },
];

const categoryOptions = ['Travel', 'Food', 'Lifestyle', 'Interviews'];
const pickFields = (withCategory: boolean): TinaField[] => [
  { type: 'string', name: 'url', label: 'Article link', required: true,
    description: 'Paste the article URL. If it is already on the site, everything else is optional.' },
  { type: 'string', name: 'title', label: 'Headline (optional override; required for a new link)' },
  { type: 'string', name: 'outlet', label: 'Publication (optional)' },
  { type: 'image', name: 'image', label: 'Image (optional, replaces the publisher photo)' },
  { type: 'string', name: 'quote', label: 'Pull quote (optional)', ui: { component: 'textarea' } },
  { type: 'string', name: 'quoteBy', label: 'Quote by (optional)' },
  { type: 'string', name: 'label', label: 'Card label (optional)', options: ['Feature', 'Interview', 'Column', 'Guide', 'Review', 'News', 'Partnership'] },
  { type: 'boolean', name: 'wide', label: 'Full width', description: 'Show this story wide across the page (the "Full width" tag on the Merch EiR board).' },
  ...(withCategory ? [{ type: 'string', name: 'category', label: 'Category (for a new link)', options: categoryOptions } as TinaField] : []),
];
const pickList = (name: string, label: string, withCategory = false): TinaField => ({
  type: 'object', name, label, list: true,
  ui: { itemProps: (item: any) => ({ label: item?.title || item?.url || 'New pick' }) },
  fields: pickFields(withCategory),
});

const single = { allowedActions: { create: false, delete: false } };

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.CF_PAGES_BRANCH || 'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images/uploads', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'home', label: 'Home page', path: 'src/content', format: 'json',
        match: { include: 'home' }, ui: single,
        fields: [{ type: 'object', name: 'sections', label: 'Sections (drag to reorder, + to add)', list: true, templates: sectionTemplates }],
      },
      {
        name: 'merch', label: 'Featured + category picks', path: 'src/content', format: 'json',
        match: { include: 'merch' }, ui: single,
        fields: [
          pickList('featured', 'Featured (top of the home page, in this order)', true),
          pickList('travel', 'Travel picks (first under Travel)'),
          pickList('food', 'Food picks (first under Food)'),
          pickList('lifestyle', 'Lifestyle picks (first under Lifestyle)'),
          pickList('interviews', 'Interviews picks (first under Interviews)'),
        ],
      },
      {
        name: 'settings', label: 'Contact details + sign-off', path: 'src/content', format: 'json',
        match: { include: 'settings' }, ui: single,
        fields: [
          { type: 'string', name: 'email', label: 'Email' },
          { type: 'string', name: 'instagram', label: 'Instagram link' },
          { type: 'string', name: 'instagramHandle', label: 'Instagram handle' },
          { type: 'string', name: 'linkedin', label: 'LinkedIn link' },
          { type: 'string', name: 'signoff', label: 'Footer sign-off lines', list: true },
        ],
      },
    ],
  },
});
