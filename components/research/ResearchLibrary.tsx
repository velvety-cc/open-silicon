"use client";

import { useState } from "react";
import ResearchCard, { type ResearchSummary } from "./ResearchCard";

export default function ResearchLibrary({ posts }: { posts: ResearchSummary[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const categories = [...new Set(posts.map(post => post.category))];
  const filtered = category ? posts.filter(post => post.category === category) : posts;
  const [featured, ...remaining] = filtered;

  return (
    <section aria-labelledby="research-writing-title">
      <div className="research-library-heading">
        <h2 id="research-writing-title">Perspectives on the compute economy</h2>
        <span className="research-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
      </div>
      <div className="research-filters" role="group" aria-label="Filter research by topic">
        {[null, ...categories].map(item => <button key={item ?? "all"} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item ?? "All research"}</button>)}
      </div>
      {category ? <div className="research-post-grid">{filtered.map(post => <ResearchCard key={post.slug} post={post} />)}</div> : <>
        {featured && <ResearchCard post={featured} featured />}
        {!!remaining.length && <div className="research-post-grid">{remaining.map(post => <ResearchCard key={post.slug} post={post} />)}</div>}
      </>}
    </section>
  );
}
