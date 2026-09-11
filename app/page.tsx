import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import Arrow from "@/components/Arrow";
import Image from "next/image";
import LoanMarketplace from "@/components/LoanMarketplace";
import HeroVideo from "@/components/HeroVideo";
import Header from "@/components/Header";
import Brand, { BrandWordmark } from "@/components/Brand";


const opportunities = [
  { id: "CC-001", name: "H200 Cluster I", location: "North America", tenant: "Anthropic", size: "$32.0M", apr: "10.2%", term: "24 months", status: "Open" },
  { id: "CC-002", name: "B200 Pod II", location: "Nordics", tenant: "Mistral AI", size: "$48.5M", apr: "9.6%", term: "30 months", status: "Closing" },
  { id: "CC-003", name: "H100 Campus III", location: "APAC", tenant: "AI inference provider", size: "$18.0M", apr: "11.1%", term: "18 months", status: "Funded" },
];

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section data-header-theme="dark" className="hero hero-immersive" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Open capital for the<br /><span>intelligence economy.</span></h1>
            <p className="hero-description">Connecting global liquidity to the machines that move us forward. Secured credit for the next generation of AI infrastructure.</p>
            <div className="hero-actions">
              <Button asChild size="lg"><a href="#protocol">View current offerings</a></Button>
              <Button asChild variant="link"><a href="#access">Finance infrastructure</a></Button>
            </div>
            <div className="hero-partners" aria-label="Partners">
              <p><span className="tiny-cross" aria-hidden="true">+</span> Partners</p>
              <div className="hero-partner-logos">
                <a href="https://www.nvidia.com/" aria-label="NVIDIA"><Image src="/logos/nvidia-white.svg" alt="NVIDIA" width={130} height={24} /></a>
                <a href="https://www.kimi.com/" aria-label="Kimi"><Image src="/logos/kimi-white.svg" alt="Kimi" width={84} height={28} /></a>
              </div>
            </div>
          </div>
          <figure className="hero-visual" aria-label="A data center takes shape from an empty foundation to illuminated server halls at dusk">
            <HeroVideo />

          </figure>
        </section>

        <section data-header-theme="light" className="compute-showcase" aria-labelledby="compute-title">
          <div className="container">
            <div className="compute-heading">
              <p className="compute-wordmark"><BrandWordmark /></p>
              <h2 id="compute-title">Capital. Compute. Possibility.</h2>
              <Button asChild size="lg" className="compute-cta"><a href="#protocol">View current offerings</a></Button>
            </div>
            <div className="compute-stage">
              <figure className="compute-product">
                <Image src="/compute-rack.webp" alt="A graphite GPU server rack with stacked compute hardware" width={1024} height={1536} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 560px" quality={90} />
              </figure>
              <div className="compute-stat compute-stat-yield">
                <p className="compute-value">7–12<span>%</span></p>
                <h3>Target annual yield</h3>
                <p>Senior secured credit.<br />{" "}Backed by productive compute.</p>
              </div>
              <div className="compute-stat compute-stat-terms">
                <p className="compute-value">12–36</p>
                <h3>Months</h3>
                <p>Flexible terms.<br />{" "}Room to build what comes next.</p>
              </div>
              <div className="compute-stat compute-stat-assets">
                <h3 className="compute-feature">Real asset<br />backed</h3>
                <p className="compute-label">Fully compliant and verifiable</p>
              </div>
              <div className="compute-stat compute-stat-size">
                <p className="compute-value"><span>$</span>500<span>M</span></p>
                <h3>Current projects in the pipeline</h3>
              </div>
            </div>
            <p className="compute-note">Indicative credit parameters. Returns are not guaranteed. Financing is subject to eligibility and credit diligence.</p>
          </div>
        </section>

        <section data-header-theme="light" className="marketplace-section" id="protocol" aria-labelledby="marketplace-title">
          <div className="container section-space">
            <h2 id="marketplace-title">Own a piece of<br />what powers intelligence.</h2>
            <div className="marketplace-showcase">
              <LoanMarketplace />
              <aside className="marketplace-story">
                <h3>Real infrastructure.<br />A clear investment.</h3>
                <p>Explore AIDC credit. See the machines, the compute users and the terms behind every allocation.</p>
                <div className="marketplace-features"><span>Every offering, in focus</span><ul><li>Named compute users</li><li>Asset-backed loan structures</li><li>Defined rates and maturities</li><li>Monthly interest payments</li></ul></div>
                <Button asChild variant="link"><a href="#opportunities">Explore offerings</a></Button>
              </aside>
            </div>
            <p className="marketplace-disclaimer">Product demonstration. All projects and terms are illustrative. Named compute users, including Anthropic and Mistral AI, represent hypothetical scenarios, not confirmed customers, borrowers or partners.</p>
          </div>
        </section>

        <section data-header-theme="light" className="deals-section container section-space" id="opportunities">
          <div className="section-heading"><div><h2>Real infrastructure.<br /><span>A clearer view.</span></h2></div></div>
          <Table className="deals-table" containerProps={{ className: "deals-table-wrap", role: "region", "aria-label": "Illustrative credit opportunities, scroll to see all columns", tabIndex: 0 }}>
              <TableCaption className="sr-only">Illustrative opportunities. Availability and terms are subject to diligence.</TableCaption>
              <colgroup><col className="deal-col-asset" /><col className="deal-col-tenant" /><col className="deal-col-number" /><col className="deal-col-number" /><col className="deal-col-number" /><col className="deal-col-status" /><col className="deal-col-action" /></colgroup>
              <TableHeader><TableRow><TableHead scope="col">Asset / Region</TableHead><TableHead scope="col">Compute tenant</TableHead><TableHead scope="col" className="numeric">Facility</TableHead><TableHead scope="col" className="numeric">Target APR</TableHead><TableHead scope="col" className="numeric">Term</TableHead><TableHead scope="col" className="status-cell">Status</TableHead><TableHead scope="col"><span className="sr-only">Enquire</span></TableHead></TableRow></TableHeader>
              <TableBody>{opportunities.map((deal) => (
                <TableRow key={deal.id}>
                  <TableHead scope="row"><div className="deal-asset"><span className="asset-id">{deal.id}</span><span className="deal-asset-name"><strong>{deal.name}</strong><span className="asset-location">{deal.location}</span></span></div></TableHead>
                  <TableCell className="tenant-cell">{deal.tenant}</TableCell>
                  <TableCell className="numeric">{deal.size}</TableCell>
                  <TableCell className="numeric apr-value">{deal.apr}</TableCell>
                  <TableCell className="numeric">{deal.term}</TableCell>
                  <TableCell className="status-cell"><Badge variant="outline" className={`deal-status deal-status--${deal.status.toLowerCase()}`}><i aria-hidden="true" />{deal.status}</Badge></TableCell>
                  <TableCell><Button asChild variant="outline" size="icon" className="deal-link"><a href={`mailto:credit@circuit.credit?subject=${encodeURIComponent(`Enquiry: ${deal.name}`)}`} aria-label={`Enquire about ${deal.name}`}><Arrow /></a></Button></TableCell>
                </TableRow>
              ))}</TableBody>
          </Table>
        </section>

        <section data-header-theme="dark" className="closing closing-image" id="access" aria-labelledby="closing-title">
          <Image className="closing-background" src="/closing-datacenter-v3.webp" alt="Warmly illuminated server racks behind the glass facade of a data center at dusk" fill sizes="100vw" quality={90} />
          <div className="container closing-content">
            <p className="section-label">Let’s build the next chapter</p>
            <div className="closing-grid"><h2 id="closing-title">The future needs<br /><span>something real.</span></h2><div><p>Join the private launch for qualified capital partners and infrastructure operators.</p><Button asChild size="lg"><a href="mailto:hello@circuit.credit?subject=Open%20Silicon%20private%20launch">Start a conversation</a></Button></div></div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-identity">
          <Brand />
          <p>Open capital for the<br />intelligence economy.</p>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <div className="footer-group">
            <h2>Platform</h2>
            <ul>
              <li><a href="#protocol">Marketplace</a></li>
              <li><a href="#opportunities">Offerings</a></li>
              <li><a href="#compute-title">Infrastructure</a></li>
            </ul>
          </div>
          <div className="footer-group">
            <h2>For partners</h2>
            <ul>
              <li><a href="#protocol">Investors</a></li>
              <li><a href="#access">Operators</a></li>
              <li><a href="mailto:credit@circuit.credit">Discuss financing <Arrow /></a></li>
            </ul>
          </div>
          <div className="footer-group">
            <h2>Connect</h2>
            <ul>
              <li><a href="mailto:hello@circuit.credit">Contact the team <Arrow /></a></li>
              <li><a href="#access">Private launch</a></li>
            </ul>
          </div>
        </nav>
        <div className="footer-information">
          <div className="footer-disclaimer">
            <p>Open Silicon is a technology platform, not a bank. Digital assets and private credit involve risk, including possible loss of principal. Returns are not guaranteed.</p>
            <p>Product availability is subject to jurisdiction and eligibility.</p>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Open Silicon</span>
            <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
