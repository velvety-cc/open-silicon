import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@opensilicon/ui/accordion";
import styles from "./EnterpriseFaq.module.css";

const timeline = [
  ["Originate", "Define the project, participants and initial capital need."],
  ["Review", "Verify compute requirements, contracts, supplier terms, site readiness and the project funding plan."],
  ["Structure", "Agree repayment, security and funding conditions."],
  ["Deploy", "Fund against purchase, delivery and acceptance evidence."],
  ["Monitor", "Follow collections, covenants and assets through repayment."],
];
const faqs = [
  ["What can OpenSilicon help with?", "We help turn your compute requirements into a deployment plan, aligning equipment, operators, sites and the supporting equipment financing. The scope and financing terms depend on the project review."],
  ["Can we start before every part of the project is confirmed?", "Yes. Start with your compute requirements, an operator conversation, equipment quote or deployment plan. We can help identify the missing pieces and work toward a financeable transaction. Financing still requires the relevant contracts, diligence and funding conditions to be agreed."],
  ["Can you help us source equipment or find a site?", "We can help with origination and coordinate the equipment and site workstreams. Share your target configuration, location and deployment date so we can assess what support is needed. Supplier availability and site capacity need to be confirmed for each project."],
  ["Are we the compute customer or the borrower?", "You are the compute customer: the startup or enterprise using the compute. The equipment financing borrower is identified in the agreed structure and may be the operator or a project company. We align your compute agreement with the equipment and financing plan; the financing amount, equity and repayment terms are assessed for that transaction."],
  ["What determines the deployment timeline?", "Hardware availability, site readiness, funding and installation all matter. The calculator starts from a funded order and the start of any site work. It assumes delivery and site preparation run in parallel, followed by installation and acceptance. Financing review happens separately; the actual schedule is confirmed against project milestones."],
  ["What should we share to get started?", "Send a short company overview, the GPU model and quantity, workloads, budget and target date. Include any compute agreement or LOI and any operator, equipment or site options you are considering. Share what is ready and flag what is still being developed."],
];

export default function EnterpriseFaq() {
  return <section id="faq" className={styles.section} aria-labelledby="faq-title">
    <h2 id="faq-title">Frequently asked questions.</h2>
    <Accordion type="single" collapsible className={styles.accordion}>
      <AccordionItem value="process">
        <AccordionTrigger>How does the process work?</AccordionTrigger>
        <AccordionContent className={styles.answer}>
          <p>Timing follows project readiness and agreed milestones.</p>
          <ol>{timeline.map(([title, detail]) => <li key={title}><strong>{title}:</strong> {detail}</li>)}</ol>
          <p><Link href="/research/how-a-gpu-financing-deal-gets-done">Read the deal process</Link></p>
        </AccordionContent>
      </AccordionItem>
      {faqs.map(([question, answer]) => <AccordionItem key={question} value={question}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionContent className={styles.answer}><p>{answer}</p></AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </section>;
}
