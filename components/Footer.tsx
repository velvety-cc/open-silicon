import Link from "next/link";
import Brand from "@/components/Brand";
import Arrow from "@/components/Arrow";

export default function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-identity">
        <Brand />
        <p>Financing GPU infrastructure<br />supported by customer contracts.</p>
      </div>
      <nav className="footer-navigation" aria-label="Footer navigation">
        <div className="footer-group">
          <h2>Open Silicon</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/research">Research</Link></li>
          </ul>
        </div>
        <div className="footer-group">
          <h2>For partners</h2>
          <ul>
            <li><Link href="/our-approach">Our Approach</Link></li>
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
        <div className="footer-disclaimer">
          <p>Financing is subject to project review, agreed terms and documentation.</p>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Open Silicon</span>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
