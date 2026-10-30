import { notFound } from "next/navigation";
import { loadDeck } from "@/engine/render.mjs";
import Viewer from "@/engine/Viewer";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  const deck = await loadDeck();
  return <Viewer title={deck.title} slides={deck.slides.map(({ page, title }) => ({ page, title }))} />;
}
