import Brand from "@/components/Brand";
import Arrow from "@/components/Arrow";

export default function Footer() {
  return (
      <footer className="site-footer container">
        <div className="footer-identity">
          <Brand />
          <p>Open capital for the<br />intelligence economy.</p>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <div className="footer-group">
            <h2>Platform</h2>
            <ul>
              <li><a href="/#protocol">Marketplace</a></li>
              <li><a href="/#opportunities">Offerings</a></li>
              <li><a href="/#compute-title">Infrastructure</a></li>
            </ul>
          </div>
          <div className="footer-group">
            <h2>For partners</h2>
            <ul>
              <li><a href="/#protocol">Investors</a></li>
              <li><a href="/gpu-financing">GPU Financing</a></li>
              <li><a href="mailto:credit@circuit.credit">Discuss financing <Arrow /></a></li>
            </ul>
          </div>
          <div className="footer-group">
            <h2>Connect</h2>
            <ul>
              <li><a href="mailto:hello@circuit.credit">Contact the team <Arrow /></a></li>
              <li><a href="/#access">Private launch</a></li>
            </ul>
          </div>
        </nav>
        <div className="footer-information">
          <div className="footer-disclaimer">
            <p>Open Silicon is a technology platform, not a bank. Digital assets and private credit involve risk, including possible loss of principal. Returns are not guaranteed.</p>
            <p>Product availability is subject to jurisdiction and eligibility.</p>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Open Silicon</span>
            <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </footer>
  );
}
