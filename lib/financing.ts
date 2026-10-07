export const enquiryRoles = ["Operator", "Compute buyer", "Broker or advisor"] as const;
export const offtakeStatuses = ["Exploring", "In discussion", "LOI", "Signed contract"] as const;
export type FinancingEnquiry = { name: string; company: string; email: string; role: string; amount: string; hardware: string; location: string; timeline: string; offtake: string; details: string; website: string };
export const enquiryDefaults: FinancingEnquiry = { name: "", company: "", email: "", role: "", amount: "", hardware: "", location: "", timeline: "", offtake: "", details: "", website: "" };

export function parseEnquiry(input: unknown): FinancingEnquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  const limits = { name: 120, company: 160, email: 200, role: 80, amount: 300, hardware: 200, location: 200, timeline: 200, offtake: 80, details: 1500, website: 200 };
  const data = { ...enquiryDefaults };
  for (const key of Object.keys(limits) as (keyof FinancingEnquiry)[]) {
    if (raw[key] !== undefined && typeof raw[key] !== "string") return null;
    data[key] = ((raw[key] as string | undefined) ?? "").trim();
    if (data[key].length > limits[key]) return null;
  }
  if (!data.name || !data.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return null;
  if ((data.role && !enquiryRoles.some(role => role === data.role)) || (data.offtake && !offtakeStatuses.some(status => status === data.offtake)) || data.website) return null;
  return data;
}

export function enquiryEmail(data: FinancingEnquiry) {
  return ["New GPU financing enquiry", "", `Name: ${data.name}`, `Company: ${data.company}`, `Work email: ${data.email}`, "", `Your role: ${data.role || "Not specified"}`, `GPU model / quantity: ${data.hardware || "Not specified"}`, `Deployment location: ${data.location || "Not specified"}`, `Financing need: ${data.amount || "Not specified"}`, `Expected deployment timeline: ${data.timeline || "Not specified"}`, `Offtake status: ${data.offtake || "Not specified"}`, "", "Project description", data.details || "No additional details provided."].join("\n");
}

export function financingIsConfigured() {
  const { RESEND_API_KEY: key, FINANCING_EMAIL_FROM: from, FINANCING_EMAIL_TO: to } = process.env;
  const address = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  const sender = from?.match(/<([^<>]+)>$/)?.[1] ?? from;
  return Boolean(key?.trim() && sender && address.test(sender) && to && address.test(to) && ![sender, to].some(value => value?.toLowerCase().endsWith("@circuit.credit")));
}
