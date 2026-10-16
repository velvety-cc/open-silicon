import { FinancingCTA } from "@/components/SiteFrame";
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
        <div><p className="research-eyebrow">OpenSilicon perspectives</p><h1>Research<span aria-hidden="true">.</span></h1></div>
        <p className="research-intro-description">A closer look at GPU infrastructure and the fundamentals behind its financing.</p>
      </header>
      {posts.length ? <ResearchLibrary posts={summaries} /> : <section className="research-coming" aria-labelledby="research-coming-title"><span className="tiny-cross" aria-hidden="true">+</span><div><h2 id="research-coming-title">Research is on the way.</h2><p>We’ll share our perspectives on GPU infrastructure and financing here as our research is published.</p></div></section>}
      <section className="research-contact" aria-labelledby="research-contact-title">
        <div><p className="research-eyebrow">From perspective to practice</p><h2 id="research-contact-title">What are you building?</h2><p>Let’s talk about your next GPU deployment.</p></div>
        <FinancingCTA />
      </section>
    </div>
  );
}
