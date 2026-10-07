import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FundraisingDeck from "@/components/deck/FundraisingDeck";
import "./deck.css";
import "./credit-layouts.css";

export const metadata: Metadata = {
  title: "Open Silicon | Bridge credit for AI compute",
  description: "Senior secured bridge credit for operating AI compute infrastructure.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DeckPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <FundraisingDeck />;
}
