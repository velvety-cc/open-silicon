import { DECK_DATA as D } from "@/lib/deck-data";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FUND_LOAN_BALANCES } from "@/lib/fund-1-deck";
type Metric = {
    value: ReactNode;
    label: ReactNode;
};
export function Insight({ title, children, className }: {
    title: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return <div className={cn("insight", className)}><h3>{title}</h3><p>{children}</p></div>;
}
export function Metrics({ items, className }: {
    items: Metric[];
    className?: string;
}) {
    return <div className={cn("metrics grid", className)}>{items.map((item, index) => <div key={index}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}
export function MiniRow({ items, className }: {
    items: Metric[];
    className?: string;
}) {
    return <div className={cn("minirow flex", className)}>{items.map((item, index) => <div key={index}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>;
}
export function Flow({ items, className }: {
    items: ReactNode[];
    className?: string;
}) {
    return <div className={cn("flow grid", className)}>{items.map((item, index) => <div className="flow-cell" key={index}><div>{item}</div>{index < items.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}</div>)}</div>;
}
export function DeckTable({ headers, rows, className }: {
    headers: ReactNode[];
    rows: ReactNode[][];
    className?: string;
}) {
    return <table className={cn("w-full border-collapse text-left", className)}><thead><tr>{headers.map((header, index) => <th key={index} scope="col">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody></table>;
}
export function PrincipalAmortizationChart() {
    const x = 62, y = 35, width = 490, height = 216;
    const points = FUND_LOAN_BALANCES.map((balance, month) => ({ x: x + month * width / 36, y: y + height - balance / 1e6 / 180 * height }));
    const line = points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    return <svg className="v3-chart" viewBox="0 0 600 326" role="img" aria-labelledby="fund-amortization-title"><title id="fund-amortization-title">Illustrative loan principal amortization under 36 monthly payments</title>{[0, 60, 120, 180].map(value => { const yy = y + height - value / 180 * height; return <Fragment key={value}><line x1={x} x2={x + width} y1={yy} y2={yy} className="gridline"/><text x="46" y={yy + 5} textAnchor="end">{value}</text></Fragment>; })}<text x="18" y="18">$m</text><path className="chart-fill" d={`M${x},${y + height} L${line.replaceAll(" ", " L")} L${x + width},${y + height} Z`}/><polyline className="chart-line" points={line}/>{[0, 12, 24, 36].map((month, index) => { const p = points[month], anchor = index === 0 ? "start" : index === 3 ? "end" : "middle"; return <Fragment key={month}><circle cx={p.x} cy={p.y} r="4" className="chart-dot"/><text x={p.x} y={p.y - 14} className="chart-value" textAnchor={anchor}>{(FUND_LOAN_BALANCES[month] / 1e6).toFixed(1)}</text><text x={p.x} y="284" textAnchor={anchor}>{month === 0 ? "Draw" : `Month ${month}`}</text></Fragment>; })}</svg>;
}



const chart = D.market.demandShift;
const baseline = 292;
const y = (value: number) => baseline - value / chart.maximum * 238;
const share = (point: typeof chart.points[number]) => Math.round(point.inference / (point.training + point.inference) * 1000) / 10;
const totalDemand = (point: typeof chart.points[number]) => point.training + point.inference;
const totalMultiple = (totalDemand(chart.points[1]) / totalDemand(chart.points[0])).toFixed(1);
const growth = (key: typeof chart.series[number]["key"]) => Math.round((chart.points[1][key] / chart.points[0][key] - 1) * 100);
const segmentCenter = (point: typeof chart.points[number], key: typeof chart.series[number]["key"]) => y(key === "training" ? point.training / 2 : point.training + point.inference / 2);


export function TrainingInferenceDemandChart() { return <figure className="deck-demand-chart">
      <figcaption><h2 className="market-point-title">AI compute demand: ~3.5× by 2030</h2><span className="deck-chart-unit">{chart.unit}</span></figcaption>
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
    </figure>; }
