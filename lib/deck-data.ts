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
  "documentLabel": "Discussion Materials",
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
      "description": "Agent demand, rental cycles, payback and compute financing",
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
    "metrics": [
      {
        "confirmed": true,
        "value": "4×",
        "label": "Agent tokens vs. chat",
        "source": {
          "confirmed": true,
          "label": "Anthropic · Multi-agent research system",
          "date": "13 June 2025",
          "url": "https://www.anthropic.com/engineering/multi-agent-research-system"
        }
      },
      {
        "confirmed": true,
        "value": "15×",
        "label": "Multi-agent tokens vs. chat",
        "source": {
          "confirmed": true,
          "label": "Anthropic · Multi-agent research system",
          "date": "13 June 2025",
          "url": "https://www.anthropic.com/engineering/multi-agent-research-system"
        }
      },
      {
        "confirmed": true,
        "value": "2×",
        "label": "Claude Code weekly users · Jan–Feb 2026",
        "source": {
          "confirmed": true,
          "label": "Anthropic · Series G announcement",
          "date": "12 February 2026",
          "url": "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation"
        }
      }
    ],
    "metricContext": "Token comparisons reflect Anthropic’s observed workloads.",
    "workflowTitle": "More inference within each task",
    "workflows": [
      {
        "label": "Chat",
        "title": "A response to a prompt",
        "body": "The next request usually waits for the user."
      },
      {
        "label": "Agent",
        "title": "Repeated execution toward an outcome",
        "body": "Plans, tool calls and revisions create additional model requests. Parallel agents add concurrent work."
      }
    ],
    "observations": [
      {
        "confirmed": true,
        "title": "Paying demand is scaling",
        "body": "Claude Code exceeded $2.5B in annualized revenue run rate in February 2026, more than double the start of the year.",
        "source": {
          "confirmed": true,
          "label": "Anthropic · Series G announcement",
          "date": "12 February 2026",
          "url": "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation"
        }
      },
      {
        "confirmed": true,
        "title": "Usage is translating into capacity purchases",
        "body": "Anthropic secured access to more than 220,000 NVIDIA GPUs in May 2026 and increased Code and API limits.",
        "source": {
          "confirmed": true,
          "label": "Anthropic · Usage limits and compute capacity",
          "date": "6 May 2026",
          "url": "https://www.anthropic.com/news/higher-limits-spacex"
        }
      }
    ],
    "demandShift": {
      "title": "Training and inference demand",
      "unit": "Global AI data center demand · GW",
      "source": {
        "confirmed": true,
        "label": "McKinsey · Data Center Demand Model",
        "date": "17 December 2025",
        "url": "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-next-big-shifts-in-ai-workloads-and-hyperscaler-strategies"
      },
      "sourceCaption": "McKinsey model · 2025 estimate and 2030 forecast",
      "maximum": 160,
      "ticks": [
        0,
        40,
        80,
        120,
        160
      ],
      "series": [
        {
          "key": "training",
          "label": "Training",
          "color": "#bdb7d5",
          "annotationColor": "#817596"
        },
        {
          "key": "inference",
          "label": "Inference",
          "color": "#533afe",
          "annotationColor": "#533afe"
        }
      ],
      "points": [
        {
          "year": 2025,
          "status": "Estimate",
          "training": 23.1,
          "inference": 20.9
        },
        {
          "year": 2030,
          "status": "Forecast",
          "training": 62.2,
          "inference": 93.3
        }
      ],
      "shareLabel": "Inference share of AI demand",
      "shareCaption": "2025 estimate → 2030 forecast",
      "takeaway": "Both workloads grow. Inference takes a larger share.",
      "mechanismTitle": "Agents add repeated inference",
      "mechanismBody": "A task can trigger repeated model calls and parallel work. Anthropic observed 15× chat token use in multi-agent systems.",
      "adoptionTitle": "Demand is becoming commercial",
      "adoptionBody": "Claude Code weekly users doubled between January and February 2026."
    }
  },
  "marketDeals": {
    "headers": [
      "Public market precedent",
      "Announced size",
      "Financing / support",
      "Credit relevance"
    ],
    "entries": [
      {
        "confirmed": true,
        "name": "CoreWeave",
        "date": "May 2024",
        "amount": "$7.5B",
        "structure": "Debt facility led by Blackstone and Magnetar",
        "terms": "BlackRock-managed funds and accounts participated",
        "context": "Institutional lenders already finance compute infrastructure.",
        "source": {
          "confirmed": true,
          "label": "Blackstone · CoreWeave debt financing",
          "date": "17 May 2024",
          "url": "https://www.blackstone.com/news/press/coreweave-secures-7-5-billion-debt-financing-facility-led-by-blackstone-and-magnetar/"
        }
      },
      {
        "confirmed": true,
        "name": "Apollo / Valor",
        "date": "January 2026",
        "amount": "$3.5B",
        "structure": "Capital solution within a $5.4B compute transaction",
        "terms": "GB200 infrastructure leased to xAI",
        "context": "Equipment ownership and leases support large-scale financing.",
        "source": {
          "confirmed": true,
          "label": "Apollo · Valor and xAI compute transaction",
          "date": "7 January 2026",
          "url": "https://www.apollo.com/wealth/insights-news/pressreleases/2026/01/apollo-backs-5-4-billion-valor-and-xai-data-center-compute-infrastructure-transaction-with-3-5-billion-capital-solution-3214463"
        }
      },
      {
        "confirmed": true,
        "name": "NVIDIA / CoreWeave",
        "date": "September 2025",
        "amount": "$6.3B",
        "structure": "Initial value of capacity purchase agreement",
        "terms": "Covered unsold capacity through April 2032",
        "context": "Contractual demand support for eligible capacity.",
        "source": {
          "confirmed": true,
          "label": "CoreWeave · NVIDIA capacity agreement, SEC 8-K",
          "date": "15 September 2025; agreement dated 9 September",
          "url": "https://www.sec.gov/Archives/edgar/data/1769628/000176962825000047/crwv-20250909.htm"
        }
      }
    ],
    "observationTitle": "A broader potential refinancing market",
    "observation": "Institutional capital expands financing options for eligible assets. Open Silicon underwrites repayment from each borrower’s existing cash flows.",
    "note": "External market precedents, not Open Silicon transactions. Facility commitments are not amounts drawn. The capacity agreement is a service purchase commitment, not a loan or GPU buyback.",
    "supportTitle": "Selective vendor support",
    "supportBody": "NVIDIA has disclosed capacity commitments and project-specific residual-value support. Protection depends on the signed terms.",
    "supportSource": {
      "confirmed": true,
      "label": "NVIDIA · Quarterly report, period ended 26 July 2026",
      "date": "Q2 FY2027",
      "url": "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm"
    }
  },
  "strategy": {
    "assets": {
      "label": "Operating assets",
      "value": "{{operatorFacilityRange}}",
      "unit": "Facility size",
      "criteria": [
        "Commissioned GPUs",
        "Secured power and cooling",
        "At least one paying contract"
      ]
    },
    "bridge": {
      "label": "Open Silicon bridge",
      "value": "{{termRange}}",
      "unit": "months",
      "security": "Senior secured",
      "ltv": "≤ {{ltvCap}}% LTV",
      "basis": "At forced-liquidation value"
    },
    "takeout": {
      "label": "Potential take-out",
      "title": "Long-term\ncapital",
      "steps": [
        "Larger off-take contract",
        "Lender-approved refinancing"
      ],
      "condition": "Large off-take is not required at entry."
    },
    "repayment": {
      "title": "Repayment underwritten\nwithout refinancing",
      "controls": [
        "Cash-supported amortization",
        "Monthly cash sweep",
        "Funded reserve"
      ]
    }
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
        "label": "Proposed first pool",
        "value": "{{raiseRange}}"
      },
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
      "section": "GPU rental market",
      "title": "Agentic AI is expanding inference demand",
      "lede": "Training demand continues to grow. Inference expands faster as AI moves into production.",
      "notes": "The chart compares published 2025 estimates and 2030 forecasts for global AI data center demand. Both training and inference expand, with inference gaining share. Agent use is one demand driver; these forecasts do not measure its isolated contribution."
    },
    {
      "id": "market-history",
      "section": "GPU rental pricing",
      "title": "A new wave of inference is tightening GPU supply",
      "lede": "Rental prices fell as capacity expanded, then recovered as available inventory tightened.",
      "notes": "The H100 contract series shows a decline followed by recovery. Market research links the change to stronger inference demand and constrained additions to available supply. This is a supported market explanation, not proof that agents alone caused the rebound."
    },
    {
      "id": "operator-economics",
      "section": "Operator economics",
      "title": "Stronger rental pricing improves capital recovery",
      "lede": "Holding cost and paid occupancy constant isolates the effect of rental pricing.",
      "notes": "The illustration applies historical rent ranges to a fixed August 2026 hardware cost basis. It shows price sensitivity, not realized historical project returns. An operator’s full capital recovery period is separate from repayment of a smaller bridge loan."
    },
    {
      "id": "rental-segments",
      "section": "Rental models and capital needs",
      "title": "Different rental models need different capital",
      "lede": "Large buildouts and smaller operating clusters have different funding requirements.",
      "notes": "Financing depends on contract quality, asset status and cash flow, as well as transaction size. Open Silicon targets operating facilities with paying customers while longer-term financing is arranged. Uncontracted spot-only capacity falls outside the proposed mandate."
    },
    {
      "id": "market-deals",
      "section": "Deals overview",
      "title": "Institutional capital is expanding compute finance",
      "lede": "Public financings and selective vendor support are broadening the available structures.",
      "notes": "These are external market precedents, not Open Silicon transactions or relationships. Institutional lending and selective vendor support can improve financeability for qualifying projects. They do not establish a market-wide floor for GPU rents or resale prices."
    },
    {
      "id": "strategy",
      "section": "Investment strategy",
      "title": "Bridge credit for operating compute assets",
      "lede": "Short-term senior secured financing while operators arrange longer-term capital.",
      "notes": "Eligibility begins with commissioned hardware, secured power and a paying contract. Loan size must satisfy both stressed cash-flow repayment and the forced-liquidation collateral cap. A larger off-take may support refinancing, but is not an entry requirement or a guaranteed exit."
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
  },
  "operatorEconomics": {
    "tableTitle": "Illustrative H100 payback · Fixed cost basis",
    "headers": [
      "Per GPU",
      "Oct 2025 rents",
      "Apr 2026 rents"
    ],
    "benchmark": {
      "confirmed": true,
      "label": "Public operator estimate",
      "value": "22",
      "unit": "months",
      "title": "Nebius · Estimated capex payback",
      "body": "Management’s expected payback on Q2 2026 contracts, improved from 24–36 months. Revenue-recognition basis; excludes prepayments.",
      "source": {
        "confirmed": true,
        "label": "Nebius · Q2 2026 shareholder letter",
        "date": "12 August 2026",
        "url": "https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm"
      }
    },
    "formula": {
      "label": "Static payback in months",
      "numerator": "Installed capex",
      "denominator": "Monthly net cash flow before financing",
      "ariaLabel": "Static payback in months equals installed capex divided by positive monthly net cash flow before financing."
    },
    "creditTitle": "Asset payback and loan repayment differ",
    "modelDefinitions": {
      "installedCapex": "GPU, server, networking and allocated installation costs per GPU.",
      "paidOccupancy": "Billed GPU-hours divided by available GPU-hours, not chip compute utilization.",
      "cashReceipts": "Actual contracted collections after discounts, credits and non-payment; market indices are context only.",
      "cashCosts": "Power, cooling, hosting, connectivity, maintenance, insurance and allocated cash operating costs, cash taxes and working capital requirements.",
      "payback": "A static estimate at a positive, constant monthly net cash flow before financing. Zero or negative cash flow has no finite payback. Excludes financing flows and equipment resale proceeds."
    },
    "assumptions": {
      "paidOccupancy": 0.9,
      "monthlyHours": 730,
      "monthlyCashCosts": 400,
      "additionalCapex": 5000,
      "refurbishedHardware": 30750,
      "newHardware": 40554.75
    },
    "scenarios": [
      {
        "period": "October 2025",
        "low": 1.45,
        "high": 1.95
      },
      {
        "period": "April 2026",
        "low": 2.1,
        "high": 2.7
      }
    ],
    "assumptionLabel": "Illustrative assumptions",
    "labels": {
      "rent": "Rent / paid GPU-hour",
      "receipts": "Monthly rental receipts",
      "cash": "Monthly cash after operating costs",
      "refurbished": "Refurbished hardware",
      "new": "New hardware",
      "installed": "installed / GPU",
      "months": "months",
      "modelScope": "Pretax, unlevered sensitivity. August 2026 hardware asking prices held fixed across rent scenarios."
    },
    "creditBody": "A shorter loan requires a smaller advance sized to cash flow, amortization and a funded reserve."
  },
  "marketHistory": {
    "period": "2023–April 2026",
    "startDate": "2023-01-01",
    "endDate": "2026-05-01",
    "chartTitle": "H100 · One-year rental contracts",
    "chartUnit": "USD / GPU-hour · 25th–75th percentile ranges",
    "source": {
      "confirmed": true,
      "label": "SemiAnalysis · H100 one-year contract ranges",
      "date": "Accessed 17 September 2026; series through April 2026",
      "url": "https://gpu-index.semianalysis.com/"
    },
    "minimum": 1,
    "maximum": 3.6,
    "ticks": [
      1,
      1.5,
      2,
      2.5,
      3,
      3.5
    ],
    "axisLabels": [
      {
        "date": "2023-01-01",
        "label": "2023"
      },
      {
        "date": "2024-01-01",
        "label": "2024"
      },
      {
        "date": "2025-01-01",
        "label": "2025"
      },
      {
        "date": "2026-01-01",
        "label": "2026"
      }
    ],
    "ranges": [
      {
        "period": "1H 2023",
        "start": "2023-01-01",
        "end": "2023-07-01",
        "low": 2.7,
        "high": 3.4
      },
      {
        "period": "2H 2023",
        "start": "2023-07-01",
        "end": "2024-01-01",
        "low": 2.65,
        "high": 3.3
      },
      {
        "period": "1Q 2024",
        "start": "2024-01-01",
        "end": "2024-04-01",
        "low": 2.5,
        "high": 3.1
      },
      {
        "period": "2Q 2024",
        "start": "2024-04-01",
        "end": "2024-07-01",
        "low": 2.2,
        "high": 2.5
      },
      {
        "period": "3Q 2024",
        "start": "2024-07-01",
        "end": "2024-10-01",
        "low": 2.15,
        "high": 2.45
      },
      {
        "period": "4Q 2024",
        "start": "2024-10-01",
        "end": "2025-01-01",
        "low": 1.9,
        "high": 2.1
      },
      {
        "period": "1Q 2025",
        "start": "2025-01-01",
        "end": "2025-04-01",
        "low": 1.8,
        "high": 2.1
      },
      {
        "period": "2Q 2025",
        "start": "2025-04-01",
        "end": "2025-07-01",
        "low": 1.8,
        "high": 2.1
      },
      {
        "period": "Jul 2025",
        "start": "2025-07-01",
        "end": "2025-08-01",
        "low": 1.7,
        "high": 2.0
      },
      {
        "period": "Aug 2025",
        "start": "2025-08-01",
        "end": "2025-09-01",
        "low": 1.5,
        "high": 2.0
      },
      {
        "period": "Sep 2025",
        "start": "2025-09-01",
        "end": "2025-10-01",
        "low": 1.5,
        "high": 2.0
      },
      {
        "period": "Oct 2025",
        "start": "2025-10-01",
        "end": "2025-11-01",
        "low": 1.45,
        "high": 1.95
      },
      {
        "period": "Nov 2025",
        "start": "2025-11-01",
        "end": "2025-12-01",
        "low": 1.45,
        "high": 2.0
      },
      {
        "period": "Dec 2025",
        "start": "2025-12-01",
        "end": "2026-01-01",
        "low": 1.45,
        "high": 2.0
      },
      {
        "period": "Jan 2026",
        "start": "2026-01-01",
        "end": "2026-02-01",
        "low": 1.5,
        "high": 2.05
      },
      {
        "period": "Feb 2026",
        "start": "2026-02-01",
        "end": "2026-03-01",
        "low": 1.8,
        "high": 2.35
      },
      {
        "period": "Mar 2026",
        "start": "2026-03-01",
        "end": "2026-04-01",
        "low": 2.0,
        "high": 2.7
      },
      {
        "period": "Apr 2026",
        "start": "2026-04-01",
        "end": "2026-05-01",
        "low": 2.1,
        "high": 2.7
      }
    ],
    "callouts": [
      {
        "period": "1H 2023",
        "date": "2023-04-01",
        "value": 3.4,
        "label": "$2.70–3.40"
      },
      {
        "period": "Oct 2025",
        "date": "2025-10-16",
        "value": 1.45,
        "label": "$1.45–1.95"
      },
      {
        "period": "Apr 2026",
        "date": "2026-04-16",
        "value": 2.7,
        "label": "$2.10–2.70"
      }
    ],
    "coverage": "SemiAnalysis · Published contract ranges through April 2026 · Typically 25% prepayment",
    "chapters": [
      {
        "period": "2023–2025",
        "title": "Supply expansion",
        "body": "More available GPUs intensified rental competition as operators sought to fill capacity."
      },
      {
        "period": "Late 2025–2026",
        "title": "Demand acceleration",
        "body": "Agents, reasoning and other inference workloads expanded demand for compute."
      },
      {
        "period": "Early 2026",
        "title": "Capacity tightening",
        "body": "Demand absorbed available inventory while higher server costs constrained new deployments."
      }
    ]
  },
  "rentalSegments": {
    "headers": [
      "Financing dimension",
      "Large dedicated capacity",
      "Smaller operating clusters",
      "Uncontracted capacity"
    ],
    "rows": [
      [
        "Rental model",
        "Long-term anchor off-take",
        "Reserved clusters and paying compute contracts",
        "On-demand and spot rentals"
      ],
      [
        "Capital need",
        "Construction, power and large deployments",
        "Liquidity against deployed equipment and receivables",
        "Working capital and occupancy ramp"
      ],
      [
        "Credit support",
        "Customer credit and delivery commitments",
        "Collections and hardware liquidation value",
        "Variable utilization and rental prices"
      ],
      [
        "Financing fit",
        "Prepayments and long-term project or asset finance",
        "Senior secured bridge credit",
        "Operator equity; debt needs contracted support"
      ]
    ],
    "evidence": {
      "confirmed": true,
      "title": "Contract duration varies within the same operator",
      "body": "Nebius describes short capacity contracts of 3–6 months, core contracts of 1–3 years and longer contracts with investment-grade customers.",
      "source": {
        "confirmed": true,
        "label": "Nebius · Q2 2026 shareholder letter",
        "date": "12 August 2026",
        "url": "https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm"
      }
    },
    "thesis": {
      "title": "Open Silicon’s target segment",
      "body": "{{operatorFacilityRange}} operating facilities. {{termRange}}-month secured bridge loans. Paying contracts at entry; larger off-take agreements can support refinancing."
    },
    "definitions": "Facility size describes operator assets, not rental-contract value or loan size. Short rental contracts can also be sold by large operators. This segmentation is a financing thesis, not an assertion that contract duration determines company size.",
    "exclusions": "Uncontracted spot-only capacity does not meet the paying-contract eligibility requirement. Construction finance and hardware not yet commissioned are outside the proposed mandate."
  },
  "researchNotes": [
    {
      "slideId": "market",
      "sections": [
        {
          "title": "Demand chart: measure and forecast",
          "paragraphs": [
            "McKinsey’s December 2025 model estimates training demand at 23.1 GW and inference at 20.9 GW in 2025, rising to 62.2 GW and 93.3 GW in 2030. Inference’s share of their combined demand is approximately 48% and 60%, calculated from those endpoints. Training also grows in absolute terms. The arrows show cumulative growth, calculated as (2030 demand / 2025 demand − 1) × 100 and rounded to the nearest whole percent: training +169%, inference +346%. These are five-year increases, not annual growth rates.",
            "The chart shows published endpoints only, with no invented intermediate years or implied crossover date. GW measures modeled data center capacity demand, not GPU hours, paid occupancy or revenue. The source covers inference broadly, not agents alone. Hardware efficiency and deployment constraints can change the forecast."
          ]
        },
        {
          "title": "Demand mechanism",
          "paragraphs": [
            "An agent can plan, request tools, inspect results and revise its work over repeated model calls. Parallel agents add simultaneous tasks. This expands both the number of useful applications and the inference consumed by an individual task.",
            "Anthropic’s June 2025 engineering report observed roughly 4× chat token use for agents and 15× for multi-agent systems in its own data. These are workload-specific observations, not universal multipliers. They do not establish equal multiples of GPU hours: model size, input/output mix, caching, batching, chip choice and efficiency matter. Tool execution and elapsed task time are not continuous GPU compute."
          ]
        },
        {
          "title": "Adoption and procurement timeline",
          "paragraphs": [
            "Claude Code became generally available in May 2025. On 2 September 2025, Anthropic reported more than $500M in annualized revenue run rate and more than 10× usage growth over three months. On 12 February 2026, run-rate revenue exceeded $2.5B and weekly active users had doubled since 1 January. Run rate is an annualization, not realized annual revenue or measured GPU usage.",
            "On 6 May 2026, Anthropic announced access to all Colossus 1 capacity, more than 300 MW and 220,000 NVIDIA GPUs within that month. The announcement explicitly linked this and other capacity agreements to higher Claude Code and API limits. This connects product usage to physical compute procurement; it does not allocate all that capacity exclusively to Claude Code.",
            "The June 2026 Economic Index described an increasing share of long-running agent tasks as Code and Cowork grew. Anthropic also uses Trainium and TPUs, so total Anthropic demand cannot be mapped directly to H100 rental demand."
          ]
        },
        {
          "title": "Evidence boundary",
          "paragraphs": [
            "Chat itself is inference. The thesis is acceleration in an existing market, not the discovery of inference or an absence of earlier use cases. Agent adoption, paid compute capacity, chip utilization and borrower cash collections are distinct measures. The deck supports the first two; each operator’s paid occupancy and collections still require diligence."
          ]
        }
      ],
      "sources": [
        {
          "confirmed": true,
          "label": "McKinsey · Data Center Demand Model",
          "date": "17 December 2025",
          "url": "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-next-big-shifts-in-ai-workloads-and-hyperscaler-strategies"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Multi-agent research system",
          "date": "13 June 2025",
          "url": "https://www.anthropic.com/engineering/multi-agent-research-system"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Series F announcement",
          "date": "2 September 2025",
          "url": "https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Series G announcement",
          "date": "12 February 2026",
          "url": "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Usage limits and compute capacity",
          "date": "6 May 2026",
          "url": "https://www.anthropic.com/news/higher-limits-spacex"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Economic Index",
          "date": "26 June 2026",
          "url": "https://www.anthropic.com/research/economic-index-june-2026-report"
        },
        {
          "confirmed": true,
          "label": "Alphabet · Q4 2024 earnings call",
          "date": "4 February 2025",
          "url": "https://abc.xyz/investor/events/event-details/2025/2024-Q4-Earnings-Call/"
        }
      ]
    },
    {
      "slideId": "market-history",
      "sections": [
        {
          "title": "Price series and chart method",
          "paragraphs": [
            "The chart uses SemiAnalysis’s public H100 one-year contract 25th–75th percentile ranges, typically assuming 25% prepayment. Coverage runs from the first half of 2023 through April 2026. The published periods change from half-years to quarters to months. Each rectangle represents a reported period; no daily prices or within-period movements are inferred.",
            "The reported ranges were $2.70–3.40/GPU-hour in 1H 2023, $1.45–1.95 in October 2025 and $2.10–2.70 in April 2026. These are percentile bands, not a transaction mean, price floor or market minimum/maximum. The chart stops at April even though research was accessed in September; on-demand indices are not spliced into this contract series."
          ]
        },
        {
          "title": "Why prices fell",
          "paragraphs": [
            "SemiAnalysis describes greater available rental inventory and competition before late 2025. Operators sought utilization and capital recovery before equipment refreshes. This supports a period of looser conditions in parts of the merchant GPU rental market.",
            "It does not establish industry-wide overbuilding of training data centers. Alphabet said in February 2025 that AI demand exceeded its available capacity at the end of 2024 and that inference’s share of spending relative to training had been rising for three years. AWS cut H100 P5 on-demand prices by 44% in June 2025 while citing scale efficiencies and ongoing industry supply constraints. A price cut alone is not proof of weak demand or idle hardware."
          ]
        },
        {
          "title": "Why prices recovered",
          "paragraphs": [
            "SemiAnalysis’s April 2026 market research associates tightening with agents, open models and other inference demand, plus higher server costs and slower or cancelled deployments. Existing clusters remained in use while readily available inventory was absorbed.",
            "Claude Code was already growing rapidly by September 2025, yet the cited contract band continued falling into October. The sharper early-2026 adoption acceleration overlaps the rental rebound. The timing and mechanism support agents as a contributor, but do not isolate their causal share from reasoning, image/video generation, other customers or supply constraints."
          ]
        },
        {
          "title": "Hypothesis and alternative explanations",
          "paragraphs": [
            "Working thesis: earlier capacity additions intensified rental competition; a new wave of inference subsequently absorbed available capacity while new supply adjusted with a lag. The narrower claim is better supported than “there were no useful applications, training facilities sat idle, and Claude Code alone reversed prices.”",
            "Direct proof of the training-surplus hypothesis would require supplier GPU-hour allocations, paid occupancy, cluster conversion histories and attributed orders over time. Public evidence reviewed here does not provide that decomposition. A tighter market for selected models or contract terms is not evidence that every operator is fully leased."
          ]
        }
      ],
      "sources": [
        {
          "confirmed": true,
          "label": "SemiAnalysis · H100 one-year contract ranges",
          "date": "Accessed 17 September 2026; series through April 2026",
          "url": "https://gpu-index.semianalysis.com/"
        },
        {
          "confirmed": true,
          "label": "SemiAnalysis · GPU rental market research",
          "date": "2 April 2026",
          "url": "https://newsletter.semianalysis.com/p/the-great-gpu-shortage-rental-capacity"
        },
        {
          "confirmed": true,
          "label": "Alphabet · Q4 2024 earnings call",
          "date": "4 February 2025",
          "url": "https://abc.xyz/investor/events/event-details/2025/2024-Q4-Earnings-Call/"
        },
        {
          "confirmed": true,
          "label": "AWS · GPU instance price reductions",
          "date": "5 June 2025",
          "url": "https://aws.amazon.com/blogs/aws/announcing-up-to-45-price-reduction-for-amazon-ec2-nvidia-gpu-accelerated-instances/"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Series F announcement",
          "date": "2 September 2025",
          "url": "https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation"
        },
        {
          "confirmed": true,
          "label": "Anthropic · Series G announcement",
          "date": "12 February 2026",
          "url": "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation"
        }
      ]
    },
    {
      "slideId": "operator-economics",
      "sections": [
        {
          "title": "Inputs and calculation",
          "paragraphs": [
            "Monthly revenue per GPU = rent per paid GPU-hour × 730 hours × 90% paid occupancy. Monthly operating cash = revenue minus $400 in recurring cash costs. Static payback = installed capital / positive monthly operating cash. These occupancy, installation and operating-cost inputs are illustrative assumptions, not borrower facts.",
            "Hashrate Index’s 31 August 2026 median asking prices were $324,438 for a new eight-GPU HGX H100 system and $246,000 for refurbished, or $40,554.75 and $30,750 per GPU. Adding an assumed $5,000 per GPU for installation and related infrastructure produces $45,554.75 and $35,750. Asking prices are not executed purchases or forced-liquidation bids; configurations are not fully standardized."
          ]
        },
        {
          "title": "Results and limits",
          "paragraphs": [
            "At October 2025 rents of $1.45–1.95, the refurbished cost basis yields 40.6–64.7 months of static payback; at April 2026 rents of $2.10–2.70, it yields 26.0–36.5 months. The same new-hardware cost basis yields 51.7–82.4 and 33.2–46.5 months. Lower payback corresponds to the higher rent.",
            "Historical rent observations are deliberately combined with a fixed August 2026 cost basis to isolate rental-price sensitivity. These are not historical cohort returns or September 2026 executable economics. The model assumes constant rent and occupancy beyond the one-year contract, stable collections and no operating ramp; it excludes financing, taxes, extra working capital, replacement capex and resale proceeds. It does not model the timing benefit of contractual prepayments.",
            "Paid occupancy means billed capacity divided by available capacity, not chip utilization. A customer reserving a GPU may owe payment while the chip is idle. With the same refurbished cost basis, reducing paid occupancy to 70% extends the April rent scenario to about 36.5–53.1 months. Zero or negative operating cash has no finite payback."
          ]
        },
        {
          "title": "Independent operator precedent",
          "paragraphs": [
            "Nebius’s Q2 2026 shareholder letter reports expected payback on new deals improving from 24–36 months to 22 months. It uses recognized revenue, excludes prepayments and includes forecast operating costs and future capacity, including assets not yet built. It is a management estimate for those contracts, not realized H100 industry payback or an input into our sensitivity."
          ]
        },
        {
          "title": "Implication for credit sizing",
          "paragraphs": [
            "A multi-year recovery period for the operator’s entire asset investment does not itself establish whether a smaller 6–12 month loan can amortize. Advance size must fit verified stressed collections after operating costs, interest and reserves, as well as the collateral cap. The illustrative payback table is not a lighthouse DSCR or debt-repayment forecast."
          ]
        }
      ],
      "sources": [
        {
          "confirmed": true,
          "label": "SemiAnalysis · H100 one-year contract ranges",
          "date": "Accessed 17 September 2026; series through April 2026",
          "url": "https://gpu-index.semianalysis.com/"
        },
        {
          "confirmed": true,
          "label": "Hashrate Index · AI hardware asking-price index",
          "date": "31 August 2026",
          "url": "https://beta.hashrateindex.com/blog/announcement-introducing-the-ai-hardware-price-index/"
        },
        {
          "confirmed": true,
          "label": "Nebius · Q2 2026 shareholder letter",
          "date": "12 August 2026",
          "url": "https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm"
        }
      ]
    },
    {
      "slideId": "rental-segments",
      "sections": [
        {
          "title": "Rental and financing dimensions",
          "paragraphs": [
            "Transaction size, rental duration, tenant credit and operator scale are separate dimensions. A large platform may sell short capacity contracts; a small operator may secure a long one. Large dedicated buildouts require construction and deployment capital. Smaller operating clusters may need liquidity against equipment already commissioned and recurring receivables.",
            "Nebius describes 3–6 month capacity contracts, core 1–3 year contracts and longer agreements with investment-grade customers. This supports the existence of several rental models within the same operator. Uncontracted spot-only capacity does not satisfy Open Silicon’s paying-contract requirement."
          ]
        },
        {
          "title": "Competitive evidence",
          "paragraphs": [
            "Small GPU loans already exist. USD.AI’s August 2026 report describes $15.3M funded to QumulusAI and $7.5M funded to Corvex. This prevents a blanket claim that small operators cannot borrow. Open Silicon’s differentiation must be demonstrated through borrower fit, duration, execution, advance size and protections.",
            "A paying compute contract is necessary but not sufficient. Its termination rights, collection history, assignment, tenant credit and cash after costs determine debt capacity. No public financing precedent proves a particular Open Silicon borrower is eligible."
          ]
        }
      ],
      "sources": [
        {
          "confirmed": true,
          "label": "Nebius · Q2 2026 shareholder letter",
          "date": "12 August 2026",
          "url": "https://www.sec.gov/Archives/edgar/data/1513845/000110465926094568/tm2622968d1_ex99-2.htm"
        },
        {
          "confirmed": true,
          "label": "USD.AI · Funded GPU loans, August recap",
          "date": "1 September 2026",
          "url": "https://usd.ai/insights/august-recap-100m-facility-susdai-ath"
        }
      ]
    },
    {
      "slideId": "market-deals",
      "sections": [
        {
          "title": "External transaction evidence",
          "paragraphs": [
            "CoreWeave’s May 2024 $7.5B debt facility was led by Blackstone and Magnetar and included funds and accounts managed by BlackRock. The amount is a facility, not a verified full draw or BlackRock’s individual contribution.",
            "Apollo’s January 2026 $3.5B capital solution supported a $5.4B Valor/xAI compute infrastructure transaction involving GB200 equipment under leases. The amounts overlap and must not be added. NVIDIA’s anchor LP participation in the relevant vehicle does not automatically guarantee equipment value.",
            "CoreWeave’s September 2025 NVIDIA agreement had an initial $6.3B value covering unsold capacity through 13 April 2032, subject to delivery, service and termination provisions. It is a capacity purchase arrangement, not a $6.3B loan, GPU buyback or unconditional minimum revenue for all facilities."
          ]
        },
        {
          "title": "NVIDIA financing platforms and support",
          "paragraphs": [
            "NVIDIA’s 10 August 2026 announcement described memoranda of understanding with Apollo, BlackRock, Blackstone, Brookfield, Goldman Sachs and KKR to mobilize more than $500B of third-party capital. This is a prospective platform target, not capital already lent or an NVIDIA guarantee.",
            "The 11 August explanation describes selective residual-value support of up to 25% of an opportunity, assessed project by project. The public term opportunity is not equivalent to GPU purchase price, loan principal or a first-loss tranche. No uniform 25% GPU price floor can be inferred.",
            "The quarter-ended 26 July 2026 filing disclosed $36B of AI cloud capacity commitments, typically over six years, and discretionary support mechanisms. Commitments can reduce as capacity is consumed or sold to other customers. Amounts across platforms, commitments and individual agreements overlap and cannot be added.",
            "An August 2026 media report described a pause in certain revenue-sharing support arrangements; NVIDIA responded that the model remained operational and was evolving. Availability for any new project must therefore be confirmed in signed terms. The separately disclosed Ohio residual-value guarantee relates to real property and power infrastructure and is not a general GPU resale guarantee."
          ]
        },
        {
          "title": "Financing flexibility and limits",
          "paragraphs": [
            "CoreWeave’s August 2026 $2.6B DDTL 5.5 provides an additional precedent: approximately five-year debt against contracts averaging roughly three years, with SOFR + 5.50%, parent support and a subsequent 1.35× minimum DSCR. It shows some institutions underwrite renewal risk with additional protections, not that every small operator can borrow on that basis.",
            "Institutional entry is positive evidence of a developing financing market. Potential take-out options may broaden, but no refinancing is promised. Support applies only to covered assets and signed obligations; it does not establish a market-wide rental or resale floor. Do not count both third-party tenant revenue and fallback capacity purchases for the same capacity."
          ]
        }
      ],
      "sources": [
        {
          "confirmed": true,
          "label": "Blackstone · CoreWeave debt financing",
          "date": "17 May 2024",
          "url": "https://www.blackstone.com/news/press/coreweave-secures-7-5-billion-debt-financing-facility-led-by-blackstone-and-magnetar/"
        },
        {
          "confirmed": true,
          "label": "Apollo · Valor and xAI compute transaction",
          "date": "7 January 2026",
          "url": "https://www.apollo.com/wealth/insights-news/pressreleases/2026/01/apollo-backs-5-4-billion-valor-and-xai-data-center-compute-infrastructure-transaction-with-3-5-billion-capital-solution-3214463"
        },
        {
          "confirmed": true,
          "label": "CoreWeave · NVIDIA capacity agreement, SEC 8-K",
          "date": "15 September 2025; agreement dated 9 September",
          "url": "https://www.sec.gov/Archives/edgar/data/1769628/000176962825000047/crwv-20250909.htm"
        },
        {
          "confirmed": true,
          "label": "NVIDIA · Compute infrastructure financing platforms",
          "date": "10 August 2026",
          "url": "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Partners-With-Apollo-BlackRock-Blackstone-Brookfield-Goldman-Sachs-and-KKR-to-Establish-AI-Compute-Infrastructure-Financing-Platforms-to-Mobilize-Over-500-Billion-of-Third-Party-Capital/default.aspx"
        },
        {
          "confirmed": true,
          "label": "NVIDIA · AI factory financing and selective support",
          "date": "11 August 2026",
          "url": "https://blogs.nvidia.com/blog/nvidia-ai-factory-compute/"
        },
        {
          "confirmed": true,
          "label": "NVIDIA · Quarterly report, period ended 26 July 2026",
          "date": "Q2 FY2027",
          "url": "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm"
        },
        {
          "confirmed": true,
          "label": "CoreWeave · DDTL 5.5 financing",
          "date": "10 August 2026",
          "url": "https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-2-6-Billion-Loan-Facility-Expanding-Financing-Flexibility-for-AI-Infrastructure/default.aspx"
        },
        {
          "confirmed": true,
          "label": "CoreWeave · DDTL 5.5 agreement, SEC 8-K",
          "date": "August 2026",
          "url": "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000357/crwv-20260807.htm"
        },
        {
          "confirmed": true,
          "label": "Reuters · Report on revenue-sharing arrangements and company response",
          "date": "27 August 2026",
          "url": "https://finance.yahoo.com/news/nvidia-pauses-revenue-sharing-deals-223140237.html"
        }
      ]
    },
    {
      "slideId": "strategy",
      "sections": [
        {
          "title": "Eligibility and advance size",
          "paragraphs": [
            "The proposed mandate covers {{operatorFacilityRange}} operating facilities with delivered and commissioned hardware, secured power/cooling and at least one paying compute contract. Proposed loans run {{termRange}} months with senior security and an LTV cap of {{ltvCap}}% measured against independently assessed forced-liquidation value.",
            "The allowable advance is the lower of collateral-supported capacity and cash-flow-supported repayment capacity. Stressed collections must fund essential operating costs, interest, scheduled principal and reserve requirements. Recovery costs and time must be included in collateral analysis; neither an asking-price index nor hypothetical vendor support is a liquidation bid."
          ]
        },
        {
          "title": "Entry, repayment and take-out",
          "paragraphs": [
            "A signed large off-take is not an entry condition. It may enable longer-term refinancing, but cash-supported amortization, a funded reserve and a no-refinancing scenario must substantiate the proposed exit. The policy against a large maturity balloon remains subject to verification in the lighthouse model.",
            "The {{couponRange}}% figure is the proposed loan coupon on outstanding principal before investor-level fees. It is not a guaranteed LP return. Loan size, reserve, covenants, minimum ticket and actual borrower economics still require confirmed transaction data."
          ]
        }
      ],
      "sources": []
    }
  ]
} as const;
