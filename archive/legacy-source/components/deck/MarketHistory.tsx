import { Fragment } from "react";
import { DECK_DATA as D } from "@/lib/deck-data";

const history = D.marketHistory;
const day = (date: string) => Date.parse(`${date}T00:00:00Z`);
const start = day(history.startDate);
const duration = day(history.endDate) - start;
const x = (date: string) => 52 + (day(date) - start) / duration * 820;
const y = (value: number) => 232 - (value - history.minimum) / (history.maximum - history.minimum) * 206;

export default function MarketHistory() {
  return <div className="deck-history-layout">
    <figure className="deck-history-chart">
      <figcaption><a className="deck-label deck-evidence-link" href={history.source.url} target="_blank" rel="noopener noreferrer">{history.chartTitle}</a><span className="deck-chart-unit">{history.chartUnit}</span></figcaption>
      <div className="deck-history-scroll" role="region" aria-label="H100 historical contract price ranges" tabIndex={0}>
      <svg viewBox="0 0 920 277" role="img" aria-labelledby="gpu-history-title gpu-history-description">
        <title id="gpu-history-title">{history.chartTitle}, {history.period}</title>
        <desc id="gpu-history-description">Published percentile ranges, not daily prices. {history.ranges.map(range => `${range.period}: $${range.low.toFixed(2)} to $${range.high.toFixed(2)}`).join("; ")}.</desc>
        {history.ticks.map(tick => <g key={tick}><line x1="52" x2="872" y1={y(tick)} y2={y(tick)} stroke="#e9e7ef" /><text x="38" y={y(tick) + 4} textAnchor="end" fontSize="12" fill="#777">${tick.toFixed(1)}</text></g>)}
        {history.axisLabels.map(label => <g key={label.date}><line x1={x(label.date)} x2={x(label.date)} y1="26" y2="238" stroke="#efedf4" /><text x={x(label.date)} y="264" textAnchor="start" fontSize="13" fill="#777">{label.label}</text></g>)}
        {history.ranges.map(range => <g key={range.period}>
          <title>{range.period}: ${range.low.toFixed(2)}–${range.high.toFixed(2)} per GPU-hour</title>
          <rect x={x(range.start) + 1} y={y(range.high)} width={Math.max(1, x(range.end) - x(range.start) - 2)} height={y(range.low) - y(range.high)} fill={range.start >= "2026-01-01" ? "#533afe" : "#c7c0ed"} />
        </g>)}
        {history.callouts.map(callout => <g key={callout.period}>
          <text x={x(callout.date)} y={y(callout.value) + (callout.period === "Oct 2025" ? 21 : -22)} textAnchor={callout.period === "Apr 2026" ? "end" : "middle"} fill="#333" fontSize="15" fontWeight="500">{callout.label}</text>
          <text x={x(callout.date)} y={y(callout.value) + (callout.period === "Oct 2025" ? 38 : -6)} textAnchor={callout.period === "Apr 2026" ? "end" : "middle"} fill="#777" fontSize="11">{callout.period}</text>
        </g>)}
      </svg>
      </div>
      <p className="deck-history-coverage">{history.coverage}</p>
    </figure>
    <div className="deck-history-chapters">{history.chapters.map(chapter => <div key={chapter.period}>
      <p className="deck-eyebrow">{chapter.period}</p><h3 className="deck-subtitle">{chapter.title}</h3>
      <p className="deck-history-milestones"><span className="deck-history-stage">{chapter.stage}</span>{chapter.milestones.filter(milestone => milestone.confirmed).map(milestone => <Fragment key={milestone.label}>
        <span className="deck-history-milestone-separator">{chapter.milestoneSeparator}</span>
        <a className="deck-evidence-link" href={milestone.url} target="_blank" rel="noopener noreferrer">{milestone.label}</a>
      </Fragment>)}</p>
      <p className="deck-body">{chapter.body}</p>
    </div>)}</div>
  </div>;
}
