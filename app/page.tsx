import SiteFrame from "@/components/SiteFrame";
import HeroVideo from "@/components/HeroVideo";
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
    </SiteFrame>
  );
}
