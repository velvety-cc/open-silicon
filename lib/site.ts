import type { Metadata } from "next";

export const navigation = [
  { href: "/our-approach", label: "Our Approach" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
];
export const primaryCTA = "Discuss a financing opportunity";
export const businessDescription = "We focus on financing GPU deployments backed by contracted compute demand, working with operators and compute buyers to evaluate and structure each opportunity.";

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
  const fullTitle = pathname === "/" ? `OpenSilicon - ${title}` : `${title} — Open Silicon`;
  const url = siteURL ? new URL(pathname, siteURL).toString() : undefined;
  const images = siteURL ? [{ url: new URL("/closing-datacenter-v3.webp", siteURL).toString(), alt: "Open Silicon — GPU infrastructure financing" }] : undefined;
  return {
    title: { absolute: fullTitle },
    description,
    ...(siteURL ? { metadataBase: siteURL, alternates: { canonical: url } } : {}),
    openGraph: { title: fullTitle, description, siteName: "Open Silicon", type: "website", locale: "en_US", ...(url ? { url } : {}), ...(images ? { images } : {}) },
    twitter: { card: images ? "summary_large_image" : "summary", title: fullTitle, description, ...(images ? { images } : {}) },
    robots: { index: process.env.NODE_ENV === "production" && Boolean(siteURL), follow: true },
  };
}
