import SiteFrame from "@/components/SiteFrame";
import FinancingForm from "@/components/FinancingForm";
import { financingIsConfigured } from "@/lib/financing";
import { pageMetadata } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("Contact", "Discuss a GPU financing opportunity with Open Silicon. Share your project, customer demand and deployment plans.", "/contact");

export default function Contact() {
  return <SiteFrame><section className="container contact-page page-intro" aria-labelledby="contact-title"><div className="contact-intro"><p className="eyebrow">Contact</p><h1 id="contact-title">Tell us what<br />you’re building.</h1><p>A few details are enough to start a conversation. We welcome projects from operators, compute buyers, and brokers or advisors.</p><div className="contact-guidance"><span className="tiny-cross" aria-hidden="true">+</span><p>Still planning? Share where you are.<br />Project details are optional.</p></div><p className="contact-sensitive-note">No files or sensitive contracts are needed for an initial discussion.</p></div><FinancingForm available={financingIsConfigured()} /></section></SiteFrame>;
}
