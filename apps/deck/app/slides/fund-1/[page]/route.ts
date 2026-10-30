import { renderSlide } from "@/engine/render.mjs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (process.env.NODE_ENV !== "development" || !/^(?:[1-9]|1[0-4])$/.test(page)) return new Response("Not found", { status: 404 });
  const html = await renderSlide(Number(page), { reading: new URL(request.url).searchParams.get("reading") === "1", interactive: true });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" } });
}
