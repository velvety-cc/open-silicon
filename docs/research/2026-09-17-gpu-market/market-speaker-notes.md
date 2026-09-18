# Market speaker notes

Updated: 17 September 2026. English presenter notes for the investor deck. The in-app Notes panel is the presentation copy; this file preserves the research detail and source links.

## Agentic AI is expanding inference demand

The chart compares published 2025 estimates and 2030 forecasts for global AI data center demand. Both training and inference expand, with inference gaining share. Agent use is one demand driver; these forecasts do not measure its isolated contribution.

### Demand chart: measure and forecast

McKinsey’s December 2025 model estimates training demand at 23.1 GW and inference at 20.9 GW in 2025, rising to 62.2 GW and 93.3 GW in 2030. Inference’s share of their combined demand is approximately 48% and 60%, calculated from those endpoints. Training also grows in absolute terms.

The chart shows published endpoints only, with no invented intermediate years or implied crossover date. GW measures modeled data center capacity demand, not GPU hours, paid occupancy or revenue. The source covers inference broadly, not agents alone. Hardware efficiency and deployment constraints can change the forecast.

### Demand mechanism

An agent can plan, request tools, inspect results and revise its work over repeated model calls. Parallel agents add simultaneous tasks. This expands both the number of useful applications and the inference consumed by an individual task.

Anthropic’s June 2025 engineering report observed roughly 4× chat token use for agents and 15× for multi-agent systems in its own data. These are workload-specific observations, not universal multipliers. They do not establish equal multiples of GPU hours: model size, input/output mix, caching, batching, chip choice and efficiency matter. Tool execution and elapsed task time are not continuous GPU compute.

### Adoption and procurement timeline

Claude Code became generally available in May 2025. On 2 September 2025, Anthropic reported more than $500M in annualized revenue run rate and more than 10× usage growth over three months. On 12 February 2026, run-rate revenue exceeded $2.5B and weekly active users had doubled since 1 January. Run rate is an annualization, not realized annual revenue or measured GPU usage.

On 6 May 2026, Anthropic announced access to all Colossus 1 capacity, more than 300 MW and 220,000 NVIDIA GPUs within that month. The announcement explicitly linked this and other capacity agreements to higher Claude Code and API limits. This connects product usage to physical compute procurement; it does not allocate all that capacity exclusively to Claude Code.

The June 2026 Economic Index described an increasing share of long-running agent tasks as Code and Cowork grew. Anthropic also uses Trainium and TPUs, so total Anthropic demand cannot be mapped directly to H100 rental demand.

### Evidence boundary

Chat itself is inference. The thesis is acceleration in an existing market, not the discovery of inference or an absence of earlier use cases. Agent adoption, paid compute capacity, chip utilization and borrower cash collections are distinct measures. The deck supports the first two; each operator’s paid occupancy and collections still require diligence.

### Sources

