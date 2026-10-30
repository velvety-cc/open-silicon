export type Amortization = "straight-line" | "bullet";

export function calculateCashFlows(amount: number, months: number, annualCoupon: number, amortization: Amortization) {
  const principalCents = Math.round(amount * 100);
  if (!Number.isSafeInteger(principalCents) || principalCents <= 0 || !Number.isInteger(months) || months <= 0 || !Number.isFinite(annualCoupon) || annualCoupon < 0 || !["straight-line", "bullet"].includes(amortization)) {
    throw new RangeError("Invalid cash flow inputs");
  }
  let outstanding = principalCents;
  const base = Math.floor(principalCents / months);
  const remainder = principalCents % months;
  const rows = [];
  // Work in cents. Distribute rounding residuals without leaving principal at maturity.
  for (let month = 1; month <= months; month++) {
    const interest = Math.round(outstanding * annualCoupon / 100 / 12);
    const principal = amortization === "bullet" ? (month === months ? outstanding : 0) : base + (month <= remainder ? 1 : 0);
    rows.push({ month, opening: outstanding, principal, interest, total: principal + interest, closing: outstanding - principal });
    outstanding -= principal;
  }
  const interest = rows.reduce((sum, row) => sum + row.interest, 0);
  return { rows, principal: principalCents, interest, total: principalCents + interest };
}

export function parseInvestment(value: string): number | null {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value.trim())) return null;
  const amount = Number(value);
  return amount > 0 && Number.isSafeInteger(Math.round(amount * 100)) ? amount : null;
}
