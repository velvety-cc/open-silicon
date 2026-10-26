---
title: "What a GPU earns, and what it's worth"
description: "Rental rates, occupancy and costs decide what an H100 earns. Book, market and recovery values decide what it's worth. We work through both."
date: "2026-05-12"
category: "Unit economics"
author: "OpenSilicon Research"
cover: "/research/covers/what-a-gpu-earns-and-what-its-worth.svg"
coverAlt: "A conceptual illustration pairs accumulating cash flows with declining hardware value; the paths are schematic rather than measured data."
takeaway: "Every GPU loan rests on two numbers: the cash the hardware collects and the price it would fetch if sold. Rental prices move both at once, so a prudent loan is sized to the lower of the two under stress, not to today's rate card."
sources:
  - title: "SemiAnalysis · H100 one-year contract pricing, published April 2, 2026"
    url: "https://newsletter.semianalysis.com/p/the-great-gpu-shortage-rental-capacity"
  - title: "CoreWeave · FY2025 annual report, SEC Form 10-K, filed March 2, 2026"
    url: "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000104/crwv-20251231.htm"
status: published
---

## Introduction

Ask an operator what a GPU is worth and you will usually hear its purchase price. Ask what it earns and you will hear an hourly rate. Both numbers are easy to quote, and both are incomplete. The purchase price says nothing about what the hardware could be sold for later, and the hourly rate says nothing about the costs and idle time that stand between it and cash.

For anyone financing GPUs, that gap is the whole problem. A lender is repaid either from what the hardware collects or, if things go wrong, from what it can be sold for. It therefore needs two numbers, not one: the cash the hardware collects after its costs, and the price it would fetch if it had to be sold.

Our thesis is that every GPU loan rests on those two numbers, and that because rental prices move both of them at once, a prudent loan is sized to the lower of the two under stress, not to today's rate card.

We make the case in seven steps, using an NVIDIA H100 as the example. We first show how an hourly rate becomes monthly cash. We then compare two rental-price observations available before this note, and show how occupancy and costs matter alongside price. Turning to value, we separate the three values a GPU has and explain why the two numbers tend to fall together. We then combine them into a loan size, and close with six questions that test any GPU pitch.

The rental-price observations were published before May 12, 2026. Equipment cost, occupancy and operating costs are explicitly hypothetical inputs, not historical equipment quotes or OpenSilicon transaction data. The first step is to turn an hourly rate into monthly cash.

## Monthly cash starts with three inputs

Turning a rate card into cash takes only three inputs, but each one hides an assumption. GPU capacity is priced per GPU-hour, and the arithmetic is simple:

```text
Monthly revenue per GPU  = hourly rate × 730 hours × paid occupancy
Monthly operating cash   = monthly revenue − recurring cash costs
Payback in months        = installed cost ÷ monthly operating cash
```

The two less familiar terms deserve a word. The 730 hours is the average length of a month. Paid occupancy is the share of capacity a customer is paying for, which is not the same as chip utilization: a customer that reserves a GPU pays for it whether or not a job is running.

A worked example makes the formula concrete. Assume $30,000 per GPU of hardware cost and $5,000 per GPU for networking and installation, for an installed budget of $35,000. These are round modeling assumptions, not a claim about the market price of an H100 on a particular date. We also assume 90% paid occupancy and $400 per GPU per month for power, space, network and staff.

SemiAnalysis reported on April 2, 2026 that one-year H100 contract pricing had risen from $1.70 per GPU-hour in October 2025 to $2.35 by March 2026. At the latter rate and our assumed occupancy, monthly revenue is about $1,544 per GPU. After the assumed costs, operating cash is about $1,144, giving a modeled payback of 30.6 months.

The example also shows why small price changes matter more than they appear to. In a separate hypothetical stress, raising a rate from $2.40 to $2.70 increases revenue by 12.5%, but operating cash by about 17%, because the $400 of costs does not change. Fixed costs magnify price moves in both directions, which is why the history of rental prices deserves a closer look.

## Two dated observations show how payback can move

Two observations from the April 2 publication are enough to test the effect of a change in rent. We apply October 2025's reported $1.70 rate and March 2026's reported $2.35 rate to the same hypothetical cost budget. This is a sensitivity calculation, not a reconstruction of a buyer's historical returns.

![Two reported H100 one-year contract pricing observations: $1.70 per GPU-hour in October 2025 and $2.35 in March 2026. Under a hypothetical $35,000 installed cost, 90% paid occupancy and $400 monthly costs, modeled payback is 48.8 and 30.6 months respectively.](/research/what-a-gpu-earns-and-what-its-worth/rental-price-and-payback.svg)
*Pricing observations: SemiAnalysis, published April 2, 2026. Payback: our calculation using hypothetical cost and occupancy inputs. The observations are not percentile ranges or a continuous price series.*

