"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./EnterpriseProcess.module.css";

const layers = [
  ["customer", "Customer", "Your requirements shape the equipment, site, and financing structure."],
  ["gpu", "GPU", "Matched to your workloads, with power and cooling needs that shape the site."],
  ["site", "Operator and Site", "Provide the power, cooling, and operations that bring your GPUs online."],
  ["capital", "Capital", "Finances the equipment within a structure aligned with your deployment."],
] as const;

export default function DeploymentDiagram({ theme = "brand" }: { theme?: "brand" | "neutral" }) {
  const figure = useRef<HTMLElement>(null);
  const descriptionId = useId();

  useEffect(() => {
    const root = figure.current;
    if (!root) return;
    const controller = new AbortController();
    let started = false;
    const observer = new IntersectionObserver(entries => {
      if (started || !entries.some(entry => entry.isIntersecting)) return;
      started = true;
      observer.disconnect();
      void import("@/lib/deployment-diagram/index.mjs").then(module => {
        if (!controller.signal.aborted) return module.mountDeploymentDiagram(root, controller.signal);
      }).catch(() => {
        if (controller.signal.aborted) return;
        const stage = root.querySelector<HTMLElement>(".diagram-stage");
        if (stage) stage.dataset.engine = "fallback";
        root.querySelectorAll<HTMLButtonElement>("button").forEach(button => button.disabled = true);
      });
    }, { rootMargin: "240px" });
    observer.observe(root);
    return () => { controller.abort(); observer.disconnect(); };
  }, []);

  return <figure ref={figure} id="parties" data-diagram-theme={theme} className={styles.figure} aria-label="Parties Involved" aria-describedby="parties-description">
    <div className={`diagram-stage ${styles.stage}`} data-input="pointer" data-view="stack">
      <div className={`scene-viewport ${styles.viewport}`}>
        <canvas aria-hidden="true" />
        <div className={styles.fallback}><img src="/illustrations/deployment-layers.svg" alt="" width="560" height="690" /></div>
      </div>
      <div className={styles.controls} role="group" aria-label="Explore deployment layers">
        {layers.map(([key, label, description]) => <button type="button" className={`layer-control ${styles.control}`} key={key} data-layer={key} aria-pressed="false" aria-labelledby={`${descriptionId}-${key}-label`} aria-describedby={`${descriptionId}-${key}-description`} disabled>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.controlText}>
            <span id={`${descriptionId}-${key}-label`}>{label}</span>
            <span id={`${descriptionId}-${key}-description`} className={styles.layerDescription}>{description}</span>
          </span>
        </button>)}
      </div>
    </div>
    <figcaption id="parties-description" className="sr-only">You are the customer at the top of the deployment stack, supported by GPU equipment, operator and site, and capital. OpenSilicon aligns the four layers. Hover over a card or select its name to expand it. Arrow keys move between layers; Escape collapses the stack.</figcaption>
    <span className="sr-only" role="status" aria-live="polite" />
  </figure>;
}
