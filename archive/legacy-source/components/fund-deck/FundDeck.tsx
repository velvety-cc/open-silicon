"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, List, Printer } from "lucide-react";
import { BrandSymbol } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FUND_DECK } from "@/lib/fund-1-deck";
import { FUND_SLIDE_BODIES } from "./slides";
const count = FUND_DECK.slides.length;
const mobileQuery = "(max-width: 900px)";
const clamp = (index: number) => Math.max(0, Math.min(count - 1, index));
function Wordmark({ cover = false }: {
    cover?: boolean;
}) {
    return <span aria-label="OpenSilicon" className={`fund-brand inline-flex shrink-0 items-center leading-none font-medium tracking-[-.06em] ${cover ? "" : "gap-[7px] text-[19px] text-[#17191b]"}`}><BrandSymbol /><span>OpenSilicon</span></span>;
}
function CoverSlide() {
    return <>
  <Image src="/hero-datacenter-final.webp" fill priority unoptimized sizes="100vw" alt="" className="pointer-events-none object-cover"/>
  <header className="cover-masthead"><Wordmark cover/><span className="cover-meta">{FUND_DECK.date}</span></header>
  <div className="cover-main"><div className="cover-copy"><p className="cover-kicker">Discussion Materials <span className="cover-separator" aria-hidden="true">·</span> Confidential</p><h1>{FUND_DECK.title}</h1><p className="subtitle">{FUND_DECK.slides[0].subtitle}</p></div></div>
 </>;
}
function SlideFooter({ page }: {
    page: number;
}) {
    return <footer className="fund-footer"><Wordmark /><div className="fund-footer-meta"><span>Confidential · {FUND_DECK.date}</span><span aria-label={`Slide ${page} of ${count}`}>{String(page).padStart(2, "0")} / {count}</span></div></footer>;
}
function SlideContent({ index }: {
    index: number;
}) {
    const slide = FUND_DECK.slides[index], Body = FUND_SLIDE_BODIES[index];
    if (index === 0)
        return <CoverSlide />;
    return <><div className="fund-main"><header className="page-heading"><div className="eyebrow">{slide.chapter}</div><h1>{slide.title}</h1><p className="subtitle">{slide.subtitle}</p></header><div className="body">{Body && <Body />}</div></div><SlideFooter page={index + 1}/></>;
}
export default function FundDeck() {
    const [current, setCurrent] = useState(0);
    const [mobile, setMobile] = useState(false);
    const [printing, setPrinting] = useState(false);
    const [contentsOpen, setContentsOpen] = useState(false);
    const viewportRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<Array<HTMLElement | null>>([]);
    const currentRef = useRef(0);
    const navigate = useCallback((index: number, scroll = true) => {
        const next = clamp(index);
        currentRef.current = next;
        setCurrent(next);
        const hash = `#slide-${next + 1}`;
        if (window.location.hash !== hash)
            window.history.replaceState(null, "", hash);
        if (scroll && window.matchMedia(mobileQuery).matches) {
            const slide = slidesRef.current[next];
            if (slide)
                window.scrollTo({ top: window.scrollY + slide.getBoundingClientRect().top - 12, behavior: "instant" });
        }
    }, []);
    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport)
            return;
        const resize = () => viewport.style.setProperty("--fund-scale", String(viewport.clientWidth / 1280));
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const media = window.matchMedia(mobileQuery);
        let frame = 0;
        const syncHash = () => { const match = window.location.hash.match(/^#slide-(\d+)$/); navigate(match ? Number(match[1]) - 1 : 0); };
        const resize = () => { setMobile(media.matches); navigate(currentRef.current); };
        const scroll = () => {
            if (!media.matches || frame)
                return;
            frame = window.requestAnimationFrame(() => { frame = 0; let next = 0; slidesRef.current.forEach((slide, index) => { if (slide && slide.getBoundingClientRect().top <= window.innerHeight * .3)
                next = index; }); if (next !== currentRef.current)
                navigate(next, false); });
        };
        const beforePrint = () => setPrinting(true), afterPrint = () => setPrinting(false);
        setMobile(media.matches);
        syncHash();
        media.addEventListener("change", resize);
        window.addEventListener("hashchange", syncHash);
        window.addEventListener("scroll", scroll, { passive: true });
        window.addEventListener("beforeprint", beforePrint);
        window.addEventListener("afterprint", afterPrint);
        return () => { cancelAnimationFrame(frame); media.removeEventListener("change", resize); window.removeEventListener("hashchange", syncHash); window.removeEventListener("scroll", scroll); window.removeEventListener("beforeprint", beforePrint); window.removeEventListener("afterprint", afterPrint); };
    }, [navigate]);
    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            const target = event.target instanceof Element ? event.target : null;
            if (contentsOpen || event.altKey || event.ctrlKey || event.metaKey || target?.closest("input,textarea,select,[role=dialog],[contenteditable=true]"))
                return;
            if (event.key === " " && target?.closest("button,a"))
                return;
            let next: number | undefined;
            if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key))
                next = currentRef.current + (event.shiftKey && event.key === " " ? -1 : 1);
            else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key))
                next = currentRef.current - 1;
            else if (event.key === "Home")
                next = 0;
            else if (event.key === "End")
                next = count - 1;
            if (next !== undefined) {
                event.preventDefault();
                navigate(next);
            }
        };
        window.addEventListener("keydown", keydown);
        return () => window.removeEventListener("keydown", keydown);
    }, [navigate, contentsOpen]);
    const jumpTo = (index: number) => { navigate(index); setContentsOpen(false); requestAnimationFrame(() => slidesRef.current[index]?.focus({ preventScroll: true })); };
    return <div className="fund-deck min-h-dvh bg-[#eeedf0] pb-16">
  <a href="#fund-deck-main" className="fund-deck-skip skip-link">Skip to presentation</a>
  <main id="fund-deck-main" className="fund-deck-stage grid min-h-[calc(100dvh-64px)] place-items-center" aria-label="OpenSilicon Fund 1 investor presentation">
   <div ref={viewportRef} className="fund-deck-viewport">
    {FUND_DECK.slides.map((slide, index) => <section key={slide.id} ref={element => { slidesRef.current[index] = element; }} id={`slide-${index + 1}`} className={`fund-slide ${index===0?"cover":slide.kind} px-[56px] py-[36px]`} data-active={index === current} aria-label={`${index + 1}. ${slide.title}`} aria-roledescription="slide" tabIndex={-1} inert={!mobile && !printing && index !== current ? true : undefined}><SlideContent index={index}/></section>)}
   </div>
  </main>
  <nav className="fund-deck-controls fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-between gap-4 border-t border-[#e5e5e8] bg-white px-6 max-[600px]:gap-2 max-[600px]:px-3" aria-label="Presentation controls">
   <Progress value={(current + 1) / count * 100} aria-label="Presentation progress" className="absolute inset-x-0 -top-px h-[2px] rounded-none bg-transparent"/>
   <span className="text-xs text-[#777] max-[900px]:hidden">OpenSilicon Fund 1<span className="ml-5 text-[#aaa]">← → navigate</span></span>
   <div className="flex items-center gap-1">
    <Sheet open={contentsOpen} onOpenChange={setContentsOpen}>
     <SheetTrigger asChild><Button variant="ghost" size="nav" aria-label="Open table of contents"><List aria-hidden="true"/><span className="max-[380px]:hidden">Contents</span></Button></SheetTrigger>
     <SheetContent side="right" style={{ zIndex: 70 }} className="fund-deck-contents w-full overflow-y-auto bg-white p-6 sm:max-w-xl print:hidden">
      <SheetHeader className="p-0 pr-10 pt-8"><SheetTitle className="text-2xl! font-normal! tracking-tight!">OpenSilicon Fund 1</SheetTitle><SheetDescription>20 slides · October 2026 · Confidential</SheetDescription></SheetHeader>
      <nav className="mt-7 grid gap-1" aria-label="Slide navigation">{FUND_DECK.slides.map((slide, index) => <Button key={slide.id} variant="ghost" size="card" aria-current={index === current ? "page" : undefined} className="h-auto! justify-start! gap-4! rounded-md! px-3! py-3! text-left! aria-[current=page]:bg-[#f0edff]!" onClick={() => jumpTo(index)}><span className="w-6 shrink-0 self-start text-xs leading-6 text-[#777] tabular-nums">{String(index + 1).padStart(2, "0")}</span><span className="text-sm leading-6">{slide.title}</span></Button>)}</nav>
     </SheetContent>
    </Sheet>
    <Button variant="ghost" size="nav" aria-label="Print presentation" onClick={() => window.print()}><Printer aria-hidden="true"/><span className="max-[500px]:hidden">Print</span></Button>
   </div>
   <div className="flex items-center gap-3 max-[500px]:gap-1">
    <Button variant="ghost" size="icon" aria-label="Previous slide" disabled={current === 0} onClick={() => navigate(current - 1)}><ChevronLeft aria-hidden="true"/></Button>
    <span className="min-w-14 text-center font-mono text-xs tabular-nums">{String(current + 1).padStart(2, "0")} / {count}</span>
    <Button size="icon" aria-label="Next slide" disabled={current === count - 1} onClick={() => navigate(current + 1)}><ChevronRight aria-hidden="true"/></Button>
   </div>
  </nav>
  <p className="sr-only" aria-live="polite" aria-atomic="true">Slide {current + 1} of {count}: {FUND_DECK.slides[current].title}</p>
 </div>;
}
