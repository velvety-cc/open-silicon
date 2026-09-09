"use client";

import { useState } from "react";

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Circuit home">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 24 20 10h19L28 24 17 38H2L9 24Z" fill="currentColor" />
        <path d="m20 10 8 14-11 14" fill="none" stroke="#111513" strokeWidth="4" />
      </svg>
      <span className="brand-type">CIRCUIT</span>
      <span className="brand-descriptor">COMPUTE<br />CREDIT</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Brand />

      <nav className={`nav-shell ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        <a href="#capital" onClick={close}>For capital</a>
        <a href="#operators" onClick={close}>For operators</a>
        <a href="#protocol" onClick={close}>Protocol</a>
        <a href="#network" onClick={close}>Network</a>
      </nav>

      <a className="header-cta" href="#access">
        Enter protocol
        <span aria-hidden="true">↗</span>
      </a>

      <button
        className={`menu-button ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
