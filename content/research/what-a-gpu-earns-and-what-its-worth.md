---
title: "What a GPU earns, and what it's worth"
description: "Rental rates, occupancy and costs decide what an H100 earns. Book, market and recovery values decide what it's worth. We work through both."
date: "2026-10-15"
category: "Unit economics"
author: "OpenSilicon Research"
cover: "/research/covers/what-a-gpu-earns-and-what-its-worth.svg"
coverAlt: "A conceptual illustration pairs accumulating cash flows with declining hardware value; the paths are schematic rather than measured data."
takeaway: "Every GPU loan rests on two numbers: the cash the hardware collects and the price it would fetch if sold. Rental prices move both at once, so a prudent loan is sized to the lower of the two under stress, not to today's rate card."
sources:
  - title: "SemiAnalysis · GPU rental pricing trends, H100 one-year contract ranges (accessed September 17, 2026)"
    url: "https://gpu-index.semianalysis.com/"
  - title: "Hashrate Index · AI hardware price index, August 31, 2026"
    url: "https://beta.hashrateindex.com/blog/announcement-introducing-the-ai-hardware-price-index/"
  - title: "SSP · NVIDIA H100 availability and indicative pricing, August 2026"
    url: "https://sspglobal.ai/availability/nvidia-h100-availability"
  - title: "Nebius · Q2 2026 shareholder letter, August 12, 2026"
    url: "https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm"
  - title: "NVIDIA · AI factory financing and selective residual-value support, August 11, 2026"
    url: "https://blogs.nvidia.com/blog/nvidia-ai-factory-compute/"
  - title: "Silicon Data · H200 vs H100 rental prices, May–July 2026"
    url: "https://www.silicondata.com/blog/h200-vs-h100-rental-prices-may-july-2026"
  - title: "Silicon Data · GPU residual value methodology"
    url: "https://www.silicondata.com/products/gpu-residual-value"
  - title: "CoreWeave · Annual report for fiscal year 2025, SEC Form 10-K"
    url: "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000104/crwv-20251231.htm"
status: published
---

## Introduction

Ask an operator what a GPU is worth and you will usually hear its purchase price. Ask what it earns and you will hear an hourly rate. Both numbers are easy to quote, and both are incomplete. The purchase price says nothing about what the hardware could be sold for later, and the hourly rate says nothing about the costs and idle time that stand between it and cash.

For anyone financing GPUs, that gap is the whole problem. A lender is repaid either from what the hardware collects or, if things go wrong, from what it can be sold for. It therefore needs two numbers, not one: the cash the hardware collects after its costs, and the price it would fetch if it had to be sold.

Our thesis is that every GPU loan rests on those two numbers, and that because rental prices move both of them at once, a prudent loan is sized to the lower of the two under stress, not to today's rate card.

We make the case in seven steps, using an NVIDIA H100 as the example. We first show how an hourly rate becomes monthly cash. We then show how far payback has moved with rental prices since 2023, and how much occupancy and costs matter alongside price. Turning to value, we separate the three values a GPU has and explain why the two numbers tend to fall together. We then combine them into a loan size, and close with six questions that test any GPU pitch.

The figures are illustrative scenarios built from public price data. They are not the realized returns of any project, and they are not OpenSilicon transaction data. The first step is to turn an hourly rate into monthly cash.

## Monthly cash starts with three inputs

Turning a rate card into cash takes only three inputs, but each one hides an assumption. GPU capacity is priced per GPU-hour, and the arithmetic is simple:

```text
Monthly revenue per GPU  = hourly rate × 730 hours × paid occupancy
Monthly operating cash   = monthly revenue − recurring cash costs
Payback in months        = installed cost ÷ monthly operating cash
```

The two less familiar terms deserve a word. The 730 hours is the average length of a month. Paid occupancy is the share of capacity a customer is paying for, which is not the same as chip utilization: a customer that reserves a GPU pays for it whether or not a job is running.

A worked example makes the formula concrete. Hashrate Index reported a median asking price of $246,000 for a refurbished eight-GPU HGX H100 system on August 31, 2026, or $30,750 per GPU. We add an assumed $5,000 per GPU for networking and installation, for an installed cost of $35,750. We also assume 90% paid occupancy and $400 per GPU per month for power, space, network and staff.

On those assumptions, a rate of $2.40 per GPU-hour, the midpoint of the April 2026 contract range, brings in about $1,577 per GPU a month. After costs, each GPU produces about $1,177 of operating cash, so it pays back its installed cost in about 30 months.

The example also shows why small price changes matter more than they appear to. Raising the rate from $2.40 to $2.70 increases revenue by 12.5%, but operating cash by about 17%, because the $400 of costs does not change. Fixed costs magnify price moves in both directions, which is why the history of rental prices deserves a closer look.

## Price history shows how far payback can move

