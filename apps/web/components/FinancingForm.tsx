"use client";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { enquiryInterests, enquiryDefaults as defaults, formcarryEndpoint, sendEnquiry, type FinancingEnquiry as Enquiry } from "@/lib/financing";
import { Button } from "@opensilicon/ui/button";
import { Input } from "@opensilicon/ui/input";
import { Label } from "@opensilicon/ui/label";
import { Textarea } from "@opensilicon/ui/textarea";

export default function FinancingForm() {
  const inFlight = useRef(false);
  const [submissionError, setSubmissionError] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<Enquiry>({ defaultValues: defaults, mode: "onBlur" });
  const interest = useWatch({ control, name: "interest" });
  const messagePlaceholder = interest === "Providing capital"
    ? "A little about your investment interests or what you’d like to discuss"
    : interest === "Seeking capital"
      ? "A little about your business and what you’re looking to finance"
      : "A sentence or two about what you’d like to discuss";
  const errorProps = (name: keyof Enquiry) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });
  const errorMessage = (name: keyof Enquiry) => errors[name] && <p id={`${name}-error`} className="field-error">{errors[name]?.message}</p>;
  const requiredText = (message: string) => ({ validate: (value: string) => Boolean(value.trim()) || message });

  async function submitEnquiry(values: Enquiry) {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("idle");
    setSubmissionError("");
    try {
      await sendEnquiry(values);
      setStatus("success");
      reset(defaults);
      requestAnimationFrame(() => document.getElementById("financing-success")?.focus());
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "We couldn’t confirm your enquiry. Your details are still here. Please try again.");
      setStatus("error");
    }
    finally { inFlight.current = false; }
  }

  return <div className="contact-form-panel">
    <form className="financing-form" action={formcarryEndpoint} method="POST" noValidate onSubmit={handleSubmit(submitEnquiry)} hidden={status === "success"} aria-busy={isSubmitting}>
      <div className="contact-form-heading"><h2>Talk to OpenSilicon</h2></div>
      <div hidden aria-hidden="true"><Label htmlFor="financing-gotcha">Leave this field empty</Label><Input id="financing-gotcha" tabIndex={-1} autoComplete="off" {...register("_gotcha")} /></div>
      <fieldset disabled={isSubmitting} className="contact-fields">
        <fieldset className="contact-interest full-width" aria-describedby={errors.interest ? "interest-error" : undefined}>
          <legend>I’m interested in *</legend>
          <div className="contact-interest-options">
            {enquiryInterests.map((option, index) => <label className="contact-interest-option" key={option} htmlFor={`financing-interest-${index}`}>
              <input id={`financing-interest-${index}`} type="radio" value={option} aria-required="true" {...register("interest", { required: "Select how you’d like to connect." })} {...errorProps("interest")} />
              <span><span className="contact-interest-title">{option}</span><span className="contact-interest-description">{index === 0 ? "LPs and capital providers" : "Operators, offtakers, AIDCs and NeoClouds"}</span></span>
            </label>)}
          </div>
          {errorMessage("interest")}
        </fieldset>
        <div className="contact-field"><Label htmlFor="financing-name">Name *</Label><Input id="financing-name" autoComplete="name" aria-required="true" maxLength={120} placeholder="Jensen Huang" {...register("name", requiredText("Enter your name."))} {...errorProps("name")} />{errorMessage("name")}</div>
        <div className="contact-field"><Label htmlFor="financing-email">Email *</Label><Input id="financing-email" type="email" autoComplete="email" aria-required="true" maxLength={200} placeholder="you@company.com" {...register("email", { required: "Enter your email.", validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address." })} {...errorProps("email")} />{errorMessage("email")}</div>
        <div className="contact-field full-width"><Label htmlFor="financing-company">Company <span className="contact-optional">(optional)</span></Label><Input id="financing-company" autoComplete="organization" maxLength={160} {...register("company")} /></div>
        <div className="contact-field full-width"><Label htmlFor="financing-message">How can we help? <span className="contact-optional">(optional)</span></Label><Textarea id="financing-message" rows={3} maxLength={1500} placeholder={messagePlaceholder} {...register("message")} /></div>
      </fieldset>
      <div className="contact-form-actions"><Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Submit"}</Button>{status === "error" && <p role="alert" className="field-error">{submissionError}</p>}</div>
    </form>
    {status === "success" && <div id="financing-success" tabIndex={-1} role="status" className="form-success"><h2>Thank you for getting in touch.</h2><p>Your message has been received.</p><Button type="button" variant="link" onClick={() => { setStatus("idle"); requestAnimationFrame(() => document.getElementById("financing-interest-0")?.focus()); }}>Send another message</Button></div>}
  </div>;
}
