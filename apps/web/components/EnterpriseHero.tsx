import Image from "next/image";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Button } from "@opensilicon/ui/button";
import { homeHeroMedia } from "@/lib/hero-media";

export default function EnterpriseHero() {
  return <section data-header-theme="dark" className="hero hero-immersive enterprise-immersive-hero" aria-labelledby="audience-page-title">
      <div className="hero-copy">
        <h1 id="audience-page-title">Your Dedicated<br /><span>Compute Partner</span></h1>
        <p className="hero-description">From compute requirements to deployment.<br />We help you to align equipment, operators, sites, and capital.</p>
        <Button asChild variant="outline" size="lg" className="enterprise-hero-cta"><a href="#equipment-and-sites">Plan your deployment <ArrowDownIcon className="arrow" width={18} height={18} aria-hidden="true" focusable="false" /></a></Button>
      </div>
      <figure className="hero-visual" aria-label="An architectural illustration of AI infrastructure">
        <picture>
          <source srcSet={homeHeroMedia.finalPortraitAvif} type="image/avif" media="(max-width: 760px) and (max-aspect-ratio: 3/5)" />
          <source srcSet={homeHeroMedia.finalImageAvif} type="image/avif" />
          <Image src={homeHeroMedia.finalImage} alt="" fill sizes="100vw" unoptimized loading="eager" fetchPriority="high" />
        </picture>
      </figure>
  </section>;
}
