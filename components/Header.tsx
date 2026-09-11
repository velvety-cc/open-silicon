"use client";

import Brand from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

import { useEffect, useRef, useState } from "react";

export default function Header({ financing = false }: { financing?: boolean }) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [menuSurface, setMenuSurface] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(financing);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeMenu) return;
    // Keep navigation colors on the white surface until the panel has retracted.
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    const timer = window.setTimeout(() => setMenuSurface(false), delay);
    return () => window.clearTimeout(timer);
  }, [activeMenu]);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("main > .hero");
    let frame: number | null = null;
    const updateSurface = () => {
      frame = null;
      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      setScrolled(window.scrollY >= (mobile ? 8 : 70));
      header.current?.style.setProperty("--header-height", `${header.current.getBoundingClientRect().height}px`);
      const probe = (header.current?.getBoundingClientRect().bottom ?? 80) + 1;
      setLightSurface(!hero || hero.getBoundingClientRect().bottom <= probe);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateSurface);
    };
    updateSurface();
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (header.current) resizeObserver.observe(header.current);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      resizeObserver.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [financing]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); else setActiveMenu(""); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const productGroups = [
    { label: "For capital", items: [
      { href: "/#protocol", label: "Marketplace" },
      { href: "/#opportunities", label: "Current offerings" },
    ] },
    { label: "For operators", items: [
      { href: "/gpu-financing", label: "GPU Financing" },
    ] },
  ];
  const links = [
    { href: "/gpu-financing", label: "GPU Financing" },
    { href: "/#compute-title", label: "About" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header ref={header} className={`site-header transition-[--header-ink] duration-200 ease-out motion-reduce:transition-none${scrolled ? " is-scrolled" : ""}${lightSurface || menuSurface ? " is-light" : ""}`}>
        <div aria-hidden="true" data-header-glass data-visible={scrolled && !lightSurface} className="pointer-events-none absolute inset-0 bg-neutral-950 opacity-0 backdrop-blur-[50px] transition-opacity duration-300 supports-[backdrop-filter:blur(1px)]:bg-black/10 data-[visible=true]:opacity-100 motion-reduce:transition-none" />
        <div aria-hidden="true" data-header-surface data-visible={lightSurface || menuSurface} className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-200 ease-out data-[visible=true]:opacity-100 motion-reduce:transition-none" />
        <div className="header-inner">
          <Brand />
          <NavigationMenu className="nav-shell" value={activeMenu} onValueChange={(value) => { setActiveMenu(value); if (value) setMenuSurface(true); }} viewport={false} aria-label="Primary navigation">
            <NavigationMenuList>
              <NavigationMenuItem value="products">
                <NavigationMenuTrigger className="h-11 bg-transparent px-3.5 font-normal text-[color:var(--ink)] transition-[background-color,box-shadow] hover:bg-black/5 hover:text-[color:var(--ink)] focus:bg-black/5 focus:text-[color:var(--ink)] data-[state=open]:bg-black/5 data-[state=open]:text-[color:var(--ink)] data-[state=open]:hover:bg-black/5 data-[state=open]:focus:bg-black/5">Products</NavigationMenuTrigger>
                <NavigationMenuContent className="group/products fixed! top-[var(--header-height,80px)]! left-0! z-50 mt-0! w-full! rounded-none! border-0! border-b! border-neutral-200! bg-white! p-0! shadow-none! [--ink:#000] data-[state=open]:animate-products-open! data-[state=closed]:animate-products-close! motion-reduce:data-[state=open]:animate-none! motion-reduce:data-[state=closed]:animate-none!">
                  <div className="grid grid-cols-[repeat(2,minmax(0,240px))] justify-center gap-12 px-[var(--shell-gutter)] pt-6 pb-10 group-data-[state=open]/products:animate-products-content group-data-[state=closed]/products:animate-products-content-close motion-reduce:animate-none!">
                    {productGroups.map((group) => <div key={group.label}>
                      <p className="mb-3! text-sm font-normal text-neutral-500">{group.label}</p>
                      <ul className="m-0 list-none space-y-1 p-0">
                        {group.items.map(({ href, label }) => <li key={href}>
                          <NavigationMenuLink asChild onSelect={() => setActiveMenu("")} className="inline-flex! min-h-10 justify-center rounded-none! bg-transparent! p-0! text-base! text-black! hover:bg-transparent! hover:text-[var(--accent)]! focus:bg-transparent! focus-visible:ring-2! focus-visible:ring-[var(--accent)]!">
                            <a href={href}>{label}</a>
                          </NavigationMenuLink>
                        </li>)}
                      </ul>
                    </div>)}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {links.map(({ href, label }) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink asChild><a href={href} aria-current={financing && href === "/gpu-financing" ? "page" : undefined}>{label}</a></NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="header-actions">
            <Button variant="inverse" size="nav" className="header-login transition-colors! duration-200! ease-out! motion-reduce:transition-none!" type="button">Login</Button>
            <Button asChild variant="outline" size="nav" className="header-contact transition-[background-color,border-color]! duration-200! ease-out! motion-reduce:transition-none!"><a href={financing ? "#project" : "#access"}>Get in touch</a></Button>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="menu-button" aria-label="Open navigation">
                <span /><span />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </header>
      <div aria-hidden="true" data-products-backdrop data-open={Boolean(activeMenu)} className="pointer-events-none fixed inset-0 z-40 bg-white/25 opacity-0 transition-opacity duration-200 ease-out data-[open=true]:opacity-100 data-[open=true]:duration-300 motion-reduce:transition-none" />
      <SheetContent side="top" className="mobile-navigation">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Explore Open Silicon</SheetDescription>
        <Brand />
        <nav aria-label="Mobile navigation">
          <Accordion type="single" collapsible>
            <AccordionItem value="products" className="border-0">
              <AccordionTrigger className="min-h-11 items-center py-3 text-base! font-normal! hover:no-underline">Products</AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="space-y-5 border-l border-neutral-200 pl-4">
                  {productGroups.map((group) => <div key={group.label}>
                    <p className="mb-1! px-3 pt-2 text-xs font-medium text-neutral-500">{group.label}</p>
                    <ul className="m-0 list-none space-y-1 p-0">
                      {group.items.map(({ href, label }) => <li key={href}>
                        <SheetClose asChild><Button asChild variant="link" className="h-auto w-full whitespace-normal! px-3! py-3! text-left hover:no-underline!">
                          <a href={href}>{label}</a>
                        </Button></SheetClose>
                      </li>)}
                    </ul>
                  </div>)}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {links.map(({ href, label }) => (
            <SheetClose asChild key={label}><Button asChild variant="link"><a href={href} aria-current={financing && href === "/gpu-financing" ? "page" : undefined}>{label}</a></Button></SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
