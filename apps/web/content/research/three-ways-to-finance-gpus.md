---
title: "Three ways to finance GPUs: offtaker-backed, bridge and equity"
description: "The first question in any GPU financing is what will repay the capital. The answer usually decides the structure."
date: "2026-07-21"
category: "Financing"
author: "OpenSilicon Research"
cover: "/research/covers/three-ways-to-finance-gpus.svg"
coverAlt: "Three schematic paths represent contracted cash flows, a bridge to a defined next step, and equity participation in future upside."
takeaway: "Choose the structure by the source of repayment. Signed compute contracts support lower-cost offtaker-backed debt. Bridge loans fund a defined gap to a known next step. Equity carries the risks that contracts and collateral cannot yet cover."
sources:
  - title: "CoreWeave · $8.5B investment-grade GPU-backed financing, March 31, 2026"
    url: "https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-Landmark-8-5-Billion-Financing-Facility-Achieving-First-Investment-Grade-Rated-GPU-backed-Financing/default.aspx"
  - title: "Applied Digital · $300M senior secured bridge facility, May 4, 2026"
    url: "https://ir.applieddigital.com/_assets/_2b270afc37018352de7ef24c16a6e485/appliedblockchaininc/news/2026-05-04_Applied_Digital_Announces_300_Million_Senior_150.pdf"
  - title: "QumulusAI · B200 equipment lease, May 7, 2026"
    url: "https://www.qumulusai.com/articles/qumulusai-secures-26m-multi-year-lease-financing-for-50-node-nvidia-b200-gpu-cluster"
  - title: "Apollo · Valor and xAI compute infrastructure lease transaction, January 7, 2026"
    url: "https://www.apollo.com/wealth/insights-news/pressreleases/2026/01/apollo-backs-5-4-billion-valor-and-xai-data-center-compute-infrastructure-transaction-with-3-5-billion-capital-solution-3214463"
status: published
---

## Introduction

Conversations about financing a GPU cluster usually start with the interest rate. That is understandable: the rate is the most visible number in any offer, and it is easy to compare. But it is the wrong place to start, because the rate is an output. It reflects a more basic choice about what will repay the capital.

The choice matters to both sides of the table. An operator that picks the wrong structure can end up with financing that is expensive, fragile or impossible to refinance. A capital provider that compares yields across structures can mistake a weaker source of repayment for a better deal.

Our thesis is that the structure should follow the source of repayment. Signed compute contracts support lower-cost offtaker-backed debt. Bridge loans fund a defined gap to a known next step. Equity carries the risks that contracts and collateral cannot yet cover.

The argument runs in seven parts. We first identify the three places a GPU deployment can repay its capital from. We then take the three structures we describe on our About page in turn: offtaker-backed financing, where the contract is the real credit; bridge loans, which need a second way out; and GPU equity, which absorbs what debt should not. A side-by-side table draws the comparison together, and a short tour of other structures shows that they are variations on the same question. Finally, we show how one project often uses all three in sequence.

The transaction examples below were announced by July 21, 2026. Their pricing figures come from those dated announcements. They are reference points, not OpenSilicon targets, and they exclude fees and credit losses. We begin with the question that comes before any of them.

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

When those terms are strong, the pricing shows it. The most visible reference points are CoreWeave's facilities. In March 2026 it closed an $8.5 billion delayed-draw term loan that it describes as the first investment-grade-rated GPU-backed financing, with a fixed-rate tranche at about 5.9% and a floating tranche at SOFR + 2.25%. The floating-rate spread is stated without converting it into an all-in coupon: that coupon changes with the benchmark rate. One large platform's transaction is a reference point, not a market-wide pricing range.

Term matching still matters. If debt runs beyond the committed customer contract, repayment may depend on renewal or re-rental at an unknown price. A lender must identify that gap and decide what amortization, reserves or other protection covers it. A strong first customer does not remove the risk after its contract ends.

Offtaker-backed debt is the cleanest structure when a creditworthy customer has already signed. Many projects, however, need capital before that point, and that is the job of the bridge loan.

