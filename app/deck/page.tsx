import type { Metadata } from "next";
import FundraisingDeck from "@/components/deck/FundraisingDeck";
import "./deck.css";

export const metadata: Metadata = {
  title: "Open Silicon | Bridge credit for AI compute",
  description: "Senior secured bridge credit for operating AI compute infrastructure.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DeckPage() {
  return <FundraisingDeck />;
}
