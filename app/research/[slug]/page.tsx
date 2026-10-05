import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatResearchDate, getResearchPost, getResearchPosts } from "@/lib/research";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getResearchPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getResearchPost((await params).slug);
  if (!post) notFound();
  return { title: `${post.title} — Open Silicon Research`, description: post.description };
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
          {post.example && <Badge variant="outline" className="research-example">Example article</Badge>}
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
        <Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 1440px) 100vw, 1312px" priority />
      </div>

      <div className="research-prose">
        {post.example && <p className="research-example-note">Example article · Sample content for this research series.</p>}
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

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
