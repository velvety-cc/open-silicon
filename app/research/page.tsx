import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatResearchDate, getResearchPosts } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research — Open Silicon",
  description: "Perspectives on compute, infrastructure, and the systems that connect them from Open Silicon Research.",
};

export default async function ResearchPage() {
  const posts = await getResearchPosts();

  return (
    <div className="container research-index">
      <header className="research-intro">
        <div>
          <p className="research-eyebrow">The Open Silicon blog</p>
          <h1>Research</h1>
        </div>
        <p className="research-intro-description">Perspectives on compute, infrastructure,<br className="research-desktop-break" /> and the systems that connect them.</p>
      </header>

      <section aria-labelledby="research-writing-title">
        <div className="research-section-heading">
          <h2 id="research-writing-title">Latest writing</h2>
          <span className="research-count">{String(posts.length).padStart(2, "0")} articles</span>
        </div>
        <div className="research-post-grid">
          {posts.map((post, index) => (
            <article key={post.slug}>
              <Link href={`/research/${post.slug}`} className="research-post-link">
                <div className={`research-cover${post.cover.startsWith("/hardware/") ? " research-cover-hardware" : ""}`}>
                  <Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 760px) 100vw, 50vw" priority={index === 0} />
                </div>
                <div className="research-post-copy">
                  <div className="research-post-category">
                    <span>{post.category}</span>
                    {post.example && <Badge variant="outline" className="research-example">Example article</Badge>}
                  </div>
                  <h3>{post.title}</h3>
                  <p className="research-post-description">{post.description}</p>
                  <div className="research-post-meta">
                    <time dateTime={post.date}>{formatResearchDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min read</span>
                    <span className="research-read-label">Read article</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
