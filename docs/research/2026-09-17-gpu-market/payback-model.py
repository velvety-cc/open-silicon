"""Reproduce the explicitly illustrative rental-price/payback sensitivity.

Observed inputs: the adjacent SemiAnalysis rental CSV and the 31 Aug 2026
Hashrate Index asking-price snapshot. All other financial inputs are scenarios.
This does not estimate realized historical cohort returns or liquidation values.
"""
from pathlib import Path
from datetime import datetime
import csv
import math
import os

os.environ.setdefault("MPLCONFIGDIR", "/tmp/open-silicon-matplotlib")
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.rcParams["text.parse_math"] = False

OUT = Path(__file__).resolve().parent
HOURS = 365 * 24 / 12
PAID_OCCUPANCY = 0.90  # Hypothetical share of calendar capacity paid for.
OTHER_INSTALLED_CAPEX = 5_000  # Hypothetical per-GPU allocation.
CASH_OPEX = 400  # Hypothetical per GPU per month, including power and hosting.
HARDWARE = {"refurbished": 246_000 / 8, "new": 324_438 / 8}
HARDWARE_SOURCE = "https://beta.hashrateindex.com/blog/announcement-introducing-the-ai-hardware-price-index/"
PRICE_SOURCE = "https://gpu-index.semianalysis.com/"


def payback(capex, rent, paid_occupancy, cash_opex):
    monthly_revenue = rent * HOURS * paid_occupancy
    monthly_operating_cash = monthly_revenue - cash_opex
    return capex / monthly_operating_cash if monthly_operating_cash > 0 else math.inf


with (OUT / "h100-one-year-contract-ranges.csv").open() as f:
    prices = list(csv.DictReader(f))

fields = ["scenario_type", "rental_period", "rental_p25_usd_gpu_hour", "rental_p75_usd_gpu_hour",
          "hardware_condition", "hardware_asking_snapshot_date", "hardware_ask_per_gpu",
          "assumed_other_installed_capex_per_gpu", "assumed_paid_occupancy", "assumed_monthly_cash_opex",
          "hours_per_month", "gross_revenue_payback_fast_months", "gross_revenue_payback_slow_months",
          "operating_payback_fast_months", "operating_payback_slow_months", "rental_source", "hardware_source"]
with (OUT / "rental-payback-sensitivity.csv").open("w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(fields)
    for row in prices:
        low, high = float(row["p25_usd_per_gpu_hour"]), float(row["p75_usd_per_gpu_hour"])
        for condition, hardware in HARDWARE.items():
            capex = hardware + OTHER_INSTALLED_CAPEX
            writer.writerow([
                "hypothetical_fixed_cost_not_historical_cohort", row["reported_period"], low, high,
                condition, "2026-08-31", hardware, OTHER_INSTALLED_CAPEX, PAID_OCCUPANCY, CASH_OPEX,
                HOURS, capex / (high * HOURS * PAID_OCCUPANCY), capex / (low * HOURS * PAID_OCCUPANCY),
                payback(capex, high, PAID_OCCUPANCY, CASH_OPEX),
                payback(capex, low, PAID_OCCUPANCY, CASH_OPEX), PRICE_SOURCE, HARDWARE_SOURCE,
            ])

with (OUT / "payback-occupancy-cost-sensitivity.csv").open("w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["scenario_type", "rental_period", "hardware_condition", "installed_capex_per_gpu",
                     "assumed_paid_occupancy", "assumed_monthly_cash_opex", "fast_payback_months", "slow_payback_months"])
    for condition, hardware in HARDWARE.items():
        for occupancy in [0.70, 0.85, 0.90, 1.00]:
            for opex in [200, 400, 600]:
                writer.writerow(["hypothetical_not_borrower_data", "Apr 2026 price range", condition,
                                 hardware + OTHER_INSTALLED_CAPEX, occupancy, opex,
                                 payback(hardware + OTHER_INSTALLED_CAPEX, 2.70, occupancy, opex),
                                 payback(hardware + OTHER_INSTALLED_CAPEX, 2.10, occupancy, opex)])

dates = [datetime.fromisoformat(row["period_start"]) for row in prices]
dates.append(datetime.fromisoformat(prices[-1]["period_end_exclusive"]))
lows = [float(row["p25_usd_per_gpu_hour"]) for row in prices]
highs = [float(row["p75_usd_per_gpu_hour"]) for row in prices]
capex = HARDWARE["refurbished"] + OTHER_INSTALLED_CAPEX
fast = [payback(capex, p, PAID_OCCUPANCY, CASH_OPEX) for p in highs]
slow = [payback(capex, p, PAID_OCCUPANCY, CASH_OPEX) for p in lows]
assert all(a <= b for a, b in zip(fast, slow))
fig, axes = plt.subplots(2, 1, figsize=(13.5, 9.5), dpi=180, sharex=True)
fig.subplots_adjust(left=.085, right=.965, bottom=.245, top=.79, hspace=.36)
fig.set_facecolor("white")
for ax, lower, upper, color in zip(axes, [lows, fast], [highs, slow], ["#5935ed", "#a56210"]):
    lo, hi = lower + [lower[-1]], upper + [upper[-1]]
    ax.fill_between(dates, lo, hi, step="post", color=color, alpha=.14)
    ax.step(dates, lo, where="post", color=color, lw=1.5)
    ax.step(dates, hi, where="post", color=color, lw=2)
    ax.set_xlim(dates[0], dates[-1])
    ax.tick_params(axis="both", length=0, pad=8, colors="#626262", labelsize=10)
    ax.grid(axis="y", color="#e8e7ed", lw=.7)
    ax.set_axisbelow(True)
    for spine in ax.spines.values():
        spine.set_visible(False)
