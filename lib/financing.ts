export const enquiryInterests = ["Providing capital", "Seeking capital"] as const;
export type FinancingEnquiry = { interest: string; name: string; email: string; company: string; message: string; _gotcha: string };
export const enquiryDefaults: FinancingEnquiry = { interest: "", name: "", email: "", company: "", message: "", _gotcha: "" };
// Public submission endpoint for OpenSilicon Website Inquiry; no API key is needed.
export const formcarryEndpoint = "https://formcarry.com/s/Z5g0C_SSqMR";

export function parseEnquiry(input: unknown): FinancingEnquiry | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  const limits = { interest: 80, name: 120, email: 200, company: 160, message: 1500, _gotcha: 200 };
  const data = { ...enquiryDefaults };
  for (const key of Object.keys(limits) as (keyof FinancingEnquiry)[]) {
    if (raw[key] !== undefined && typeof raw[key] !== "string") return null;
    data[key] = ((raw[key] as string | undefined) ?? "").trim();
    if (data[key].length > limits[key]) return null;
  }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return null;
  if (!enquiryInterests.some(interest => interest === data.interest) || data._gotcha) return null;
  return data;
}

export async function sendEnquiry(input: unknown): Promise<void> {
  const data = parseEnquiry(input);
  if (!data) throw new Error("Check your project details and try again.");
  const failure = "We couldn’t confirm your enquiry. Your details are still here. Please try again.";
  // Called from the browser so Formcarry sees the visitor's IP, not our server's.
  const response = await fetch(formcarryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(15000),
  }).catch(() => { throw new Error(failure); });
  if (response.status === 429) throw new Error("Please wait 15 seconds before sending another enquiry. Your details are still here.");
  if (response.status === 401) throw new Error("Enquiries are temporarily unavailable. Your details are still here. Please try again later.");
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok || !result || typeof result !== "object" || !("code" in result) || result.code !== 200 || !("status" in result) || result.status !== "success") throw new Error(failure);
}
