"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Brand, { BrandWordmark } from "@/components/Brand";
import { navigation } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

type IndicatorRect = { x: number; y: number; width: number; height: number };
type UnderlineIndicator = { rect: IndicatorRect | null; href: string | null; visible: boolean; sliding: boolean };
const headerCTA = "Get in touch";

export default function Header() {
  const pathname = usePathname();
  const archived = ["/legacy", "/deck", "/deck.html", "/open-silicon-deck.html"].some(href => pathname === href || pathname.startsWith(`${href}/`));
  const darkHero = pathname === "/" || pathname === "/our-approach";
  const [open, setOpen] = useState(false);
  const [lightSurface, setLightSurface] = useState(!darkHero);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const hoveredLink = useRef<HTMLAnchorElement | null>(null);
  const [underline, setUnderline] = useState<UnderlineIndicator>(() => {
    const href = navigation.find(item => pathname.startsWith(item.href))?.href ?? null;
    return { rect: null, href, visible: !!href, sliding: false };
  });
  const [hover, setHover] = useState<{ rect: IndicatorRect | null; visible: boolean; sliding: boolean }>({ rect: null, visible: false, sliding: false });
  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const measureLink = (link: HTMLAnchorElement, underline = false): IndicatorRect | null => {
    if (!nav.current) return null;
    const bounds = link.getBoundingClientRect();
    if (!bounds.width) return null;
    const origin = nav.current.getBoundingClientRect();
    const styles = getComputedStyle(link);
    const left = underline ? parseFloat(styles.paddingLeft) : 0;
    const right = underline ? parseFloat(styles.paddingRight) : 0;
    return { x: bounds.left - origin.left + left, y: bounds.top - origin.top + (underline ? bounds.height - 6 : 0), width: bounds.width - left - right, height: underline ? 1 : bounds.height };
  };
  const clearHover = () => {
    hoveredLink.current = null;
    setHover(previous => ({ ...previous, visible: false }));
  };
  const positionUnderline = (link: HTMLAnchorElement | null) => {
    const rect = link ? measureLink(link, true) : null;
    const href = link?.getAttribute("href") ?? null;
    setUnderline(previous => ({
      rect: rect ?? previous.rect,
      href,
      visible: !!rect,
      // Re-measuring the same route must not turn a first appearance into a slide.
      sliding: !!rect && previous.visible && (previous.href !== href || previous.sliding),
    }));
  };
  const selectLink = (href: string) => {
    clearHover();
    const link = nav.current?.querySelector<HTMLAnchorElement>(`a[href="${href}"]`);
    if (link) positionUnderline(link);
  };
  const indicatorStyle = (rect: IndicatorRect | null) => rect ? { width: rect.width, height: rect.height, transform: `translate3d(${rect.x}px, ${rect.y}px, 0)` } : undefined;

  useLayoutEffect(() => {
    if (archived || !nav.current) return;
    let disposed = false;
    clearHover();
    setOpen(false);
    const measure = () => {
      if (disposed) return;
      const current = nav.current?.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
      positionUnderline(current ?? null);
      if (hoveredLink.current) {
        const rect = measureLink(hoveredLink.current);
        setHover(previous => ({ ...previous, rect }));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav.current);
    nav.current.querySelectorAll('a').forEach(link => observer.observe(link));
    void document.fonts.ready.then(measure);
    return () => { disposed = true; observer.disconnect(); };
  }, [pathname, archived]);

  useEffect(() => {
    if (archived) return;
    const hero = document.querySelector<HTMLElement>('main > [data-header-theme="dark"]');
    let frame: number | null = null;
    const update = () => {
      frame = null;
      setScrolled(window.scrollY > 8);
      const bottom = header.current?.getBoundingClientRect().bottom ?? 80;
      setLightSurface(!hero || hero.getBoundingClientRect().bottom <= bottom);
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [pathname, darkHero, archived]);

  if (archived) return null;

  return (
    <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Sheet open={open} onOpenChange={setOpen}>
      <header ref={header} className={`site-header marketing-header${lightSurface ? " is-light" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <Brand />
          <NavigationMenu ref={nav} className="nav-shell marketing-nav" viewport={false} aria-label="Primary navigation" data-indicators-ready={!!underline.rect} onPointerLeave={clearHover} onFocusCapture={event => { if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) clearHover(); }}>
            <span aria-hidden="true" className="marketing-nav-hover" data-visible={hover.visible} data-sliding={hover.sliding} style={indicatorStyle(hover.rect)} />
            <span aria-hidden="true" className="marketing-nav-underline" data-visible={underline.visible} data-sliding={underline.sliding} style={indicatorStyle(underline.rect)} />
            <NavigationMenuList>
              {navigation.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild active={isCurrent(href)}>
                    <Link href={href} onPointerEnter={event => {
                      if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                      hoveredLink.current = event.currentTarget;
                      const rect = measureLink(event.currentTarget);
                      setHover(previous => ({ rect, visible: !!rect, sliding: previous.visible }));
                    }} onClick={() => { if (isCurrent(href)) clearHover(); }} onNavigate={() => selectLink(href)}>{label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="header-actions">
            <Button asChild variant="outline" size="nav" className="header-contact marketing-header-cta"><Link href="/contact">{headerCTA}</Link></Button>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="menu-button" aria-label="Open navigation"><span /><span /></Button></SheetTrigger>
          </div>
        </div>
      </header>
      <SheetContent side="top" className="mobile-navigation marketing-mobile-nav">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Explore Open Silicon</SheetDescription>
        <SheetClose asChild><a className="mobile-brand-link brand" href="/" aria-label="Open Silicon home"><BrandWordmark /></a></SheetClose>
        <nav aria-label="Mobile navigation">
          {navigation.map(({ href, label }) => <SheetClose asChild key={href}><Link href={href} aria-current={isCurrent(href) ? "page" : undefined}>{label}</Link></SheetClose>)}
        </nav>
        <SheetClose asChild><Button asChild size="lg"><Link href="/contact">{headerCTA}</Link></Button></SheetClose>
      </SheetContent>
    </Sheet>
    </>
  );
}
