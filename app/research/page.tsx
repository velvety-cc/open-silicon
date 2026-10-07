import Image from "next/image";
import Link from "next/link";
import { FinancingCTA } from "@/components/SiteFrame";
import { formatResearchDate, getResearchPosts } from "@/lib/research";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Research", "Research on GPU infrastructure, contracted compute demand and deployment financing from Open Silicon.", "/research");

export default async function ResearchPage() {
  const posts = await getResearchPosts();
  return <div className="container research-index">
    <header className="research-intro"><div><p className="research-eyebrow">Open Silicon perspectives</p><h1>Research</h1></div><p className="research-intro-description">A closer look at GPU infrastructure<br className="research-desktop-break" /> and the fundamentals behind its financing.</p></header>
    {posts.length ? <section aria-labelledby="research-writing-title"><div className="research-section-heading"><h2 id="research-writing-title">Latest writing</h2></div><div className="research-post-grid">{posts.map((post, index) => <article key={post.slug}><Link href={`/research/${post.slug}`} className="research-post-link"><div className={`research-cover${post.cover.startsWith("/hardware/") ? " research-cover-hardware" : ""}`}><Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 760px) 100vw, 50vw" preload={index === 0} /></div><div className="research-post-copy"><div className="research-post-category">{post.category}</div><h3>{post.title}</h3><p className="research-post-description">{post.description}</p><div className="research-post-meta"><span>{post.author}</span><span aria-hidden="true">·</span><time dateTime={post.date}>{formatResearchDate(post.date)}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span><span className="research-read-label">Read article</span></div></div></Link></article>)}</div></section> : <section className="research-coming" aria-labelledby="research-coming-title"><span className="tiny-cross" aria-hidden="true">+</span><div><h2 id="research-coming-title">Research is on the way.</h2><p>We’ll share our perspectives on GPU infrastructure and financing here as our research is published.</p></div></section>}
    <div className="research-contact"><p>Have a GPU deployment in mind?</p><FinancingCTA /></div>
  </div>;
}
