export const financingPurposes = ["New GPU purchase", "Cluster expansion", "Existing asset financing", "Multi-year GPU leasing", "AIDC customer introductions", "Not sure yet"];
export const financingAmounts = ["Under $5M", "$5M–$25M", "$25M–$100M", "$100M+", "Not sure yet"];
export type FinancingEnquiry = { name: string; company: string; email: string; purpose: string; amount: string; hardware: string; location: string; details: string; website: string };
export const enquiryDefaults: FinancingEnquiry = { name: "", company: "", email: "", purpose: "", amount: "", hardware: "", location: "", details: "", website: "" };

export function parseEnquiry(input: unknown): FinancingEnquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  const limits = { name: 120, company: 160, email: 200, purpose: 80, amount: 40, hardware: 200, location: 200, details: 1500, website: 200 };
  const data = { ...enquiryDefaults };
  for (const key of Object.keys(limits) as (keyof FinancingEnquiry)[]) {
    if (raw[key] !== undefined && typeof raw[key] !== "string") return null;
    data[key] = ((raw[key] as string | undefined) ?? "").trim();
    if (data[key].length > limits[key]) return null;
  }
  if (!data.name || !data.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return null;
  if (!financingPurposes.includes(data.purpose) || (data.amount && !financingAmounts.includes(data.amount)) || data.website) return null;
  return data;
}

export function enquiryEmail(data: FinancingEnquiry) {
  return ["New GPU financing enquiry", "", `Name: ${data.name}`, `Company: ${data.company}`, `Email: ${data.email}`, "", `Financing purpose: ${data.purpose}`, `Financing need: ${data.amount || "Not sure yet"}`, `GPU model / quantity: ${data.hardware || "Not specified"}`, `Project location: ${data.location || "Not specified"}`, "", "Project details", data.details || "No additional details provided."].join("\n");
}
