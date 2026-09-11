"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BrandWordmark } from "@/components/Brand";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p); };

export default function ComputeShowcase() {
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = section.current;
    const stage = scene.current;
    if (!root || !stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 761px) and (min-height: 700px)");
    let frame = 0;
    let visible = true;
    const paint = () => {
      frame = 0;
      root.dataset.motion = reduced.matches ? "still" : desktop.matches ? "pinned" : "flow";
      const box = root.getBoundingClientRect();
      const mobileBox = desktop.matches ? box : stage.getBoundingClientRect();
      const progress = reduced.matches ? 0 : desktop.matches
        ? clamp((80 - box.top) / (box.height - (window.innerHeight - 80)))
        : clamp((window.innerHeight * .88 - mobileBox.top) / (window.innerHeight * .72));
      const camera = smooth(progress);
      root.style.setProperty("--cluster-progress", progress.toFixed(4));
      root.style.setProperty("--cluster-camera", camera.toFixed(4));
    };
    const schedule = () => { if (!frame && visible) frame = requestAnimationFrame(paint); };
    const refresh = () => { visible = true; schedule(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: "50% 0px" });
    observer.observe(root);
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    reduced.addEventListener("change", refresh);
    desktop.addEventListener("change", refresh);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      reduced.removeEventListener("change", refresh);
      desktop.removeEventListener("change", refresh);
    };
  }, []);

  return (
    <section ref={section} data-header-theme="light" className="compute-showcase cluster-showcase" aria-labelledby="compute-title">
      <div className="cluster-panel">
        <div className="container compute-heading">
          <p className="compute-wordmark"><BrandWordmark /></p>
          <h2 id="compute-title">Capital. Compute. Possibility.</h2>
          <a className="button compute-cta" href="#protocol">View current offerings</a>
        </div>
        <div ref={scene} className="cluster-scene" role="img" aria-label="From a single GPU server rack to a complete compute cluster in a white studio.">
          <div className="cluster-panorama" aria-hidden="true">
            <Image src="/compute-cluster-studio.webp" alt="" fill sizes="(max-width: 760px) 1500px, 2000px" quality={90} draggable={false} />
          </div>
        </div>
        <div className="cluster-facts container">
          <div className="cluster-fact cluster-fact-yield"><p className="compute-value">7–12<span>%</span></p><h3>Target annual yield</h3><p>Senior secured credit.<br /> Backed by productive compute.</p></div>
          <div className="cluster-fact cluster-fact-size"><p className="compute-value"><span>$</span>5–100<span>M</span></p><h3>Built for scale</h3><p>Purpose-built facilities for<br /> infrastructure operators.</p></div>
          <div className="cluster-fact cluster-fact-assets"><h3 className="compute-feature">Real assets.</h3><p>GPU hardware and receivables.<br /> A physical foundation for capital.</p></div>
          <div className="cluster-fact cluster-fact-terms"><h3 className="compute-feature">12–36 months</h3><p>Flexible terms.<br /> Room to build what comes next.</p></div>
        </div>
        <p className="compute-note container">Indicative credit parameters. Returns are not guaranteed. Financing is subject to eligibility and credit diligence.</p>
      </div>
    </section>
  );
}
