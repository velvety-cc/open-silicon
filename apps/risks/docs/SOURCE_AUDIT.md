# Source audit — 30 October 2026 UTC

The original 21 October 2026 XLSX remains unchanged at `materials/20261021/OpenSilicon_Production_Materials_20261021/Budget_and_Models/GB300_Project_Budget_2026-10-21.xlsx` in the external production workspace (see the app README for audit configuration). SHA-256: `aefc0b4867c8eac903ef59f254315bafa99dcf9205565ee8e11471b197b12cf6`.

The [original Google Sheet](https://docs.google.com/spreadsheets/d/1__hJwK9PNFUJeaChBNe74FsU4FfWfZpjoPO7JNBUiCg/edit) was accessible read-only. Metadata reports modified time 20 October 2026 at 03:48:46.669 UTC. Bounded reads covered A1:J40 of both financing tabs and A1:H40 of BOM List. Across 296 populated snapshot cells, there were no material value differences (USD tolerance $0.11 to allow export-cache rounding). Two formula-text differences are equivalent CEILING syntax at BOM C14/C19: the XLSX explicitly supplies significance 1. Shared XLSX formulas are stored once; their continuation cells must not be interpreted as hardcoded source inputs. This bounded check does not certify edits elsewhere, signed terms, or a current quotation. Raw reads and source hash are in `data/`.

| Reusable reference | Standard | Throttled | Source |
| --- | ---: | ---: | --- |
| Billed GPUs / active racks | 2,880 / 40 | 2,880 / 40 | B5, B25 (72 GPUs/rack) |
| Equipment budget | $280m | $240m | B2 × B25, B26 |
| Site NRC | $8.666667m | $8.666667m | B11 = 26m / 3 |
| Buyer GPU-hour price | $5.80 | $4.90 | B3 |
| IT load | 6,500 kW | 4,800 kW | B10 × B25 + B13 |
| DC rate | $270/kW/month | $270/kW/month | B9; bundled scope unverified |
| Historical advance / coupon / tenor | 60% / 12% / 3 years | same | B21, B20, B19 |
| Customer prepayment assumption | 30% of 3 years | same | B16, D14, B29 |

These are estimated historical operator inputs, not contracted lender terms. Standard and throttled remain separate immutable templates. Neither is Nano B300 or a Fund I/LP model.

Corrections in the new model:

1. B31 = -E10/E14 is payments including DC fees divided by post-prepayment revenue, not DSCR. With only source costs, cash CFADS / scheduled debt service is ($102.428928m − $21.06m) / $69.946629m = 1.1633x standard; ($86.534784m − $15.552m) / $59.954253m = 1.1839x throttled. The app uses actual operating collections minus operating cash costs and required reserve contributions, divided by scheduled cash interest plus principal; balloon coverage is separate.
2. J10 = SUM(J5:J9) counts DC fees twice and excludes NRC. Correct period-payment sums D10:I10 are −$435.806553m standard and −$362.289426m throttled, versus displayed −$532.439886m and −$431.382760m.
3. J16 independently sums D16:I16 and reconciles: $295.828647m / $255.816174m. It is not invalidated by J10. Cached amounts have export rounding.

BOM subtotal D31 is $275.3608m including 40 active and 2 spare racks and networking. This is $4.6392m below standard equipment and $35.3608m above throttled equipment. It is a scope reconciliation, not justification to add networking again. CDU, PDU and fitout amounts are blank, not zero. C20 is 1,209.6 physical transceivers and requires procurement validation.

Missing evidence includes supplier payment dates and refund rights, equipment title and collateral location, site bundled scope/NRC allocation, power/PUE coverage, maintenance/insurance/taxes/reserves, customer prepayment receipt and refund/credit conditions, take-or-pay and termination terms, debt service dates, equity commitments, signed leverage/coupon, valuation date, resale bids, asset condition, guarantees, insurance collectibility, priority, liens, account control, site access, step-in/removal and transfer rights. The app carries these as null or explicit illustrative overrides with provenance. Missing cost scope makes known-cost projections incomplete; unknown legal rights make workouts conditional. Nothing here approves an offer.
