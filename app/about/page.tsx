import HeroVideo from "@/components/HeroVideo";
import { Fragment, type CSSProperties } from "react";
import SiteFrame, { FinancingCTA } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/site";
import { ComputeDemandFigure, FinancingProductsFigure, ProjectSelectionTable } from "@/components/ApproachFigures";

export const metadata = pageMetadata("About", "Financing the GPU capacity for a more ambitious future, connecting capital, operators and compute offtakers through structured, diversified products.", "/about");

const introduction = {
  lead: "Build the intelligence capacity for a more ambitious future.",
  paragraphs: [
    "We imagine a world where discovery moves faster, ambitious ideas become real sooner, and more people have the tools to solve problems that once seemed beyond reach.",
    "The key is intelligence.",
    "AI is already producing useful work, from writing software to accelerating research. Yet the work we want intelligence to do extends far beyond what we can deliver today. Every unanswered question, every unexplored idea and every unsolved problem gives us a reason to scale further.",
    "That expansion has a physical foundation: GPUs. Every newly deployed GPU brings more capacity to research, engineering and enterprise. To expand what humanity can accomplish, we must expand the infrastructure that makes intelligence productive.",
    "What comes next depends on how far we can scale intelligence. OpenSilicon exists to accelerate that expansion. We put capital behind the builders creating the physical infrastructure for this future.",
  ],
};

const essaySections = [
  {
    id: "demand",
    label: "Supply and demand",
    title: "Growth is constrained by capacity.",
    paragraphs: [
      "Demand for AI compute is growing at a rate without precedent in the history of infrastructure. Google processed 480 trillion tokens a month in May 2025 and 3.2 quadrillion a year later, adding more in twelve months than in all prior years combined. Fueling this demand are coding agents, always-on assistants, and computer-use workflows, each of which runs far longer than a conversational exchange. Agentic systems consume roughly four times the tokens of a chat interaction, and multi-agent systems roughly fifteen. Better models create new uses for intelligence, and new uses create demand for better models. The loop feeds itself, which is why forecasts built on last year’s use cases have been obsolete within months of publication.",
      "Every token is computed on deployed hardware, so demand for intelligence is ultimately demand for deployed GPUs. The installed base is growing at roughly 3× per year and still trails demand, as rising compute prices and sold-out clouds make plain. Most inputs behind that gap, memory, packaging, and power, sit on multi-year timelines that money cannot shorten. Capital is the one input a better market can improve. It does not create GPUs, but it decides which deployable capacity is built, by whom, and how soon. When it is slow, allocations flow to the largest balance sheets, and sound projects go unbuilt.",
      "Capital is slow because GPU compute is not yet a financeable asset class. Each deal is underwritten from first principles, on bespoke documentation, with little carried to the next. There is no shared diligence standard, no common risk framework, and no vehicle for diversifying across projects. Capital therefore arrives slower, costlier, and more concentrated than the demand it serves. Operators, meanwhile, raise against signed contracts, procure hardware against the raise, and must deploy before the next architecture ships, now annually. Every month in negotiation is a month of useful life forgone.",
      "Every infrastructure asset class has passed through this stage. Mortgages, aircraft, and solar became investable at scale only once a standard existed for underwriting them. GPU compute is at that threshold, with hard assets, contracted cash flows, and a demand curve still steepening. OpenSilicon exists to build that standard.",
    ],
  },
  {
    id: "capital",
    label: "Capital for intelligence",
    title: "Put capital behind the next frontier.",
    paragraphs: [
      "We believe the fastest way to scale intelligence is to scale the GPUs producing useful work. OpenSilicon connects capital with the operators ready to build and the demand those deployments are built to serve.",
      "Structured, diversified financing products turn that connection into a repeatable process. A common framework for risk assessment, due diligence and execution makes the pipeline more consistent while preserving the differences that matter in each project.",
      "Clear expectations and shared information help align capital providers, operators and offtakers. Diversification across projects and participants supports the scale of that ambition.",
    ],
  },
];
const contents = [
  { href: "#overview", label: "Thesis" },
  ...essaySections.map(section => ({ href: `#${section.id}`, label: section.label })),
  { href: "#conversation", label: "Conversation" },
];

export default function About() {
  return (
    <SiteFrame>
      <section data-header-theme="dark" className="approach-hero" aria-labelledby="approach-title">
        <HeroVideo
          src="/approach-intelligence-square-v2.mp4"
          poster="/approach-square-first-v2.webp"
          finalImage="/approach-square-final-v2.webp"
        />
        <div className="container approach-hero-copy">
          <h1 id="approach-title">Scaling Intelligence.</h1>
          <nav className="approach-contents" aria-label="On this page">
            <ol>
              {contents.map((item, index) => (
                <li key={item.href} style={{ "--contents-order": index } as CSSProperties}>
                  <a href={item.href}>
                    <span className="approach-contents-number" aria-hidden="true">({index + 1})</span>
                    <span className="approach-contents-line" aria-hidden="true" />
                    <span className="approach-contents-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <div className="approach-paper">
        <div className="approach-reading">
          <article className="approach-article" aria-label="About OpenSilicon">
            <section id="overview" aria-labelledby="overview-title">
              <h2 id="overview-title" className="sr-only">Thesis</h2>
              <p className="approach-lead">{introduction.lead}</p>
              {introduction.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>

            {essaySections.map(section => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <Fragment key={paragraph}>
                    <p>{paragraph}</p>
                    {section.id === "demand" && index === 1 && <ComputeDemandFigure />}
                  </Fragment>
                ))}
                {section.id === "demand" && <ProjectSelectionTable />}
                {section.id === "capital" && <div id="structure" className="approach-products-anchor"><FinancingProductsFigure /></div>}
              </section>
            ))}

            <section id="conversation" className="approach-conversation" aria-labelledby="conversation-title">
              <h2 id="conversation-title">Build what comes next.</h2>
              <p>Scaling intelligence requires capital that can move with it. OpenSilicon connects capital, operators and contracted demand through structured financing products, turning viable projects into productive GPU capacity.</p>
              <FinancingCTA />
            </section>
          </article>
        </div>
      </div>
    </SiteFrame>
  );
}
