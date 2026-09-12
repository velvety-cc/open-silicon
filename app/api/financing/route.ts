import { enquiryEmail, parseEnquiry } from "@/lib/financing";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 16000) return Response.json({ error: "Request too large." }, { status: 413 });
  let data;
  try {
    const body = await request.text();
    if (body.length > 16000) return Response.json({ error: "Request too large." }, { status: 413 });
    data = parseEnquiry(JSON.parse(body));
  } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (!data) return Response.json({ error: "Check your project details and try again." }, { status: 400 });
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[a-zA-Z0-9-]{16,80}$/.test(key)) return Response.json({ error: "Invalid request identifier." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FINANCING_EMAIL_FROM;
  const to = process.env.FINANCING_EMAIL_TO;
  if (!apiKey || !from || !to) return Response.json({ error: "Enquiries are temporarily unavailable. Please try again later." }, { status: 503 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `financing-${key}` },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: "Open Silicon — GPU financing enquiry", text: enquiryEmail(data) }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return Response.json({ error: "Unable to send your enquiry. Please try again." }, { status: 502 });
    const result = await response.json();
    if (typeof result.id !== "string") return Response.json({ error: "Unable to confirm your enquiry. Please try again." }, { status: 502 });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Unable to send your enquiry. Please try again." }, { status: 502 }); }
}
