import { NextResponse } from "next/server";
export function proxy() { return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" } }); }
export const config = { matcher: ["/fund-1/:path*", "/legacy/:path*", "/deck/:path*", "/deck.html", "/open-silicon-deck.html"] };
