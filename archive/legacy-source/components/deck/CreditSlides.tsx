import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DECK_DATA as D } from "@/lib/deck-data";
import { DeckText as T } from "./DeckText";

type Field = { label: string; value: string };

function Fields({ rows, className = "" }: { rows: readonly Field[]; className?: string }) {
  return <dl className={`deck-fields ${className}`}>{rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd><T>{row.value}</T></dd></div>)}</dl>;
}

export function LighthouseOverview() {
  const field = (key: typeof D.lighthouseFields[number]["key"]) => {
    const label = D.lighthouseFields.find(item => item.key === key)!.label;
    return { label, value: D.lighthouseDeal.confirmed ? String(D.lighthouseDeal[key]) : `[TODO: ${label.toLowerCase()}]` };
  };
  return <div className="deck-credit-page deck-lighthouse-overview">
    <Fields className="deck-metric-strip deck-placeholder-metrics" rows={D.lighthouse.highlights.map(field)} />
    <div className="deck-credit-columns">{D.lighthouse.groups.map(group => <section key={group.title}>
      <h3 className="deck-group-title">{group.title}</h3><Fields rows={group.keys.map(field)} />
    </section>)}</div>
  </div>;
}

export function RepaymentOverview() {
  const r = D.repayment;
  return <div className="deck-credit-page">
    <div className="deck-repayment-overview">
      <Table className="deck-table deck-repayment-ledger" containerProps={{ role: "region", "aria-label": "Repayment cash flow analysis", tabIndex: 0 }}>
        <TableHeader><TableRow>{r.headers.map(label => <TableHead scope="col" key={label}>{label}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{r.rows.map((row, i) => <TableRow key={row.label} className={i === 3 ? "deck-ledger-subtotal" : i === 5 ? "deck-ledger-final" : ""}>
          <TableHead scope="row"><span className="deck-ledger-sign" aria-hidden="true">{["+", "−", "−", "=", "−", ""][i]}</span>{row.label}</TableHead>
          <TableCell><T>{row.value}</T></TableCell><TableCell><T>{row.case}</T></TableCell>
        </TableRow>)}</TableBody>
      </Table>
      <aside className="deck-repayment-sources">{r.sources.map((source, i) => <section key={source.title}>
        <p className="deck-eyebrow">{r.sourceLabels[i]}</p><h3 className="deck-group-title">{source.title}</h3><p className="deck-body">{source.body}</p>
      </section>)}</aside>
    </div>
    <div className="deck-credit-conclusion"><h3>{r.testTitle}</h3><p>{r.test}</p></div>
  </div>;
}

export function UnderwritingOverview() {
  return <div className="deck-underwriting-gates">{D.underwriting.groups.map((group, index) => <section key={group.title}>
    <div className="deck-gate-heading"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3></div>
    <dl>{group.rows.map(rowIndex => {
      const row = D.underwriting.rows[rowIndex];
      return <div key={row.label}><dt>{row.label}</dt><dd><T>{row.value}</T></dd></div>;
    })}</dl>
  </section>)}</div>;
}

export function PipelineOverview() {
  return <div className="deck-credit-page deck-pipeline-overview">
    <ol className="deck-pipeline-stages">{D.pipelineStages.map((stage, i) => <li key={stage.name}>
      <div className="deck-pipeline-node" aria-hidden="true"><span />{i < D.pipelineStages.length - 1 && <ArrowRight />}</div>
      <h3 className="deck-group-title">{stage.name}</h3>
      <dl><div><dt>{D.portfolio.amountLabel}</dt><dd><T>{stage.total}</T></dd></div><div><dt>{D.portfolio.countLabel}</dt><dd><T>{stage.count}</T></dd></div></dl>
      <p>{stage.gate}</p>
    </li>)}</ol>
    <section className="deck-limit-section"><h3 className="deck-label">{D.portfolio.limitsTitle}</h3><Fields rows={D.portfolio.limits} className="deck-limit-strip" /></section>
  </div>;
}

export function TermsOverview() {
  return <div className="deck-credit-page deck-terms-overview">
    <dl className="deck-metric-strip">{D.terms.highlights.map(item => <div key={item.label}>
      <dt>{item.label}</dt><dd><T>{item.value}</T>{"unit" in item && <span className="deck-metric-unit">{item.unit}</span>}</dd>
      {"context" in item && <p>{item.context}</p>}
    </div>)}</dl>
    <div className="deck-terms-columns"><section><h3 className="deck-group-title">{D.terms.detailsTitle}</h3><Fields className="deck-inline-fields" rows={D.terms.detailRows.map(index => D.terms.rows[index])} /></section>
      <aside className="deck-economics-flow"><h3 className="deck-group-title">{D.terms.economicsTitle}</h3><Fields rows={D.terms.economics} /></aside>
    </div>
  </div>;
}

export function ParticipationOverview() {
  const p = D.participation;
  return <div className="deck-credit-page">
    <div className="deck-vehicle-heading"><div><h3>{p.vehicleTitle}</h3><p>{p.vehicleBody}</p></div><dl><dt>{p.minimumLabel}</dt><dd><T>{D.minimumTicket}</T></dd></dl></div>
    <div className="deck-participation-columns">
      <section><h3 className="deck-group-title">{p.eligibilityTitle}</h3><div className="deck-eligibility-grid">{p.eligibility.map(item => <div key={item.title}><h4>{item.title}</h4><p><T>{item.body}</T></p></div>)}</div></section>
      <section><h3 className="deck-group-title">{p.governanceTitle}</h3><Fields className="deck-governance-fields" rows={p.rows.slice(1, -1)} /></section>
    </div>
  </div>;
}

export function TeamOverview() {
  const t = D.teamSection;
  return <div className="deck-credit-page deck-team-overview">
    <section><h3 className="deck-label">{t.teamLabel}</h3><div className="deck-people-grid">{D.team.map((person, i) => <div key={i}>
      <h4><T>{person.confirmed ? person.name : t.placeholders.name}</T></h4><p className="deck-person-role"><T>{person.confirmed ? person.role : t.placeholders.role}</T></p><p><T>{person.confirmed ? person.bio : t.placeholders.bio}</T></p>
    </div>)}</div></section>
    <div className="deck-team-evidence"><section><h3 className="deck-group-title">{t.experienceTitle}</h3>{t.experience.map((entry, i) => <Fields key={i} rows={[
      { label: t.experienceHeaders[0], value: entry.confirmed ? entry.transaction : t.placeholders.transaction },
      { label: t.experienceHeaders[1], value: entry.confirmed ? entry.role : t.placeholders.actualRole },
      { label: t.experienceHeaders[2], value: entry.confirmed ? entry.outcome : t.placeholders.outcome },
    ]} />)}</section><section><h3 className="deck-group-title">{t.partnersLabel}</h3><div className="deck-provider-grid">{D.partners.map((partner, i) => <div key={i}>
      <h4><T>{partner.confirmed ? partner.name : i === 0 ? t.placeholders.collateralAgent : t.placeholders.servicer}</T></h4><p><T>{partner.confirmed ? partner.role : t.placeholders.partnerRole}</T></p>
    </div>)}</div></section></div>
  </div>;
}

export function ProcessOverview() {
  return <div className="deck-credit-page deck-execution-overview">
    <div className="deck-execution-layout"><div className="deck-execution-duration"><p><T>{"{{fundingWeeks}}"}</T><span>{D.processSection.durationUnit}</span></p><h3>{D.processSection.timeLabel}</h3></div>
      <ol className="deck-execution-timeline">{D.process.map((step, i) => <li key={step.title}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
    </div>
    <section className="deck-limit-section"><h3 className="deck-label">{D.processSection.gatesTitle}</h3><Fields rows={D.processSection.gates} className="deck-limit-strip" /></section>
  </div>;
}
