"use client";

import { useEffect, useRef, useState } from "react";
import type { ResearchHeading } from "@/lib/research-headings";

export default function ResearchContents({ headings }: { headings: ResearchHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  const progress = useRef<HTMLSpanElement>(null);
  const mobileContents = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const sections = headings.map(heading => document.getElementById(heading.id));
    const body = document.getElementById("research-body");
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0]?.id;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= 180) current = headings[index].id;
      });
      setActive(current);
      if (body && progress.current) {
        const bounds = body.getBoundingClientRect();
        const distance = bounds.height - window.innerHeight + 160;
        const fraction = Math.max(0, Math.min(1, (160 - bounds.top) / Math.max(1, distance)));
        progress.current.style.transform = `scaleX(${fraction})`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (body) observer.observe(body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);

  const links = <ol>{headings.map((heading, index) => <li key={heading.id}><a href={`#${heading.id}`} aria-current={active === heading.id ? "location" : undefined} onClick={() => { if (mobileContents.current) mobileContents.current.open = false; }}><span className="research-contents-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{heading.title}</span></a></li>)}</ol>;

  return (
    <aside className="research-contents">
      <div className="research-reading-progress" aria-hidden="true"><span ref={progress} /></div>
      <nav className="research-contents-desktop" aria-label="In this article">
        <p className="research-eyebrow">In this article</p>
        {links}
        <a href="#top" className="research-top-link">Back to top <span aria-hidden="true">↑</span></a>
      </nav>
      <details className="research-contents-mobile" ref={mobileContents}>
        <summary>In this article <span>{headings.length} sections <span aria-hidden="true">+</span></span></summary>
        <nav aria-label="Article sections">{links}</nav>
      </details>
    </aside>
  );
}