axes[0].set_ylim(0, 4.15)
axes[0].set_yticks([0, 1, 2, 3, 4], ["$0", "$1", "$2", "$3", "$4"])
axes[0].set_title("OBSERVED RENT  |  H100 one-year contracts, $/GPU-hour", loc="left", fontsize=11, color="#34313f", pad=12)
axes[1].set_ylim(0, 82)
axes[1].set_yticks([0, 20, 40, 60, 80])
axes[1].set_title("MODELED PAYBACK  |  Months, holding cost and occupancy constant", loc="left", fontsize=11, color="#34313f", pad=12)
xticks = [datetime(2023, 1, 1), datetime(2024, 1, 1), datetime(2025, 1, 1), datetime(2026, 1, 1), datetime(2026, 4, 1)]
axes[1].set_xticks(xticks, ["Jan 2023", "Jan 2024", "Jan 2025", "Jan 2026", "Apr"])
axes[0].annotate("Oct 2025\n$1.45–1.95", (datetime(2025, 10, 15), 1.45),
                 xytext=(datetime(2025, 6, 1), .35), ha="center", fontsize=10,
                 arrowprops={"arrowstyle": "-", "color": "#aaa4b4"})
axes[0].annotate("Apr 2026\n$2.10–2.70", (datetime(2026, 4, 15), 2.70),
                 xytext=(datetime(2026, 1, 1), 3.45), ha="center", fontsize=10, color="#5935ed",
                 arrowprops={"arrowstyle": "-", "color": "#5935ed"})
axes[1].annotate("Oct 2025 rent\n41–65 months", (datetime(2025, 10, 15), 64.69),
                 xytext=(datetime(2025, 7, 1), 72), ha="center", fontsize=10, color="#805015",
                 arrowprops={"arrowstyle": "-", "color": "#a56210"})
axes[1].annotate("Apr 2026 rent\n26–36 months", (datetime(2026, 4, 15), 26.02),
                 xytext=(datetime(2026, 1, 15), 7), ha="center", fontsize=10, color="#805015",
                 arrowprops={"arrowstyle": "-", "color": "#a56210"})
fig.text(.085, .933, "What rental prices imply for payback", fontsize=26, color="#1b1b20", weight="medium")
fig.text(.085, .879, "Fixed-cost sensitivity. These are not realized historical project returns.", fontsize=12, color="#626262")
fig.text(.085, .171, "SCENARIO: $35,750 installed cost/GPU; 90% paid occupancy; $400 monthly cash opex; 730 hours/month.", fontsize=10, color="#805015")
fig.text(.085, .135, "Cost uses an Aug 2026 refurbished-node ask plus assumed $5,000 installation allocation. The cost is fixed across all periods.", fontsize=9.5, color="#626262")
fig.text(.085, .099, "Pre-tax, unlevered operating payback; excludes prepayment timing, residual proceeds and future repricing. Rent held constant beyond year one.", fontsize=9, color="#626262")
fig.text(.085, .055, "Sources: SemiAnalysis contract ranges (through Apr 2026); Hashrate Index hardware asking prices (31 Aug 2026).", fontsize=9.5, color="#777777")
fig.savefig(OUT / "rental-price-and-payback.png", facecolor="white")
fig.savefig(OUT / "rental-price-and-payback.svg", facecolor="white")
plt.close(fig)

for period in ["1H 2023", "Oct 2025", "Apr 2026"]:
    row = next(r for r in prices if r["reported_period"] == period)
    lo, hi = float(row["p25_usd_per_gpu_hour"]), float(row["p75_usd_per_gpu_hour"])
    for condition, hardware in HARDWARE.items():
        print(period, condition, "gross months", round((hardware + OTHER_INSTALLED_CAPEX) / (hi * HOURS * PAID_OCCUPANCY), 1), round((hardware + OTHER_INSTALLED_CAPEX) / (lo * HOURS * PAID_OCCUPANCY), 1), "operating months", round(payback(hardware + OTHER_INSTALLED_CAPEX, hi, PAID_OCCUPANCY, CASH_OPEX), 1), round(payback(hardware + OTHER_INSTALLED_CAPEX, lo, PAID_OCCUPANCY, CASH_OPEX), 1))
print("Wrote 36 rental/cost scenarios, 24 occupancy/cost scenarios, and PNG/SVG.")
