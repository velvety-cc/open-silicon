import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";

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

export default function ResearchCard({ post, featured = false }: { post: ResearchSummary; featured?: boolean }) {
  return (
    <article className={featured ? "research-card research-featured" : "research-card"}>
      <Link href={`/research/${post.slug}`} className="research-card-link">
        <div className={`research-cover${post.cover.startsWith("/hardware/") ? " research-cover-hardware" : ""}`}>
          <Image src={post.cover} alt={post.coverAlt} fill sizes={featured ? "(max-width: 760px) 100vw, 60vw" : "(max-width: 760px) 100vw, 50vw"} preload={featured} />
        </div>
        <div className="research-card-copy">
          <div className="research-card-topline">
            <span className="research-post-category">{post.category}</span>
            {featured && <span className="research-featured-label">Featured perspective</span>}
          </div>
          <h3>{post.title}</h3>
          <p className="research-post-description">{post.description}</p>
          <div className="research-card-bottom">
            <p className="research-post-meta"><time dateTime={post.date}>{post.dateLabel}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span></p>
            <span className="research-read-label">Read article <Arrow /></span>
          </div>
        </div>
      </Link>
    </article>
  );
}
