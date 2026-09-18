import { DECK_DATA as D } from "@/lib/deck-data";

const chart = D.market.demandShift;
const baseline = 292;
const y = (value: number) => baseline - value / chart.maximum * 238;
const share = (point: typeof chart.points[number]) => Math.round((point.inference / (point.training + point.inference) + Number.EPSILON) * 100);
const growth = (key: typeof chart.series[number]["key"]) => Math.round((chart.points[1][key] / chart.points[0][key] - 1) * 100);
const segmentCenter = (point: typeof chart.points[number], key: typeof chart.series[number]["key"]) => y(key === "training" ? point.training / 2 : point.training + point.inference / 2);

export default function DemandShiftChart() {
  return <div className="deck-demand-layout">
    <figure className="deck-demand-chart">
      <figcaption><span className="deck-label">{chart.title}</span><span className="deck-chart-unit">{chart.unit}</span></figcaption>
      <svg viewBox="0 0 700 355" role="img" aria-labelledby="demand-shift-title demand-shift-description">
        <title id="demand-shift-title">{chart.title}</title>
        <desc id="demand-shift-description">{chart.sourceCaption}. {chart.points.map(point => `${point.year}: training ${point.training} GW, inference ${point.inference} GW; inference share ${share(point)} percent`).join(". ")}. {chart.series.map(series => `${series.label} cumulative growth: ${growth(series.key)} percent`).join(". ")}. No intermediate-year values are implied.</desc>
        <defs>{chart.series.map(series => <marker key={series.key} id={`demand-growth-${series.key}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M 1 1 L 8 5 L 1 9" fill="none" stroke={series.annotationColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></marker>)}</defs>
        {chart.series.map((series, i) => <g key={series.key} transform={`translate(${62 + i * 150},16)`}><rect width="12" height="12" fill={series.color} /><text x="21" y="11" fontSize="14" fill="#555">{series.label}</text></g>)}
        {chart.ticks.map(tick => <g key={tick}><line x1="62" x2="665" y1={y(tick)} y2={y(tick)} stroke="#e9e7ef" /><text x="48" y={y(tick) + 5} textAnchor="end" fontSize="13" fill="#777">{tick}</text></g>)}
        {chart.points.map((point, i) => {
          const x = 160 + i * 304;
          const total = point.training + point.inference;
          const trainingHeight = baseline - y(point.training);
          const inferenceHeight = y(point.training) - y(total);
          return <g key={point.year}>
            <rect x={x} y={y(point.training)} width="128" height={trainingHeight} fill={chart.series[0].color} />
            <rect x={x} y={y(total)} width="128" height={inferenceHeight} fill={chart.series[1].color} />
            <text x={x + 64} y={y(point.training) + trainingHeight / 2 + 5} textAnchor="middle" fontSize="17" fontWeight="500" fill="#24212f">{point.training.toFixed(1)}</text>
            <text x={x + 64} y={y(total) + inferenceHeight / 2 + 5} textAnchor="middle" fontSize="17" fontWeight="500" fill="white">{point.inference.toFixed(1)}</text>
            <text x={x + 64} y={y(total) - 12} textAnchor="middle" fontSize="17" fontWeight="500" fill="#333">{total.toFixed(1)} GW</text>
            <text x={x + 64} y="320" textAnchor="middle" fontSize="19" fill="#333">{point.year}</text>
            <text x={x + 64} y="343" textAnchor="middle" fontSize="13" fill="#777">{point.status}</text>
          </g>;
        })}
        {chart.series.map(series => {
          const startY = segmentCenter(chart.points[0], series.key);
          const endY = segmentCenter(chart.points[1], series.key);
          const labelY = (startY + endY) / 2;
          return <g key={series.key} aria-hidden="true">
            <line x1="300" y1={startY} x2="452" y2={endY} stroke={series.annotationColor} strokeWidth="2" strokeLinecap="round" markerEnd={`url(#demand-growth-${series.key})`} />
            <rect x="332" y={labelY - 16} width="88" height="32" rx="4" fill="white" />
            <text x="376" y={labelY} dy=".35em" textAnchor="middle" fontSize="20" fontWeight="600" fill={series.annotationColor}>+{growth(series.key)}%</text>
          </g>;
        })}
      </svg>
      <p className="deck-demand-source"><a className="deck-evidence-link" href={chart.source.url} target="_blank" rel="noopener noreferrer">{chart.sourceCaption}</a></p>
    </figure>
    <aside className="deck-demand-aside">
      <div className="deck-demand-share">
        <h3 className="deck-label">{chart.shareLabel}</h3>
        <p className="deck-demand-share-values">{share(chart.points[0])}% <span>→</span> {share(chart.points[1])}%</p>
        <p className="deck-small text-[#777]">{chart.shareCaption}</p>
        <p className="deck-body">{chart.takeaway}</p>
      </div>
      <div><h3 className="deck-subtitle">{chart.mechanismTitle}</h3><p className="deck-body">{chart.mechanismBody}</p></div>
      <div><h3 className="deck-subtitle">{chart.adoptionTitle}</h3><p className="deck-body">{chart.adoptionBody}</p></div>
    </aside>
  </div>;
}
