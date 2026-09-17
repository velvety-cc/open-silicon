// Editable investment content. Public sources are dated; unverified private information remains highlighted.
export const DECK_DATA = {
  "brand": "Open Silicon",
  "raiseSize": "[TODO: final pool size]",
  "raiseRange": {
    "min": 10000000,
    "max": 30000000
  },
  "operatorFacilityRange": {
    "min": 5000000,
    "max": 40000000
  },
  "couponRange": {
    "min": 13,
    "max": 16
  },
  "termRange": {
    "min": 6,
    "max": 12
  },
  "ltvCap": 60,
  "facilitySize": "[TODO: loan facility size]",
  "minimumTicket": "[TODO: minimum ticket]",
  "fees": "[TODO: management, servicing and other fees]",
  "reserve": "[TODO: funded reserve size and release conditions]",
  "amortization": "[TODO: contractual amortization schedule]",
  "diversificationTarget": "[TODO: borrower and tenant concentration limits]",
  "contactEmail": "[TODO: contact email]",
  "fundingWeeks": {
    "min": 6,
    "max": 10
  },
  "lighthouseDeal": {
    "confirmed": false,
    "region": "[TODO: region]",
    "gpuModel": "[TODO: GPU model]",
    "gpuCount": "[TODO: GPU count]",
    "facilitySize": "[TODO: operator facility size]",
    "tenantType": "[TODO: anonymized tenant type]",
    "contractLength": "[TODO: contract length]",
    "monthlyRevenue": "[TODO: contracted monthly revenue]",
    "dscr": "[TODO: DSCR]",
    "ltv": "[TODO: LTV]",
    "requestedAmount": "[TODO: requested amount]",
    "fundingTimeline": "[TODO: timeline to funding]",
    "useOfProceeds": "[TODO: use of proceeds]",
    "operatorEquity": "[TODO: operator cash equity]",
    "existingDebt": "[TODO: existing debt and ranking]"
  },
  "lighthouseFields": [
    {
      "key": "region",
      "label": "Region"
    },
    {
      "key": "gpuModel",
      "label": "GPU model"
    },
    {
      "key": "gpuCount",
      "label": "GPU count"
    },
    {
      "key": "facilitySize",
      "label": "Operator facility size"
    },
    {
      "key": "tenantType",
      "label": "Compute tenant type"
    },
    {
      "key": "contractLength",
      "label": "Contract length"
    },
    {
      "key": "monthlyRevenue",
      "label": "Contracted monthly revenue"
    },
    {
      "key": "dscr",
      "label": "Debt service coverage (DSCR)"
    },
    {
      "key": "ltv",
      "label": "Loan-to-value (LTV)"
    },
    {
      "key": "requestedAmount",
      "label": "Requested amount"
    },
    {
      "key": "fundingTimeline",
      "label": "Timeline to funding"
    },
    {
      "key": "useOfProceeds",
      "label": "Use of proceeds"
    },
    {
      "key": "operatorEquity",
      "label": "Operator equity"
    },
    {
      "key": "existingDebt",
      "label": "Existing debt"
    }
  ],
  "team": [
    {
      "confirmed": false,
      "name": "[TODO: team member]",
      "role": "[TODO: role]",
      "bio": "[TODO: verified relevant experience]"
    },
    {
      "confirmed": false,
      "name": "[TODO: team member]",
      "role": "[TODO: role]",
      "bio": "[TODO: verified relevant experience]"
    },
    {
      "confirmed": false,
      "name": "[TODO: team member]",
      "role": "[TODO: role]",
      "bio": "[TODO: verified relevant experience]"
    }
  ],
  "partners": [
    {
      "confirmed": false,
      "name": "[TODO: collateral agent]",
      "role": "[TODO: confirmed scope]"
    },
    {
      "confirmed": false,
      "name": "[TODO: servicer]",
      "role": "[TODO: confirmed scope]"
    }
  ],
  "visuals": {
    "cover": "/hero-datacenter-final.webp",
    "hardware": "/compute-rack.webp",
    "closing": "/closing-datacenter-v3.webp"
  },
  "legalSources": [
    {
      "label": "Rule 506(c)",
      "url": "https://www.sec.gov/resources-small-businesses/exempt-offerings/general-solicitation-rule-506c"
    },
    {
      "label": "Regulation S",
      "url": "https://www.sec.gov/divisions/corpfin/internatl/foreign-private-issuers-overview.shtml"
    }
  ],
  "date": "September 2026",
  "asOf": "17 September 2026",
  "confidential": "Private and confidential",
  "documentLabel": "Investment discussion",
  "ui": {
    "notes": "Notes",
    "print": "Print",
    "contents": "Contents",
    "previous": "Previous slide",
    "next": "Next slide",
    "help": "Arrow keys to navigate. N for notes.",
    "source": "Sources",
    "page": "Page"
  },
  "cover": {
    "eyebrow": "Senior secured private credit",
    "subtitle": "Short-term financing for operating GPU infrastructure",
    "metrics": [
      {
        "label": "Proposed first pool",
        "value": "{{raiseRange}}"
      },
      {
        "label": "Annual loan coupon",
        "value": "{{couponRange}}%"
      },
      {
        "label": "Loan term",
        "value": "{{termRange}} months"
      }
    ],
    "note": "Coupon applies to outstanding principal, before investor-level fees. Final pool size: {{raiseSize}}."
  },
  "contents": [
    {
      "title": "Market and investment strategy",
      "description": "Market conditions, financing precedents and target borrowers",
      "start": "market",
      "end": "strategy"
    },
    {
      "title": "Transaction and underwriting",
      "description": "Lighthouse opportunity, repayment, eligibility and security",
      "start": "lighthouse",
      "end": "structure"
    },
    {
      "title": "Risk and portfolio construction",
      "description": "Downside exposure, credit controls and investment pipeline",
      "start": "risks",
      "end": "portfolio"
    },
    {
      "title": "Investment terms and governance",
      "description": "Loan economics, participation and investor rights",
      "start": "terms",
      "end": "participation"
    },
    {
      "title": "Team and execution",
      "description": "Relevant experience, service providers and funding process",
      "start": "team",
      "end": "process"
    },
    {
      "title": "Cash flows and next steps",
      "description": "Illustrative payment schedule and investment discussion",
      "start": "cashflows",
      "end": "closing"
    }
  ],
  "market": {
    "period": "North America primary data center markets, H1 2026",
    "metrics": [
      {
        "value": "1.4%",
        "label": "Vacancy",
        "context": "Across primary markets"
      },
      {
        "value": ">80%",
        "label": "Construction preleased",
        "context": "Capacity already committed"
      },
      {
        "value": "7,481 MW",
        "label": "Under construction",
        "context": "Across primary markets"
      }
    ],
    "observations": [
      {
        "title": "Power constrains available capacity",
        "body": "Power constraints are extending delivery timelines despite record construction activity."
      },
      {
        "title": "Contracted assets can access debt capital",
        "body": "The selected financings show lenders underwriting GPU assets and customer cash flows at institutional scale."
      },
      {
        "title": "Borrower economics determine eligibility",
        "body": "Site occupancy is market context. Each loan still requires evidence of compute revenue, operating costs and repayment capacity."
      }
    ],
    "chartTitle": "Share of capacity under construction that is preleased",
    "chartUnit": "Percent of capacity",
    "chart": [
      {
        "label": "H1 2025",
        "value": 74.3,
        "display": "74.3%"
      },
      {
        "label": "H1 2026",
        "value": 80,
        "display": ">80%"
      }
    ],
    "chartNote": "The latest source reports more than 80%. The chart marks the reported lower bound.",
    "scope": "Colocation market data does not measure GPU utilization, compute rental prices or borrower credit quality.",
    "source": {
      "confirmed": true,
      "label": "CBRE, North America data center update, 8 September 2026",
      "url": "https://www.cbre.com/press-releases/north-american-data-center-demand-continues-to-outpace-supply-despite-record-construction"
    },
    "pricingGap": "GPU rental and resale price evidence: [TODO: model-specific quotations and observation dates]"
  },
  "marketDeals": {
    "headers": [
      "Transaction / announcement",
      "Facility size",
      "Structure and disclosed terms",
      "Credit context"
    ],
    "entries": [
      {
        "confirmed": true,
        "name": "Nebius",
        "date": "17 July 2026",
        "amount": "~$775M",
        "structure": "Senior secured facility",
        "terms": "SOFR + 2.50%; matures 31 October 2030",
        "context": "Deployed GPUs and cash flows from an investment-grade customer contract.",
        "source": {
          "label": "Nebius announcement",
          "url": "https://nebius.com/newsroom/nebius-raises-775-million-in-first-secured-debt-financing-to-accelerate-global-buildout"
        }
      },
      {
        "confirmed": true,
        "name": "CoreWeave",
        "date": "18 May 2026",
        "amount": "$3.1B",
        "structure": "Delayed draw term loan",
        "terms": "SOFR + 4.50%; approximately 5.5 years",
        "context": "Infrastructure dedicated to two large, non-investment-grade customer contracts.",
        "source": {
          "label": "CoreWeave announcement",
          "url": "https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-3-1-Billion-Loan-Facility-Expanding-Access-to-Public-Markets-for-GPU-Backed-Financing/default.aspx"
        }
      },
      {
        "confirmed": true,
        "name": "Crusoe",
        "date": "27 March 2025",
        "amount": "~$225M",
        "structure": "Credit facility for GPUs and cloud infrastructure",
        "terms": "Pricing and maturity not disclosed in the announcement",
        "context": "Private credit financing for platform expansion. LTV and repayment schedule not disclosed.",
        "source": {
          "label": "Crusoe announcement",
          "url": "https://crusoe.ai/newsroom/upper90-closes-usd225m-credit-facility-to-crusoe-to-expand-ai-cloud/"
        }
      }
    ],
    "observationTitle": "Relevance to the proposed strategy",
    "observation": "These transactions demonstrate access to institutional infrastructure debt. Their scale, tenor and customer support differ from the proposed Open Silicon bridge loans.",
    "note": "Public market precedents only. These are not Open Silicon transactions or relationships. Amounts are announced facility sizes, not verified amounts drawn. Floating-rate spreads are not all-in coupons."
  },
  "strategy": {
    "headers": [
      "Credit parameter",
      "Proposed Open Silicon mandate"
    ],
    "rows": [
      {
        "label": "Borrower",
        "value": "Operators with {{operatorFacilityRange}} facilities and operating GPU infrastructure"
      },
      {
        "label": "Entry condition",
        "value": "Commissioned hardware, secured power and at least one paying compute contract"
      },
      {
        "label": "Financing need",
        "value": "Short-term capital while the operator arranges longer-term financing"
      },
      {
        "label": "Credit exposure",
        "value": "{{termRange}} month senior secured loan; ≤ {{ltvCap}}% forced-liquidation LTV"
      },
      {
        "label": "Repayment requirement",
        "value": "Cash-supported amortization, cash sweep and a funded reserve"
      },
      {
        "label": "Potential take-out",
        "value": "Larger off-take contract followed by refinancing, subject to lender approval"
      }
    ],
    "asideTitle": "Target financing gap",
    "aside": "Smaller operating facilities can require capital before a large off-take agreement or long-term loan is available.",
    "evidence": "[TODO: documented borrower financing alternatives, timing and declined applications]",
    "note": "The financing gap is the investment thesis. Borrower-level evidence determines whether a specific opportunity qualifies."
  },
  "lighthouse": {
    "caption": "Anonymized transaction profile",
    "note": "Funding requires verified ownership, contract collections, an independent valuation and an approved repayment schedule."
  },
  "repayment": {
    "headers": [
      "Cash flow item",
      "Current monthly run rate",
      "Underwritten case"
    ],
    "rows": [
      {
        "label": "Contract cash collections",
        "value": "[TODO: verified receipts]",
        "case": "[TODO: eligible collections]"
      },
      {
        "label": "Power, cooling and site costs",
        "value": "[TODO: operating costs]",
        "case": "[TODO: stressed costs]"
      },
      {
        "label": "Maintenance and other cash costs",
        "value": "[TODO: recurring costs]",
        "case": "[TODO: required spending]"
      },
      {
        "label": "Cash available for debt service",
        "value": "[TODO: cash available]",
        "case": "[TODO: cash available]"
      },
      {
        "label": "Interest and scheduled principal",
        "value": "[TODO: debt service]",
        "case": "[TODO: debt service]"
      },
      {
        "label": "Principal remaining at maturity",
        "value": "[TODO: scheduled balance]",
        "case": "[TODO: no-refinancing balance]"
      }
    ],
    "sources": [
      {
        "title": "Operating cash flow",
        "body": "The repayment schedule must fit verified collections after operating costs."
      },
      {
        "title": "Refinancing",
        "body": "A larger off-take contract may enable take-out. Timing and proceeds remain uncertain."
      },
      {
        "title": "Collateral recovery",
        "body": "Enforcement is a fallback. Recovery depends on realizable value, costs and time."
      }
    ],
    "testTitle": "No-refinancing test",
    "test": "The credit policy excludes reliance on a large maturity balloon. The lighthouse cash flow model must demonstrate compliance before funding.",
    "reserve": "Reserve funding, size and release conditions: {{reserve}}."
  },
  "underwriting": {
    "headers": [
      "Requirement",
      "Evidence required before funding"
    ],
    "rows": [
      {
        "label": "Operating assets",
        "value": "Hardware delivered and commissioned; ownership and serial numbers verified"
      },
      {
        "label": "Power and cooling",
        "value": "Executed supply arrangements, operating capacity and interruption coverage"
      },
      {
        "label": "Paying compute contract",
        "value": "Payment history, tenant credit, contract tenor, termination rights and assignability"
      },
      {
        "label": "Collateral value",
        "value": "Independent forced-liquidation valuation; loan ≤ {{ltvCap}}% of eligible value"
      },
      {
        "label": "Debt service",
        "value": "Monthly cash flow model; minimum DSCR [TODO: threshold and definition]"
      },
      {
        "label": "Cash control",
        "value": "Assigned receipts, controlled collection account and monthly cash sweep"
      },
      {
        "label": "Equity and reserve",
        "value": "Operator equity at risk; funded reserve with documented funding source"
      },
      {
        "label": "Execution and monitoring",
        "value": "Collateral agent, servicer, reporting and breach triggers in place"
      }
    ],
    "note": "Every condition must be met before a loan is funded. Unresolved eligibility items prevent funding."
  },
  "structure": {
    "forward": "Capital funds operating assets; the operator supplies compute",
    "back": "Controlled collections and lender distributions",
    "nodes": [
      "LPs",
      "Open Silicon SPV",
      "Borrower SPV",
      "Operator",
      "Compute tenant"
    ],
    "nodeDetails": [
      "Investor interests",
      "Per transaction",
      "Loan obligor",
      "Deployed hardware",
      "Contract payments"
    ],
    "agent": "Collateral agent / servicer",
    "lien": "Hardware security",
    "assignment": "Receivables control",
    "columns": [
      {
        "title": "Assets and ranking",
        "body": "First-ranking hardware security, subject to verified title, prior-lien searches and local perfection requirements."
      },
      {
        "title": "Controlled collections",
        "body": "Tenant receipts enter a controlled account. The agreed waterfall funds essential costs, debt service and reserves."
      },
      {
        "title": "Enforcement",
        "body": "Agent authority, site access, equipment removal and servicing continuity must be documented."
      }
    ],
    "note": "Proposed structure. [TODO: asset owner, contract counterparty, account control and jurisdiction-specific enforcement opinion]",
    "flowLabels": [
      "Subscription",
      "Loan",
      "Deployment",
      "Compute"
    ]
  },
  "risks": [
    {
      "risk": "GPU depreciation and obsolescence",
      "mitigant": "Short loan term, independent forced-liquidation valuation and ≤ {{ltvCap}}% LTV. Revaluation triggers: [TODO: thresholds].",
      "residual": "Sale prices and recovery timing can deteriorate together."
    },
    {
      "risk": "Utilization or rental price decline",
      "mitigant": "Contract review, collection monitoring, downside cash flow tests and monthly cash sweep.",
      "residual": "Receivables assignment does not protect against loss of demand."
    },
    {
      "risk": "Operator default",
      "mitigant": "Operator equity, senior security, collateral agent and replacement servicing arrangements.",
      "residual": "Enforcement may delay distributions and incur costs."
    },
    {
      "risk": "Power interruption or deployment delay",
      "mitigant": "Only commissioned assets; secured power and cooling, insurance review and a funded reserve.",
      "residual": "Operating interruptions can continue after funding."
    },
    {
      "risk": "Refinancing or take-out failure",
      "mitigant": "Repayment sized to verified cash flows; amortization and funded reserve; no-refinancing test.",
      "residual": "An extension or asset sale may still be necessary."
    },
    {
      "risk": "Regulatory and jurisdiction risk",
      "mitigant": "Local counsel reviews lending, collateral, transfer and enforcement requirements.",
      "residual": "Changes in law and cross-border enforcement remain uncertain."
    },
    {
      "risk": "Concentration and correlated losses",
      "mitigant": "Limits by borrower, tenant, location and GPU model: {{diversificationTarget}}.",
      "residual": "Compute revenue, asset prices and refinancing may weaken together."
    }
  ],
  "riskSection": {
    "headers": [
      "Risk",
      "Proposed protection",
      "Remaining exposure"
    ],
    "stress": "Combined downside: [TODO: rental decline, customer default, GPU haircut, recovery costs, recovery time and resulting LP loss].",
    "note": "Short contractual maturity does not ensure short recovery time. Capital remains at risk."
  },
  "pipelineStages": [
    {
      "name": "Sourced",
      "count": "[TODO: sourced count]",
      "total": "[TODO: sourced amount]",
      "gate": "Initial opportunity identified"
    },
    {
      "name": "Screened",
      "count": "[TODO: screened count]",
      "total": "[TODO: screened amount]",
      "gate": "Entry criteria reviewed"
    },
    {
      "name": "In diligence",
      "count": "[TODO: in diligence count]",
      "total": "[TODO: in diligence amount]",
      "gate": "Contracts and assets under review"
    },
    {
      "name": "Term sheet",
      "count": "[TODO: term sheet count]",
      "total": "[TODO: term sheet amount]",
      "gate": "Terms under negotiation"
    },
    {
      "name": "Funded",
      "count": "[TODO: funded count]",
      "total": "[TODO: funded amount]",
      "gate": "Capital deployed"
    }
  ],
  "portfolio": {
    "headers": [
      "Stage",
      "Deals",
      "Facility amount",
      "Status"
    ],
    "limits": [
      {
        "label": "Single borrower",
        "value": "[TODO: maximum exposure]"
      },
      {
        "label": "Shared compute tenant",
        "value": "[TODO: concentration limit]"
      },
      {
        "label": "GPU model / location",
        "value": "[TODO: correlated exposure limit]"
      }
    ],
    "note": "Pipeline figures are indicative, not committed capital. Each deal appears in its current stage only. Operator facility value and requested loan size are different measures."
  },
  "terms": {
    "rows": [
      {
        "label": "Individual loan size",
        "value": "{{facilitySize}}"
      },
      {
        "label": "Contractual loan term",
        "value": "{{termRange}} months"
      },
      {
        "label": "Annual loan coupon",
        "value": "{{couponRange}}% on outstanding principal"
      },
      {
        "label": "Interest payments",
        "value": "Monthly"
      },
      {
        "label": "Amortization",
        "value": "{{amortization}}"
      },
      {
        "label": "Security / advance rate",
        "value": "Senior hardware lien and assigned receivables; ≤ {{ltvCap}}% forced-liquidation LTV"
      },
      {
        "label": "Funded reserve",
        "value": "{{reserve}}"
      },
      {
        "label": "Key covenants",
        "value": "Cash sweep, reporting and limits on additional debt; [TODO: financial triggers]"
      }
    ],
    "economicsTitle": "From loan coupon to LP receipts",
    "economics": [
      {
        "label": "Contractual interest",
        "value": "{{couponRange}}% on the funded, outstanding balance"
      },
      {
        "label": "Investor-level costs",
        "value": "{{fees}}"
      },
      {
        "label": "Deployment and reserves",
        "value": "[TODO: cash drag and reserve treatment]"
      },
      {
        "label": "Credit performance",
        "value": "[TODO: loss, delay and prepayment assumptions]"
      }
    ],
    "note": "Net LP return is not established by the loan coupon alone. No conditional premium is included in the quoted coupon."
  },
  "participation": {
    "headers": [
      "Participation",
      "Proposed basis / item to finalize"
    ],
    "rows": [
      {
        "label": "Investment vehicle",
        "value": "SPV per transaction; investor interests and rights set in subscription documents"
      },
      {
        "label": "Pool and allocation",
        "value": "[TODO: pool commitment versus deal-by-deal election; allocation authority]"
      },
      {
        "label": "Capital calls and recycling",
        "value": "[TODO: draw conditions, investment period and reinvestment policy]"
      },
      {
        "label": "Investment decisions",
        "value": "[TODO: committee members, approval rights and exception policy]"
      },
      {
        "label": "Extensions and enforcement",
        "value": "[TODO: LP consent rights, voting thresholds and agent authority]"
      },
      {
        "label": "Reporting and alignment",
        "value": "[TODO: reporting frequency, valuation, audit and manager co-investment]"
      },
      {
        "label": "Minimum ticket",
        "value": "{{minimumTicket}}"
      }
    ],
    "eligibilityTitle": "Eligibility and records",
    "eligibility": [
      {
        "title": "US investors",
        "body": "Proposed Reg D 506(c) offering to verified accredited investors."
      },
      {
        "title": "Offshore investors",
        "body": "Proposed Reg S pathway, subject to applicable transaction and selling restrictions."
      },
      {
        "title": "KYC / AML",
        "body": "Required before subscription acceptance. [TODO: subscription currency, custody and conversion arrangements]"
      },
      {
        "title": "Optional on-chain record",
        "body": "A record of interests does not provide liquidity. Transfers remain subject to legal and contractual restrictions."
      }
    ],
    "note": "Loan maturity and LP holding period can differ. Final rights, fees and offering structure depend on definitive documents."
  },
  "teamSection": {
    "teamLabel": "Investment responsibilities",
    "partnersLabel": "Collateral and servicing",
    "experienceTitle": "Relevant transaction experience",
    "experienceHeaders": [
      "Prior transaction",
      "Actual role / attribution",
      "Realized outcome"
    ],
    "experience": [
      {
        "confirmed": false,
        "transaction": "[TODO: verified transaction]",
        "role": "[TODO: individual responsibility and employer]",
        "outcome": "[TODO: repayments, losses and recovery]"
      }
    ],
    "note": "Prior-employer experience must be attributed to the individual and the institution where the work occurred."
  },
  "process": [
    {
      "title": "Commitment",
      "body": "Agree allocation and subscription conditions."
    },
    {
      "title": "SPV formation",
      "body": "Establish investor rights and transaction accounts."
    },
    {
      "title": "Credit diligence",
      "body": "Verify the lighthouse assets, contracts and repayment model."
    },
    {
      "title": "Security and servicing",
      "body": "Appoint the agent and servicer; perfect collateral rights."
    },
    {
      "title": "Funding",
      "body": "Fund the reserve and disburse after all conditions are met."
    }
  ],
  "processSection": {
    "timeLabel": "Indicative commitment-to-funding period",
    "note": "{{fundingWeeks}} weeks is a planning assumption. Credit approval, legal readiness and fulfilled funding conditions determine the actual date.",
    "gates": [
      {
        "label": "Credit approval",
        "value": "[TODO: approval date and decision makers]"
      },
      {
        "label": "Legal readiness",
        "value": "[TODO: jurisdiction, vehicle and documents]"
      },
      {
        "label": "Capital availability",
        "value": "[TODO: commitment and draw schedule]"
      }
    ]
  },
  "closing": {
    "subtitle": "Lighthouse transaction and first-pool participation",
    "actions": [
      {
        "title": "Request the data room",
        "body": "Review asset, contract and cash flow evidence."
      },
      {
        "title": "Review the term sheet",
        "body": "Assess repayment, security and participation terms."
      },
      {
        "title": "Schedule a discussion",
        "body": "Discuss allocation and outstanding diligence items."
      }
    ],
    "contactLabel": "Investor enquiries"
  },
  "slides": [
    {
      "id": "cover",
      "section": "Investment overview",
      "title": "Bridge credit\nfor AI compute",
      "lede": "",
      "notes": "Open Silicon proposes short-term senior secured credit against operating GPU infrastructure. The first pool targets {{raiseRange}}, with a {{couponRange}}% annual loan coupon before investor-level fees."
    },
    {
      "id": "contents",
      "section": "Contents",
      "title": "Table of contents",
      "lede": "",
      "notes": "The discussion moves from market evidence and financing precedents to the proposed credit and its repayment sources. The later sections address portfolio risk, investor rights and execution."
    },
    {
      "id": "market",
      "section": "Market overview",
      "title": "AI compute market overview",
      "lede": "Power and capacity remain constrained across primary data center markets.",
      "notes": "The market data describes North American colocation capacity, not GPU utilization or rental profitability. It provides context for the strategy, while every borrower still requires its own cash flow and collateral analysis."
    },
    {
      "id": "market-deals",
      "section": "Deals overview",
      "title": "Selected financing transactions",
      "lede": "Public precedents show a range of structures for financing GPU infrastructure.",
      "notes": "These are publicly announced third-party transactions, not Open Silicon experience. Their scale, maturity and customer support limit direct comparison with our proposed bridge loans."
    },
    {
      "id": "strategy",
      "section": "Investment strategy",
      "title": "Target borrowers and credit mandate",
      "lede": "Senior secured bridge capital for smaller operating compute facilities.",
      "notes": "The strategy focuses on the period between operating revenue and longer-term financing. A large off-take agreement is a potential take-out route, while eligibility depends on assets, collections and a credible repayment plan."
    },
    {
      "id": "lighthouse",
      "section": "Lighthouse opportunity",
      "title": "Lighthouse transaction overview",
      "lede": "Operating assets, contract economics and requested financing.",
      "notes": "The transaction profile remains subject to verification of assets, contracts and collections. The loan amount and schedule follow the completed cash flow and collateral analysis."
    },
    {
      "id": "repayment",
      "section": "Repayment analysis",
      "title": "Repayment capacity and exit routes",
      "lede": "The repayment schedule must remain credible if refinancing is unavailable.",
      "notes": "Separate cash available for debt service from gross contracted revenue. Refinancing can accelerate the exit, but the credit policy requires an acceptable repayment outcome without relying on a large maturity balloon."
    },
    {
      "id": "underwriting",
      "section": "Underwriting",
      "title": "Credit eligibility and diligence",
      "lede": "Every requirement must be satisfied before capital is deployed.",
      "notes": "A paying contract is the starting point, not a complete credit assessment. Diligence also considers tenant credit, contract termination, cash costs, collateral value and the enforceability of our protections."
    },
    {
      "id": "structure",
      "section": "Security structure",
      "title": "Collateral and cash flow structure",
      "lede": "Proposed transaction structure and lender controls.",
      "notes": "The structure needs to connect the legal borrower, asset owner and compute contracts to an enforceable security package. Controlled collections and independent servicing support monitoring and distributions under the documented waterfall."
    },
    {
      "id": "risks",
      "section": "Risks and downside",
      "title": "Principal risks and credit protections",
      "lede": "Protections reduce exposure but do not eliminate loss or recovery delays.",
      "notes": "Operating cash flows, equipment values and refinancing availability can weaken at the same time. The investment decision must consider combined downside scenarios and the cost and time required to enforce security."
    },
    {
      "id": "portfolio",
      "section": "Portfolio construction",
      "title": "Investment pipeline and concentration",
      "lede": "Stage-based reporting and exposure limits guide the first pool.",
      "notes": "Pipeline is indicative and must be reported without double counting. Concentration is measured across shared customers, GPU models and sites as well as individual borrowers."
    },
    {
      "id": "terms",
      "section": "Investment terms",
      "title": "Proposed credit terms and economics",
      "lede": "Contractual loan income and investor distributions are distinct measures.",
      "notes": "Interest accrues on outstanding principal, so amortization changes total interest receipts. Fees, reserves, idle cash and credit performance determine the net investor result."
    },
    {
      "id": "participation",
      "section": "Investor participation",
      "title": "Investment structure and governance",
      "lede": "Investor rights must be explicit at the vehicle and transaction levels.",
      "notes": "The proposed vehicle is a dedicated SPV for each loan, with the pool-level commitment and allocation mechanism still to be finalized. Subscription documents must address capital calls, voting rights, fees and the possibility that recovery extends beyond contractual loan maturity."
    },
    {
      "id": "team",
      "section": "Team and experience",
      "title": "Team and transaction experience",
      "lede": "Accountability for underwriting, monitoring and recovery.",
      "notes": "Relevant experience is assessed through each person’s actual role and realized transaction outcomes. Prior-employer transactions and independent service providers are identified with their scope of responsibility."
    },
    {
      "id": "process",
      "section": "Execution",
      "title": "Commitment and funding process",
      "lede": "Capital deployment follows completed diligence and satisfied funding conditions.",
      "notes": "The planned commitment-to-funding period is {{fundingWeeks}} weeks. Diligence, vehicle formation and collateral work may overlap, but funding only follows approval and documented satisfaction of the conditions."
    },
    {
      "id": "cashflows",
      "section": "Cash flow illustration",
      "title": "Illustrative cash flow schedule",
      "lede": "Scheduled monthly receipts on an illustrative investment, before investor-level fees.",
      "notes": "The illustration separates principal from interest and applies simple monthly interest to the opening balance. The assumed schedule does not establish borrower repayment capacity or net investor returns."
    },
    {
      "id": "closing",
      "section": "Investment discussion",
      "title": "Investment discussion",
      "lede": "",
      "notes": "The next discussion should focus on the lighthouse credit, the repayment model and the proposed participation terms. Supporting evidence is reviewed through the data room and transaction documents."
    }
  ],
  "cashflowIllustration": {
    "defaultAmount": 250000,
    "defaultTerm": 12,
    "defaultCoupon": 14,
    "defaultAmortization": "straight-line",
    "chartTitle": "Monthly receipts",
    "principalLabel": "Returned principal",
    "interestLabel": "Interest",
    "totalLabel": "Total receipts",
    "method": "Interest accrues monthly on opening principal at the annual coupon divided by 12. Payments are rounded to cents.",
    "assumptions": "Before investor-level fees. Assumes scheduled payments with no default, prepayment, idle cash or reserve drag. Returned principal is not income.",
    "straightNote": "Illustrative straight-line repayment. Actual amortization depends on verified borrower cash flow and the final loan documents.",
    "chartDescription": "Monthly receipts in USD. Light purple shows returned principal. Purple shows interest.",
    "headers": [
      "Month",
      "Principal",
      "Interest",
      "Balance"
    ],
    "amountLabel": "Illustrative investment",
    "termLabel": "Term",
    "couponLabel": "Annual coupon",
    "scheduleLabel": "Straight-line principal repayment",
    "balanceLabel": "Principal at maturity",
    "note": "This payment schedule illustrates loan mechanics. It is not the lighthouse repayment forecast or a net LP return projection."
  }
} as const;
