---
title: "How a GPU financing deal gets done"
description: "From the first call to a funded cluster: who is involved, what lenders need to see and where deals slow down."
date: "2026-10-15"
category: "Deal process"
author: "OpenSilicon Research"
cover: "/research/covers/how-a-gpu-financing-deal-gets-done.svg"
coverAlt: "Six connected stages represent the path from a first conversation through funding and the life of a GPU loan."
takeaway: "GPU deals close on evidence. Timing depends on how quickly four things can be proven: the hardware exists and is owned, the facility can run it, a creditworthy customer is paying, and the lender can take control if something goes wrong."
sources:
  - title: "USD.AI · Underwriting and risk management, May 15, 2026"
    url: "https://usd.ai/insights/usdai-underwriting-and-risk-management"
  - title: "USD.AI · Borrower terms (accessed September 17, 2026)"
    url: "https://usd.ai/borrow"
  - title: "USD.AI · August 2026 recap of funded GPU loans"
    url: "https://usd.ai/insights/august-recap-100m-facility-susdai-ath"
  - title: "Macquarie · Compute infrastructure financing for Fluidstack"
    url: "https://www.macquarie.com/nz/en/insights/accelerating-investment-in-compute-infrastructure-for-fluidstack-a-leading-ai-cloud-platform.html"
  - title: "CoreWeave · $8.5B delayed-draw GPU-backed financing, March 31, 2026"
    url: "https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-Landmark-8-5-Billion-Financing-Facility-Achieving-First-Investment-Grade-Rated-GPU-backed-Financing/default.aspx"
  - title: "CoreWeave · DDTL 5.5 credit agreement, SEC Form 8-K, August 2026"
    url: "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000357/crwv-20260807.htm"
  - title: "Legal Information Institute · UCC § 9-310, when filing is required to perfect a security interest"
    url: "https://www.law.cornell.edu/ucc/9/9-310"
  - title: "United States Courts · Chapter 11 bankruptcy basics"
    url: "https://www.uscourts.gov/court-programs/bankruptcy/bankruptcy-basics/chapter-11-bankruptcy-basics"
  - title: "Silicon Data · GPU residual value methodology"
    url: "https://www.silicondata.com/products/gpu-residual-value"
status: published
---

## Introduction

GPU financings look different on the surface. The hardware, the customers and the sites vary from deal to deal, and so do the people sitting across the table. Underneath, most follow the same sequence: a first conversation, indicative terms, diligence, documents, funding and then the life of the loan.

Knowing that sequence matters because time is expensive on both sides. An operator waiting for capital is often paying for hardware, space or power that is not yet earning. A capital provider that cannot tell a slow deal from a weak one wastes effort on the wrong projects. Both benefit from understanding what actually moves a deal forward.

Our thesis is that GPU deals close on evidence. Timing depends on how quickly four things can be proven: the hardware exists and is owned, the facility can run it, a creditworthy customer is paying, and the lender can take control if something goes wrong.

The rest of this note follows the sequence and shows how each stage serves that argument. We start with the parties whose cooperation a financing needs. We then walk through six stages: a first conversation that tests for a source of repayment, indicative terms that set the basis for comparison, diligence that proves the first three of the four things, documents that secure the fourth, funding tied to physical milestones, and a loan life in which monitoring matters more than paperwork. We close with what determines how long all this takes and how a borrower can shorten it.

This describes common practice in the market today. Where we give specific terms, they come from lenders that publish them, so readers can see a concrete example. Every lender differs in the details, and the terms of any particular financing depend on the transaction. With that in mind, the first thing to understand is who needs to be involved.

## Many parties must cooperate before money moves

Even a modest GPU financing involves far more parties than the borrower and the lender, and each one holds a piece of the evidence:

- **The borrower** is the operator, often acting through a special-purpose company that owns the hardware and holds the customer contracts.
- **The offtaker** is the customer whose contract supports repayment.
- **The lender** may be a single fund or bank, or a group of lenders brought together by an arranger.
- **The data center or colocation provider** owns the site. Its cooperation matters if the lender ever needs to reach the hardware.
- **The hardware vendor or reseller** delivers the servers and provides invoices, serial numbers and warranties.
- **The collateral agent or trustee** holds the security on behalf of the lenders.
- **The account bank or escrow agent** controls where cash is held and how it moves.
- **Independent inspectors and appraisers** confirm the hardware is installed and estimate what it is worth.
- **Lawyers** on each side draft and negotiate the documents.

The length of that list explains much of what follows. Every party that must sign, confirm or consent is a possible source of delay, and the process is designed to collect their evidence in a sensible order. It starts with a conversation.

