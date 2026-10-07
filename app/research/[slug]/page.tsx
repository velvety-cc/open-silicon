import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { FinancingCTA } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { formatResearchDate, getResearchPost, getResearchPosts } from "@/lib/research";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getResearchPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getResearchPost((await params).slug);
  if (!post) notFound();
  const metadata = pageMetadata(post.title, post.description, `/research/${post.slug}`);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.date, authors: [post.author] } };
}

export default async function ResearchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getResearchPost((await params).slug);
  if (!post) notFound();
  const nextPost = (await getResearchPosts()).find((item) => item.slug !== post.slug);

  return (
    <article className="container research-article">
      <header className="research-article-header">
        <Button asChild variant="link" className="research-back"><Link href="/research">All research</Link></Button>
        <div className="research-post-category">
          <span>{post.category}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="research-article-description">{post.description}</p>
        <div className="research-article-meta">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatResearchDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </header>

      <div className={`research-article-cover research-cover${post.cover.startsWith("/hardware/") ? " research-cover-hardware" : ""}`}>
        <Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 1440px) 100vw, 1312px" preload />
      </div>

      <div className="research-prose">
        <aside className="research-takeaway"><h2>Our view</h2><p>{post.takeaway}</p></aside>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="research-prose research-sources"><h2>Sources</h2><ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ol><FinancingCTA /></div>

      {nextPost && (
        <nav className="research-next" aria-label="Continue reading">
          <p className="research-eyebrow">Continue reading</p>
          <Link href={`/research/${nextPost.slug}`}>
            <h2>{nextPost.title}</h2>
            <p>{nextPost.description}</p>
          </Link>
        </nav>
      )}
    </article>
  );
}
