import { NextResponse, type NextRequest } from "next/server";

// Internal archives are available only through loopback next dev. NODE_ENV=production
// always denies access, including on localhost and with spoofed forwarded headers.
export function proxy(request: NextRequest) {
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(request.nextUrl.hostname);
  if (process.env.NODE_ENV !== "development" || !local) {
    return new NextResponse("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow, noarchive", "Cache-Control": "private, no-store" } });
  }
  const response = request.nextUrl.pathname === "/deck.html"
    ? NextResponse.rewrite(new URL("/deck", request.url))
    : NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/legacy/:path*", "/deck/:path*", "/deck.html", "/open-silicon-deck.html"] };
