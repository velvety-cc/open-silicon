"use client";

import Brand from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

import { useEffect, useRef, useState } from "react";

export default function Header({ financing = false }: { financing?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(financing);
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
  }, [financing]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const links = [
    { href: "/#protocol", label: "For investors" },
    { href: "/gpu-financing", label: "GPU Financing" },
    { href: "/#compute-title", label: "About" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header ref={header} className={`site-header${scrolled ? " is-scrolled" : ""}${lightSurface ? " is-light" : ""}`}>
        <div className="header-inner">
          <Brand />
          <NavigationMenu className="nav-shell" viewport={false} aria-label="Primary navigation">
            <NavigationMenuList>
              {links.map(({ href, label }) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink asChild><a href={href} aria-current={financing && href === "/gpu-financing" ? "page" : undefined}>{label}</a></NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="header-actions">
            <Button variant="inverse" size="nav" className="header-login" type="button">Login</Button>
            <Button asChild variant="outline" size="nav" className="header-contact"><a href={financing ? "#project" : "#access"}>Get in touch</a></Button>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="menu-button" aria-label="Open navigation">
                <span /><span />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </header>
      <SheetContent side="top" className="mobile-navigation">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Explore Open Silicon</SheetDescription>
        <Brand />
        <nav aria-label="Mobile navigation">
          {links.map(({ href, label }) => (
            <SheetClose asChild key={label}><Button asChild variant="link"><a href={href} aria-current={financing && href === "/gpu-financing" ? "page" : undefined}>{label}</a></Button></SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
