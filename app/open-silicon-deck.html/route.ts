import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(request: Request) {
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(request.url).hostname);
  if (process.env.NODE_ENV !== "development" || !local) return new Response("Not found", { status: 404 });
  const html = await readFile(path.join(process.cwd(), "internal", "open-silicon-deck.html"), "utf8");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } });
}
