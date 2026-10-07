import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:3001';
const mode = process.argv[3] || 'production';
const pages = ['/', '/our-approach', '/about', '/research', '/contact'];
const checks = [];
const check = (message, passed) => { assert.ok(passed, message); checks.push(message); };
for (const route of pages) {
  const response = await fetch(new URL(route, base));
  const html = await response.text();
  check(`${route}: responds 200`, response.status === 200);
  check(`${route}: Open Silicon metadata`, /<title>[^<]*Open ?Silicon[^<]*<\/title>/.test(html) && html.includes('property="og:description"'));
  check(`${route}: all five page destinations, including Home through the logo`, pages.every(href => html.includes(`href="${href}"`)));
  check(`${route}: no simulated investment or old positioning`, !/Anthropic|Mistral|NVIDIA|Kimi|target yield|Target APR|allocation progress|circuit\.credit|crypto liquidity|onchain protocol|\$500M|Fully compliant and verifiable/i.test(html));
  check(`${route}: no internal archive link`, !/href="\/(legacy|deck|deck\.html|open-silicon-deck\.html)/.test(html));
  const ctas = [...html.matchAll(/<a\b([^>]*)>(?:Discuss a financing opportunity|Get in touch)<\/a>/g)];
  check(`${route}: primary CTAs point to Contact`, ctas.length > 0 && ctas.every(match => /href="\/contact"/.test(match[1])));
  if (route === '/research') check('Research: examples absent and publication notice shown', html.includes('Research is on the way.') && !html.includes('From GPUs to usable compute') && !html.includes('The infrastructure behind intelligence'));
  if (route === '/contact') {
    check('Contact: all project fields present', ['name','company','email','role','hardware','location','amount','timeline','offtake','details'].every(field => html.includes(`id="financing-${field}"`)));
    // Safe endpoint check: never submit to a configured receiving service.
    if (html.includes('Enquiries are temporarily unavailable.')) {
      const result = await fetch(new URL('/api/financing', base), { method: 'POST', headers: { 'content-type': 'application/json', origin: new URL(base).origin, 'idempotency-key': '00000000-0000-4000-8000-000000000000' }, body: JSON.stringify({ name: 'Synthetic validation', company: 'Local validation only', email: 'local@example.test' }) });
      check('Contact: unconfigured endpoint returns 503', result.status === 503 && !(await result.text()).includes('"ok":true'));
    }
  }
}
for (const slug of ['from-gpus-to-usable-compute','the-infrastructure-behind-intelligence','missing-article']) {
  const response = await fetch(new URL(`/research/${slug}`, base));
  check(`Research direct URL ${slug}: 404`, response.status === 404);
}
const redirect = await fetch(new URL('/gpu-financing', base), { redirect: 'manual' });
check('Old financing URL redirects to Our Approach', [307,308].includes(redirect.status) && redirect.headers.get('location')?.endsWith('/our-approach'));
for (const route of ['/legacy','/deck','/deck.html','/open-silicon-deck.html']) {
  const response = await fetch(new URL(route, base), { redirect: 'manual' });
  check(`${route}: ${mode} access policy`, mode === 'production' ? response.status === 404 : response.status === 200);
  check(`${route}: noindex header`, response.headers.get('x-robots-tag')?.includes('noindex'));
}
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
check('Sitemap: excludes drafts and internal archives', !/legacy|deck|from-gpus-to-usable-compute|the-infrastructure-behind-intelligence/.test(sitemap));
const robots = await (await fetch(new URL('/robots.txt', base))).text();
check('Robots: previews excluded or internal archives disallowed', robots.includes('Disallow: /\n') || (robots.includes('Disallow: /legacy') && robots.includes('Disallow: /deck')));
console.log(JSON.stringify({ mode, base, passed: checks.length, checks }, null, 2));
