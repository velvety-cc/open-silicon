// Geometry from the user-approved open-silicon-icon.svg.
const symbolPath = "M216.576762 49.472143 A119 119 0 1 0 231.040651 62.9385 L191 109 V183 A8 8 0 0 1 183 191 H103 A8 8 0 0 1 95 183 V103 A8 8 0 0 1 103 95 H177 L216.576762 49.472143 Z";
const symbolTransform = "translate(-11.394958 -11.394958) scale(0.97479)";

export function BrandSymbol() {
  return <svg className="brand-symbol" width="32" height="32" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false"><path d={symbolPath} transform={symbolTransform} /></svg>;
}

export function BrandWordmark({ className = "" }: { className?: string }) {
  return <span className={`brand-lockup ${className}`}><BrandSymbol /><span className="brand-name">OpenSilicon</span></span>;
}

export default function Brand() {
  return <a className="brand" href="/" aria-label="OpenSilicon home"><BrandWordmark /></a>;
}
