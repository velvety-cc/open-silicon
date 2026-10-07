import type { MetadataRoute } from "next";
import { confirmedSiteURL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteURL = confirmedSiteURL();
  if (process.env.NODE_ENV !== "production" || !siteURL) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/legacy", "/deck", "/deck.html", "/open-silicon-deck.html", "/api/"] }, sitemap: new URL("/sitemap.xml", siteURL).toString() };
}
