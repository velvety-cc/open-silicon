import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FundDeck from "@/components/fund-deck/FundDeck";
import "./fund-deck.css";
export const metadata: Metadata = {
    title: "OpenSilicon | OpenSilicon Fund 1",
    description: "Private credit fund for the intelligence economy",
    robots: { index: false, follow: false, nocache: true },
};
export default function FundOneDeckPage() {
    if (process.env.NODE_ENV !== "development")
        notFound();
    return <FundDeck />;
}
