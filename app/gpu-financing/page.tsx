import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinancingForm from "@/components/FinancingForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "GPU Financing — Open Silicon",
  description: "Explore financing for GPU purchases, infrastructure expansion, and existing compute assets. Tell Open Silicon about your project.",
};

const scenarios = [
  { number: "01", title: "Acquire your next fleet", description: "Planning a hardware purchase? Bring your equipment plan, supplier quote, and deployment timeline.", detail: "New GPU purchases" },
  { number: "02", title: "Build more capacity", description: "Adding to an existing site? Connect your next phase of compute with the capital it needs.", detail: "Cluster expansion" },
  { number: "03", title: "Put your assets to work", description: "Already operating a fleet? Discuss financing against your existing hardware and contracted revenue.", detail: "Existing asset financing" },
];
const steps = [
  { title: "Share your project", description: "Tell us about your fleet, financing needs, and timeline." },
  { title: "Explore the fit", description: "We review the assets, deployment plan, and revenue profile with you." },
  { title: "Define the terms", description: "Complete diligence and agree on a structure for your project." },
  { title: "Move into deployment", description: "Funding follows the agreed documentation and project milestones." },
];
const faqs = [
  { question: "Who is this for?", answer: "Neoclouds, data center operators, and other businesses building or operating GPU infrastructure. Share your project so we can assess whether it fits our financing approach." },
  { question: "Can I discuss both new and existing equipment?", answer: "Yes. Tell us whether you are purchasing hardware, expanding a deployment, or exploring financing for an existing fleet. The available structure depends on the equipment, ownership, contracts, and project review." },
  { question: "What should I prepare?", answer: "Start with your GPU model and quantity, project location, approximate financing need, and deployment timeline. Supplier quotes, hardware inventories, and compute tenant contracts can help with the subsequent review. You do not need to upload documents to make an initial enquiry." },
  { question: "What determines the financing terms?", answer: "Terms depend on the hardware and its value, project stage, compute tenant and revenue contracts, location, and the outcome of credit diligence. Rates, facility size, and repayment terms are discussed for each project." },
  { question: "Can I get in touch while I am still planning?", answer: "Yes. Select “Not sure yet” where needed and describe what you are planning. An initial conversation can help identify the information needed for a financing review." },
  { question: "Does an enquiry commit me to a loan?", answer: "No. An enquiry starts a conversation. Any financing is subject to eligibility, diligence, agreed terms, and definitive documentation." },
];

