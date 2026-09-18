import { DECK_DATA as D } from "@/lib/deck-data";
import { DeckText as T } from "./DeckText";

export function RentalSegmentsOverview() {
  const s = D.rentalSegments;
  return <div className="deck-credit-page">
    <div className="deck-segment-columns">{s.headers.slice(1).map((header, i) => <section key={header} className={i === 1 ? "deck-segment-target" : ""}>
      <h3>{header}</h3><dl>{s.rows.map(row => <div key={row[0]}><dt>{row[0]}</dt><dd>{row[i + 1]}</dd></div>)}</dl>
    </section>)}</div>
    <div className="deck-credit-conclusion"><h3>{s.thesis.title}</h3><p><T>{s.thesis.body}</T></p></div>
  </div>;
}

export function MarketDealsOverview() {
  const m = D.marketDeals;
  return <div className="deck-credit-page deck-precedents-overview">
    <div className="deck-precedent-columns">{m.entries.filter(deal => deal.confirmed).map(deal => <section key={deal.name}>
      <h3><a className="deck-evidence-link" href={deal.source.url} target="_blank" rel="noopener noreferrer">{deal.name}</a></h3><p className="deck-precedent-date">{deal.date}</p>
      <p className="deck-precedent-amount">{deal.amount}</p><p className="deck-precedent-structure">{deal.structure}</p><p className="deck-precedent-terms">{deal.terms}</p><p className="deck-precedent-context">{deal.context}</p>
    </section>)}</div>
    <div className="deck-financing-support"><h3 className="deck-label">{m.supportTitle}</h3><p className="deck-body"><a className="deck-evidence-link" href={m.supportSource.url} target="_blank" rel="noopener noreferrer">{m.supportBody}</a></p></div>
    <div className="deck-credit-conclusion"><h3>{m.observationTitle}</h3><p>{m.observation}</p></div>
  </div>;
}
