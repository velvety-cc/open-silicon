import Link from "next/link";
import Arrow from "@/components/Arrow";
import ResearchLibrary from "@/components/research/ResearchLibrary";
import { formatResearchDate, getResearchPosts } from "@/lib/research";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Research", "Research on GPU infrastructure, contracted compute demand and deployment financing from OpenSilicon.", "/research");

export default async function ResearchPage() {
  const posts = await getResearchPosts();
  const summaries = posts.map(({ slug, title, description, category, cover, coverAlt, date, readingMinutes }) => ({ slug, title, description, category, cover, coverAlt, date, readingMinutes, dateLabel: formatResearchDate(date) }));

  return (
    <div className="container research-index">
      <header className="research-intro">
        <h1>Research</h1>
      </header>
      {posts.length ? <ResearchLibrary posts={summaries} /> : <section className="research-coming" aria-labelledby="research-coming-title"><span className="tiny-cross" aria-hidden="true">+</span><div><h2 id="research-coming-title">Research is on the way.</h2><p>We’ll share our perspectives on GPU infrastructure and financing here as our research is published.</p></div></section>}
      <p className="research-contact"><Link href="/contact">A conversation about GPU infrastructure <Arrow /></Link></p>
    </div>
  );
}
