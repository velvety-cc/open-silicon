import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { primaryCTA } from "@/lib/site";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return <div id="top" className="marketing-site"><main id="main">{children}</main><Footer /></div>;
}

export function FinancingCTA({ className = "" }: { className?: string }) {
  return <Button asChild size="lg" className={`financing-cta ${className}`}><Link href="/contact">{primaryCTA}</Link></Button>;
}

export function ConversationSection() {
  return <section className="conversation-section"><div className="container conversation-inner"><div><p className="eyebrow">Let’s start with your project</p><h2>What are you building?</h2></div><FinancingCTA /></div></section>;
}
