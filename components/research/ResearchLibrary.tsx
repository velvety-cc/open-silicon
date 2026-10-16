import ResearchCard, { type ResearchSummary } from "./ResearchCard";

export default function ResearchLibrary({ posts }: { posts: ResearchSummary[] }) {
  const [featured, ...remaining] = posts;

  return (
    <section className="research-library" aria-label="Research articles">
      {featured && <ResearchCard post={featured} featured />}
      {!!remaining.length && <div className="research-post-grid">{remaining.map(post => <ResearchCard key={post.slug} post={post} />)}</div>}
    </section>
  );
}
