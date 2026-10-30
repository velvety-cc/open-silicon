"use client";

import { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@opensilicon/ui/tooltip";
import { demoGpuModels, estimateDeployment } from "@/lib/deployment-estimate";
import { estimateDeploymentFunding, loanContributionTiers } from "@/lib/deployment-financing";
import styles from "./DeploymentEstimator.module.css";

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US");
const millions = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const moneyRange = (min: number, max: number) => min === max ? dollars.format(min) : `${dollars.format(min)}–${dollars.format(max)}`;
const compactMoneyRange = (min: number, max: number) => min >= 1_000_000
  ? `$${millions.format(min / 1_000_000)}${min === max ? "" : `–${millions.format(max / 1_000_000)}`}M`
  : moneyRange(min, max);
const weekRange = (min: number, max: number) => min === max ? `${min} weeks` : `${min}–${max} weeks`;
const numeric = (value: string) => value.trim() === "" ? Number.NaN : Number(value);

const planningAssumptions = {
  infrastructurePercent: 20, contingencyPercent: 10,
  siteMin: 0, siteMax: 0, installationMin: 2, installationMax: 4,
};

export default function DeploymentEstimator() {
  const [modelId, setModelId] = useState("gb300");
  const [quantity, setQuantity] = useState("72");
  const [loanPercent, setLoanPercent] = useState<number>(loanContributionTiers[1]);
  const [loanInfoOpen, setLoanInfoOpen] = useState(false);
  const model = demoGpuModels.find(item => item.id === modelId)!;
  const gpuCount = numeric(quantity);
  const validCount = Number.isInteger(gpuCount) && gpuCount >= 1 && gpuCount <= 65_536;
  const systemCount = validCount ? Math.ceil(gpuCount / model.gpusPerServer) : 0;
  const changeQuantity = (direction: -1 | 1) => setQuantity(String(Math.min(65_536, Math.max(1, gpuCount + direction * model.gpusPerServer))));
  let estimate: ReturnType<typeof estimateDeployment> | undefined;
  let error = "";
  try {
    estimate = estimateDeployment({
      ...planningAssumptions,
      requestedGpus: gpuCount, gpusPerServer: model.gpusPerServer,
      serverPriceMin: model.serverPriceMin, serverPriceMax: model.serverPriceMax,
      deliveryMin: model.deliveryMin, deliveryMax: model.deliveryMax,
    });
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Check the GPU quantity.";
  }
  const funding = estimate ? {
    low: estimateDeploymentFunding({ equipmentValue: estimate.low.equipment, capitalBudget: estimate.low.total, loanPercent }),
    high: estimateDeploymentFunding({ equipmentValue: estimate.high.equipment, capitalBudget: estimate.high.total, loanPercent }),
  } : undefined;
  const budgetParts = estimate ? [
    { label: `GPU ${model.unit}s`, value: estimate.low.equipment, high: estimate.high.equipment, color: styles.equipment },
    { label: "Infrastructure", value: estimate.low.infrastructure, high: estimate.high.infrastructure, color: styles.infrastructure },
    { label: "Contingency", value: estimate.low.contingency, high: estimate.high.contingency, color: styles.contingency },
  ] : [];

  return <section id="equipment-and-sites" className={styles.section} aria-labelledby="equipment-and-sites-title">
    <header className={styles.heading}>
      <h2 id="equipment-and-sites-title">Plan your deployment.</h2>
      <p>Choose your GPU model and loan contribution to explore your deployment budget and funding structure.</p>
    </header>

    <div className={styles.calculator}>
      <div className={styles.controls}>
        <fieldset className={styles.modelField}>
          <legend className={styles.step}><span>01</span> Choose your GPU</legend>
          <div className={styles.options}>
            {demoGpuModels.map(item => <label className={styles.option} key={item.id}>
              <input type="radio" name="estimate-model" value={item.id} checked={modelId === item.id} onChange={() => setModelId(item.id)} />
              <span>{item.label}</span>
            </label>)}
          </div>
          <p className={styles.hint}>Example system value <strong>{moneyRange(model.serverPriceMin, model.serverPriceMax)}</strong> per {model.gpusPerServer}-GPU {model.unit}.</p>
        </fieldset>

        <div className={styles.quantityField}>
          <label className={styles.step} htmlFor="estimate-quantity"><span>02</span> How many GPUs?</label>
          <div className={styles.stepper}>
            <button type="button" aria-label={`Remove ${model.gpusPerServer} GPUs`} disabled={!validCount || gpuCount <= 1} onClick={() => changeQuantity(-1)}>−</button>
            <input id="estimate-quantity" type="number" min={1} max={65_536} step="1" inputMode="numeric" required value={quantity} aria-describedby="estimate-server-count" aria-invalid={!validCount} onChange={event => setQuantity(event.target.value)} />
            <button type="button" aria-label={`Add ${model.gpusPerServer} GPUs`} disabled={!validCount || gpuCount >= 65_536} onClick={() => changeQuantity(1)}>+</button>
          </div>
          <p className={styles.hint} id="estimate-server-count">{validCount ? `${number.format(systemCount)} × ${model.gpusPerServer}-GPU ${model.unit}${systemCount === 1 ? "" : "s"}` : "Enter a whole GPU count."}</p>
        </div>

        <fieldset className={styles.loanField} aria-label="Loan contribution">
          <legend className={`${styles.step} ${styles.loanStep}`}><span>03</span> Loan contribution
            <TooltipProvider delayDuration={200}>
              <Tooltip open={loanInfoOpen} onOpenChange={setLoanInfoOpen}>
                <TooltipTrigger asChild>
                  <button type="button" className={styles.loanInfoButton} data-loan-info aria-label="About loan contribution" onClick={event => { event.preventDefault(); setLoanInfoOpen(true); }}>
                    <Info size={13} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" align="start" sideOffset={6} collisionPadding={16} className="w-80 max-w-[calc(100vw-2rem)] text-pretty">
                  The percentage of GPU equipment value financed by the loan. Equity covers the remaining equipment cost, infrastructure and contingency.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </legend>
          <div className={`${styles.options} ${styles.loanOptions}`}>
            {loanContributionTiers.map(tier => <label className={styles.option} key={tier}>
              <input type="radio" name="estimate-loan" value={tier} checked={loanPercent === tier} onChange={() => setLoanPercent(tier)} />
              <span>{tier}%</span>
            </label>)}
          </div>
        </fieldset>

      </div>

      <div className={styles.result} aria-label="Your deployment estimate">
        <div className={styles.resultBody}>
          <p className={styles.resultLabel}>Estimated capital budget</p>
          {estimate ? <>
            <p className={styles.total} aria-label={moneyRange(estimate.low.total, estimate.high.total)} title={moneyRange(estimate.low.total, estimate.high.total)}>{compactMoneyRange(estimate.low.total, estimate.high.total)}</p>
            <div className={styles.budgetBar} aria-hidden="true">{budgetParts.map(part => <span key={part.label} className={part.color} style={{ flexGrow: part.value }} />)}</div>
            <dl className={styles.breakdown}>
              {budgetParts.map(part => <div key={part.label}>
                <dt><i className={part.color} aria-hidden="true" />{part.label}</dt>
                <dd title={moneyRange(part.value, part.high)}>{compactMoneyRange(part.value, part.high)}</dd>
              </div>)}
            </dl>
            {funding && <section className={styles.financialSection} data-financing="funding" aria-labelledby="estimate-funding-title">
              <h3 id="estimate-funding-title">Funding structure</h3>
              <dl className={styles.financialMetrics}>
                <div><dt>Loan contribution</dt><dd title={moneyRange(funding.low.loan, funding.high.loan)}>{compactMoneyRange(funding.low.loan, funding.high.loan)}</dd></div>
                <div><dt>Equity contribution</dt><dd title={moneyRange(funding.low.equity, funding.high.equity)}>{compactMoneyRange(funding.low.equity, funding.high.equity)}</dd></div>
              </dl>
            </section>}
            <div className={styles.window}><span>Deployment window</span><strong>{weekRange(estimate.weeksMin, estimate.weeksMax)}</strong></div>
            {estimate.extraGpus > 0 && <p className={styles.rounding}>Rounded from {number.format(gpuCount)} to {number.format(estimate.installedGpus)} GPUs for whole {model.gpusPerServer}-GPU {model.unit}s. The budget includes all {number.format(estimate.installedGpus)} GPUs.</p>}
          </> : <div className={styles.error} role="alert"><strong>Check your inputs.</strong><p>{error}</p></div>}
        </div>
        <Link className={styles.cta} href="/contact?interest=financing">Discuss this deployment <span aria-hidden="true">↗</span></Link>
        <div className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{estimate ? `Demo estimate: ${moneyRange(estimate.low.total, estimate.high.total)}. ${weekRange(estimate.weeksMin, estimate.weeksMax)}. ${number.format(estimate.servers)} ${model.unit}${estimate.servers === 1 ? "" : "s"}, ${number.format(estimate.installedGpus)} GPUs. Loan contribution ${moneyRange(funding!.low.loan, funding!.high.loan)} at ${loanPercent}% LTV. Equity contribution ${moneyRange(funding!.low.equity, funding!.high.equity)}.` : "Estimate unavailable. Check your inputs."}</div>
      </div>
    </div>

    <noscript><p>Enable JavaScript to change the inputs and recalculate this demo estimate.</p></noscript>
  </section>;
}
