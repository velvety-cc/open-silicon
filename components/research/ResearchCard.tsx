import Image from "next/image";
import Link from "next/link";

export type ResearchSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cover: string;
  coverAlt: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
};

export default function ResearchCard({ post, featured = false, headingLevel = 2 }: { post: ResearchSummary; featured?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={featured ? "research-card research-featured" : "research-card"}>
      <Link href={`/research/${post.slug}`} className="research-card-link">
        <div className={`research-cover${post.cover.startsWith("/hardware/") ? " research-cover-hardware" : ""}`}>
          <Image src={post.cover} alt={post.coverAlt} fill sizes={featured ? "(max-width: 760px) 100vw, 52vw" : "(max-width: 760px) 50vw, 25vw"} preload={featured} />
        </div>
        <div className="research-card-copy">
          <p className="research-post-meta"><time dateTime={post.date}>{post.dateLabel}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span></p>
          <Heading className="research-card-title">{post.title}</Heading>
        </div>
      </Link>
    </article>
  );
}
