import { BrandSymbol } from "@/components/Brand";

export { BrandSymbol };

export function BrandWordmark({ className = "" }: { className?: string }) {
  return <span className={`brand-lockup ${className}`}><BrandSymbol /><span className="brand-name">OpenSilicon</span></span>;
}

export default function Brand() {
  return <a className="brand" href="/legacy/#top" aria-label="OpenSilicon home"><BrandWordmark /></a>;
}
