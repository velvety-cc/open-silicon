const symbolPath = "M78.7 13.9A46 46 0 1 0 84.5 19.6L68 38V66Q68 70 64 70H36Q32 70 32 66V38Q32 34 36 34H61Z";

export function BrandSymbol() {
  return <svg className="brand-symbol" width="32" height="32" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" focusable="false"><path d={symbolPath} /></svg>;
}

export function BrandWordmark({ className = "" }: { className?: string }) {
  return <span className={`brand-lockup ${className}`}><BrandSymbol /><span>open silicon</span></span>;
}

export default function Brand() {
  return <a className="brand" href="#top" aria-label="Open Silicon home"><BrandWordmark /></a>;
}
