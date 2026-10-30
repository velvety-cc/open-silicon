import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import { listMaterials, renderMaterial } from './render.mjs';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function createMaterialsServer() {
  return createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Robots-Tag', 'noindex, nofollow');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    try {
      const { pathname } = new URL(request.url, 'http://localhost');
      let html;
      if (pathname === '/') {
        const materials = await listMaterials();
        const links = materials.map(item => `<li><a href="/${item.id}">${escapeHtml(item.title)}</a> <small>${escapeHtml(item.audience)}</small></li>`).join('');
        html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>OpenSilicon | Other materials</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:760px;padding:32px;margin:auto;color:#191919}h1{font-size:28px}li{margin:16px 0}a{color:#533afe}small{display:block;color:#61616b}</style><h1>OpenSilicon other materials</h1><ul>${links}</ul></html>`;
      } else {
        html = await renderMaterial(decodeURIComponent(pathname.slice(1).replace(/\.html$/, '')));
      }
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : html);
    } catch (error) {
      const status = error instanceof RangeError || error instanceof URIError ? 404 : 500;
      if (status === 500) console.error(error);
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(status === 404 ? 'Not found' : 'Unable to render material');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 3003);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw Error('PORT must be an integer from 1 to 65535');
  createMaterialsServer().listen(port, '127.0.0.1', () => console.log(`Other materials: http://127.0.0.1:${port}`));
}
