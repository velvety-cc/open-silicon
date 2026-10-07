import Link from "next/link";
import Image from "next/image";
import SiteFrame, { FinancingCTA } from "@/components/SiteFrame";
import HeroVideo from "@/components/HeroVideo";
import { Button } from "@/components/ui/button";
import { businessDescription, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Capital for the Intelligence Economy", businessDescription, "/");

export default function Home() {
  return (
    <SiteFrame>
      <section data-header-theme="dark" className="hero hero-immersive home-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Capital for the<br /><span>Intelligence Economy</span></h1>
          <p className="hero-description">{businessDescription}</p>
        </div>
        <figure className="hero-visual" aria-label="A data center takes shape, from an empty foundation to illuminated server halls at dusk"><HeroVideo /></figure>
      </section>
      <section className="home-perspective container" aria-labelledby="perspective-title">
        <div className="home-perspective-heading"><p className="eyebrow">From demand to deployment</p><h2 id="perspective-title">Productive compute.<br />A considered capital plan.</h2></div>
        <div className="home-perspective-grid">
          <figure className="home-hardware"><Image src="/compute-rack.webp" alt="Graphite GPU server rack with stacked compute hardware" width={1024} height={1536} sizes="(max-width: 760px) 90vw, 48vw" quality={90} /><figcaption>Physical infrastructure. Commercial fundamentals.</figcaption></figure>
          <div className="home-perspective-copy"><p className="home-statement">The hardware is one part.<br />The whole project matters.</p><p>Customer contracts, equipment and deployment plans belong in the same conversation. We bring these elements together to evaluate the financing opportunity.</p><div className="home-fundamentals"><span>Contracted demand</span><span>GPU infrastructure</span><span>Deployment readiness</span></div><Button asChild variant="link"><Link href="/our-approach">Explore our approach <span aria-hidden="true">↗</span></Link></Button></div>
        </div>
      </section>
      <section className="home-closing" aria-labelledby="home-closing-title"><Image src="/closing-datacenter-v3.webp" alt="Illuminated server racks behind the glass facade of a data center at dusk" fill sizes="100vw" quality={90} /><div className="container home-closing-copy"><p className="eyebrow">A real project starts a conversation</p><h2 id="home-closing-title">Bring your next<br />deployment into focus.</h2><FinancingCTA /></div></section>
    </SiteFrame>
  );
}
