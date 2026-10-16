import SiteFrame from "@/components/SiteFrame";
import "./research.css";

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame className="research-site">{children}</SiteFrame>;
}
