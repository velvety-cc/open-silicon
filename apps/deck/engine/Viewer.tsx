"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@opensilicon/ui/button";
import { Progress } from "@opensilicon/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@opensilicon/ui/sheet";
import { ChevronLeft, ChevronRight, List, Printer } from "lucide-react";

type Slide = { page: number; title: string };
export default function Viewer({ title, slides }: { title: string; slides: Slide[] }) {
  const [active, setActive] = useState(1);
  const [reading, setReading] = useState(false);
  const [scale, setScale] = useState(1);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const [contentsOpen, setContentsOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLIFrameElement>(null);
  const frames = useRef<Record<number, HTMLIFrameElement | null>>({});
  const jump = useCallback((page: number) => {
    const value = Math.max(1, Math.min(slides.length, page));
    setActive(value);
    history.replaceState(null, "", `#slide-${value}`);
    if (reading) frames.current[value]?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [slides.length, reading]);
  const jumpFromContents = (page: number) => {
    jump(page);
    setContentsOpen(false);
    requestAnimationFrame(() => (reading ? frames.current[page] : canvas.current)?.focus({ preventScroll: true }));
  };
  const printPresentation = () => {
    const preview = window.open("/export/fund-1", "_blank");
    if (!preview) return;
    preview.opener = null;
    preview.addEventListener("load", async () => {
      await Promise.all(Array.from(preview.document.querySelectorAll("iframe")).map(async frame => {
        const document = frame.contentDocument;
        if (!document) return;
        await document.fonts.ready;
        await Promise.all(Array.from(document.images).map(image => image.decode().catch(() => {})));
      }));
      preview.print();
    }, { once: true });
  };

  useEffect(() => {
    const media = matchMedia("(max-width: 900px)");
    const update = () => setReading(media.matches);
    update(); media.addEventListener("change", update);
    const hash = () => { const page = Number(location.hash.match(/^#slide-(\d+)$/)?.[1] ?? 1); setActive(Math.max(1, Math.min(slides.length, page))); };
    hash(); addEventListener("hashchange", hash);
    return () => { media.removeEventListener("change", update); removeEventListener("hashchange", hash); };
  }, [slides.length]);
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const update = () => setScale(Math.min((element.clientWidth - 48) / 1280, (element.clientHeight - 48) / 720, 1.5));
    const observer = new ResizeObserver(update); observer.observe(element); update();
    return () => observer.disconnect();
  }, [reading]);
  useEffect(() => {
    if (!reading) return;
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        let page = 1;
        slides.forEach(slide => {
          const element = frames.current[slide.page];
          if (element && element.getBoundingClientRect().top <= innerHeight * .3) page = slide.page;
        });
        setActive(page);
        history.replaceState(null, "", `#slide-${page}`);
      });
    };
    addEventListener("scroll", scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", scroll); };
  }, [reading, slides]);
  useEffect(() => {
    const keyPage = (key: string) => key === "Home" ? 1 : key === "End" ? slides.length : ["ArrowRight", "ArrowDown", " ", "PageDown"].includes(key) ? active + 1 : ["ArrowLeft", "ArrowUp", "PageUp"].includes(key) ? active - 1 : null;
    const keydown = (event: KeyboardEvent) => {
      if (contentsOpen || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("button,input,select,textarea,a")) return;
      const page = keyPage(event.key);
      if (page !== null) { event.preventDefault(); jump(page); }
    };
    const resize = (event: MessageEvent) => {
      if (event.origin !== location.origin) return;
      if (event.data?.type === "opensilicon:slide-key" && event.source === canvas.current?.contentWindow) {
        if (contentsOpen) return;
        const next = keyPage(event.data.key);
        if (next !== null) jump(next);
        return;
      }
      if (event.data?.type !== "opensilicon:slide-size") return;
      const { page, height } = event.data;
      if (frames.current[page]?.contentWindow !== event.source || !Number.isFinite(height)) return;
      setHeights(values => values[page] === height ? values : { ...values, [page]: Math.max(100, Math.min(20000, height)) });
    };
    addEventListener("keydown", keydown); addEventListener("message", resize);
    return () => { removeEventListener("keydown", keydown); removeEventListener("message", resize); };
  }, [active, jump, slides.length, contentsOpen]);

  return <div className="deck-shell">
    {reading ? <main className="deck-reading" aria-label={title}>{slides.map(slide => <iframe key={slide.page} ref={frame => { frames.current[slide.page] = frame; }} title={`${slide.page}. ${slide.title}`} src={`/slides/fund-1/${slide.page}?reading=1`} style={{ height: heights[slide.page] ?? 900 }} loading={slide.page <= 2 ? "eager" : "lazy"} />)}</main>
      : <main ref={stage} className="deck-stage" aria-label={title}><div className="deck-viewport" style={{ width: 1280 * scale, height: 720 * scale }}><iframe ref={canvas} className="deck-canvas" title={slides[active - 1].title} src={`/slides/fund-1/${active}`} style={{ transform: `scale(${scale})` }} /></div></main>}
    <nav className="deck-controls" aria-label="Presentation controls">
      <Progress value={active / slides.length * 100} aria-label="Presentation progress" className="deck-progress" />
      <span className="deck-controls-caption">{title}<span>← → navigate</span></span>
      <div className="deck-controls-actions">
        <Sheet open={contentsOpen} onOpenChange={setContentsOpen}>
          <SheetTrigger asChild><Button variant="ghost" size="nav" aria-label="Open table of contents"><List aria-hidden="true" /><span className="deck-contents-label">Contents</span></Button></SheetTrigger>
          <SheetContent side="right" className="deck-contents">
            <SheetHeader><SheetTitle>{title}</SheetTitle><SheetDescription>{slides.length} slides · October 2026 · Confidential</SheetDescription></SheetHeader>
            <nav className="deck-contents-list" aria-label="Slide navigation">{slides.map(slide => <Button key={slide.page} variant="ghost" size="card" aria-current={active === slide.page ? "page" : undefined} className="deck-contents-item" onClick={() => jumpFromContents(slide.page)}><span className="deck-contents-number">{String(slide.page).padStart(2, "0")}</span><span>{slide.title}</span></Button>)}</nav>
          </SheetContent>
        </Sheet>
        <Button variant="ghost" size="nav" aria-label="Print presentation" onClick={printPresentation}><Printer aria-hidden="true" /><span className="deck-print-label">Print</span></Button>
      </div>
      <div className="deck-controls-navigation">
        <Button variant="ghost" size="icon" onClick={() => jump(active - 1)} disabled={active === 1} aria-label="Previous slide"><ChevronLeft aria-hidden="true" /></Button>
        <span className="deck-counter">{String(active).padStart(2, "0")} / {slides.length}</span>
        <Button size="icon" onClick={() => jump(active + 1)} disabled={active === slides.length} aria-label="Next slide"><ChevronRight aria-hidden="true" /></Button>
      </div>
    </nav>
    <p className="sr-only" aria-live="polite" aria-atomic="true">Slide {active} of {slides.length}: {slides[active - 1].title}</p>
  </div>;
}
