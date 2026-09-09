import Image from "next/image";
import Header from "@/components/Header";
import YieldModel from "@/components/YieldModel";

const Arrow = () => <span aria-hidden="true">↗</span>;

const CubeIcon = ({ variant = 0 }: { variant?: number }) => (
  <svg className="line-icon" viewBox="0 0 48 48" aria-hidden="true">
    {variant === 0 && (
      <>
        <path d="m24 5 17 10v19L24 44 7 34V15L24 5Z" />
        <path d="m7 15 17 10 17-10M24 25v19" />
      </>
    )}
    {variant === 1 && (
      <>
        <rect x="5" y="9" width="38" height="30" rx="2" />
        <path d="M12 17h24M12 24h24M12 31h13M32 31h4" />
      </>
    )}
    {variant === 2 && (
      <>
        <circle cx="24" cy="24" r="18" />
        <path d="M24 6v36M6 24h36M11 13c8 5 18 5 26 0M11 35c8-5 18-5 26 0" />
      </>
    )}
  </svg>
);

export default function Home() {
  return (
    <>
      <div className="announcement">
        <span className="announcement-pip" />
        Private credit for the intelligence economy
        <a href="#protocol">Read the thesis <span>→</span></a>
      </div>

      <main id="top">
        <section className="hero shell">
          <Image
            className="hero-image"
            src="/hero-aidc.png"
            alt="A glass AI data center glowing at dusk"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="hero-wash" />
          <Header />

          <div className="hero-copy">
            <p className="eyebrow light"><span /> Onchain credit for AI infrastructure</p>
            <h1>Capital for<br />machines that <em>think.</em></h1>
            <p className="hero-description">
              We turn global crypto liquidity into secured credit for AI data centers—financing the GPUs, power and capacity behind frontier intelligence.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#capital">Supply capital <Arrow /></a>
              <a className="text-button light" href="#operators">Finance infrastructure <span>→</span></a>
            </div>
          </div>

          <div className="hero-index" aria-label="Key product facts">
            <div>
              <span>Target yield</span>
              <strong>7–12<sup>%</sup></strong>
              <small>Senior secured pools</small>
            </div>
            <div>
              <span>Credit pipeline</span>
              <strong>$250<sup>M+</sup></strong>
              <small>Qualified AIDC demand</small>
            </div>
            <div>
              <span>Collateral</span>
              <strong>GPU</strong>
              <small>Hardware + receivables</small>
            </div>
            <a href="#protocol" className="hero-project-link">
              Explore the protocol
              <span className="round-arrow"><Arrow /></span>
            </a>
          </div>
        </section>

        <section className="partner-strip" id="network" aria-label="Ecosystem partners">
          <p>Powering an open compute ecosystem with</p>
          <div className="partner-logos">
            <span className="wordmark nvidia"><i />NVIDIA</span>
            <span className="wordmark kimi">Kimi</span>
            <span className="wordmark deepseek">deepseek</span>
            <span className="wordmark nebius">NEBIUS</span>
            <span className="wordmark coreweave">COREWEAVE</span>
          </div>
        </section>

        <section className="manifesto section-pad">
          <div className="section-label"><span>01</span> The opportunity</div>
          <div className="manifesto-grid">
            <h2>The market has capital.<br />AI needs <em>capacity.</em></h2>
            <div className="manifesto-copy">
              <p>
                AI infrastructure is scaling faster than traditional credit can move. Circuit creates a direct, transparent route from digital capital to productive compute assets.
              </p>
              <a className="inline-link" href="#protocol">Why compute credit <Arrow /></a>
            </div>
          </div>
          <div className="ticker" aria-hidden="true">
            <div>
              <span>CRYPTO LIQUIDITY</span><b>✦</b><span>VERIFIED HARDWARE</span><b>✦</b><span>PRODUCTIVE COMPUTE</span><b>✦</b>
              <span>CRYPTO LIQUIDITY</span><b>✦</b><span>VERIFIED HARDWARE</span><b>✦</b><span>PRODUCTIVE COMPUTE</span><b>✦</b>
            </div>
          </div>
        </section>

        <section className="protocol-section section-pad" id="protocol">
          <div className="protocol-heading">
            <div className="section-label light-label"><span>02</span> Capital architecture</div>
            <h2>One rail. Three layers<br />of <em>conviction.</em></h2>
            <p>Every loan moves through a transparent, institutional-grade credit process—from asset verification to onchain servicing.</p>
          </div>

          <div className="flow-grid">
            <article className="flow-card">
              <div className="flow-card-top"><span>01 / FUND</span><CubeIcon variant={2} /></div>
              <div className="flow-orbit orbit-one"><i /><i /><i /></div>
              <h3>Global capital enters</h3>
              <p>Stablecoin liquidity is aggregated into risk-segmented, permissioned credit vaults.</p>
              <span className="flow-tag">USDC · USDT · USD</span>
            </article>

            <article className="flow-card feature-card">
              <div className="flow-card-top"><span>02 / VERIFY</span><CubeIcon variant={0} /></div>
              <div className="collateral-visual">
                <div className="gpu-slab"><span>NVIDIA</span><strong>H200</strong><small>141GB HBM3e</small></div>
                <div className="scan-line" />
              </div>
              <h3>Assets are underwritten</h3>
              <p>Hardware, off-take contracts, insurance and facility economics are continuously verified.</p>
              <span className="flow-tag">1st-lien secured</span>
            </article>

            <article className="flow-card">
              <div className="flow-card-top"><span>03 / DEPLOY</span><CubeIcon variant={1} /></div>
              <div className="flow-bars" aria-hidden="true">
                <i style={{ height: "42%" }} /><i style={{ height: "70%" }} /><i style={{ height: "58%" }} /><i style={{ height: "88%" }} /><i style={{ height: "74%" }} /><i style={{ height: "100%" }} />
              </div>
              <h3>Compute comes online</h3>
              <p>Operators finance new capacity in weeks, repaying from contracted compute revenue.</p>
              <span className="flow-tag">Measured in real time</span>
            </article>
          </div>
        </section>

        <section className="capital-section section-pad" id="capital">
          <div className="capital-copy">
            <div className="section-label"><span>03</span> For capital</div>
            <h2>Yield with a<br /><em>machine beneath it.</em></h2>
            <p>
              Access short-duration private credit backed by income-producing GPU fleets. Choose the duration and risk profile that fits your mandate.
            </p>
            <ul className="check-list">
              <li><span>✓</span> Bankruptcy-remote lending structures</li>
              <li><span>✓</span> Independent collateral monitoring</li>
              <li><span>✓</span> Transparent onchain cash flows</li>
            </ul>
          </div>
          <YieldModel />
        </section>

        <section className="operator-section" id="operators">
          <div className="operator-image" role="img" aria-label="Abstract visualization of data center capacity">
            <div className="rack-grid">
              {Array.from({ length: 24 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="capacity-orb">
              <span>AVAILABLE CAPACITY</span>
              <strong>64.8<small>MW</small></strong>
              <i>LIVE</i>
            </div>
            <div className="operator-caption">
              <span>01</span>
              <p>Real assets.<br />Real workloads.</p>
            </div>
          </div>

          <div className="operator-copy">
            <div className="section-label light-label"><span>04</span> For operators</div>
            <h2>Build at<br /><em>AI speed.</em></h2>
            <p>Debt capital purpose-built for neoclouds and data center operators. Move from signed demand to energized clusters without waiting on legacy financing.</p>
            <div className="operator-specs">
              <div><span>Facility size</span><strong>$5M—$100M</strong></div>
              <div><span>Terms</span><strong>12—36 months</strong></div>
              <div><span>Time to term sheet</span><strong>7 days</strong></div>
            </div>
            <a className="primary-button accent" href="#access">Request financing <Arrow /></a>
          </div>
        </section>

        <section className="deals-section section-pad">
          <div className="deals-heading">
            <div className="section-label"><span>05</span> Active opportunities</div>
            <h2>Infrastructure,<br /><em>underwritten.</em></h2>
          </div>

          <div className="deal-list">
            <article className="deal-row">
              <div className="deal-id"><span>01</span><i className="status-dot" /> OPEN</div>
              <div className="deal-title"><strong>H200 Cluster I</strong><span>North America</span></div>
              <div className="deal-stat"><span>Facility</span><strong>$32.0M</strong></div>
              <div className="deal-stat"><span>Target APR</span><strong>10.2%</strong></div>
              <div className="deal-stat"><span>Term</span><strong>24M</strong></div>
              <a href="#access" aria-label="View H200 Cluster I"><Arrow /></a>
            </article>
            <article className="deal-row">
              <div className="deal-id"><span>02</span><i className="status-dot amber" /> CLOSING</div>
              <div className="deal-title"><strong>B200 Pod II</strong><span>Nordics</span></div>
              <div className="deal-stat"><span>Facility</span><strong>$48.5M</strong></div>
              <div className="deal-stat"><span>Target APR</span><strong>9.6%</strong></div>
              <div className="deal-stat"><span>Term</span><strong>30M</strong></div>
              <a href="#access" aria-label="View B200 Pod II"><Arrow /></a>
            </article>
            <article className="deal-row muted-row">
              <div className="deal-id"><span>03</span><i className="status-dot grey" /> FUNDED</div>
              <div className="deal-title"><strong>H100 Campus III</strong><span>APAC</span></div>
              <div className="deal-stat"><span>Facility</span><strong>$18.0M</strong></div>
              <div className="deal-stat"><span>Target APR</span><strong>11.1%</strong></div>
              <div className="deal-stat"><span>Term</span><strong>18M</strong></div>
              <a href="#access" aria-label="View H100 Campus III"><Arrow /></a>
            </article>
          </div>
          <p className="data-disclaimer">Illustrative opportunities shown for design purposes. Availability and terms are subject to diligence.</p>
        </section>

        <section className="risk-section section-pad">
          <div className="section-label"><span>06</span> Designed for downside</div>
          <div className="risk-intro">
            <h2>Credit discipline,<br />written into the <em>rails.</em></h2>
            <p>We pair traditional project-finance rigor with the speed and transparency of onchain settlement.</p>
          </div>
          <div className="risk-grid">
            <article><span>01</span><h3>Know the machine</h3><p>Serial-level inventory, live utilization and third-party valuations keep collateral visible.</p></article>
            <article><span>02</span><h3>Know the revenue</h3><p>Repayment is sized against contracted workloads, counterparty quality and operating margins.</p></article>
            <article><span>03</span><h3>Control the cash</h3><p>Programmatic waterfalls route operating revenue to lenders before residual distributions.</p></article>
          </div>
        </section>

        <section className="closing shell" id="access">
          <Image className="closing-image" src="/hero-aidc.png" alt="" fill sizes="100vw" />
          <div className="closing-overlay" />
          <div className="closing-content">
            <p className="eyebrow light"><span /> The next data center starts here</p>
            <h2>Put capital<br />to <em>work.</em></h2>
            <p>Join the private launch for qualified capital partners and infrastructure operators.</p>
            <div className="closing-actions">
              <a className="primary-button" href="mailto:hello@circuit.credit">Request access <Arrow /></a>
              <a className="text-button light" href="mailto:credit@circuit.credit">Talk to credit <span>→</span></a>
            </div>
          </div>
          <div className="closing-coordinate">37.7749° N<br />122.4194° W</div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 24 20 10h19L28 24 17 38H2L9 24Z" fill="currentColor" /><path d="m20 10 8 14-11 14" fill="none" stroke="#111513" strokeWidth="4" /></svg>
          <strong>CIRCUIT</strong>
        </div>
        <div className="footer-links"><a href="#capital">Capital</a><a href="#operators">Operators</a><a href="#protocol">Protocol</a><a href="#network">Network</a></div>
        <div className="footer-meta"><span>© 2026 Circuit Labs</span><span>Terms</span><span>Privacy</span></div>
        <p className="footer-disclaimer">Circuit is a technology platform, not a bank. Digital assets and private credit involve risk, including possible loss of principal. Product availability is subject to jurisdiction and eligibility.</p>
      </footer>
    </>
  );
}
