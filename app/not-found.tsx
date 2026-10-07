import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <SiteFrame><section className="container page-intro not-found"><p className="eyebrow">Page unavailable</p><h1>This page couldn’t be found.</h1><p>Explore Open Silicon or start a conversation about your project.</p><Button asChild size="lg"><Link href="/">Return home</Link></Button></section></SiteFrame>;
}