| Reported period | H100 one-year contract pricing | Modeled payback |
|---|---|---|
| October 2025 | $1.70 per GPU-hour | 48.8 months |
| March 2026 | $2.35 per GPU-hour | 30.6 months |

The reported rate increases by about 38%, while modeled payback falls from just over four years to about two and a half. The difference comes from fixed costs: after operating expenses, more of each extra revenue dollar is available to recover the initial investment.

There are limits. The equipment budget is an assumption held constant across both cases, not an observed purchase price in either period. The calculation also leaves out financing, taxes, customer prepayments, future capital expenditure and resale proceeds. It assumes the chosen rent and occupancy continue after the first contract year, which they may not. A short period of stronger pricing cannot establish a GPU's lifetime return.

Price is only one input. Occupancy and costs can matter just as much.

## Occupancy and cost matter as much as price

Holding price steady shows how sensitive payback is to the inputs that get less attention. The table below keeps the hypothetical $35,000 installed budget fixed and varies paid occupancy and monthly costs. Each cell spans the result at $2.35 and $1.70 per GPU-hour; the span is a two-scenario sensitivity, not a market percentile range.

| Paid occupancy | $200 monthly costs | $400 monthly costs | $600 monthly costs |
|---|---|---|---|
| 100% | 23.1–33.6 months | 26.6–41.6 months | 31.4–54.6 months |
| 90% | 26.0–38.2 months | 30.6–48.8 months | 37.1–67.7 months |
| 85% | 27.8–40.9 months | 33.1–53.4 months | 40.8–76.9 months |
| 70% | 35.0–52.3 months | 43.7–74.7 months | 58.3–130.3 months |

At 90% occupancy and $400 of monthly costs, payback is 30.6–48.8 months across the two rent scenarios. Drop occupancy to 70% and raise costs to $600, and it stretches to 58.3–130.3 months. A cluster that sits partly empty, or runs in an expensive site, can erase the benefit of a good rental price.

Hardware cost moves the result as well. Raising the hypothetical installed budget from $35,000 to $45,000 per GPU, with the $2.35 rate, 90% occupancy and $400 monthly costs unchanged, lengthens modeled payback from 30.6 to 39.3 months.

The lesson is that the four inputs need to be shown together. A pitch that combines the lowest hardware price, the highest rent and full occupancy will overstate what the hardware can repay. That covers the first number, what a GPU earns. The second is what it is worth.

## A GPU has three values, and only one protects a lender

Asking what a GPU is worth sounds like one question, but it has at least three answers, and they serve different purposes:

- **Book value** is an accounting estimate. CoreWeave, for example, depreciates its data center computing equipment over six years, an estimate it extended from five years in 2023. Book value spreads the cost over time. It does not say what anyone would pay.
- **Market value** is what a willing buyer would pay in a normal sale. It requires contemporaneous evidence for the same configuration, condition and location. A supplier quote is an asking price; a hypothetical model input is neither an asking price nor a completed sale.
- **Recovery value** is what a lender actually collects in a forced sale. It comes after the cost of removing, transporting and preparing the hardware, broker fees and the time needed to sell many units at once. We have not found a complete public sample of GPU liquidations that reports timing, proceeds and costs together. That gap is why lenders apply conservative discounts.

For a lender, the third value is the one that counts, and several forces move it. New GPU generations now arrive roughly every year, which lowers what older hardware can earn. Condition, configuration and location matter, because a buyer has to make the hardware work somewhere else. Most of all, a GPU's value reflects what it can still earn. One analytical approach discounts expected future rental cash flows after costs and an allowance for declining occupancy. That produces an estimate whose value depends on its assumptions, not a price at which anyone has agreed to buy.

A GPU may remain useful after the first contract ends, but that possibility belongs in a scenario rather than a guaranteed recovery amount. Continued rental income depends on customers, competing hardware and the cost of keeping the system running. Unless a binding third-party purchase obligation applies to the specific assets, the model should not assume a floor under their resale price.

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

The first number starts with three inputs, rate, occupancy and costs, and fixed costs magnify any change in price. The two dated rent observations show how far modeled payback can move on fixed assumptions, from just over four years to about two and a half. Occupancy and costs can swing the result just as far, so the inputs must be shown together. The second number depends on which value is meant, and for a lender only recovery value counts. Earnings and value are linked, so cash flow and collateral tend to weaken together. Sized against both limits, the cash flow limit usually binds, and six questions are enough to test whether a pitch has been sized honestly.

A GPU is a productive asset with a short competitive life. Its value is what it can earn while it stays competitive. Sizing debt to stressed cash flow and realistic recovery value, rather than to today's rate card, keeps lenders ahead of that clock.
