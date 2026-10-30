import { ArrowRight, Check } from "lucide-react";
import { DECK_DATA } from "@/lib/deck-data";
import { DeckText } from "./DeckText";

export default function StrategyOverview() {
  const { assets, bridge, takeout, repayment } = DECK_DATA.strategy;

  return <div className="deck-strategy-layout">
    <div className="deck-strategy-flow">
      <section className="deck-strategy-stage">
        <h3 className="deck-label">{assets.label}</h3>
        <div className="deck-strategy-headline">
          <p className="deck-strategy-value"><DeckText>{assets.value}</DeckText></p>
          <p className="deck-strategy-unit">{assets.unit}</p>
        </div>
        <ul className="deck-strategy-list">
          {assets.criteria.map(criterion => <li key={criterion}><Check aria-hidden="true" /><span>{criterion}</span></li>)}
        </ul>
        <ArrowRight className="deck-strategy-arrow" aria-hidden="true" />
      </section>

      <section className="deck-strategy-stage deck-strategy-bridge">
        <h3 className="deck-label">{bridge.label}</h3>
        <div className="deck-strategy-headline">
          <p className="deck-strategy-duration"><DeckText>{bridge.value}</DeckText><span>{bridge.unit}</span></p>
        </div>
        <div className="deck-strategy-security">
          <p>{bridge.security}</p>
          <p className="deck-strategy-ltv"><DeckText>{bridge.ltv}</DeckText></p>
          <p className="deck-strategy-basis">{bridge.basis}</p>
        </div>
        <ArrowRight className="deck-strategy-arrow" aria-hidden="true" />
      </section>

      <section className="deck-strategy-stage">
        <h3 className="deck-label">{takeout.label}</h3>
        <div className="deck-strategy-headline">
          <p className="deck-strategy-takeout"><DeckText>{takeout.title}</DeckText></p>
        </div>
        <ul className="deck-strategy-list deck-strategy-exit">
          {takeout.steps.map(step => <li key={step}>{step}</li>)}
        </ul>
        <p className="deck-strategy-condition">{takeout.condition}</p>
      </section>
    </div>

    <div className="deck-strategy-repayment">
      <h3><DeckText>{repayment.title}</DeckText></h3>
      <ul>{repayment.controls.map(control => <li key={control}><Check aria-hidden="true" /><span>{control}</span></li>)}</ul>
    </div>
  </div>;
}
