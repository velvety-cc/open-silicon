"""Render the rent charts for the GPU unit economics and market outlook articles.

Standard library only. Reads the September 2026 SemiAnalysis contract ranges and applies
the same illustrative scenario as payback-model.py: $35,750 installed cost per GPU,
90% paid occupancy, $400 monthly cash costs and 730 hours per month.

Writes the two-panel rent-and-payback chart and a rent-only chart.

Usage: python3 -I docs/research/2026-10-15-initial-series/payback-chart.py
"""
import csv
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "docs/research/2026-09-17-gpu-market/h100-one-year-contract-ranges.csv"
OUTPUT = ROOT / "public/research/what-a-gpu-earns-and-what-its-worth/rental-price-and-payback.svg"
RENT_OUTPUT = ROOT / "public/research/bubble-or-build-out/h100-contract-rent.svg"
RENT_HEIGHT = 252

INSTALLED_COST, OCCUPANCY, MONTHLY_COSTS, HOURS = 35_750, 0.9, 400, 730
ACCENT, INK, INK_SOFT, GRID = "#533afe", "#111", "#555", "#e5e5e5"

WIDTH, HEIGHT = 600, 478
LEFT, RIGHT = 44, 584
START, END = date(2023, 1, 1), date(2026, 5, 1)
RENT_TOP, RENT_BOTTOM, RENT_MAX = 44, 204, 4
PAYBACK_TOP, PAYBACK_BOTTOM, PAYBACK_MAX = 270, 430, 80


def payback(rate):
    return INSTALLED_COST / (rate * HOURS * OCCUPANCY - MONTHLY_COSTS)


def x(day):
    return LEFT + (day - START).days / (END - START).days * (RIGHT - LEFT)


def y(value, top, bottom, maximum):
    return bottom - value / maximum * (bottom - top)


def step_path(rows, key, top, bottom, maximum):
    points = []
    for row in rows:
        level = y(row[key], top, bottom, maximum)
        points += [(x(row["start"]), level), (x(row["end"]), level)]
    return points


def fmt(points):
    return " ".join(f"{px:.1f},{py:.1f}" for px, py in points)


def text(px, py, content, size=14, color=INK_SOFT, anchor="start", weight=400):
    return f'<text x="{px:.1f}" y="{py:.1f}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">{content}</text>'


def heading(py, title, subtitle):
    return f'<text x="0" y="{py}" font-size="15"><tspan fill="{INK}" font-weight="600">{title}</tspan><tspan dx="10" fill="{INK_SOFT}" font-size="14">{subtitle}</tspan></text>'


def callout(px, py, period, value, anchor="start"):
    return f'<text x="{px:.1f}" y="{py:.1f}" font-size="14" text-anchor="{anchor}"><tspan fill="{INK_SOFT}">{period}</tspan><tspan dx="6" fill="{INK}" font-weight="500">{value}</tspan></text>'


def panel(rows, upper, lower, top, bottom, maximum, ticks, tick_label, color, fill_opacity):
    parts = []
    for tick in ticks:
        ty = y(tick, top, bottom, maximum)
        parts.append(f'<line x1="{LEFT}" x2="{RIGHT}" y1="{ty:.1f}" y2="{ty:.1f}" stroke="{GRID}" stroke-width="1"/>')
        parts.append(text(LEFT - 8, ty + 5, tick_label(tick), anchor="end"))
    high = step_path(rows, upper, top, bottom, maximum)
    low = step_path(rows, lower, top, bottom, maximum)
    parts.append(f'<polygon points="{fmt(high + low[::-1])}" fill="{color}" fill-opacity="{fill_opacity}"/>')
    for line in (high, low):
        parts.append(f'<polyline points="{fmt(line)}" fill="none" stroke="{color}" stroke-width="2" stroke-linejoin="round"/>')
    return parts