## Bridge loans are repaid by a next step, so they need a second way out

A bridge loan is short-term capital that carries a project to a defined next step. It is repaid when that step happens, which is called the take-out, or from operating cash over a short period. Typical gaps include:

- Paying deposits or procurement costs before hardware is delivered.
- Delivery to commissioning and customer acceptance.
- Commissioning to a signed contract or a longer-term facility.

A dated example shows the mechanism. On May 4, 2026, Applied Digital announced a $300 million senior secured bridge facility led by Goldman Sachs, with a 364-day term at SOFR + 2.75%. It funds data center construction, so it illustrates bridge mechanics rather than a directly comparable GPU-only loan. The company's announcement says it expects to seek additional construction financing, making the next financing step explicit.

When contracted support falls away, the borrower is asking the lender to take more uncertainty. That can change the price, advance rate, reserves and permitted use of proceeds. A single disclosed construction bridge does not establish the rate for a smaller GPU deployment, and pricing should be compared only after those differences are understood.

Pricing reflects risk, but sizing is what controls it. A prudent bridge loan is sized against two limits, and the smaller one applies:

1. **Collateral.** The lender advances a share of the hardware's independently assessed net recovery value, after the cost and time of selling it.
2. **Cash flow.** Collections under stress must cover operating costs, interest, scheduled principal and reserves, with a margin.

The tenor deserves the same care, because short tenors cut both ways. A six-month loan limits how long the lender is exposed, but it also needs principal back quickly, which raises the monthly payment. A short loan is not automatically a safe one.

All of this points to the bridge loan's central risk: the next step does not arrive on time. Delivery can slip, a contract may not be signed, or the refinancing market may close. A well-built bridge therefore has a second way out, such as amortization from cash flow, a funded reserve or a sale of collateral. A bridge that works only if everything happens on schedule is closer to a bet than a loan.

Some risks are too uncertain for either kind of debt. Those belong to equity.

## Equity carries the risks that contracts and collateral cannot

GPU equity is ownership of an operator or a project company, and its role is to take the risks that lenders should not. Equity takes the first loss and keeps everything left after debt: re-rental income once the first contracts end, resale proceeds and the value of a growing platform.

Equity returns depend on the entry price, operating performance, follow-on capital and the eventual exit. A target IRR is not directly comparable with a loan's contractual coupon, and a broad infrastructure strategy is not a measured return for GPU equity. We therefore do not assign a GPU equity return benchmark from these debt examples.

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
| Disclosed example | CoreWeave: about 5.9% fixed or SOFR + 2.25% | Applied Digital: SOFR + 2.75%, 364 days; construction bridge | Negotiated ownership return; no comparable coupon |
| Fits when | A creditworthy customer has signed | There is a timing gap with a clear exit | The risk cannot yet be contracted or secured |

Read down any column and the logic holds: the weaker and less certain the source of repayment, the shorter the term, the thinner the protection and the higher the return required. The market's other structures follow the same logic.

## Other structures are variations on the same question

The three categories cover most conversations, but the market uses many variations, and each answers the same question about repayment in a different way:

- **Equipment leases.** A lessor owns the hardware and the operator pays rent. In May 2026 QumulusAI signed a three-year lease for a 50-node B200 cluster with about $26 million of total fixed payments and an option to buy at the end.
- **Amortizing term loans.** Scheduled principal payments reduce the amount that must be refinanced or recovered at maturity. The schedule has to fit the cash the deployment can produce.
- **Bank equipment financing.** A facility can fund eligible equipment purchases under an agreed borrowing limit, with pricing and repayment terms set in the documents.
- **Delayed-draw facilities.** A lender commits a total amount, and the borrower draws it as hardware is delivered. Several of CoreWeave's facilities use this form.
- **Leasing vehicles with vendor investment.** Apollo's January 2026 announcement describes NVIDIA investing in the Valor vehicle that acquired and leased compute infrastructure to an xAI subsidiary. Vendor equity in a vehicle is different from a guarantee of every GPU's resale price.

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
