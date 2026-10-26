# Research publication-date audit

Audit date: October 26, 2026. The five requested publication dates are retained.
Review covers body text, source lists, tables, figure descriptions, captions and
the data used to regenerate the figures. A source's release or filing date must
precede the article; an earlier reporting period alone is insufficient.

| Article | Publication cutoff | Editorial result |
|---|---|---|
| Who's who in the GPU market | March 18, 2026 | Removed later financial results, acquisitions, equipment quotes, lending terms and vendor financing announcements. Examples now use dated 2024–March 2026 disclosures. |
| What a GPU earns, and what it's worth | May 12, 2026 | Removed August hardware quotes, later operating results and the rental dashboard snapshot collected in September. Rebuilt the model, tables and figure from two observations published April 2 and explicitly hypothetical cost inputs. |
| Three ways to finance GPUs | July 21, 2026 | Removed August/September facilities, a later-filed June-quarter report, September lender terms and the October SOFR conversion. Retained dated January/ March/May transaction examples. Removed return ranges whose supporting evidence was later or undated. |
| How a GPU financing deal gets done | September 9, 2026 | Removed the September 17 product-page observation and a May underwriting post revised in October. Retained the September 1 funding recap and August 10 filing; generic diligence steps are an analytical framework. |
| Bubble or build-out? | October 26, 2026 | Reviewed body dates, source labels and the rental figure. Its cited observations and reporting releases predate October 26; no chronology edit required. |

## Retained dated evidence for the earlier articles

- [Blackstone, May 17, 2024](https://www.blackstone.com/news/press/coreweave-secures-7-5-billion-debt-financing-facility-led-by-blackstone-and-magnetar/): CoreWeave's $7.5B financing.
- [CoreWeave, filed September 15, 2025](https://www.sec.gov/Archives/edgar/data/1769628/000176962825000047/crwv-20250909.htm): NVIDIA residual-capacity arrangement. The stated April 2032 term is a future contractual date disclosed in 2025, not a later observation.
- [Apollo, January 7, 2026](https://www.apollo.com/wealth/insights-news/pressreleases/2026/01/apollo-backs-5-4-billion-valor-and-xai-data-center-compute-infrastructure-transaction-with-3-5-billion-capital-solution-3214463): Valor/xAI lease transaction and NVIDIA's investment role.
- [Runpod, January 20, 2026](https://www.runpod.io/press/runpod-ai-cloud-surpasses-120m-in-arr): $120M ARR announcement.
- [CoreWeave FY2025 annual report](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000104/crwv-20251231.htm), [filed March 2, 2026](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000104/0001769628-26-000104-index.htm): contract types and accounting life.
- [CoreWeave, March 31, 2026](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-Landmark-8-5-Billion-Financing-Facility-Achieving-First-Investment-Grade-Rated-GPU-backed-Financing/default.aspx): DDTL 4.0 terms.
- [SemiAnalysis, April 2, 2026](https://newsletter.semianalysis.com/p/the-great-gpu-shortage-rental-capacity): H100 one-year pricing of $1.70 in October 2025 and $2.35 by March 2026. The May figure uses only these two observations, not later percentile ranges.
- [Applied Digital, May 4, 2026](https://ir.applieddigital.com/_assets/_2b270afc37018352de7ef24c16a6e485/appliedblockchaininc/news/2026-05-04_Applied_Digital_Announces_300_Million_Senior_150.pdf): construction bridge terms, with the spread retained without a later benchmark-rate conversion.
- [QumulusAI, May 7, 2026](https://www.qumulusai.com/articles/qumulusai-secures-26m-multi-year-lease-financing-for-50-node-nvidia-b200-gpu-cluster): three-year B200 lease; $26M denotes fixed lease payments, not loan principal.
- [CoreWeave, filed August 10, 2026](https://www.sec.gov/Archives/edgar/data/1769628/000176962826000357/crwv-20260807.htm): DDTL 5.5 covenant and its future testing start. The September article distinguishes that start from a test already in force.
- [USD.AI, September 1, 2026](https://usd.ai/blog/august-recap-100m-facility-susdai-ath): funded deployment installed and independently verified before release of capital.

The September process article also retains its general UCC and bankruptcy
references. These explain legal concepts, not later market observations.

## Model and figure provenance

`unit-economics-chart.py` generates the May figure independently of the September
dashboard CSV. The earlier combined generator delegates to it, so rebuilding
cannot restore the later-data model. Assumed per-GPU budget: $30,000 hardware +
$5,000 installation; paid occupancy 90%; recurring costs $400/month; 730 hours.
At $1.70 and $2.35/hour, cash payback is 48.8 and 30.6 months. Neither assumed
equipment budget is presented as a historical asking price.

The October article's historical-rent chart continues to use its September
snapshot, which precedes that article's publication date.

## Validation

- All 42 existing tests pass; production build, including TypeScript, succeeds.
- All 56 production HTTP checks pass, including the five published articles.
- All 51 explicit full dates in source labels are on or before the corresponding
  article's publication date. Month-only and reporting-period references were
  reviewed separately; a reporting period is not treated as a release date.
- All 12 unit-economics sensitivity cells reconcile to the revised formula.
- The updated SVG was rendered and visually inspected. Regenerating both charts
  leaves the October rent figure byte-for-byte unchanged.
