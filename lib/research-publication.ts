export type ResearchSource = { title: string; url: string };
export type ResearchPost = {
  slug: string; title: string; description: string; date: string; category: string;
  author: string; cover: string; coverAlt: string; takeaway: string;
  sources: ResearchSource[]; readingMinutes: number; content: string;
};

export function publishedResearchPost(slug: string, data: Record<string, unknown>, content: string): ResearchPost | null {
  // Missing, misspelled or unknown states stay private. Examples cannot be published.
  if (data.status !== "published" || data.example === true) return null;
  const fields = ["title", "description", "date", "category", "author", "cover", "coverAlt", "takeaway"] as const;
  for (const field of fields) {
    if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`Published research ${slug} requires ${field}.`);
  }
  const date = data.date as string;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error(`Published research ${slug} requires a valid YYYY-MM-DD date.`);
  if (content.trim().length < 200 || !/^##\s+/m.test(content)) throw new Error(`Published research ${slug} requires a complete article body with sections.`);
  if (!Array.isArray(data.sources) || !data.sources.length) throw new Error(`Published research ${slug} requires sources.`);
  const sources = data.sources.map((item: unknown) => {
    if (!item || typeof item !== "object" || !("title" in item) || !("url" in item) || typeof item.title !== "string" || !item.title.trim() || typeof item.url !== "string") throw new Error(`Published research ${slug} has an invalid source.`);
    try { if (!["https:", "http:"].includes(new URL(item.url).protocol)) throw new Error(); } catch { throw new Error(`Published research ${slug} has an invalid source URL.`); }
    return { title: item.title.trim(), url: item.url };
  });
  return {
    slug, title: (data.title as string).trim(), description: (data.description as string).trim(), date,
    category: (data.category as string).trim(), author: (data.author as string).trim(),
    cover: (data.cover as string).trim(), coverAlt: (data.coverAlt as string).trim(),
    takeaway: (data.takeaway as string).trim(), sources,
    readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)), content,
  };
}
