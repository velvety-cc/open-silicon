import { DECK_DATA } from "@/lib/deck-data";

export default function DealStructure() {
  const s = DECK_DATA.structure;
  return <>
    <svg className="deck-structure-desktop w-full" viewBox="0 0 1110 255" role="img" aria-label="LP capital flows through the Open Silicon SPV and borrower SPV to operating compute. Assigned tenant receipts sweep back to lenders. The collateral agent controls hardware security and receivables.">
      <defs><marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0l10 5-10 5z" fill="#533afe" /></marker></defs>
      <text x="0" y="20" fontSize="14" fill="#666">{s.forward}</text>
      {s.nodes.map((node, index) => <g key={node} transform={`translate(${index * 224},60)`}><rect width="206" height="72" rx="3" fill={index === 1 ? "#f0edff" : "#fafafa"} stroke={index === 1 ? "#533afe" : "#e5e5e5"} /><text x="103" y="30" textAnchor="middle" fontSize="18" fill="#000">{node}</text><text x="103" y="53" textAnchor="middle" fontSize="13" fill="#666">{s.nodeDetails[index]}</text></g>)}
      {s.nodes.slice(1).map((node, index) => <g key={node}><text x={index * 224 + 215} y="47" textAnchor="middle" fontSize="12" fill="#666">{s.flowLabels[index]}</text><path d={`M${index * 224 + 207} 96h14`} stroke="#533afe" markerEnd="url(#flow-arrow)" /></g>)}
      <path d="M999 140v25H103v-25" fill="none" stroke="#533afe" strokeWidth="1.5" markerEnd="url(#flow-arrow)" />
      <text x="555" y="185" textAnchor="middle" fontSize="15" fill="#533afe">{s.back}</text>
      <rect x="0" y="211" width="292" height="39" rx="3" fill="#fafafa" stroke="#e5e5e5" />
      <text x="146" y="236" textAnchor="middle" fontSize="16" fill="#000">{s.agent}</text>
      <path d="M292 231H775V132M551 231V132" fill="none" stroke="#aaa" strokeDasharray="4 5" />
      <text x="338" y="220" fontSize="13" fill="#666">{s.lien}</text>
      <text x="792" y="220" fontSize="13" fill="#666">{s.assignment}</text>
      <path d="M775 231H999V195" fill="none" stroke="#aaa" strokeDasharray="4 5" />
    </svg>
    <svg className="deck-structure-mobile mx-auto w-full max-w-[360px]" viewBox="0 0 350 690" role="img" aria-label="Investor capital funds operating compute through the deal SPV and borrower SPV. Assigned tenant receipts sweep back. An independent agent holds security over hardware and receivables.">
      <defs><marker id="flow-arrow-mobile" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0l10 5-10 5z" fill="#533afe" /></marker></defs>
      {s.nodes.map((node, index) => <g key={node}><g transform={`translate(35,${15 + index * 106})`}><rect width="254" height="76" rx="10" fill={index === 1 ? "#f0edff" : "#fafafa"} stroke={index === 1 ? "#533afe" : "#e5e5e5"} /><text x="127" y="32" textAnchor="middle" fontSize="18" fill="#000">{node}</text><text x="127" y="56" textAnchor="middle" fontSize="14" fill="#666">{s.nodeDetails[index]}</text></g>{index < 4 && <path d={`M162 ${91 + index * 106}v26`} stroke="#533afe" markerEnd="url(#flow-arrow-mobile)" />}</g>)}
      <path d="M295 477h31V53h-29" fill="none" stroke="#533afe" markerEnd="url(#flow-arrow-mobile)" />
      <text x="347" y="300" transform="rotate(-90 347 300)" textAnchor="middle" fontSize="13" fill="#533afe">{s.back}</text>
      <path d="M35 263H14v310h25M35 369H14M35 475H14" fill="none" stroke="#aaa" strokeDasharray="4 5" />
      <rect x="35" y="547" width="275" height="56" rx="10" fill="#fafafa" stroke="#e5e5e5" /><text x="172" y="580" textAnchor="middle" fontSize="17" fill="#000">{s.agent}</text>
      <text x="35" y="635" fontSize="15" fill="#666">{s.lien}</text><text x="35" y="663" fontSize="15" fill="#666">{s.assignment}</text>
    </svg>
  </>;
}
