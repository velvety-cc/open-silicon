import Image from "next/image";
import SiteFrame, { ConversationSection, FinancingCTA } from "@/components/SiteFrame";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Our Approach", "How we evaluate GPU deployment financing: customer contracts, equipment, project cash flows and deployment readiness.", "/our-approach");

const scenarios = [
  { title: "New GPU purchases", description: "A planned equipment purchase, reviewed alongside customer demand, supplier quotes and the deployment schedule." },
  { title: "Cluster expansion", description: "Additional capacity at an existing site, with a clear view of contracted demand and the resources needed for the next phase." },
  { title: "Existing asset financing", description: "Financing for an operating fleet, assessed against equipment ownership, asset value and customer contracts." },
];
const review = [
  { title: "Customers & contracts", description: "Customer background, offtake status, contract duration, payment obligations and conditions that affect expected demand." },
  { title: "GPU equipment", description: "Model, configuration, quantity, valuation and ownership, alongside supplier quotes or an existing hardware inventory." },
  { title: "Project cash flows", description: "Expected contract revenue, equipment costs, operating expenses and the timing of cash receipts and payments." },
  { title: "Site & power readiness", description: "Data center arrangements, power availability, cooling and the work needed to bring the equipment into service." },
  { title: "Timeline & responsibilities", description: "Procurement and deployment milestones, dependencies and the responsibilities of each party involved." },
];
const steps = [
  { title: "Initial discussion", description: "Understand the project, your role, the financing need and the current state of customer demand." },
  { title: "Project review", description: "Review contracts, equipment, cash flows and deployment readiness to assess financing fit." },
  { title: "Financing structure", description: "Where the review supports proceeding, discuss a structure and terms suited to the project." },
  { title: "Documentation and deployment", description: "For a project that proceeds, agree documentation, responsibilities and conditions for deployment." },
];
const faqs = [
  { question: "Who can bring a project?", answer: "Operators, compute buyers, and brokers or advisors can start a discussion. Tell us your role and how the GPU deployment is expected to serve customer demand." },
  { question: "Can we talk before a contract is signed?", answer: "Yes. Share whether demand is exploratory, in discussion, covered by an LOI or supported by a signed contract. Contract status informs the review; an initial discussion does not imply financing approval." },
  { question: "What should I prepare?", answer: "A short project overview is enough for the first conversation. GPU configurations and quantities, equipment ownership or supplier quotes, customer contract status, expected cash flows, site readiness and deployment dates help with subsequent review. No files or sensitive contracts are required at first contact." },
  { question: "How are terms determined?", answer: "Financing fit and terms are assessed for each opportunity, based on the customer and contracts, hardware value, cash flows, deployment arrangements and review findings. An enquiry does not commit either party to a financing arrangement." },
];

export default function OurApproach() {
  return <SiteFrame>
    <section data-header-theme="dark" className="approach-hero" aria-labelledby="approach-title"><Image src="/gpu-financing-hero-v1.webp" alt="GPU cabinets inside a glass-walled data center with warm overhead lighting" fill preload sizes="100vw" quality={90} /><div className="container approach-hero-copy"><p className="eyebrow">Our Approach</p><h1 id="approach-title">Start with demand.<br />Understand the deployment.</h1><p>We focus on GPU deployment financing, bringing customer contracts, equipment investment and project cash flows into a single review.</p><FinancingCTA /></div></section>
    <section className="container section-space" aria-labelledby="focus-title"><div className="section-intro"><div><p className="eyebrow">Financing focus</p><h2 id="focus-title">Capital in context.</h2></div><p>Contracted compute demand helps us understand expected revenue. Equipment costs, operating cash flows and deployment milestones help us evaluate how a financing structure could fit.</p></div><div className="scenario-grid">{scenarios.map((item, index) => <article key={item.title}><span className="index-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><p className="supporting-note">Each opportunity is assessed individually. These are areas for discussion, subject to project review.</p></section>
    <section className="review-section" aria-labelledby="review-title"><div className="container section-space review-grid"><div className="review-heading"><p className="eyebrow">What informs the review</p><h2 id="review-title">Look at the<br />whole picture.</h2><p>The information behind the project helps us judge its financing fit and identify what needs further review.</p></div><dl className="review-list">{review.map((item, index) => <div key={item.title}><span className="index-number" aria-hidden="true">0{index + 1}</span><div><dt>{item.title}</dt><dd>{item.description}</dd></div></div>)}</dl></div></section>
    <section className="container section-space" aria-labelledby="process-title"><div className="section-intro"><div><p className="eyebrow">The process</p><h2 id="process-title">A clear path<br />through the details.</h2></div><p>A structured discussion, with decisions grounded in the information available at each stage.</p></div><ol className="process-grid">{steps.map((step, index) => <li key={step.title}><span className="index-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol><p className="supporting-note">An initial discussion or review does not guarantee approval, financing or a deployment date.</p></section>
    <section className="container approach-faq section-space" aria-labelledby="faq-title"><div><p className="eyebrow">Before we talk</p><h2 id="faq-title">A few useful details.</h2></div><Accordion type="single" collapsible className="financing-accordion">{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section>
    <ConversationSection />
  </SiteFrame>;
}
