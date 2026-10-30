---
title: "Who's who in the GPU market"
description: "From chipmakers to capital providers: the parties behind a GPU deployment and the points where risk changes hands."
date: "2026-03-18"
category: "Market structure"
author: "OpenSilicon Research"
cover: "/research/covers/whos-who-in-the-gpu-market.svg"
coverAlt: "A schematic network connects the operator at the center with hardware, data centers, customers, and capital providers."
takeaway: "A GPU deployment is a chain of separate parties: chipmakers, server builders, data centers, operators, customers and capital providers. Risk concentrates where cash changes hands between them, and the largest participants increasingly hold several roles at once."
sources:
  - title: "Blackstone · CoreWeave's $7.5B debt financing, May 17, 2024"
    url: "https://www.blackstone.com/news/press/coreweave-secures-7-5-billion-debt-financing-facility-led-by-blackstone-and-magnetar/"
  - title: "CoreWeave · NVIDIA capacity agreement, SEC Form 8-K, filed September 15, 2025"
    url: "https://www.sec.gov/Archives/edgar/data/1769628/000176962825000047/crwv-20250909.htm"
  - title: "Apollo · Valor and xAI compute infrastructure transaction, January 7, 2026"
    url: "https://www.apollo.com/wealth/insights-news/pressreleases/2026/01/apollo-backs-5-4-billion-valor-and-xai-data-center-compute-infrastructure-transaction-with-3-5-billion-capital-solution-3214463"
  - title: "Runpod · AI cloud surpasses $120M in ARR, January 20, 2026"
    url: "https://www.runpod.io/press/runpod-ai-cloud-surpasses-120m-in-arr"
  - title: "CoreWeave · FY2025 annual report, SEC Form 10-K, filed March 2, 2026"
    url: "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000104/crwv-20251231.htm"
status: published
---

## Introduction

A GPU server passes through many hands before it earns anything. One company designs the chip and another builds the server. A third owns the building, a fourth runs the cluster and a fifth rents it. The purchase is usually funded with someone else's capital, which adds a sixth party to the chain.

That chain matters because risk is not spread evenly along it. It gathers at the points where one party depends on another to deliver hardware, provide power or pay an invoice. A lender who studies only the borrower sees a small part of the picture, and an operator who understands only its own business may not see where its financing could break.

Our thesis is simple. A GPU deployment is a chain of separate parties, risk concentrates where cash changes hands between them, and the largest participants increasingly hold several roles at once.

We build the case in eight steps. We begin by following one cluster from the factory to the invoice to show the chain in motion. We then look at each link in turn: chips and servers, which set the timetable and the starting value of the collateral; power and sites, which decide when hardware can earn; operators, which turn hardware into a service and usually do the borrowing; customers, whose payments and credit drive everything else; and capital providers, which reach the market through a ladder of structures. Two final sections show how the largest participants now play several roles, and where in the chain risk actually changes hands.

The examples in this note were publicly disclosed by March 18, 2026. The companies named here are public examples of each role. They are not OpenSilicon clients or partners. With that said, the clearest way to see the chain is to follow a single deployment through it.

## A deployment is a chain of separate parties

Following one deployment shows how many parties a single cluster depends on. Picture a mid-sized deployment of a few dozen eight-GPU servers. An operator signs a customer, secures space and power in a data center, and orders servers built around NVIDIA GPUs. The servers are assembled, shipped, installed, connected and tested, and only once the customer accepts the cluster does the customer start paying.

![A diagram showing chips and servers and data centers supplying an operator, the operator providing compute to customers who pay it, and capital providers funding the operator in exchange for repayment.](/research/whos-who-in-the-gpu-market/value-chain.svg)
*How a GPU deployment fits together. Hardware and power flow toward the operator; cash flows from customers and capital providers through the operator.*

Capital usually sits underneath the whole sequence. A lender may have advanced part of the purchase price, secured on the hardware and the customer contract. The diagram shows the result: physical inputs flow toward the operator, while cash flows in from customers and capital providers and back out as repayment.

Each step involves a different party, a different contract and a different way for things to go wrong. To see where the weak points are, we take the links in order, starting where the hardware does.

## Chips and servers set the timetable and the starting value

The chain begins with the hardware, and the hardware sets both when a project can start earning and what its collateral is worth on day one. NVIDIA designs most of the accelerators used in AI data centers. AMD is the main merchant alternative, and several hyperscalers design their own chips, such as Google's TPUs and Amazon's Trainium. The chips are manufactured by foundries and depend on high-bandwidth memory and advanced packaging, and expanding those inputs takes years. That is one reason supply responds slowly to demand.

