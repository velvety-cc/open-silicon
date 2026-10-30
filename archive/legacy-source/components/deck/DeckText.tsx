import { Fragment } from "react";
import { DECK_DATA } from "@/lib/deck-data";

export const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const range = (value: { min: number; max: number }) => `${value.min}–${value.max}`;
const moneyRange = (value: { min: number; max: number }) => `$${value.min / 1e6}M–$${value.max / 1e6}M`;
const tokens: Record<string, string | number> = {
  raiseSize: DECK_DATA.raiseSize,
  raiseRange: moneyRange(DECK_DATA.raiseRange),
  operatorFacilityRange: moneyRange(DECK_DATA.operatorFacilityRange),
  termRange: range(DECK_DATA.termRange),
  couponRange: range(DECK_DATA.couponRange),
  ltvCap: DECK_DATA.ltvCap,
  facilitySize: DECK_DATA.facilitySize,
  minimumTicket: DECK_DATA.minimumTicket,
  fees: DECK_DATA.fees,
  amortization: DECK_DATA.amortization,
  reserve: DECK_DATA.reserve,
  diversificationTarget: DECK_DATA.diversificationTarget,
  fundingWeeks: range(DECK_DATA.fundingWeeks),
};

export function resolveDeckText(value: string | number) {
  return String(value).replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(tokens[key] ?? `[TODO: ${key}]`));
}

export function DeckText({ children }: { children: string | number }) {
  return <>{resolveDeckText(children).split(/(\[TODO[^\]]*\]|\n)/g).map((part, i) => (
    part === "\n" ? <br key={i} /> : part.startsWith("[TODO") ? <mark key={i} className="deck-placeholder">{part}</mark> : <Fragment key={i}>{part}</Fragment>
  ))}</>;
}
