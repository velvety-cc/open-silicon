import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Arrow from "@/components/Arrow";
import { FinancingCTA } from "@/components/SiteFrame";
import ResearchCard from "@/components/research/ResearchCard";
import ResearchContents from "@/components/research/ResearchContents";
import { pageMetadata } from "@/lib/site";
import { formatResearchDate, getResearchFigureSizes, getResearchPost, getResearchPosts } from "@/lib/research";
import { getResearchHeadings } from "@/lib/research-headings";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getResearchPosts()).map(post => ({ slug: post.slug }));
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
  const posts = await getResearchPosts();
  const index = posts.findIndex(item => item.slug === post.slug);
  const related = [...posts.slice(index + 1), ...posts.slice(0, index)].slice(0, 2);
  const headings = getResearchHeadings(post.content);
  const figureSizes = await getResearchFigureSizes(post.content);
  const markdownComponents: Components = {
    h2: ({ node, children }) => <h2 id={headings.find(heading => heading.line === node?.position?.start.line)?.id}>{children}</h2>,
    table: ({ children }) => <div className="research-table" role="region" aria-label="Data table, scroll horizontally to explore" tabIndex={0}><table>{children}</table></div>,
    p: ({ node, children }) => node?.children.some(child => child.type === "element" && child.tagName === "img") ? <figure className="research-figure">{children}</figure> : <p>{children}</p>,
    img: ({ src, alt }) => typeof src === "string" ? <a className="research-figure-link" href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size figure: ${alt ?? "Research chart"} (opens in a new tab)`}><img src={src} alt={alt ?? ""} {...figureSizes[src]} decoding="async" /><span className="research-figure-open">Open figure <Arrow /></span></a> : null,
  };

  return (
    <article className="research-article">
      <div className="container">
        <header className="research-article-header">
          <Link href="/research" className="research-back"><span aria-hidden="true">←</span> All research</Link>
          <p className="research-post-category">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="research-article-description">{post.description}</p>
          <div className="research-article-meta"><span className="research-author">{post.author}</span><time dateTime={post.date}>{formatResearchDate(post.date)}</time><span>{post.readingMinutes} min read</span></div>
        </header>
        <div className={`research-article-cover research-cover${post.cover.startsWith("/hardware/") ? " research-cover-hardware" : ""}`}>
          <Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 1440px) 100vw, 1312px" preload />
        </div>
        <div className="research-reading-layout">
          <ResearchContents headings={headings} />
          <div className="research-reading-column" id="research-body">
            <aside className="research-takeaway"><p className="research-eyebrow">The OpenSilicon view</p><p>{post.takeaway}</p></aside>
            <div className="research-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content}</ReactMarkdown></div>
            <details className="research-sources">
              <summary><span>Sources &amp; references <span className="research-source-count">{post.sources.length}</span></span><span className="research-sources-toggle" aria-hidden="true">+</span></summary>
              <ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<Arrow /></a></li>)}</ol>
            </details>
            <div className="research-article-contact"><h2>Have a GPU deployment in mind?</h2><p>Bring your project into the conversation.</p><FinancingCTA /></div>
          </div>
        </div>
        {!!related.length && <nav className="research-related" aria-labelledby="research-related-title"><div className="research-library-heading"><h2 id="research-related-title">Continue reading</h2><Link href="/research">All research <Arrow /></Link></div><div className="research-post-grid">{related.map(item => <ResearchCard key={item.slug} post={{ ...item, dateLabel: formatResearchDate(item.date) }} />)}</div></nav>}
      </div>
    </article>
  );
}
