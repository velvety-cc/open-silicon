import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import FinancingForm from "@/components/FinancingForm";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Contact", "Connect with OpenSilicon as a capital provider or a business seeking AI infrastructure financing.", "/contact");

export default function Contact() {
  return (
    <SiteFrame className="contact-site">
      <section className="contact-page" aria-labelledby="contact-title">
        <div className="contact-intro">
          <div className="contact-copy">
            <h1 id="contact-title">Capital for<br />Tomorrow’s Intelligence</h1>
            <p>Discover Capital Partnerships and Financing for AI Infrastructure</p>
          </div>
          <div className="contact-visual" aria-hidden="true">
            <Image
              src="/contact-datacenter-8k.webp"
              alt=""
              fill
              unoptimized
              loading="eager"
            />
          </div>
        </div>
        <FinancingForm />
      </section>
    </SiteFrame>
  );
}
