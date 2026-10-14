import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Arrow from "@/components/Arrow";

const apiTokenVolume = [
  { date: "DevDay 2025", billions: 6, label: "6B" },
  { date: "Mar 31, 2026", billions: 15, label: "15B+" },
];

export function ComputeDemandFigure() {
  return (
    <figure id="compute-demand" className="approach-figure demand-figure" aria-labelledby="demand-figure-title">
      <div className="approach-figure-heading">
        <span className="approach-figure-number">Fig. 01</span>
        <h3 id="demand-figure-title">Growing usage. Constrained capacity.</h3>
      </div>
      <div className="demand-chart-heading">
        <p>OpenAI · API tokens per minute</p>
        <span>2.5×+ since DevDay 2025</span>
      </div>
      <ol className="demand-token-bars" aria-label="OpenAI API tokens per minute, DevDay 2025 and March 31, 2026">
        {apiTokenVolume.map(point => (
          <li key={point.date} data-latest={point.date === "Mar 31, 2026"}>
            <div className="demand-token-label"><span>{point.date}</span><strong>{point.label}</strong></div>
            <div className="demand-token-track" aria-hidden="true">
              <span style={{ width: `${point.billions / 15 * 100}%` }} />
            </div>
          </li>
        ))}
      </ol>
      <div className="demand-chart-scale" aria-hidden="true"><span>0</span><span>15B / min</span></div>
      <blockquote className="demand-capacity-quote" cite="https://www.anthropic.com/news/anthropic-amazon-compute">
        <p>“Growth at this pace places an inevitable strain on our infrastructure.”</p>
        <cite>Anthropic · April 20, 2026</cite>
      </blockquote>
      <figcaption>
        OpenAI’s reported API token volume. B = billion. Bars share a linear scale from zero; March 2026 shows the reported minimum of 15B tokens per minute.
        <div className="demand-figure-sources">
          <a href="https://openai.com/devday/2025/" target="_blank" rel="noreferrer">OpenAI DevDay 2025 <Arrow /></a>
          <a href="https://openai.com/index/accelerating-the-next-phase-ai/" target="_blank" rel="noreferrer">OpenAI · March 2026 <Arrow /></a>
          <a href="https://www.anthropic.com/news/anthropic-amazon-compute" target="_blank" rel="noreferrer">Anthropic · April 2026 <Arrow /></a>
          <a href="https://www.anthropic.com/engineering/multi-agent-research-system" target="_blank" rel="noreferrer">Anthropic · Agent workloads <Arrow /></a>
        </div>
      </figcaption>
    </figure>
  );
}

const financingProducts = [
  {
    name: "Offtaker-backed Financing",
    description: "Capital for GPU deployments supported by signed compute contracts with offtakers.",
    roughYield: "≈6–10%",
    basis: "Annual loan pricing",
  },
  {
    name: "Bridge Loans",
    description: "Short-term capital for GPU procurement and deployment, bridging to longer-term financing.",
    roughYield: "≈7–12%",
    basis: "Annual loan pricing",
  },
  {
    name: "GPU Equity",
    description: "Equity investments in GPU operators or project companies, supporting infrastructure expansion and long-term growth.",
    roughYield: "15%+",
    basis: "Gross target IRR · infrastructure proxy",
  },
];

export function FinancingProductsFigure() {
  return (
    <figure id="capital-diagram" className="approach-figure products-figure" aria-labelledby="products-figure-title">
      <div className="approach-figure-heading">
        <span className="approach-figure-number">Fig. 02</span>
        <h3 id="products-figure-title">Structured products for GPU capacity.</h3>
      </div>
      <ul className="approach-product-columns" aria-label="GPU financing products">
        {financingProducts.map((product, index) => (
          <li key={product.name}>
            <header className="approach-product-header">
              <span className="approach-product-number" aria-hidden="true">0{index + 1}</span>
              <h4>{product.name}</h4>
            </header>
            <p>{product.description}</p>
            <dl className="approach-product-yield">
              <dt>Rough yield range</dt>
              <dd><strong>{product.roughYield}</strong><span>{product.basis}</span></dd>
            </dl>
          </li>
        ))}
      </ul>
    </figure>
  );
}

const selectionCriteria = [
  { focus: "GPUs", signal: "Architecture, configuration and useful life", purpose: "Equipment assessment and ownership" },
  { focus: "Operators", signal: "Deployment readiness and operating capability", purpose: "Delivery plan, site and power" },
  { focus: "Offtakers", signal: "Demand, credit quality and contract terms", purpose: "Customer and contract assessment" },
];

export function ProjectSelectionTable() {
  return (
    <figure id="project-selection" className="approach-figure selection-figure" aria-labelledby="selection-figure-title">
      <div className="approach-figure-heading">
        <span className="approach-figure-number">Table 01</span>
        <h3 id="selection-figure-title">Distinct risks. Consistent diligence.</h3>
      </div>
      <p className="approach-table-hint">Scroll to see all columns <span aria-hidden="true">↔</span></p>
      <Table className="approach-selection-table" containerProps={{ className: "approach-table-scroll", role: "region", "aria-labelledby": "selection-figure-title", tabIndex: 0 }}>
        <caption className="sr-only">GPUs, operators and offtakers: what varies and how we assess it.</caption>
        <TableHeader>
          <TableRow><TableHead scope="col">Focus</TableHead><TableHead scope="col">What varies</TableHead><TableHead scope="col">Shared diligence</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {selectionCriteria.map(row => <TableRow key={row.focus}><TableHead scope="row">{row.focus}</TableHead><TableCell>{row.signal}</TableCell><TableCell>{row.purpose}</TableCell></TableRow>)}
        </TableBody>
      </Table>
      <figcaption>A common framework supports project-specific assessment and structuring.</figcaption>
    </figure>
  );
}
