import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DECK_DATA as D } from "@/lib/deck-data";
import { DeckText as T, resolveDeckText } from "./DeckText";
import CashFlowIllustration from "./CashFlowIllustration";
import DealStructure from "./DealStructure";
import MarketHistory from "./MarketHistory";
import DemandShiftChart from "./DemandShiftChart";
import StrategyOverview from "./StrategyOverview";

type SlideId = typeof D.slides[number]["id"];
function DataTable({ headers, rows, className = "" }: { headers?: readonly string[]; rows: readonly (readonly string[])[]; className?: string }) {
  return <Table className={`deck-table ${rows[0]?.length === 2 ? "deck-key-value-table" : ""} ${className}`} containerProps={{ role: "region", "aria-label": headers?.join(", ") ?? "Credit terms", tabIndex: 0 }}>
    {headers && <TableHeader><TableRow>{headers.map(header => <TableHead key={header} scope="col">{header}</TableHead>)}</TableRow></TableHeader>}
    <TableBody>{rows.map((row, i) => <TableRow key={`${row[0]}-${i}`}>{row.map((cell, j) => j === 0 ? <TableHead scope="row" key={j}><T>{cell}</T></TableHead> : <TableCell key={j}><T>{cell}</T></TableCell>)}</TableRow>)}</TableBody>
  </Table>;
}
function Observations({ items }: { items: readonly { title: string; body: string }[] }) {
  return <div className="deck-observations">{items.map(item => <div key={item.title}><h3 className="deck-subtitle"><T>{item.title}</T></h3><p className="deck-body text-[#626262]"><T>{item.body}</T></p></div>)}</div>;
}
function OperatorEconomics() {
  const e = D.operatorEconomics;
  const a = e.assumptions;
  const usd = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const receipts = (rate: number) => rate * a.monthlyHours * a.paidOccupancy;
  const net = (rate: number) => receipts(rate) - a.monthlyCashCosts;
  const values = (fn: (low: number, high: number) => string) => e.scenarios.map(scenario => fn(scenario.low, scenario.high));
  const payback = (capex: number, low: number, high: number) => net(low) > 0 ? `${(capex / net(high)).toFixed(1)}–${(capex / net(low)).toFixed(1)} ${e.labels.months}` : "No finite payback";
  const rows = [
    [e.labels.rent, ...values((low, high) => `$${low.toFixed(2)}–${high.toFixed(2)}`)],
    [e.labels.receipts, ...values((low, high) => `${usd(receipts(low))}–${usd(receipts(high))}`)],
    [e.labels.cash, ...values((low, high) => `${usd(net(low))}–${usd(net(high))}`)],
    ...(["refurbished", "new"] as const).map(kind => {
      const capex = (kind === "new" ? a.newHardware : a.refurbishedHardware) + a.additionalCapex;
      return [`${e.labels[kind]}\n${usd(capex)} ${e.labels.installed}`, ...values((low, high) => payback(capex, low, high))];
    }),
  ];
  return <div className="deck-unit-layout">
    <div>
      <h3 className="deck-label deck-unit-table-title">{e.tableTitle}</h3>
      <DataTable className="deck-unit-table" headers={e.headers} rows={rows} />
      <p className="deck-model-assumptions"><strong>{e.assumptionLabel}:</strong> {a.paidOccupancy * 100}% paid occupancy · {usd(a.monthlyCashCosts)}/GPU monthly cash costs · {a.monthlyHours} hours/month</p>
      <p className="deck-model-scope">{e.labels.modelScope}</p>
    </div>
    <aside className="deck-unit-aside">
      {e.benchmark.confirmed && <div className="deck-unit-benchmark">
        <p className="deck-label text-[#777]">{e.benchmark.label}</p>
        <p className="deck-unit-payback">{e.benchmark.value}<span>{e.benchmark.unit}</span></p>
        <h3 className="deck-label"><a className="deck-evidence-link" href={e.benchmark.source.url} target="_blank" rel="noopener noreferrer">{e.benchmark.title}</a></h3>
        <p className="deck-body text-[#626262]">{e.benchmark.body}</p>
      </div>}
      <div className="deck-unit-formula" role="math" aria-label={e.formula.ariaLabel}>
        <p className="deck-label">{e.formula.label}</p>
        <div className="deck-unit-fraction" aria-hidden="true"><span>{e.formula.numerator}</span><span>{e.formula.denominator}</span></div>
      </div>
      <div className="deck-unit-credit"><h3 className="deck-label">{e.creditTitle}</h3><p className="deck-body">{e.creditBody}</p></div>
    </aside>
  </div>;
}
function SlideBody({ id, onNavigate }: { id: SlideId; onNavigate: (index: number) => void }) {
  switch (id) {
    case "cover": return <>
      <div className="deck-cover-image"><Image src={D.visuals.cover} alt="Data center infrastructure" fill sizes="100vw" preload quality={90} className="object-cover object-[center_58%]" /></div>
      <div className="deck-cover-heading">
        <p className="deck-cover-kicker">{D.documentLabel}</p>
        <h1 className="deck-cover-title"><T>{D.slides[0].title}</T></h1>
      </div>
    </>;
    case "contents": return <div className="deck-toc">{D.contents.map((group, i) => {
      const start = D.slides.findIndex(slide => slide.id === group.start), end = D.slides.findIndex(slide => slide.id === group.end);
      return <a className="deck-toc-row" key={group.title} href={`#slide-${start + 1}`} onClick={event => { event.preventDefault(); onNavigate(start); }}><span className="deck-toc-index">{String(i + 1).padStart(2, "0")}</span><span><strong>{group.title}</strong><span className="deck-toc-description">{group.description}</span></span><span className="deck-toc-pages">{String(start + 1).padStart(2, "0")}–{String(end + 1).padStart(2, "0")}</span><ArrowRight aria-hidden="true" /></a>;
    })}</div>;
    case "market": return <DemandShiftChart />;
    case "market-history": return <MarketHistory />;
    case "rental-segments": return <>
      <DataTable className="deck-segments-table" headers={D.rentalSegments.headers} rows={D.rentalSegments.rows} />
      <div className="deck-segments-evidence"><h3 className="deck-label">{D.rentalSegments.evidence.title}</h3><p className="deck-body"><a className="deck-evidence-link" href={D.rentalSegments.evidence.source.url} target="_blank" rel="noopener noreferrer" title={D.rentalSegments.evidence.source.label}>{D.rentalSegments.evidence.body}</a></p></div>
      <div className="deck-takeaway"><h3>{D.rentalSegments.thesis.title}</h3><p><T>{D.rentalSegments.thesis.body}</T></p></div>
    </>;
    case "operator-economics": return <OperatorEconomics />;
    case "market-deals": return <>
      <Table className="deck-table deck-deals-table"><TableHeader><TableRow>{D.marketDeals.headers.map(header => <TableHead scope="col" key={header}>{header}</TableHead>)}</TableRow></TableHeader><TableBody>{D.marketDeals.entries.filter(deal => deal.confirmed).map(deal => <TableRow key={deal.name}><TableHead scope="row"><a className="deck-subtitle deck-evidence-link" href={deal.source.url} target="_blank" rel="noopener noreferrer">{deal.name}</a><span className="deck-cell-secondary">{deal.date}</span></TableHead><TableCell className="deck-deal-amount">{deal.amount}</TableCell><TableCell>{deal.structure}<span className="deck-cell-secondary">{deal.terms}</span></TableCell><TableCell className="text-[#626262]">{deal.context}</TableCell></TableRow>)}</TableBody></Table>
      <div className="deck-financing-support"><h3 className="deck-label">{D.marketDeals.supportTitle}</h3><p className="deck-body"><a className="deck-evidence-link" href={D.marketDeals.supportSource.url} target="_blank" rel="noopener noreferrer">{D.marketDeals.supportBody}</a></p></div>
      <div className="deck-takeaway"><h3>{D.marketDeals.observationTitle}</h3><p><T>{D.marketDeals.observation}</T></p></div>
    </>;
    case "strategy": return <StrategyOverview />;
    case "lighthouse": return <><p className="deck-eyebrow">{D.lighthouse.caption}</p><dl className="deck-deal-profile">{D.lighthouseFields.map(field => <div key={field.key}><dt>{field.label}</dt><dd><T>{D.lighthouseDeal.confirmed ? String(D.lighthouseDeal[field.key as keyof typeof D.lighthouseDeal]) : `[TODO: ${field.label.toLowerCase()}]`}</T></dd></div>)}</dl></>;
    case "repayment": return <><div className="deck-split deck-repayment-layout"><DataTable className="deck-repayment-table" headers={D.repayment.headers} rows={D.repayment.rows.map(row => [row.label, row.value, row.case])} /><aside className="deck-repayment-aside"><Observations items={D.repayment.sources} /><div className="deck-takeaway"><h3>{D.repayment.testTitle}</h3><p>{D.repayment.test}</p></div></aside></div></>;
    case "underwriting": return <><DataTable headers={D.underwriting.headers} rows={D.underwriting.rows.map(row => [row.label, row.value])} /></>;
    case "structure": return <><DealStructure /><div className="deck-structure-details">{D.structure.columns.map(item => <div key={item.title}><h3 className="deck-subtitle">{item.title}</h3><p className="deck-small mt-2! text-[#626262]">{item.body}</p></div>)}</div></>;
    case "risks": return <><DataTable className="deck-risk-table" headers={D.riskSection.headers} rows={D.risks.map(risk => [risk.risk, risk.mitigant, risk.residual])} /></>;
    case "portfolio": return <><DataTable className="deck-pipeline-table" headers={D.portfolio.headers} rows={D.pipelineStages.map(stage => [stage.name, stage.count, stage.total, stage.gate])} /><dl className="deck-limits">{D.portfolio.limits.map(limit => <div key={limit.label}><dt>{limit.label}</dt><dd><T>{limit.value}</T></dd></div>)}</dl></>;
    case "terms": return <><div className="deck-split"><DataTable rows={D.terms.rows.map(row => [row.label, row.value])} /><aside className="deck-aside"><h3 className="deck-subtitle">{D.terms.economicsTitle}</h3><dl className="deck-economics">{D.terms.economics.map(item => <div key={item.label}><dt>{item.label}</dt><dd><T>{item.value}</T></dd></div>)}</dl></aside></div></>;
    case "participation": return <><div className="deck-split"><DataTable headers={D.participation.headers} rows={D.participation.rows.map(row => [row.label, row.value])} /><aside className="deck-aside"><h3 className="deck-label">{D.participation.eligibilityTitle}</h3><Observations items={D.participation.eligibility} /></aside></div></>;
    case "team": return <>
      <div className="deck-team-layout"><div><h3 className="deck-label mb-4!">{D.teamSection.teamLabel}</h3><div className="deck-team-members">{D.team.map((entry, i) => <div key={i}><h4 className="deck-subtitle"><T>{entry.confirmed ? entry.name : `[TODO: team member]`}</T></h4><p className="deck-small mt-2! mb-3!"><T>{entry.confirmed ? entry.role : `[TODO: credit responsibility]`}</T></p><p className="deck-small text-[#666]"><T>{entry.confirmed ? entry.bio : `[TODO: verified underwriting or recovery experience]`}</T></p></div>)}</div></div><aside className="deck-service-providers"><h3 className="deck-label mb-4!">{D.teamSection.partnersLabel}</h3>{D.partners.map((entry, i) => <div key={i}><p className="deck-body"><T>{entry.confirmed ? entry.name : `[TODO: ${i === 0 ? "collateral agent" : "servicer"}]`}</T></p><p className="deck-small text-[#666]"><T>{entry.confirmed ? entry.role : `[TODO: appointment status and scope]`}</T></p></div>)}</aside></div>
      <div><h3 className="deck-subtitle mb-4!">{D.teamSection.experienceTitle}</h3><DataTable headers={D.teamSection.experienceHeaders} rows={D.teamSection.experience.map(entry => entry.confirmed ? [entry.transaction, entry.role, entry.outcome] : ["[TODO: verified transaction]", "[TODO: actual role and employer]", "[TODO: repayments, losses and recovery]"])} /></div>
    </>;
    case "process": return <><div className="deck-process-duration"><span className="deck-large-number"><T>{"{{fundingWeeks}}"}</T><small>weeks</small></span><span className="deck-label">{D.processSection.timeLabel}</span></div><ol className="deck-process">{D.process.map((step, i) => <li key={step.title}><span className="deck-process-index">{String(i + 1).padStart(2, "0")}</span><h3 className="deck-subtitle">{step.title}</h3><p className="deck-body text-[#626262]">{step.body}</p></li>)}</ol><dl className="deck-limits">{D.processSection.gates.map(gate => <div key={gate.label}><dt>{gate.label}</dt><dd><T>{gate.value}</T></dd></div>)}</dl></>;
    case "cashflows": return <CashFlowIllustration />;
    case "closing": return <><div className="deck-closing-layout"><div><p className="deck-eyebrow">{D.documentLabel}</p><h2 className="deck-cover-title">{D.slides.at(-1)?.title}</h2><p className="deck-lede text-[#666]">{D.closing.subtitle}</p><div className="deck-closing-contact"><span className="deck-label">{D.closing.contactLabel}</span><p className="deck-subtitle"><T>{D.contactEmail}</T></p></div></div><div className="deck-closing-image"><Image src={D.visuals.closing} alt="Data center exterior" fill sizes="(max-width: 900px) 100vw, 40vw" className="object-cover object-[60%_center]" /></div></div><ol className="deck-next-steps">{D.closing.actions.map((action, i) => <li key={action.title}><span className="deck-eyebrow">{String(i + 1).padStart(2, "0")}</span><h3 className="deck-subtitle">{action.title}</h3><p className="deck-body text-[#666]">{action.body}</p></li>)}</ol></>;
  }
}
export function DeckSlideContent({ index, onNavigate }: { index: number; onNavigate: (index: number) => void }) {
  const slide = D.slides[index];
  return <>{!["cover", "closing"].includes(slide.id) && <div className="deck-heading"><h2 className="deck-title"><T>{slide.title}</T></h2>{slide.lede && <p className="deck-lede"><T>{slide.lede}</T></p>}</div>}<SlideBody id={slide.id} onNavigate={onNavigate} /></>;
}
export const slideNotes = D.slides.map(slide => {
  const research = D.researchNotes.find(note => note.slideId === slide.id);
  return resolveDeckText([
    slide.notes,
    ...(research?.sections.map(section => `${section.title}\n${section.paragraphs.join("\n\n")}`) ?? []),
    ...(research?.sources.map(source => `${source.label} (${source.date})\n${source.url}`) ?? []),
  ].join("\n\n"));
});