Server makers turn those chips into systems that can be deployed. Branded manufacturers such as Dell, HPE and Supermicro sell complete servers. Contract manufacturers such as Foxconn, Quanta and Wiwynn build systems at scale, often for the largest buyers, while distributors and resellers serve everyone else. Whoever supplies a given project controls its delivery date.

That control is the first way this stage matters to financing: a delay here pushes back every payment downstream. The second is valuation. A new system and a refurbished one can have different warranties, service histories and remaining useful lives. A lender needs a dated quote for the exact configuration and an independent assessment of resale value. A supplier's asking price alone does not establish what the collateral would realize in a sale.

Hardware alone earns nothing, however. It needs somewhere to run, which brings us to power and sites.

## Power and sites decide when hardware can earn

Once the servers exist, they need space, power and cooling, and power is usually the slowest of the three to arrive. Data center developers and colocation providers build facilities and lease space and power to tenants. Some operators build their own sites instead. Either way, the building becomes part of the project's risk.

Facility investment and GPU investment are separate exposures. A building can be leased for many years, while the hardware inside it may need to be replaced much sooner. A lender financing servers therefore needs to understand the site's ownership, the availability of power and the operator's rights under its lease, rather than treating a completed building as evidence that the GPU deployment is ready.

For a lender, the site agreement is part of the collateral, even though it is easy to overlook. If an operator defaults, the lender needs the right to enter the building and either keep the hardware running or remove it. Without that access, a security interest in the servers is worth much less than it appears.

With hardware delivered and a site secured, someone still has to run the cluster and sell its capacity. That is the operator's job.

## Operators turn hardware into a service, and usually borrow to do it

Operators sit at the center of the chain: they install the hardware, run it and sell its capacity. They fall into three broad groups:

- **Hyperscalers** such as Amazon Web Services, Microsoft Azure, Google Cloud and Oracle. They fund most of their capacity from their own cash flow and the bond market.
- **Neoclouds**, cloud providers that specialize in GPUs, such as CoreWeave, Nebius, Lambda, Crusoe and Fluidstack. Their specialist infrastructure and operating teams are part of the service a customer buys.
- **Marketplaces and smaller operators.** Runpod announced $120 million in annual recurring revenue in January 2026. Beyond it are many operators running hundreds or a few thousand GPUs, often for a handful of customers.

The groups differ in scale, and capacity can be sold in more than one form. CoreWeave's FY2025 annual report, filed on March 2, 2026, distinguishes on-demand services from committed contracts, generally lasting one to six years. Size and contract length are therefore separate questions: a large platform may sell short contracts, and a small operator may hold a long one.

The operator is also usually the borrower, which makes its quality central to any financing. Its track record, team and ability to keep hardware running determine whether contracted revenue actually arrives. A strong contract held by a weak operator is a weaker credit than it looks.

Contracted revenue, in turn, is only as good as the customer behind it.

## Customers supply the cash, and their credit sets the price

Customers are where most of the money in the chain comes from, so their quality shapes everything upstream. They include:

- **Frontier AI labs**, which buy the largest volumes, often under multi-year contracts.
- **AI startups and model developers**, which rent capacity for training, fine-tuning and inference.
- **Enterprises and research institutions**, which are adopting AI in their own work.

Demand reaches operators through different buying patterns. A lab may reserve a dedicated cluster, while a smaller developer buys capacity as workloads arrive. Runpod's January 2026 announcement of $120 million in annual recurring revenue offers one public example of the market for flexible infrastructure. It does not establish how much demand any particular new deployment will secure.

Growth alone does not set the cost of financing, though; customer credit does. The same servers leased to an investment-grade buyer and to a young startup are two different credit risks. The lender must assess the customer's ability to pay, minimum purchase commitments and termination rights. A familiar GPU model does not make those customer risks interchangeable.

Customers pay for the compute. Someone else has to pay for the hardware first, and that is where capital providers come in.

## Capital arrives through a ladder of structures

Capital is the input that connects every other link, and it reaches GPU deployments through a ladder of structures. Moving down the ladder, risk and pricing generally rise:

1. **Internal cash flow**, mostly at the hyperscalers.
2. **Corporate bonds** issued by large technology companies.
3. **Project and joint-venture financing**, often for data center buildings.
4. **Operator facilities**, large loans to neoclouds secured by GPUs and customer contracts.
5. **Smaller asset-backed GPU loans** to emerging operators.

