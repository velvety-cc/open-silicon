"use client";

import { useState, type CSSProperties } from "react";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function YieldModel() {
  const [capital, setCapital] = useState(250000);
  const [months, setMonths] = useState(18);
  const targetApr = 10.4;
  const projected = capital * (targetApr / 100) * (months / 12);
  const capitalProgress = ((capital - 50000) / 950000) * 100;
  const durationProgress = ((months - 6) / 30) * 100;

  return (
    <div className="model-card">
      <div className="model-topline"><span>Explore your allocation</span><span className="model-tag">Illustrative model</span></div>
      <div className="model-balance"><p>Capital allocation</p><strong>{currency.format(capital)}</strong><span>USD</span></div>
      <label className="range-field"><span>Commitment size</span><input type="range" min="50000" max="1000000" step="25000" value={capital} aria-valuetext={currency.format(capital)} style={{ "--range-progress": `${capitalProgress}%` } as CSSProperties} onChange={(event) => setCapital(Number(event.currentTarget.value))} /><small><span>$50,000</span><span>$1,000,000</span></small></label>
      <label className="range-field"><span>Duration <b>{months} months</b></span><input type="range" min="6" max="36" step="3" value={months} aria-valuetext={`${months} months`} style={{ "--range-progress": `${durationProgress}%` } as CSSProperties} onChange={(event) => setMonths(Number(event.currentTarget.value))} /><small><span>6 months</span><span>36 months</span></small></label>
      <div className="model-output" aria-live="polite" aria-atomic="true"><div><span>Projected yield</span><strong>{currency.format(projected)}</strong></div><div><span>Target APR</span><strong>{targetApr}<small>%</small></strong></div></div>
      <div className="model-total"><span>Principal + projected yield</span><strong>{currency.format(capital + projected)}</strong></div>
      <a className="button button-dark" href="mailto:hello@circuit.credit?subject=Capital%20allocation%20enquiry">Discuss an allocation <span className="arrow" aria-hidden="true">↗</span></a>
      <details className="model-assumptions"><summary>How this estimate works <span aria-hidden="true">+</span></summary><p>Principal × 10.4% annual rate × duration ÷ 12. Simple interest, without compounding. This illustration excludes fees, taxes and credit losses. Returns are not guaranteed.</p></details>
    </div>
  );
}