## Stage 1: The first conversation tests for a source of repayment

The first conversation is short by design: its job is to find out quickly whether there is a credible source of repayment and whether the deal fits the lender's mandate. A lender's first questions usually cover:

- The hardware: GPU model, number of systems and configuration.
- The site: where the hardware will run and whether power is already available.
- The customer: who has signed, for how long, at what price, and on what termination and prepayment terms.
- The request: how much capital is needed, what it will pay for and by when.
- The company: who owns it, its financial history and its experience running GPU infrastructure.

Many conversations end at this stage, and that is useful for both sides. Common reasons include no signed customer, an unclear use of proceeds or a timeline the lender cannot meet. When the basics fit, the lender is ready to put a proposal on paper.

## Stage 2: Indicative terms set the basis for comparison

Indicative terms translate the first conversation into numbers, and they establish the basis on which offers should be compared. They are often set out in a term sheet. Most of it is non-binding, although confidentiality, exclusivity and expense provisions usually are binding. The main items are:

- **Amount and advance rate.** The share of the hardware's value the lender will lend, and what that value is measured against.
- **Tenor and amortization.** How long the loan runs and how quickly principal is repaid.
- **Pricing.** The interest rate and fees.
- **Reserves.** Cash set aside to cover debt service if collections are late.
- **Covenants.** Financial tests the borrower must keep meeting, such as a minimum debt service coverage ratio.
- **Conditions precedent.** What must be true before any money moves.

Published terms give a sense of the range. USD.AI, a specialist GPU lender, lends up to 80% of verified acquisition cost. It requires a debt service reserve equal to three months of peak scheduled payments, funded from the borrower's equity before the loan is released. It tests a minimum debt service coverage ratio of 1.15× every quarter. CoreWeave's August 2026 facility, at a very different scale, sets a minimum coverage ratio of 1.35×.

Those differences are why the basis matters as much as the headline. When comparing offers, check what each advance rate is measured against: eighty percent of acquisition cost and sixty percent of independently assessed liquidation value can lead to very different loan sizes. Fees and reserves also reduce the cash the borrower actually receives. Once the terms are agreed in principle, the lender has to verify what it has been told.

## Stage 3: Diligence proves the hardware, the site and the customer

Diligence is where claims become evidence, and it is where the first three parts of our thesis are proven or disproven. It covers four areas:

1. **Hardware.** Purchase orders, invoices and serial numbers; proof of ownership; searches for existing liens; delivery and installation status; warranties. This shows the hardware exists and is owned.
2. **Facility and power.** The colocation or lease agreement, available power, the facility's standard and insurance, and whether the site owner will grant the lender access. This shows the facility can run it.
3. **Contract and customer.** The executed contract, payment history, the customer's credit, termination rights and whether the contract can be assigned to the lender as security. This shows a creditworthy customer is paying.
4. **Operator.** Financial statements, ownership, evidence of the equity the operator has invested, and its team and operating record. Lenders also run identity, anti-money-laundering and sanctions checks.

USD.AI publishes its pre-closing list, which makes a useful concrete example. It asks for an ownership chart, trailing twelve months of financial statements and evidence of equity. It also requires the executed GPU purchase order, colocation agreement and offtake agreement, or revenue history for borrowers without one. Lien and judgment searches, identity checks and sanctions screening complete the list.

One more piece of evidence sits across all four areas: valuation. The lender needs a defensible estimate of what the hardware would fetch in a sale, after the costs and time involved. Asking prices and model-based estimates, such as discounted-cash-flow residual values, are useful inputs, but neither is the same as a price a buyer has agreed to pay.

Diligence shows that the asset, the site and the customer are real. It cannot, on its own, give the lender control over them. That is the job of the documents.

## Stage 4: Documents give the lender control

The documents turn the term sheet and the diligence into enforceable rights, which is how the lender establishes that it can take control if something goes wrong. Most GPU financings use the same building blocks:

- **A special-purpose company.** The hardware, customer contracts and bank accounts sit in a separate company created for the financing. It is designed so that problems elsewhere in the operator's business do not reach the financed assets. USD.AI, for example, uses a bankruptcy-remote vehicle that cannot take on other debt or file for bankruptcy voluntarily without an independent manager's consent.
- **Security.** The lender takes a first-priority security interest over the company's assets and a pledge of its shares. In the United States, a public filing under the Uniform Commercial Code is generally required to perfect that interest, making it effective against other creditors.
- **Cash control.** The customer pays into an account the lender can control. Cash then flows through an agreed order: operating costs, interest, principal and reserves first, then the operator.
- **Contract assignment.** The customer contract is assigned to the lender as security. Some contracts require the customer's consent.
- **Site access.** The data center owner waives any claim over the hardware and agrees to give the lender access if needed.
- **Insurance.** Property and casualty cover protects against fire, flood and theft, usually with the lender named on the policy.
- **Covenants, reporting and defaults.** The borrower reports collections and utilization, and the lender tests coverage ratios. The documents set out what counts as a default and how it can be cured.

