import Image from "next/image";
import SiteFrame, { ConversationSection } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("About", "Our background spans distributed computing and venture investing. We now focus on financing GPU infrastructure supported by customer contracts.", "/about");

export default function About() {
  return <SiteFrame>
    <section className="container about-intro page-intro" aria-labelledby="about-title"><p className="eyebrow">About Open Silicon</p><div className="about-intro-grid"><h1 id="about-title">A perspective shaped<br />by compute and capital.</h1><p>Our background spans distributed computing and venture investing. We now focus on financing GPU infrastructure supported by customer contracts.</p></div></section>
    <figure className="about-image container"><Image src="/hero-datacenter-final.webp" alt="A data center campus illuminated at dusk" width={2880} height={1620} sizes="(max-width: 1440px) 100vw, 1312px" preload quality={90} /><figcaption>Infrastructure is physical. Its financing starts with the fundamentals.</figcaption></figure>
    <section className="container section-space about-background" aria-labelledby="background-title"><div><p className="eyebrow">Our background</p><h2 id="background-title">An evolving focus.</h2></div><div><div className="background-path" aria-label="Distributed computing, venture investing, GPU financing"><span>Distributed computing</span><span aria-hidden="true">↗</span><span>Venture investing</span><span aria-hidden="true">↗</span><span>GPU financing</span></div><p>Our current focus brings the infrastructure and its commercial context together: GPU assets, the customers using them and the contracts that support a deployment.</p><p>We work with operators and compute buyers to evaluate financing opportunities on their individual merits.</p></div></section>
    <ConversationSection />
  </SiteFrame>;
}
