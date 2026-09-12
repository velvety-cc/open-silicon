# GPU financing enquiries

`/gpu-financing` uses Tailwind CSS, shadcn primitives, and React Hook Form. The form posts to `/api/financing`; the server sends the enquiry through Resend. No CRM or client-side API key is required.

Configure these server-side environment variables locally in `.env.local` and in the hosting environment:

```dotenv
RESEND_API_KEY=your_resend_api_key
FINANCING_EMAIL_FROM=Open Silicon <enquiries@your-verified-domain.com>
FINANCING_EMAIL_TO=your-receiving-address@example.com
```

Use a verified Resend sender. The recipient is fixed by server configuration, and Reply-To is the validated customer email. Restart the local server after configuring the variables. Never commit `.env.local` or API keys.

The endpoint validates fields, limits input lengths, rejects a filled honeypot, checks same-origin browser requests, and uses Resend idempotency keys to avoid duplicate emails when the same enquiry is retried. Failed requests preserve the customer's fields. Missing configuration returns 503 and the interface displays a retry/contact message; it never displays a false success. A success confirms Resend accepted the email, not final inbox delivery.

Before production traffic, configure host-level rate limiting on POST `/api/financing` (for example a Vercel Firewall rate limit) to limit automated abuse across server instances. The honeypot and origin check are not a substitute for rate limiting.

References:
- https://resend.com/docs/send-with-nextjs
- https://resend.com/docs/api-reference/emails/send-email