Each block answers a specific "what if." What if the operator has other creditors, the customer pays late, the landlord changes its mind or the building floods? With those answers written down, the remaining question is when the money actually moves.

## Stage 5: Funding follows physical milestones

At closing, the conditions precedent are checked off: documents signed, filings made, insurance placed, reserves funded and the operator's equity confirmed. Even then, funding is often tied to what has physically happened rather than to signatures alone.

USD.AI's approach shows the principle clearly. It holds loan capital in escrow and releases it only after the hardware is physically installed and verified on site by an independent third party, and its August 2026 report describes funding a loan to QumulusAI on that basis. Larger facilities often use a delayed-draw structure instead, in which the lender commits a total amount and the borrower draws it as hardware is delivered. Several of CoreWeave's facilities work this way.

Either way, the money follows the evidence. Once it has moved, the work does not stop; it changes character.

## Stage 6: After funding, monitoring matters more than paperwork

After funding, the lender's work shifts from verification to monitoring. Collections flow through the controlled account, reserves are topped up before any distributions, and the lender tests covenants on schedule. Many loans can be prepaid, and a bridge loan is expected to be repaid when longer-term financing arrives.

When performance weakens, documents usually provide a path back before a default. USD.AI's process is a clear example. Two consecutive quarters below its coverage test open a 30-day cure period requiring a partial prepayment. If the prepayment is not made, the loan is accelerated and the lender moves to enforce against the collateral.

Enforcement is where the earlier stages are tested, and it takes time. In the United States, a bankruptcy filing triggers an automatic stay that pauses most collection actions. Even without one, the lender has to reach the site, then either keep the hardware running or remove, transport and sell it. A short loan does not guarantee a quick recovery.

This is why the structure, the site access agreement and the valuation receive so much attention before funding rather than after. It also explains why some deals take longer than others.

## Timelines depend on how quickly the evidence arrives

How long a financing takes depends less on the lender's appetite than on how quickly the evidence can be assembled. Timelines vary widely. USD.AI advertises closings in under 30 days. Macquarie describes closing senior debt secured by GPUs for Fluidstack in a matter of weeks. Large facilities with several lenders, first-time borrowers and assets in more than one country usually take longer.

The delays tend to come from the same places, and almost all of them are missing or contested evidence:

- Existing liens on the hardware that must be released.
- A data center owner that is slow to sign an access agreement.
- A customer whose consent is needed to assign the contract.
- Missing financial statements or unclear ownership.
- Hardware that arrives late or fails acceptance testing.
- Disagreement about what the hardware is worth.

If delays come from missing evidence, the remedy is to have it ready before the first call.

## Preparing the evidence shortens every stage

A borrower cannot control a lender's process, but it can control how ready it is. Having the following in hand does not guarantee a financing, but it shortens every stage above:

- **Hardware:** purchase orders, invoices, serial numbers, and delivery and installation status.
- **Site:** the colocation or lease agreement, available power, and whether the owner will sign an access agreement.
- **Customer:** the executed contract, payment history, and its termination and assignment terms.
- **Company:** an ownership chart, recent financial statements and evidence of the equity invested.
- **Existing debt:** any financing or liens already on the hardware.
- **The request:** the amount, what it will pay for, when it is needed and how it will be repaid.

Each item maps to a question the lender will otherwise ask later, at a slower point in the process.

## Summary

GPU deals close on evidence. Their timing depends on how quickly four things can be proven: the hardware exists and is owned, the facility can run it, a creditworthy customer is paying, and the lender can take control if something goes wrong.

The sequence follows from that. A financing needs many parties to cooperate, each holding part of the evidence. The first conversation tests whether a source of repayment exists. Indicative terms set the basis on which offers should be compared, which is why the denominator of an advance rate matters as much as the rate itself. Diligence proves that the hardware, the site and the customer are real. Documents secure the lender's ability to take control. Funding follows physical milestones, and after funding the work shifts to monitoring, with enforcement as a slow last resort. Most delays come from missing or contested evidence, which is why preparation shortens every stage.

Sound deals close quickly when the evidence is ready. The evidence, more than the headline numbers, decides the terms.
