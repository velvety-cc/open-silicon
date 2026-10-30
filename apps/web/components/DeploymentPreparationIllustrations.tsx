"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import styles from "./DeploymentPreparationIllustrations.module.css";

const items = [
  { key: "company", title: "Your Company", description: "A short introduction to your team and what you’re building.", Illustration: CompanyIllustration },
  { key: "compute", title: "Compute requirements & timeline", description: "Workloads, GPU model and quantity, plus your target date and any phased rollout plans.", Illustration: ComputeIllustration },
  { key: "equipment", title: "Equipment & site", description: "Suppliers, quotes or locations you’re already considering.", Illustration: EquipmentIllustration },
  { key: "budget", title: "Budget & terms", description: "Expected spend, contract duration and payment preferences.", Illustration: BudgetIllustration },
] as const;

export default function DeploymentPreparationIllustrations() {
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const syncVisibility = () => { element.dataset.motion = document.visibilityState === "visible" ? "running" : "paused"; };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
    }, { threshold: 0.15 });
    element.querySelectorAll("[data-illustration]").forEach(card => observer.observe(card));
    document.addEventListener("visibilitychange", syncVisibility);
    syncVisibility();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);

  return <div ref={root} id="deployment-inputs" className={styles.root} data-motion="paused">
    <ol className={styles.grid} aria-label="Deployment planning inputs">
      {items.map(({ key, title, description, Illustration }) => <li className={styles.card} key={key} data-illustration={key} data-visible="false">
        <article aria-labelledby={`${id}-${key}`}>
          <div className={styles.artwork} aria-hidden="true"><Illustration /></div>
          <h3 className={styles.title} id={`${id}-${key}`}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </article>
      </li>)}
    </ol>
  </div>;
}

// Minimal gestures make the subjects legible without adding diagram detail.
function CompanyIllustration() {
  return <svg className={styles.drawing} viewBox="0 0 320 320" fill="none" focusable="false">
    {[104, 160, 216].map((x, index) => <g key={x} transform={`translate(${x} ${index === 1 ? 150 : 166})`}>
      <g className={`${styles.team} ${styles.animated}`} style={{ "--from": `${(index - 1) * 15}px` } as CSSProperties}>
        <circle cy="-24" r="9" />
        <path d="M-18 34V14C-18-6 18-6 18 14V34" />
      </g>
    </g>)}
  </svg>;
}

function ComputeIllustration() {
  return <svg className={styles.drawing} viewBox="0 0 320 320" fill="none" focusable="false">
    {[116, 144, 172, 200].map((y, index) => <g key={y}>
      <path className={styles.track} d={`M84 ${y}H216`} />
      <path className={`${styles.task} ${styles.animated}`} d={`M84 ${y}H216`} pathLength="100" style={{ animationDelay: `${index * -0.65}s` }} />
    </g>)}
    <path d="M236 100V216M230 100H242" />
  </svg>;
}

function EquipmentIllustration() {
  return <svg className={styles.drawing} viewBox="0 0 320 320" fill="none" focusable="false">
    {Array.from({ length: 9 }, (_, index) => {
      const column = index % 3 - 1;
      const row = Math.floor(index / 3) - 1;
      const ring = Math.abs(column) + Math.abs(row);
      return <g key={index} transform={`translate(${160 + column * 50} ${160 + row * 50})`}>
        <g className={`${styles.rotor} ${styles.animated}`} style={{
          animationDuration: `${18 + ring * 8}s`,
          animationDelay: `${ring * 0.3}s`,
        }}>
          <path d="M0 0V-22M0 0L19.053 11M0 0L-19.053 11" />
        </g>
      </g>;
    })}
  </svg>;
}

function BudgetIllustration() {
  return <svg className={styles.drawing} viewBox="0 0 320 320" fill="none" focusable="false">
    <path d="M160 114V210M140 210H180" />
    <g transform="translate(160 130)">
      <g className={`${styles.beam} ${styles.animated}`}>
        <path d="M-60 0H60" />
        {[-54, 54].map(x => <g key={x} transform={`translate(${x} 0)`}>
          <g className={`${styles.pan} ${styles.animated}`}>
            <path d="M0 0L-18 42H18ZM-20 42Q0 58 20 42" />
          </g>
        </g>)}
      </g>
    </g>
  </svg>;
}
