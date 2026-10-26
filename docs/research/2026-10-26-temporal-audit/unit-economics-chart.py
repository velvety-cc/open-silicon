"""Render the May article using only pricing disclosed on April 2, 2026.

The $35,000 installed budget, 90% paid occupancy and $400 monthly costs
are hypothetical assumptions. The two rent observations are not a time
series or a percentile band. No September snapshot or August hardware
quote is an input to this chart.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/research/what-a-gpu-earns-and-what-its-worth/rental-price-and-payback.svg"
OBSERVATIONS = (("Oct 2025", 1.70), ("Mar 2026", 2.35))
INSTALLED_COST, OCCUPANCY, MONTHLY_COSTS, HOURS = 35_000, 0.9, 400, 730


def payback(rate):
    return INSTALLED_COST / (rate * HOURS * OCCUPANCY - MONTHLY_COSTS)


def main():
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="574" viewBox="0 0 600 478" role="img" aria-labelledby="title desc">',
        '<title id="title">H100 pricing observations and hypothetical payback</title>',
        '<desc id="desc">SemiAnalysis reported on April 2, 2026 that one-year H100 contract pricing was $1.70 per GPU-hour in October 2025 and $2.35 in March 2026. With a hypothetical $35,000 installed budget, 90% paid occupancy and $400 monthly cash costs, modeled payback is 48.8 and 30.6 months respectively. These are two observations, not a continuous series or percentile ranges.</desc>',
        '<style>text { font-family: Geist, -apple-system, "Helvetica Neue", Arial, sans-serif; font-variant-numeric: tabular-nums; }</style>',
        '<rect width="600" height="478" fill="#fff"/>',
        '<text x="0" y="20" font-size="15" font-weight="600" fill="#111">H100 one-year contract pricing</text>',
        '<text x="0" y="43" font-size="13" fill="#555">Two observations disclosed April 2, 2026 · $ per GPU-hour</text>',
        '<text x="0" y="250" font-size="15" font-weight="600" fill="#111">Modeled payback</text>',
        '<text x="0" y="273" font-size="13" fill="#555">Hypothetical $35,000 budget · 90% occupancy · $400/month costs</text>',
    ]
    for top, maximum, value_fn, color, suffix in (
        (70, 3, lambda rate: rate, "#533afe", ""),
        (300, 60, payback, "#111", " months"),
    ):
        for index, (period, rate) in enumerate(OBSERVATIONS):
            y = top + index * 64
            value = value_fn(rate)
            width = value / maximum * 430
            label = f"${value:.2f}" if not suffix else f"{value:.1f}{suffix}"
            parts.extend((
                f'<text x="0" y="{y + 24}" font-size="14" fill="#555">{period}</text>',
                f'<rect x="104" y="{y}" width="430" height="36" fill="#f3f3f3"/>',
                f'<rect x="104" y="{y}" width="{width:.2f}" height="36" fill="{color}" fill-opacity=".12"/>',
                f'<line x1="104" y1="{y + 36}" x2="{104 + width:.2f}" y2="{y + 36}" stroke="{color}" stroke-width="2"/>',
                f'<text x="{114 + width:.2f}" y="{y + 24}" font-size="14" font-weight="500" fill="#111">{label}</text>',
            ))
    parts.extend((
        '<text x="0" y="451" font-size="13" fill="#555">Cost and occupancy are assumptions, not historical equipment quotes.</text>',
        '</svg>',
    ))
    OUTPUT.write_text("\n".join(parts) + "\n")
    print(f"Wrote {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
