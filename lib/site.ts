import type { Metadata } from "next";

export const navigation = [
  { href: "/about", label: "About" },
];
export const primaryCTA = "Discuss a financing opportunity";
export const businessDescription = "Financing the infrastructure that scales intelligence and expands what humanity can discover, build and achieve.";

// Set only after the public domain has been confirmed. Never infer it from request headers.
export function confirmedSiteURL(): URL | undefined {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.port) return undefined;
    if (url.hostname === "localhost" || url.hostname.endsWith(".test") || url.hostname.endsWith(".example") || url.hostname.endsWith(".invalid") || /^[\d.]+$/.test(url.hostname)) return undefined;
    return url;
  } catch { return undefined; }
}

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  const siteURL = confirmedSiteURL();
  const fullTitle = pathname === "/" ? `OpenSilicon - ${title}` : `${title} — OpenSilicon`;
  const url = siteURL ? new URL(pathname, siteURL).toString() : undefined;
  const images = siteURL ? [{ url: new URL("/closing-datacenter-v3.webp", siteURL).toString(), alt: "OpenSilicon — GPU infrastructure financing" }] : undefined;
  return {
    title: { absolute: fullTitle },
    description,
    ...(siteURL ? { metadataBase: siteURL, alternates: { canonical: url } } : {}),
    openGraph: { title: fullTitle, description, siteName: "OpenSilicon", type: "website", locale: "en_US", ...(url ? { url } : {}), ...(images ? { images } : {}) },
    twitter: { card: images ? "summary_large_image" : "summary", title: fullTitle, description, ...(images ? { images } : {}) },
    robots: { index: process.env.NODE_ENV === "production" && Boolean(siteURL), follow: true },
  };
}