- [McKinsey · Data Center Demand Model](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-next-big-shifts-in-ai-workloads-and-hyperscaler-strategies) · 17 December 2025
- [Anthropic · Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) · 13 June 2025
- [Anthropic · Series F announcement](https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation) · 2 September 2025
- [Anthropic · Series G announcement](https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation) · 12 February 2026
- [Anthropic · Usage limits and compute capacity](https://www.anthropic.com/news/higher-limits-spacex) · 6 May 2026
- [Anthropic · Economic Index](https://www.anthropic.com/research/economic-index-june-2026-report) · 26 June 2026
- [Alphabet · Q4 2024 earnings call](https://abc.xyz/investor/events/event-details/2025/2024-Q4-Earnings-Call/) · 4 February 2025

## A new wave of inference is tightening GPU supply

The H100 contract series shows a decline followed by recovery. Market research links the change to stronger inference demand and constrained additions to available supply. This is a supported market explanation, not proof that agents alone caused the rebound.

### Price series and chart method

The chart uses SemiAnalysis’s public H100 one-year contract 25th–75th percentile ranges, typically assuming 25% prepayment. Coverage runs from the first half of 2023 through April 2026. The published periods change from half-years to quarters to months. Each rectangle represents a reported period; no daily prices or within-period movements are inferred.

The reported ranges were $2.70–3.40/GPU-hour in 1H 2023, $1.45–1.95 in October 2025 and $2.10–2.70 in April 2026. These are percentile bands, not a transaction mean, price floor or market minimum/maximum. The chart stops at April even though research was accessed in September; on-demand indices are not spliced into this contract series.

### Why prices fell

SemiAnalysis describes greater available rental inventory and competition before late 2025. Operators sought utilization and capital recovery before equipment refreshes. This supports a period of looser conditions in parts of the merchant GPU rental market.

It does not establish industry-wide overbuilding of training data centers. Alphabet said in February 2025 that AI demand exceeded its available capacity at the end of 2024 and that inference’s share of spending relative to training had been rising for three years. AWS cut H100 P5 on-demand prices by 44% in June 2025 while citing scale efficiencies and ongoing industry supply constraints. A price cut alone is not proof of weak demand or idle hardware.

### Why prices recovered

SemiAnalysis’s April 2026 market research associates tightening with agents, open models and other inference demand, plus higher server costs and slower or cancelled deployments. Existing clusters remained in use while readily available inventory was absorbed.

Claude Code was already growing rapidly by September 2025, yet the cited contract band continued falling into October. The sharper early-2026 adoption acceleration overlaps the rental rebound. The timing and mechanism support agents as a contributor, but do not isolate their causal share from reasoning, image/video generation, other customers or supply constraints.

### Hypothesis and alternative explanations

Working thesis: earlier capacity additions intensified rental competition; a new wave of inference subsequently absorbed available capacity while new supply adjusted with a lag. The narrower claim is better supported than “there were no useful applications, training facilities sat idle, and Claude Code alone reversed prices.”

Direct proof of the training-surplus hypothesis would require supplier GPU-hour allocations, paid occupancy, cluster conversion histories and attributed orders over time. Public evidence reviewed here does not provide that decomposition. A tighter market for selected models or contract terms is not evidence that every operator is fully leased.

### Sources

- [SemiAnalysis · H100 one-year contract ranges](https://gpu-index.semianalysis.com/) · Accessed 17 September 2026; series through April 2026
- [SemiAnalysis · GPU rental market research](https://newsletter.semianalysis.com/p/the-great-gpu-shortage-rental-capacity) · 2 April 2026
- [Alphabet · Q4 2024 earnings call](https://abc.xyz/investor/events/event-details/2025/2024-Q4-Earnings-Call/) · 4 February 2025
- [AWS · GPU instance price reductions](https://aws.amazon.com/blogs/aws/announcing-up-to-45-price-reduction-for-amazon-ec2-nvidia-gpu-accelerated-instances/) · 5 June 2025
- [Anthropic · Series F announcement](https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation) · 2 September 2025
- [Anthropic · Series G announcement](https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation) · 12 February 2026

## Stronger rental pricing improves capital recovery

The illustration applies historical rent ranges to a fixed August 2026 hardware cost basis. It shows price sensitivity, not realized historical project returns. An operator’s full capital recovery period is separate from repayment of a smaller bridge loan.

### Inputs and calculation

Monthly revenue per GPU = rent per paid GPU-hour × 730 hours × 90% paid occupancy. Monthly operating cash = revenue minus $400 in recurring cash costs. Static payback = installed capital / positive monthly operating cash. These occupancy, installation and operating-cost inputs are illustrative assumptions, not borrower facts.

Hashrate Index’s 31 August 2026 median asking prices were $324,438 for a new eight-GPU HGX H100 system and $246,000 for refurbished, or $40,554.75 and $30,750 per GPU. Adding an assumed $5,000 per GPU for installation and related infrastructure produces $45,554.75 and $35,750. Asking prices are not executed purchases or forced-liquidation bids; configurations are not fully standardized.

### Results and limits

At October 2025 rents of $1.45–1.95, the refurbished cost basis yields 40.6–64.7 months of static payback; at April 2026 rents of $2.10–2.70, it yields 26.0–36.5 months. The same new-hardware cost basis yields 51.7–82.4 and 33.2–46.5 months. Lower payback corresponds to the higher rent.

Historical rent observations are deliberately combined with a fixed August 2026 cost basis to isolate rental-price sensitivity. These are not historical cohort returns or September 2026 executable economics. The model assumes constant rent and occupancy beyond the one-year contract, stable collections and no operating ramp; it excludes financing, taxes, extra working capital, replacement capex and resale proceeds. It does not model the timing benefit of contractual prepayments.

Paid occupancy means billed capacity divided by available capacity, not chip utilization. A customer reserving a GPU may owe payment while the chip is idle. With the same refurbished cost basis, reducing paid occupancy to 70% extends the April rent scenario to about 36.5–53.1 months. Zero or negative operating cash has no finite payback.

### Independent operator precedent

Nebius’s Q2 2026 shareholder letter reports expected payback on new deals improving from 24–36 months to 22 months. It uses recognized revenue, excludes prepayments and includes forecast operating costs and future capacity, including assets not yet built. It is a management estimate for those contracts, not realized H100 industry payback or an input into our sensitivity.

### Implication for credit sizing

A multi-year recovery period for the operator’s entire asset investment does not itself establish whether a smaller 6–12 month loan can amortize. Advance size must fit verified stressed collections after operating costs, interest and reserves, as well as the collateral cap. The illustrative payback table is not a lighthouse DSCR or debt-repayment forecast.

### Sources

- [SemiAnalysis · H100 one-year contract ranges](https://gpu-index.semianalysis.com/) · Accessed 17 September 2026; series through April 2026
- [Hashrate Index · AI hardware asking-price index](https://beta.hashrateindex.com/blog/announcement-introducing-the-ai-hardware-price-index/) · 31 August 2026
- [Nebius · Q2 2026 shareholder letter](https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm) · 12 August 2026

## Different rental models need different capital

Financing depends on contract quality, asset status and cash flow, as well as transaction size. Open Silicon targets operating facilities with paying customers while longer-term financing is arranged. Uncontracted spot-only capacity falls outside the proposed mandate.

### Rental and financing dimensions

Transaction size, rental duration, tenant credit and operator scale are separate dimensions. A large platform may sell short capacity contracts; a small operator may secure a long one. Large dedicated buildouts require construction and deployment capital. Smaller operating clusters may need liquidity against equipment already commissioned and recurring receivables.

Nebius describes 3–6 month capacity contracts, core 1–3 year contracts and longer agreements with investment-grade customers. This supports the existence of several rental models within the same operator. Uncontracted spot-only capacity does not satisfy Open Silicon’s paying-contract requirement.

### Competitive evidence

Small GPU loans already exist. USD.AI’s August 2026 report describes $15.3M funded to QumulusAI and $7.5M funded to Corvex. This prevents a blanket claim that small operators cannot borrow. Open Silicon’s differentiation must be demonstrated through borrower fit, duration, execution, advance size and protections.

A paying compute contract is necessary but not sufficient. Its termination rights, collection history, assignment, tenant credit and cash after costs determine debt capacity. No public financing precedent proves a particular Open Silicon borrower is eligible.

### Sources

- [Nebius · Q2 2026 shareholder letter](https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm) · 12 August 2026
- [USD.AI · Funded GPU loans, August recap](https://usd.ai/insights/august-recap-100m-facility-susdai-ath) · 1 September 2026

## Institutional capital is expanding compute finance

These are external market precedents, not Open Silicon transactions or relationships. Institutional lending and selective vendor support can improve financeability for qualifying projects. They do not establish a market-wide floor for GPU rents or resale prices.

### External transaction evidence

CoreWeave’s May 2024 $7.5B debt facility was led by Blackstone and Magnetar and included funds and accounts managed by BlackRock. The amount is a facility, not a verified full draw or BlackRock’s individual contribution.

Apollo’s January 2026 $3.5B capital solution supported a $5.4B Valor/xAI compute infrastructure transaction involving GB200 equipment under leases. The amounts overlap and must not be added. NVIDIA’s anchor LP participation in the relevant vehicle does not automatically guarantee equipment value.

CoreWeave’s September 2025 NVIDIA agreement had an initial $6.3B value covering unsold capacity through 13 April 2032, subject to delivery, service and termination provisions. It is a capacity purchase arrangement, not a $6.3B loan, GPU buyback or unconditional minimum revenue for all facilities.

### NVIDIA financing platforms and support

NVIDIA’s 10 August 2026 announcement described memoranda of understanding with Apollo, BlackRock, Blackstone, Brookfield, Goldman Sachs and KKR to mobilize more than $500B of third-party capital. This is a prospective platform target, not capital already lent or an NVIDIA guarantee.

The 11 August explanation describes selective residual-value support of up to 25% of an opportunity, assessed project by project. The public term opportunity is not equivalent to GPU purchase price, loan principal or a first-loss tranche. No uniform 25% GPU price floor can be inferred.

The quarter-ended 26 July 2026 filing disclosed $36B of AI cloud capacity commitments, typically over six years, and discretionary support mechanisms. Commitments can reduce as capacity is consumed or sold to other customers. Amounts across platforms, commitments and individual agreements overlap and cannot be added.

An August 2026 media report described a pause in certain revenue-sharing support arrangements; NVIDIA responded that the model remained operational and was evolving. Availability for any new project must therefore be confirmed in signed terms. The separately disclosed Ohio residual-value guarantee relates to real property and power infrastructure and is not a general GPU resale guarantee.

### Financing flexibility and limits

CoreWeave’s August 2026 $2.6B DDTL 5.5 provides an additional precedent: approximately five-year debt against contracts averaging roughly three years, with SOFR + 5.50%, parent support and a subsequent 1.35× minimum DSCR. It shows some institutions underwrite renewal risk with additional protections, not that every small operator can borrow on that basis.

Institutional entry is positive evidence of a developing financing market. Potential take-out options may broaden, but no refinancing is promised. Support applies only to covered assets and signed obligations; it does not establish a market-wide rental or resale floor. Do not count both third-party tenant revenue and fallback capacity purchases for the same capacity.

### Sources

- [Blackstone · CoreWeave debt financing](https://www.blackstone.com/news/press/coreweave-secures-7-5-billion-debt-financing-facility-led-by-blackstone-and-magnetar/) · 17 May 2024
- [Apollo · Valor and xAI compute transaction](https://www.apollo.com/wealth/insights-news/pressreleases/2026/01/apollo-backs-5-4-billion-valor-and-xai-data-center-compute-infrastructure-transaction-with-3-5-billion-capital-solution-3214463) · 7 January 2026
- [CoreWeave · NVIDIA capacity agreement, SEC 8-K](https://www.sec.gov/Archives/edgar/data/1769628/000176962825000047/crwv-20250909.htm) · 15 September 2025; agreement dated 9 September
- [NVIDIA · Compute infrastructure financing platforms](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Partners-With-Apollo-BlackRock-Blackstone-Brookfield-Goldman-Sachs-and-KKR-to-Establish-AI-Compute-Infrastructure-Financing-Platforms-to-Mobilize-Over-500-Billion-of-Third-Party-Capital/default.aspx) · 10 August 2026
- [NVIDIA · AI factory financing and selective support](https://blogs.nvidia.com/blog/nvidia-ai-factory-compute/) · 11 August 2026
- [NVIDIA · Quarterly report, period ended 26 July 2026](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm) · Q2 FY2027
- [CoreWeave · DDTL 5.5 financing](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-2-6-Billion-Loan-Facility-Expanding-Financing-Flexibility-for-AI-Infrastructure/default.aspx) · 10 August 2026
- [CoreWeave · DDTL 5.5 agreement, SEC 8-K](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000357/crwv-20260807.htm) · August 2026
- [Reuters · Report on revenue-sharing arrangements and company response](https://finance.yahoo.com/news/nvidia-pauses-revenue-sharing-deals-223140237.html) · 27 August 2026

## Bridge credit for operating compute assets

Eligibility begins with commissioned hardware, secured power and a paying contract. Loan size must satisfy both stressed cash-flow repayment and the forced-liquidation collateral cap. A larger off-take may support refinancing, but is not an entry requirement or a guaranteed exit.

### Eligibility and advance size

The proposed mandate covers $5M–$40M operating facilities with delivered and commissioned hardware, secured power/cooling and at least one paying compute contract. Proposed loans run 6–12 months with senior security and an LTV cap of 60% measured against independently assessed forced-liquidation value.

The allowable advance is the lower of collateral-supported capacity and cash-flow-supported repayment capacity. Stressed collections must fund essential operating costs, interest, scheduled principal and reserve requirements. Recovery costs and time must be included in collateral analysis; neither an asking-price index nor hypothetical vendor support is a liquidation bid.

### Entry, repayment and take-out

A signed large off-take is not an entry condition. It may enable longer-term refinancing, but cash-supported amortization, a funded reserve and a no-refinancing scenario must substantiate the proposed exit. The policy against a large maturity balloon remains subject to verification in the lighthouse model.

The 13–16% figure is the proposed loan coupon on outstanding principal before investor-level fees. It is not a guaranteed LP return. Loan size, reserve, covenants, minimum ticket and actual borrower economics still require confirmed transaction data.
