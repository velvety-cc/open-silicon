import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DECK_DATA } from "@/lib/deck-data";
import { calculateCashFlows } from "@/lib/deck-cashflows";
import { money } from "./DeckText";

export default function CashFlowIllustration() {
  const c = DECK_DATA.cashflowIllustration;
  const result = calculateCashFlows(c.defaultAmount, c.defaultTerm, c.defaultCoupon, c.defaultAmortization);
  const maximum = Math.max(...result.rows.map(row => row.total));
  const totals = [
    { label: c.principalLabel, value: result.principal },
    { label: c.interestLabel, value: result.interest },
    { label: c.totalLabel, value: result.total },
  ];
  return <>
    <dl className="deck-cash-assumptions">
      <div><dt className="deck-small text-[#777]">{c.amountLabel}</dt><dd>{money.format(c.defaultAmount)}</dd></div>
      <div><dt className="deck-small text-[#777]">{c.termLabel}</dt><dd>{c.defaultTerm} months</dd></div>
      <div><dt className="deck-small text-[#777]">{c.couponLabel}</dt><dd>{c.defaultCoupon}%</dd></div>
      <div><dt className="deck-small text-[#777]">{c.balanceLabel}</dt><dd>{money.format((result.rows.at(-1)?.closing ?? 0) / 100)}</dd></div>
    </dl>
    <div className="deck-cash-layout">
      <div>
        <h3 className="deck-label">{c.scheduleLabel}</h3>
        <svg className="deck-cash-chart" viewBox="0 0 590 205" role="img" aria-labelledby="cash-flow-title cash-flow-description">
          <title id="cash-flow-title">{c.chartTitle}</title>
          <desc id="cash-flow-description">{c.chartDescription} Monthly figures and the remaining balance appear in the adjacent table.</desc>
          <rect x="84" y="14" width="8" height="8" fill="#d3cfee" /><text x="98" y="22" fontSize="11" fill="#555">{c.principalLabel}</text>
          <rect x="238" y="14" width="8" height="8" fill="#533afe" /><text x="252" y="22" fontSize="11" fill="#555">{c.interestLabel}</text>
          {[0, .5, 1].map(fraction => <g key={fraction}><line x1="84" x2="580" y1={168 - fraction * 120} y2={168 - fraction * 120} stroke="#e5e5e8" /><text x="73" y={172 - fraction * 120} textAnchor="end" fontSize="11" fill="#777">{money.format(maximum * fraction / 100)}</text></g>)}
          {result.rows.map(row => {
            const slot = 496 / c.defaultTerm, width = Math.min(26, slot * .65), x = 84 + (row.month - 1) * slot + (slot - width) / 2;
            const principalHeight = row.principal / maximum * 120, interestHeight = row.interest / maximum * 120;
            return <g key={row.month}><rect x={x} y={168 - principalHeight} width={width} height={principalHeight} fill="#d3cfee" /><rect x={x} y={168 - principalHeight - interestHeight} width={width} height={interestHeight} fill="#533afe" /><text x={x + width / 2} y="193" textAnchor="middle" fontSize="12" fill="#666">{row.month}</text></g>;
          })}
        </svg>
        <dl className="deck-cash-totals">{totals.map(total => <div key={total.label}><dt>{total.label}</dt><dd>{money.format(total.value / 100)}</dd></div>)}</dl>
      </div>
      <Table className="deck-table deck-cash-table">
        <caption className="sr-only">{c.scheduleLabel}</caption>
        <TableHeader><TableRow>{c.headers.map(header => <TableHead key={header} scope="col">{header}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{result.rows.map(row => <TableRow key={row.month}><TableHead scope="row">{row.month}</TableHead><TableCell>{money.format(row.principal / 100)}</TableCell><TableCell>{money.format(row.interest / 100)}</TableCell><TableCell>{money.format(row.closing / 100)}</TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
    <div className="deck-bottom-note"><p className="deck-small text-[#666]">{c.method}</p><p className="deck-small text-[#666]">{c.assumptions}</p><p className="deck-small text-[#666]">{c.note}</p></div>
  </>;
}
