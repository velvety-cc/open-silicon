---
title: "Three ways to finance GPUs: offtaker-backed, bridge and equity"
description: "The first question in any GPU financing is what will repay the capital. The answer usually decides the structure."
date: "2026-10-15"
category: "Financing"
author: "OpenSilicon Research"
cover: "/research/covers/three-ways-to-finance-gpus.svg"
coverAlt: "Three schematic paths represent contracted cash flows, a bridge to a defined next step, and equity participation in future upside."
takeaway: "Choose the structure by the source of repayment. Signed compute contracts support lower-cost offtaker-backed debt. Bridge loans fund a defined gap to a known next step. Equity carries the risks that contracts and collateral cannot yet cover."
sources:
  - title: "CoreWeave · $8.5B investment-grade GPU-backed financing (DDTL 4.0), March 31, 2026"
    url: "https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-Landmark-8-5-Billion-Financing-Facility-Achieving-First-Investment-Grade-Rated-GPU-backed-Financing/default.aspx"
  - title: "CoreWeave · $2.6B loan facility (DDTL 5.5), August 10, 2026"
    url: "https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-2-6-Billion-Loan-Facility-Expanding-Financing-Flexibility-for-AI-Infrastructure/default.aspx"
  - title: "CoreWeave · DDTL 5.5 credit agreement, SEC Form 8-K"
    url: "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000357/crwv-20260807.htm"
  - title: "Applied Digital · $300M senior secured bridge facility, May 2026"
    url: "https://ir.applieddigital.com/_assets/_2b270afc37018352de7ef24c16a6e485/appliedblockchaininc/news/2026-05-04_Applied_Digital_Announces_300_Million_Senior_150.pdf"
  - title: "Boost Run · Quarterly report for the period ended June 30, 2026, SEC Form 10-Q"
    url: "https://www.sec.gov/Archives/edgar/data/2090646/000149315226039031/form10-q.htm"
  - title: "Federal Reserve Bank of New York · Secured Overnight Financing Rate"
    url: "https://www.newyorkfed.org/markets/reference-rates/sofr"
  - title: "USD.AI · Borrower terms (accessed September 17, 2026)"
    url: "https://usd.ai/borrow"
  - title: "USD.AI · August 2026 recap of funded GPU loans"
    url: "https://usd.ai/insights/august-recap-100m-facility-susdai-ath"
  - title: "Astatine · Infrastructure strategy"
    url: "https://astatineip.com/infrastructure/"
  - title: "QumulusAI · $26M multi-year lease financing for a B200 cluster, May 2026"
    url: "https://www.qumulusai.com/articles/qumulusai-secures-26m-multi-year-lease-financing-for-50-node-nvidia-b200-gpu-cluster"
  - title: "Lambda · $926M senior secured term loan B facility, August 2026"
    url: "https://lambda.ai/blog/lambda-closes-926-million-senior-secured-term-loan-b-facility"
  - title: "DigitalOcean · Equipment financing facility, SEC Form 8-K, September 2026"
    url: "https://www.sec.gov/Archives/edgar/data/1582961/000110465926106704/tm2625205d1_8k.htm"
  - title: "NVIDIA · Quarterly report for the period ended July 26, 2026, SEC Form 10-Q"
    url: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm"
  - title: "NVIDIA · AI factory financing and selective residual-value support, August 11, 2026"
    url: "https://blogs.nvidia.com/blog/nvidia-ai-factory-compute/"
status: published
---

## Introduction

Conversations about financing a GPU cluster usually start with the interest rate. That is understandable: the rate is the most visible number in any offer, and it is easy to compare. But it is the wrong place to start, because the rate is an output. It reflects a more basic choice about what will repay the capital.

The choice matters to both sides of the table. An operator that picks the wrong structure can end up with financing that is expensive, fragile or impossible to refinance. A capital provider that compares yields across structures can mistake a weaker source of repayment for a better deal.

Our thesis is that the structure should follow the source of repayment. Signed compute contracts support lower-cost offtaker-backed debt. Bridge loans fund a defined gap to a known next step. Equity carries the risks that contracts and collateral cannot yet cover.

The argument runs in seven parts. We first identify the three places a GPU deployment can repay its capital from. We then take the three structures we describe on our About page in turn: offtaker-backed financing, where the contract is the real credit; bridge loans, which need a second way out; and GPU equity, which absorbs what debt should not. A side-by-side table draws the comparison together, and a short tour of other structures shows that they are variations on the same question. Finally, we show how one project often uses all three in sequence.

The pricing figures throughout come from publicly disclosed transactions. They are reference points, not OpenSilicon targets, and they exclude fees and credit losses. We begin with the question that comes before any of them.

## Every financing starts with a source of repayment

Before any structure can be chosen, it helps to be clear about where the money to repay it will come from. A GPU deployment has three possible sources:

