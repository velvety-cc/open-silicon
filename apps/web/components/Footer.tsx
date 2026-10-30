import Link from "next/link";
import Brand from "@/components/Brand";
import Arrow from "@/components/Arrow";
import { footerInformation } from "@/lib/footer-information";
import { businessDescription } from "@opensilicon/content/company";

export default function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-identity">
        <Brand />
        <p>{businessDescription}</p>
      </div>
      <nav className="footer-navigation" aria-label="Footer navigation">
        <div className="footer-group">
          <h2>OpenSilicon</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/research">Research</Link></li>
          </ul>
        </div>
        <div className="footer-group">
          <h2>For partners</h2>
          <ul>
            <li><Link href="/startups-and-enterprises">Startups and enterprises <Arrow /></Link></li>
            <li><Link href="/contact">Discuss financing <Arrow /></Link></li>
          </ul>
        </div>
        <div className="footer-group">
          <h2>Connect</h2>
          <ul>
            <li><Link href="/contact">Contact the team <Arrow /></Link></li>
          </ul>
        </div>
      </nav>
      <div className="footer-information">
        <section className="footer-disclaimer" aria-labelledby="footer-disclaimer-title">
          <h2 id="footer-disclaimer-title">Important information</h2>
          {footerInformation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} OpenSilicon</span>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
