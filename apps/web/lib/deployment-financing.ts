// Loan tiers apply to GPU equipment; equity covers the remaining project budget.
export const loanContributionTiers = [60, 70, 80] as const;

function cents(value: number, label: string, allowZero = false) {
  const result = Math.round(value * 100);
  if (!Number.isFinite(value) || value < 0 || (!allowZero && result <= 0) || !Number.isSafeInteger(result)) {
    throw new RangeError(`Enter a valid ${label}.`);
  }
  return result;
}

export function estimateDeploymentFunding(input: { equipmentValue: number; capitalBudget: number; loanPercent: number }) {
  const equipmentCents = cents(input.equipmentValue, "equipment value");
  const budgetCents = cents(input.capitalBudget, "capital budget");
  if (equipmentCents > budgetCents) throw new RangeError("The capital budget must cover the equipment value.");
  if (!loanContributionTiers.some(tier => tier === input.loanPercent)) throw new RangeError("Choose a loan contribution of 60%, 70% or 80%.");
  const loanCents = Math.round(equipmentCents * input.loanPercent / 100);
  return { loan: loanCents / 100, equity: (budgetCents - loanCents) / 100, loanPercent: input.loanPercent };
}
