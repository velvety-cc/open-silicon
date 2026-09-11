"use client";

import Brand from "@/components/Brand";
import Arrow from "@/components/Arrow";

import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("main > .hero");
    let frame: number | null = null;
    const updateSurface = () => {
      frame = null;
      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      setScrolled(window.scrollY >= (mobile ? 8 : 70));
      const probe = (header.current?.getBoundingClientRect().bottom ?? 80) + 1;
      setLightSurface(!hero || hero.getBoundingClientRect().bottom <= probe);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateSurface);
    };
    updateSurface();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header
      ref={header}
      className={`site-header${scrolled ? " is-scrolled" : ""}${lightSurface ? " is-light" : ""}${open ? " menu-open" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Brand />
        <nav id="primary-navigation" className={`nav-shell${open ? " is-open" : ""}`} aria-label="Primary navigation">
          <a href="#protocol" onClick={() => setOpen(false)}>For investors</a>
          <a href="#access" onClick={() => setOpen(false)}>For operators</a>
          <a href="#protocol" onClick={() => setOpen(false)}>How it works</a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href="#access" onClick={() => setOpen(false)}>Get in touch <Arrow /></a>
          <button
            ref={toggle}
            className={`menu-button${open ? " is-open" : ""}`}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
