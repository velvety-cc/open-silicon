import { renderDeck } from "@/engine/render.mjs";
export const dynamic = "force-dynamic";
export async function GET() {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  return new Response(await renderDeck(), { headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" } });
}
