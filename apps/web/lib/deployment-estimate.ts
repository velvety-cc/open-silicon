// Planning inputs for the deployment calculator. Prices are supplied per
// complete system; delivery windows remain illustrative planning assumptions.
export const demoGpuModels = [
  { id: "b200", label: "B200", gpusPerServer: 8, unit: "server", serverPriceMin: 535_000, serverPriceMax: 535_000, deliveryMin: 8, deliveryMax: 12 },
  { id: "b300", label: "B300", gpusPerServer: 8, unit: "server", serverPriceMin: 600_000, serverPriceMax: 600_000, deliveryMin: 8, deliveryMax: 12 },
  { id: "gb200", label: "GB200 NVL72", gpusPerServer: 72, unit: "rack", serverPriceMin: 5_000_000, serverPriceMax: 5_000_000, deliveryMin: 10, deliveryMax: 16 },
  { id: "gb300", label: "GB300 NVL72", gpusPerServer: 72, unit: "rack", serverPriceMin: 6_000_000, serverPriceMax: 6_000_000, deliveryMin: 10, deliveryMax: 16 },
] as const;

// Server-named inputs refer to one complete deployment unit: an 8-GPU
// B200/B300 server or a 72-GPU GB200/GB300 NVL72 rack.
export type DeploymentInputs = {
  requestedGpus: number;
  gpusPerServer: number;
  serverPriceMin: number;
  serverPriceMax: number;
  infrastructurePercent: number;
  contingencyPercent: number;
  deliveryMin: number;
  deliveryMax: number;
  siteMin: number;
  siteMax: number;
  installationMin: number;
  installationMax: number;
};

export function estimateDeployment(input: DeploymentInputs) {
  const { requestedGpus, gpusPerServer } = input;
  if (!Number.isInteger(requestedGpus) || requestedGpus < 1 || requestedGpus > 65_536) {
    throw new RangeError("Enter a whole GPU count from 1 to 65,536.");
  }
  if (!Number.isInteger(gpusPerServer) || gpusPerServer < 1 || gpusPerServer > 72) {
    throw new RangeError("The deployment unit needs a valid GPU count.");
  }
  for (const [min, max] of [[input.serverPriceMin, input.serverPriceMax]]) {
    if (![min, max].every(n => Number.isFinite(n) && n >= 1 && n <= 10_000_000) || min > max) {
      throw new RangeError("Enter a system price range from $1 to $10,000,000, with the lower value first.");
    }
  }
  for (const percent of [input.infrastructurePercent, input.contingencyPercent]) {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new RangeError("Enter allowances between 0% and 100%.");
    }
  }
  for (const [min, max] of [
    [input.deliveryMin, input.deliveryMax],
    [input.siteMin, input.siteMax],
    [input.installationMin, input.installationMax],
  ]) {
    if (![min, max].every(n => Number.isFinite(n) && n >= 0 && n <= 260) || min > max) {
      throw new RangeError("Enter week ranges from 0 to 260, with the lower value first.");
    }
  }

  const servers = Math.ceil(requestedGpus / gpusPerServer);
  const budget = (serverPrice: number) => {
    const equipmentCents = servers * Math.round(serverPrice * 100);
    const infrastructureCents = Math.round(equipmentCents * input.infrastructurePercent / 100);
    const contingencyCents = Math.round((equipmentCents + infrastructureCents) * input.contingencyPercent / 100);
    return {
      equipment: equipmentCents / 100,
      infrastructure: infrastructureCents / 100,
      contingency: contingencyCents / 100,
      total: (equipmentCents + infrastructureCents + contingencyCents) / 100,
    };
  };

  return {
    servers,
    installedGpus: servers * gpusPerServer,
    extraGpus: servers * gpusPerServer - requestedGpus,
    low: budget(input.serverPriceMin),
    high: budget(input.serverPriceMax),
    // Hardware delivery and site preparation run in parallel. Installation
    // starts only once both are ready; do not add the parallel durations.
    weeksMin: Math.max(input.deliveryMin, input.siteMin) + input.installationMin,
    weeksMax: Math.max(input.deliveryMax, input.siteMax) + input.installationMax,
  };
}
