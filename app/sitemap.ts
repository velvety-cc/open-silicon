import type { MetadataRoute } from "next";
import { confirmedSiteURL, navigation } from "@/lib/site";
import { getResearchPosts } from "@/lib/research";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteURL = confirmedSiteURL();
  if (!siteURL) return [];
  return [
    { url: new URL("/", siteURL).toString() },
    ...navigation.map(item => ({ url: new URL(item.href, siteURL).toString() })),
    { url: new URL("/contact", siteURL).toString() },
    ...(await getResearchPosts()).map(post => ({ url: new URL(`/research/${post.slug}`, siteURL).toString(), lastModified: post.date })),
  ];
}
