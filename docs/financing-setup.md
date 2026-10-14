# GPU financing enquiries

The `/contact` page keeps its React Hook Form fields and shared Input, Label, Textarea and Button components. It is connected to **OpenSilicon Website Inquiry**, form ID `Z5g0C_SSqMR`.

The introduction follows About's editorial tone: “Capital for Tomorrow’s Intelligence” and “Discover Capital Partnerships and Financing for AI Infrastructure”. The heading uses the smaller 36–48px section role and the description is 18px. It overlays the full-resolution `contact-datacenter-8k.webp` (7680 × 4320, served directly), alongside a light-gray form surface headed “Talk to OpenSilicon”. The approved desktop split composition sits beneath the fixed white header, with a 760px minimum main height. The full form stays vertically centered; shared grid rows align the introduction’s heading with “Talk to OpenSilicon” while keeping flexible space above and below. On mobile the panels use normal stacked flow. The introduction starts directly with the two-line desktop heading (“Capital for” / “Tomorrow’s Intelligence”); its Contact eyebrow is removed. The unchanged homepage Footer follows in normal document flow. The frame fills at least the viewport height, with spare space assigned to the main region so there is no blank canvas below the footer; longer pages scroll naturally. On mobile the image and form stack as one composition without outer card margins. Field borders and audience choices are fine bottom rules; instructional and sensitive-contract notices are removed. Field labels carry required/optional guidance and the action remains “Submit”.

## Connection

The public endpoint is configured in `lib/financing.ts`:

```text
https://formcarry.com/s/Z5g0C_SSqMR
```

The client calls `sendEnquiry` directly from the browser. It sends JSON with `Content-Type: application/json` and `Accept: application/json`, following [Formcarry's front-end contract](https://formcarry.com/llms.txt). No API key, receiving-email environment variable or backend proxy is needed. The previous `/api/financing` route has been removed. Formcarry notifications, recipients and other service settings remain in the Formcarry dashboard.

Browser submission preserves each visitor's IP for Formcarry's rate limiting. The five visible fields are `interest`, `name`, `email`, `company` and `message`. Interest is required and starts unselected: **Providing capital** covers LPs and capital providers; **Seeking capital** covers operators, offtakers, AIDCs and NeoClouds. Name and email are required; company and message are optional. The message placeholder follows the selected interest without replacing entered text. Detailed GPU, financing amount, location, timeline and offtake questions are reserved for follow-up. The hidden spam trap uses Formcarry's reserved `_gotcha` field.

## Submission behavior

- Field validation and length limits run before sending, including the two permitted interests and the honeypot.
- While sending, fields and the button are disabled; an in-flight guard prevents repeated clicks.
- Success requires both a successful HTTP status and JSON `code: 200`, `status: "success"`. Only then does the form reset and show confirmation.
- Failed requests preserve the visitor's entries. A rate-limited response asks the visitor to wait 15 seconds. A paused or missing form shows an unavailable message and leaves retry possible.
- Provider acknowledgements confirm stored submissions, not final inbox delivery. A retry after a lost acknowledgement can create another submission.

## Verification

Unit tests mock Formcarry and never create real submissions. `scripts/verify-site.mjs` checks the form action and honeypot without posting. A live browser test must be explicitly authorized; use clearly marked synthetic details and verify the resulting record in the Formcarry dashboard.

On October 14, 2026, an authorized live test of the earlier, ten-field form was sent from the project's `/contact` page with marker `OS-FORMCARRY-20261014-01` and email `formcarry-test@example.com`. The page showed its success confirmation, and the Formcarry dashboard displayed all ten business fields in the stored record. The `_gotcha` field was not stored, as expected. This verifies submission storage; final notification inbox delivery was not checked. The subsequent five-field simplification retains the same endpoint; its tests mock both capital audiences without adding another live submission.
