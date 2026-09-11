"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { financingPurposes as purposes, financingAmounts as amounts, enquiryDefaults as defaults, type FinancingEnquiry as Enquiry } from "@/lib/financing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const controlClass = "min-h-12 w-full border-[#d6d6dc] bg-white p-3 font-[inherit] text-base shadow-none md:text-base";
const labelClass = "text-[length:var(--type-label)] leading-normal font-normal";
const fieldClass = "flex min-w-0 flex-col gap-2";

export default function FinancingForm() {
  const requestIdentity = useRef<{ payload: string; key: string } | null>(null);
  const inFlight = useRef(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Enquiry>({ defaultValues: defaults, mode: "onBlur" });
  const errorProps = (name: keyof Enquiry) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });
  const errorMessage = (name: keyof Enquiry) => errors[name] && <p id={`${name}-error`} className="text-[length:var(--type-label)] text-destructive">{errors[name]?.message}</p>;
  const requiredText = (message: string) => ({ validate: (value: string) => Boolean(value.trim()) || message });

  async function submitEnquiry(values: Enquiry) {
    if (inFlight.current) return;
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
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      reset(defaults);
      requestIdentity.current = null;
      requestAnimationFrame(() => document.getElementById("financing-success")?.focus());
    } catch { setStatus("error"); }
    finally { inFlight.current = false; }
  }

  return (
    <Card className="financing-form-card min-w-0 gap-0 border-[var(--line)] p-8 shadow-none max-[1100px]:p-6 max-[380px]:p-5"><CardContent className="p-0">
      <form className="financing-form" noValidate onSubmit={handleSubmit(submitEnquiry)} hidden={status === "success"} aria-busy={isSubmitting}>
        <div className="mb-8!"><h3 className="mb-2!">Your project</h3><span className="text-[length:var(--type-caption)] text-[#595959]">Required fields are marked *</span></div>
        <div hidden aria-hidden="true"><Label htmlFor="financing-website">Leave this field empty</Label><Input id="financing-website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
        <fieldset disabled={isSubmitting} className="m-0 grid min-w-0 grid-cols-2 gap-6 border-0 p-0 max-[1100px]:gap-x-4 max-[760px]:grid-cols-1">
          <div className={fieldClass}><Label className={labelClass} htmlFor="financing-name">Full name *</Label><Input className={controlClass} id="financing-name" autoComplete="name" aria-required="true" maxLength={120} placeholder="Your name" {...register("name", requiredText("Enter your name."))} {...errorProps("name")} />{errorMessage("name")}</div>
          <div className={fieldClass}><Label className={labelClass} htmlFor="financing-company">Company *</Label><Input className={controlClass} id="financing-company" autoComplete="organization" aria-required="true" maxLength={160} placeholder="Company name" {...register("company", requiredText("Enter your company name."))} {...errorProps("company")} />{errorMessage("company")}</div>
          <div className={`col-span-full ${fieldClass}`}><Label className={labelClass} htmlFor="financing-email">Work email *</Label><Input className={controlClass} id="financing-email" type="email" autoComplete="email" aria-required="true" maxLength={200} placeholder="you@company.com" {...register("email", { required: "Enter your work email.", validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address." })} {...errorProps("email")} />{errorMessage("email")}</div>
          <div className={fieldClass}><Label className={labelClass} htmlFor="financing-purpose">Financing purpose *</Label><Controller name="purpose" control={control} rules={{ required: "Choose a financing purpose." }} render={({ field }) => <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}><SelectTrigger ref={field.ref} onBlur={field.onBlur} className={controlClass} id="financing-purpose" aria-required="true" {...errorProps("purpose")}><SelectValue placeholder="Select a purpose" /></SelectTrigger><SelectContent>{purposes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>} />{errorMessage("purpose")}</div>
          <div className={fieldClass}><Label className={labelClass} htmlFor="financing-amount">Financing need</Label><Controller name="amount" control={control} render={({ field }) => <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}><SelectTrigger ref={field.ref} onBlur={field.onBlur} className={controlClass} id="financing-amount"><SelectValue placeholder="Select an amount" /></SelectTrigger><SelectContent>{amounts.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>} /></div>
          <div className={fieldClass}><Label className={labelClass} htmlFor="financing-hardware">GPU model & quantity</Label><Input className={controlClass} id="financing-hardware" maxLength={200} placeholder="e.g. 256 × H200" {...register("hardware")} /></div>
          <div className={fieldClass}><Label className={labelClass} htmlFor="financing-location">Project location</Label><Input className={controlClass} id="financing-location" maxLength={200} placeholder="City, country" {...register("location")} /></div>
          <div className={`col-span-full ${fieldClass}`}><Label className={labelClass} htmlFor="financing-details">Anything else we should know?</Label><Textarea className={`${controlClass} min-h-[120px] resize-y`} id="financing-details" rows={4} maxLength={1500} placeholder="Your timeline, project stage, or questions for our team" {...register("details")} /></div>
        </fieldset>
        <div className="mt-8! grid justify-items-start gap-4 [&>.ui-button]:max-[760px]:w-full">
          <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send enquiry"}</Button>

          {status === "error" && <p role="alert" className="text-[length:var(--type-label)] text-destructive">We couldn’t send your enquiry. Your details are still here. Please try again, or <a className="underline" href="mailto:credit@circuit.credit">email our team</a>.</p>}
        </div>
      </form>
      {status === "success" && <div id="financing-success" tabIndex={-1} role="status" className="mt-6! rounded-[var(--radius-card)] bg-[var(--accent-soft)] p-6"><h4 className="m-0 mb-2! text-[length:var(--type-emphasis)] font-medium">Thank you for sharing your project</h4><p className="text-[length:var(--type-label)]">Your enquiry has been sent. Our team will follow up using the email you provided.</p><Button className="mt-4" type="button" variant="link" onClick={() => { setStatus("idle"); requestAnimationFrame(() => document.getElementById("financing-name")?.focus()); }}>Discuss another project</Button></div>}
      <p className="mt-6! text-[length:var(--type-caption)] leading-relaxed text-[#595959]">Financing is subject to eligibility, credit review, and agreed documentation.</p>
    </CardContent></Card>
  );
}
