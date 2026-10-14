import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:3001';
const mode = process.argv[3] || 'production';
const pages = ['/', '/about', '/contact'];
const checks = [];
const check = (message, passed) => { assert.ok(passed, message); checks.push(message); };
for (const route of pages) {
  const response = await fetch(new URL(route, base));
  const html = await response.text();
  check(`${route}: responds 200`, response.status === 200);
  check(`${route}: OpenSilicon metadata`, /<title>[^<]*OpenSilicon[^<]*<\/title>/.test(html) && html.includes('property="og:description"'));
  check(`${route}: current public destinations, including Home through the logo`, pages.every(href => html.includes(`href="${href}"`)));
  check(`${route}: retired and hidden sections have no public links`, !/href="\/(our-approach|research)(?:[\/#"])/.test(html));
  // Frontier-lab names also appear in sourced editorial evidence; check retired UI terms instead.
  check(`${route}: no simulated investment or old positioning`, !/target yield|Target APR|allocation progress|circuit\.credit|crypto liquidity|onchain protocol|\$500M|Fully compliant and verifiable/i.test(html));
  check(`${route}: no internal archive link`, !/href="\/(legacy|deck|deck\.html|open-silicon-deck\.html)/.test(html));
  const ctas = [...html.matchAll(/<a\b([^>]*)>(?:Discuss a financing opportunity|Get in touch)<\/a>/g)];
  check(`${route}: primary CTAs point to Contact`, ctas.length > 0 && ctas.every(match => /href="\/contact"/.test(match[1])));
  if (route === '/about') check('About: current essay and chapter anchors preserved', html.includes('Scaling Intelligence.') && html.includes('Capital for intelligence') && ['overview','demand','capital','structure','conversation'].every(id => html.includes(`id="${id}"`)));
  if (route === '/contact') {
    check('Contact: brief contact fields present', ['name','email','company','message'].every(field => html.includes(`id="financing-${field}"`)));
    check('Contact: both capital audiences supported', html.includes('Providing capital') && html.includes('Seeking capital') && html.includes('name="interest"'));
    check('Contact: detailed project fields removed', ['role','hardware','location','amount','timeline','offtake','details'].every(field => !html.includes(`id="financing-${field}"`)));
    // Inspect the connection without creating a real submission.
    check('Contact: connected to OpenSilicon Website Inquiry', html.includes('action="https://formcarry.com/s/Z5g0C_SSqMR"') && html.includes('method="POST"'));
    check('Contact: Formcarry honeypot present and submission enabled', html.includes('name="_gotcha"') && !html.includes('Enquiries are temporarily unavailable.'));
  }
}
const research = await fetch(new URL('/research', base));
const researchHTML = await research.text();
check('Hidden Research: existing page retained without sample articles', research.status === 200 && researchHTML.includes('Research is on the way.') && !researchHTML.includes('From GPUs to usable compute') && !researchHTML.includes('The infrastructure behind intelligence'));
for (const slug of ['from-gpus-to-usable-compute','the-infrastructure-behind-intelligence','missing-article']) {
  const response = await fetch(new URL(`/research/${slug}`, base));
  check(`Research direct URL ${slug}: 404`, response.status === 404);
}
for (const route of ['/our-approach', '/gpu-financing']) {
  const redirect = await fetch(new URL(route, base), { redirect: 'manual' });
  check(`${route}: permanently redirects directly to About`, redirect.status === 308 && redirect.headers.get('location')?.endsWith('/about'));
}
for (const route of ['/legacy','/deck','/deck.html','/open-silicon-deck.html']) {
  const response = await fetch(new URL(route, base), { redirect: 'manual' });
  check(`${route}: ${mode} access policy`, mode === 'production' ? response.status === 404 : response.status === 200);
  check(`${route}: noindex header`, response.headers.get('x-robots-tag')?.includes('noindex'));
}
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
check('Sitemap: excludes hidden sections, drafts and internal archives', !/our-approach|research|legacy|deck|from-gpus-to-usable-compute|the-infrastructure-behind-intelligence/.test(sitemap));
const robots = await (await fetch(new URL('/robots.txt', base))).text();
check('Robots: previews excluded or internal archives disallowed', robots.includes('Disallow: /\n') || (robots.includes('Disallow: /legacy') && robots.includes('Disallow: /deck')));
console.log(JSON.stringify({ mode, base, passed: checks.length, checks }, null, 2));
