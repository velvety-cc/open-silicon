# GPU financing enquiries

The independent `/contact` page uses React Hook Form with the shared Input, Label, Textarea and Button components, plus native optional selects. The existing `/api/financing` endpoint sends text enquiries through Resend.

## Required receiving configuration

The following server-side settings must be supplied with confirmed values in `.env.local` or the eventual host configuration:

- `RESEND_API_KEY`: a valid Resend API key.
- `FINANCING_EMAIL_FROM`: a verified sender, optionally in `Open Silicon <address>` format.
- `FINANCING_EMAIL_TO`: the confirmed recipient address.

No replacement recipient or public contact email was supplied. The retired domain is rejected in receiving configuration. Never commit credentials. Restart the server after changing these settings.

The recipient comes only from server configuration. Reply-To uses the validated customer's work email. All enquiry fields are included in the plain-text email: name, company, work email, role, GPU model and quantity, deployment location, free-text financing need, expected deployment timeline, offtake status and project description.

Only name, company and work email are required. Optional fields remain unspecified when empty; no signed contract is implied. No upload is required.

## States and retry behavior

- Missing or invalid configuration: Contact displays an unavailable notice and disables submission; direct valid POST requests return 503. Fields remain editable. No success is simulated.
- Sending: fields and submit action are disabled, and a synchronous in-flight guard prevents repeated clicks.
- Failure, timeout or uncertain response: the fields are retained. Retrying an identical payload reuses its idempotency key so the provider can deduplicate it.
- Accepted: the provider must return a successful response with a nonempty message ID; the client must also receive `ok: true`. Only then are fields reset and a confirmation shown.

The confirmation means the enquiry service accepted the message. It does not prove final inbox delivery. If the provider accepts a request but the browser loses the acknowledgement, retry uses the same key rather than creating a new request identity. The provider controls the retention period for this deduplication.

Validation applies both in the browser and server, with maximum lengths, typed fields, role/status enums, honeypot, request identity, JSON-size limits and same-origin browser checks. The origin check uses actual request Host and scheme because Next can normalize its internal bind hostname.

## Before launch

1. Confirm the responsible legal entity, privacy information, receiving address and verified sending identity.
2. Configure the real service and restart/rebuild as appropriate.
3. Submit an authorized real test through the website and verify actual receipt at the intended inbox, including every optional field and Reply-To.
4. Check provider failure, retries and acknowledgement states against the live configuration.
5. Apply host-level request throttling for the public endpoint. Keep any proxy that terminates TLS configured to provide the correct original scheme.

No real inbox-delivery test has been performed because the receiving service and address are missing.