def main():
    rows = []
    with SOURCE.open() as handle:
        for row in csv.DictReader(handle):
            low_rate, high_rate = float(row["p25_usd_per_gpu_hour"]), float(row["p75_usd_per_gpu_hour"])
            rows.append({
                "period": row["reported_period"],
                "start": date.fromisoformat(row["period_start"]),
                "end": date.fromisoformat(row["period_end_exclusive"]),
                "low_rate": low_rate, "high_rate": high_rate,
                # Payback is longest at the lowest rent, so the bands swap.
                "fast": payback(high_rate), "slow": payback(low_rate),
            })
    first, october, last = rows[0], next(r for r in rows if r["period"] == "Oct 2025"), rows[-1]
    mid = lambda row: x(row["start"]) + (x(row["end"]) - x(row["start"])) / 2

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="720" height="{HEIGHT * 1.2:.0f}" viewBox="0 0 {WIDTH} {HEIGHT}" role="img" aria-labelledby="title desc">',
        '<title id="title">H100 contract rents and modeled payback, 2023 to April 2026</title>',
        f'<desc id="desc">One-year H100 contract rents fell from ${first["low_rate"]:.2f}–{first["high_rate"]:.2f} per GPU-hour in the first half of 2023 to ${october["low_rate"]:.2f}–{october["high_rate"]:.2f} in October 2025, then recovered to ${last["low_rate"]:.2f}–{last["high_rate"]:.2f} in April 2026. Holding cost, occupancy and operating costs constant, modeled payback rose from {first["fast"]:.1f}–{first["slow"]:.1f} months to {october["fast"]:.1f}–{october["slow"]:.1f} months, then fell to {last["fast"]:.1f}–{last["slow"]:.1f} months.</desc>',
        '<style>text { font-family: "Geist", -apple-system, "Helvetica Neue", Arial, sans-serif; font-variant-numeric: tabular-nums; }</style>',
        f'<rect width="{WIDTH}" height="{HEIGHT}" fill="#fff"/>',
        heading(18, "Contract rent", "H100 one-year contracts, $ per GPU-hour"),
        heading(244, "Modeled payback", "Months, with cost and occupancy held constant"),
    ]
    parts += panel(rows, "high_rate", "low_rate", RENT_TOP, RENT_BOTTOM, RENT_MAX, range(0, 5), lambda v: f"${v}", ACCENT, 0.1)
    parts += panel(rows, "slow", "fast", PAYBACK_TOP, PAYBACK_BOTTOM, PAYBACK_MAX, range(0, 81, 20), str, INK, 0.07)

    for year in (2023, 2024, 2025, 2026):
        tx = x(date(year, 1, 1))
        anchor = "start" if year == 2023 else "middle"
        parts.append(text(tx, HEIGHT - 22, f"Jan {year}", anchor=anchor))

    rent_y = lambda v: y(v, RENT_TOP, RENT_BOTTOM, RENT_MAX)
    pay_y = lambda v: y(v, PAYBACK_TOP, PAYBACK_BOTTOM, PAYBACK_MAX)
    parts += [
        callout(LEFT + 6, rent_y(first["low_rate"]) + 22, "1H 2023", f'${first["low_rate"]:.2f}–{first["high_rate"]:.2f}'),
        callout(mid(october), rent_y(october["low_rate"]) + 22, "Oct 2025", f'${october["low_rate"]:.2f}–{october["high_rate"]:.2f}', "middle"),
        callout(RIGHT, rent_y(last["high_rate"]) - 10, "Apr 2026", f'${last["low_rate"]:.2f}–{last["high_rate"]:.2f}', "end"),
        callout(LEFT + 6, pay_y(first["slow"]) - 10, "1H 2023", f'{first["fast"]:.1f}–{first["slow"]:.1f} months'),
        callout(mid(october), pay_y(october["slow"]) - 10, "Oct 2025", f'{october["fast"]:.1f}–{october["slow"]:.1f} months', "middle"),
        callout(RIGHT, pay_y(last["fast"]) + 22, "Apr 2026", f'{last["fast"]:.1f}–{last["slow"]:.1f} months', "end"),
        "</svg>",
    ]
    OUTPUT.write_text("\n".join(parts) + "\n")
    print(f"Wrote {OUTPUT.relative_to(ROOT)}")

    rent = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="720" height="{RENT_HEIGHT * 1.2:.0f}" viewBox="0 0 {WIDTH} {RENT_HEIGHT}" role="img" aria-labelledby="title desc">',
        '<title id="title">H100 one-year contract rents, 2023 to April 2026</title>',
        f'<desc id="desc">One-year H100 contract rents fell from ${first["low_rate"]:.2f}–{first["high_rate"]:.2f} per GPU-hour in the first half of 2023 to ${october["low_rate"]:.2f}–{october["high_rate"]:.2f} in October 2025, then recovered to ${last["low_rate"]:.2f}–{last["high_rate"]:.2f} in April 2026.</desc>',
        parts[3], f'<rect width="{WIDTH}" height="{RENT_HEIGHT}" fill="#fff"/>',
        heading(18, "Contract rent", "H100 one-year contracts, $ per GPU-hour, 25th–75th percentile"),
    ]
    rent += panel(rows, "high_rate", "low_rate", RENT_TOP, RENT_BOTTOM, RENT_MAX, range(0, 5), lambda v: f"${v}", ACCENT, 0.1)
    rent += [text(x(date(year, 1, 1)), RENT_HEIGHT - 20, f"Jan {year}", anchor="start" if year == 2023 else "middle") for year in (2023, 2024, 2025, 2026)]
    rent += parts[-7:-4] + ["</svg>"]
    RENT_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    RENT_OUTPUT.write_text("\n".join(rent) + "\n")
    print(f"Wrote {RENT_OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
