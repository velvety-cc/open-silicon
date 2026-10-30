import assert from 'node:assert/strict';
const origin = new URL(process.argv[2] ?? 'http://127.0.0.1:3000');
const pages = new Map();
const pending = ['/', '/startups-and-enterprises', '/investors', '/about', '/research', '/contact?interest=capital', '/contact?interest=financing'];
const privateMarkers = ['Project Aurora', 'AI Infra Access Fund', '$168m', '$280m'];
while (pending.length) {
  const route = pending.shift();
  if (pages.has(route)) continue;
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const source = await response.text();
  if (!response.headers.get('content-type')?.includes('text/html')) continue;
  for (const marker of privateMarkers) assert.ok(!source.includes(marker), `${route} contains ${marker}`);
  const allIds = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const ids = new Set(allIds);
  assert.equal(ids.size, allIds.length, `Duplicate IDs on ${route}`);
  const links = [...source.matchAll(/href="(\/[^"?#]*(?:\?[^"#]*)?(?:#[^"]*)?)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  for (const [, id] of source.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `Broken local anchor #${id} on ${route}`);
  pages.set(route, { ids, links });
  for (const link of links) {
    const target = link.split('#')[0] || route;
    if (!/\.[a-z\d]+(?:\?|$)/i.test(target) && !target.startsWith('/_next') && !pages.has(target)) pending.push(target);
  }
}
for (const [route, page] of pages) for (const link of page.links) {
  if (!link.includes('#')) continue;
  const [target, id] = link.split('#');
  if (pages.has(target || route)) assert.ok(pages.get(target || route).ids.has(id), `Broken anchor ${link} on ${route}`);
}
for (const [route, destination] of [['/approach', '/about#our-approach'], ['/our-approach', '/about#our-approach'], ['/gpu-financing', '/startups-and-enterprises']]) {
  const response = await fetch(new URL(route, origin), { redirect: 'manual' });
  assert.equal(response.status, 308, route);
  assert.equal(response.headers.get('location'), destination, route);
}
for (const route of ['/deck', '/fund-1/deck', '/deck.html', '/legacy', '/open-silicon-deck.html']) assert.equal((await fetch(new URL(route, origin))).status, 404, route);
console.log(`Verified ${pages.size} website pages, local anchors, 3 redirects and 5 former private routes.`);
