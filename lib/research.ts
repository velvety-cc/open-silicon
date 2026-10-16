import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { publishedResearchPost, type ResearchPost } from "@/lib/research-publication";
export type { ResearchPost } from "@/lib/research-publication";

const researchDirectory = path.join(process.cwd(), "content", "research");

// All public consumers use this single, publication-filtered collection.
export const getResearchPosts = cache(async (): Promise<ResearchPost[]> => {
  const files = (await readdir(researchDirectory)).filter(file => /^[a-z0-9-]+\.md$/.test(file));
  const posts = await Promise.all(files.map(async file => {
    const { data, content } = matter(await readFile(path.join(researchDirectory, file), "utf8"));
    return publishedResearchPost(file.slice(0, -3), data, content);
  }));
  return posts.filter((post): post is ResearchPost => post !== null).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
});

export async function getResearchPost(slug: string) {
  return (await getResearchPosts()).find(post => post.slug === slug);
}

// Preserve the intrinsic space for local SVG figures before their bytes arrive.
export async function getResearchFigureSizes(content: string) {
  const root = path.join(process.cwd(), "public");
  const sources = [...content.matchAll(/!\[[^\]]*\]\((\/research\/[^)\s]+\.svg)\)/g)].map(match => match[1]);
  const entries = await Promise.all([...new Set(sources)].map(async src => {
    const file = path.resolve(root, `.${src}`);
    if (!file.startsWith(`${root}${path.sep}`)) throw new Error(`Invalid research figure: ${src}`);
    const svg = (await readFile(file, "utf8")).match(/<svg\b[^>]*>/)?.[0] ?? "";
    const width = Number(svg.match(/\bwidth="([\d.]+)"/)?.[1]);
    const height = Number(svg.match(/\bheight="([\d.]+)"/)?.[1]);
    if (!(width > 0 && height > 0 && Number.isFinite(width) && Number.isFinite(height))) throw new Error(`Research figure requires intrinsic dimensions: ${src}`);
    return [src, { width, height }] as const;
  }));
  return Object.fromEntries(entries);
}

export function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
