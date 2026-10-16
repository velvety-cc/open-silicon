export type ResearchHeading = { id: string; title: string; line: number };

// Source lines connect navigation entries to react-markdown's parsed H2 headings.
export function getResearchHeadings(content: string): ResearchHeading[] {
  const headings: ResearchHeading[] = [];
  const used = new Set<string>();
  let fence: { marker: string; length: number } | undefined;
  content.split(/\r?\n/).forEach((line, index) => {
    const boundary = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (boundary) {
      if (!fence) fence = { marker: boundary[1][0], length: boundary[1].length };
      else if (boundary[1][0] === fence.marker && boundary[1].length >= fence.length && !boundary[2].trim()) fence = undefined;
      return;
    }
    if (fence) return;
    const match = line.match(/^ {0,3}##[ \t]+(.+?)(?:[ \t]+#+)?[ \t]*$/);
    if (!match) return;
    const title = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
    const base = title.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-") || "section";
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    headings.push({ id, title, line: index + 1 });
  });
  return headings;
}