export default function GPUFinancing() {
  return (
    <div id="top" className="financing-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header financing />
      <main id="main">
        <section className="financing-hero container grid min-h-[790px] grid-cols-[1.2fr_1fr] items-center gap-16 pt-36 pb-16 max-[1100px]:min-h-[740px] max-[1100px]:gap-8 max-[760px]:min-h-0 max-[760px]:grid-cols-1 max-[760px]:gap-12 max-[760px]:pb-12 min-[1600px]:min-h-[850px]" aria-labelledby="financing-title">
          <div className="financing-hero-copy">
            <p className="mb-6! text-[length:var(--type-label)] font-medium">GPU Financing</p>
            <h1 id="financing-title" className="mt-0! text-[length:var(--type-display)]! leading-[var(--leading-heading)]! tracking-[var(--tracking-heading)]! max-[760px]:text-[length:var(--type-hero)]! max-[380px]:text-[length:var(--type-display)]!">Capital for what<br />you’re building.</h1>
            <p className="mt-6! max-w-[460px] text-[length:var(--type-emphasis)] text-[#595959]">From your next GPU purchase to your next phase of growth. Financing built around the machines, contracts, and infrastructure behind your business.</p>
            <div className="mt-8! flex flex-wrap items-center gap-6 max-[380px]:gap-4">
              <Button asChild size="lg"><a href="#project">Discuss your project</a></Button>
              <Button asChild variant="link"><a href="#process">How it works</a></Button>
            </div>
          </div>
          <figure className="financing-product w-full max-w-[440px] justify-self-center text-center max-[760px]:max-w-[340px]">
            <Image className="block h-[540px] w-full object-contain max-[1100px]:h-[480px] max-[760px]:h-[400px]" src="/compute-rack.webp" alt="Graphite GPU server rack with stacked compute hardware" width={1024} height={1536} sizes="(max-width: 760px) 80vw, 440px" preload quality={90} />
            <figcaption className="mt-4! text-[length:var(--type-label)] text-[#595959]">Real infrastructure. Room to grow.</figcaption>
          </figure>
        </section>

        <section className="container section-space border-t border-[var(--line)]" aria-labelledby="scenarios-title">
          <div className="mb-16! flex items-end justify-between gap-12 max-[760px]:mb-10! max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6"><h2 id="scenarios-title">Your next move.<br />A clearer path to capital.</h2><p className="max-w-[330px] text-[#595959]">Start with where you are.<br />We’ll explore what comes next.</p></div>
          <div className="grid grid-cols-3 gap-12 max-[1100px]:gap-8 max-[760px]:grid-cols-1 max-[760px]:gap-10">
            {scenarios.map((scenario) => <article key={scenario.number} className="flex flex-col items-start border-t border-[var(--line)] pt-6">
              <span className="mb-8! block font-[family-name:var(--font-geist-mono)] text-[length:var(--type-caption)] text-[#595959] max-[760px]:mb-6!">{scenario.number}</span>
              <h3 className="mb-4!">{scenario.title}</h3><p className="mb-8! text-[#595959] max-[760px]:mb-4!">{scenario.description}</p>
              <span className="mt-auto text-[length:var(--type-label)]">{scenario.detail}</span>
            </article>)}
          </div>
        </section>

        <section id="process" className="bg-[#f6f6f8]" aria-labelledby="process-title">
          <div className="container section-space">
            <div className="mb-16! flex items-end justify-between gap-12 max-[760px]:mb-10! max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6"><h2 id="process-title">From first conversation<br />to what comes next.</h2><p className="max-w-[330px] text-[#595959]">A clear process, grounded in<br />your project’s fundamentals.</p></div>
            <ol className="m-0 grid list-none grid-cols-4 gap-8 p-0 max-[760px]:grid-cols-2 max-[760px]:gap-x-6 max-[760px]:gap-y-10 max-[380px]:grid-cols-1">{steps.map((step, index) => <li key={step.title} className="border-t border-[#d9d9df] pt-6"><span className="mb-8! block font-[family-name:var(--font-geist-mono)] text-[length:var(--type-caption)] text-[#595959] max-[760px]:mb-6!">0{index + 1}</span><h3 className="mb-4! text-[length:var(--type-emphasis)]! font-medium! tracking-[-.02em]!">{step.title}</h3><p className="text-[#595959]">{step.description}</p></li>)}</ol>
            <div className="mt-16! flex justify-between gap-6 border-t border-[#d9d9df] pt-6 text-[length:var(--type-label)] max-[1100px]:flex-col max-[760px]:mt-10!"><p className="text-[#595959]">What informs the review</p><ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-4 p-0 max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-4"><li>GPU hardware</li><li>Deployment readiness</li><li>Compute Tenant contracts</li><li>Project cash flows</li></ul></div>
          </div>
        </section>

        <section className="financing-faq container section-space grid grid-cols-[.8fr_1.2fr] gap-20 max-[1100px]:grid-cols-[.75fr_1.25fr] max-[1100px]:gap-10 max-[760px]:grid-cols-1" aria-labelledby="faq-title">
          <div><p className="mb-6! text-[length:var(--type-label)] font-medium">A few things to know</p><h2 id="faq-title">Before we talk.</h2><p className="mt-6! text-[#595959] max-[760px]:hidden">The details matter.<br />Let’s make them clear.</p></div>
          <Accordion type="single" collapsible className="financing-accordion min-w-0 border-t border-[var(--line)]">{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger className="gap-6 py-6 text-[length:var(--type-emphasis)] leading-normal font-normal">{faq.question}</AccordionTrigger><AccordionContent className="pr-8 text-[length:var(--type-body)] leading-[var(--leading-body)] text-[#595959]">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>
        </section>

        <section id="project" className="bg-[#f6f6f8]" aria-labelledby="project-title">
          <div className="container section-space grid grid-cols-[.8fr_1.2fr] items-start gap-20 max-[1100px]:grid-cols-[.75fr_1.25fr] max-[1100px]:gap-10 max-[760px]:grid-cols-1">
            <div className="financing-contact-copy"><p className="mb-6! text-[length:var(--type-label)] font-medium">Let’s get started</p><h2 id="project-title">Tell us what<br />you’re building.</h2><p className="mt-6! max-w-[330px] text-[#595959] max-[760px]:max-w-[460px]">A few details are enough to start a conversation. Tell us about the project you have in mind.</p><div className="mt-12! grid gap-2 text-[length:var(--type-label)] max-[760px]:mt-6!"><span>No account needed</span><span className="text-[#595959]">Still planning? That’s a good place to start.</span></div></div>
            <FinancingForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