- **Contracted cash.** A customer has signed to pay for compute over a set period. The lender wants to know whether the customer will pay, and whether the lender can reach that cash if something goes wrong.
- **A known next step.** Hardware arrives, a cluster passes acceptance testing, a contract is signed or a longer-term facility closes. The lender wants to know how likely that step is and what happens if it slips.
- **What remains.** Hardware is re-rented after the first contract, resold or used to grow the business. The investor wants to know what that upside is worth and who absorbs the downside.

Each source maps to one of the three structures, and a single project often uses all three at different stages. The cheapest of them rests on the first source: contracted cash.

## Offtaker-backed financing is repaid by contracts, so the contract is the credit

Offtaker-backed financing is debt sized against signed compute contracts, and it works because the customer's payments, not the operator's hopes, repay it. Customer payments go into a controlled account. From there they pay operating costs and debt service in an agreed order, often called the waterfall, and the operator receives what remains. The debt usually amortizes over the contract term, so most of it has been repaid by the time the contract ends.

Because the customer is the real credit, the contract is what the lender is really buying. Five terms decide whether a contract can support debt:

- **Customer credit.** An investment-grade customer can transform the cost of the whole financing.
- **Commitment.** A take-or-pay or minimum-commitment contract supports more debt than one that pays only for usage.
- **Termination and service credits.** If the customer can walk away, or cut payments when service levels slip, the lender is exposed to the operator's performance as well as the customer's.
- **Prepayment.** Customers often pay part of the contract in advance. That changes the timing of cash, so prepaid amounts cannot be counted again as monthly revenue.
- **Assignability.** The lender needs to take security over the contract and its receivables. Some contracts restrict that.

When those terms are strong, the pricing shows it. The most visible reference points are CoreWeave's facilities. In March 2026 it closed an $8.5 billion delayed-draw term loan that it describes as the first investment-grade-rated GPU-backed financing, with a fixed-rate tranche at about 5.9% and a floating tranche at SOFR + 2.25%. In August 2026 it closed a $2.6 billion facility at SOFR + 5.50%, which is about 9.4% using the 3.88% SOFR published on October 7, 2026. These two transactions anchor the roughly 6–10% range shown on our About page.

The August facility also shows how the structure is evolving. Its debt runs about five years against customer contracts that average roughly three years, so its lenders are underwriting renewal risk: the chance that the capacity is re-contracted on similar terms. In return they have other protections, including a parent guarantee, collateral and a minimum debt service coverage ratio of 1.35×. That is a meaningful development, but those terms reflect a large platform and should not be assumed for every operator.

Offtaker-backed debt is the cleanest structure when a creditworthy customer has already signed. Many projects, however, need capital before that point, and that is the job of the bridge loan.

## Bridge loans are repaid by a next step, so they need a second way out

A bridge loan is short-term capital that carries a project to a defined next step. It is repaid when that step happens, which is called the take-out, or from operating cash over a short period. Typical gaps include:

- Paying deposits or procurement costs before hardware is delivered.
- Delivery to commissioning and customer acceptance.
- Commissioning to a signed contract or a longer-term facility.

Because the risks of these gaps vary, the public reference points sit in a wider band than for contracted debt. In May 2026 Applied Digital closed a $300 million senior secured bridge facility led by Goldman Sachs. It has a 364-day term, carries SOFR + 2.75% (about 6.6%) and funds data center construction. At the other end, Boost Run disclosed an August 2025 bridge loan at prime + 4.50% with a 7.50% floor on the prime rate, so the rate cannot fall below 12%. That loan was secured by substantially all of the company's assets and repaid in May 2026. Together these anchor the roughly 7–12% range on our About page.

The band widens further as contracted support falls away. USD.AI, a specialist GPU lender, advertises 12–15% plus a 3% origination fee for borrowers without an offtake contract or with contracts shorter than 24 months. Among its funded loans, it reports a $7.5 million three-year loan to Corvex at a fixed 10% and a $15.3 million loan to QumulusAI at a fixed 15%. Similar loan sizes priced five points apart show that the borrower and its contracts matter more than the ticket size.

Pricing reflects risk, but sizing is what controls it. A prudent bridge loan is sized against two limits, and the smaller one applies:

1. **Collateral.** The lender advances a share of the hardware's independently assessed net recovery value, after the cost and time of selling it.
2. **Cash flow.** Collections under stress must cover operating costs, interest, scheduled principal and reserves, with a margin.

The tenor deserves the same care, because short tenors cut both ways. A six-month loan limits how long the lender is exposed, but it also needs principal back quickly, which raises the monthly payment. A short loan is not automatically a safe one.

All of this points to the bridge loan's central risk: the next step does not arrive on time. Delivery can slip, a contract may not be signed, or the refinancing market may close. A well-built bridge therefore has a second way out, such as amortization from cash flow, a funded reserve or a sale of collateral. A bridge that works only if everything happens on schedule is closer to a bet than a loan.

Some risks are too uncertain for either kind of debt. Those belong to equity.

## Equity carries the risks that contracts and collateral cannot

GPU equity is ownership of an operator or a project company, and its role is to take the risks that lenders should not. Equity takes the first loss and keeps everything left after debt: re-rental income once the first contracts end, resale proceeds and the value of a growing platform.

