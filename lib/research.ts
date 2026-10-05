import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const researchDirectory = path.join(process.cwd(), "content", "research");

export type ResearchPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  cover: string;
  coverAlt: string;
  example: boolean;
  readingMinutes: number;
  content: string;
};

export const getResearchPosts = cache(async (): Promise<ResearchPost[]> => {
  const files = (await readdir(researchDirectory)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(files.map(async (file) => {
    const { data, content } = matter(await readFile(path.join(researchDirectory, file), "utf8"));
    const requiredFields = ["title", "description", "date", "category", "author", "cover", "coverAlt"] as const;

    for (const field of requiredFields) {
      if (typeof data[field] !== "string" || !data[field].trim()) {
        throw new Error(`Research article ${file} requires a ${field} field.`);
      }
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) {
      throw new Error(`Research article ${file} requires a date in YYYY-MM-DD format.`);
    }

    return {
      slug: file.slice(0, -3),
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      author: data.author,
      cover: data.cover,
      coverAlt: data.coverAlt,
      example: data.example === true,
      readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
      content,
    } satisfies ResearchPost;
  }));

  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
});

export async function getResearchPost(slug: string) {
  return (await getResearchPosts()).find((post) => post.slug === slug);
}

export function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
