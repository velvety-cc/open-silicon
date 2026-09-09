"use client";

import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function YieldModel() {
  const [capital, setCapital] = useState(250000);
  const [months, setMonths] = useState(18);
  const targetApr = 10.4;

  const projected = useMemo(
    () => capital * (targetApr / 100) * (months / 12),
    [capital, months],
  );

  const capitalProgress = ((capital - 50000) / (1000000 - 50000)) * 100;
  const durationProgress = ((months - 6) / (36 - 6)) * 100;

  return (
    <div className="model-card">
      <div className="model-topline">
        <span>Indicative credit model</span>
        <span className="live-dot"><i /> Live parameters</span>
      </div>

      <div className="model-balance">
        <p>Capital allocation</p>
        <strong>{currency.format(capital)}</strong>
      </div>

      <label className="range-field">
        <span>Commitment size</span>
        <input
          type="range"
          min="50000"
          max="1000000"
          step="25000"
          value={capital}
          style={{ "--range-progress": `${capitalProgress}%` } as React.CSSProperties}
          onInput={(event) => setCapital(Number(event.currentTarget.value))}
        />
        <small><span>$50k</span><span>$1m</span></small>
      </label>

      <label className="range-field">
        <span>Duration <b>{months} months</b></span>
        <input
          type="range"
          min="6"
          max="36"
          step="3"
          value={months}
          style={{ "--range-progress": `${durationProgress}%` } as React.CSSProperties}
          onInput={(event) => setMonths(Number(event.currentTarget.value))}
        />
        <small><span>6m</span><span>36m</span></small>
      </label>

      <div className="model-output">
        <div>
          <span>Target APR</span>
          <strong>{targetApr}%</strong>
        </div>
        <div>
          <span>Projected yield</span>
          <strong>{currency.format(projected)}</strong>
        </div>
      </div>

      <a className="dark-button" href="#access">Explore capital vaults <span>→</span></a>
      <p className="model-note">Illustrative only. Returns are not guaranteed and are subject to credit and protocol risk.</p>
    </div>
  );
}
