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

export function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
