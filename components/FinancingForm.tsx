"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { enquiryRoles, offtakeStatuses, enquiryDefaults as defaults, type FinancingEnquiry as Enquiry } from "@/lib/financing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FinancingForm({ available }: { available: boolean }) {
  const requestIdentity = useRef<{ payload: string; key: string } | null>(null);
  const inFlight = useRef(false);
  const [unavailable, setUnavailable] = useState(!available);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Enquiry>({ defaultValues: defaults, mode: "onBlur" });
  const errorProps = (name: keyof Enquiry) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });
  const errorMessage = (name: keyof Enquiry) => errors[name] && <p id={`${name}-error`} className="field-error">{errors[name]?.message}</p>;
  const requiredText = (message: string) => ({ validate: (value: string) => Boolean(value.trim()) || message });

  async function submitEnquiry(values: Enquiry) {
    if (inFlight.current || unavailable) return;
    inFlight.current = true;
    setStatus("idle");
    try {
      const payload = JSON.stringify(values);
      if (requestIdentity.current?.payload !== payload) requestIdentity.current = { payload, key: crypto.randomUUID() };
      const response = await fetch("/api/financing", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": requestIdentity.current.key },
        body: payload,
        signal: AbortSignal.timeout(15000),
      });
      if (response.status === 503) { setUnavailable(true); return; }
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) throw new Error("Enquiry not confirmed");
      setStatus("success");
      reset(defaults);
      requestIdentity.current = null;
      requestAnimationFrame(() => document.getElementById("financing-success")?.focus());
    } catch { setStatus("error"); }
    finally { inFlight.current = false; }
  }

  return <div className="contact-form-card">
    <form className="financing-form" noValidate onSubmit={handleSubmit(submitEnquiry)} hidden={status === "success"} aria-busy={isSubmitting}>
      <div className="contact-form-heading"><h2>Your project</h2><p>Required fields are marked *</p></div>
      {unavailable && <div className="form-unavailable" role="status"><strong>Enquiries are temporarily unavailable.</strong><p>This preview is not accepting submissions. Please return once the enquiry service is available.</p></div>}
      <div hidden aria-hidden="true"><Label htmlFor="financing-website">Leave this field empty</Label><Input id="financing-website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
      <fieldset disabled={isSubmitting} className="contact-fields">
        <div className="contact-field"><Label htmlFor="financing-name">Name *</Label><Input id="financing-name" autoComplete="name" aria-required="true" maxLength={120} {...register("name", requiredText("Enter your name."))} {...errorProps("name")} />{errorMessage("name")}</div>
        <div className="contact-field"><Label htmlFor="financing-company">Company *</Label><Input id="financing-company" autoComplete="organization" aria-required="true" maxLength={160} {...register("company", requiredText("Enter your company name."))} {...errorProps("company")} />{errorMessage("company")}</div>
        <div className="contact-field full-width"><Label htmlFor="financing-email">Work email *</Label><Input id="financing-email" type="email" autoComplete="email" aria-required="true" maxLength={200} placeholder="you@company.com" {...register("email", { required: "Enter your work email.", validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address." })} {...errorProps("email")} />{errorMessage("email")}</div>
        <div className="contact-field full-width"><Label htmlFor="financing-role">Your role</Label><select id="financing-role" {...register("role")}><option value="">Select a role (optional)</option>{enquiryRoles.map(role => <option key={role} value={role}>{role}</option>)}</select></div>
        <div className="contact-field"><Label htmlFor="financing-hardware">GPU model and quantity</Label><Input id="financing-hardware" maxLength={200} placeholder="Model and number of GPUs" {...register("hardware")} /></div>
        <div className="contact-field"><Label htmlFor="financing-location">Deployment location</Label><Input id="financing-location" maxLength={200} placeholder="City, country" {...register("location")} /></div>
        <div className="contact-field full-width"><Label htmlFor="financing-amount">Financing need</Label><Input id="financing-amount" maxLength={300} placeholder="Amount, currency and how it would be used" {...register("amount")} /></div>
        <div className="contact-field"><Label htmlFor="financing-timeline">Expected deployment timeline</Label><Input id="financing-timeline" maxLength={200} placeholder="Your expected timing" {...register("timeline")} /></div>
        <div className="contact-field"><Label htmlFor="financing-offtake">Offtake status</Label><select id="financing-offtake" {...register("offtake")}><option value="">Select a status (optional)</option>{offtakeStatuses.map(item => <option key={item} value={item}>{item}</option>)}</select></div>
        <div className="contact-field full-width"><Label htmlFor="financing-details">Project description</Label><Textarea id="financing-details" rows={4} maxLength={1500} placeholder="A short overview of your project or questions" {...register("details")} /></div>
      </fieldset>
      <div className="contact-form-actions"><Button type="submit" size="lg" disabled={isSubmitting || unavailable} aria-describedby={unavailable ? "submission-unavailable" : undefined}>{isSubmitting ? "Sending…" : "Send enquiry"}</Button>{unavailable && <p id="submission-unavailable">Submission is currently unavailable.</p>}{status === "error" && <p role="alert" className="field-error">We couldn’t confirm your enquiry. Your details are still here. Please try again.</p>}</div>
    </form>
    {status === "success" && <div id="financing-success" tabIndex={-1} role="status" className="form-success"><h2>Thank you for sharing your project.</h2><p>The enquiry service has accepted your message for sending to our team.</p><Button type="button" variant="link" onClick={() => { setStatus("idle"); requestAnimationFrame(() => document.getElementById("financing-name")?.focus()); }}>Discuss another project</Button></div>}
    <p className="form-note">An enquiry starts a conversation. Financing is subject to project review, agreed terms and documentation.</p>
  </div>;
}
