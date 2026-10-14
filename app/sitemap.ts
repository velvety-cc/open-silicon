import type { MetadataRoute } from "next";
import { confirmedSiteURL, navigation } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteURL = confirmedSiteURL();
  if (!siteURL) return [];
  return [
    { url: new URL("/", siteURL).toString() },
    ...navigation.map(item => ({ url: new URL(item.href, siteURL).toString() })),
    { url: new URL("/contact", siteURL).toString() },
  ];
}
