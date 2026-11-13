// Cloudflare Pages Function: handles the contact form at /api/contact
// and emails each enquiry to you via Resend (resend.com, free tier).
//
// Set these in Cloudflare → your project → Settings → Variables and secrets:
//   RESEND_API_KEY  your Resend API key (add as a secret)
//   CONTACT_TO      where enquiries should land, e.g. your Google Workspace address
//   CONTACT_FROM    a sender on your verified domain, e.g. website@editorinresidence.com.au

export async function onRequestPost({ request, env }) {
  const back = (ok) => Response.redirect(new URL(`/contact/?sent=${ok ? 1 : 0}`, request.url), 303);

  const form = await request.formData();
  // Honeypot: bots fill the hidden "website" field
  if (form.get('website')) return back(true);

  const get = (k) => String(form.get(k) || '').trim().slice(0, 5000);
  const name = get('name');
  const email = get('email');
  const message = get('message');
  if (!name || !email.includes('@') || !message) return back(false);

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Agency or brand: ${get('company') || '-'}`,
    `Service: ${get('service')}`,
    '',
    message,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Editor in Residence website <${env.CONTACT_FROM}>`,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text,
    }),
  });

  return back(res.ok);
}