Rental prices for the same hardware have moved a long way since 2023, and payback has moved with them. The chart below holds the installed cost, occupancy and operating costs constant and changes only the price, using SemiAnalysis's published ranges for one-year H100 contracts.

![Two stepped charts. The upper chart shows H100 one-year contract rents falling from $2.70–3.40 per GPU-hour in early 2023 to $1.45–1.95 in October 2025, then recovering to $2.10–2.70 in April 2026. The lower chart shows modeled payback rising from 19.5–26.0 months to 40.6–64.7 months, then falling back to 26.0–36.5 months.](/research/what-a-gpu-earns-and-what-its-worth/rental-price-and-payback.svg)
*Fixed-cost sensitivity, not realized project returns. Installed cost $35,750 per GPU, 90% paid occupancy, $400 monthly cash costs. Rents are published 25th–75th percentile ranges for one-year contracts. Sources: SemiAnalysis, through April 2026; Hashrate Index, August 31, 2026.*

| Rent observed | H100 one-year contract range | Modeled payback |
|---|---|---|
| First half of 2023 | $2.70–3.40 per GPU-hour | 19.5–26.0 months |
| October 2025 | $1.45–1.95 per GPU-hour | 40.6–64.7 months |
| April 2026 | $2.10–2.70 per GPU-hour | 26.0–36.5 months |

The swing is large. At the midpoint of each range, the rent fell by about 44% between early 2023 and October 2025, and modeled payback more than doubled, from about 22 months to about 50. By April 2026 the rent had partly recovered and payback had returned to about 30 months. The same hardware, with the same costs, looked like a two-year asset, then a four-year asset, then something in between.

These numbers come with three limits, and they matter. The SemiAnalysis series ends in April 2026, and its contracts typically require 25% prepayment, which improves cash timing in ways this model ignores. The model also applies historical rents to an August 2026 cost, so it isolates the effect of price rather than describing what any buyer actually earned. Finally, it assumes the rent and occupancy continue unchanged after the first year.

Other evidence points in the same direction, though it measures different things and should not be joined to this series. NVIDIA reported in August 2026 that one-year H100 pricing rose from about $1.70 per GPU-hour in October 2025 to about $2.35 in March 2026. Silicon Data reported that its H100 on-demand index for specialist clouds rose 7.0% between May and late July 2026, while its H200 index rose 14.4%.

Operators report a similar effect on new contracts. In its second-quarter 2026 letter, Nebius said that expected payback on new deals had improved from two to three years to about 22 months. That is a management estimate based on recognized revenue, excluding prepayments, so it is a useful reference point rather than an industry average.

Price explains much of the movement, but it is only one of the inputs. Occupancy and costs can matter just as much.

## Occupancy and cost matter as much as price

Holding price steady shows how sensitive payback is to the inputs that get less attention. The table below keeps the April 2026 rents and the refurbished hardware cost fixed, and varies paid occupancy and monthly costs.

| Paid occupancy | $200 monthly costs | $400 monthly costs | $600 monthly costs |
|---|---|---|---|
| 100% | 20.2–26.8 months | 22.8–31.6 months | 26.1–38.3 months |
| 90% | 22.7–30.3 months | 26.0–36.5 months | 30.5–45.9 months |
| 85% | 24.2–32.4 months | 28.0–39.6 months | 33.2–50.8 months |
| 70% | 30.3–40.9 months | 36.5–53.1 months | 45.9–75.6 months |

The range is as wide as the one produced by price history. At 90% occupancy and $400 of monthly costs, payback is 26.0–36.5 months. Drop occupancy to 70% and raise costs to $600, and it stretches to 45.9–75.6 months. A cluster that sits partly empty, or runs in an expensive site, can erase the benefit of a good rental price.

Hardware cost moves the result as well. Using Hashrate Index's median asking price for a new system, about $40,555 per GPU, the installed cost rises to about $45,555. At April 2026 rents, 90% occupancy and $400 of monthly costs, payback lengthens to 33.2–46.5 months.

The lesson is that the four inputs need to be shown together. A pitch that combines the lowest hardware price, the highest rent and full occupancy will overstate what the hardware can repay. That covers the first number, what a GPU earns. The second is what it is worth.

## A GPU has three values, and only one protects a lender

Asking what a GPU is worth sounds like one question, but it has at least three answers, and they serve different purposes:

- **Book value** is an accounting estimate. CoreWeave, for example, depreciates its data center computing equipment over six years, an estimate it extended from five years in 2023. Book value spreads the cost over time. It does not say what anyone would pay.
- **Market value** is what a willing buyer would pay in a normal sale. On August 31, 2026, Hashrate Index's median asking price was about $40,555 per GPU for a new HGX H100 system and $30,750 for a refurbished one. A reseller, SSP, listed a refurbished eight-GPU H100 node at $240,000, or $30,000 per GPU, before shipping. These are asking prices, not completed sales.
- **Recovery value** is what a lender actually collects in a forced sale. It comes after the cost of removing, transporting and preparing the hardware, broker fees and the time needed to sell many units at once. We have not found a complete public sample of GPU liquidations that reports timing, proceeds and costs together. That gap is why lenders apply conservative discounts.

