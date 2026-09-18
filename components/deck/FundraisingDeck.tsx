"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, List, NotebookPen, Printer } from "lucide-react";
import { BrandWordmark } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DECK_DATA } from "@/lib/deck-data";
import { DeckSlideContent, slideNotes } from "./DeckSlides";
import { DeckText } from "./DeckText";

const count = DECK_DATA.slides.length;
const mobileQuery = "(max-width: 900px)";
const clamp = (index: number) => Math.max(0, Math.min(count - 1, index));

export default function FundraisingDeck() {
  const [current, setCurrent] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const currentRef = useRef(0);

  const navigate = useCallback((index: number, scroll = true) => {
    const next = clamp(index);
    currentRef.current = next;
    setCurrent(next);
    const hash = `#slide-${next + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
    if (scroll && window.matchMedia(mobileQuery).matches) {
      const slide = slideRefs.current[next];
      if (slide) window.scrollTo({ top: window.scrollY + slide.getBoundingClientRect().top, behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const syncHash = () => {
      const match = window.location.hash.match(/^#slide-(\d+)$/);
      navigate(match ? Number(match[1]) - 1 : 0);
    };
    const resize = () => { setMobile(media.matches); navigate(currentRef.current); };
    let frame = 0;
    const scroll = () => {
      if (!media.matches || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        let index = 0;
        slideRefs.current.forEach((slide, i) => { if (slide && slide.getBoundingClientRect().top <= window.innerHeight * .3) index = i; });
        if (index !== currentRef.current) navigate(index, false);
      });
    };
    const beforePrint = () => setPrinting(true);
    const afterPrint = () => setPrinting(false);
    setMobile(media.matches);
    syncHash();
    media.addEventListener("change", resize);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", resize);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, [navigate]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (event.altKey || event.ctrlKey || event.metaKey || target?.closest("input, textarea, select, [role=combobox], [role=listbox], [role=option], [contenteditable=true]")) return;
      if (event.key.toLowerCase() === "n") { event.preventDefault(); setNotesOpen(open => !open); return; }
      if (notesOpen || target?.closest("[role=dialog]")) return;
      if (event.key === " " && target?.closest("button, a")) return;
      let index: number | undefined;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) index = currentRef.current + (event.shiftKey && event.key === " " ? -1 : 1);
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) index = currentRef.current - 1;
      else if (event.key === "Home") index = 0;
      else if (event.key === "End") index = count - 1;
      if (index !== undefined) { event.preventDefault(); navigate(index); }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [navigate, notesOpen]);

  const currentSlide = DECK_DATA.slides[current];
  const researchNotes = DECK_DATA.researchNotes.find(note => note.slideId === currentSlide.id);

  return <div className="deck-page bg-white text-black">
    <a href="#deck-main" className="skip-link">Skip to presentation</a>
    <main id="deck-main" className="deck-stage" aria-label="Open Silicon investor presentation">
      {DECK_DATA.slides.map((slide, index) => {
        return <section key={slide.id} id={`slide-${index + 1}`} ref={element => { slideRefs.current[index] = element; }} className={`deck-slide ${current === index ? "is-active" : ""} deck-slide-${slide.id}`} tabIndex={-1} aria-label={`${index + 1}. ${slide.section}`} aria-roledescription="slide" data-notes={slideNotes[index]} inert={!mobile && !printing && current !== index ? true : undefined}>
          <div className="deck-slide-inner">
            <header className="flex shrink-0 items-center justify-between gap-5">
              <Link href="/" aria-label="Open Silicon home" className="deck-wordmark" style={{ color: "inherit" }}><BrandWordmark /></Link>
              <span className={`deck-label text-right ${index === 0 ? "deck-cover-meta" : "text-[#777]"}`}>{index === 0 ? <>{DECK_DATA.asOf}<br />{DECK_DATA.confidential}</> : slide.section}</span>
            </header>
            <div className="deck-slide-body"><DeckSlideContent index={index} onNavigate={target => { navigate(target); requestAnimationFrame(() => slideRefs.current[target]?.focus({ preventScroll: true })); }} /></div>
            <footer className="deck-folio"><span>{DECK_DATA.brand}<span className="deck-footer-separator">/</span>{DECK_DATA.documentLabel}</span><span aria-label={`Slide ${index + 1} of ${count}`}>{String(index + 1).padStart(2, "0")}</span></footer>
          </div>
        </section>;
      })}
    </main>
    <nav className="deck-controls fixed inset-x-0 bottom-0 z-40 flex h-[64px] items-center justify-between gap-4 border-t border-[var(--line)] bg-white px-6 max-[900px]:gap-2 max-[900px]:px-3" aria-label="Presentation controls">
      <Progress value={(current + 1) / count * 100} aria-label="Presentation progress" className="absolute inset-x-0 -top-px h-[2px] rounded-none bg-transparent" />
      <span className="text-xs text-[#777] max-[900px]:hidden">Open Silicon <span className="ml-5 text-[#aaa]">← → navigate &nbsp; / &nbsp; N notes</span></span>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="nav" aria-label="Table of contents" onClick={() => navigate(1)}><List aria-hidden="true" /><span className="max-[500px]:hidden">{DECK_DATA.ui.contents}</span></Button>
        <Sheet open={notesOpen} onOpenChange={setNotesOpen}>
          <SheetTrigger asChild><Button variant="ghost" size="nav" aria-label="Speaker notes" title="Speaker notes (N)"><NotebookPen aria-hidden="true" /><span className="max-[500px]:hidden">Notes</span></Button></SheetTrigger>
          <SheetContent side="right" className="deck-notes z-[70] w-full overflow-y-auto bg-white p-6 sm:max-w-xl print:hidden">
            <SheetHeader className="p-0 pt-12"><SheetTitle className="text-2xl! font-normal! tracking-[-.04em]!">{currentSlide.section}</SheetTitle><SheetDescription>Slide {current + 1} of {count}</SheetDescription></SheetHeader>
            <p className="mt-6! text-base leading-7 text-[#555]"><DeckText>{currentSlide.notes}</DeckText></p>
            {researchNotes?.sections.map(section => <section className="mt-7 border-t border-[#e5e5e8] pt-5" key={section.title}>
              <h3 className="text-base font-medium tracking-tight">{section.title}</h3>
              {section.paragraphs.map(paragraph => <p key={paragraph} className="mt-3! text-sm leading-6 text-[#555]"><DeckText>{paragraph}</DeckText></p>)}
            </section>)}
            {!!researchNotes?.sources.length && <section className="mt-7 border-t border-[#e5e5e8] pt-5">
              <h3 className="text-base font-medium">{DECK_DATA.ui.source}</h3>
              <ol className="mt-4 grid list-decimal gap-4 pl-5 text-sm leading-6">{researchNotes.sources.filter(source => source.confirmed).map(source => <li key={source.url}><a className="text-[#533afe] underline underline-offset-4" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a><span className="block text-xs text-[#777]">{source.date}</span></li>)}</ol>
            </section>}
          </SheetContent>
        </Sheet>
        <Button variant="ghost" size="nav" onClick={() => window.print()} aria-label="Print presentation"><Printer aria-hidden="true" /><span className="max-[500px]:hidden">Print</span></Button>
      </div>
      <div className="flex items-center gap-3 max-[500px]:gap-1">
        <Button variant="ghost" size="icon" aria-label="Previous slide" disabled={current === 0} onClick={() => navigate(current - 1)}><ChevronLeft aria-hidden="true" /></Button>
        <span className="min-w-14 text-center font-[family-name:var(--font-geist-mono)] text-xs tabular-nums">{String(current + 1).padStart(2, "0")} / {count}</span>
        <Button variant="default" size="icon" aria-label="Next slide" disabled={current === count - 1} onClick={() => navigate(current + 1)}><ChevronRight aria-hidden="true" /></Button>
      </div>
    </nav>
    <p className="sr-only" aria-live="polite" aria-atomic="true">Slide {current + 1} of {count}: {DECK_DATA.slides[current].section}</p>
  </div>;
}