Because that upside is uncertain, public return benchmarks specific to GPU equity are scarce. The 15%+ figure on our About page is a gross target IRR from Astatine's infrastructure strategy, which includes data centers, and we use it as a broad infrastructure proxy. GPU equity carries risks that buildings and power assets do not, including rapid technology turnover. The proxy is therefore a starting reference, not a measured GPU return.

Equity matters to lenders as much as to owners. It funds what debt should not: deposits before there is collateral, the ramp before contracts start, and capacity sold only on demand. Uncontracted spot capacity is mainly an equity risk, because its cash flow can change quickly. Lenders generally expect the operator to keep meaningful equity at risk, so that owner and lender share an interest in the project's success.

With all three structures described, it helps to put them next to one another.

## Side by side, the trade-offs are clear

Set out together, the three structures differ less in their mechanics than in what repays them. The table below compares them on the dimensions that matter most.

| | Offtaker-backed financing | Bridge loan | GPU equity |
|---|---|---|---|
| Repaid by | Contracted customer payments | A defined next step, or short-term cash flow | Cash left after debt, resale and growth |
| Typical term | Matched to the contract, often several years | Months | Open-ended, until an exit |
| Main protection | Contract, cash control and security over hardware | Collateral, cash control and reserves | Ownership only |
| Main risk | Customer credit and contract terms | The next step slips or fails | Pricing, utilization and obsolescence |
| Public reference | ≈6–10% annual loan pricing | ≈7–12% annual loan pricing | 15%+ gross target IRR, infrastructure proxy |
| Fits when | A creditworthy customer has signed | There is a timing gap with a clear exit | The risk cannot yet be contracted or secured |

Read down any column and the logic holds: the weaker and less certain the source of repayment, the shorter the term, the thinner the protection and the higher the return required. The market's other structures follow the same logic.

## Other structures are variations on the same question

The three categories cover most conversations, but the market uses many variations, and each answers the same question about repayment in a different way:

- **Equipment leases.** A lessor owns the hardware and the operator pays rent. In May 2026 QumulusAI signed a three-year lease for a 50-node B200 cluster with about $26 million of total fixed payments and an option to buy at the end.
- **Term loans with full amortization.** Lambda closed a $926 million senior secured term loan in August 2026 at SOFR + 3.00%, fully amortizing by the end of 2030, to fund deployments for investment-grade customers.
- **Bank equipment financing.** In September 2026 DigitalOcean disclosed $725 million of committed equipment financing. Each draw is fixed at the matching SOFR swap rate plus 2.75% and amortizes monthly.
- **Delayed-draw facilities.** A lender commits a total amount, and the borrower draws it as hardware is delivered. Several of CoreWeave's facilities use this form.
- **Vendor support.** NVIDIA disclosed $36 billion of AI cloud capacity commitments as of July 26, 2026, typically over six years. It also describes selective residual-value support of up to 25% of an opportunity, assessed project by project. Where it applies, this support strengthens a financing. It is not a market-wide floor for GPU prices.

Each of these changes who owns the hardware, when the money is drawn or who stands behind the cash flow. None changes the underlying question. That question is easiest to see over the life of a single project, which often moves through all three main structures.

## One project often uses all three, in sequence

Over its life, a single deployment can pass through equity, a bridge and term debt as its source of repayment becomes more certain. Consider a simplified, hypothetical project:

1. **Order.** The operator's equity funds deposits, because there is no collateral yet.
2. **Delivery and installation.** A bridge loan, secured by the delivered hardware, funds the remaining payments and the work needed to bring the cluster into service.
3. **Commissioned and contracted.** Offtaker-backed term debt refinances the bridge and amortizes over the customer contract.
4. **Contract ends.** The hardware is re-rented or sold, and equity keeps what remains.

Each handoff in that sequence is a point of risk. If the term debt in step three does not arrive, the bridge has to be repaid another way. That is why we assess the whole path a project will take, not only the instrument being discussed.

## Summary

The structure of a GPU financing should follow its source of repayment. Signed contracts support lower-cost offtaker-backed debt, bridge loans fund a defined gap to a known next step, and equity carries the risks that contracts and collateral cannot yet cover.

A deployment can repay capital from contracted cash, from a known next step or from what remains after debt. Offtaker-backed financing rests on the first, so the customer's credit and the contract's terms are what the lender is really buying. Bridge loans rest on the second, so they must be sized to collateral and stressed cash flow and need a second way out if the next step slips. Equity rests on the third and absorbs what debt should not, from deposits to spot capacity. Placed side by side, the structures show a consistent pattern: less certain repayment means shorter terms, thinner protection and higher required returns. Leases, delayed-draw facilities and vendor support vary the mechanics without changing that logic, and a single project often moves through all three structures as it matures.

Two practical conclusions follow. Operators should start with the source of repayment rather than the rate, because the documents a lender asks for, and the price it offers, follow from that answer. Capital providers should compare yields within a structure, not across structures, because a higher coupon usually reflects a weaker source of repayment, not a better deal.