For a lender, the third value is the one that counts, and several forces move it. New GPU generations now arrive roughly every year, which lowers what older hardware can earn. Condition, configuration and location matter, because a buyer has to make the hardware work somewhere else. Most of all, a GPU's value reflects what it can still earn. Silicon Data's residual-value method, for example, discounts expected rental income, costs and declining utilization. That makes it a useful estimate, but not a price at which anyone has agreed to buy.

There is a case that GPUs hold their value longer than many assume, and NVIDIA makes it. In August 2026 it noted that the A100, introduced in 2020, remains in commercial use, with multi-year commitments extending its economic life toward a decade. It also offers selective residual-value support of up to 25% of an opportunity, assessed project by project and designed to complement independent underwriting. We read this as real evidence that older GPUs keep earning. It is not a floor under the resale price of every GPU.

If value ultimately reflects earnings, then the two numbers in this note are not independent. That connection is the most important point for a lender.

## Earnings and value fall together

The two numbers are linked, and that changes how much protection they really offer. If rental prices fall, the cash a GPU collects falls, and so does what a buyer would pay for it. A lender relying on collateral to cover weak cash flow may find the collateral weakening at the same moment.

This is the difference between diversification and duplication. Cash flow and collateral look like two separate protections on paper. In practice they tend to weaken together, so a loan that would only be safe if one held up while the other fell is not as safe as it looks.

The practical consequence is that both numbers have to be tested under the same stress, and the loan sized to whichever gives the smaller answer.

## The loan is sized to the lower of two limits

Putting the two numbers together produces two limits on any loan, and the lower one applies:

- **The collateral limit** is a share of the independently assessed net recovery value.
- **The cash flow limit** is the largest loan that stressed operating cash can repay on schedule, including interest and a safety margin.

A simple example shows which limit usually binds. The table below uses deliberately simple, hypothetical assumptions. Installed capital is 100. Net recovery value is 70, and the lender advances 60% of it, so the collateral limit is 42. The loan carries a 14% annual rate, repays principal in equal monthly installments and requires operating cash of at least 1.25 times each month's payment. Operating cash is constant at 100 divided by the payback period.

| Payback of the hardware | 6-month loan | 9-month loan | 12-month loan |
|---|---|---|---|
| 22 months | 20.4 | 29.6 | 38.3 |
| 30 months | 15.0 | 21.7 | 28.1 |
| 36 months | 12.5 | 18.1 | 23.4 |

*Maximum loan supported by cash flow, as a share of installed capital of 100. Hypothetical assumptions, not loan terms.*

In every case the cash flow limit is below the collateral limit of 42, so cash flow decides the loan size. Two patterns stand out. A shorter loan supports less principal, because each month has to repay more of it. A longer payback period reduces borrowing capacity in proportion. Generous collateral cannot make up for thin cash flow.

That conclusion turns into a short set of questions anyone can ask of a GPU financing.

## Six questions test any GPU pitch

Everything above can be compressed into six questions, which cover most of what matters when a deployment is presented for financing:

1. Which price series is being used, for what contract length, and as of what date?
2. What share of capacity is under paid contract, and for how long?
3. What did the hardware cost, fully installed?
4. What are the monthly cash costs per GPU, including power and space?
5. What is the payback after those costs, and how does it change at a lower price?
6. What would the hardware fetch in a forced sale, after costs and time?

The first five questions test what the hardware earns; the last tests what it is worth. A pitch that answers all six clearly is one a lender can size with confidence.

## Summary

Every GPU loan rests on two numbers: the cash the hardware collects and the price it would fetch if sold. Because rental prices move both at once, a prudent loan is sized to the lower of the two under stress, not to today's rate card.

The first number starts with three inputs, rate, occupancy and costs, and fixed costs magnify any change in price. Price history shows how far payback can move: on fixed assumptions, an H100 went from roughly two years to roughly four and back toward two and a half. Occupancy and costs can swing the result just as far, so the inputs must be shown together. The second number depends on which value is meant, and for a lender only recovery value counts. Earnings and value are linked, so cash flow and collateral tend to weaken together. Sized against both limits, the cash flow limit usually binds, and six questions are enough to test whether a pitch has been sized honestly.

A GPU is a productive asset with a short competitive life. Its value is what it can earn while it stays competitive. Sizing debt to stressed cash flow and realistic recovery value, rather than to today's rate card, keeps lenders ahead of that clock.
