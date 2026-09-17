import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DECK_DATA as D } from "@/lib/deck-data";
import { DeckText as T, resolveDeckText } from "./DeckText";
import CashFlowIllustration from "./CashFlowIllustration";
import DealStructure from "./DealStructure";

type SlideId = typeof D.slides[number]["id"];
type Source = { label: string; url: string };
function Note({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`deck-small text-[#666] ${className}`}><T>{children}</T></p>;
}
function Sources({ sources }: { sources: readonly Source[] }) {
  return <p className="deck-sources">{D.ui.source}: {sources.map((source, i) => <span key={source.url}>{i > 0 && "; "}<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></span>)}</p>;
}
function DataTable({ headers, rows, className = "" }: { headers?: readonly string[]; rows: readonly (readonly string[])[]; className?: string }) {
  return <Table className={`deck-table ${rows[0]?.length === 2 ? "deck-key-value-table" : ""} ${className}`} containerProps={{ role: "region", "aria-label": headers?.join(", ") ?? "Credit terms", tabIndex: 0 }}>
    {headers && <TableHeader><TableRow>{headers.map(header => <TableHead key={header} scope="col">{header}</TableHead>)}</TableRow></TableHeader>}
    <TableBody>{rows.map((row, i) => <TableRow key={`${row[0]}-${i}`}>{row.map((cell, j) => j === 0 ? <TableHead scope="row" key={j}><T>{cell}</T></TableHead> : <TableCell key={j}><T>{cell}</T></TableCell>)}</TableRow>)}</TableBody>
  </Table>;
}
function Observations({ items }: { items: readonly { title: string; body: string }[] }) {
  return <div className="deck-observations">{items.map(item => <div key={item.title}><h3 className="deck-subtitle"><T>{item.title}</T></h3><p className="deck-body text-[#626262]"><T>{item.body}</T></p></div>)}</div>;
}
function MarketChart() {
  const m = D.market;
  return <figure className="deck-market-chart"><figcaption className="deck-label">{m.chartTitle}</figcaption>
    <svg viewBox="0 0 460 110" role="img" aria-label={`${m.chartTitle}: ${m.chart.map(row => `${row.label} ${row.display}`).join(", ")}. ${m.chartNote}`}>
      {m.chart.map((row, i) => <g key={row.label} transform={`translate(0, ${i * 42 + 8})`}><text x="0" y="18" fontSize="14" fill="#555">{row.label}</text><rect x="96" y="0" width="285" height="26" fill="#f1f0f5" /><rect x="96" y="0" width={row.value / 100 * 285} height="26" fill={i === 0 ? "#bdb4ed" : "#533afe"} /><text x="398" y="19" fontSize="17" fill="#222">{row.display}</text></g>)}
      <text x="96" y="103" fontSize="11" fill="#777">{m.chartUnit}</text>
    </svg><Note>{m.chartNote}</Note></figure>;
}
function SlideBody({ id, onNavigate }: { id: SlideId; onNavigate: (index: number) => void }) {
  switch (id) {
    case "cover": return <>
      <div className="deck-cover-image"><Image src={D.visuals.cover} alt="Data center infrastructure" fill sizes="100vw" preload quality={90} className="object-cover object-[center_54%]" /></div>
      <div className="deck-cover-heading"><div><p className="deck-eyebrow">{D.cover.eyebrow}</p><h1 className="deck-cover-title"><T>{D.slides[0].title}</T></h1></div><p className="deck-cover-description">{D.cover.subtitle}</p></div>
      <dl className="deck-cover-metrics">{D.cover.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd><T>{metric.value}</T></dd></div>)}</dl><Note>{D.cover.note}</Note>
    </>;
    case "contents": return <div className="deck-toc">{D.contents.map((group, i) => {
      const start = D.slides.findIndex(slide => slide.id === group.start), end = D.slides.findIndex(slide => slide.id === group.end);
      return <a className="deck-toc-row" key={group.title} href={`#slide-${start + 1}`} onClick={event => { event.preventDefault(); onNavigate(start); }}><span className="deck-toc-index">{String(i + 1).padStart(2, "0")}</span><span><strong>{group.title}</strong><span className="deck-toc-description">{group.description}</span></span><span className="deck-toc-pages">{String(start + 1).padStart(2, "0")}–{String(end + 1).padStart(2, "0")}</span><ArrowRight aria-hidden="true" /></a>;
    })}</div>;
    case "market": return <>
      <div className="deck-market-layout"><div><p className="deck-label text-[#777]">{D.market.period}</p><dl className="deck-market-metrics">{D.market.metrics.map(metric => <div key={metric.label}><dd>{metric.value}</dd><dt>{metric.label}</dt><p className="deck-small">{metric.context}</p></div>)}</dl><MarketChart /></div><Observations items={D.market.observations} /></div>
      <div className="deck-bottom-note"><Note>{D.market.scope}</Note><Note>{D.market.pricingGap}</Note><Sources sources={[D.market.source]} /></div>
    </>;
    case "market-deals": return <>
      <Table className="deck-table deck-deals-table"><TableHeader><TableRow>{D.marketDeals.headers.map(header => <TableHead scope="col" key={header}>{header}</TableHead>)}</TableRow></TableHeader><TableBody>{D.marketDeals.entries.filter(deal => deal.confirmed).map(deal => <TableRow key={deal.name}><TableHead scope="row"><span className="deck-subtitle">{deal.name}</span><span className="deck-cell-secondary">{deal.date}</span></TableHead><TableCell className="deck-deal-amount">{deal.amount}</TableCell><TableCell>{deal.structure}<span className="deck-cell-secondary">{deal.terms}</span></TableCell><TableCell className="text-[#626262]">{deal.context}</TableCell></TableRow>)}</TableBody></Table>
      <div className="deck-takeaway"><h3>{D.marketDeals.observationTitle}</h3><p><T>{D.marketDeals.observation}</T></p></div><div className="deck-bottom-note"><Note>{D.marketDeals.note}</Note><Sources sources={D.marketDeals.entries.filter(deal => deal.confirmed).map(deal => deal.source)} /></div>
    </>;
    case "strategy": return <><div className="deck-split"><DataTable headers={D.strategy.headers} rows={D.strategy.rows.map(row => [row.label, row.value])} /><aside className="deck-aside"><h3 className="deck-subtitle">{D.strategy.asideTitle}</h3><p className="deck-body">{D.strategy.aside}</p><Note>{D.strategy.evidence}</Note></aside></div><Note className="mt-auto!">{D.strategy.note}</Note></>;
    case "lighthouse": return <><p className="deck-eyebrow">{D.lighthouse.caption}</p><dl className="deck-deal-profile">{D.lighthouseFields.map(field => <div key={field.key}><dt>{field.label}</dt><dd><T>{D.lighthouseDeal.confirmed ? String(D.lighthouseDeal[field.key as keyof typeof D.lighthouseDeal]) : `[TODO: ${field.label.toLowerCase()}]`}</T></dd></div>)}</dl><Note className="mt-auto!">{D.lighthouse.note}</Note></>;
    case "repayment": return <><div className="deck-split deck-repayment-layout"><DataTable className="deck-repayment-table" headers={D.repayment.headers} rows={D.repayment.rows.map(row => [row.label, row.value, row.case])} /><aside className="deck-repayment-aside"><Observations items={D.repayment.sources} /><div className="deck-takeaway"><h3>{D.repayment.testTitle}</h3><p>{D.repayment.test}</p></div></aside></div><Note className="mt-auto!">{D.repayment.reserve}</Note></>;
    case "underwriting": return <><DataTable headers={D.underwriting.headers} rows={D.underwriting.rows.map(row => [row.label, row.value])} /><Note className="mt-auto!">{D.underwriting.note}</Note></>;
    case "structure": return <><DealStructure /><div className="deck-structure-details">{D.structure.columns.map(item => <div key={item.title}><h3 className="deck-subtitle">{item.title}</h3><p className="deck-small mt-2! text-[#626262]">{item.body}</p></div>)}</div><Note className="mt-auto!">{D.structure.note}</Note></>;
    case "risks": return <><DataTable className="deck-risk-table" headers={D.riskSection.headers} rows={D.risks.map(risk => [risk.risk, risk.mitigant, risk.residual])} /><div className="deck-bottom-note"><Note>{D.riskSection.stress}</Note><Note>{D.riskSection.note}</Note></div></>;
    case "portfolio": return <><DataTable className="deck-pipeline-table" headers={D.portfolio.headers} rows={D.pipelineStages.map(stage => [stage.name, stage.count, stage.total, stage.gate])} /><dl className="deck-limits">{D.portfolio.limits.map(limit => <div key={limit.label}><dt>{limit.label}</dt><dd><T>{limit.value}</T></dd></div>)}</dl><Note className="mt-auto!">{D.portfolio.note}</Note></>;
    case "terms": return <><div className="deck-split"><DataTable rows={D.terms.rows.map(row => [row.label, row.value])} /><aside className="deck-aside"><h3 className="deck-subtitle">{D.terms.economicsTitle}</h3><dl className="deck-economics">{D.terms.economics.map(item => <div key={item.label}><dt>{item.label}</dt><dd><T>{item.value}</T></dd></div>)}</dl></aside></div><Note className="mt-auto!">{D.terms.note}</Note></>;
    case "participation": return <><div className="deck-split"><DataTable headers={D.participation.headers} rows={D.participation.rows.map(row => [row.label, row.value])} /><aside className="deck-aside"><h3 className="deck-label">{D.participation.eligibilityTitle}</h3><Observations items={D.participation.eligibility} /></aside></div><div className="deck-bottom-note"><Note>{D.participation.note}</Note><Sources sources={D.legalSources} /></div></>;
    case "team": return <>
      <div className="deck-team-layout"><div><h3 className="deck-label mb-4!">{D.teamSection.teamLabel}</h3><div className="deck-team-members">{D.team.map((entry, i) => <div key={i}><h4 className="deck-subtitle"><T>{entry.confirmed ? entry.name : `[TODO: team member]`}</T></h4><p className="deck-small mt-2! mb-3!"><T>{entry.confirmed ? entry.role : `[TODO: credit responsibility]`}</T></p><Note>{entry.confirmed ? entry.bio : `[TODO: verified underwriting or recovery experience]`}</Note></div>)}</div></div><aside className="deck-service-providers"><h3 className="deck-label mb-4!">{D.teamSection.partnersLabel}</h3>{D.partners.map((entry, i) => <div key={i}><p className="deck-body"><T>{entry.confirmed ? entry.name : `[TODO: ${i === 0 ? "collateral agent" : "servicer"}]`}</T></p><Note>{entry.confirmed ? entry.role : `[TODO: appointment status and scope]`}</Note></div>)}</aside></div>
      <div><h3 className="deck-subtitle mb-4!">{D.teamSection.experienceTitle}</h3><DataTable headers={D.teamSection.experienceHeaders} rows={D.teamSection.experience.map(entry => entry.confirmed ? [entry.transaction, entry.role, entry.outcome] : ["[TODO: verified transaction]", "[TODO: actual role and employer]", "[TODO: repayments, losses and recovery]"])} /></div><Note className="mt-auto!">{D.teamSection.note}</Note>
    </>;
    case "process": return <><div className="deck-process-duration"><span className="deck-large-number"><T>{"{{fundingWeeks}}"}</T><small>weeks</small></span><span className="deck-label">{D.processSection.timeLabel}</span></div><ol className="deck-process">{D.process.map((step, i) => <li key={step.title}><span className="deck-process-index">{String(i + 1).padStart(2, "0")}</span><h3 className="deck-subtitle">{step.title}</h3><p className="deck-body text-[#626262]">{step.body}</p></li>)}</ol><dl className="deck-limits">{D.processSection.gates.map(gate => <div key={gate.label}><dt>{gate.label}</dt><dd><T>{gate.value}</T></dd></div>)}</dl><Note className="mt-auto!">{D.processSection.note}</Note></>;
    case "cashflows": return <CashFlowIllustration />;
    case "closing": return <><div className="deck-closing-layout"><div><p className="deck-eyebrow">{D.documentLabel}</p><h2 className="deck-cover-title">{D.slides.at(-1)?.title}</h2><p className="deck-lede text-[#666]">{D.closing.subtitle}</p><div className="deck-closing-contact"><span className="deck-label">{D.closing.contactLabel}</span><p className="deck-subtitle"><T>{D.contactEmail}</T></p></div></div><div className="deck-closing-image"><Image src={D.visuals.closing} alt="Data center exterior" fill sizes="(max-width: 900px) 100vw, 40vw" className="object-cover object-[60%_center]" /></div></div><ol className="deck-next-steps">{D.closing.actions.map((action, i) => <li key={action.title}><span className="deck-eyebrow">{String(i + 1).padStart(2, "0")}</span><h3 className="deck-subtitle">{action.title}</h3><p className="deck-body text-[#666]">{action.body}</p></li>)}</ol></>;
  }
}
export function DeckSlideContent({ index, onNavigate }: { index: number; onNavigate: (index: number) => void }) {
  const slide = D.slides[index];
  return <>{!["cover", "closing"].includes(slide.id) && <div className="deck-heading"><h2 className="deck-title"><T>{slide.title}</T></h2>{slide.lede && <p className="deck-lede"><T>{slide.lede}</T></p>}</div>}<SlideBody id={slide.id} onNavigate={onNavigate} /></>;
}
export const slideNotes = D.slides.map(slide => resolveDeckText(slide.notes));