The ladder is useful because the providers on each rung are different, and so are their requirements. They include:

- **Asset managers and private credit funds.** Blackstone and Magnetar led a $7.5 billion debt facility for CoreWeave in 2024, with participation from funds managed by BlackRock. In January 2026, Apollo announced a $3.5 billion capital solution supporting Valor's $5.4 billion acquisition and lease of compute infrastructure to an xAI subsidiary.
- **Banks and arrangers.** They can organize facilities, manage syndication and provide account services, with participation depending on the borrower and transaction.
- **Specialist lenders.** Asset-focused lenders can assess smaller hardware pools, but their advance rates, eligible equipment and enforcement arrangements still need to be checked deal by deal.
- **Lessors**, which own hardware and rent it to operators.
- **Vendors**, discussed in the next section.

Behind many of these firms sit insurers, pension funds and sovereign wealth funds, which seek long-dated assets with contracted income. A layer of specialist service providers supports all of them. Dated equipment quotes, independent valuations and comparable transactions help establish the value of a specific hardware pool. Collateral agents hold security for lenders, servicers track collections, and independent appraisers estimate recovery values.

Some of these providers are not only lenders or investors. The largest increasingly play several parts in the chain at the same time.

## The largest participants play several roles at once

The diagram earlier in this note simplifies one thing: some companies appear in more than one box. NVIDIA is the clearest example:

- It is the dominant **supplier** of AI accelerators.
- It is a **buyer of capacity**. CoreWeave's September 2025 filing disclosed an arrangement giving NVIDIA access to residual unsold capacity, subject to conditions, with an initial value of $6.3 billion and a term through April 2032.
- It is an **investor**, including as an anchor limited partner in the Valor vehicle behind the Apollo transaction.

Asset managers can also participate in several layers of a deployment, from hardware financing to the capital behind the site. The practical task is to identify the legal counterparty and the obligation attached to each role, rather than treating a shared brand name as a guarantee.

These overlaps cut both ways. A supplier willing to support financing makes projects easier to fund, which deepens the market. The same overlaps also link risks: in a downturn, one company could be affected as supplier, buyer and investor at once. When a project relies on more than one form of support, each should be counted once, because the same capacity cannot earn full revenue from a customer and from a vendor's fallback purchase at the same time.

Overlapping roles make the handoffs between parties more important to understand, not less. That is where we turn last.

## Risk concentrates where cash changes hands

The most useful way to read this map is to look at the handoffs rather than the parties. Each handoff is a point where something can go wrong and where a lender needs evidence that it will not. The table below sets out the main ones.

| Handoff | What can go wrong | What a lender checks |
|---|---|---|
| Server maker to operator | Late delivery, wrong configuration | Purchase orders, delivery schedule, title and serial numbers |
| Data center to operator | Power not ready, loss of site access | Power and colocation agreements, landlord access rights |
| Operator to customer | Service failures, delayed acceptance | Service levels, acceptance testing, operating record |
| Customer to operator | Late or reduced payment, early termination | Customer credit, payment history, termination rights |
| Operator to lender | Cash diverted, hardware moved or sold | Controlled collections, security interest, reporting |

Read this way, the chain becomes a checklist. Our own diligence follows it: we look at the GPUs, the operator and the offtaker separately, then at how the contracts between them hold together. A deployment is only as strong as its weakest handoff.

## Summary

A GPU deployment is a chain of separate parties. Risk concentrates where cash changes hands between them, and the largest participants increasingly hold several roles at once.

Following one cluster shows the chain in motion, from an order for servers to the first customer payment. Chips and servers set the timetable and the starting value of the collateral. Power and sites decide when hardware can earn, and the site agreement is part of what a lender is secured on. Operators turn hardware into a service and usually do the borrowing, so their ability to run it well decides whether contracted revenue arrives. Customers supply most of the cash, and their credit sets the price of money. Capital reaches the market through a ladder of structures, from internal cash flow to smaller asset-backed loans. The largest participants, NVIDIA above all, now act as supplier, capacity buyer and investor at once, which deepens the market but links its risks. And each handoff in the chain is a point where a lender needs evidence.

For anyone financing GPUs, the question is therefore not only who the borrower is, but whom the borrower depends on and who depends on the borrower. The next notes in this series cover the financing structures that sit on top of this map and the unit economics that decide whether a deployment can repay its capital.
